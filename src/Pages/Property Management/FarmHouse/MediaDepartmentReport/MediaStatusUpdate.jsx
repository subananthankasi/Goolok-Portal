import React from "react";  

const MediaStatusUpdate = ({ isOpen, closeModal }) => {
  return (
    <div
      className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
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
            <div className="row">
              <div className="col-md-12 ">
                <div className="form-group mt-2">
                  <div className="row">
                    <div className="col-4">
                      <label className="form-label">Proceed to Content Writing Department </label>
                    </div>
                    <div className="col-8">
  <div className="d-flex align-items-center">
    <div className="form-check" style={{fontSize:'14px'}}>
      <input className="form-check-input" type="radio" id="html" name="fav_language" defaultValue="HTML" />
      <label className="form-check-label" htmlFor="html">Yes</label>
    </div>
    <div className="form-check ms-3" style={{fontSize:'14px'}}>
      <input className="form-check-input" type="radio" id="css" name="fav_language" defaultValue="CSS" />
      <label className="form-check-label" htmlFor="css">No</label>
    </div>
  </div>
</div>

                  </div>
                </div>

                <div className="form-group mt-3">
                  <div className="row">
                    <div className="col-4">
                      <label className="form-label">Staff</label>
                    </div>
                    <div className="col-5">
                      <select id="inputState" className="form-select">
                        <option value="Enable">Staff 1</option>
                        <option value="Disable">Staff 2</option>
                        <option value="Disable">Staff 3</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group mt-3">
                  <div className="row">
                    <div className="col-4">
                      <label className="form-label">Remarks</label>
                    </div>
                    <div className="col-5">
                    <input type="text" className="form-control" id="lastName" />

                    </div>
                  </div>
                </div> 
                <div className="text-end   px-3 mt-4">
                <button className="btn1 me-1">Cancel</button>
                <button className="btn1">Proceed</button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaStatusUpdate;
