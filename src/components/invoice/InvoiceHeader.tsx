import { InvoiceData } from '@/types/invoice';
import { Building2 } from 'lucide-react';

interface InvoiceHeaderProps {
  shop: InvoiceData['shop'];
  invoiceNumber: string;
  date: string;
  placeOfSupply: string;
  onShopChange: (field: keyof InvoiceData['shop'], value: string) => void;
  onFieldChange: <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => void;
}

export function InvoiceHeader({
  shop,
  invoiceNumber,
  date,
  placeOfSupply,
  onShopChange,
  onFieldChange,
}: InvoiceHeaderProps) {
  return (
    <div className="border-b-2 border-invoice-border pb-6 mb-6">
      <div className="flex justify-between items-start">
        {/* Left: Shop Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center no-print">
              <Building2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <input
              type="text"
              value={shop.name}
              onChange={(e) => onShopChange('name', e.target.value)}
              className="invoice-input text-2xl font-bold text-foreground print:text-xl"
              placeholder="Business Name"
            />
          </div>
          <div className="space-y-1 text-sm text-muted-foreground ml-0">
            <input
              type="text"
              value={shop.address}
              onChange={(e) => onShopChange('address', e.target.value)}
              className="invoice-input w-full font-semibold"
              placeholder="Address"
            />
            <div className="flex gap-4">
              <input
                type="text"
                value={shop.phone}
                onChange={(e) => onShopChange('phone', e.target.value)}
                className="invoice-input w-40 font-semibold"
                placeholder="Phone"
              />
              <input
                type="email"
                value={shop.email}
                onChange={(e) => onShopChange('email', e.target.value)}
                className="invoice-input w-48 font-semibold"
                placeholder="Email"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">GSTIN:</span>
              <input
                type="text"
                value={shop.gstin}
                onChange={(e) => onShopChange('gstin', e.target.value)}
                className="invoice-input w-48 font-mono font-semibold"
                placeholder="GSTIN Number"
              />
            </div>
          </div>
        </div>

        {/* Right: Invoice Details */}
        <div className="text-right space-y-2">
          <h1 className="text-3xl font-bold text-primary tracking-tight">TAX INVOICE</h1>
          <div className="space-y-1 text-sm">
            <div className="flex items-center justify-end gap-2">
              <span className="text-muted-foreground">Invoice No:</span>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => onFieldChange('invoiceNumber', e.target.value)}
                className="invoice-input w-36 text-right font-mono font-semibold"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <span className="text-muted-foreground">Date:</span>
              <input
                type="date"
                value={date}
                onChange={(e) => onFieldChange('date', e.target.value)}
                className="invoice-input w-36 text-right"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <span className="text-muted-foreground">Place of Supply:</span>
              <input
                type="text"
                value={placeOfSupply}
                onChange={(e) => onFieldChange('placeOfSupply', e.target.value)}
                className="invoice-input w-36 text-right"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
