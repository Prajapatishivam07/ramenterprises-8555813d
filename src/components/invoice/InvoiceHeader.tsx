import { InvoiceData } from '@/types/invoice';
import ramLogo from '@/assets/ram-enterprises-logo.jpg';

interface InvoiceHeaderProps {
  shop: InvoiceData['shop'];
  invoiceNumber: string;
  date: string;
  onShopChange: (field: keyof InvoiceData['shop'], value: string) => void;
  onFieldChange: <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => void;
}

export function InvoiceHeader({
  shop,
  invoiceNumber,
  date,
  onShopChange,
  onFieldChange,
}: InvoiceHeaderProps) {
  // Split phone numbers for display (if contains separator)
  const phoneNumbers = shop.phone.split(/[\/,]/).map(p => p.trim()).filter(Boolean);

  return (
    <div className="border-b-2 border-invoice-border pb-6 mb-6">
      <div className="flex justify-between items-start">
        {/* Left: Shop Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            {/* Fixed Logo */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={ramLogo} 
                alt="Ram Enterprises Logo" 
                className="w-full h-full object-contain bg-muted"
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-foreground print:text-xl">
              {shop.name}
            </span>
          </div>
          <div className="space-y-1 text-sm text-foreground ml-0">
            {/* Address - Full display with line break preserved */}
            <div className="font-semibold whitespace-pre-line">
              {shop.address}
            </div>
            {/* Phone Numbers - Each on separate line */}
            {phoneNumbers.map((phone, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="font-medium text-xs">Phone:</span>
                <span className="font-semibold">{phone}</span>
              </div>
            ))}
            {/* Email */}
            {shop.email && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-xs">Email:</span>
                <span className="font-semibold">{shop.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Invoice Details */}
        <div className="text-right space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">TAX INVOICE</h1>
          <div className="space-y-1 text-sm text-foreground">
            <div className="flex items-center justify-end gap-2">
              <span className="font-medium">Invoice No:</span>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => onFieldChange('invoiceNumber', e.target.value)}
                className="invoice-input w-28 sm:w-36 text-right font-mono font-semibold"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <span className="font-medium">Date:</span>
              <input
                type="date"
                value={date}
                onChange={(e) => onFieldChange('date', e.target.value)}
                className="invoice-input w-28 sm:w-36 text-right"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <span className="font-medium">GSTIN:</span>
              <input
                type="text"
                value={shop.gstin}
                onChange={(e) => onShopChange('gstin', e.target.value)}
                className="invoice-input w-32 sm:w-40 text-right font-mono font-semibold"
                placeholder="GSTIN Number"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
