import React from "react";

const View = ({ isOpen, closeModal }) => {
  return (
    <div
      className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="d-flex" style={{ alignItems: "center" }}>
            <h4 className="page_subheading m-3">View</h4>
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
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Sl.no</th>
                      <th scope="col">Remarks</th>
                      <th scope="col">Next Chasing Date</th> 
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>57</td>
                      <td>23 jan 2023</td> 
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>92</td>
                      <td>23 Jun 2023</td> 
                    </tr>  
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
