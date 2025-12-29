import React from "react";

const UploadModal = ({ isOpen, closeModal }) => {
  return (
    <div
      className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="d-flex" style={{ alignItems: "center" }}>
            <h4 className="page_subheading m-3">Upload</h4>
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
             

              <div className="row mt-3">
                <table className="table table-bordered">
                  <thead>
                    <tr className="pricingTable">
                      <th scope="col">Sl.no</th>
                      <th scope="col">File Name</th>
                      <th scope="col">view</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row">1</td>
                      <td>Name 1</td>
                      <td><button className="btn btn_pdf btn-outline-info me-1 ">View</button></td>
                    </tr>
                    <tr>
                      <td scope="row">2</td>
                      <td>Name 2</td>
                      <td><button className="btn btn_pdf btn-outline-info me-1">View</button></td>
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

export default UploadModal;
