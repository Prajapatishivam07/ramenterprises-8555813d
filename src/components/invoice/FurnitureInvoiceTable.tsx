import { FurnitureInvoiceRow } from '@/types/invoice';
import { Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/invoiceUtils';

interface FurnitureInvoiceTableProps {
  rows: FurnitureInvoiceRow[];
  onUpdateRow: (id: string, field: keyof FurnitureInvoiceRow, value: string | number) => void;
  onRemoveRow: (id: string) => void;
}

export function FurnitureInvoiceTable({ rows, onUpdateRow, onRemoveRow }: FurnitureInvoiceTableProps) {
  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-invoice-border">
      <table className="invoice-table">
        <thead>
          <tr>
            <th className="w-12 text-center">Sr</th>
            <th className="min-w-[200px]">Product</th>
            <th className="w-32">Size (W×H ft)</th>
            <th className="w-24 text-center">TSF</th>
            <th className="w-28 text-right">Rate/sq.ft</th>
            <th className="w-32 text-right">Amount</th>
            <th className="w-12 no-print"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id} className="animate-fade-in">
              <td className="text-center font-medium text-muted-foreground">{index + 1}</td>
              <td>
                <input
                  type="text"
                  value={row.product}
                  onChange={(e) => onUpdateRow(row.id, 'product', e.target.value)}
                  className="invoice-input"
                  placeholder="Product name"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.size}
                  onChange={(e) => onUpdateRow(row.id, 'size', e.target.value)}
                  className="invoice-input font-mono"
                  placeholder="e.g., 4x6"
                />
              </td>
              <td className="text-center font-semibold text-primary">
                {row.tsf.toFixed(2)}
              </td>
              <td>
                <input
                  type="number"
                  value={row.rate || ''}
                  onChange={(e) => onUpdateRow(row.id, 'rate', parseFloat(e.target.value) || 0)}
                  className="invoice-input text-right"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </td>
              <td className="text-right font-semibold">
                {formatCurrency(row.amount)}
              </td>
              <td className="no-print">
                <button
                  onClick={() => onRemoveRow(row.id)}
                  className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                  title="Remove row"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
