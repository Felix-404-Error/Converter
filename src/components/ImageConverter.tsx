import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { downloadFilesSequentially } from '@/utils/zipUtils';
import { 
  Upload, 
  Download, 
  Image as ImageIcon, 
  Trash2, 
  Settings, 
  Sun, 
  Moon,
  Archive,
  Zap,
  RefreshCw
} from 'lucide-react';

// Supported formats
const SUPPORTED_FORMATS = ['png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif'] as const;
type SupportedFormat = typeof SUPPORTED_FORMATS[number];

interface ImageFile {
  id: string;
  name: string;
  originalFormat: SupportedFormat;
  file: File;
  preview: string;
  size: number;
  width: number;
  height: number;
}

interface ConvertedImage {
  id: string;
  name: string;
  format: SupportedFormat;
  blob: Blob;
  preview: string;
  size: number;
  quality?: number;
}

interface ConversionSettings {
  format: SupportedFormat;
  quality: number;
  width?: number;
  height?: number;
  maintainAspectRatio: boolean;
}

interface ConversionPreset {
  id: string;
  name: string;
  from: SupportedFormat[];
  to: SupportedFormat;
  description: string;
  icon: string;
}

const ImageConverter: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [settings, setSettings] = useState<ConversionSettings>({
    format: 'png',
    quality: 90,
    maintainAspectRatio: true,
  });

  // Conversion presets
  const conversionPresets: ConversionPreset[] = [
    {
      id: 'png-to-jpg',
      name: 'PNG → JPG',
      from: ['png'],
      to: 'jpg',
      description: 'Convert PNG to JPG with compression',
      icon: '📷'
    },
    {
      id: 'jpg-to-png',
      name: 'JPG → PNG',
      from: ['jpg', 'jpeg'],
      to: 'png',
      description: 'Convert JPG to PNG with transparency',
      icon: '🖼️'
    },
    {
      id: 'png-to-webp',
      name: 'PNG → WebP',
      from: ['png'],
      to: 'webp',
      description: 'Convert PNG to modern WebP format',
      icon: '🚀'
    },
    {
      id: 'jpg-to-webp',
      name: 'JPG → WebP',
      from: ['jpg', 'jpeg'],
      to: 'webp',
      description: 'Convert JPG to WebP for better compression',
      icon: '⚡'
    },
    {
      id: 'bmp-to-jpg',
      name: 'BMP → JPG',
      from: ['bmp'],
      to: 'jpg',
      description: 'Convert BMP to compressed JPG',
      icon: '📂'
    },
    {
      id: 'bmp-to-png',
      name: 'BMP → PNG',
      from: ['bmp'],
      to: 'png',
      description: 'Convert BMP to PNG format',
      icon: '🔄'
    },
    {
      id: 'gif-to-jpg',
      name: 'GIF → JPG',
      from: ['gif'],
      to: 'jpg',
      description: 'Extract first frame of GIF to JPG',
      icon: '🎬'
    },
    {
      id: 'gif-to-png',
      name: 'GIF → PNG',
      from: ['gif'],
      to: 'png',
      description: 'Extract first frame of GIF to PNG',
      icon: '🎭'
    }
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Toggle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // File validation
  const isValidImageFile = (file: File): boolean => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return SUPPORTED_FORMATS.includes(fileExtension as SupportedFormat);
  };

  // Convert file to ImageFile object
  const processFile = async (file: File): Promise<ImageFile | null> => {
    if (!isValidImageFile(file)) {
      toast({
        title: "Unsupported Format",
        description: `${file.name} is not a supported image format.`,
        variant: "destructive",
      });
      return null;
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const imageFile: ImageFile = {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            originalFormat: file.name.split('.').pop()?.toLowerCase() as SupportedFormat,
            file,
            preview: e.target?.result as string,
            size: file.size,
            width: img.width,
            height: img.height,
          };
          resolve(imageFile);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle file selection
  const handleFileSelect = async (files: FileList) => {
    const newImages: ImageFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const imageFile = await processFile(files[i]);
      if (imageFile) {
        newImages.push(imageFile);
      }
    }

    setImages(prev => [...prev, ...newImages]);
    
    if (newImages.length > 0) {
      toast({
        title: "Images Added",
        description: `Successfully added ${newImages.length} image(s) for conversion.`,
      });
    }
  };

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  }, []);

  // Paste from clipboard
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            const imageFile = await processFile(file);
            if (imageFile) {
              setImages(prev => [...prev, imageFile]);
              toast({
                title: "Image Pasted",
                description: "Image from clipboard added successfully.",
              });
            }
          }
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, []);

  // Convert image using Canvas API
  const convertImage = async (imageFile: ImageFile, conversionSettings: ConversionSettings): Promise<ConvertedImage> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        // Calculate dimensions
        let { width, height } = imageFile;
        
        if (conversionSettings.width || conversionSettings.height) {
          if (conversionSettings.maintainAspectRatio) {
            const aspectRatio = width / height;
            if (conversionSettings.width) {
              width = conversionSettings.width;
              height = width / aspectRatio;
            } else if (conversionSettings.height) {
              height = conversionSettings.height;
              width = height * aspectRatio;
            }
          } else {
            width = conversionSettings.width || width;
            height = conversionSettings.height || height;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // For GIF files, we only take the first frame
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob
        const mimeType = conversionSettings.format === 'jpg' || conversionSettings.format === 'jpeg' 
          ? 'image/jpeg' 
          : `image/${conversionSettings.format}`;
        
        const quality = (conversionSettings.format === 'jpg' || conversionSettings.format === 'jpeg' || conversionSettings.format === 'webp') 
          ? conversionSettings.quality / 100 
          : undefined;

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to convert image'));
            return;
          }

          const newName = imageFile.name.replace(/\.[^/.]+$/, `.${conversionSettings.format}`);
          
          resolve({
            id: imageFile.id,
            name: newName,
            format: conversionSettings.format,
            blob,
            preview: canvas.toDataURL(),
            size: blob.size,
            quality: quality ? Math.round(quality * 100) : undefined,
          });
        }, mimeType, quality);
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageFile.preview;
    });
  };

  // Convert all images
  const handleConvertAll = async () => {
    if (images.length === 0) {
      toast({
        title: "No Images",
        description: "Please add some images to convert.",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    setProgress(0);
    setConvertedImages([]);

    const newConvertedImages: ConvertedImage[] = [];

    try {
      for (let i = 0; i < images.length; i++) {
        const convertedImage = await convertImage(images[i], settings);
        newConvertedImages.push(convertedImage);
        setProgress(((i + 1) / images.length) * 100);
      }

      setConvertedImages(newConvertedImages);
      
      toast({
        title: "Conversion Complete! 🎉",
        description: `Successfully converted ${newConvertedImages.length} image(s) to ${settings.format.toUpperCase()}.`,
      });

    } catch (error) {
      toast({
        title: "Conversion Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  };

  // Quick conversion using presets
  const handleQuickConvert = async (preset: ConversionPreset) => {
    // Filter images that match the preset's source formats
    const compatibleImages = images.filter(img => 
      preset.from.includes(img.originalFormat)
    );

    if (compatibleImages.length === 0) {
      toast({
        title: "No Compatible Images",
        description: `No ${preset.from.join('/')} images found for ${preset.name} conversion.`,
        variant: "destructive",
      });
      return;
    }

    // Set the target format and convert
    const newSettings = { ...settings, format: preset.to };
    setSettings(newSettings);

    setIsConverting(true);
    setProgress(0);
    setConvertedImages([]);

    const newConvertedImages: ConvertedImage[] = [];

    try {
      for (let i = 0; i < compatibleImages.length; i++) {
        const convertedImage = await convertImage(compatibleImages[i], newSettings);
        newConvertedImages.push(convertedImage);
        setProgress(((i + 1) / compatibleImages.length) * 100);
      }

      setConvertedImages(newConvertedImages);
      
      toast({
        title: `${preset.icon} Conversion Complete!`,
        description: `Successfully converted ${newConvertedImages.length} image(s) using ${preset.name}.`,
      });

    } catch (error) {
      toast({
        title: "Conversion Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  };

  // Get compatible images count for a preset
  const getCompatibleImagesCount = (preset: ConversionPreset): number => {
    return images.filter(img => preset.from.includes(img.originalFormat)).length;
  };

  // Download single image
  const downloadImage = (convertedImage: ConvertedImage) => {
    const url = URL.createObjectURL(convertedImage.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = convertedImage.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Download all images sequentially
  const downloadAllAsZip = async () => {
    if (convertedImages.length === 0) {
      toast({
        title: "No Converted Images",
        description: "Please convert some images first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const files = convertedImages.map(image => ({
        name: image.name,
        blob: image.blob
      }));

      await downloadFilesSequentially(files, 300);

      toast({
        title: "Download Complete! 📦",
        description: `Successfully downloaded ${convertedImages.length} converted image(s).`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download some files. Please try downloading individually.",
        variant: "destructive",
      });
    }
  };

  // Reset all
  const resetAll = () => {
    setImages([]);
    setConvertedImages([]);
    setProgress(0);
    toast({
      title: "Reset Complete",
      description: "All images and conversions have been cleared.",
    });
  };

  // Format size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="p-6 bg-gradient-card shadow-card border-border/50">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Image Converter Pro
              </h1>
              <p className="text-muted-foreground">
                Convert images between PNG, JPG, WebP, BMP, and GIF formats - 100% offline
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="hover:bg-accent"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="outline"
                onClick={resetAll}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Area */}
          <Card className="lg:col-span-2 p-6 bg-gradient-card shadow-card border-border/50">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Upload Images
              </h2>
              
              <div
                ref={dropZoneRef}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-background/50"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Drop images here or click to browse</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Supports PNG, JPG, JPEG, WebP, BMP, GIF • Paste from clipboard with Ctrl+V
                </p>
                <Button variant="default" size="lg" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Choose Files
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".png,.jpg,.jpeg,.webp,.bmp,.gif"
                onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
                className="hidden"
              />

              {/* Uploaded Images Preview */}
              {images.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium">Uploaded Images ({images.length})</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((image) => (
                      <div key={image.id} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden bg-background border border-border">
                          <img
                            src={image.preview}
                            alt={image.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => setImages(prev => prev.filter(img => img.id !== image.id))}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="mt-2 text-xs text-center">
                          <p className="font-medium truncate">{image.name}</p>
                          <p className="text-muted-foreground">
                            {image.width}×{image.height} • {formatFileSize(image.size)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Conversion Presets */}
              {images.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium">Quick Conversions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {conversionPresets.map((preset) => {
                      const compatibleCount = getCompatibleImagesCount(preset);
                      const isDisabled = compatibleCount === 0 || isConverting;
                      
                      return (
                        <Button
                          key={preset.id}
                          onClick={() => handleQuickConvert(preset)}
                          disabled={isDisabled}
                          variant={isDisabled ? "outline" : "default"}
                          size="sm"
                          className="h-auto p-3 flex-col gap-1 hover:scale-105 transition-transform"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">{preset.icon}</span>
                            <span className="font-medium text-xs">{preset.name}</span>
                          </div>
                          <div className="text-xs text-muted-foreground text-center">
                            {compatibleCount > 0 
                              ? `${compatibleCount} compatible` 
                              : "No compatible images"
                            }
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Quick presets will automatically convert only compatible image formats.
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Settings Panel */}
          <Card className="p-6 bg-gradient-card shadow-card border-border/50 h-fit">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Conversion Settings
              </h2>

              {/* Output Format */}
              <div className="space-y-2">
                <Label htmlFor="format">Output Format</Label>
                <Select
                  value={settings.format}
                  onValueChange={(value: SupportedFormat) => 
                    setSettings(prev => ({ ...prev, format: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="jpg">JPG</SelectItem>
                    <SelectItem value="webp">WebP</SelectItem>
                    <SelectItem value="bmp">BMP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quality Slider */}
              {(settings.format === 'jpg' || settings.format === 'webp') && (
                <div className="space-y-3">
                  <Label>Quality: {settings.quality}%</Label>
                  <Slider
                    value={[settings.quality]}
                    onValueChange={([value]) => 
                      setSettings(prev => ({ ...prev, quality: value }))
                    }
                    min={10}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              )}

              {/* Resize Options */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="aspect-ratio">Maintain Aspect Ratio</Label>
                  <Switch
                    id="aspect-ratio"
                    checked={settings.maintainAspectRatio}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, maintainAspectRatio: checked }))
                    }
                  />
                </div>
              </div>

              {/* Convert Button */}
              <div className="space-y-4">
                <Button
                  onClick={handleConvertAll}
                  disabled={images.length === 0 || isConverting}
                  className="w-full"
                  size="lg"
                  variant="glow"
                >
                  <Zap className="h-4 w-4" />
                  {isConverting ? 'Converting...' : `Convert ${images.length} Image${images.length !== 1 ? 's' : ''}`}
                </Button>

                {isConverting && (
                  <div className="space-y-2">
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-center text-muted-foreground">
                      {Math.round(progress)}% Complete
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Conversion Guide */}
        {images.length === 0 && (
          <Card className="p-6 bg-gradient-card shadow-card border-border/50">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Supported Conversions
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {conversionPresets.map((preset) => (
                  <div key={preset.id} className="text-center p-4 rounded-lg bg-background/50 border border-border/50">
                    <div className="text-2xl mb-2">{preset.icon}</div>
                    <div className="font-medium text-sm mb-1">{preset.name}</div>
                    <div className="text-xs text-muted-foreground">{preset.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Converted Images */}
        {convertedImages.length > 0 && (
          <Card className="p-6 bg-gradient-card shadow-card border-border/50">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
                  Converted Images ({convertedImages.length})
                </h2>
                <Button
                  onClick={downloadAllAsZip}
                  variant="default"
                  className="gap-2"
                >
                  <Archive className="h-4 w-4" />
                  Download All
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {convertedImages.map((image) => (
                  <div key={image.id} className="space-y-3">
                    <div className="aspect-square rounded-lg overflow-hidden bg-background border border-border">
                      <img
                        src={image.preview}
                        alt={image.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-sm truncate">{image.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(image.size)}
                        {image.quality && ` • ${image.quality}% quality`}
                      </p>
                      <Button
                        onClick={() => downloadImage(image)}
                        size="sm"
                        className="w-full gap-2"
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ImageConverter;