import { useState, useEffect } from "react";
import { validateFormData } from "./stateValidation";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../../Redux/Actions/MasterPage/StateAction";
import Toast from "../../../Utils/Toast";
import Common from "../../../common/Common";

const StateEdit = ({ isOpen, closeModal, editData }) => {
  const [formData, setFormData] = useState({
    state_name: "",
    status: "",
  });
  const dispatch = useDispatch();
  const updateLoading = useSelector((state) => state.State.updateLoading);
  const { cleanText } = Common();

  useEffect(() => {
    if (editData) {
      setFormData({
        state_name: editData.state_name,
        status: editData.status === "" ? "Enable" : editData.status,
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

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      ...formData,
      id: editData?.id,
      state_name: cleanText(formData.state_name),
    };
    const validationResult = validateFormData(newData);
    if (validationResult.isValid) {
      const res = await dispatch(updateState(editData.id, newData));
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
            <h4 className="page_subheading m-3">Update State</h4>
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
                  <label htmlFor="lastName" className="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="state_name"
                    value={formData.state_name}
                    onChange={handleChange}
                    autoComplete="off"
                  />

                  {errors.state_name && (
                    <div className="validation_msg">{errors.state_name}</div>
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
                <button
                  className="btn1 me-1"
                  type="button"
                  onClick={handleCancel}
                >
                  Clear
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

export default StateEdit;
