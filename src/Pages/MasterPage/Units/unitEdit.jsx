import React, { useState, useEffect } from "react";
import { validateFormData } from "./validation";
import Toast from "../../../Utils/Toast";
import { useDispatch, useSelector } from "react-redux";
import { updateUnit } from "../../../Redux/Actions/MasterPage/UnitAction";
import Common from "../../../common/Common";

const UnitEdit = ({ isOpen, closeModal, editData }) => {
  const dispatch = useDispatch();
  const updateLoading = useSelector((state) => state.Unit.updateLoading);

  const [formData, setFormData] = useState({
    unit: "",
    status: "",
  });

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

  const [errors, seterrors] = useState("");
  const { cleanText } = Common()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = validateFormData(formData);
    const payload = {
      ...formData,
      unit: cleanText(formData.unit),
    }
    if (validationResult.isValid) {
      const res = await dispatch(updateUnit(payload));
      if (res.success) {
        Toast({ message: "Added successfully", type: "success" });
        seterrors("");
        setFormData({ unit: "", status: "Enable" });
        closeModal();
      } else {
        seterrors(res?.error);
      }

    } else {
      seterrors(validationResult.errors);
    }
  };
  useEffect(() => () => {
    if (isOpen) {
      seterrors("")
    }
  }, [isOpen])


  const handleCancel = () => {
    setFormData(editData);
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
            <h4 className="page_subheading m-3">Update Unit</h4>
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
                    Unit
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                  />
                  {errors.unit && (
                    <div className="validation_msg">{errors.unit}</div>
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

export default UnitEdit;
