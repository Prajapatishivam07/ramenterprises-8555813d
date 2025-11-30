import { Plus, Printer, RotateCcw, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InvoiceControlsProps {
  onAddRow: () => void;
  onPrint: () => void;
  onReset: () => void;
  onShowHistory: () => void;
  savedBillsCount: number;
  billName: string;
  onBillNameChange: (value: string) => void;
}

export function InvoiceControls({
  onAddRow,
  onPrint,
  onReset,
  onShowHistory,
  savedBillsCount,
  billName,
  onBillNameChange,
}: InvoiceControlsProps) {
  return (
    <div className="no-print bg-card border border-border rounded-xl p-4 mb-6 shadow-sm w-full max-w-full overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-sm font-medium text-muted-foreground">TSF Invoice Builder</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 max-w-full">
          <input
            type="text"
            value={billName}
            onChange={(e) => onBillNameChange(e.target.value)}
            placeholder="Bill name (optional)"
            className="px-3 py-1.5 text-sm border border-input rounded-md bg-background w-32 sm:w-40 flex-shrink min-w-0"
          />
          <Button
            onClick={onShowHistory}
            variant="outline"
            size="sm"
            className="gap-1.5 flex-shrink-0"
          >
            <History className="w-4 h-4" />
            <span className="hidden sm:inline">Bills</span> ({savedBillsCount})
          </Button>
          <Button
            onClick={onAddRow}
            variant="outline"
            size="sm"
            className="gap-1.5 flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Row</span>
          </Button>
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="gap-1.5 flex-shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">New Invoice</span>
          </Button>
          <Button
            onClick={onPrint}
            size="sm"
            className="gap-1.5 flex-shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print / Save</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
