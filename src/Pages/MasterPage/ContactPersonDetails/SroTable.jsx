import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import customStyle from "../../../Utils/tableStyle";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import { SearchData } from "../../../Utils/Search";
import { fetchSRODetails } from "../../../Redux/Actions/MasterPage/SRODetailsAction";
import Toast from "../../../Utils/Toast";
import AddIcon from "@mui/icons-material/Add";
import { talukDetailsGetThunk } from "../../../Redux/Actions/MasterPage/TalukDetailsThunk";
import {
  contactPersonSroDeleteThunk,
  contactPersonSroGetThunk,
  contactPersonSroPostThunk,
} from "../../../Redux/Actions/MasterPage/ContactPersonSroThunk";
import CustomLoder from "../../../Components/customLoader/CustomLoder";

const SroTable = () => {
  const dispatch = useDispatch();
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [filterText, setFilterText] = useState("");
  const isLoading = useSelector((state) => state.SRODetails.isLoading);
  const updateLoading = useSelector((state) => state.SRODetails.updateLoading);

  const searchColumns = [
    "sno",
    "contact_number",
    "contact_person",
    "status",
    "sro_title",
  ];

  useEffect(() => {
    dispatch(fetchSRODetails());
    dispatch(contactPersonSroGetThunk());
    dispatch(talukDetailsGetThunk());
  }, [dispatch]);

  const SRODetailsData = useSelector(
    (state) => state.SRODetails.SRODetailsData
  );
  const contactPersonData = useSelector(
    (state) => state.contactPersonSroData.get.data
  );

  const filterdata = SearchData(contactPersonData, filterText, searchColumns);

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      type: "sro",
    };
    formik.resetForm();
    try {
      dispatch(contactPersonSroPostThunk(payload)).then(() => {
        dispatch(contactPersonSroGetThunk());
      });

      if (values.id) {
        Toast({ message: "Successfully Updated", type: "success" });
        setEditDialog(false);
      } else {
        Toast({ message: "Successfully Submited", type: "success" });
      }
    } catch (error) {
      Toast({ message: "Successfully Submited", type: "error" });
    }
  };

  const formik = useFormik({
    initialValues: {
      sro: "",
      contactsName: [""],
      contactsNo: [""],
    },
    validationSchema: yup.object().shape({
      sro: yup.string().required("sro is required!"),
      contactsName: yup
        .array()
        .of(yup.string().required("Contact name is required!")),
      contactsNo: yup
        .array()
        .of(yup.string().required("Contact no is required!")),
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
      name: "Sro",
      selector: (row) => row.sro_title,
      sortable: true,
    },
    {
      name: "Contact name",
      selector: (row) => {
        try {
          const names = JSON.parse(row.contact_person);
          return Array.isArray(names) ? names.join(", ") : "";
        } catch (error) {
          return "Invalid Format";
        }
      },
      sortable: true,
    },
    {
      name: "Contact No",
      selector: (row) => {
        try {
          const no = JSON.parse(row.contact_number);
          return Array.isArray(no) ? no.join(", ") : "";
        } catch (error) {
          return "Invalid Format";
        }
      },
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

  const handleEdit = (row) => {
    setEditDialog(true);
    const parsedContactsName = row.contact_person
      ? JSON.parse(row.contact_person)
      : [""];
    const parsedContactsNo = row.contact_number
      ? JSON.parse(row.contact_number)
      : [""];
    formik.setFieldValue("contactsName", parsedContactsName);
    formik.setFieldValue("contactsNo", parsedContactsNo);
    formik.setFieldValue("talukoffice", row.toffice);
    formik.setFieldValue("sro", row.sro);
    formik.setFieldValue("id", row.id);
  };

  const openDelete = (row) => {
    setDeleteDialog(true);
    setDeleteId(row.id);
  };
  const handleDelete = () => {
    try {
      dispatch(contactPersonSroDeleteThunk(deleteId)).then(() => {
        dispatch(contactPersonSroGetThunk());
      });
      setDeleteDialog(false);
      Toast({ message: "SuccessFully deleted", type: "success" });
    } catch (error) {
      Toast({ message: "Not Deleted", type: "error" });
    }
  };

  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };

  const handleAdd = () => {
    formik.setFieldValue("contactsName", [...formik.values.contactsName, ""]);
  };

  const handleDeleteIndex = (index) => {
    const updatedContacts = formik.values.contactsName.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("contactsName", updatedContacts);
  };
  const personNoAdd = () => {
    formik.setFieldValue("contactsNo", [...formik.values.contactsNo, ""]);
  };

  const deletePersonNo = (index) => {
    const updatedContacts = formik.values.contactsNo.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("contactsNo", updatedContacts);
  };

  return (
    <>
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
          formik.resetForm();
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-12 mb-3 ">
              <label htmlFor="discount" className="form-label">
                Sro
              </label>
              <select
                name="sro"
                className="form-select"
                placeholder="Enter Taluk "
                value={formik.values.sro}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option>Select Sro ..</option>
                {SRODetailsData?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {" "}
                    {item.sro_title}
                  </option>
                ))}
              </select>
              {formik.errors.sro && formik.touched.sro ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.sro}
                </p>
              ) : null}
            </div>
          </div>
          <div className="row">
            <label htmlFor="discount" className="form-label">
              Contact Person Name
            </label>
            {formik.values.contactsName?.map((contact, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-md-9">
                  <input
                    type="text"
                    name={`contactsName[${index}]`}
                    className="form-control"
                    placeholder={
                      index === 0
                        ? "Enter Contact Person Name"
                        : `Enter Contact Person Name ${index}`
                    }
                    value={contact}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.contactsName &&
                    formik.errors.contactsName[index] &&
                    formik.touched.contactsName &&
                    formik.touched.contactsName[index] && (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.contactsName[index]}
                      </p>
                    )}
                </div>
                <div className="d-flex gap-2 col-md-3">
                  {index !== 0 && (
                    <div className=" p-0 m-0">
                      <button
                        type="button"
                        className="btn  btn-outline-danger me-1 delete"
                        onClick={() => handleDeleteIndex(index)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  )}
                  {index === formik.values.contactsName.length - 1 && (
                    <div className="p-0 m-0">
                      <button
                        className="btn btn-outline-success me-1 edit"
                        type="button"
                        onClick={handleAdd}
                      >
                        <AddIcon />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <label htmlFor="discount" className="form-label">
              Contact Person Number
            </label>
            {formik.values.contactsNo?.map((contact, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-md-9">
                  <input
                    type="text"
                    name={`contactsNo[${index}]`}
                    className="form-control"
                    placeholder={
                      index === 0
                        ? "Enter Contact Person No"
                        : `Enter Contact Person No ${index}`
                    }
                    value={contact}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.contactsNo &&
                    formik.errors.contactsNo[index] &&
                    formik.touched.contactsNo &&
                    formik.touched.contactsNo[index] && (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.contactsNo[index]}
                      </p>
                    )}
                </div>
                <div className="d-flex gap-2 col-md-3">
                  {index !== 0 && (
                    <div className=" p-0 m-0">
                      <button
                        type="button"
                        className="btn  btn-outline-danger me-1 delete"
                        onClick={() => deletePersonNo(index)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  )}
                  {index === formik.values.contactsNo.length - 1 && (
                    <div className=" p-0 m-0">
                      <button
                        className="btn  btn-outline-success me-1 edit"
                        type="button"
                        onClick={personNoAdd}
                      >
                        <AddIcon />{" "}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-end py-3 px-3">
            <button type="submit" className="btn1" disabled={updateLoading}>
              {updateLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>

      </Dialog>
    </>
  );
};

export default SroTable;
