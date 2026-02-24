import axios from "axios";
import React, {useEffect, useState } from "react";
import API_BASE_URL from "../../../../Api/api";  

const MediaStatusUpdate = ({ isOpen, closeModal, editData,statusUrl }) => {
 
 
 


  const [status, setStaffStatus] = useState(statusUrl);
  const [remark, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setStaffStatus(statusUrl);
  }, [statusUrl]);

  // change base on url status 
  const changeStatus = (statusUrl) => {
    let apiEndpoint;
    let heading;
  
    switch (statusUrl) {
      case 'new':
        apiEndpoint = 'mediaworkupdate';
        heading = 'Status Update';
        break;
      case 'pending':
        apiEndpoint = 'adminmediasubmit';
        heading = 'Proceed to Admin Department';
        break;
      case 'rework':
        apiEndpoint = 'mediaworkupdate';
        heading = 'Status Update';
        break;
    
      default:
        apiEndpoint = 'defaultEndpoint';
        heading = 'Default Heading'; 
        break;
    }
  
    return { apiEndpoint, heading };
  };

  const { apiEndpoint, heading } = changeStatus(statusUrl);
 
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    const formData = {
      status,
      remark, 
      id:editData
    };  
 

    try { 
      setLoading(true); 
      let response;
      if (statusUrl === 'new') {
          response = await axios.post(`${API_BASE_URL}/${apiEndpoint}`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        }); 
      }

      if (statusUrl === 'pending') {
        response = await axios.post(`${API_BASE_URL}/${apiEndpoint}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      }); }

      if (statusUrl === 'rework') {
        response = await axios.post(`${API_BASE_URL}/${apiEndpoint}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
      }); 
    }


      if (response.status === 200) {   
        window.location.reload();
      } else { 
        alert(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {  
      if (error.response) { 
       alert(`Error: ${error.response.data.messages?.error || error.message}`);
      } else {
       alert(`Error adding data: ${error}`);
      }
    }  
    setLoading(false); 
    setStaffStatus("")
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
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mt-3">

                  {statusUrl == "new" &&
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
                          <option value="new">Process</option>
                          <option value="pending">Completed</option>
                        </select>
                      </div>
                    </div> 
                  }

                  {statusUrl === "pending" && (
                    <>
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
                          <option value="pending">Pending</option>
                          <option value="complete">Approved</option>
                          <option value="rework">Rework</option>
                        </select>
                      </div>
                      </div>  
                      </> 
                  )}


                   {statusUrl == "rework" &&
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
                          <option value="rework">Rework</option>
                          <option value="pending">Completed</option>
                        </select>
                      </div>
                    </div> 
                  } 
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

export default MediaStatusUpdate;
