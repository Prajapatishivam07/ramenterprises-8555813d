import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { SavedBill } from '@/types/invoice';
import { formatCurrency } from './invoiceUtils';

export async function generatePdfFromElement(element: HTMLElement, fileName: string): Promise<Blob> {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
  });
  
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
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
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #2563eb; text-align: center; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #f3f4f6; padding: 10px; border: 1px solid #ddd; }
      </style>
    </head>
    <body>
      <h1>TAX INVOICE</h1>
      <p><strong>Bill #:</strong> ${bill.billNumber}</p>
      <p><strong>Date:</strong> ${new Date(bill.savedAt).toLocaleDateString('en-IN')}</p>
      <p><strong>Customer:</strong> ${invoice.customer.name || 'N/A'}</p>
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Product</th>
            <th>Size</th>
            <th>TSF</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
      <p><strong>Subtotal:</strong> ${formatCurrency(summary.subtotal)}</p>
      ${invoice.includeGst ? `
        <p><strong>SGST (${invoice.sgstPercent}%):</strong> ${formatCurrency(summary.sgstAmount)}</p>
        <p><strong>CGST (${invoice.cgstPercent}%):</strong> ${formatCurrency(summary.cgstAmount)}</p>
      ` : ''}
      <p><strong>Grand Total:</strong> ${formatCurrency(summary.grandTotal)}</p>
      <p><strong>Terms:</strong> ${invoice.terms}</p>
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

export async function downloadSingleBillHtml(bill: SavedBill): Promise<void> {
  const html = generateBillHtml(bill);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Bill_${bill.billNumber}_${bill.billName || 'Invoice'}.html`;
  link.click();
  URL.revokeObjectURL(url);
}
