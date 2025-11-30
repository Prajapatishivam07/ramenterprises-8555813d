import { NormalInvoiceRow } from '@/types/invoice';
import { Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/invoiceUtils';

interface NormalInvoiceTableProps {
  rows: NormalInvoiceRow[];
  onUpdateRow: (id: string, field: keyof NormalInvoiceRow, value: string | number) => void;
  onRemoveRow: (id: string) => void;
}

export function NormalInvoiceTable({ rows, onUpdateRow, onRemoveRow }: NormalInvoiceTableProps) {
  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-invoice-border">
      <table className="invoice-table">
        <thead>
          <tr>
            <th className="w-12 text-center">Sr</th>
            <th className="min-w-[200px]">Item Name</th>
            <th className="w-24">HSN/SAC</th>
            <th className="w-20 text-center">Qty</th>
            <th className="w-28 text-right">Price</th>
            <th className="w-24 text-center">GST%</th>
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
                  value={row.itemName}
                  onChange={(e) => onUpdateRow(row.id, 'itemName', e.target.value)}
                  className="invoice-input"
                  placeholder="Item description"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.hsn}
                  onChange={(e) => onUpdateRow(row.id, 'hsn', e.target.value)}
                  className="invoice-input font-mono text-sm"
                  placeholder="HSN"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.qty || ''}
                  onChange={(e) => onUpdateRow(row.id, 'qty', parseFloat(e.target.value) || 0)}
                  className="invoice-input text-center"
                  placeholder="0"
                  min="0"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.price || ''}
                  onChange={(e) => onUpdateRow(row.id, 'price', parseFloat(e.target.value) || 0)}
                  className="invoice-input text-right"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </td>
              <td>
                <select
                  value={row.gstPercent}
                  onChange={(e) => onUpdateRow(row.id, 'gstPercent', parseFloat(e.target.value))}
                  className="invoice-input text-center bg-transparent"
                >
                  <option value={0}>0%</option>
                  <option value={5}>5%</option>
                  <option value={12}>12%</option>
                  <option value={18}>18%</option>
                  <option value={28}>28%</option>
                </select>
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
