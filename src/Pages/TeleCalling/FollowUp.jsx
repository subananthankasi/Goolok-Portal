import React from "react";
const FollowUp = ({ isOpen, closeModal }) => {
  return (
    <div
      className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="d-flex" style={{ alignItems: "center" }}>
            <h4 className="page_subheading m-3">Add Follow Up</h4>
            <button
              type="button"
              className="close closebutton"
              onClick={closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <hr className="m-0"/>
          <div className="card-body p-3">
            <form>
              <div className="row">
                <div className="col-md-12 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Next follow up date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="lastName"
                    name="state_name"
                    autoComplete="off"
                  />
                </div>

                <div className="col-md-12 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Remark
                  </label>
                  <div>
                  <textarea 
                    id="myTextarea" 
                    name="message" 
                    rows="5"  
                   style={{width:"100%"}}
                    placeholder="Enter your message here">
                    </textarea>
                    </div>
                </div>
              </div>
              <div className="text-end py-3 px-3">
                <button className="btn1 me-1" type="button">
                  Clear
                </button>
                <button className="btn1">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUp;
