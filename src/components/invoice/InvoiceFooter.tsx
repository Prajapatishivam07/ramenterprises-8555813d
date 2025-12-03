export function InvoiceFooter() {
  return (
    <div className="border-t-2 border-invoice-border pt-4 mt-auto invoice-footer">
      <div className="flex justify-between gap-6">
        {/* Terms & Conditions - Fixed text */}
        <div className="flex-1">
          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
            Terms & Conditions
          </h4>
          <p className="text-xs text-foreground">
            Thank you for doing business with us
          </p>
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