import React, { useState, useEffect } from "react";
import PdfView from "./PdfView";
import ExcelView from "./ExcelView";
import DocView from "./DocView";
import CsvView from "./CsvView";
import XlsView from "./XlssView";
import DocxView from "./docxView";
import ImageView from "./imageView";

const FileViewUtils = ({fileUrls}) => {

  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("");

  
  useEffect(() => {
    if (fileUrls) {
      setFileUrl(fileUrls);
      const extension = fileUrls.split(".").pop().toLowerCase();
      setFileType(extension);
    }
  }, [fileUrls]);

  

  // Render function based on file type
  const renderFile = () => {
    if (!fileUrl || !fileType) return <p>Loading file...</p>; 

    switch (fileType) {
      case "csv":
        return <CsvView url={fileUrl} />;
      case "pdf":
        return <PdfView url={fileUrl} />;
      case "doc":
        return <DocView url={fileUrl} />;
      case "docx":
        return <DocxView url={fileUrl} />;
      case "xlsx":
        return <ExcelView url={fileUrl} />;
      case "xls":
        return <XlsView url={fileUrl} />;
      case "png":
      case "jpg":
      case "jpeg":
        return <ImageView url={fileUrl} />;
      default:
        return <p>Unsupported file type: {fileType}</p>;
    }
  };

  return (
     
          <div className="card-body">{fileUrl ? <div>{renderFile()}</div> : <p>No file to display</p>}</div>
        
  );
};

export default FileViewUtils;
