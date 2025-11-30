import { Plus, Printer, RotateCcw, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InvoiceControlsProps {
  onAddRow: () => void;
  onPrint: () => void;
  onReset: () => void;
  onShowHistory: () => void;
  savedBillsCount: number;
}

export function InvoiceControls({
  onAddRow,
  onPrint,
  onReset,
  onShowHistory,
  savedBillsCount,
}: InvoiceControlsProps) {
  return (
    <div className="no-print bg-card border border-border rounded-xl p-4 mb-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">TSF Invoice Builder</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={onShowHistory}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <History className="w-4 h-4" />
            Bills ({savedBillsCount})
          </Button>
          <Button
            onClick={onAddRow}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Row
          </Button>
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            New Invoice
          </Button>
          <Button
            onClick={onPrint}
            size="sm"
            className="gap-2"
          >
            <Printer className="w-4 h-4" />
            Print / Save
          </Button>
        </div>
      </div>
    </div>
  );
}
