import { InvoiceData } from '@/types/invoice';

interface CustomerSectionProps {
  customer: InvoiceData['customer'];
  onChange: (field: keyof InvoiceData['customer'], value: string) => void;
}

export function CustomerSection({ customer, onChange }: CustomerSectionProps) {
  return (
    <div className="bg-secondary/50 rounded-lg p-3 mb-4">
      <h3 className="text-[10px] md:text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
        Bill To
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            type="text"
            value={customer.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="invoice-input text-sm md:text-base font-bold text-foreground mb-1"
            placeholder="Customer Name"
          />
          <textarea
            value={customer.address}
            onChange={(e) => onChange('address', e.target.value)}
            className="invoice-input w-full resize-none text-[10px] md:text-xs font-semibold"
            placeholder="Customer Address"
            rows={2}
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <span className="text-[10px] md:text-xs text-foreground w-12 font-medium">Phone:</span>
            <input
              type="text"
              value={customer.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="invoice-input flex-1 font-semibold text-[10px] md:text-xs"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] md:text-xs text-foreground w-12 font-medium">GSTIN:</span>
            <input
              type="text"
              value={customer.gstin}
              onChange={(e) => onChange('gstin', e.target.value)}
              className="invoice-input flex-1 font-mono font-semibold text-[10px] md:text-xs"
              placeholder="Customer GSTIN (if applicable)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
