export function InvoiceFooter() {
  return (
    <div className="border-t-2 border-invoice-border pt-3 mt-auto invoice-footer">
      <div className="flex justify-between gap-4">
        {/* Terms & Conditions - Fixed text */}
        <div className="flex-1">
          <h4 className="text-[9px] md:text-[10px] font-semibold text-foreground uppercase tracking-wider mb-0.5">
            Terms & Conditions
          </h4>
          <p className="text-[9px] md:text-[10px] text-foreground">
            Thank you for doing business with us
          </p>
        </div>

        {/* Signature */}
        <div className="w-32 md:w-40 text-right">
          <div className="border-b-2 border-foreground/20 pb-6 md:pb-8 mb-1">
            {/* Signature space */}
          </div>
          <p className="text-[9px] md:text-[10px] font-semibold text-foreground">Authorized Signature</p>
        </div>
      </div>
    </div>
  );
}
