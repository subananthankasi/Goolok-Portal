import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import customStyle from "../../../Utils/tableStyle";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import {
  eFeatureDeleteThunk,
  eFeatureGetThunk,
  eFeaturePostThunk,
  eFeatureUpdateThunk,
} from "../../../Redux/Actions/MasterPage/FeaturesThunk/ExteriorFeatureThunk";
import { SearchData } from "../../../Utils/Search";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import Common from "../../../common/Common";

const ExteriorFeatures = () => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState();
  const [filterText, setFilterText] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const { cleanText } = Common();
  const data = useSelector((state) => state.exteriorFeatureData?.get?.data);
  const isLoading = useSelector(
    (state) => state.exteriorFeatureData?.get?.loading
  );
  const postLoading = useSelector(
    (state) => state.exteriorFeatureData?.post?.loading
  );
  const updateLoading = useSelector(
    (state) => state.exteriorFeatureData?.update?.loading
  );
  const deleteLoading = useSelector(
    (state) => state.exteriorFeatureData?.delete?.loading
  );

  const openDelete = (row) => {
    setDeleteDialog(true);
    setDeleteId(row.id);
  };
  useEffect(() => {
    dispatch(eFeatureGetThunk());
  }, []);
  const handleDelete = () => {
    dispatch(eFeatureDeleteThunk(deleteId)).then(() => {
      dispatch(eFeatureGetThunk());
    });
    setDeleteDialog(false);
  };
  const hideDeleteProductsDialog = () => {
    setDeleteDialog(false);
  };
  const deleteUnitsDialogFooter = (
    <div className="d-flex justify-content-end gap-2 mt-4">
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => setDeleteDialog(false)}
      >
        Cancel
      </button>
      <button type="button" className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
  const hideDialog = () => {
    setEditDialog(false);
    formik.resetForm();
  };
  const cancelDialog = () => {
    setEditDialog(false);
    formik.resetForm();
  };
  const handleEdit = (row) => {
    setEditDialog(true);
    formik.setFieldValue("exfeature", row.feature_exname);
    formik.setFieldValue("status", row.status);
    formik.setFieldValue("id", row.id);
  };
  const onSubmit = async (values) => {
    const newData = {
      ...values,
      exfeature: cleanText(values.exfeature),
    };
    if (editing) {
      const res = await dispatch(eFeatureUpdateThunk(newData));

      if (eFeatureUpdateThunk.fulfilled.match(res)) {
        formik.resetForm();
        setEditDialog(false);
        dispatch(eFeatureGetThunk());
      }

      if (eFeatureUpdateThunk.rejected.match(res)) {
        formik.setFieldError("exfeature", res?.payload?.messages?.exfeature);
      }
    } else {
      const res = await dispatch(eFeaturePostThunk(newData));
      if (eFeaturePostThunk.fulfilled.match(res)) {
        formik.resetForm();
        dispatch(eFeatureGetThunk());
      }

      if (eFeaturePostThunk.rejected.match(res)) {
        formik.setFieldError("exfeature", res?.payload?.messages?.exfeature);
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      exfeature: "",
      status: "enable",
    },
    validationSchema: yup.object().shape({
      exfeature: yup.string().required("exteriorFeature required !!"),
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
      name: "Exterior Feature ",
      selector: (row) => row.feature_exname,
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
            onClick={() => openDelete(row)}
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  const searchColumns = ["sno", "feature_exname", "status"];
  const filterdata = SearchData(data, filterText, searchColumns);
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  return (
    <>
      <section className="section mt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="page_heading">Add Features </h4>
                </div>
                <div className="card-body">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                      <div className="mb-3 col-md-12">
                        <label className="form-label" htmlFor="interiorFeature">
                          Exterior Features
                        </label>
                        <input
                          name="exfeature"
                          id="feature_exname"
                          placeholder="Enter Exterior Feature"
                          className="form-control"
                          value={formik.values.exfeature}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.exfeature && formik.touched.exfeature ? (
                          <h6 style={{ color: "red", fontSize: "12px" }}>
                            {formik.errors.exfeature}
                          </h6>
                        ) : null}
                      </div>
                      <div className="col-md-12 mb-3 ">
                        <label htmlFor="lastName" className="form-label">
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
                          <h6 style={{ color: "red", fontSize: "14px" }}>
                            {formik.errors.status}
                          </h6>
                        ) : null}
                      </div>
                    </div>

                    <div className="text-end py-3 px-3">
                      <a
                        href="javascript:void(0);"
                        className="btn1 text-dark me-1"
                        // onClick={() => {
                        //     setFormData({ document: "", status: "Enable" });
                        //     setErrors("");
                        // }}
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
                        disabled={postLoading}
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
                      progressPending={isLoading}
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
        visible={editDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit Exterior Feature"
        modal
        className="p-fluid"
        onHide={hideDialog}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row">
            <div className="mb-3 col-md-12">
              <label className="form-label" htmlFor="feature">
                Exterior Features
              </label>
              <input
                name="exfeature"
                id="feature"
                placeholder="Enter Exterior Feature"
                className="form-control"
                value={formik.values.exfeature}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.exfeature && formik.touched.exfeature ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {formik.errors.exfeature}
                </p>
              ) : null}
            </div>
            <div className="col-md-12 mb-3 ">
              <label htmlFor="lastName" className="form-label">
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
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              onClick={cancelDialog}
              type="button"
              className="btn btn-warning"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => setEditing(true)}
              disabled={updateLoading}
            >
              {updateLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </Dialog>

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
            Are you sure you want to delete the selected Video
          </span>
        </div>
      </Dialog>
    </>
  );
};

export default ExteriorFeatures;
