import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { updateSubCategory } from "../../../Redux/Actions/MasterPage/SubCategoryAction";
import Toast from "../../../Utils/Toast";
import { validateFormData } from "./CategoryValidationFormData";
import Common from "../../../common/Common";

const EditSubCategory = ({ isOpen, closeModal, editData, dropdown }) => {
  const updateLoading = useSelector((state) => state.SubCategory.updateLoading);

  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    status: "",
  });

  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    if (editData) {
      const defaultOption = dropdown.find(
        (option) => option.value === editData.category_id
      );
      setSelectedOption(defaultOption);
      setFormData({
        ...editData,
        category: defaultOption.value,
      });
    }
  }, [editData, dropdown]);

  const handleChangeSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
    setFormData({
      ...formData,
      category: selectedOption ? selectedOption.value : "",
    });
  };

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
  const [errors, seterrors] = useState("");
  const { cleanText } = Common()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = validateFormData(formData);
    const payload = {
      ...formData,
      subcategory: cleanText(formData.subcategory),
    }
    if (validationResult.isValid) {
      const res = await dispatch(updateSubCategory(payload));
      if (res.success) {
        seterrors("");
        setFormData({ category: "", subcategory: "", status: "" });
        closeModal();
        Toast({ message: "Added successfully", type: "success" });
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
              <h4 className="page_subheading m-3">Update SubCategory</h4>
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
                    <label htmlFor="category" className="form-label">
                      Category Name
                    </label>
                    <Select
                      options={dropdown}
                      value={selectedOption}
                      onChange={handleChangeSelect}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused ? "#e7e7e7" : "#e7e7e7",
                          fontSize: "13px",
                        }),
                        option: (baseStyles, state) => ({
                          ...baseStyles,
                          fontSize: "12px",
                          color: "black",
                        }),
                      }}
                    />
                    {errors.category && (
                      <div className="validation_msg">{errors.category}</div>
                    )}
                  </div>

                  <div className="col-md-12 mb-3 ">
                    <label htmlFor="lastName" className="form-label">
                      SubCategory Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="subcategory"
                      autocomplete="off"
                      value={formData.subcategory}
                      onChange={handleChange}
                    />
                    {errors.subcategory && (
                      <div className="validation_msg">{errors.subcategory}</div>
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
                      setFormData({
                        category: "",
                        subcategory: "",
                        status: "",
                      });
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

export default EditSubCategory;
