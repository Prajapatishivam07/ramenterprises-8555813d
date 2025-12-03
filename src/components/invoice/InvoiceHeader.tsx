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
    <div className="border-b-2 border-invoice-border pb-4 mb-4">
      <div className="flex justify-between items-start gap-2">
        {/* Left: Shop Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {/* Fixed Logo */}
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg overflow-hidden flex-shrink-0 print:w-12 print:h-12">
              <img 
                src={ramLogo} 
                alt="Ram Enterprises Logo" 
                className="w-full h-full object-contain bg-muted"
              />
            </div>
            <span className="text-sm md:text-xl font-bold text-foreground print:text-base">
              {shop.name}
            </span>
          </div>
          <div className="space-y-0.5 text-[10px] md:text-xs text-foreground print:text-[9px]">
            {/* Address - Full display with line break preserved */}
            <div className="font-semibold whitespace-pre-line leading-tight">
              {shop.address}
            </div>
            {/* Phone Numbers - Each on separate line */}
            {phoneNumbers.map((phone, index) => (
              <div key={index} className="flex items-center gap-1">
                <span className="font-medium text-[9px] md:text-[10px]">Phone:</span>
                <span className="font-semibold">{phone}</span>
              </div>
            ))}
            {/* Email */}
            {shop.email && (
              <div className="flex items-center gap-1">
                <span className="font-medium text-[9px] md:text-[10px]">Email:</span>
                <span className="font-semibold break-all">{shop.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Invoice Details */}
        <div className="text-right space-y-1 flex-shrink-0">
          <h1 className="text-lg md:text-2xl font-bold text-primary tracking-tight print:text-xl">TAX INVOICE</h1>
          <div className="space-y-0.5 text-[10px] md:text-xs text-foreground print:text-[9px]">
            <div className="flex items-center justify-end gap-1">
              <span className="font-medium">Invoice No:</span>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => onFieldChange('invoiceNumber', e.target.value)}
                className="invoice-input w-24 md:w-32 text-right font-mono font-semibold print:w-28"
              />
            </div>
            <div className="flex items-center justify-end gap-1">
              <span className="font-medium">Date:</span>
              <input
                type="date"
                value={date}
                onChange={(e) => onFieldChange('date', e.target.value)}
                className="invoice-input w-24 md:w-32 text-right print:w-28"
              />
            </div>
            <div className="flex items-center justify-end gap-1">
              <span className="font-medium">GSTIN:</span>
              <input
                type="text"
                value={shop.gstin}
                onChange={(e) => onShopChange('gstin', e.target.value)}
                className="invoice-input w-24 md:w-32 text-right font-mono font-semibold print:w-28"
                placeholder="GSTIN Number"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
