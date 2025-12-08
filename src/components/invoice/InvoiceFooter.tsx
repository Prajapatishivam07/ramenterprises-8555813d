import { useState } from 'react';
import signatureImage from '@/assets/signature.jpg';

export function InvoiceFooter() {
  const [includeSignature, setIncludeSignature] = useState(false);

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
          {/* Include Signature Toggle - Hidden in print */}
          <label className="flex items-center justify-end gap-2 mb-2 cursor-pointer no-print">
            <input
              type="checkbox"
              checked={includeSignature}
              onChange={(e) => setIncludeSignature(e.target.checked)}
              className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
            />
            <span className="text-xs text-foreground">Include Signature</span>
          </label>
          
          <div className="border-b-2 border-foreground/20 pb-2 mb-1 min-h-[40px] flex items-end justify-center">
            {includeSignature && (
              <img 
                src={signatureImage} 
                alt="Authorized Signature" 
                className="h-10 object-contain"
              />
            )}
          </div>
          <p className="text-xs font-semibold text-foreground">Authorized Signature</p>
        </div>
      </div>
    </div>
  );
}
