import React from "react";

const NearByModal = ({ isOpen, closeModal }) => {
  return (
    <div
      className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="d-flex" style={{ alignItems: "center" }}>
            <h4 className="page_subheading m-3">Near By</h4>
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
                <div className="col-md-12 col-lg-6">
                  <div className="form-group mt-3">
                    <div className="row">
                      <div className="col-4">
                        <label className="form-label">Type</label>
                      </div>
                      <div className="col-7">
                        <select id="inputState" className="form-select">
                          <option value="Enable">Transit</option>
                          <option value="Disable">Essentials</option>
                          <option value="Disable">Utility</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="form-group mt-3">
                    <div className="row">
                      <div className="col-4">
                        <label className="form-label">Category</label>
                      </div>
                      <div className="col-7">
                      <select id="inputState" className="form-select">
                          <option value="Enable">Bus Stations</option>
                          <option value="Disable">Airpot</option>
                          <option value="Disable">Metro Stations</option>
                          <option value="Disable">Train Station</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <table className="table table-bordered">
                  <thead>
                    <tr className="pricingTable">
                      <th scope="col">Sl.no</th>
                      <th scope="col">Location</th>
                      <th scope="col">Distance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row">1</td>
                      <td>Kalavakkam</td>
                      <td>2.4 km | 29 mins</td>
                    </tr>
                    <tr>
                      <td scope="row">2</td>
                      <td>Thiruporur</td>
                      <td>3.3 km | 11 mins</td>
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

export default NearByModal;
