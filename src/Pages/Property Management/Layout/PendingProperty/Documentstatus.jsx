import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaff } from "../../../../Redux/Actions/MasterPage/Staff";
import Select from "react-select";
import { updateSurveyStatus } from "../../../../Redux/Actions/PropertyManagement/Land/LandNewPropertyActions";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
 

const DocumentStatus = ({ isOpen, closeModal,editData}) => {

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

  // State management
  const [selectedStaff, setSelectedStaff] = useState(null);
   const [remarks, setRemarks] = useState("");
 
  const handleStaff = (data) => {
    setSelectedStaff(data);
  };

 
  const handleRemarksChange = (event) => {
    setRemarks(event.target.value);
  };

  const [errors, setErrors] = useState({});
 
const [formData,setFormData] = useState({})
useEffect(()=>{
  if(editData){
    setFormData({
      ...formData,
      id:editData,
      staff: selectedStaff ? selectedStaff.value : "",
      remark: remarks,
    })
  } 
},[editData,selectedStaff,remarks])

  const handleSubmit = async (e) => {
    e.preventDefault();  
    let validationErrors = {};
    if(editData == ""){
      alert("error")
      validationErrors.id = "id not available";
    }
  
    if (!selectedStaff) {
      validationErrors.staff = "Please select a staff member.";
    }
   
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else{
      setErrors("")
    } 
    try{
      const response = await axios.post(`${API_BASE_URL}/layoutstatus`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }); 
      if (response.status === 200) {   
           window.location.reload()  
      } else { 
        alert(`Unexpected response status: ${response.status}`);
      }
      }catch (error){
      alert("error on adding")
    } 
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
            <h4 className="page_subheading m-3">Proceed to field survey</h4>
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
              <div className="col-md-12">  
                <div className="form-group mt-3">
                  <div className="row">
                    <div className="col-4">
                      <label className="form-label">Staff</label>
                    </div>
                    <div className="col-8">
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
                      {errors.staff && <div className="validation_msg">{errors.staff}</div>}

                    </div>
                  </div>
                </div>

                <div className="form-group mt-3">
                  <div className="row">
                    <div className="col-4">
                      <label className="form-label">Remarks</label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        value={remarks}
                        onChange={handleRemarksChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-end px-3 mt-4">
                  <button className="btn1 me-1" onClick={closeModal}>
                    Cancel
                  </button>
                  <button className="btn1" onClick={handleSubmit}>
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentStatus;
