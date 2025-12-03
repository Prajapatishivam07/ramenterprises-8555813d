import { useState } from 'react';
import { useInvoice } from '@/hooks/useInvoice';
import { InvoiceControls } from '@/components/invoice/InvoiceControls';
import { InvoiceHeader } from '@/components/invoice/InvoiceHeader';
import { CustomerSection } from '@/components/invoice/CustomerSection';
import { FurnitureInvoiceTable } from '@/components/invoice/FurnitureInvoiceTable';
import { InvoiceSummary } from '@/components/invoice/InvoiceSummary';
import { InvoiceFooter } from '@/components/invoice/InvoiceFooter';
import { BillHistory } from '@/components/invoice/BillHistory';
import { FileText } from 'lucide-react';

const Index = () => {
  const [showHistory, setShowHistory] = useState(false);
  
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
    printInvoice,
    loadBill,
    deleteBill,
  } = useInvoice();

  return (
    <div className="min-h-screen bg-background py-4 md:py-8 px-2 md:px-4">
      <div className="w-full max-w-[210mm] mx-auto mb-4 md:mb-6 no-print">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Ram Enterprises</h1>
            <p className="text-xs md:text-sm text-muted-foreground">Furniture Invoice with TSF Calculations</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[210mm] mx-auto">
        <InvoiceControls
          onAddRow={addRow}
          onPrint={printInvoice}
          onReset={resetInvoice}
          onShowHistory={() => setShowHistory(true)}
          savedBillsCount={savedBills.length}
          billName={invoice.billName}
          onBillNameChange={(value) => updateField('billName', value)}
        />
      </div>

      <div className="invoice-container p-3 md:p-8 rounded-lg">
        <div className="flex-1">
        <InvoiceHeader
          shop={invoice.shop}
          invoiceNumber={invoice.invoiceNumber}
          date={invoice.date}
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

        <InvoiceFooter />
      </div>

      <div className="w-full max-w-[210mm] mx-auto mt-4 md:mt-6 text-center text-xs text-foreground no-print space-y-1 px-2">
        <p>Data is automatically saved. Click "Print / Save" to save bill and export.</p>
        <p className="text-muted-foreground">Made by Shivam Prajapati</p>
        <p className="text-muted-foreground">© 2026 Shivam Prajapati</p>
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
