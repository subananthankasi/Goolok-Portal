import React, { useState, useEffect } from "react";
import {validateUpdateFormData } from "./propertyTypeFormValidation";
import { useDispatch } from "react-redux";
import { updatePropertyType } from "../../../Redux/Actions/MasterPage/PropertyTypeAction";
import Toast from "../../../Utils/Toast";

const PropertyTypeEdit = ({ isOpen, closeModal, editData }) => {
  const [formData, setFormData] = useState({
    property_type: "",
    status: "Enable",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
     
    const validationResult = validateUpdateFormData(formData);
    if (validationResult.isValid) {
      setErrors("");
      closeModal();
      setFormData(editData);
      Toast({ message: "Updated Successfully", type: "success" });
      await dispatch(updatePropertyType(formData));  
    } else {
      setErrors(validationResult.errors);
    }
  };

  const handleCancel = () => {
    setFormData(editData);
    closeModal();
    setErrors("");
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
            <h4 className="page_subheading m-3">Update Property Type</h4>
            <button
              type="button"
              className="close closebutton"
              onClick={handleCancel}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="card-body p-3">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Property Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="property_type"
                    value={formData.property_type}
                    onChange={handleChange}
                  />
                  {errors.property_type && <div className="validation_msg">{errors.property_type}</div>}
                </div>
              </div>

              <div className="mb-3 col-md-12">
                <label className="form-label" htmlFor="inputState">
                  Status
                </label>
                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  
                  <option value="Enable">Enable</option>
                  <option value="Disable">Disable</option>
                </select>
                {errors.status && (
                  <div className="validation_msg">{errors.status}</div>
                )}
              </div>

           

              <div className="text-end py-3 px-3">
                <button
                  type="button"
                  className="btn1 me-1"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button type="submit" className="btn1">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyTypeEdit;


