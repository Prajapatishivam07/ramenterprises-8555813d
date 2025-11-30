import { useInvoice } from '@/hooks/useInvoice';
import { InvoiceControls } from '@/components/invoice/InvoiceControls';
import { InvoiceHeader } from '@/components/invoice/InvoiceHeader';
import { CustomerSection } from '@/components/invoice/CustomerSection';
import { NormalInvoiceTable } from '@/components/invoice/NormalInvoiceTable';
import { FurnitureInvoiceTable } from '@/components/invoice/FurnitureInvoiceTable';
import { InvoiceSummary } from '@/components/invoice/InvoiceSummary';
import { InvoiceFooter } from '@/components/invoice/InvoiceFooter';
import { FileText } from 'lucide-react';

const Index = () => {
  const {
    invoice,
    summary,
    updateField,
    updateCustomer,
    updateShop,
    updateNormalRow,
    updateFurnitureRow,
    addRow,
    removeRow,
    resetInvoice,
    printInvoice,
  } = useInvoice();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      {/* Page Title */}
      <div className="max-w-[210mm] mx-auto mb-6 no-print">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Invoice Builder</h1>
            <p className="text-sm text-muted-foreground">Create professional A4 invoices with auto calculations</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-[210mm] mx-auto">
        <InvoiceControls
          mode={invoice.mode}
          onModeChange={(mode) => updateField('mode', mode)}
          onAddRow={addRow}
          onPrint={printInvoice}
          onReset={resetInvoice}
        />
      </div>

      {/* Invoice Container */}
      <div className="invoice-container p-8 rounded-lg">
        <InvoiceHeader
          shop={invoice.shop}
          invoiceNumber={invoice.invoiceNumber}
          date={invoice.date}
          placeOfSupply={invoice.placeOfSupply}
          onShopChange={updateShop}
          onFieldChange={updateField}
        />

        <CustomerSection
          customer={invoice.customer}
          onChange={updateCustomer}
        />

        {invoice.mode === 'normal' ? (
          <NormalInvoiceTable
            rows={invoice.normalRows}
            onUpdateRow={updateNormalRow}
            onRemoveRow={removeRow}
          />
        ) : (
          <FurnitureInvoiceTable
            rows={invoice.furnitureRows}
            onUpdateRow={updateFurnitureRow}
            onRemoveRow={removeRow}
          />
        )}

        <InvoiceSummary
          summary={summary}
          sgstPercent={invoice.sgstPercent}
          cgstPercent={invoice.cgstPercent}
          received={invoice.received}
          mode={invoice.mode}
          includeGstInFurniture={invoice.includeGstInFurniture}
          onSgstChange={(value) => updateField('sgstPercent', value)}
          onCgstChange={(value) => updateField('cgstPercent', value)}
          onReceivedChange={(value) => updateField('received', value)}
          onToggleGstInFurniture={(value) => updateField('includeGstInFurniture', value)}
        />

        <InvoiceFooter
          terms={invoice.terms}
          onTermsChange={(value) => updateField('terms', value)}
        />
      </div>

      {/* Footer Info */}
      <div className="max-w-[210mm] mx-auto mt-6 text-center text-xs text-muted-foreground no-print">
        <p>Data is automatically saved to your browser. Use "Print / PDF" to export.</p>
      </div>
    </div>
  );
};

export default Index;
