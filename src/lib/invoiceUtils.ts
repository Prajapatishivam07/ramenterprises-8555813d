// Parse size string like "2x5", "2 x 5", "2*5" and return TSF (Total Square Feet)
export function parseSize(sizeString: string): { width: number; height: number; tsf: number } {
  if (!sizeString || typeof sizeString !== 'string') {
    return { width: 0, height: 0, tsf: 0 };
  }

  // Remove spaces and normalize separators
  const normalized = sizeString.toLowerCase().replace(/\s+/g, '');
  
  // Try to match patterns: "2x5", "2*5", "2×5"
  const match = normalized.match(/^(\d+(?:\.\d+)?)[x*×](\d+(?:\.\d+)?)$/);
  
  if (match) {
    const width = parseFloat(match[1]);
    const height = parseFloat(match[2]);
    return {
      width,
      height,
      tsf: width * height,
    };
  }

  return { width: 0, height: 0, tsf: 0 };
}

// Convert number to words (Indian numbering system)
export function numberToWords(num: number): string {
  if (num === 0) return 'Zero';
  
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function convertLessThanHundred(n: number): string {
    if (n < 20) return ones[n];
    return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
  }

  function convertLessThanThousand(n: number): string {
    if (n < 100) return convertLessThanHundred(n);
    return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertLessThanHundred(n % 100) : '');
  }

  // Indian numbering system
  if (num >= 10000000) {
    return convertLessThanThousand(Math.floor(num / 10000000)) + ' Crore ' + numberToWords(num % 10000000);
  }
  if (num >= 100000) {
    return convertLessThanThousand(Math.floor(num / 100000)) + ' Lakh ' + numberToWords(num % 100000);
  }
  if (num >= 1000) {
    return convertLessThanThousand(Math.floor(num / 1000)) + ' Thousand ' + numberToWords(num % 1000);
  }
  
  return convertLessThanThousand(num);
}

export function amountInWords(amount: number): string {
  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);
  
  let result = 'Rupees ' + numberToWords(rupees);
  if (paise > 0) {
    result += ' and ' + numberToWords(paise) + ' Paise';
  }
  result += ' Only';
  
  return result;
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Generate invoice number
export function generateInvoiceNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `INV-${year}${month}-${random}`;
}

// Get current date in YYYY-MM-DD format
export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}
