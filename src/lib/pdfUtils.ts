import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { SavedBill } from '@/types/invoice';
import { formatCurrency } from './invoiceUtils';

export async function generatePdfFromElement(element: HTMLElement, fileName: string): Promise<Blob> {
  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.width = '210mm';
  clone.style.minHeight = 'auto';
  clone.style.height = 'auto';
  clone.style.position = 'absolute';
  clone.style.left = '-9999px';
  clone.style.background = 'white';
  document.body.appendChild(clone);

  const canvas = await html2canvas(clone, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    width: clone.scrollWidth,
    height: clone.scrollHeight,
  });
  
  document.body.removeChild(clone);
  
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Handle multi-page if content is taller than one page
  if (pdfHeight <= pageHeight) {
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  } else {
    let heightLeft = pdfHeight;
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft > 0) {
      position = -pageHeight + (pdfHeight - heightLeft - pageHeight);
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, -(pdfHeight - heightLeft), pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }
  }
  
  return pdf.output('blob');
}

export async function downloadPdf(element: HTMLElement, fileName: string): Promise<void> {
  const blob = await generatePdfFromElement(element, fileName);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}

export async function sharePdf(element: HTMLElement, fileName: string): Promise<void> {
  const blob = await generatePdfFromElement(element, fileName);
  const file = new File([blob], `${fileName}.pdf`, { type: 'application/pdf' });
  
  if (navigator.share && navigator.canShare({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: fileName,
      text: `Invoice: ${fileName}`,
    });
  } else {
    // Fallback: download the file
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  }
}

export function generateBillHtml(bill: SavedBill): string {
  const { invoice, summary } = bill;
  const rowsHtml = invoice.rows.map((row, index) => `
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${index + 1}</td>
      <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">${row.product}</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${row.width} × ${row.height}</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${row.tsf.toFixed(2)}</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${formatCurrency(row.rate)}</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${formatCurrency(row.amount)}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 30px; margin: 0; background: white; }
        .header { display: flex; justify-content: space-between; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 20px; }
        .company-info { flex: 1; }
        .company-name { font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 8px; }
        .company-details { font-size: 12px; color: #4b5563; }
        .company-details strong { font-weight: bold; color: #1f2937; }
        .invoice-title { color: #2563eb; font-size: 28px; font-weight: bold; text-align: right; }
        .invoice-meta { font-size: 12px; text-align: right; margin-top: 10px; }
        .invoice-meta div { margin: 4px 0; }
        .customer-section { background: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        .customer-label { font-size: 11px; color: #6b7280; font-weight: 600; margin-bottom: 8px; }
        .customer-name { font-size: 16px; font-weight: bold; color: #1f2937; }
        .customer-details { font-size: 12px; color: #4b5563; margin-top: 4px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #1f2937; color: white; padding: 10px 8px; font-size: 11px; text-transform: uppercase; }
        td { padding: 10px 8px; border-bottom: 1px solid #e5e7eb; font-size: 12px; }
        .summary { display: flex; justify-content: flex-end; margin-top: 20px; }
        .summary-table { width: 280px; }
        .summary-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; }
        .summary-row.total { font-weight: bold; color: #2563eb; border-top: 2px solid #e5e7eb; margin-top: 8px; padding-top: 10px; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
        .terms-title { font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; margin-bottom: 8px; }
        .terms-text { font-size: 11px; color: #4b5563; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company-info">
          <div class="company-name">${invoice.shop.name || 'Business Name'}</div>
          <div class="company-details">
            <div><strong>${invoice.shop.address || 'Address'}</strong></div>
            <div><strong>${invoice.shop.phone || 'Phone'}</strong> | <strong>${invoice.shop.email || 'Email'}</strong></div>
            <div><strong>GSTIN:</strong> <strong>${invoice.shop.gstin || 'GSTIN'}</strong></div>
          </div>
        </div>
        <div>
          <div class="invoice-title">TAX INVOICE</div>
          <div class="invoice-meta">
            <div>Invoice No: <strong>${invoice.invoiceNumber}</strong></div>
            <div>Date: <strong>${new Date(bill.savedAt).toLocaleDateString('en-IN')}</strong></div>
            <div>Place of Supply: <strong>${invoice.placeOfSupply || 'N/A'}</strong></div>
          </div>
        </div>
      </div>
      
      <div class="customer-section">
        <div class="customer-label">BILL TO</div>
        <div class="customer-name">${invoice.customer.name || 'Customer Name'}</div>
        <div class="customer-details">
          ${invoice.customer.address || 'Address'}<br/>
          Phone: ${invoice.customer.phone || 'N/A'} | GSTIN: ${invoice.customer.gstin || 'N/A'}
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Product</th>
            <th>Size (W × H)</th>
            <th>TSF</th>
            <th>Rate/Sq.Ft</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
      
      <div class="summary">
        <div class="summary-table">
          <div class="summary-row"><span>Subtotal</span><span>${formatCurrency(summary.subtotal)}</span></div>
          ${invoice.includeGst ? `
            <div class="summary-row"><span>SGST (${invoice.sgstPercent}%)</span><span>${formatCurrency(summary.sgstAmount)}</span></div>
            <div class="summary-row"><span>CGST (${invoice.cgstPercent}%)</span><span>${formatCurrency(summary.cgstAmount)}</span></div>
          ` : ''}
          <div class="summary-row total"><span>Grand Total</span><span>${formatCurrency(summary.grandTotal)}</span></div>
        </div>
      </div>
      
      <div class="footer">
        <div class="terms-title">Terms & Conditions</div>
        <div class="terms-text">${invoice.terms}</div>
      </div>
    </body>
    </html>
  `;
}

export async function downloadAllBillsAsZip(bills: SavedBill[]): Promise<void> {
  const zip = new JSZip();
  
  for (const bill of bills) {
    const html = generateBillHtml(bill);
    const fileName = `Bill_${bill.billNumber}_${bill.billName || 'Invoice'}.html`;
    zip.file(fileName, html);
  }
  
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Bills_Backup_${new Date().toISOString().split('T')[0]}.zip`;
  link.click();
  URL.revokeObjectURL(url);
}

export async function downloadSingleBillPdf(bill: SavedBill): Promise<void> {
  const html = generateBillHtml(bill);
  
  // Create a temporary container
  const container = document.createElement('div');
  container.innerHTML = html;
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.width = '210mm';
  container.style.background = 'white';
  document.body.appendChild(container);
  
  const canvas = await html2canvas(container, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });
  
  document.body.removeChild(container);
  
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  
  const blob = pdf.output('blob');
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Bill_${bill.billNumber}_${bill.billName || 'Invoice'}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}
