import { InvoiceMode } from '@/types/invoice';
import { Plus, Printer, RotateCcw, FileText, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InvoiceControlsProps {
  mode: InvoiceMode;
  onModeChange: (mode: InvoiceMode) => void;
  onAddRow: () => void;
  onPrint: () => void;
  onReset: () => void;
}

export function InvoiceControls({
  mode,
  onModeChange,
  onAddRow,
  onPrint,
  onReset,
}: InvoiceControlsProps) {
  return (
    <div className="no-print bg-card border border-border rounded-xl p-4 mb-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Mode Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Invoice Type:</span>
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => onModeChange('normal')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                mode === 'normal'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-muted-foreground hover:bg-muted'
              }`}
            >
              <FileText className="w-4 h-4" />
              Normal (GST)
            </button>
            <button
              onClick={() => onModeChange('furniture')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                mode === 'furniture'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-muted-foreground hover:bg-muted'
              }`}
            >
              <Ruler className="w-4 h-4" />
              Furniture (TSF)
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
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
            Print / PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
