import axios from "axios";
import React, {useState } from "react";
import API_BASE_URL from "../../../../Api/api"; 

const StatusUpdate = ({ isOpen, closeModal, editData }) => {
 

  
  const [status, setStaffStatus] = useState('live');
  const [remark, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
 
  
 
 
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const formData = {
      status,
      remark, 
      id:editData
    }; 

    

    try {  
         const response = await axios.post(`${API_BASE_URL}/livestatus`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });  
        if (response.status === 200) {   
          window.location.reload();
        }
    } catch (error) {  
      if (error.response) { 
       alert(`Error: ${error.response.data.messages?.error || error.message}`);
      } else {
       alert(`Error adding data: ${error}`);
      }
    }  
    setLoading(false);  
    setRemarks("")
    closeModal();
  };
  

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
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mt-3">

             
                    <div className="row">
                      <div className="col-4">
                        <label className="form-label">Status</label>
                      </div>
                      <div className="col-5">
                        <select
                          id="inputState"
                          className="form-select"
                          value={status}
                          onChange={(e) => setStaffStatus(e.target.value)}
                        >
                          <option value="live">Live</option>
                          <option value="closed">Close</option>
                          <option value="cancel">Cancel</option>
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
                        <input
                          type="text"
                          className="form-control"
                          value={remark}
                          onChange={(e) => setRemarks(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-end px-3 mt-4">
                    <button
                      type="button"
                      className="btn1 me-1"
                      onClick={closeModal}
                      disabled={loading}  
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn1" disabled={loading}>
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          &nbsp; Loading...
                        </>
                      ) : (
                        "Proceed"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdate;
