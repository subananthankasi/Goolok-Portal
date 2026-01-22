import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../../../../../Api/api";
import Toast from "../../../../../../Utils/Toast";
import customStyle from "../../../../../../Utils/tableStyle";
import FileViewUtils from "../../../../../../Utils/FileView/FileViewUtils";
import UploadFmp from "./UploadFmp";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FileView from "../../../../../../Utils/FileView/FileView";
import { useSelector } from "react-redux";

const TicketClosingComponentSurvey = ({ eid, id, status, pagetype }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [fillDialog, setFillDialog] = useState(false);
  const [visible, setVisible] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const [getData, setGetData] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [document, setDocument] = useState("");

  const viewFile = (row) => {
    const url = `${IMG_PATH}/enquiry/${row.document}`;
    window.open(url, "_blank");
  };

  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  const column = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.created_at,

      sortable: true,
    },
    {
      name: "Document",
      selector: (row) => row.doc_type,
      sortable: true,
    },

    {
      name: "Age",
      selector: (row) => row.age,

      sortable: true,
    },

    {
      name: "View",
      cell: (row) => (
        <>
          <div className="d-flex">
            {row.document ? (
              <button
                type="button"
                className="btn btn-warning rounded-0"
                onClick={() =>
                  viewFileUrl(`${IMG_PATH}/enquiry/${row.document}`)
                }
              >
                <RemoveRedEyeIcon />
              </button>
            ) : (
              <button type="button" className="btn btn-primary rounded-0">
                <VisibilityOffIcon />
              </button>
            )}
          </div>
        </>
      ),
    },

    {
      name: "Fill details",
      cell: (row) => (
        <>
          <div className="d-flex">
            <Button
              variant="outlined"
              onClick={() => {
                setFillDialog(true);
                setRowId(row.id);
                setDocument(row.document);
              }}
            >
              {" "}
              Fill Details{" "}
            </Button>
          </div>
        </>
      ),
      sortable: true,
    },
    ...(staffid.logintype == "staff" &&
    (status === "complete" || status === "pending") &&
    pagetype !== "reminder" &&
    enquiryDoumentData?.status !== "live"
      ? [
          {
            name: "Actions",
            cell: (row) => (
              <>
                <div className="d-flex">
                  <button
                    className="btn btn-outline-danger delete"
                    data-tooltip-id="delete"
                    onClick={() => handleDeleteOpen(row)}
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
  const handleDeleteOpen = (row) => {
    setDeleteDialog(true);
    setdeleteId(row.id);
  };

  const handleDelete = async (row) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/docdelete/${deleteId}`
      );
      fetch();
      Toast({ message: "Successfully Deleted", type: "success" });
      setDeleteDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetch = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/servicepattacopy/${eid}/${staffid.loginid} `
      );
      setGetData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const [postLoading, setPostLoading] = useState(false);
  const onSubmit = async (values) => {
    const updateData = {
      ...values,
      enqid: eid,
      userid: getData.userid,
      name: "FMP Copy",
    };
    setPostLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/servicehub`, updateData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Gl-Status": "document",
        },
      });
      setVisible(false);
      formik.resetForm();
      setPostLoading(false);
    } catch (error) {
      setPostLoading(false);
    } finally {
      fetch();
    }
  };

  const formik = useFormik({
    initialValues: {
      document: "",
    },
    validationSchema: yup.object().shape({
      document: yup.string().required("document  is required!!"),
    }),
    onSubmit,
  });

  // view file
  const [url, setUrl] = useState("");
  const viewFileUrl = (url) => {
    setUrl(url);
    openModalFile();
  };
  const [isModalOpenFile, setIsModalOpenfile] = useState(false);
  const openModalFile = () => {
    setIsModalOpenfile(true);
  };
  const closeModalFile = () => {
    setIsModalOpenfile(false);
  };

  return (
    <>
      <FileView
        isOpen={isModalOpenFile}
        closeModal={closeModalFile}
        fileUrls={url}
      />
      <div className="col-12 mt-4">
        <div className="card shadow border-0">
          <div className="card shadow border-0 p-4">
            <div className="d-flex justify-content-between">
              <h6>FMP Document</h6>
              {staffid.logintype == "staff" &&
                (status === "complete" || status === "pending") &&
                pagetype !== "reminder" &&
                getData?.doc?.length === 0 && (
                  <button className="btn1" onClick={() => setVisible(true)}>
                    Add FMP Document
                  </button>
                )}
            </div>
            {/* {enquiryDoumentData?.doc?.length === 0 && (
                                                <div className="d-flex justify-content-between">
                                                    <h6>Document Details</h6>
                                                    {staffid.Login === "staff" && (
                                                        <div className="ms-2">
                                                            <a
                                                                href="#"
                                                                onClick={() => setVisible(true)}
                                                                className="btn1 me-2"
                                                            >
                                                                + Add document
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            )} */}

            <hr />
            <div className="mt-2">
              <DataTable
                persistTableHead={true}
                columns={column}
                data={getData?.doc}
                customStyles={customStyle}
                pagination
                // selectableRows
                fixedHeader
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog
        visible={fillDialog}
        style={{ width: "90rem", height: "40rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="FMB Copy"
        modal
        className="p-fluid"
        onHide={() => {
          setFillDialog(false);
          formik.resetForm();
        }}
      >
        <div className="row">
          <div className="col-6">
            <FileViewUtils fileUrls={`${IMG_PATH}/enquiry/${document}`} />
          </div>
          <div className="col-6">
            <UploadFmp eid={eid} id={id} status={status} rowId={rowId} />
          </div>
        </div>
      </Dialog>
      <Dialog
        header="Add Document"
        visible={visible}
        position="top"
        style={{ width: "30vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
          formik.resetForm();
        }}
      >
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="docname" className="form-label">
              Select document : <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="file"
              name="document"
              id="document"
              className="form-control"
              onChange={(event) =>
                formik.setFieldValue("document", event.currentTarget.files[0])
              }
              onBlur={formik.handleBlur}
            />

            {formik.errors.document && formik.touched.document ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.document}
              </p>
            ) : null}
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button className="btn1" type="submit" disabled={postLoading}>
              {postLoading ? "Processing..." : "Save"}
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
    </>
  );
};

export default TicketClosingComponentSurvey;
