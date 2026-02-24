import { useEffect, useState } from "react";
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
import VillageDropDown, {
  useVillageOptions,
} from "../../../Utils/SelectDropDown/VillageDropDown";
import { PincodeValidateFormData } from "./Validation";
import Toast from "../../../Utils/Toast";
import { updatePincode } from "../../../Redux/Actions/MasterPage/PincodeAction";

const PincodeEdit = ({ isOpen, closeModal, editData }) => {
  const dispatch = useDispatch();

  const stateDropDown = useStateOptions();
  const districtDropDown = useDistrictOptions();
  const talukDropDown = useTalukOptions();
  const villageDropDown = useVillageOptions();
  const updateLoading = useSelector((state) => state.Pincode.updateLoading);

  // update the data
  const [formData, setFormData] = useState({
    pin_state: " ",
    pin_district: " ",
    pin_taluk: " ",
    pin_village: "",
    pincode: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // dropdown set
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedTaluk, setSelectedTaluk] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedDistrict(null);
    setSelectedTaluk(null);
    setSelectedVillage(null);
  };
  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setSelectedTaluk(null);
    setSelectedVillage(null);
  };
  const handleTalukSelect = (taluk) => {
    setSelectedTaluk(taluk);
    setSelectedVillage(null);
  };
  const handleVillageSelect = (village) => {
    setSelectedVillage(village);
  };

  // set the updating data

  const dataSet = () => {
    if (editData) {
      const defaultOptionState = stateDropDown.find(
        (option) => option.value === editData.pin_state
      );
      setSelectedState(defaultOptionState);

      const defaultOptionDistrict = districtDropDown.find(
        (option) => option.value === editData.pin_district
      );
      setSelectedDistrict(defaultOptionDistrict);

      const defaultOptionTaluk = talukDropDown.find(
        (option) => option.value === editData.pin_taluk
      );
      setSelectedTaluk(defaultOptionTaluk);

      const defaultOptionVillage = villageDropDown.find(
        (option) => option.value === editData.pin_village
      );
      setSelectedVillage(defaultOptionVillage);

      setFormData({
        pin_state: editData.pin_state,
        pin_district: editData.pin_district,
        pin_taluk: editData.pin_taluk,
        pin_village: editData.pin_village,
        pincode: editData.pincode,
        status: editData.status,
      });
    }
  };
  useEffect(() => {
    dataSet();
  }, [editData]);

  useEffect(() => {
    setFormData({
      ...formData,
      pin_state: selectedState ? selectedState.value : "",
      pin_district: selectedDistrict ? selectedDistrict.value : "",
      pin_taluk: selectedTaluk ? selectedTaluk.value : " ",
      pin_village: selectedVillage ? selectedVillage.value : "",
    });
  }, [selectedState, selectedDistrict, selectedTaluk, selectedVillage]);

  const [errors, setErrors] = useState({}); 

  const onSubmit = (e) => {
    e.preventDefault();
    const result = PincodeValidateFormData(formData);
    if (result.isValid) {
      Toast({ message: "Updated Successfully", type: "success" });
      dispatch(updatePincode(editData.id, formData));
      handleResetSelected();
    } else {
      setErrors(result.errors);
    }
  };

  const handleResetSelected = () => {
    setErrors("");
    closeModal();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    dataSet();
    handleResetSelected();
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
            <h4 className="page_subheading m-3">Update Pincode</h4>
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
                  {errors.pin_state && (
                    <div className="validation_msg">{errors.pin_state}</div>
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
                  {errors.pin_district && (
                    <div className="validation_msg">{errors.pin_district}</div>
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
                  {errors.pin_taluk && (
                    <div className="validation_msg">{errors.pin_taluk}</div>
                  )}
                </div>

                <div className="mb-3 col-md-12">
                  <label className="form-label" htmlFor="inputState">
                    Village
                  </label>
                  <VillageDropDown
                    onSelect={handleVillageSelect}
                    selectedVillage={selectedVillage}
                    filter={selectedTaluk}
                  />
                  {errors.pin_village && (
                    <div className="validation_msg">{errors.pin_village}</div>
                  )}
                </div>

                <div className="col-md-12 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Pincode
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                  {errors.pincode && (
                    <div className="validation_msg">{errors.pincode}</div>
                  )}
                </div>
              </div>

              <div className="mb-3 col-md-12">
                <label className="form-label" htmlFor="inputState">
                  Status
                </label>
                <select
                  id="inputState"
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

export default PincodeEdit;
