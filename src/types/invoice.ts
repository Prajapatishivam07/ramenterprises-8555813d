export type InvoiceMode = 'normal' | 'furniture';

export interface NormalInvoiceRow {
  id: string;
  itemName: string;
  hsn: string;
  qty: number;
  price: number;
  gstPercent: number;
  amount: number;
}

export interface FurnitureInvoiceRow {
  id: string;
  product: string;
  size: string;
  tsf: number;
  rate: number;
  amount: number;
}

export interface CustomerInfo {
  name: string;
  address: string;
  phone: string;
  gstin: string;
}

export interface ShopInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  gstin: string;
  logo: string;
}

export interface InvoiceData {
  mode: InvoiceMode;
  invoiceNumber: string;
  date: string;
  placeOfSupply: string;
  customer: CustomerInfo;
  shop: ShopInfo;
  normalRows: NormalInvoiceRow[];
  furnitureRows: FurnitureInvoiceRow[];
  sgstPercent: number;
  cgstPercent: number;
  received: number;
  terms: string;
  includeGstInFurniture: boolean;
}

export interface InvoiceSummary {
  subtotal: number;
  sgstAmount: number;
  cgstAmount: number;
  grandTotal: number;
  balance: number;
}
