import React, { useState, useEffect } from "react";
import { validateFormData } from "./LawyerDocumentValidation";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../Utils/Toast";
import { updateLawDoc } from "../../../Redux/Actions/MasterPage/LawyerDocumentAction";
import Common from "../../../common/Common";

const LawyerDocumentEdit = ({ isOpen, closeModal, editData }) => {
  const [formData, setFormData] = useState({
    document: "",
    status: "Enable",
  });

  const updateLoading = useSelector(
    (state) => state.LawyerDocument.updateLoading
  );
  const dispatch = useDispatch();
  const { cleanText } = Common();

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
    setErrors((pre) => ({
      ...pre,
      [name]: "",
    }));
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResult = validateFormData(formData);
    if (validationResult.isValid) {
      const newData = {
        ...formData,
        document: cleanText(formData?.document),
      };
      const res = await dispatch(updateLawDoc(newData));
      if (res?.success) {
        closeModal();
        setErrors("");
        Toast({ message: "Updated Successfully", type: "success" });
      } else {
        setErrors(res?.error);
      }
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
            <h4 className="page_subheading m-3">Lawyer Document Update</h4>
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
                    Document
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

export default LawyerDocumentEdit;
