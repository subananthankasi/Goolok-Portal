import React, { useState, useEffect } from "react";
import PdfView from "./PdfView";
import ExcelView from "./ExcelView";
import DocView from "./DocView";
import CsvView from "./CsvView";
import XlsView from "./XlssView";
import DocxView from "./docxView";
import ImageView from "./imageView";

const FileView = ({ isOpen, closeModal, fileUrls,openModal}) => {

  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("");

 
  useEffect(() => {
    if (isOpen && fileUrls) {
      setFileUrl(fileUrls);
      const extension = fileUrls.split(".").pop().toLowerCase();
      setFileType(extension);
    }
  }, [isOpen, fileUrls]);

  const handleCloseModal = () => {
    closeModal();
    setFileUrl("")  
    if(openModal){
      openModal() 
    }
  };

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
    <div className={`modal modal-overlay ${isOpen ? "d-block" : ""}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="d-flex" style={{ alignItems: "center" }}>
            {/* <h4 className="page_subheading m-3">File Viewer</h4> */}
            <button type="button" className="close closebutton" onClick={handleCloseModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="card-body p-3">{fileUrl ? <div>{renderFile()}</div> : <p>No file to display</p>}</div>
        </div>
      </div>
    </div>
  );
};

export default FileView;
