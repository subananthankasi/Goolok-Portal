import React from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const DocView = ({ url }) => { 
  const docs = [
    { uri: url,
      fileType:"doc",
      fileName:"Document View"
     },  
  ];
  return (
 
      <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} style={{height: "90vh" }}/>
  );
}

export default DocView;
