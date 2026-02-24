import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
const ConfirmationModal = ({ isOpen, closeModal, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-overlay d-block" tabIndex="-1" role="dialog" aria-labelledby="confirmationModalLabel" aria-hidden="true" style={{zIndex:"2000"}}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content m-auto rounded-0"  style={{maxWidth:"400px"}}>
          {/* Modal Header */}
          <div className="modal-header">
          <button type="button" className="btn m-auto" data-bs-dismiss="modal" aria-label="Close"><TaskAltRoundedIcon sx={{ color: '#ffc107', fontSize: 60 }} />
          </button>
          </div>
        
          {/* Modal Body */}
          <div className="modal-body text-center pt-0">
            <p>{message || "Are you sure you want to proceed?"}</p>
          </div>

          {/* Modal Footer */}
          <div className="d-flex p-4 justify-content-center">
            <button
              type="button"
              className="btn btn-secondary w-25 rounded-0"
              onClick={closeModal}
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-primary w-25 rounded-0 ms-2"
              onClick={() => {
                onConfirm();
                closeModal();
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
