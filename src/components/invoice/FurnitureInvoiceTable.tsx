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
    <div className="mb-3 rounded-lg border border-invoice-border">
      <table className="invoice-table text-[10px] md:text-xs w-full">
        <thead>
          <tr>
            <th className="w-6 md:w-8 text-center px-1 py-1.5">SR</th>
            <th className="px-1 py-1.5">PRODUCT</th>
            <th className="w-20 md:w-28 px-1 py-1.5">SIZE (W × H FT)</th>
            <th className="w-10 md:w-14 text-center px-1 py-1.5">TSF</th>
            <th className="w-14 md:w-20 text-right px-1 py-1.5">RATE/SQ.FT</th>
            <th className="w-16 md:w-20 text-right px-1 py-1.5">AMOUNT</th>
            <th className="w-6 no-print"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id} className="animate-fade-in">
              <td className="text-center font-medium text-foreground px-1 py-1">{index + 1}</td>
              <td className="px-1 py-1">
                <input
                  type="text"
                  value={row.product}
                  onChange={(e) => onUpdateRow(row.id, 'product', e.target.value)}
                  className="invoice-input text-[10px] md:text-xs w-full"
                  placeholder="Product name"
                />
              </td>
              <td className="px-1 py-1">
                <div className="flex items-center gap-0.5 justify-center">
                  <input
                    type="number"
                    value={row.width || ''}
                    onChange={(e) => onUpdateRow(row.id, 'width', parseFloat(e.target.value) || 0)}
                    className="invoice-input text-center w-7 md:w-10 font-mono text-[10px] md:text-xs"
                    placeholder="W"
                    min="0"
                    step="0.5"
                  />
                  <span className="text-foreground font-bold text-xs">×</span>
                  <input
                    type="number"
                    value={row.height || ''}
                    onChange={(e) => onUpdateRow(row.id, 'height', parseFloat(e.target.value) || 0)}
                    className="invoice-input text-center w-7 md:w-10 font-mono text-[10px] md:text-xs"
                    placeholder="H"
                    min="0"
                    step="0.5"
                  />
                </div>
              </td>
              <td className="text-center font-semibold text-primary px-1 py-1">
                {row.tsf.toFixed(2)}
              </td>
              <td className="px-1 py-1">
                <input
                  type="number"
                  value={row.rate || ''}
                  onChange={(e) => onUpdateRow(row.id, 'rate', parseFloat(e.target.value) || 0)}
                  className="invoice-input text-right text-[10px] md:text-xs w-full"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </td>
              <td className="text-right font-semibold px-1 py-1">
                {formatCurrency(row.amount)}
              </td>
              <td className="no-print px-0.5 py-1">
                <button
                  onClick={() => onRemoveRow(row.id)}
                  className="p-0.5 text-muted-foreground hover:text-destructive transition-colors"
                  title="Remove row"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
