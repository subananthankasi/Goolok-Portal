import axios from "axios";
import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../../../Api/api";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchStaff } from "../../../../Redux/Actions/MasterPage/Staff";

const LayoutOwnerStatus = ({ isOpen, closeModal, editData,statusUrl }) => {
 

   // Get staff details
   const staffdata = useSelector((state) => state.staff.staff); 
   const dispatch = useDispatch();
   useEffect(() => {
     dispatch(fetchStaff());
   }, [dispatch]);
   const enableStaffData = staffdata.filter((data) => data.status === "Enable");
   const staffOptions = enableStaffData.map((data) => ({
     value: data.id,
     label: data.staff_name,
   }));
   const [selectedStaff, setSelectedStaff] = useState(null);
   const handleStaff = (data) => {
    setSelectedStaff(data);
  };





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
        apiEndpoint = 'workupdate';
        heading = 'Proceed to Admin Department';
        break;
      case 'pending':
        apiEndpoint = 'adminsubmit';
        heading = 'Proceed to Admin Department';
        break;
      case 'rework':
        apiEndpoint = 'workupdate';
        heading = 'Proceed to Admin Department';
        break;
      // Add more cases as needed
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
      staffid:selectedStaff?selectedStaff.value:"",
      id:editData
    }; 

    if(status === "complete"){
       if(!formData.staffid){
        alert("Please select staff");
        return
       }
    }

    try { 
      setLoading(true); 
      let response;
      if (statusUrl === 'new') {
          response = await axios.post(`${API_BASE_URL}/${apiEndpoint}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }); 
      }

      if (statusUrl === 'pending') {
        response = await axios.post(`${API_BASE_URL}/${apiEndpoint}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
    setSelectedStaff(null)
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

                      {status === "complete" && (
                        <div className="row mt-3">
                          <div className="col-4">
                            <label className="form-label">Staff</label>
                          </div>
                          <div className="col-5">
                          <Select
                        options={staffOptions}
                        onChange={handleStaff}
                        value={selectedStaff}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused
                              ? "#e7e7e7"
                              : "#e7e7e7",
                            fontSize: "13px",
                          }),
                          option: (baseStyles, state) => ({
                            ...baseStyles,
                            fontSize: "12px",
                            color: "black",
                          }),
                        }}
                      />
                          </div>
                        </div>
                      )}
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

export default LayoutOwnerStatus;
