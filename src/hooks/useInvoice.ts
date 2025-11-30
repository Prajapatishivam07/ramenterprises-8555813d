import { useState, useEffect, useCallback } from 'react';
import { InvoiceData, InvoiceSummary, NormalInvoiceRow, FurnitureInvoiceRow } from '@/types/invoice';
import { generateInvoiceNumber, getCurrentDate, parseSize } from '@/lib/invoiceUtils';

const STORAGE_KEY = 'invoice_data';

const createEmptyNormalRow = (): NormalInvoiceRow => ({
  id: crypto.randomUUID(),
  itemName: '',
  hsn: '',
  qty: 0,
  price: 0,
  gstPercent: 18,
  amount: 0,
});

const createEmptyFurnitureRow = (): FurnitureInvoiceRow => ({
  id: crypto.randomUUID(),
  product: '',
  size: '',
  tsf: 0,
  rate: 0,
  amount: 0,
});

const defaultInvoiceData: InvoiceData = {
  mode: 'normal',
  invoiceNumber: generateInvoiceNumber(),
  date: getCurrentDate(),
  placeOfSupply: 'Gujarat',
  customer: {
    name: '',
    address: '',
    phone: '',
    gstin: '',
  },
  shop: {
    name: 'Your Business Name',
    address: '123 Business Street, City - 380001',
    phone: '+91 98765 43210',
    email: 'info@business.com',
    gstin: '24XXXXX1234X1ZX',
    logo: '',
  },
  normalRows: [createEmptyNormalRow()],
  furnitureRows: [createEmptyFurnitureRow()],
  sgstPercent: 9,
  cgstPercent: 9,
  received: 0,
  terms: 'Goods once sold will not be taken back.\nPayment due within 30 days.',
  includeGstInFurniture: false,
};

export function useInvoice() {
  const [invoice, setInvoice] = useState<InvoiceData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultInvoiceData;
      }
    }
    return defaultInvoiceData;
  });

  // Save to localStorage whenever invoice changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoice));
  }, [invoice]);

  // Calculate row amounts for normal mode
  const calculateNormalRowAmount = useCallback((row: NormalInvoiceRow): number => {
    const baseAmount = row.qty * row.price;
    const gstAmount = (baseAmount * row.gstPercent) / 100;
    return baseAmount + gstAmount;
  }, []);

  // Calculate row amounts for furniture mode
  const calculateFurnitureRowAmount = useCallback((row: FurnitureInvoiceRow): number => {
    const { tsf } = parseSize(row.size);
    return tsf * row.rate;
  }, []);

  // Update normal row
  const updateNormalRow = useCallback((id: string, field: keyof NormalInvoiceRow, value: string | number) => {
    setInvoice(prev => ({
      ...prev,
      normalRows: prev.normalRows.map(row => {
        if (row.id !== id) return row;
        const updated = { ...row, [field]: value };
        updated.amount = calculateNormalRowAmount(updated);
        return updated;
      }),
    }));
  }, [calculateNormalRowAmount]);

  // Update furniture row
  const updateFurnitureRow = useCallback((id: string, field: keyof FurnitureInvoiceRow, value: string | number) => {
    setInvoice(prev => ({
      ...prev,
      furnitureRows: prev.furnitureRows.map(row => {
        if (row.id !== id) return row;
        const updated = { ...row, [field]: value };
        if (field === 'size') {
          updated.tsf = parseSize(value as string).tsf;
        }
        updated.amount = updated.tsf * updated.rate;
        return updated;
      }),
    }));
  }, []);

  // Add row
  const addRow = useCallback(() => {
    setInvoice(prev => ({
      ...prev,
      normalRows: prev.mode === 'normal' ? [...prev.normalRows, createEmptyNormalRow()] : prev.normalRows,
      furnitureRows: prev.mode === 'furniture' ? [...prev.furnitureRows, createEmptyFurnitureRow()] : prev.furnitureRows,
    }));
  }, []);

  // Remove row
  const removeRow = useCallback((id: string) => {
    setInvoice(prev => ({
      ...prev,
      normalRows: prev.mode === 'normal' && prev.normalRows.length > 1
        ? prev.normalRows.filter(row => row.id !== id)
        : prev.normalRows,
      furnitureRows: prev.mode === 'furniture' && prev.furnitureRows.length > 1
        ? prev.furnitureRows.filter(row => row.id !== id)
        : prev.furnitureRows,
    }));
  }, []);

  // Calculate summary
  const calculateSummary = useCallback((): InvoiceSummary => {
    let subtotal = 0;

    if (invoice.mode === 'normal') {
      subtotal = invoice.normalRows.reduce((sum, row) => {
        return sum + (row.qty * row.price);
      }, 0);
    } else {
      subtotal = invoice.furnitureRows.reduce((sum, row) => {
        return sum + row.amount;
      }, 0);
    }

    const sgstAmount = invoice.mode === 'furniture' && !invoice.includeGstInFurniture
      ? 0
      : (subtotal * invoice.sgstPercent) / 100;
    const cgstAmount = invoice.mode === 'furniture' && !invoice.includeGstInFurniture
      ? 0
      : (subtotal * invoice.cgstPercent) / 100;
    const grandTotal = subtotal + sgstAmount + cgstAmount;
    const balance = grandTotal - invoice.received;

    return { subtotal, sgstAmount, cgstAmount, grandTotal, balance };
  }, [invoice]);

  // Update invoice field
  const updateField = useCallback(<K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => {
    setInvoice(prev => ({ ...prev, [field]: value }));
  }, []);

  // Update customer field
  const updateCustomer = useCallback((field: keyof InvoiceData['customer'], value: string) => {
    setInvoice(prev => ({
      ...prev,
      customer: { ...prev.customer, [field]: value },
    }));
  }, []);

  // Update shop field
  const updateShop = useCallback((field: keyof InvoiceData['shop'], value: string) => {
    setInvoice(prev => ({
      ...prev,
      shop: { ...prev.shop, [field]: value },
    }));
  }, []);

  // Reset invoice
  const resetInvoice = useCallback(() => {
    const newInvoice = {
      ...defaultInvoiceData,
      invoiceNumber: generateInvoiceNumber(),
      date: getCurrentDate(),
    };
    setInvoice(newInvoice);
  }, []);

  // Print invoice
  const printInvoice = useCallback(() => {
    window.print();
  }, []);

  return {
    invoice,
    summary: calculateSummary(),
    updateField,
    updateCustomer,
    updateShop,
    updateNormalRow,
    updateFurnitureRow,
    addRow,
    removeRow,
    resetInvoice,
    printInvoice,
  };
}
