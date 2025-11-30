import { useState, useRef } from 'react';
import { useInvoice } from '@/hooks/useInvoice';
import { InvoiceControls } from '@/components/invoice/InvoiceControls';
import { InvoiceHeader } from '@/components/invoice/InvoiceHeader';
import { CustomerSection } from '@/components/invoice/CustomerSection';
import { FurnitureInvoiceTable } from '@/components/invoice/FurnitureInvoiceTable';
import { InvoiceSummary } from '@/components/invoice/InvoiceSummary';
import { InvoiceFooter } from '@/components/invoice/InvoiceFooter';
import { BillHistory } from '@/components/invoice/BillHistory';
import { FileText } from 'lucide-react';
import { downloadPdf, sharePdf } from '@/lib/pdfUtils';
import { toast } from 'sonner';

const Index = () => {
  const [showHistory, setShowHistory] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);
  
  const {
    invoice,
    summary,
    savedBills,
    updateField,
    updateCustomer,
    updateShop,
    updateRow,
    addRow,
    removeRow,
    resetInvoice,
    saveBill,
    loadBill,
    deleteBill,
  } = useInvoice();

  const handlePrint = () => {
    window.print();
  };

  const handleSave = async () => {
    if (!invoiceRef.current) return;
    try {
      const billNumber = saveBill();
      const fileName = invoice.billName || `Bill_${billNumber}`;
      await downloadPdf(invoiceRef.current, fileName);
      toast.success(`Bill #${billNumber} saved and downloaded`);
    } catch (error) {
      toast.error('Failed to save bill');
    }
  };

  const handleShare = async () => {
    if (!invoiceRef.current) return;
    try {
      const billNumber = saveBill();
      const fileName = invoice.billName || `Bill_${billNumber}`;
      await sharePdf(invoiceRef.current, fileName);
      toast.success('Bill ready to share');
    } catch (error) {
      toast.error('Sharing not supported, bill downloaded instead');
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-[210mm] mx-auto mb-6 no-print">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">TSF Invoice Builder</h1>
            <p className="text-sm text-muted-foreground">Create furniture invoices with auto TSF calculations</p>
          </div>
        </div>
      </div>

      <div className="max-w-[210mm] mx-auto">
        <InvoiceControls
          onAddRow={addRow}
          onPrint={handlePrint}
          onSave={handleSave}
          onShare={handleShare}
          onReset={resetInvoice}
          onShowHistory={() => setShowHistory(true)}
          savedBillsCount={savedBills.length}
          billName={invoice.billName}
          onBillNameChange={(value) => updateField('billName', value)}
        />
      </div>

      <div ref={invoiceRef} className="invoice-container p-8 rounded-lg">
        <div className="flex-1">
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

          <FurnitureInvoiceTable
            rows={invoice.rows}
            onUpdateRow={updateRow}
            onRemoveRow={removeRow}
          />

          <InvoiceSummary
            summary={summary}
            sgstPercent={invoice.sgstPercent}
            cgstPercent={invoice.cgstPercent}
            received={invoice.received}
            includeGst={invoice.includeGst}
            onSgstChange={(value) => updateField('sgstPercent', value)}
            onCgstChange={(value) => updateField('cgstPercent', value)}
            onReceivedChange={(value) => updateField('received', value)}
            onToggleGst={(value) => updateField('includeGst', value)}
          />
        </div>

        <InvoiceFooter
          terms={invoice.terms}
          onTermsChange={(value) => updateField('terms', value)}
        />
      </div>

      <div className="max-w-[210mm] mx-auto mt-6 text-center text-xs text-muted-foreground no-print">
        <p>Data is automatically saved. Click "Save" to download as PDF.</p>
      </div>

      {showHistory && (
        <BillHistory
          bills={savedBills}
          onLoadBill={loadBill}
          onDeleteBill={deleteBill}
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  );
};

export default Index;
