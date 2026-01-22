import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../../Utils/Toast";
import { strategyGetThunk } from "../../../../Redux/Actions/MasterPage/StrategyThunk/StrategyThunk";
import Button from "@mui/material/Button";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";


const InvestmentStrategyContentLayout = ({ eid, id, status }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [newDialog, setNewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [temporaryStorage, setTemporaryStorage] = useState([]);
  const [strategyData, setStrategyData] = useState([]);
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    id: null,
  });
  const validateForm = (formData, setErrors) => {
    const newErrors = {};

    if (!formData.title || formData.title.trim() === "") {
      newErrors.title = "title is required.";
    }

    if (!formData.description || formData.description.trim() === "") {
      newErrors.description = "description is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    dispatch(strategyGetThunk());
  }, []);
  const Getdata = useSelector((state) => state.srategyData.get.data);

  const validationSchema = yup.object({
    strategy: yup.string().required("Strategy is required"),
    remark: yup.string().required("Remark is required"),
  });
  const [postLoading, setPostLoading] = useState(false)
  const handleSubmit = async () => {
    if (!validateForm(formdata, setErrors)) return;
    const payload = {
      title: formdata.title,
      description: formdata.description,
      strategies: temporaryStorage,
      enqid: eid,
    };
    setPostLoading(true)
    try {
      const response = await axios.post(
        `${API_BASE_URL}/contentdpt/addstrategy`,
        payload,
        {}
      );
      Toast({ message: "Successfully Updated", type: "success" });
      setPostLoading(false)
      fetch();
      setNewDialog(false);
      setTemporaryStorage([]);
      setFormdata([]);
      formik.resetForm();
    } catch (error) {
      console.error(error);
      setPostLoading(false)
    }

  };
  const handleEditSubmit = async () => {
    const payload = {
      title: formdata.title,
      description: formdata.description,
      id: formdata.id,
      strategies: temporaryStorage,
      enqid: eid,
    };
    setPostLoading(true)
    try {
      const response = await axios.post(
        `${API_BASE_URL}/contentdpt/addstrategy`,
        payload,
        {}
      );
      Toast({ message: "Successfully Updated", type: "success" });
      setPostLoading(false)
      fetch();
      setEditDialog(false);
      setTemporaryStorage([]);
      setFormdata([]);
      formik.resetForm();
    } catch (error) {
      console.error(error);
      setPostLoading(false)
    }
  };

  const formik = useFormik({
    initialValues: { strategy: "", remark: "" },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setTemporaryStorage([...temporaryStorage, values]);
      resetForm();
    },
  });

  const hideDialog = () => {
    setNewDialog(false);
    setErrors("");
    formik.resetForm();
  };
  const fetch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/allstrategy/${eid}`);
      const data = response.data;
      setStrategyData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const hideEditDialog = () => {
    setEditDialog(false);
  };

  const handleDelete = (indexToDelete) => {
    setTemporaryStorage((prevData) =>
      prevData.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleEdit = (item) => {
    setEditDialog(true);

    setFormdata({
      title: item.title,
      description: item.description,
      id: item.id,
    });

    let parsedStrategy = [];
    try {
      parsedStrategy = JSON.parse(item.strategy_type);
    } catch (error) {
      console.error(
        "Error parsing strategy_type:",
        error,
        "Value:",
        item.strategy_type
      );
    }

    if (parsedStrategy.length > 0) {
      formik.setFieldValue("strategy", parsedStrategy.strategy);
      formik.setFieldValue("remark", parsedStrategy.remark);
      formik.setFieldValue("id", parsedStrategy.id);

      setTemporaryStorage(parsedStrategy);
    } else {
      formik.setFieldValue("strategy", "");
      formik.setFieldValue("remark", "");
    }
  };

  const originalStrategyName = (strategyId) => {
    const strategyObj = Getdata?.find(
      (s) => Number(s.id) === Number(strategyId)
    );
    return strategyObj ? strategyObj.strategy : "-";
  };

  return (
    <>
      <div className="container-fluid p-0 mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header  p-3 d-flex justify-content-between">
                <h6>Investment Strategy</h6>
                {/* {(status === "pending" || status === "complete") &&
                  staffid.Login === "staff" &&
                  strategyData.length === 0 ? (
                  <button
                    onClick={() => setNewDialog(true)}
                    className="btn1 me-2"
                  >
                    + Add
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(strategyData[0])}
                    className="btn1 me-2"
                  >
                    Edit
                  </button>
                )} */}
                {(status === "pending" || status === "complete") &&
                  staffid.Login === "staff" &&
                  enquiryDoumentData?.status !== "booking" && (
                    strategyData.length === 0 ? (
                      <button
                        onClick={() => setNewDialog(true)}
                        className="btn1 me-2"
                      >
                        + Add
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(strategyData[0])}
                        className="btn1 me-2"
                      >
                        Edit
                      </button>
                    )
                  )}
              </div>
              <div className="card-body p-3">
                {strategyData.length > 0 && (
                  <div className="row">
                    <div className="form-group mt-2">
                      <label htmlFor="title" className="form-label">
                        Title:
                      </label>
                      <input
                        id="title"
                        name="title"
                        placeholder="Enter title..."
                        className="form-control mt-1 w-50"
                        value={strategyData[0].title || ""}
                        readOnly
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="description" className="form-label">
                        Description:
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Enter text here..."
                        className="form-control mt-1 w-50"
                        value={strategyData[0].description || ""}
                        readOnly
                      />
                    </div>
                  </div>
                )}

                <table className="table table-bordered mt-3">
                  <thead style={{ backgroundColor: "green", color: "white" }}>
                    <tr>
                      <th
                        style={{
                          backgroundColor: "rgb(47, 79, 79)",
                          color: "white",
                          fontWeight: "300",
                        }}
                      >
                        S.NO
                      </th>
                      <th
                        style={{
                          backgroundColor: "rgb(47, 79, 79)",
                          color: "white",
                          fontWeight: "300",
                        }}
                      >
                        Strategy Button
                      </th>
                      <th
                        style={{
                          backgroundColor: "rgb(47, 79, 79)",
                          color: "white",
                          fontWeight: "300",
                        }}
                      >
                        Remark
                      </th>
                      {/* {staffid.Login === "staff" &&
                      (status === "pending" || status === "complete") ? (
                        <th
                          style={{
                            backgroundColor: "rgb(47, 79, 79)",
                            color: "white",
                            fontWeight: "300",
                          }}
                        >
                          Action
                        </th>
                      ) : null} */}
                    </tr>
                  </thead>
                  <tbody>
                    {strategyData?.length > 0 ? (
                      strategyData.flatMap((item, index) => {
                        let parsedStrategies = [];

                        try {
                          parsedStrategies = JSON.parse(item.strategy_type);
                          if (!Array.isArray(parsedStrategies)) {
                            parsedStrategies = [parsedStrategies];
                          }
                        } catch (error) {
                          console.error(
                            "Error parsing strategy_type:",
                            error,
                            "Value:",
                            item.strategy_type
                          );
                        }

                        return parsedStrategies.map(
                          (strategy, strategyIndex) => (
                            <tr key={`${index}-${strategyIndex}`}>
                              <td>{strategyIndex + 1}</td>
                              <td>{originalStrategyName(strategy.strategy)}</td>
                              <td>{strategy.remark}</td>
                            </tr>
                          )
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*New Dialog */}

      <Dialog
        visible={newDialog}
        style={{ width: "55rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Add Investment Strategy"
        modal
        className="p-fluid"
        onHide={hideDialog}
      >
        <div className="container">
          <form autoComplete="off">
            <div className="row">
              <div className="form-group mt-2">
                <label htmlFor="title" className="form-label">
                  Title:
                </label>
                <input
                  id="title"
                  name="title"
                  placeholder="Enter title..."
                  className="form-control mt-1 w-50"
                  onChange={(e) =>
                    setFormdata({ ...formdata, title: e.target.value })
                  }
                  value={formdata.title}
                />
                {errors.title && (
                  <div className="validation_msg">{errors.title}</div>
                )}
              </div>
              <div className="form-group mt-2">
                <label htmlFor="description" className="form-label">
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter text here..."
                  className="form-control mt-1 w-50"
                  onChange={(e) =>
                    setFormdata({ ...formdata, description: e.target.value })
                  }
                  value={formdata.description}
                />
                {errors.description && (
                  <div className="validation_msg">{errors.description}</div>
                )}
              </div>
            </div>
          </form>

          <hr />

          {temporaryStorage.length > 0 && (
            <table className="table table-bordered mt-3">
              <thead style={{ backgroundColor: "green", color: "white" }}>
                <tr>
                  <th
                    style={{
                      backgroundColor: "rgb(47, 79, 79)",
                      color: "white",
                    }}
                  >
                    S.NO
                  </th>
                  <th
                    style={{
                      backgroundColor: "rgb(47, 79, 79)",
                      color: "white",
                    }}
                  >
                    Strategy Button
                  </th>
                  <th
                    style={{
                      backgroundColor: "rgb(47, 79, 79)",
                      color: "white",
                    }}
                  >
                    Remark
                  </th>
                  <th
                    style={{
                      backgroundColor: "rgb(47, 79, 79)",
                      color: "white",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {temporaryStorage.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.strategy}</td>
                    <td>{item.remark}</td>
                    <td>
                      <AutoDeleteIcon
                        onClick={() => handleDelete(index)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))} */}
                {temporaryStorage.map((item, index) => {
                  const strategyObj = Getdata?.find(
                    (s) => s.id === item.strategy
                  );

                  const strategyName = strategyObj ? strategyObj.strategy : "";


                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{strategyName}</td>
                      <td>{item.remark}</td>
                      <td>
                        <AutoDeleteIcon
                          onClick={() => handleDelete(index)}
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {/* Strategy Selection Form */}
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="form-group mt-2 col-5">
                <label htmlFor="strategy" className="form-label">
                  Strategy Buttons (Multiple Add):
                </label>
                <select
                  name="strategy"
                  id="strategy"
                  className="form-select mt-1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strategy}
                >
                  <option value="">Select Strategy</option>
                  {Getdata?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.strategy}
                    </option>
                  ))}
                </select>
                {formik.errors.strategy && formik.touched.strategy && (
                  <div className="validation_msg">{formik.errors.strategy}</div>
                )}
              </div>

              <div className="form-group mt-2 col-5">
                <label htmlFor="remark" className="form-label">
                  Remark:
                </label>
                <input
                  id="remark"
                  name="remark"
                  placeholder="Enter remarks..."
                  className="form-control mt-1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.remark}
                />
                {formik.errors.remark && formik.touched.remark && (
                  <p className="text-danger small">{formik.errors.remark}</p>
                )}
              </div>

              <div className="mt-5 col-2">
                <button className="btn1" type="submit">
                  Add
                </button>
              </div>
            </div>
          </form>

          {/* Save Button */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button
              variant="contained"
              color="success"
              type="button"
              onClick={handleSubmit}
              disabled={postLoading}
            >
              {postLoading ? "Processing..." : "Save"}
            </Button>
          </div>
        </div>
      </Dialog>

      {/*Delete modal */}

      {/*Edit modal */}

      <Dialog
        visible={editDialog}
        style={{ width: "55rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit Investment Strategy"
        modal
        className="p-fluid"
        onHide={hideEditDialog}
      >
        <div className="container">
          <form autoComplete="off">
            <div className="row">
              <div className="form-group mt-2">
                <label htmlFor="title" className="form-label">
                  Title:
                </label>
                <input
                  id="title"
                  name="title"
                  placeholder="Enter title..."
                  className="form-control mt-1 w-50"
                  onChange={(e) =>
                    setFormdata({ ...formdata, title: e.target.value })
                  }
                  value={formdata.title}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="description" className="form-label">
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter text here..."
                  className="form-control mt-1 w-50"
                  onChange={(e) =>
                    setFormdata({ ...formdata, description: e.target.value })
                  }
                  value={formdata.description}
                />
              </div>
            </div>
          </form>

          <hr />

          {temporaryStorage.length > 0 && (
            <table className="table table-bordered mt-3">
              <thead
                style={{ backgroundColor: "rgb(47, 79, 79)", color: "white" }}
              >
                <tr>
                  <th
                    style={{
                      backgroundColor: "rgb(47, 79, 79)",
                      color: "white",
                    }}
                  >
                    S.NO
                  </th>
                  <th
                    style={{
                      backgroundColor: "rgb(47, 79, 79)",
                      color: "white",
                    }}
                  >
                    Strategy Button
                  </th>
                  <th
                    style={{
                      backgroundColor: "rgb(47, 79, 79)",
                      color: "white",
                    }}
                  >
                    Remark
                  </th>
                  <th
                    style={{
                      backgroundColor: "rgb(47, 79, 79)",
                      color: "white",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {temporaryStorage.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.strategy}</td>
                    <td>{item.remark}</td>
                    <td>
                      <AutoDeleteIcon
                        onClick={() => handleDelete(index)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))} */}
                {temporaryStorage.map((item, index) => {
                  const strategyObj = Getdata?.find(
                    (s) => s.id === item.strategy
                  );
                  const strategyName = strategyObj ? strategyObj.strategy : "";

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{strategyName}</td>
                      <td>{item.remark}</td>
                      <td>
                        <AutoDeleteIcon
                          onClick={() => handleDelete(index)}
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {/* Strategy Selection Form */}
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="form-group mt-2 col-5">
                <label htmlFor="strategy" className="form-label">
                  Strategy Buttons (Multiple Add):
                </label>
                <select
                  name="strategy"
                  id="strategy"
                  className="form-select mt-1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.strategy}
                >
                  <option value="">Select Strategy</option>
                  {Getdata?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.strategy}
                    </option>
                  ))}
                </select>
                {formik.errors.strategy && formik.touched.strategy && (
                  <p className="text-danger small">{formik.errors.strategy}</p>
                )}
              </div>

              <div className="form-group mt-2 col-5">
                <label htmlFor="remark" className="form-label">
                  Remark:
                </label>
                <input
                  id="remark"
                  name="remark"
                  placeholder="Enter remarks..."
                  className="form-control mt-1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.remark}
                />
                {formik.errors.remark && formik.touched.remark && (
                  <p className="text-danger small">{formik.errors.remark}</p>
                )}
              </div>

              <div className="mt-5 col-2">
                <button className="btn1" type="submit">
                  Add
                </button>
              </div>
            </div>
          </form>

          {/* Save Button */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button
              variant="contained"
              color="success"
              type="button"
              onClick={handleEditSubmit}
              disabled={postLoading}
            >
              {postLoading ? "Processing..." : "Save"}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default InvestmentStrategyContentLayout;
