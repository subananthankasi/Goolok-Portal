import React from 'react';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
const AlertPop = ({ isOpen, onClose, onConfirm ,message}) => {
  return (
    <>
      {isOpen && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block',background:"#00000099"}} aria-hidden="false">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content m-auto rounded-0" style={{maxWidth:"400px"}}>
              <div className="modal-header text-dark"> 
                <button type="button" className="btn m-auto" data-bs-dismiss="modal" aria-label="Close"><ReportProblemIcon fontSize="large" style={{ color: 'red' }} /></button>
              </div>
             
              <div className="modal-body text-center pt-0 mb-4">
                <p className='mb-0'>{message || "An unexpected error has occurred. Please try again later."}</p>
              </div>
             
                <button type="button" className="btn btn-danger rounded-0" onClick={() => { if(onConfirm){
                  onConfirm();
                } onClose(); }}>
                  Ok
                </button> 
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertPop;
