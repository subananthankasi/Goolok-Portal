import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import customStyle from "../../../../Utils/tableStyle";
import DataTable from "react-data-table-component";
import Button from "@mui/material/Button";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { paymentSchedulGetThunk } from "../../../../Redux/Actions/MasterPage/PaymentScheduleThunk";
import {
  paymentScheduleEnqDeleteThunk,
  paymentSchedulEnqGetThunk,
} from "../../../../Redux/Actions/Enquiry/PaymentScheduleEnqThunk";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import Spinner from "react-bootstrap/Spinner";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Toast from "../../../../Utils/Toast";

const PaymentScheduleDaysLayout = ({ eid, status, pagetype }) => {
  const dispatch = useDispatch();
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [newDialog, setNewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [editing, setEditing] = useState(false);
  const [stageOption, setStageOption] = useState([]);
  const [installmentView, setInstallmentView] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(paymentSchedulGetThunk());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    dispatch(paymentSchedulEnqGetThunk(eid));
  }, []);

  const getValues = useSelector(
    (state) => state.paymentScheduleEnqData.get?.data
  );

  const option = useSelector((state) => state.paymentSchedule.get?.data);

  useEffect(() => {
    if (option.length > 0) {
      setStageOption(option);
    }
  }, [option]);

  // const onSubmit = (values) => {
  //   const payload = {
  //     ...values,
  //     details: installmentData,
  //   };
  //   if (editing) {
  //     dispatch(paymentScheduleEnqUpdateThunk(payload)).then(() => {
  //       dispatch(paymentSchedulEnqGetThunk(eid));
  //     });
  //     setEditDialog(false);
  //     formik.resetForm();
  //   } else {
  //     dispatch(paymentScheduleEnqPostThunk(payload)).then(() => {
  //       dispatch(paymentSchedulEnqGetThunk(eid));
  //     });
  //     setNewDialog(false);
  //     formik.resetForm();
  //   }
  // };
  const onSubmit = async (values) => {
    const payload = {
      ...values,
      details: installmentData,
    };
    if (editing) {
      try {
        const response = await axios.post(`${API_BASE_URL}/addstages`, payload);
      } catch (error) { }
    } else {
      try {
        const response = await axios.post(`${API_BASE_URL}/addstages`, payload);
        setNewDialog(false);
        formik.resetForm();
        dispatch(paymentSchedulEnqGetThunk(eid));
        Toast({ message: "Successfully created", type: "success" });
      } catch (error) {
        const message = error?.response?.data?.messages?.error;
        Toast({
          message: message ? message : "creation failed",
          type: "error",
        });
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      stage: "",
      days: "",
      remark: "",
      enqid: eid,
    },
    validationSchema: yup.object().shape({
      stage: yup.string().required("Stage is required!!"),
      days: yup.string().when("stage", {
        is: "Full payment",
        then: (schema) => schema.required("Days is required!!"),
        otherwise: (schema) => schema.notRequired(),
      }),
      remark: yup.string().when("stage", {
        is: "Full payment",
        then: (schema) => schema.required("Remark is required!!"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    onSubmit,
  });

  const hideDeleteProductsDialog = () => {
    setDeleteDialog(false);
  };

  const handleDelete = (row) => {
    setDeleteDialog(true);
    setDeleteId(row.id);
  };
  const DeleteRow = () => {
    dispatch(paymentScheduleEnqDeleteThunk(deleteId)).then(() => {
      dispatch(paymentSchedulEnqGetThunk(eid));
    });
    setDeleteDialog(false);
  };

  const deleteUnitsDialogFooter = (
    <div className=" d-flex gap-3 justify-content-end">
      <Button variant="outlined" onClick={() => setDeleteDialog(false)}>
        {" "}
        No{" "}
      </Button>
      <Button variant="contained" onClick={DeleteRow}>
        {" "}
        Yes{" "}
      </Button>
    </div>
  );
  const hideDialog = () => {
    setNewDialog(false);
    formik.resetForm();
    formik1.resetForm();
    setInstallmentView(false);
    setViewData(false);
    setButtonShow(false);
  };
  const editHide = () => {
    setEditDialog(false);
    formik.resetForm();
  };
  const editCancel = () => {
    setEditDialog(false);
    formik.resetForm();
  };
  const cancelDialog = () => {
    setNewDialog(false);
    formik.resetForm();
    formik1.resetForm();
    setInstallmentView(false);
    setViewData(false);
    setButtonShow(false);
  };
  const handleEdit = (row) => {
    setEditDialog(true);
    formik.setFieldValue("stage", row.stages);
    formik.setFieldValue("days", row.days);
    formik.setFieldValue("percentage", row.percentage);
    formik.setFieldValue("id", row.id);
  };
  const [editId, setEditId] = useState(null);
  const handleDialogEdit = (item) => {
    setEditId(item.id);
    formik1.setValues({
      installment: item.installment,
      percentage_of_amount: item.percentage_of_amount,
      days: item.days,
    });
  };
  const [rowId, setRowId] = useState(null);
  const [installmentData, setInstallmentData] = useState([]);
  const [viewData, setViewData] = useState(false);

  const createDefaultInstallments = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      installment: `${i + 1}${["st", "nd", "rd"][i] || "th"} Installment`,
      percentage_of_amount: "",
      days: "",
    }));
  };

  const [rowData, setRowData] = useState([]);
  const [buttonShow, setButtonShow] = useState(false);
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );
  const column1 = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
      width: "150px",
    },
    {
      name: "Payement schedule",
      selector: (row) => row.stages,
      sortable: true,
    },
    {
      name: "Payment details",
      sortable: true,
      cell: (row, index) => (
        <>
          {row.payment_details ? (
            row.payment_details
          ) : (
            <div className="d-flex gap-2">
              {staffid.Login === "staff" &&
                pagetype !== "reminder" &&
                (status === "complete" || status === "pending") &&
                enquiryDoumentData?.status !== "booking" ? (
                <>
                  <button
                    className="btn1 btn-sm"
                    onClick={() => {
                      setInstallmentView(true);
                      setRowId(row.id);
                      fetchData(row.id);
                      setRowData(row);
                      setButtonShow(false);
                      if (row.stages === "3 Installment") {
                        setInstallmentData(createDefaultInstallments(3));
                      }
                      if (row.stages === "5 Installment") {
                        setInstallmentData(createDefaultInstallments(5));
                      }
                    }}
                  >
                    <AddIcon />
                  </button>
                  {row.installment_details && (
                    <button
                      className="btn1 btn-sm"
                      onClick={() => {
                        setViewData(true);
                        setInstallmentView(true);
                        setRowId(row.id);
                        fetchData(row.id);
                      }}
                    >
                      <VisibilityIcon />
                    </button>
                  )}
                </>
              ) : row.installment_details ? (
                <button
                  className="btn1 btn-sm"
                  onClick={() => {
                    setViewData(true);
                    setInstallmentView(true);
                    setRowId(row.id);
                    fetchData(row.id);
                  }}
                >
                  <VisibilityIcon />
                </button>
              ) : (
                "-"
              )}
            </div>
          )}
        </>
      ),
    },

    ...(staffid.logintype == "staff" &&
      (status === "complete" || status === "pending") &&
      pagetype !== "reminder" && enquiryDoumentData?.status !== "booking"
      ? [
        {
          name: "Edit",
          cell: (row) => (
            <>
              <div className="d-flex">
                {/* <button
                    className="btn btn-outline-info me-1 edit"
                    data-tooltip-id="edit"
                    onClick={() => handleEdit(row)}
                  >
                    <EditIcon />
                  </button> */}
                <button
                  className="btn btn-outline-danger delete"
                  data-tooltip-id="delete"
                  onClick={() => handleDelete(row)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </>
          ),
          sortable: true,
        },
      ]
      : []),
  ];
  useEffect(() => {
    if (formik.values.stage === "3 Installment") {
      setInstallmentData(createDefaultInstallments(3));
    } else if (formik.values.stage === "5 Installment") {
      setInstallmentData(createDefaultInstallments(5));
    }
  }, [formik.values.stage]);

  const handleInstallmentSubmit = (values) => {
    const valueNum = parseFloat(values.percentage_of_amount || 0);

    if (editId) {
      const oldValue = parseFloat(
        installmentData.find((item) => item.id === editId)
          ?.percentage_of_amount || 0
      );

      const adjustedTotal =
        installmentData.reduce(
          (sum, item) => sum + parseFloat(item.percentage_of_amount || 0),
          0
        ) -
        oldValue +
        valueNum;

      if (adjustedTotal > 100) {
        formik1.setFieldError(
          "percentage_of_amount",
          "The total percentage cannot exceed 100%"
        );
        return;
      }

      setInstallmentData((prev) =>
        prev.map((item) =>
          item.id === editId
            ? {
              ...item,
              installment: values.installment.trim(),
              percentage_of_amount: values.percentage_of_amount,
              days: values.days,
            }
            : item
        )
      );
      setEditId(null);
      setButtonShow(false);
    } else {
      const totalPercentage = installmentData.reduce(
        (sum, item) => sum + parseFloat(item.percentage_of_amount || 0),
        0
      );

      if (totalPercentage + valueNum > 100) {
        formik1.setFieldError(
          "percentage_of_amount",
          "The total percentage cannot exceed 100%"
        );
        return;
      }

      const newEntry = {
        id: Date.now(),
        installment: values.installment.trim(),
        percentage_of_amount: values.percentage_of_amount.trim(),
        days: values.days,
      };
      setInstallmentData((prev) =>
        Array.isArray(prev) ? [...prev, newEntry] : [newEntry]
      );
    }

    formik1.resetForm();
  };

  const handleRemove = (id) => {
    setInstallmentData((prev) => prev.filter((item) => item.id !== id));
  };
  const formik1 = useFormik({
    initialValues: {
      installment: "",
      percentage_of_amount: "",
      days: "",
    },
    validationSchema: yup.object().shape({
      installment: yup.string().required("installment is required!!"),
      percentage_of_amount: yup
        .string()
        .required("percentage of amount is required!!"),
      days: yup
        .number()
        .typeError("Days must be a number")
        .required("Days is required!!")
        .positive("Days must be positive")
        .integer("Days must be an integer")
        .max(365, "Days cannot be more than 365"),
    }),
    onSubmit: handleInstallmentSubmit,
  });

  const [loading, setLoading] = useState(false);
  const fetchData = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/allinstallment/${id}`);
      let installments = [];
      if (response.data[0].installment_details) {
        try {
          let parsed = JSON.parse(response.data[0].installment_details);
          if (typeof parsed === "string") {
            parsed = JSON.parse(parsed);
          }

          installments = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          console.error("Error parsing installment_details:", e);
        }
      }
      if (installments.length > 0) {
        setInstallmentData(installments);
      }
      // setInstallmentData(installments);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rowId) {
      fetchData(rowId);
    }
  }, [rowId]);
const [postLoading,setPostLoading] = useState(false)
  const handleInstallmentFinalSubmit = async () => {
    const totalPercentage = installmentData.reduce(
      (sum, item) => sum + (parseFloat(item.percentage_of_amount) || 0),
      0
    );

    if (totalPercentage < 100) {
      alert("Total percentage must equal 100% before submitting.");
      return;
    }

    if (totalPercentage > 100) {
      alert("Total percentage cannot exceed 100%.");
      return;
    }
    const payload = {
      details: installmentData,
      id: rowId,
    };
    setPostLoading(true)
    try {
      const response = await axios.post(
        `${API_BASE_URL}/addinstallment`,
        payload
      );
      fetchData(rowId);
      dispatch(paymentSchedulEnqGetThunk(eid));
      setInstallmentView(false);
      setPostLoading(false)
    } catch (error) { 
      setPostLoading(false)
    }
  };

  const isSubmitDisabled =
    loading || postLoading ||
    installmentData.length === 0 ||
    installmentData.some((item) => !item.percentage_of_amount || !item.days);

  const isAddSubmitDisabled =
    !formik.values.stage ||
    (formik.values.stage === "Full payment" &&
      (!formik.values.days || !formik.values.remark)) ||
    ((formik.values.stage === "3 Installment" ||
      formik.values.stage === "5 Installment") &&
      (installmentData.length === 0 ||
        installmentData.some(
          (item) =>
            !item.percentage_of_amount ||
            String(item.percentage_of_amount).trim() === "" ||
            !item.days ||
            String(item.days).trim() === ""
        )));

  return (
    <>
      <div className="card shadow border-0 mb-4 mt-3">
        <div className="card shadow border-0 p-4">
          <div className="mt-2">
            <div className="d-flex justify-content-between mb-3">
              <h6>Payment Schedule</h6>
              {staffid.logintype == "staff" &&
                (status === "complete" || status === "pending") &&
                pagetype !== "reminder" && enquiryDoumentData?.status !== "booking" && (
                  <div className="ms-2">
                    <button
                      href="#"
                      onClick={() => setNewDialog(true)}
                      className="btn1 me-2"
                    >
                      + Add
                    </button>
                  </div>
                )}
            </div>
            <hr />
            <DataTable
              persistTableHead={true}
              columns={column1}
              data={getValues}
              customStyles={customStyle}
              pagination
              // selectableRows
              fixedHeader
            />
          </div>
        </div>
      </div>
      {/*..New Dialog */}
      <Dialog
        visible={newDialog}
        style={{
          width:
            formik.values.stage === "3 Installment" ||
              formik.values.stage === "5 Installment"
              ? "62rem"
              : "32rem",
        }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Add Payment"
        modal
        className="p-fluid"
        onHide={hideDialog}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className=" flex justify-content-center mt-2">
            <label htmlFor="unit" className="form-label">
              Schedule <span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="stage"
              id="stage"
              className="form-select"
              value={formik.values.stage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select Schedule</option>
              <option value="Full payment">Full payment</option>
              {/* <option value="Bank loan">Bank loan </option> */}
              <option value="3 Installment">3 Installment </option>
              <option value="5 Installment">5 Installment</option>
            </select>
          </div>
          {formik.errors.stage && formik.touched.stage ? (
            <p style={{ color: "red", fontSize: "12px" }}>
              {formik.errors.stage}
            </p>
          ) : null}
          {formik.values.stage === "Full payment" && (
            <>
              <div className="field mt-2">
                <label htmlFor="unit" className="form-label">
                  Days <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  id="days"
                  type="number"
                  name="days"
                  className="form-control"
                  value={formik.values.days}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Days"
                />

                {formik.errors.days && formik.touched.days ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.days}
                  </p>
                ) : null}
              </div>
              <div className="field mt-2">
                <label htmlFor="unit" className="font-bold form-label">
                  Remark <span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  id="remark"
                  name="remark"
                  className="form-control"
                  value={formik.values.remark}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="text here...! "
                />

                {formik.errors.remark && formik.touched.remark ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.remark}
                  </p>
                ) : null}
              </div>{" "}
            </>
          )}
          {(formik.values.stage === "3 Installment" ||
            formik.values.stage === "5 Installment") && (
              <section className="mt-3 mb-5 w-100">
                <table className="table  table-bordered items--table">
                  <thead style={{ backgroundColor: "green" }}>
                    <tr style={{ backgroundColor: "green" }}>
                      <th className="text-center">S.no</th>
                      <th className="text-center">Installment</th>
                      <th className="text-center">Percentage</th>
                      <th className="text-center">days</th>
                      {!viewData && <th className="text-center">Action</th>}
                    </tr>
                  </thead>
                  <tbody className="border">
                    {loading ? (
                      <tr className="text-center">
                        <td colSpan="5" className="text-center">
                          <Spinner className="" />
                        </td>
                      </tr>
                    ) : installmentData.length > 0 ? (
                      installmentData.map((item, index) => (
                        <tr key={item.id}>
                          <td className="text-center">{index + 1} </td>
                          <td className="text-center">{item.installment} </td>
                          <td className="text-center">
                            {item.percentage_of_amount
                              ? `${item.percentage_of_amount} %`
                              : "-"}
                          </td>
                          <td className="text-center">
                            {item.days ? `${item.days} days` : "-"}
                          </td>
                          {!viewData && (
                            <td className="text-center">
                              <IconButton
                                aria-label="edit"
                                size="small"
                                color="primary"
                                onClick={() => {
                                  handleDialogEdit(item);
                                  setButtonShow(true);
                                }}
                              >
                                {" "}
                                <EditIcon fontSize="inherit" />{" "}
                              </IconButton>
                            </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr className="text-center">
                        <td colSpan="5"> No data</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div
                  className="container mt-4 p-3 border rounded shadow-sm"
                  style={{ background: "#e6e7e7ff" }}
                >
                  <form onSubmit={formik1.handleSubmit} autoComplete="off">
                    <div className="row mb-3 align-items-center">
                      <div className="form-group col-md-6">
                        <label className=" fw-bold form-label">
                          Installment :{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter amount"
                          name="installment"
                          value={formik1.values.installment || " "}
                          onChange={formik1.handleChange}
                          onBlur={formik1.handleBlur}
                          disabled
                        />
                        {formik1.errors.installment &&
                          formik1.touched.installment ? (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            {formik1.errors.installment}
                          </p>
                        ) : null}
                      </div>
                      <div className="form-group col-md-6">
                        <label className=" fw-bold form-label">
                          Percentage of amount :
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="percentage_of_amount"
                          value={formik1.values.percentage_of_amount || " "}
                          onChange={formik1.handleChange}
                          onBlur={formik1.handleBlur}
                        />
                        {formik1.errors.percentage_of_amount &&
                          formik1.touched.percentage_of_amount ? (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            {formik1.errors.percentage_of_amount}
                          </p>
                        ) : null}
                      </div>
                      <div className="form-group col-md-6">
                        <label className="col-md-3 fw-bold form-label">
                          Days :
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="days"
                          value={formik1.values.days || " "}
                          onChange={formik1.handleChange}
                          onBlur={formik1.handleBlur}
                        />
                        {formik1.errors.days && formik1.touched.days ? (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            {formik1.errors.days}
                          </p>
                        ) : null}
                      </div>

                      {buttonShow && (
                        <div
                          className="form-group col-md-6 mt-auto"
                          style={{
                            alignContent: "center",
                            textAlign: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            type="button"
                            onClick={formik1.handleSubmit}
                          >
                            Add
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Button */}
                  </form>
                </div>
              </section>
            )}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <div>
              <Button variant="outlined" onClick={cancelDialog}>
                {" "}
                Cancel{" "}
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                type="submit"
                onClick={() => setEditing(false)}
                disabled={isAddSubmitDisabled}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </Dialog>
      {/*..Delete Dialog */}
      <Dialog
        visible={deleteDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteUnitsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i class="fa-solid fa-circle-exclamation"></i>
          <span style={{ marginLeft: "10px" }}>
            Are you sure you want to delete the selected Payment Schedule?
          </span>
        </div>
      </Dialog>
      {/*Edit dialog */}
      <Dialog
        visible={editDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit Payment"
        modal
        className="p-fluid"
        onHide={editHide}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className=" flex justify-content-center mt-2">
            <label htmlFor="unit" className="form-label">
              Schedule <span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="stage"
              id="stage"
              className="form-select"
              value={formik.values.stage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option>Select Schedule</option>
              {option?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.stages}{" "}
                </option>
              ))}
            </select>
          </div>
          {formik.errors.stage && formik.touched.stage ? (
            <p style={{ color: "red", fontSize: "12px" }}>
              {formik.errors.stage}
            </p>
          ) : null}

          <div className="field mt-2">
            <label htmlFor="unit" className="form-label">
              Days <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="days"
              name="days"
              className="form-control"
              value={formik.values.days}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Days"
            />

            {formik.errors.days && formik.touched.days ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.days}
              </p>
            ) : null}
          </div>
          {/* <div className="field mt-2">
                        <label htmlFor="unit" className="form-label">
                            Charge <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            id="percentage"
                            name="percentage"
                            className="form-control"
                            value={formik.values.percentage}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter percentage"
                           
                        />

                        {formik.errors.percentage && formik.touched.percentage ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.percentage}</p>
                        ) : null}

                    </div> */}

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="outlined" onClick={editCancel}>
              {" "}
              Cancel{" "}
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => setEditing(true)}
            >
              {" "}
              Update{" "}
            </Button>
          </div>
        </form>
      </Dialog>

      <Dialog
        visible={installmentView}
        style={{ width: "62rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={viewData ? "Installment details" : "Add installment"}
        modal
        onHide={() => {
          formik1.resetForm();
          setInstallmentView(false);
          setViewData(false);
          setButtonShow(false);
          setInstallmentData([]);
        }}
      >
        <div className=" container w-100">
          <section className="  mb-5 w-100">
            <table className="table  table-bordered items--table">
              <thead style={{ backgroundColor: "green" }}>
                <tr style={{ backgroundColor: "green" }}>
                  <th className="text-center">S.no</th>
                  <th className="text-center">Installment</th>
                  <th className="text-center">Percentage</th>
                  <th className="text-center">days</th>
                  {!viewData && <th className="text-center">Action</th>}
                </tr>
              </thead>
              <tbody className="border">
                {loading ? (
                  <tr className="text-center">
                    <td colSpan="5" className="text-center">
                      <Spinner className="" />
                    </td>
                  </tr>
                ) : installmentData.length > 0 ? (
                  installmentData.map((item, index) => (
                    <tr key={item.id}>
                      <td className="text-center">{index + 1} </td>
                      <td className="text-center">{item.installment} </td>
                      <td className="text-center">
                        {item.percentage_of_amount
                          ? `${item.percentage_of_amount} %`
                          : "-"}
                      </td>
                      <td className="text-center">
                        {item.days ? `${item.days} days` : "-"}
                      </td>
                      {!viewData && (
                        <td className="text-center">
                          <IconButton
                            aria-label="edit"
                            size="small"
                            color="primary"
                            onClick={() => {
                              handleDialogEdit(item);
                              setButtonShow(true);
                            }}
                          >
                            {" "}
                            <EditIcon fontSize="inherit" />{" "}
                          </IconButton>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr className="text-center">
                    <td colSpan="5"> No data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
          {!viewData && (
            <>
              <div
                className="container mt-4 p-3 border rounded shadow-sm"
                style={{ background: "#e6e7e7ff" }}
              >
                <form onSubmit={formik1.handleSubmit} autoComplete="off">
                  <div className="row mb-3 align-items-center">
                    <div className="form-group col-md-3">
                      <label className=" fw-bold form-label">
                        Installment :{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter amount"
                        name="installment"
                        value={formik1.values.installment || " "}
                        onChange={formik1.handleChange}
                        onBlur={formik1.handleBlur}
                        disabled
                      />
                      {formik1.errors.installment &&
                        formik1.touched.installment ? (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {formik1.errors.installment}
                        </p>
                      ) : null}
                    </div>
                    <div className="form-group col-md-3">
                      <label className=" fw-bold form-label">
                        Percentage of amount :
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="percentage_of_amount"
                        value={formik1.values.percentage_of_amount || " "}
                        onChange={formik1.handleChange}
                        onBlur={formik1.handleBlur}
                      />
                      {formik1.errors.percentage_of_amount &&
                        formik1.touched.percentage_of_amount ? (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {formik1.errors.percentage_of_amount}
                        </p>
                      ) : null}
                    </div>
                    <div className="form-group col-md-3">
                      <label className="col-md-3 fw-bold form-label">
                        Days :
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="days"
                        value={formik1.values.days || " "}
                        onChange={formik1.handleChange}
                        onBlur={formik1.handleBlur}
                      />
                      {formik1.errors.days && formik1.touched.days ? (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {formik1.errors.days}
                        </p>
                      ) : null}
                    </div>

                    {buttonShow && (
                      <div
                        className="form-group col-md-3 mt-auto"
                        style={{
                          alignContent: "center",
                          textAlign: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          type="submit"
                        >
                          Add
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Button */}
                </form>
              </div>

              <div className="d-flex justify-content-end gap-3 mt-3">
                <Button
                  variant="contained"
                  size="small"
                  type="button"
                  // disabled={installmentData?.length === 0 || loading}
                  disabled={isSubmitDisabled}
                  onClick={() => handleInstallmentFinalSubmit()}
                >
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => {
                    formik1.resetForm();
                    setInstallmentView(false);
                    setButtonShow(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default PaymentScheduleDaysLayout;
