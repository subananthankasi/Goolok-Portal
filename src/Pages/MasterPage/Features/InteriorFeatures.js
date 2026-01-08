import { useFormik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import customStyle from "../../../Utils/tableStyle";
import DataTable from "react-data-table-component";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  iFeatureDeleteThunk,
  iFeatureGetThunk,
  iFeaturePostThunk,
  iFeatureUpdateThunk,
} from "../../../Redux/Actions/MasterPage/FeaturesThunk/InteriorFeatureThunk";
import { SearchData } from "../../../Utils/Search";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import Common from "../../../common/Common";
import Toast from "../../../Utils/Toast";
const Features = () => {
  const [editDialog, setEditDialog] = useState(false);
  const [editing, setEditing] = useState();
  const [filterText, setFilterText] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const { cleanText } = Common();

  const dispatch = useDispatch();
  const postLoading = useSelector(
    (state) => state.interiorFeatureData.post.loading
  );
  const updateLoading = useSelector(
    (state) => state.interiorFeatureData.update.loading
  );
  const isLoading = useSelector(
    (state) => state.interiorFeatureData.get.loading
  );
  const deleteLoading = useSelector(
    (state) => state.interiorFeatureData.delete.loading
  );

  const onSubmit = async (values) => {
    const newData = {
      ...values,
      feature: cleanText(values.feature),
    };
    if (editing) {
      const res = await dispatch(iFeatureUpdateThunk(newData));

      if (iFeatureUpdateThunk.fulfilled.match(res)) {
        dispatch(iFeatureGetThunk());
        formik.resetForm();
        await setEditDialog(false);
        Toast({ message: "Successfully Updated", type: "success" });
      }
      if (iFeatureUpdateThunk.rejected.match(res)) {
        formik.setFieldError("feature", res?.payload?.messages?.feature);
      }
    } else {
      const res = await dispatch(iFeaturePostThunk(newData));
      if (iFeaturePostThunk.fulfilled.match(res)) {
        dispatch(iFeatureGetThunk());
        formik.resetForm();
        await setEditDialog(false);
        Toast({ message: "Successfully Submited", type: "success" });
      }
      if (iFeaturePostThunk.rejected.match(res)) {
        formik.setFieldError("feature", res?.payload?.messages?.feature);
      }
    }
  };

  const openDelete = (row) => {
    setDeleteDialog(true);
    setDeleteId(row.id);
  };
  const handleDelete = () => {
    dispatch(iFeatureDeleteThunk(deleteId)).then(() => {
      dispatch(iFeatureGetThunk());
       Toast({ message: "Successfully Deleted", type: "success" });
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
        className="btn1"
        onClick={() => setDeleteDialog(false)}
      >
        Cancel
      </button>
      <button type="button" className="btn1" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );

  useEffect(() => {
    dispatch(iFeatureGetThunk());
  }, []);

  const data = useSelector((state) => state.interiorFeatureData?.get?.data);
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
    formik.setFieldValue("feature", row.feature_name);
    formik.setFieldValue("status", row.status);
    formik.setFieldValue("id", row.id);
  };
  const formik = useFormik({
    initialValues: {
      feature: "",
      status: "enable",
    },
    validationSchema: yup.object().shape({
      feature: yup.string().required("interiorFeature required !!"),
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
      name: "Interior Feature",
      selector: (row) => row.feature_name,
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
  const searchColumns = ["sno", "feature_name", "status"];
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
                        <label className="form-label" htmlFor="feature">
                          Interior Features
                        </label>
                        <input
                          name="feature"
                          id="feature"
                          placeholder="Enter Interior Feature"
                          className="form-control"
                          value={formik.values.feature}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.feature && formik.touched.feature ? (
                          <h6 style={{ color: "red", fontSize: "12px" }}>
                            {formik.errors.feature}
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
                          <h6 style={{ color: "red", fontSize: "12px" }}>
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

      {/*new Dilog */}
      <Dialog
        visible={editDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit Interior Feature"
        modal
        className="p-fluid"
        onHide={hideDialog}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row">
            <div className="mb-3 col-md-12">
              <label className="form-label" htmlFor="feature">
                Interior Features
              </label>
              <input
                name="feature"
                id="feature"
                placeholder="Enter Interior Feature"
                className="form-control"
                value={formik.values.feature}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.feature && formik.touched.feature ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {formik.errors.feature}
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
              className="btn1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn1 "
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

export default Features;
