export const handleDownloadFile = async (
  fileUrl: string,
  fileName: string,
  onComplete?: (success: boolean, errorMessage?: string) => void
) => {
  try {
    const response = await fetch(fileUrl, { mode: 'cors' }); // Fetch the file data
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const blob = await response.blob(); // Convert the data to a blob

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob); // Create a URL for the blob
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href); // Clean up the URL object after download

    // Callback for successful download
    if (onComplete) {
      onComplete(true);
    }
  } catch (error: any) {
    console.error('Failed to download file:', error);

    // Callback for download failure
    if (onComplete) {
      onComplete(false, `Failed to download file: ${error.message}`);
    }
  }
};

export const handlePrintFile = async (
  fileUrl: string,
  onDownload?: (success: boolean, errorMessage?: string) => void
) => {
  try {
    const response = await fetch(fileUrl, { mode: 'cors' }); // Fetch the file data
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const blob = await response.blob(); // Convert the data to a blob
    const fileURL = URL.createObjectURL(blob); // Create a URL for the blob

    // Create a hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    iframe.src = fileURL;

    // Append iframe to the document body
    document.body.appendChild(iframe);

    // Trigger printing when the iframe loads
    iframe.onload = () => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();

        // Cleanup: Remove iframe after printing
        const onAfterPrint = () => {
          document.body.removeChild(iframe);
          window.removeEventListener('afterprint', onAfterPrint);
        };

        window.addEventListener('afterprint', onAfterPrint);

        // Callback for successful download
        if (onDownload) {
          onDownload(true);
        }
      } catch (printError) {
        console.error('Printing failed:', printError);
        if (onDownload) {
          onDownload(false, 'Printing failed');
        }
      }
    };
  } catch (error) {
    console.error('Failed to download file:', error);
    if (onDownload) {
      onDownload(false, `Failed to download file: ${(error as any).message}`);
    }
  }
};
