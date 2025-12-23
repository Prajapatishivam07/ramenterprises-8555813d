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
            <th className="w-40">Size (W × H ft)</th>
            <th className="w-24 text-center">TSF/Qty</th>
            <th className="w-28 text-right">Rate/sq.ft</th>
            <th className="w-32 text-right">Amount</th>
            <th className="w-12 no-print"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id} className="animate-fade-in">
              <td className="text-center font-medium text-foreground">{index + 1}</td>
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
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={row.width || ''}
                    onChange={(e) => onUpdateRow(row.id, 'width', parseFloat(e.target.value) || 0)}
                    className="invoice-input text-center w-14 font-mono"
                    placeholder="W"
                    min="0"
                    step="0.5"
                  />
                  <span className="text-muted-foreground font-bold text-lg">×</span>
                  <input
                    type="number"
                    value={row.height || ''}
                    onChange={(e) => onUpdateRow(row.id, 'height', parseFloat(e.target.value) || 0)}
                    className="invoice-input text-center w-14 font-mono"
                    placeholder="H"
                    min="0"
                    step="0.5"
                  />
                </div>
              </td>
              <td>
                <input
                  type="number"
                  value={row.tsf || ''}
                  onChange={(e) => onUpdateRow(row.id, 'tsf', parseFloat(e.target.value) || 0)}
                  className="invoice-input text-center font-semibold text-primary"
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
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
              <td>
                <input
                  type="number"
                  value={row.amount || ''}
                  onChange={(e) => onUpdateRow(row.id, 'amount', parseFloat(e.target.value) || 0)}
                  className="invoice-input text-right font-semibold"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
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
