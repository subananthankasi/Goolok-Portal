import React, { useState, useEffect } from "react";
import Toast from "../../../Utils/Toast";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";

const AdvanceEdit = ({ isOpen, closeModal, editData, fetchData }) => {
  const [formData, setFormData] = useState({
    amount: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = validateFormData(formData);
    if (validationResult.isValid) {
      setLoading(true);
      try {
        await axios.put(`${API_BASE_URL}/advance/${editData.id}`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        Toast({ message: "Added successfully", type: "success" });
        seterrors("");
        fetchData();
        setFormData({ amount: "", status: "Enable" });
        closeModal();
      } catch (error) {
        Toast({ message: "Update Failed", type: "Error" });
      } finally {
        setLoading(false);
      }
    } else {
      seterrors(validationResult.errors);
      setLoading(false);
    }
  };

  // validation
  const validateFormData = (formData) => {
    const errors = {};
    const integerRegex = /^[0-9]+$/;
    if (!formData.amount || !formData.amount.trim()) {
      errors.amount = "Amount is required";
    } else if (!integerRegex.test(formData.amount.trim())) {
      errors.amount = "Amount should contain only number";
    }

    if (!formData.status || !formData.status.trim()) {
      errors.status = "Status is required";
    }

    if (Object.keys(errors).length > 0) {
      return { isValid: false, errors };
    }

    return { isValid: true, errors: {} };
  };

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
            <h4 className="page_subheading m-3">Update advance amount</h4>
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
                    Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="amount"
                    value={formData.amount}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={handleChange}
                  />
                  {errors.amount && (
                    <div className="validation_msg">{errors.amount}</div>
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
                <button type="submit" className="btn1" disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvanceEdit;
