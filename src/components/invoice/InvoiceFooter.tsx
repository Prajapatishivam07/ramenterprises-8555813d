export function InvoiceFooter() {
  return (
    <div className="border-t-2 border-invoice-border pt-3 md:pt-4 mt-auto invoice-footer">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
        {/* Terms & Conditions - Fixed text */}
        <div className="flex-1">
          <h4 className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Terms & Conditions
          </h4>
          <p className="text-[10px] md:text-xs text-muted-foreground">
            Thank you for doing business with us
          </p>
        </div>

        {/* Signature */}
        <div className="w-36 md:w-48 text-right ml-auto">
          <div className="border-b-2 border-foreground/20 pb-8 md:pb-10 mb-1">
            {/* Signature space */}
          </div>
          <p className="text-[10px] md:text-xs font-semibold text-foreground">Authorized Signature</p>
        </div>
      </div>
    </div>
  );
}