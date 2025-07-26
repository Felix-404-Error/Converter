// Simple ZIP file creation using browser APIs
// This creates a basic ZIP structure without external dependencies

interface ZipEntry {
  name: string;
  data: Uint8Array;
}

export class SimpleZip {
  private entries: ZipEntry[] = [];

  addFile(name: string, blob: Blob): Promise<void> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        this.entries.push({
          name,
          data: new Uint8Array(arrayBuffer)
        });
        resolve();
      };
      reader.readAsArrayBuffer(blob);
    });
  }

  async generateZip(): Promise<Blob> {
    // For simplicity, we'll just trigger individual downloads
    // A full ZIP implementation would require more complex binary operations
    // This is a placeholder for the concept
    throw new Error('ZIP generation not implemented - downloading files individually');
  }
}

// Alternative: Download files individually with a delay
export const downloadFilesSequentially = async (
  files: { name: string; blob: Blob }[],
  delay: number = 500
): Promise<void> => {
  for (let i = 0; i < files.length; i++) {
    const { name, blob } = files[i];
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Add delay between downloads to avoid browser blocking
    if (i < files.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};