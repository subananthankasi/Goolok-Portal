import React, { useEffect, useState } from "react";
import {
  DocumentvalidateFormData,
  DocumentvalidateFormDataUpdate,
} from "./propertyDocumentsFormValidation";
import Toast from "../../../Utils/Toast";
import { useDispatch, useSelector } from "react-redux";
import { updatePropertyDocument } from "../../../Redux/Actions/MasterPage/PropertyDocumentAction";
import PropertyTypeDropDown, {
  usePropertyOptions,
} from "../../../Utils/SelectDropDown/PropertyTypeDropDown";
import SubPropertyDropDown, {
  useSubPropertyOptions,
} from "../../../Utils/SelectDropDown/SubPropertyDropDown";
import Common from "../../../common/Common";

const PropertyDocumentEdit = ({ isOpen, closeModal, editData }) => {
  const dispatch = useDispatch();

  const typeDropDown = usePropertyOptions();
  const SubTypeDropDown = useSubPropertyOptions();
  // const isLoading = useSelector(
  //   (state) => state.PropertyDocumentReducer.isLoading
  // );
  const { updateLoading, PropertyDocumentData } = useSelector(
    (state) => state.PropertyDocument
  );
  const [formData, setFormData] = useState({
    property_type: "",
    subproperty: " ",
    document: "",
    prop_status: "Enable",
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const drop = () => {
    if (editData) {
      const defaultOptionsType = typeDropDown.find(
        (option) => option.value === editData.prop_type
      );
      setSelectedProperty(defaultOptionsType);

      const defaultOptionSubType = SubTypeDropDown.find(
        (option) => option.value === editData.subproperty
      );
      setSelectedSubProperty(defaultOptionSubType);
    }
  };

  useEffect(() => {
    drop();
  }, [editData]);

  // dropdown set
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedSubProperty, setSelectedSubProperty] = useState(null);

  const handlePropertySelect = (data) => {
    setSelectedProperty(data);
    setSelectedSubProperty(null);
  };
  const handleSubPropertySelect = (data) => {
    setSelectedSubProperty(data);
  };

  useEffect(() => {
    setFormData({
      ...formData,
      property_type: selectedProperty ? selectedProperty.value : "",
      subproperty: selectedSubProperty ? selectedSubProperty.value : "",
    });
  }, [selectedProperty, selectedSubProperty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({});
  const { cleanText } = Common()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = DocumentvalidateFormDataUpdate(formData);
    const payload = {
      ...formData,
      document: cleanText(formData.document),
    }
    if (validationResult.isValid) {

      const res = await dispatch(updatePropertyDocument(payload));
      if (res.success) {
        Toast({ message: "Updated successfully", type: "success" });
        setErrors({});
        setFormData({ document: "", status: "Enable", type: "" });
        closeModal();
      } else {
        setErrors(res?.error);
      }
    } else {
      setErrors(validationResult.errors);
    }
  };

  const handleCancel = () => {
    closeModal();
    setErrors({});
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
            <h4 className="page_subheading m-3">Update Property Document</h4>
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
                <div className="col-md-12 mb-3">
                  <label className="form-label" htmlFor="inputState">
                    Property Type
                  </label>
                  <PropertyTypeDropDown
                    onSelect={handlePropertySelect}
                    selectedProperty={selectedProperty}
                  />
                  {errors.property_type && (
                    <div className="validation_msg">{errors.property_type}</div>
                  )}
                </div>

                <div className="col-md-12 mb-3">
                  <label className="form-label" htmlFor="inputState">
                    Property Type
                  </label>
                  <SubPropertyDropDown
                    onSelect={handleSubPropertySelect}
                    selectedSubProperty={selectedSubProperty}
                    filter={selectedProperty}
                  />
                  {errors.subproperty && (
                    <div className="validation_msg">{errors.subproperty}</div>
                  )}
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="document" className="form-label">
                    Property Document
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="document"
                    value={formData.document}
                    onChange={handleChange}
                  />
                  {errors.document && (
                    <div className="validation_msg">{errors.document}</div>
                  )}
                </div>
              </div>

              <div className="mb-3 col-md-12">
                <label className="form-label" htmlFor="inputState">
                  Status
                </label>
                <select
                  className="form-select"
                  name="prop_status"
                  value={formData.prop_status}
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
                  {updateLoading ? "updateing..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDocumentEdit;
