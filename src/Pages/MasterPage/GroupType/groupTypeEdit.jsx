import React, { useState, useEffect } from "react";
import { validateFormData } from "./GroupTypeFormValidation";
import { useDispatch } from "react-redux";
import { updateGroupType } from "../../../Redux/Actions/MasterPage/GroupTypeAction";
import Toast from "../../../Utils/Toast";
import { TagPicker } from "rsuite";
const GroupTypeEdit = ({ isOpen, closeModal, editData }) => {
  const [formData, setFormData] = useState({
    group_name: "",
    packages: [],
    status: "",
  });

  const dispatch = useDispatch();


  useEffect(() => {
    if (editData) {
      setFormData({
        group_name: editData.group_name || "",
        pagename: editData.pages || [],
        status: editData.status || "Enable",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagChange = (value) => {
    setFormData({
      ...formData,
      pagename: value,
    });
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResult = validateFormData(formData);
    if (validationResult.isValid) {
      setErrors({});
      closeModal();
      setFormData(editData);
      Toast({ message: "Updated Successfully", type: "success" });
      await dispatch(updateGroupType(formData));
    } else {
      setErrors(validationResult.errors);
    }
  };

  const handleCancel = () => {
    setFormData(editData);
    closeModal();
    setErrors({});
  };

  const data = [
    "Document verification",
    "Advance",
    "Location verification",
    "Market research",
    "Price proposal",
    "Payment for legal opinion",
    "Lawyer documents",
    "Mandatory document",
    "Field survey",
    "Landowner agreement",
    "Pricing department",
    "Media department",
    "Content writing",
    "After sales",
  ].map((item) => ({ label: item, value: item }));

  return (
    <div
      className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="d-flex" style={{ alignItems: "center" }}>
            <h4 className="page_subheading m-3">Update Group Type</h4>
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
                    Group Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="group_name"
                    value={formData.group_name}
                    onChange={handleChange}
                  />
                  {errors.group_name && (
                    <div className="validation_msg">{errors.group_name}</div>
                  )}
                </div>
                <div className="col-md-12 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Allow Pages
                  </label>
                  <TagPicker
                    data={data}
                    style={{ width: "100%" }}
                    menuStyle={{ width: 200 }}
                    value={formData.pagename}
                    onChange={handleTagChange}
                    name="pagename"
                  />
                  {errors.pagename && (
                    <div className="validation_msg">{errors.pagename}</div>
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

export default GroupTypeEdit;
