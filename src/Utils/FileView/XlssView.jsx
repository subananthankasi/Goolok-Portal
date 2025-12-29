import React from "react"; 
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const XlsView = ({ url }) => {
  const docs = [
    { uri: url, fileType: "xls",fileName:"Document View"}, 
  ];
  return (
   <> 
         <DocViewer
         documents={docs}
         pluginRenderers={DocViewerRenderers}
         style={{height: "90vh" }}
       />
       
    </>
  );
};

export default XlsView;
