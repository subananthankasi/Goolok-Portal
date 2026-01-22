import axios from "axios";
import React, { useEffect, useState } from "react";

import Spinner from "react-bootstrap/Spinner";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import FileViewUtils from "../../../../Utils/FileView/FileViewUtils";
import { useSelector } from "react-redux";

export const AddMoreDocLawyerLayout = ({ isOpen, closeModal, id, props }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [pageLoading, setPageLoadingPage] = useState(true);
  const [fetchData, setFetchData] = useState([]);
  const [isfetchInputData, setFetchInputData] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  const existingData = isfetchInputData?.details
    ? JSON.parse(isfetchInputData.details)
    : {};

  const fetch = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/lawyer/${id.lawyer_doc}/edit`
      );
      setFetchData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setPageLoadingPage(false);
    }
  };

  const fetchInputData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/alldetails/${id.id}`);
      setFetchInputData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetch();
      fetchInputData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isfetchInputData) {
      setFormData({
        ...existingData,
      });
    }
  }, [isfetchInputData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    fetchData.forEach((item) => {
      if (
        !formData[item.documentsub] ||
        formData[item.documentsub].trim() === ""
      ) {
        newErrors[item.documentsub] = `${item.documentsub} is required`;
      }
    });
    return newErrors;
  };

  const onSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const updateData = {
      details: formData,
      enqid: id.eid,
      docid: id.id,
      id: isfetchInputData.id ? isfetchInputData?.id : null,
    };
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/detailsadd`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Toast({ message: "Successfully added", type: "success" });
    } catch (error) {
      Toast({ message: "Error to add! Try again", type: "error" });
    } finally {
      setLoading(false);
      closeModal();
      setFetchData([]);
      setFetchInputData([]);
      setPageLoadingPage(true);
    }
  };

  return (
    <>
      <div
        className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-fullscreen" role="document">
          <div className="modal-content">
            <div className="d-flex" style={{ alignItems: "center" }}>
              <button
                type="button"
                className="close closebutton"
                onClick={() => {
                  closeModal();
                  setFetchData([]);
                  setPageLoadingPage(true);
                  setErrors({});
                  setFetchInputData([]);
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="card-body">
              <div className="row p-2">
                <div className="col-6">
                  <FileViewUtils
                    fileUrls={`${IMG_PATH}/enquiry/${id.document}`}
                  />
                </div>
                <div className="col-6">
                  <div>
                    <h4 className="page_subheading m-3">Details</h4>
                    <hr className="m-0 mb-4" />

                    {pageLoading ? (
                      <div
                        style={{
                          height: "32vh",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Spinner className="mt-auto" />
                      </div>
                    ) : (
                      <>
                        {(props.status === "pending" ||
                          props.status === "complete") &&
                          staffid.Login === "staff" ? (
                          <div className="row">
                            {fetchData?.map((item, index) => (
                              <div className="col-md-6 mb-3" key={index}>
                                <div className="row">
                                  <div className="col-4 mb-3">
                                    <label
                                      htmlFor={item.documentsub}
                                      className="form-label"
                                    >
                                      {item.documentsub}
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3">
                                    <input
                                      type="text"
                                      className={`form-control  ${errors[item.documentsub]
                                          ? "is-invalid"
                                          : ""
                                        }`}
                                      autoComplete="off"
                                      name={item.documentsub}
                                      value={formData[item.documentsub] || ""}
                                      onChange={handleChange}
                                    />
                                    {errors[item.documentsub] && (
                                      <div className="invalid-feedback">
                                        {errors[item.documentsub]}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                            {staffid.Login == "staff" &&
                              (props.status == "pending" ||
                                props.status == "complete") &&
                              props.pagetype !== "reminder" && enquiryDoumentData?.status !== "booking" && (
                                <div className="text-end">
                                  <button
                                    className="btn1 me-1"
                                    type="button"
                                    onClick={() => {
                                      setFormData([]);
                                      setErrors({});
                                    }}
                                  >
                                    Clear
                                  </button>
                                  <button
                                    className="btn1"
                                    onClick={onSubmit}
                                    disabled={loading}
                                  >
                                    {loading ? (
                                      <>
                                        <Spinner animation="border" size="sm" />
                                        <span className="ms-2">wait...</span>
                                      </>
                                    ) : (
                                      "Save"
                                    )}
                                  </button>
                                </div>
                              )}
                          </div>
                        ) : (
                          <div className="row">
                            {fetchData?.map((item, index) => (
                              <div className="col-md-6 mb-3" key={index}>
                                <div className="row">
                                  <div className="col-4 mb-3">
                                    <label
                                      htmlFor={item.documentsub}
                                      className="form-label"
                                    >
                                      {item.documentsub} :
                                    </label>
                                  </div>
                                  <div className="col-8 mb-3">
                                    <label className="form-label">
                                      {formData[item.documentsub] || ""}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
