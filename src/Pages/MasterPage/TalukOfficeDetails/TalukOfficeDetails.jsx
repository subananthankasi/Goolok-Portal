import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import customStyle from "../../../Utils/tableStyle";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import { SearchData } from "../../../Utils/Search";
import { fetchTaluk } from "../../../Redux/Actions/MasterPage/TalukAction";
import {
  talukDetailsDeleteThunk,
  talukDetailsGetThunk,
  talukDetailsPostThunk,
} from "../../../Redux/Actions/MasterPage/TalukDetailsThunk";
import Toast from "../../../Utils/Toast";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import Common from "../../../common/Common";

const TalukOfficeDetails = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [editing, setEditing] = useState(false);
  const [filterText, setFilterText] = useState("");
  const isLoading = useSelector((state) => state.talukDetailsData.get.loading);
  const postLoading = useSelector(
    (state) => state.talukDetailsData.post.loading
  );
  const updateLoading = useSelector(
    (state) => state.talukDetailsData.update.loading
  );

  const searchColumns = ["sno", "talukName", "office", "status"];
  const { cleanText } = Common();
  useEffect(() => {
    dispatch(fetchTaluk());
    dispatch(talukDetailsGetThunk());
  }, []);

  const TalukData = useSelector((state) => state.Taluk.TalukData);
  const Getdata = useSelector((state) => state.talukDetailsData.get.data);
  const filterdata = SearchData(Getdata, filterText, searchColumns);

  const onSubmit = async (values) => {
    const newData = {
      ...values,
      office: cleanText(values.office),
    };

    const response = await dispatch(talukDetailsPostThunk(newData));
    if (talukDetailsPostThunk.fulfilled.match(response)) {
      formik.resetForm();
      if (values.id) {
        Toast({ message: "Successfully Updated", type: "success" });
        setEditDialog(false);
      } else {
        Toast({ message: "Successfully Submited", type: "success" });
      }
      dispatch(talukDetailsGetThunk());
    }

    // ERROR
    if (talukDetailsPostThunk.rejected.match(response)) {
      formik.setFieldError("office", response.payload?.messages?.office);
    }
  };

  const formik = useFormik({
    initialValues: {
      talukname: "",
      office: "",
      status: "enable",
    },
    validationSchema: yup.object().shape({
      talukname: yup.string().required(" taluk is required !!"),
      office: yup.string().required(" taluk office is required !!"),
    }),
    onSubmit,
  });

  const handleEdit = (row) => {
    setEditDialog(true);
    formik.setFieldValue("talukname", row.talukname);
    formik.setFieldValue("office", row.office);
    formik.setFieldValue("id", row.id);
    formik.setFieldValue("status", row.status);
  };

  const openDelete = (row) => {
    setDeleteDialog(true);
    setDeleteId(row.id);
  };
  const handleDelete = () => {
    dispatch(talukDetailsDeleteThunk(deleteId)).then(() => {
      dispatch(talukDetailsGetThunk());
    });
    setDeleteDialog(false);
    Toast({ message: "SuccessFully deleted", type: "success" });
  };

  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Taluk",
      selector: (row) => row.talukName,
      sortable: true,
    },
    {
      name: "Taluk office",
      selector: (row) => row.office,
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
            onClick={() => {
              handleEdit(row);
            }}
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

  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  return (
    <>
      <Toast ref={toast} />
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="page_heading">Taluk Office Details </h4>
                </div>
                <div className="card-body">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                      <div className="col-md-12 mb-3 ">
                        <label htmlFor="discount" className="form-label">
                          Taluk
                        </label>
                        <select
                          name="talukname"
                          className="form-select"
                          value={formik.values.talukname}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option>Select Taluk ..</option>
                          {TalukData?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.taluk_name}{" "}
                            </option>
                          ))}
                        </select>
                        {formik.errors.talukname && formik.touched.talukname ? (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            {formik.errors.talukname}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-3 ">
                        <label htmlFor="discount" className="form-label">
                          Taluk office
                        </label>
                        <input
                          name="office"
                          className="form-control"
                          placeholder="Enter Taluk office "
                          value={formik.values.office}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.office && formik.touched.office ? (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            {formik.errors.office}
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
                    </div>

                    <div className="text-end py-3 px-3">
                      <button
                        className="btn1 text-dark me-1"
                        onClick={() => {
                          formik.resetForm();
                        }}
                      >
                        Clear
                      </button>
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
      {/*Delete modal */}
      <Dialog
        visible={deleteDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        onHide={() => setDeleteDialog(false)}
      >
        <div className="confirmation-content">
          <i class="fa-solid fa-circle-exclamation"></i>
          <span style={{ marginLeft: "10px" }}>
            Are you sure you want to delete the selected row
          </span>
        </div>

        <div className="d-flex justify-content-end mt-3 gap-3">
          <Button
            variant="outlined"
            color="error"
            onClick={() => setDeleteDialog(false)}
          >
            No
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            Yes
          </Button>
        </div>
      </Dialog>
      {/*Edit modal */}
      <Dialog
        visible={editDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Update "
        modal
        className="p-fluid"
        onHide={() => {
          setEditDialog(false);
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-12 mb-3 ">
              <label htmlFor="discount" className="form-label">
                Taluk
              </label>
              <select
                name="talukname"
                className="form-select"
                value={formik.values.talukname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option>Select Taluk ..</option>
                {TalukData?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.taluk_name}{" "}
                  </option>
                ))}
              </select>
              {formik.errors.talukname && formik.touched.talukname ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.talukname}
                </p>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mb-3 ">
              <label htmlFor="discount" className="form-label">
                Taluk office
              </label>
              <input
                name="office"
                className="form-control"
                placeholder="Enter Taluk office "
                value={formik.values.office}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.office && formik.touched.office ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.office}
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
          </div>

          <div className="text-end py-3 px-3">
            <button
              className="btn1 text-dark me-1"
              onClick={() => {
                formik.resetForm();
              }}
            >
              Clear
            </button>
            <button
              type="submit"
              className="btn1"
              onClick={() => setEditing(false)}
              disabled={updateLoading}
            >
              {updateLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default TalukOfficeDetails;
