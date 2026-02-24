import React from "react";

const AmenitiesModal = ({ isOpen, closeModal }) => {
  return (
    <div
      className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="d-flex" style={{ alignItems: "center" }}>
            <h4 className="page_subheading m-3">Amenities</h4>
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
                     
                  <div className="row mt-3">
                        <div className="col-md-6 col-lg-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault" checked 
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Power Back Up
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault" checked 
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Lift
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault" checked 
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Rain Water Harvesting
                            </label>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault" checked 
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Club House
                            </label>
                          </div>
                        </div>


                        <div className="col-md-6 col-lg-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault" checked 
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Gymnasium
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault" checked 
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Park
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault" checked 
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Reserved Parking
                            </label>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              id="flexCheckDefault" checked 
                            />
                            <label
                              className="form-check-label amenitiesBox"
                              htmlFor="flexCheckDefault"
                            >
                              Security
                            </label>
                          </div>
                        </div>



                      </div>
                  </div>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesModal;
