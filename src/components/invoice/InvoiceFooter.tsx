interface InvoiceFooterProps {
  terms: string;
  onTermsChange: (value: string) => void;
}

export function InvoiceFooter({ terms, onTermsChange }: InvoiceFooterProps) {
  return (
    <div className="border-t-2 border-invoice-border pt-4 mt-auto invoice-footer">
      <div className="flex justify-between gap-6">
        {/* Terms & Conditions */}
        <div className="flex-1">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Terms & Conditions
          </h4>
          <textarea
            value={terms}
            onChange={(e) => onTermsChange(e.target.value)}
            className="invoice-input w-full text-xs text-muted-foreground resize-none"
            rows={2}
            placeholder="Enter terms and conditions..."
          />
        </div>

        {/* Signature */}
        <div className="w-48 text-right">
          <div className="border-b-2 border-foreground/20 pb-10 mb-1">
            {/* Signature space */}
          </div>
          <p className="text-xs font-semibold text-foreground">Authorized Signature</p>
        </div>
      </div>
    </div>
  );
}
