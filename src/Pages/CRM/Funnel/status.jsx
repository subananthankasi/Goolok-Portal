import React from "react";

const Status = ({ isOpen, closeModal }) => {
  return (
    <div
      className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog  " role="document">
        <div className="modal-content">
          <div className="d-flex" style={{ alignItems: "center" }}>
            <h4 className="page_subheading m-3">Status Update</h4>
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
                <div className="col-md-12 ">
                    
                  <div className="mb-3 col-md-12">
                    <label className="form-label" htmlFor="inputState">
                      Status
                    </label>
                    <select id="inputState" className="form-select">
                      <option value="Enable">Success</option>
                      <option value="Disable">Dropped</option>
                    </select>
                  </div>
                </div>
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

export default Status;
