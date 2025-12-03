import { InvoiceSummary as InvoiceSummaryType } from '@/types/invoice';
import { formatCurrency, amountInWords } from '@/lib/invoiceUtils';

interface InvoiceSummaryProps {
  summary: InvoiceSummaryType;
  sgstPercent: number;
  cgstPercent: number;
  received: number;
  includeGst: boolean;
  onSgstChange: (value: number) => void;
  onCgstChange: (value: number) => void;
  onReceivedChange: (value: number) => void;
  onToggleGst: (value: boolean) => void;
}

export function InvoiceSummary({
  summary,
  sgstPercent,
  cgstPercent,
  received,
  includeGst,
  onSgstChange,
  onCgstChange,
  onReceivedChange,
  onToggleGst,
}: InvoiceSummaryProps) {
  return (
    <div className="flex justify-between gap-6 mb-4 invoice-summary">
      <div className="flex-1">
        <div className="bg-secondary/50 rounded-lg p-3">
          <h4 className="text-xs font-medium text-foreground mb-1">Amount in Words</h4>
          <p className="text-sm font-medium text-foreground leading-snug">
            {amountInWords(summary.grandTotal)}
          </p>
        </div>
        
        <label className="flex items-center gap-2 mt-3 cursor-pointer no-print">
          <input
            type="checkbox"
            checked={includeGst}
            onChange={(e) => onToggleGst(e.target.checked)}
            className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
          />
          <span className="text-sm text-foreground">Include GST in Invoice</span>
        </label>
      </div>

      <div className="w-72">
        <div className="border border-invoice-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-invoice-border">
                <td className="px-3 py-1.5 text-foreground">Sub Total</td>
                <td className="px-3 py-1.5 text-right font-semibold">
                  {formatCurrency(summary.subtotal)}
                </td>
              </tr>
              
              {includeGst && (
                <>
                  <tr className="border-b border-invoice-border">
                    <td className="px-3 py-1.5 text-foreground">
                      <span>SGST @</span>
                      <input
                        type="number"
                        value={sgstPercent}
                        onChange={(e) => onSgstChange(parseFloat(e.target.value) || 0)}
                        className="w-10 mx-1 px-1 py-0.5 border border-input rounded text-center text-foreground bg-transparent text-xs"
                        min="0"
                        max="50"
                      />
                      <span>%</span>
                    </td>
                    <td className="px-3 py-1.5 text-right font-semibold">
                      {formatCurrency(summary.sgstAmount)}
                    </td>
                  </tr>
                  <tr className="border-b border-invoice-border">
                    <td className="px-3 py-1.5 text-foreground">
                      <span>CGST @</span>
                      <input
                        type="number"
                        value={cgstPercent}
                        onChange={(e) => onCgstChange(parseFloat(e.target.value) || 0)}
                        className="w-10 mx-1 px-1 py-0.5 border border-input rounded text-center text-foreground bg-transparent text-xs"
                        min="0"
                        max="50"
                      />
                      <span>%</span>
                    </td>
                    <td className="px-3 py-1.5 text-right font-semibold">
                      {formatCurrency(summary.cgstAmount)}
                    </td>
                  </tr>
                </>
              )}
              
              <tr className="border-b border-invoice-border bg-primary/5">
                <td className="px-3 py-2 font-semibold text-foreground">Grand Total</td>
                <td className="px-3 py-2 text-right font-bold text-primary">
                  {formatCurrency(summary.grandTotal)}
                </td>
              </tr>
              
              <tr className="border-b border-invoice-border">
                <td className="px-3 py-1.5 text-foreground">Received</td>
                <td className="px-3 py-1.5 text-right">
                  <input
                    type="number"
                    value={received || ''}
                    onChange={(e) => onReceivedChange(parseFloat(e.target.value) || 0)}
                    className="w-24 px-2 py-0.5 border border-input rounded text-right font-semibold text-invoice-success bg-transparent text-sm"
                    placeholder="0.00"
                    min="0"
                  />
                </td>
              </tr>
              
              <tr className="bg-destructive/5">
                <td className="px-3 py-2 font-semibold text-foreground">Balance Due</td>
                <td className="px-3 py-2 text-right font-bold text-destructive">
                  {formatCurrency(summary.balance)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
