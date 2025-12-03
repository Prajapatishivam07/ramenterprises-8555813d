import { InvoiceData } from '@/types/invoice';

interface CustomerSectionProps {
  customer: InvoiceData['customer'];
  onChange: (field: keyof InvoiceData['customer'], value: string) => void;
}

export function CustomerSection({ customer, onChange }: CustomerSectionProps) {
  return (
    <div className="bg-secondary/50 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
      <h3 className="text-xs md:text-sm font-semibold text-foreground uppercase tracking-wider mb-2 md:mb-3">
        Bill To
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div>
          <input
            type="text"
            value={customer.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="invoice-input text-base md:text-lg font-bold text-foreground mb-2"
            placeholder="Customer Name"
          />
          <textarea
            value={customer.address}
            onChange={(e) => onChange('address', e.target.value)}
            className="invoice-input w-full resize-none text-xs md:text-sm font-semibold"
            placeholder="Customer Address"
            rows={2}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm text-foreground w-14 md:w-16 font-medium">Phone:</span>
            <input
              type="text"
              value={customer.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="invoice-input flex-1 font-semibold text-sm"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm text-foreground w-14 md:w-16 font-medium">GSTIN:</span>
            <input
              type="text"
              value={customer.gstin}
              onChange={(e) => onChange('gstin', e.target.value)}
              className="invoice-input flex-1 font-mono font-semibold text-sm"
              placeholder="Customer GSTIN (if applicable)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
