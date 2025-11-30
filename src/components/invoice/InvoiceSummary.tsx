import { InvoiceData, InvoiceSummary as InvoiceSummaryType } from '@/types/invoice';
import { formatCurrency, amountInWords } from '@/lib/invoiceUtils';

interface InvoiceSummaryProps {
  summary: InvoiceSummaryType;
  sgstPercent: number;
  cgstPercent: number;
  received: number;
  mode: InvoiceData['mode'];
  includeGstInFurniture: boolean;
  onSgstChange: (value: number) => void;
  onCgstChange: (value: number) => void;
  onReceivedChange: (value: number) => void;
  onToggleGstInFurniture: (value: boolean) => void;
}

export function InvoiceSummary({
  summary,
  sgstPercent,
  cgstPercent,
  received,
  mode,
  includeGstInFurniture,
  onSgstChange,
  onCgstChange,
  onReceivedChange,
  onToggleGstInFurniture,
}: InvoiceSummaryProps) {
  const showGst = mode === 'normal' || includeGstInFurniture;

  return (
    <div className="flex justify-between gap-8 mb-6">
      {/* Amount in Words */}
      <div className="flex-1">
        <div className="bg-secondary/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Amount in Words</h4>
          <p className="text-sm font-medium text-foreground leading-relaxed">
            {amountInWords(summary.grandTotal)}
          </p>
        </div>
        
        {mode === 'furniture' && (
          <label className="flex items-center gap-2 mt-4 cursor-pointer no-print">
            <input
              type="checkbox"
              checked={includeGstInFurniture}
              onChange={(e) => onToggleGstInFurniture(e.target.checked)}
              className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
            />
            <span className="text-sm text-muted-foreground">Include GST in Furniture Invoice</span>
          </label>
        )}
      </div>

      {/* Summary Table */}
      <div className="w-80">
        <div className="border border-invoice-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-invoice-border">
                <td className="px-4 py-2 text-muted-foreground">Sub Total</td>
                <td className="px-4 py-2 text-right font-semibold">
                  {formatCurrency(summary.subtotal)}
                </td>
              </tr>
              
              {showGst && (
                <>
                  <tr className="border-b border-invoice-border">
                    <td className="px-4 py-2 text-muted-foreground">
                      <span>SGST @</span>
                      <input
                        type="number"
                        value={sgstPercent}
                        onChange={(e) => onSgstChange(parseFloat(e.target.value) || 0)}
                        className="w-12 mx-1 px-1 py-0.5 border border-input rounded text-center text-foreground bg-transparent"
                        min="0"
                        max="50"
                      />
                      <span>%</span>
                    </td>
                    <td className="px-4 py-2 text-right font-semibold">
                      {formatCurrency(summary.sgstAmount)}
                    </td>
                  </tr>
                  <tr className="border-b border-invoice-border">
                    <td className="px-4 py-2 text-muted-foreground">
                      <span>CGST @</span>
                      <input
                        type="number"
                        value={cgstPercent}
                        onChange={(e) => onCgstChange(parseFloat(e.target.value) || 0)}
                        className="w-12 mx-1 px-1 py-0.5 border border-input rounded text-center text-foreground bg-transparent"
                        min="0"
                        max="50"
                      />
                      <span>%</span>
                    </td>
                    <td className="px-4 py-2 text-right font-semibold">
                      {formatCurrency(summary.cgstAmount)}
                    </td>
                  </tr>
                </>
              )}
              
              <tr className="border-b border-invoice-border bg-primary/5">
                <td className="px-4 py-3 font-semibold text-foreground">Grand Total</td>
                <td className="px-4 py-3 text-right font-bold text-lg text-primary">
                  {formatCurrency(summary.grandTotal)}
                </td>
              </tr>
              
              <tr className="border-b border-invoice-border">
                <td className="px-4 py-2 text-muted-foreground">Received</td>
                <td className="px-4 py-2 text-right">
                  <input
                    type="number"
                    value={received || ''}
                    onChange={(e) => onReceivedChange(parseFloat(e.target.value) || 0)}
                    className="w-28 px-2 py-1 border border-input rounded text-right font-semibold text-invoice-success bg-transparent"
                    placeholder="0.00"
                    min="0"
                  />
                </td>
              </tr>
              
              <tr className="bg-destructive/5">
                <td className="px-4 py-3 font-semibold text-foreground">Balance Due</td>
                <td className="px-4 py-3 text-right font-bold text-lg text-destructive">
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
