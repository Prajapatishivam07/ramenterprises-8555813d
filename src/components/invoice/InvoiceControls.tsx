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
    <div className="no-print bg-card border border-border rounded-xl p-3 md:p-4 mb-4 md:mb-6 shadow-sm">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm font-medium text-muted-foreground">TSF Invoice Builder</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={billName}
            onChange={(e) => onBillNameChange(e.target.value)}
            placeholder="Bill name (optional)"
            className="px-2 md:px-3 py-1.5 text-xs md:text-sm border border-input rounded-md bg-background w-28 md:w-40 flex-shrink-0"
          />
          <Button
            onClick={onShowHistory}
            variant="outline"
            size="sm"
            className="gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-3"
          >
            <History className="w-3 h-3 md:w-4 md:h-4" />
            Bills ({savedBillsCount})
          </Button>
          <Button
            onClick={onAddRow}
            variant="outline"
            size="sm"
            className="gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-3"
          >
            <Plus className="w-3 h-3 md:w-4 md:h-4" />
            Add Row
          </Button>
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-3"
          >
            <RotateCcw className="w-3 h-3 md:w-4 md:h-4" />
            New Invoice
          </Button>
          <Button
            onClick={onPrint}
            size="sm"
            className="gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-3"
          >
            <Printer className="w-3 h-3 md:w-4 md:h-4" />
            Print / Save
          </Button>
        </div>
      </div>
    </div>
  );
}
