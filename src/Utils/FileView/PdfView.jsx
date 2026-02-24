import * as React from 'react';
const PdfView = ({ url }) => {
 
  const [fileUrl, setFileUrl] = React.useState('');  

  React.useEffect(() => {
    if (url) {
      setFileUrl(url);  
    }
  }, [url]);

  return (
    <div>
      <div className='control-section'> 
           <iframe
              src={fileUrl}
              title="PDF Preview" 
              style={{ border: 'none',height:"90vh",width:"100%"}}
           />
      </div>
    </div>
  );
};

export default PdfView;
