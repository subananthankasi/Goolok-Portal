import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../../../Redux/Actions/MasterPage/CategoryAction";
import Toast from "../../../Utils/Toast";
import { validateFormData } from "./CategoryValidationFormData";
import Common from "../../../common/Common";

const EditCategory = ({ isOpen, closeModal, editData }) => {
  const [formData, setFormData] = useState({
    category: "",
    status: "",
  });

  const dispatch = useDispatch();
  const updateLoading = useSelector((state) => state.Category.updateLoading);

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
  ///validation////
  const { cleanText } = Common()
  const [errors, seterrors] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = validateFormData(formData);
    const payload = {
      ...formData,
      category: cleanText(formData.category),
    }
    if (validationResult.isValid) {
      const res = await dispatch(updateCategory(payload));
      if (res.success) {
        Toast({ message: "Added successfully", type: "success" });
        seterrors("");
        setFormData({ category: "", status: "" });
        closeModal();
      } else {
        seterrors(res?.error);
      }
    } else {
      seterrors(validationResult.errors);
    }
  };
  ///cancel///
  const handleCancel = () => {
    setFormData(editData);
    closeModal();
    seterrors("");
  };

  return (
    <>
      <div
        className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="d-flex" style={{ alignItems: "center" }}>
              <h4 className="page_subheading m-3">Update Category</h4>
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
                      Category Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      autocomplete="off"
                      value={formData.category}
                      onChange={handleChange}
                    />
                    {errors.category && (
                      <div className="validation_msg">{errors.category}</div>
                    )}
                  </div>
                </div>
                <div className="mb-3 col-md-12">
                  <label className="form-label" htmlFor="inputState">
                    Status
                  </label>
                  <select
                    name="status"
                    className="form-select"
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
                  <a
                    href="javascript:void(0);"
                    className="btn1 text-dark me-1"
                    onClick={() => {
                      setFormData({ category: "", status: "" });
                    }}
                  >
                    Clear
                  </a>
                  <button
                    type="submit"
                    className="btn1"
                    disabled={updateLoading}
                  >
                    {updateLoading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCategory;
