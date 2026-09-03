import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import customStyle from "../../../Utils/tableStyle";
import DataTable from "react-data-table-component";
import { SearchData } from "../../../Utils/Search";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  propertyDeleteThunk,
  propertyGetThunk,
  propertyPostThunk,
  propertyUpdateThunk,
} from "../../../Redux/Actions/MasterPage/TagsThunk/PropertyThunk";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import Common from "../../../common/Common";
import Toast from "../../../Utils/Toast";
import { TabView, TabPanel } from "primereact/tabview";
import * as XLSX from "xlsx";

const Praperty = () => {
  const [editDialog, setEditDialog] = useState(false);
  const [editing, setEditing] = useState();
  const [filterText, setFilterText] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const { cleanText } = Common();
  const [excelFile, setExcelFile] = useState(null);
  const [bulkLoading, setBulkLoading] = useState(false);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.propertyData?.get?.loading);
  const updateLoading = useSelector(
    (state) => state.propertyData?.update?.loading,
  );
  const postLoading = useSelector((state) => state.propertyData?.post?.loading);
  const deleteLoading = useSelector(
    (state) => state.propertyData?.delete?.loading,
  );

  const onSubmit = async (values) => {
    const newData = {
      ...values,
      propertytag: cleanText(values.propertytag),
    };
    if (editing) {
      const res = await dispatch(propertyUpdateThunk(newData));
      if (propertyUpdateThunk.fulfilled.match(res)) {
        formik.resetForm();
        setEditDialog(false);
        dispatch(propertyGetThunk());
        Toast({ message: "Successfully Updated", type: "success" });
      }
      if (propertyUpdateThunk.rejected.match(res)) {
        formik.setFieldError(
          "propertytag",
          res?.payload?.messages?.propertytag,
        );
      }
    } else {
      const res = await dispatch(propertyPostThunk(newData));
      if (propertyPostThunk.fulfilled.match(res)) {
        formik.resetForm();
        dispatch(propertyGetThunk());
        Toast({ message: "Successfully Submited", type: "success" });
      }
      if (propertyPostThunk.rejected.match(res)) {
        formik.setFieldError(
          "propertytag",
          res?.payload?.messages?.propertytag,
        );
      }
    }
  };

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);

      const workbook = XLSX.read(data, { type: "array" });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const jsonData = XLSX.utils.sheet_to_json(sheet);

      setExcelFile(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleBulkSubmit = async () => {
    if (!excelFile || excelFile.length === 0) {
      Toast({
        message: "Please upload an Excel file",
        type: "error",
      });
      return;
    }

    setBulkLoading(true);

    const errors = [];
    let successCount = 0;

    for (let i = 0; i < excelFile.length; i++) {
      const row = excelFile[i];

      const payload = {
        propertytag: cleanText(row.propertytag || row.PropertyTag),
        status: row.status || row.Status || "enable",
      };

      const res = await dispatch(propertyPostThunk(payload));

      if (propertyPostThunk.fulfilled.match(res)) {
        successCount++;
      } else if (propertyPostThunk.rejected.match(res)) {
        errors.push({
          row: i + 2,
          propertytag: payload.propertytag,
          message:
            res?.payload?.messages?.propertytag ||
            res?.payload?.message ||
            "Upload Failed",
        });
      }
    }

    dispatch(propertyGetThunk());

    setBulkLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (errors.length > 0) {
      Toast({
        message: `${successCount} uploaded, ${errors.length} failed`,
        type: "warning",
      });

      // console.log(errors);
    } else {
      Toast({
        message: "Bulk Upload Successfully",
        type: "success",
      });
    }
  };

  const openDelete = (row) => {
    setDeleteDialog(true);
    setDeleteId(row.id);
  };
  const handleDelete = () => {
    dispatch(propertyDeleteThunk(deleteId)).then(() => {
      dispatch(propertyGetThunk());
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
    dispatch(propertyGetThunk());
  }, [dispatch]);

  const data = useSelector((state) => state.propertyData?.get?.data);

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
    formik.setFieldValue("propertytag", row.property_tag);
    formik.setFieldValue("status", row.status);
    formik.setFieldValue("id", row.id);
  };

  const formik = useFormik({
    initialValues: {
      propertytag: "",
      status: "enable",
    },
    validationSchema: yup.object().shape({
      propertytag: yup.string().required("property is required !!"),
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
      name: "Suitable Tag  ",
      selector: (row) => row.property_tag,
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

  const searchColumns = ["sno", "property_tag", "status"];
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
                  {/* <h4 className="page_heading">Add Property </h4> */}
                  <TabView>
                    <TabPanel header="Single Upload ">
                      <div className="card-body">
                        <form onSubmit={formik.handleSubmit}>
                          <div className="row">
                            <div className="mb-3 col-md-12">
                              <label
                                className="form-label"
                                htmlFor="interiorFeature"
                              >
                                Property Tag
                              </label>
                              <input
                                name="propertytag"
                                id="propertytag"
                                placeholder="Enter Suitable Tag"
                                className="form-control"
                                value={formik.values.propertytag}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                              {formik.errors.propertytag &&
                              formik.touched.propertytag ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                  {formik.errors.propertytag}
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

                          <div className="text-end py-3 px-3">
                            <button
                              className="btn1   me-1"
                              onClick={() => {
                                formik.resetForm();
                              }}
                              type="button"
                            >
                              Clear
                            </button>
                            <button
                              type="submit"
                              className="btn1"
                              disabled={postLoading}
                            >
                              {postLoading ? "processing..." : "Add"}
                            </button>
                          </div>
                        </form>
                      </div>
                    </TabPanel>
                    <TabPanel header="Bulk Upload">
                      <div className="mb-3 mt-3">
                        <label className="form-label">Upload Excel</label>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".xlsx,.xls"
                          className="form-control"
                          onChange={handleExcelUpload}
                        />
                      </div>

                      <div className="text-end">
                        <button
                          className="btn1"
                          onClick={handleBulkSubmit}
                          disabled={bulkLoading}
                        >
                          {bulkLoading ? "Uploading..." : "Upload"}
                        </button>
                      </div>
                    </TabPanel>
                  </TabView>
                </div>

                {/* <div className="card-body">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                      <div className="mb-3 col-md-12">
                        <label className="form-label" htmlFor="interiorFeature">
                          Property Tag
                        </label>
                        <input
                          name="propertytag"
                          id="propertytag"
                          placeholder="Enter Suitable Tag"
                          className="form-control"
                          value={formik.values.propertytag}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.propertytag &&
                        formik.touched.propertytag ? (
                          <p style={{ color: "red", fontSize: "14px" }}>
                            {formik.errors.propertytag}
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

                    <div className="text-end py-3 px-3">
                      <button
                        className="btn1   me-1"
                        onClick={() => {
                          formik.resetForm();
                        }}
                        type="button"
                      >
                        Clear
                      </button>
                      <button
                        type="submit"
                        className="btn1"
                        disabled={postLoading}
                      >
                        {postLoading ? "processing..." : "Add"}
                      </button>
                    </div>
                  </form>
                </div> */}
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
                      progressComponent={<CustomLoder />}
                      progressPending={isLoading}
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
        header="Edit Property"
        modal
        className="p-fluid"
        onHide={hideDialog}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row">
            <div className="mb-3 col-md-12">
              <label className="form-label" htmlFor="feature">
                Property Name
              </label>
              <input
                name="propertytag"
                id="propertytag"
                placeholder="Enter Suitable Name"
                className="form-control"
                value={formik.values.propertytag}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.propertytag && formik.touched.propertytag ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {formik.errors.propertytag}
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
            <button onClick={cancelDialog} type="button" className="btn1">
              Cancel
            </button>
            <button
              type="submit"
              className="btn1"
              onClick={() => setEditing(true)}
              disabled={updateLoading}
            >
              {updateLoading ? "updating..." : "Update"}
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

export default Praperty;
