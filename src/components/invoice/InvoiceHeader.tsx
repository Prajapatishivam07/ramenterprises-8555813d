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
    <div className="border-b-2 border-invoice-border pb-4 md:pb-6 mb-4 md:mb-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        {/* Left: Shop Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            {/* Fixed Logo */}
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={ramLogo} 
                alt="Ram Enterprises Logo" 
                className="w-full h-full object-contain bg-muted"
              />
            </div>
            <span className="text-lg md:text-2xl font-bold text-foreground print:text-xl">
              {shop.name}
            </span>
          </div>
          <div className="space-y-0.5 md:space-y-1 text-xs md:text-sm text-foreground">
            {/* Address - Full display with line break preserved */}
            <div className="font-semibold whitespace-pre-line">
              {shop.address}
            </div>
            {/* Phone Numbers - Each on separate line */}
            {phoneNumbers.map((phone, index) => (
              <div key={index} className="flex items-center gap-1 md:gap-2">
                <span className="font-medium text-[10px] md:text-xs">Phone:</span>
                <span className="font-semibold">{phone}</span>
              </div>
            ))}
            {/* Email */}
            {shop.email && (
              <div className="flex items-center gap-1 md:gap-2">
                <span className="font-medium text-[10px] md:text-xs">Email:</span>
                <span className="font-semibold break-all">{shop.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Invoice Details */}
        <div className="text-left md:text-right space-y-1 md:space-y-2">
          <h1 className="text-xl md:text-3xl font-bold text-primary tracking-tight">TAX INVOICE</h1>
          <div className="space-y-1 text-xs md:text-sm text-foreground">
            <div className="flex items-center md:justify-end gap-2">
              <span className="font-medium">Invoice No:</span>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => onFieldChange('invoiceNumber', e.target.value)}
                className="invoice-input w-24 md:w-36 text-left md:text-right font-mono font-semibold"
              />
            </div>
            <div className="flex items-center md:justify-end gap-2">
              <span className="font-medium">Date:</span>
              <input
                type="date"
                value={date}
                onChange={(e) => onFieldChange('date', e.target.value)}
                className="invoice-input w-28 md:w-36 text-left md:text-right"
              />
            </div>
            <div className="flex items-center md:justify-end gap-2">
              <span className="font-medium">GSTIN:</span>
              <input
                type="text"
                value={shop.gstin}
                onChange={(e) => onShopChange('gstin', e.target.value)}
                className="invoice-input w-28 md:w-40 text-left md:text-right font-mono font-semibold"
                placeholder="GSTIN Number"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
