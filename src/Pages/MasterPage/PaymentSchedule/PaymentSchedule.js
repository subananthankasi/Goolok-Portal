import { useFormik } from "formik";
import React, { useEffect, useState, useRef } from "react";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import customStyle from "../../../Utils/tableStyle";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  paymentScheduleDeleteThunk,
  paymentSchedulePostThunk,
  paymentScheduleUpdateThunk,
  paymentSchedulGetThunk,
} from "../../../Redux/Actions/MasterPage/PaymentScheduleThunk";
// import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { SearchData } from "../../../Utils/Search";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import Common from "../../../common/Common";
import Toast from "../../../Utils/Toast";

const PaymentSchedule = () => {
  const dispatch = useDispatch();
  // const toast = useRef(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [editing, setEditing] = useState(false);
  const [filterText, setFilterText] = useState("");
  const { cleanText } = Common();

  const searchColumns = ["sno", "stages", "status"];
  const getLoading = useSelector((state) => state.paymentSchedule.get?.loading);
  const postLoading = useSelector(
    (state) => state.paymentSchedule.post?.loading
  );
  const deleteLoading = useSelector(
    (state) => state.paymentSchedule.delete?.loading
  );
  const updateLoading = useSelector(
    (state) => state.paymentSchedule.update?.loading
  );

  const onSubmit = async (values) => {
    const newData = {
      ...values,
      stages: cleanText(values.stages),
    };

    if (editing) {
      const response = await dispatch(paymentScheduleUpdateThunk(newData));

      if (paymentScheduleUpdateThunk.fulfilled.match(response)) {
        // toast.current.show({
        //   severity: "success",
        //   summary: "Updated",
        //   detail: "Successfully Updated",
        //   life: 3000,
        // });
        Toast({ message: "Successfully Submited", type: "success" });

        setEditDialog(false);
        formik.resetForm();
        dispatch(paymentSchedulGetThunk());
      }

      if (paymentScheduleUpdateThunk.rejected.match(response)) {
        formik.setFieldError("stages", response.payload?.messages?.stages);
      }
    } else {
      //  =  ===== NEW Data ADD = ================
      const response = await dispatch(paymentSchedulePostThunk(newData));

      if (paymentSchedulePostThunk.fulfilled.match(response)) {
        // toast.current.show({
        //   severity: "success",
        //   summary: "Created",
        //   detail: "Successfully Created",
        //   life: 3000,
        // });
        Toast({ message: "Successfully Created", type: "success" });
        formik.resetForm();
        dispatch(paymentSchedulGetThunk());
      }

      if (paymentSchedulePostThunk.rejected.match(response)) {
        formik.setFieldError("stages", response.payload?.messages?.stages);
      }
    }
  };

  useEffect(() => {
    dispatch(paymentSchedulGetThunk());
  }, []);

  const data = useSelector((state) => state.paymentSchedule.get?.data);

  const filterdata = SearchData(data, filterText, searchColumns);

  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const handleDelete = (row) => {
    setDeleteDialog(true);
    setDeleteId(row.id);
  };
  const deletePricing = () => {
    dispatch(paymentScheduleDeleteThunk(deleteId)).then(() => {
      dispatch(paymentSchedulGetThunk());
    });
    setDeleteDialog(false);
    // toast.current.show({
    //   severity: "success",
    //   summary: "Deleted",
    //   detail: "Successfully Deleted",
    //   life: 3000,
    // });
    Toast({ message: "Successfully Deleted", type: "success" });
  };
  const deleteUnitsDialogFooter = (
    <div className=" d-flex gap-1 justify-content-end">
      {/* <Button
        label="No"
        icon="pi pi-times"
        outlined
        style={{ borderRadius: "7px" }}
        onClick={() => setDeleteDialog(false)}
      />
      <Button
        loading={deleteLoading}
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        style={{ borderRadius: "7px" }}
        onClick={deletePricing}
      /> */}
      <button type="button" className="btn1" onClick={() => setDeleteDialog(false)} disabled={updateLoading}>
        No
      </button>
      <button type="button" className="btn1" onClick={deletePricing} >
        Yes
      </button>
    </div>
  );
  const hideDeleteProductsDialog = () => {
    setDeleteDialog(false);
  };

  const handleEdit = (row) => {
    setEditDialog(true);
    formik.setFieldValue("stages", row.stages);
    formik.setFieldValue("status", row.status);
    formik.setFieldValue("id", row.id);
  };
  const editCancel = () => {
    setEditDialog(false);
  };
  const editHide = () => {
    setEditDialog(false);
    formik.resetForm();
  };
  const formik = useFormik({
    initialValues: {
      stages: "",
      status: "enable",
    },
    validationSchema: yup.object().shape({
      stages: yup.string().required("required!!"),
      status: yup.string().required("required!!"),
    }),
    onSubmit,
  });
  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Schedule",
      selector: (row) => row.stages,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <button
            className="btn  btn-outline-info me-1 edit"
            data-tooltip-id="edit"
            onClick={() => handleEdit(row)}
          >
            <EditIcon />
          </button>
          <button
            className="btn btn-outline-danger delete"
            data-tooltip-id="delete"
            onClick={() => handleDelete(row)}
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* <Toast ref={toast} /> */}
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="page_heading">Add Payment Schedule </h4>
                </div>
                <div className="card-body">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                      <div className="col-md-12 mb-3 ">
                        <label htmlFor="lastName" className="form-label">
                          Schedule
                        </label>
                        <input
                          name="stages"
                          className="form-control"
                          placeholder="Enter schedule"
                          value={formik.values.stages}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.stages && formik.touched.stages ? (
                          <p style={{ color: "red", fontSize: "14px" }}>
                            {formik.errors.stages}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="mb-3 col-md-12">
                      <label className="form-label" htmlFor="inputState">
                        Status
                      </label>
                      <select
                        name="status"
                        className="form-select"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="enable">Enable</option>
                        <option value="disable">Disable</option>
                      </select>
                      {formik.errors.status && formik.touched.status ? (
                        <p style={{ color: "red", fontSize: "14px" }}>
                          {formik.errors.status}
                        </p>
                      ) : null}
                    </div>

                    <div className="text-end py-3 px-3">
                      <a
                        href="javascript:void(0);"
                        className="btn1 text-dark me-1"
                        onClick={() => {
                          formik.resetForm();
                        }}
                      >
                        Clear
                      </a>
                      <button
                        type="submit"
                        className="btn1"
                        onClick={() => setEditing(false)}
                      >
                        {postLoading ? "processing..." : "Add"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-sm-6">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex">
                    <h4 className="page_heading">Report</h4>
                    <div style={{ marginLeft: "auto" }}>
                      {/* <ExportButton
                                                columns={columns}
                                                data={LawyerDocument}
                                                filename={"lawyerDocument.csv"}
                                            /> */}
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="col-lg-12  mb-4">
                    <div className="searchbar">
                      <input
                        type="text"
                        className="search"
                        onChange={handleFilter}
                        placeholder="..Search"
                      ></input>
                    </div>
                    <DataTable
                      columns={columns}
                      data={filterdata}
                      customStyles={customStyle}
                      pagination
                      // selectableRows
                      persistTableHead={true}
                      fixedHeader
                      progressPending={getLoading}
                      progressComponent={<CustomLoder />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            Are you sure you want to delete the selected Pricing?
          </span>
        </div>
      </Dialog>
      {/*edit Dialog */}

      <Dialog
        visible={editDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit Payment"
        modal
        className="p-fluid"
        onHide={editHide}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-12 mb-3 ">
              <label htmlFor="lastName" className="form-label">
                Schedule
              </label>
              <input
                name="stages"
                className="form-control"
                placeholder="Enter schedule"
                value={formik.values.stages}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.stages && formik.touched.stages ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {formik.errors.stages}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mb-3 col-md-12">
            <label className="form-label" htmlFor="inputState">
              Status
            </label>
            <select
              name="status"
              className="form-select"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="enable">Enable</option>
              <option value="disable">Disable</option>
            </select>
            {formik.errors.status && formik.touched.status ? (
              <p style={{ color: "red", fontSize: "14px" }}>
                {formik.errors.status}
              </p>
            ) : null}
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            {/* <div>
              <Button
                label="Cancel"
                icon="pi pi-times"
                type="button"
                outlined
                onClick={editCancel}
                style={{ borderRadius: "7px" }}
              />
            </div>
            <div>
              <Button
                disabled={updateLoading}
                loading={updateLoading}
                label="Update"
                icon="pi pi-check"
                type="submit"
                style={{ borderRadius: "7px" }}
                onClick={() => setEditing(true)}
              />
            </div> */}
            <button type="button" className="btn1" onClick={editCancel} disabled={updateLoading}>
              Cancel
            </button>
            <button type="submit" className="btn1" onClick={() => setEditing(true)} disabled={updateLoading}>
              {updateLoading ? "Processing..." : "Update"}
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default PaymentSchedule;
