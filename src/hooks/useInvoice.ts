import { useState, useEffect, useCallback } from 'react';
import { InvoiceData, InvoiceSummary, FurnitureInvoiceRow, SavedBill } from '@/types/invoice';
import { generateInvoiceNumber, getCurrentDate } from '@/lib/invoiceUtils';
import ramEnterprisesLogo from '@/assets/ram-enterprises-logo.jpg';

const STORAGE_KEY = 'invoice_data';
const BILLS_KEY = 'saved_bills';
const BILL_COUNTER_KEY = 'bill_counter';

const createEmptyRow = (): FurnitureInvoiceRow => ({
  id: crypto.randomUUID(),
  product: '',
  width: 0,
  height: 0,
  tsf: 0,
  rate: 0,
  amount: 0,
});

const defaultInvoiceData: InvoiceData = {
  invoiceNumber: generateInvoiceNumber(),
  date: getCurrentDate(),
  placeOfSupply: 'Maharashtra',
  billName: '',
  customer: {
    name: '',
    address: '',
    phone: '',
    gstin: '',
  },
  shop: {
    name: 'RAM ENTERPRISES',
    address: '409 Ashtvinayak Residency, Golavali Fish Market,\nDombivli (E), Maharashtra - 421203',
    phone: '+91 98924 10038 / +91 93725 16061',
    email: 'ramfurniworks@gmail.com',
    gstin: '',
    logo: ramEnterprisesLogo,
  },
  rows: [createEmptyRow()],
  sgstPercent: 9,
  cgstPercent: 9,
  received: 0,
  terms: 'Goods once sold will not be taken back.\nPayment due within 30 days.',
  includeGst: false,
};

export function useInvoice() {
  const [invoice, setInvoice] = useState<InvoiceData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migrate old data format (furnitureRows -> rows)
        if (parsed.furnitureRows && !parsed.rows) {
          parsed.rows = parsed.furnitureRows.map((row: any) => ({
            ...row,
            width: row.width || 0,
            height: row.height || 0,
          }));
          delete parsed.furnitureRows;
          delete parsed.normalRows;
          delete parsed.mode;
          parsed.includeGst = parsed.includeGstInFurniture || false;
          delete parsed.includeGstInFurniture;
        }
        // Ensure rows array exists
        if (!parsed.rows || !Array.isArray(parsed.rows)) {
          parsed.rows = [createEmptyRow()];
        }
        return { ...defaultInvoiceData, ...parsed };
      } catch {
        return defaultInvoiceData;
      }
    }
    return defaultInvoiceData;
  });

  const [savedBills, setSavedBills] = useState<SavedBill[]>(() => {
    const saved = localStorage.getItem(BILLS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoice));
  }, [invoice]);

  useEffect(() => {
    localStorage.setItem(BILLS_KEY, JSON.stringify(savedBills));
  }, [savedBills]);

  const updateRow = useCallback((id: string, field: keyof FurnitureInvoiceRow, value: string | number) => {
    setInvoice(prev => ({
      ...prev,
      rows: prev.rows.map(row => {
        if (row.id !== id) return row;
        const updated = { ...row, [field]: value };
        updated.tsf = updated.width * updated.height;
        updated.amount = updated.tsf * updated.rate;
        return updated;
      }),
    }));
  }, []);

  const addRow = useCallback(() => {
    setInvoice(prev => ({
      ...prev,
      rows: [...prev.rows, createEmptyRow()],
    }));
  }, []);

  const removeRow = useCallback((id: string) => {
    setInvoice(prev => ({
      ...prev,
      rows: prev.rows.length > 1 ? prev.rows.filter(row => row.id !== id) : prev.rows,
    }));
  }, []);

  const calculateSummary = useCallback((): InvoiceSummary => {
    const subtotal = invoice.rows.reduce((sum, row) => sum + row.amount, 0);
    const sgstAmount = invoice.includeGst ? (subtotal * invoice.sgstPercent) / 100 : 0;
    const cgstAmount = invoice.includeGst ? (subtotal * invoice.cgstPercent) / 100 : 0;
    const grandTotal = subtotal + sgstAmount + cgstAmount;
    const balance = grandTotal - invoice.received;

    return { subtotal, sgstAmount, cgstAmount, grandTotal, balance };
  }, [invoice]);

  const updateField = useCallback(<K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => {
    setInvoice(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateCustomer = useCallback((field: keyof InvoiceData['customer'], value: string) => {
    setInvoice(prev => ({
      ...prev,
      customer: { ...prev.customer, [field]: value },
    }));
  }, []);

  const updateShop = useCallback((field: keyof InvoiceData['shop'], value: string) => {
    setInvoice(prev => ({
      ...prev,
      shop: { ...prev.shop, [field]: value },
    }));
  }, []);

  const getNextBillNumber = useCallback((): number => {
    const counter = localStorage.getItem(BILL_COUNTER_KEY);
    const nextNumber = counter ? parseInt(counter) + 1 : 1;
    localStorage.setItem(BILL_COUNTER_KEY, nextNumber.toString());
    return nextNumber;
  }, []);

  const saveBill = useCallback(() => {
    const billNumber = getNextBillNumber();
    const summary = calculateSummary();
    const newBill: SavedBill = {
      id: crypto.randomUUID(),
      billNumber,
      billName: invoice.billName || `Bill #${billNumber}`,
      savedAt: new Date().toISOString(),
      invoice: { ...invoice },
      summary,
    };
    setSavedBills(prev => [newBill, ...prev]);
    // Generate new invoice number for next invoice
    setInvoice(prev => ({
      ...prev,
      invoiceNumber: generateInvoiceNumber(),
    }));
    return billNumber;
  }, [invoice, calculateSummary, getNextBillNumber]);

  const loadBill = useCallback((bill: SavedBill) => {
    setInvoice(bill.invoice);
  }, []);

  const deleteBill = useCallback((id: string) => {
    setSavedBills(prev => prev.filter(bill => bill.id !== id));
  }, []);

  const resetInvoice = useCallback(() => {
    const newInvoice = {
      ...defaultInvoiceData,
      invoiceNumber: generateInvoiceNumber(),
      date: getCurrentDate(),
    };
    setInvoice(newInvoice);
  }, []);

  const printInvoice = useCallback(() => {
    const billNumber = saveBill();
    setTimeout(() => {
      window.print();
    }, 100);
    return billNumber;
  }, [saveBill]);

  return {
    invoice,
    summary: calculateSummary(),
    savedBills,
    updateField,
    updateCustomer,
    updateShop,
    updateRow,
    addRow,
    removeRow,
    resetInvoice,
    printInvoice,
    saveBill,
    loadBill,
    deleteBill,
  };
}
