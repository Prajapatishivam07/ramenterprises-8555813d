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
    <div className="mb-4 md:mb-6 overflow-x-auto rounded-lg border border-invoice-border">
      <table className="invoice-table text-xs md:text-sm min-w-[500px]">
        <thead>
          <tr>
            <th className="w-8 md:w-12 text-center">Sr</th>
            <th className="min-w-[120px] md:min-w-[200px]">Product</th>
            <th className="w-28 md:w-40">Size (W × H ft)</th>
            <th className="w-16 md:w-24 text-center">TSF</th>
            <th className="w-20 md:w-28 text-right">Rate/sq.ft</th>
            <th className="w-24 md:w-32 text-right">Amount</th>
            <th className="w-8 md:w-12 no-print"></th>
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
                  className="invoice-input text-xs md:text-sm"
                  placeholder="Product name"
                />
              </td>
              <td>
                <div className="flex items-center gap-0.5 md:gap-1">
                  <input
                    type="number"
                    value={row.width || ''}
                    onChange={(e) => onUpdateRow(row.id, 'width', parseFloat(e.target.value) || 0)}
                    className="invoice-input text-center w-10 md:w-14 font-mono text-xs md:text-sm"
                    placeholder="W"
                    min="0"
                    step="0.5"
                  />
                  <span className="text-muted-foreground font-bold text-sm md:text-lg">×</span>
                  <input
                    type="number"
                    value={row.height || ''}
                    onChange={(e) => onUpdateRow(row.id, 'height', parseFloat(e.target.value) || 0)}
                    className="invoice-input text-center w-10 md:w-14 font-mono text-xs md:text-sm"
                    placeholder="H"
                    min="0"
                    step="0.5"
                  />
                </div>
              </td>
              <td className="text-center font-semibold text-primary">
                {row.tsf.toFixed(2)}
              </td>
              <td>
                <input
                  type="number"
                  value={row.rate || ''}
                  onChange={(e) => onUpdateRow(row.id, 'rate', parseFloat(e.target.value) || 0)}
                  className="invoice-input text-right text-xs md:text-sm"
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
                  <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
