import React from "react";
import "../footer/footercss.css";

function Footerbar() {
  return (
    <div className="footer_bar">
      {/* <div className="text-center text-dark" style={{fontSize:'12px'}}> 
        
          &copy; {new Date().getFullYear()} Goolok. All Rights
          Reserved.
     
      </div> */}
      <div className="d-flex justify-content-center" style={{fontSize:'12px' ,alignItems:'center', marginLeft:'30px',textAlign:'center'}}> 
        
        &copy; {new Date().getFullYear()} Goolok. All Rights
        Reserved.
   
    </div>
    </div>
  );
}

export default Footerbar;
