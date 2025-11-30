import { SavedBill } from '@/types/invoice';
import { formatCurrency } from '@/lib/invoiceUtils';
import { downloadAllBillsAsZip, downloadSingleBillHtml } from '@/lib/pdfUtils';
import { X, Trash2, FileText, Download, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface BillHistoryProps {
  bills: SavedBill[];
  onLoadBill: (bill: SavedBill) => void;
  onDeleteBill: (id: string) => void;
  onClose: () => void;
}

export function BillHistory({ bills, onLoadBill, onDeleteBill, onClose }: BillHistoryProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDownloadBill = async (bill: SavedBill, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await downloadSingleBillHtml(bill);
      toast.success('Bill downloaded successfully');
    } catch (error) {
      toast.error('Failed to download bill');
    }
  };

  const handleDownloadAll = async () => {
    if (bills.length === 0) {
      toast.error('No bills to download');
      return;
    }
    try {
      await downloadAllBillsAsZip(bills);
      toast.success('All bills downloaded as ZIP');
    } catch (error) {
      toast.error('Failed to download bills');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Saved Bills</h2>
          <div className="flex items-center gap-2">
            {bills.length > 0 && (
              <Button
                onClick={handleDownloadAll}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Archive className="w-4 h-4" />
                Backup All
              </Button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {bills.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No saved bills yet</p>
              <p className="text-sm mt-1">Bills will appear here after you save them</p>
            </div>
          ) : (
            <div className="space-y-3">
              {bills.map((bill) => (
                <div
                  key={bill.id}
                  className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 cursor-pointer" onClick={() => { onLoadBill(bill); onClose(); }}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
                          #{bill.billNumber}
                        </span>
                        <span className="font-medium text-foreground">
                          {bill.billName || `Bill #${bill.billNumber}`}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(bill.savedAt)}
                        </span>
                      </div>
                      <div className="text-sm space-y-1">
                        <p className="text-muted-foreground">{bill.invoice.customer.name || 'No customer name'}</p>
                        <p className="text-muted-foreground">
                          {bill.invoice.rows.length} item(s) • Total: {formatCurrency(bill.summary.grandTotal)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleDownloadBill(bill, e)}
                        className="text-primary hover:text-primary hover:bg-primary/10"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteBill(bill.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
