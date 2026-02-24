import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StateDropDown, {
  useStateOptions,
} from "../../../Utils/SelectDropDown/StateDropDown";
import DistrictDropDown, {
  useDistrictOptions,
} from "../../../Utils/SelectDropDown/DistrictDropDown";
import TalukDropDown, {
  useTalukOptions,
} from "../../../Utils/SelectDropDown/TalukDropDown";
import { VillageValidateFormData } from "./valiadation";
import Toast from "../../../Utils/Toast";
import { updateVillage } from "../../../Redux/Actions/MasterPage/VillageAction";
import Common from "../../../common/Common";

const VillageEdit = ({ isOpen, closeModal, editData }) => {
  const dispatch = useDispatch();

  const stateDropDown = useStateOptions();
  const districtDropDown = useDistrictOptions();
  const talukDropDown = useTalukOptions();

  const [formData, setFormData] = useState({
    village_state: " ",
    village_district: " ",
    village_taluk: " ",
    village_name: "",
    status: "",
  });

  const drop = () => {
    if (editData) {
      const defaultOptionState = stateDropDown.find(
        (option) => option.value === editData.village_state
      );
      setSelectedState(defaultOptionState);

      const defaultOptionDistrict = districtDropDown.find(
        (option) => option.value === editData.village_district
      );
      setSelectedDistrict(defaultOptionDistrict);

      const defaultOptionTaluk = talukDropDown.find(
        (option) => option.value === editData.village_taluk
      );
      setSelectedTaluk(defaultOptionTaluk);

      setFormData({
        village_state: editData.village_state,
        village_district: editData.village_district,
        village_taluk: editData.village_taluk,
        village_name: editData.village_name,
        status: editData.status,
      });
    }
  };

  useEffect(() => {
    drop();
  }, [editData]);

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
    setSelectedTaluk(null);
  };

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setSelectedTaluk(null);
  };
  const [selectedTaluk, setSelectedTaluk] = useState(null);
  const handleTalukSelect = (taluk) => {
    setSelectedTaluk(taluk);
  };
  const updateLoading = useSelector((state) => state.Village.updateLoading);

  useEffect(() => {
    setFormData({
      ...formData,
      village_state: selectedState ? selectedState.value : " ",
      village_district: selectedDistrict ? selectedDistrict.value : "",
      village_taluk: selectedTaluk ? selectedTaluk.value : "",
    });
  }, [selectedState, selectedDistrict, selectedTaluk]);

  const [errors, setErrors] = useState({});

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   const result = VillageValidateFormData(formData);
  //   if (result.isValid) {
  //     Toast({ message: "Updated Successfully", type: "success" });
  //     dispatch(updateVillage(editData.id, formData));
  //     closeModal();
  //     setErrors("");
  //   } else {
  //     setErrors(result.errors);
  //   }
  // };

  const { cleanText } = Common()
  const onSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      ...formData,
      taluk_name: cleanText(formData.taluk_name),
    };
    const validationResult = VillageValidateFormData(newData);
    if (validationResult.isValid) {
      const res = await dispatch(updateVillage(editData.id, newData));
      if (res.success) {
        Toast({ message: "Update Successfully", type: "success" });
        closeModal();
        setErrors("");
      } else {
        setErrors(res?.error);
      }
    } else {
      setErrors(validationResult.errors);
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setFormData(editData);
    closeModal();
    drop();
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
            <h4 className="page_subheading m-3">Update Village</h4>
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
                  {errors.village_state && (
                    <div className="validation_msg">{errors.village_state}</div>
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
                  {errors.village_district && (
                    <div className="validation_msg">
                      {errors.village_district}
                    </div>
                  )}
                </div>

                <div className="mb-3 col-md-12">
                  <label className="form-label" htmlFor="inputState">
                    Taluk
                  </label>
                  <TalukDropDown
                    onSelect={handleTalukSelect}
                    selectedTaluk={selectedTaluk}
                    filter={selectedDistrict}
                  />
                  {errors.village_taluk && (
                    <div className="validation_msg">{errors.village_taluk}</div>
                  )}
                </div>

                <div className="col-md-12 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Village
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="village_name"
                    value={formData.village_name}
                    onChange={handleChange}
                  />
                  {errors.village_name && (
                    <div className="validation_msg">{errors.village_name}</div>
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
                  cancel
                </button>
                <button
                  className="btn1"
                  onClick={onSubmit}
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

export default VillageEdit;
