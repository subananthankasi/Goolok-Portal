import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../Utils/Toast";
import { validateFormDataUpdate } from "./Validation";
import Select from "react-select";
import { fetchDoc } from "../../../Redux/Actions/MasterPage/LawyerDocumentAction";
import { updateLawDocInput } from "../../../Redux/Actions/MasterPage/LawyerDocumentInputAction";
import Common from "../../../common/Common";

const LawyerDocInputEdit = ({ isOpen, closeModal, editData }) => {
  const { cleanText } = Common();

  const dispatch = useDispatch();
  const LawyerDocument = useSelector((state) => state.LawyerDocument.lawyerDoc);
  const updateLoading = useSelector(
    (state) => state.LawyerDocumentInput.updateLoading
  );

  useEffect(() => {
    dispatch(fetchDoc());
  }, [dispatch]);

  // select dropdown set
  const options = LawyerDocument?.map((data) => ({
    value: data.id,
    label: data.document,
  }));

  const [selectedData, setSelectedData] = useState(null);
  const handleSelect = (data) => {
    setSelectedData(data);
  };

  const [formData, setFormData] = useState({
    document: " ",
    documentsub: " ",
    status: "Enable",
  });

  const drop = () => {
    if (editData) {
      const defaultOption = LawyerDocument.find(
        (option) => option.id === editData.document
      );
      setSelectedData({
        value: defaultOption.id,
        label: defaultOption.document,
      });
    }
  };

  useEffect(() => {
    drop();
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  useEffect(() => {
    setFormData({
      ...formData,
      document: selectedData ? selectedData.value : " ",
    });
  }, [selectedData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = validateFormDataUpdate(formData);
    if (validationResult.isValid) {
      const newData = {
        ...formData,
        documentsub: cleanText(formData.documentsub),
      };

      const res = await dispatch(updateLawDocInput(newData));
      if (res.success) {
        Toast({ message: "Updated Successfully", type: "success" });
        closeModal();
        setErrors("");
      } else {
        setErrors(res.error);
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
            <h4 className="page_subheading m-3">Update SubProperty Type</h4>
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
                    Property Type
                  </label>
                  <Select
                    options={options}
                    value={selectedData}
                    onChange={handleSelect}
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
                  {errors.document && (
                    <div className="validation_msg">{errors.document}</div>
                  )}
                </div>

                <div className="col-md-12 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Sub Property
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="documentsub"
                    value={formData.documentsub}
                    onChange={handleChange}
                  />
                  {errors.documentsub && (
                    <div className="validation_msg">{errors.documentsub}</div>
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

export default LawyerDocInputEdit;
