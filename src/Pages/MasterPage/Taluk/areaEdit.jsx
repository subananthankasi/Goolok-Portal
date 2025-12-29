import React, { useEffect, useState } from "react";
import StateDropDown, {
  useStateOptions,
} from "../../../Utils/SelectDropDown/StateDropDown";
import DistrictDropDown, {
  useDistrictOptions,
} from "../../../Utils/SelectDropDown/DistrictDropDown";
import { TalukvalidateFormData } from "./ares";
import Toast from "../../../Utils/Toast";
import { updateTaluk } from "../../../Redux/Actions/MasterPage/TalukAction";
import { useDispatch, useSelector } from "react-redux";
import Common from "../../../common/Common";

const AreaEdit = ({ isOpen, closeModal, editData }) => {
  const dispatch = useDispatch();
  const { cleanText } = Common();
  const stateDropDown = useStateOptions();
  const districtDropDown = useDistrictOptions();

  const [formData, setFormData] = useState({
    taluk_state: "",
    taluk_district: "",
    taluk_name: "",
    status: "",
  });
  const updateLoading = useSelector((state) => state.Taluk.updateLoading);

  // set the updating data

  const dataSet = () => {
    if (editData) {
      const defaultOptionState = stateDropDown.find(
        (option) => option.value === editData.taluk_state
      );
      setSelectedState(defaultOptionState);

      const defaultOptionDistrict = districtDropDown.find(
        (option) => option.value === editData.taluk_district
      );
      setSelectedDistrict(defaultOptionDistrict);

      setFormData({
        taluk_state: editData.taluk_state,
        taluk_district: editData.taluk_district,
        taluk_name: editData.taluk_name,
        status: editData.status,
      });
    }
  };
  useEffect(() => {
    if (isOpen) {
      dataSet();
    }
  }, [editData, isOpen]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // dropdown set
  const [selectedState, setSelectedState] = useState(null);
  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedDistrict(null);
  };
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
  };

  useEffect(() => {
    setFormData({
      ...formData,
      taluk_state: selectedState ? selectedState.value : "",
      taluk_district: selectedDistrict ? selectedDistrict.value : "",
    });
  }, [selectedState, selectedDistrict]);

  const [errors, setErrors] = useState({});

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const validationResult = TalukvalidateFormData(formData);
  //   if (validationResult.isValid) {
  //     Toast({ message: "Updated  Successfully", type: "success" });
  //     setErrors("");
  //     await dispatch(updateTaluk(editData.id, formData));
  //     closeModal();
  //   } else {
  //     setErrors(validationResult.errors);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      ...formData,
      taluk_name: cleanText(formData.taluk_name),
    };
    const validationResult = TalukvalidateFormData(newData);
    if (validationResult.isValid) {
      const res = await dispatch(updateTaluk(editData.id, newData));
      if (res.success) {
        Toast({ message: "Update Successfully", type: "success" });
        setErrors("");
        setSelectedState(null);
        setSelectedDistrict(null);
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
    setFormData({
      taluk_state: "",
      taluk_district: "",
      taluk_name: "",
      status: ""
    })
    setSelectedState(null)
    setSelectedDistrict(null)
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
            <h4 className="page_subheading m-3">Update Area</h4>
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
                <div className="mb-3 col-md-12">
                  <label className="form-label" htmlFor="inputState">
                    State
                  </label>
                  <StateDropDown
                    onSelect={handleStateSelect}
                    selectedState={selectedState}
                  />
                  {errors.taluk_state && (
                    <div className="validation_msg">{errors.taluk_state}</div>
                  )}
                </div>

                <div className="mb-3 col-md-12">
                  <label className="form-label" htmlFor="inputState">
                    District
                  </label>
                  <DistrictDropDown
                    onSelect={handleDistrictSelect}
                    selectedDistrict={selectedDistrict}
                    filter={selectedState}
                  />
                  {errors.taluk_district && (
                    <div className="validation_msg">
                      {errors.taluk_district}
                    </div>
                  )}
                </div>

                <div className="col-md-12 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Taluk
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="taluk_name"
                    value={formData.taluk_name}
                    onChange={handleChange}
                  />
                  {errors.taluk_name && (
                    <div className="validation_msg">{errors.taluk_name}</div>
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
                <button
                  className="btn1"
                  onClick={handleSubmit}
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
  );
};

export default AreaEdit;
