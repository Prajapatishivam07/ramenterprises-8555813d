interface InvoiceFooterProps {
  terms: string;
  onTermsChange: (value: string) => void;
}

export function InvoiceFooter({ terms, onTermsChange }: InvoiceFooterProps) {
  return (
    <div className="border-t-2 border-invoice-border pt-6 mt-auto">
      <div className="flex justify-between gap-8">
        {/* Terms & Conditions */}
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Terms & Conditions
          </h4>
          <textarea
            value={terms}
            onChange={(e) => onTermsChange(e.target.value)}
            className="invoice-input w-full text-sm text-muted-foreground resize-none"
            rows={3}
            placeholder="Enter terms and conditions..."
          />
        </div>

        {/* Signature */}
        <div className="w-64 text-right">
          <div className="border-b-2 border-foreground/20 pb-16 mb-2">
            {/* Signature space */}
          </div>
          <p className="text-sm font-semibold text-foreground">Authorized Signature</p>
        </div>
      </div>
    </div>
  );
}
