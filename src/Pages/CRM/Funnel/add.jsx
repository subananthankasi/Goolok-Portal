import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
const Add = ({ isOpen, closeModal }) => {
  const [date, setDate] = useState(new Date());

  const handleChange = (newDate) => {
    setDate(newDate);
  };
  return (
    <div
      className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog  " role="document">
        <div className="modal-content">
          <div className="d-flex" style={{ alignItems: "center" }}>
            <h4 className="page_subheading m-3">Add</h4>
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
                  <div className="col-md-12 mb-3 ">
                    <label htmlFor="lastName" className="form-label">
                      Remarks
                    </label>
                    <input type="text" className="form-control" id="lastName" />
                  </div>

                  <div className="col-md-12 mb-3 ">
                    <label htmlFor="lastName" className="form-label">
                      Chasing Date
                    </label>
                    <div className="w-100">
                      <DatePicker onChange={handleChange} value={date} className="custom-date-picker"  />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-end py-3 px-3">
                <button className="btn1 me-1">Clear</button>
                <button className="btn1">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
