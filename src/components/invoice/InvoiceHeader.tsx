import { InvoiceData } from '@/types/invoice';
import { Building2, Upload, X } from 'lucide-react';
import { useRef } from 'react';

interface InvoiceHeaderProps {
  shop: InvoiceData['shop'];
  invoiceNumber: string;
  date: string;
  onShopChange: (field: keyof InvoiceData['shop'], value: string) => void;
  onFieldChange: <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => void;
}

const MAX_FILE_SIZE = 500 * 1024; // 500KB
const MAX_DIMENSION = 200;

const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) {
            height = (height / width) * MAX_DIMENSION;
            width = MAX_DIMENSION;
          } else {
            width = (width / height) * MAX_DIMENSION;
            height = MAX_DIMENSION;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export function InvoiceHeader({
  shop,
  invoiceNumber,
  date,
  onShopChange,
  onFieldChange,
}: InvoiceHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('Image size should be less than 500KB');
      return;
    }

    try {
      const base64 = await compressImage(file);
      onShopChange('logo', base64);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing image');
    }
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveLogo = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShopChange('logo', '');
  };

  // Split phone numbers for display (if contains separator)
  const phoneNumbers = shop.phone.split(/[\/,]/).map(p => p.trim()).filter(Boolean);

  return (
    <div className="border-b-2 border-invoice-border pb-6 mb-6">
      <div className="flex justify-between items-start">
        {/* Left: Shop Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            {/* Logo Upload Area */}
            <div 
              className="relative w-14 h-14 rounded-lg overflow-hidden cursor-pointer group"
              onClick={handleLogoClick}
            >
              {shop.logo ? (
                <>
                  <img 
                    src={shop.logo} 
                    alt="Business Logo" 
                    className="w-full h-full object-contain bg-muted"
                  />
                  <button
                    onClick={handleRemoveLogo}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity no-print"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center no-print">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-primary flex items-center justify-center group-hover:bg-primary/80 transition-colors">
                  <Building2 className="w-8 h-8 text-primary-foreground" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center no-print">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <input
              type="text"
              value={shop.name}
              onChange={(e) => onShopChange('name', e.target.value)}
              className="invoice-input text-2xl font-bold text-foreground print:text-xl"
              placeholder="Business Name"
            />
          </div>
          <div className="space-y-1 text-sm text-muted-foreground ml-0">
            {/* Address - Full display */}
            <textarea
              value={shop.address}
              onChange={(e) => onShopChange('address', e.target.value)}
              className="invoice-input w-full font-semibold resize-none"
              placeholder="Address"
              rows={2}
            />
            {/* Phone Numbers - Each on separate line */}
            {phoneNumbers.map((phone, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="font-medium text-foreground text-xs">Phone:</span>
                <span className="font-semibold">{phone}</span>
              </div>
            ))}
            {phoneNumbers.length === 0 && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground text-xs">Phone:</span>
                <input
                  type="text"
                  value={shop.phone}
                  onChange={(e) => onShopChange('phone', e.target.value)}
                  className="invoice-input w-48 font-semibold"
                  placeholder="Phone Number"
                />
              </div>
            )}
            {/* Email */}
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground text-xs">Email:</span>
              <input
                type="email"
                value={shop.email}
                onChange={(e) => onShopChange('email', e.target.value)}
                className="invoice-input w-48 font-semibold"
                placeholder="Email Address"
              />
            </div>
          </div>
        </div>

        {/* Right: Invoice Details */}
        <div className="text-right space-y-2">
          <h1 className="text-3xl font-bold text-primary tracking-tight">TAX INVOICE</h1>
          <div className="space-y-1 text-sm">
            <div className="flex items-center justify-end gap-2">
              <span className="text-muted-foreground">Invoice No:</span>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => onFieldChange('invoiceNumber', e.target.value)}
                className="invoice-input w-36 text-right font-mono font-semibold"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <span className="text-muted-foreground">Date:</span>
              <input
                type="date"
                value={date}
                onChange={(e) => onFieldChange('date', e.target.value)}
                className="invoice-input w-36 text-right"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <span className="text-muted-foreground">GSTIN:</span>
              <input
                type="text"
                value={shop.gstin}
                onChange={(e) => onShopChange('gstin', e.target.value)}
                className="invoice-input w-40 text-right font-mono font-semibold"
                placeholder="GSTIN Number"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}