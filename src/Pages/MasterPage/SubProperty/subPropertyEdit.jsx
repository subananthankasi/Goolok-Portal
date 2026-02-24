import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePropertyType } from "../../../Redux/Actions/MasterPage/PropertyTypeAction";
import Toast from "../../../Utils/Toast";
import { validateFormData } from "./Validation";
import PropertyTypeDropDown, {
  usePropertyOptions,
} from "../../../Utils/SelectDropDown/PropertyTypeDropDown";
import { updateSubPropertyType } from "../../../Redux/Actions/MasterPage/SubPropertyAction";

const SubPropertyEdit = ({ isOpen, closeModal, editData }) => {
  const [formData, setFormData] = useState({
    property: " ",
    subproperty: " ",
    status: "Enable",
    shortform: "",
  });
  const updateLoading = useSelector(
    (state) => state.SubPropertyType.updateLoading
  );
  const propertyDropDown = usePropertyOptions();
  const dispatch = useDispatch();

  const [selectedProperty, setSelectedProperty] = useState(null);
  const handlePropertySelect = (data) => {
    setSelectedProperty(data);
  };

  const drop = () => {
    if (editData) {
      const defaultOptionProperty = propertyDropDown.find(
        (option) => option.value === editData.property
      );
      setSelectedProperty(defaultOptionProperty);
    }
  };

  useEffect(() => {
    if (isOpen && editData) {
      drop();
      setFormData((prev) => ({ ...prev, ...editData }));
    }
  }, [editData, isOpen]);

  useEffect(() => {
    setFormData({
      ...formData,
      property: selectedProperty ? selectedProperty.value : " ",
    });
  }, [selectedProperty]);

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
    const validationResult = validateFormData(formData);
    if (validationResult.isValid) {
      setErrors("");
      // setFormData(editData);
      Toast({ message: "Updated Successfully", type: "success" });
      await dispatch(updateSubPropertyType(formData));
      closeModal();
      setFormData("");
    } else {
      setErrors(validationResult.errors);
    }
  };

  const handleCancel = () => {
    setFormData({});
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
            <h4 className="page_subheading m-3">Update SubProperty Type</h4>
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
                  <PropertyTypeDropDown
                    onSelect={handlePropertySelect}
                    selectedProperty={selectedProperty}
                  />
                  {errors.property && (
                    <div className="validation_msg">{errors.property}</div>
                  )}
                </div>

                <div className="col-md-12 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Sub Property
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="subproperty"
                    value={formData.subproperty}
                    onChange={handleChange}
                  />
                  {errors.subproperty && (
                    <div className="validation_msg">{errors.subproperty}</div>
                  )}
                </div>
                <div className="col-md-12 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Short Form
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="shortform"
                    autocomplete="off"
                    value={formData.shortform}
                    onChange={handleChange}
                  />
                  {errors.shortform && (
                    <div className="validation_msg">{errors.shortform}</div>
                  )}
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
                <button type="submit" className="btn1" disabled={updateLoading}>
                  {updateLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubPropertyEdit;
