import { InvoiceData } from '@/types/invoice';

interface CustomerSectionProps {
  customer: InvoiceData['customer'];
  onChange: (field: keyof InvoiceData['customer'], value: string) => void;
}

export function CustomerSection({ customer, onChange }: CustomerSectionProps) {
  return (
    <div className="bg-secondary/50 rounded-lg p-4 mb-6">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Bill To
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            value={customer.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="invoice-input text-lg font-bold text-foreground mb-2"
            placeholder="Customer Name"
          />
          <textarea
            value={customer.address}
            onChange={(e) => onChange('address', e.target.value)}
            className="invoice-input w-full resize-none text-sm font-semibold"
            placeholder="Customer Address"
            rows={2}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground w-16 font-medium">Phone:</span>
            <input
              type="text"
              value={customer.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="invoice-input flex-1 font-semibold"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground w-16 font-medium">GSTIN:</span>
            <input
              type="text"
              value={customer.gstin}
              onChange={(e) => onChange('gstin', e.target.value)}
              className="invoice-input flex-1 font-mono font-semibold"
              placeholder="Customer GSTIN (if applicable)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
