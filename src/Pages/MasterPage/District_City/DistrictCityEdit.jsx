import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { DistrictvalidateFormData } from "./validation";
import Toast from "../../../Utils/Toast";
import { updateDistrict } from "../../../Redux/Actions/MasterPage/DistrictAction";
import Common from "../../../common/Common";

const DistrictCityEdit = ({ isOpen, closeModal, editData, dropdown }) => {
  const { cleanText } = Common();
  const dispatch = useDispatch();
  const updateLoading = useSelector((state) => state.District.updateLoading);

  const [formData, setFormData] = useState({
    state_type: "",
    district: "",
    status: "",
  });

  // set the updating data

  const dataSet = () => {
    if (editData) {
      const defaultOption = dropdown.find(
        (option) => option.value === editData.state_type
      );
      setSelectedOption(defaultOption);

      setFormData({
        state_type: editData.state_type,
        district: editData.district,
        status: editData.status,
      });
    }
  };
  useEffect(() => {
    dataSet();
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // dropdown state
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChangeSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
    setFormData({
      ...formData,
      state_type: selectedOption ? selectedOption.value : "",
    });
  };

  // update click
  const [errors, setErrors] = useState({});

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const validationResult = DistrictvalidateFormData(formData);
  //   if (validationResult.isValid) {
  //     Toast({ message: "Updated successfully", type: "success" });
  //     setErrors("");
  //     setFormData({ document: "", status: "Enable", type: "" });
  //     setSelectedOption(null);
  //     await dispatch(updateDistrict(editData.id, formData));
  //     closeModal();
  //   } else {
  //     setErrors(validationResult.errors);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      ...formData,
      district: cleanText(formData.district),
    };
    const validationResult = DistrictvalidateFormData(newData);
    if (validationResult.isValid) {
      const res = await dispatch(updateDistrict(editData.id, formData));
      if (res.success) {
        Toast({ message: "Update Successfully", type: "success" });
        setErrors("");
        closeModal();
      } else {
        setErrors(res?.error);
      }
    } else {
      setErrors(validationResult.errors);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    closeModal();
    dataSet();
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
            <h4 className="page_subheading m-3">Update District</h4>

            <button
              type="button"
              className="close closebutton"
              onClick={handleCancel}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="card-body p-3">
            <form>
              <div className="row">
                <div className="col-md-12 mb-3 ">
                  <label className="form-label" htmlFor="inputState">
                    State
                  </label>
                  <Select
                    value={selectedOption}
                    onChange={handleChangeSelect}
                    options={dropdown}
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
                  {errors.state_type && (
                    <div className="validation_msg">{errors.state_type}</div>
                  )}
                </div>

                <div className="col-md-12 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    District
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                  />
                  {errors.district && (
                    <div className="validation_msg">{errors.district}</div>
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
                <button className="btn1 me-1" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="btn1" onClick={handleSubmit} disabled={updateLoading}>
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

export default DistrictCityEdit;
