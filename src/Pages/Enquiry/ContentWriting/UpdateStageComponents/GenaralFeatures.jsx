import React, { useEffect, useState } from "react";
import customStyle from "../../../../Utils/tableStyle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "react-data-table-component";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { gFeatureGetThunk } from "../../../../Redux/Actions/MasterPage/FeaturesThunk/GeneralFeatureThunk";
import {
  gEnqFeatureDeleteThunk,
  gEnqFeatureGetThunk,
  gEnqFeaturePostThunk,
  gEnqFeatureUpdateThunk,
} from "../../../../Redux/Actions/Enquiry/ContentWritingThunk/CWDescriptionFeatureThunk";
import Toast from "../../../../Utils/Toast";

const GenaralFeatures = ({ eid, id, status }) => {
  const staffid = JSON.parse(sessionStorage.getItem("token"));

  const [newDialog, setNewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editDialog, setEditDialog] = useState(false);
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(gFeatureGetThunk());
    dispatch(gEnqFeatureGetThunk(eid));
  }, []);

  const gfeatureData = useSelector(
    (state) => state.generalFeatureData?.get?.data
  );
  const GEnqData = useSelector((state) => state.GEnqData?.get?.data);

  const onSubmit = (values) => {
    if (editing) {
      dispatch(gEnqFeatureUpdateThunk(values)).then(() => {
        dispatch(gEnqFeatureGetThunk(eid));
      });
      Toast({ message: "Successfully Updated", type: "success" });
      formik.resetForm();
      setEditDialog(false);
    } else {
      dispatch(gEnqFeaturePostThunk(values)).then(() => {
        dispatch(gEnqFeatureGetThunk(eid));
      });
      Toast({ message: "Successfully Added", type: "success" });
      formik.resetForm();
      setNewDialog(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      features: "",
      details: "",
      enqid: eid,
      id: null,
    },

    validationSchema: yup.object().shape({
      features: yup.string().required("genaral feature is required!!"),
      details: yup.string().required(" feature details is required!!"),
    }),
    onSubmit,
  });

  const hideDialog = () => {
    setNewDialog(false);
    formik.resetForm();
  };
  const hideEditDialog = () => {
    setEditDialog(false);
    formik.resetForm();
  };

  const handleEdit = (row) => {
    setEditDialog(true);
    formik.setFieldValue("features", row.feature_name);
    formik.setFieldValue("details", row.details);
    formik.setFieldValue("id", row.id);
  };
  const openDelete = (row) => {
    setDeleteDialog(true);
    setDeleteId(row.id);
  };
  const handleDelete = () => {
    dispatch(gEnqFeatureDeleteThunk(deleteId)).then(() => {
      dispatch(gEnqFeatureGetThunk(eid));
    });
    Toast({ message: "Successfully Deleted", type: "success" });
    setDeleteDialog(false);
  };

  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  const column1 = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Genaral Features",
      selector: (row) => row.feature,
      sortable: true,
    },
    {
      name: "Details",
      selector: (row) => row.details,
      sortable: true,
    },

    ...((status === "pending" || status === "complete") &&
    staffid.Login == "staff" &&
    enquiryDoumentData?.status !== "booking"
      ? [
          {
            name: "Actions",
            cell: (row) => (
              <>
                <div className="d-flex">
                  <button
                    className="btn btn-outline-info me-1 edit"
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
              </>
            ),
          },
        ]
      : []),
  ];
  const deleteUnitsDialogFooter = (
    <div className=" d-flex gap-3 justify-content-end">
      <button className="btn1" onClick={handleDelete}>
        {" "}
        Yes
      </button>
    </div>
  );
  const hideDeleteProductsDialog = () => {
    setDeleteDialog(false);
  };

  return (
    <>
      <div className="container-fluid p-0 mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header  p-3 d-flex justify-content-between">
                <h6>Genaral Features</h6>
                {(status == "pending" || status == "complete") &&
                  staffid.Login == "staff" && enquiryDoumentData?.status !=="booking" && (
                    <button
                      onClick={() => setNewDialog(true)}
                      className="btn1 me-2"
                    >
                      + Add
                    </button>
                  )}
              </div>
              <div className="card-body p-3">
                <DataTable
                  persistTableHead={true}
                  columns={column1}
                  data={GEnqData}
                  customStyles={customStyle}
                  pagination
                  // selectableRows
                  fixedHeader
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        visible={newDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Add Genaral Features"
        modal
        className="p-fluid"
        onHide={hideDialog}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div>
            <div className="form-group">
              <label htmlFor="features" className="form-label">
                Genaral Features :
              </label>
              <select
                id="features"
                name="features"
                className="form-select mt-2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.features}
              >
                <option value={""}> Select Features</option>
                {gfeatureData?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {" "}
                    {item.feature_gname}{" "}
                  </option>
                ))}
              </select>
              {formik.errors.features && formik.touched.features && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.features}
                </p>
              )}
            </div>
            <div className="form-group mt-2">
              <label htmlFor="details" className="form-label">
                {" "}
                Features Details:
              </label>
              <input
                id="details"
                name="details"
                placeholder="Enter Details..."
                className="form-control mt-1"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.details}
              />

              {formik.errors.details && formik.touched.details && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.details}
                </p>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              className="btn1"
              type="submit"
              onClick={() => setEditing(false)}
            >
              Save
            </button>
          </div>
        </form>
      </Dialog>
      {/*Delete modal */}

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
          <i class="fa-solid fa-fa-circle-exclamation"></i>
          <span style={{ marginLeft: "10px" }}>
            Are you sure you want to delete selected Genaral Features ?
          </span>
        </div>
      </Dialog>

      {/*Edit modal */}

      <Dialog
        visible={editDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit Interior Features"
        modal
        className="p-fluid"
        onHide={hideEditDialog}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div>
            <div className="form-group">
              <label htmlFor="features" className="form-label">
                Genaral Features :
              </label>
              <select
                id="features"
                name="features"
                className="form-select mt-2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.features}
              >
                <option value={""}> Select Features</option>
                {gfeatureData?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {" "}
                    {item.feature_gname}{" "}
                  </option>
                ))}
              </select>
              {formik.errors.features && formik.touched.features && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.features}
                </p>
              )}
            </div>
            <div className="form-group mt-2">
              <label htmlFor="details" className="form-label">
                {" "}
                Features Details:
              </label>
              <input
                id="details"
                name="details"
                placeholder="Enter Details..."
                className="form-control mt-1"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.details}
              />

              {formik.errors.details && formik.touched.details && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.details}
                </p>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              className="btn1"
              type="submit"
              onClick={() => setEditing(true)}
            >
              Update
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default GenaralFeatures;
