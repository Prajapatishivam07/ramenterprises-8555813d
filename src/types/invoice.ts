export interface FurnitureInvoiceRow {
  id: string;
  product: string;
  width: number;
  height: number;
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
  invoiceNumber: string;
  date: string;
  placeOfSupply: string;
  customer: CustomerInfo;
  shop: ShopInfo;
  rows: FurnitureInvoiceRow[];
  sgstPercent: number;
  cgstPercent: number;
  received: number;
  terms: string;
  includeGst: boolean;
}

export interface InvoiceSummary {
  subtotal: number;
  sgstAmount: number;
  cgstAmount: number;
  grandTotal: number;
  balance: number;
}

export interface SavedBill {
  id: string;
  billNumber: number;
  savedAt: string;
  invoice: InvoiceData;
  summary: InvoiceSummary;
}
