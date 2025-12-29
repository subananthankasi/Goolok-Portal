export const FileDownload = (pdfUrl) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'file.pdf';

    // Append to the body
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove the anchor element
    document.body.removeChild(link);
};