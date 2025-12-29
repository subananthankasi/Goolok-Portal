import React from "react";
import ModalTypes from "./ModalTypes";

const EditModal = ({ isOpen, closeModal, modalType }) => {
  let heading;
  let modalContent;

  switch (modalType) {
    case ModalTypes.Category:
      heading = "Category";
      modalContent = (
        <div className="col-md-12 mb-3 "> 
          <input type="text" className="form-control" id="lastName" />
        </div>
      );
      break;
    case ModalTypes.Priority:
      heading = "Priority";
      modalContent = (
        <div className="col-md-12 mb-3 "> 
          <input type="text" className="form-control" id="lastName" />
        </div>
      );
      break;
    case ModalTypes.Status:
      heading = "Status";
      modalContent = (
        <div className="col-md-12 mb-3 "> 
          <input type="text" className="form-control" id="lastName" />
        </div>
      );
      break;
    default:
      modalContent = null;
      heading = null;
  }

  return (
    <div
      className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="d-flex" style={{ alignItems: "center" }}>
            <h4 className="page_subheading m-3">{heading}</h4>
            <button
              type="button"
              className="close closebutton"
              onClick={closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="card-body p-3">
            <form>
              <div className="row">
             {modalContent}
              </div>

              <div className="text-end py-3 px-3">
                <button className="btn1 me-1">Clear</button>
                <button className="btn1">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
