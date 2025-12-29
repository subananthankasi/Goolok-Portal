import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import Select from "react-select";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Dialog } from "primereact/dialog";
import Toast from "../../../../Utils/Toast";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import { enquiryStatusUpdate } from "../../../../Redux/Actions/Enquiry/enquiryReportAction";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";
import customStyle from "../../../../Utils/tableStyle";
import { fetchDoc } from "../../../../Redux/Actions/MasterPage/LawyerDocumentAction";
import FileView from "../../../../Utils/FileView/FileView";
import { RedoModel } from "../../../Enquiry/Reusable/RedoStatus";
import { AddMoreDocLawyerLayout } from "./AddMoreDocLawyerLayout";

export const LawyerAddDocumentLayout = (props) => {
  const dispatch = useDispatch();
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [loadingPage, setLoadingPage] = useState(true);
  const [enquiryDoumentData, setEnquiryDoumentData] = useState([]);

  const fetchEnqData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/enquiryreport/${props.data.eid}/${staffid.loginid}`,
        {
          headers: {
            "Gl-Status": "lawyer",
          },
        }
      );
      setEnquiryDoumentData(response.data);
      setLoadingPage(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEnqData();
  }, []);

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const hideDeleteProductsDialog = () => {
    setDeleteDialog(false);
  };
  const openDelete = (id) => {
    setDeleteId(id);
    setDeleteDialog(true);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/docdelete/${deleteId}`);
      Toast({ message: "Successfully Deleted", type: "success" });
      setDeleteDialog(false);
      fetchEnqData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUnitsDialogFooter = (
    <div className="d-flex justify-content-end gap-2 mt-4">
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
  );
  const columns = [
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
      width: "180px",
      cell: (row) => (
        <>
          <div className="d-flex p-0">
            {row.upload_type == "lawyer" ? (
              <>
                {row.document ? (
                  <button
                    type="button"
                    className="btn btn-warning rounded-0"
                    style={{ width: "70px" }}
                    onClick={() =>
                      viewFileUrl(`${IMG_PATH}/enquiry/${row.document}`)
                    }
                  >
                    <RemoveRedEyeIcon />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary rounded-0"
                    style={{ width: "70px" }}
                  >
                    No data
                  </button>
                )}

                {(props.data.status == "pending" ||
                  props.data.status === "complete") &&
                  props.data.pagetype !== "reminder" &&
                  staffid.Login == "staff" &&
                  enquiryDoumentData?.status !== "booking" && (
                    <button
                      type="button"
                      className="btn btn-info rounded-0 ms-2"
                      onClick={() => {
                        openAddDocModal();
                        setUploadDocData(row);
                      }}
                    >
                      <AddIcon />
                    </button>
                  )}
              </>
            ) : (
              <>
                {row.document ? (
                  <button
                    type="button"
                    className="btn btn-warning rounded-0"
                    style={{ width: "70px" }}
                    onClick={() =>
                      viewFileUrl(`${IMG_PATH}/enquiry/${row.document}`)
                    }
                  >
                    <RemoveRedEyeIcon />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary rounded-0"
                    style={{ width: "70px" }}
                  >
                    No data
                  </button>
                )}
              </>
            )}
          </div>
        </>
      ),
    },
    {
      name: "Add Details",
      width: "180px",
      cell: (row) => (
        <>
          {row.upload_type == "lawyer" ? (
            <button
              type="button"
              className={`btn btn-primary rounded-0`}
              style={{ marginLeft: "7px" }}
              onClick={() => {
                if (row.document) {
                  setIsModalAddMore(true);
                  setDocId(row);
                }
              }}
            >
              {(props.data.status === "pending" ||
                props.data.status === "complete") &&
                props.data.pagetype !== "reminder" &&
                staffid.Login == "staff" &&
                enquiryDoumentData?.status !== "booking"
                ? "Fill Details.."
                : "View"}
            </button>
          ) : (
            <button
              type="button"
              className={`btn btn-primary rounded-0`}
              onClick={() => {
                if (row.document) {
                  setIsModalAddMoreView(true);
                  setDocId(row);
                }
              }}
            >
              View
            </button>
          )}
        </>
      ),
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          <button
            type="button"
            className={`badge rounded-pill btnhover btn p-2 ${row.status == "verify" ? "bg-success" : "bg-danger"
              }`}
            style={{ width: "60px" }}
            onClick={() => {
              if (
                row.upload_type == "lawyer" &&
                (props.data.status === "pending" ||
                  props.data.status === "complete") &&
                props.data.pagetype !== "reminder" &&
                staffid.Login == "staff" && enquiryDoumentData?.status !== "booking"
              ) {
                setIsVerifyConfirm(true);
                setDocId(row);
              }
            }}
          >
            {row.status == "verify"
              ? "Verify"
              : row.status == "pending"
                ? "Pending"
                : "Redo"}
          </button>
        </>
      ),
      sortable: true,
    },
    // {
    //   name: "Redo Status",
    //   width: "150px",
    //   cell: (row) => (
    //     <>
    //       <button
    //         type="button"
    //         className={`btn btn-outline-info`}
    //         onClick={() => {
    //           openModalRedo();
    //           setDocId(row);
    //         }}
    //       >
    //         {row.redocount}
    //       </button>
    //     </>
    //   ),
    //   sortable: true,
    // },
    {
      name: "Verified Date",
      width: "180px",
      selector: (row) => row.veryfi_date,
      sortable: true,
    },
    ...(staffid.Login == "staff" &&
      (props.data.status == "pending" || props.data.status == "complete") &&
      props.data.pagetype !== "reminder" &&
      enquiryDoumentData?.status !== "booking"
      ? [
        {
          name: "Actions",
          cell: (row) =>
            row.upload_type === "lawyer" ? (
              <button
                type="button"
                className="btn btn-outline-danger delete"
                onClick={() => openDelete(row.id)}
              >
                <DeleteIcon />
              </button>
            ) : null,
        },
      ]
      : []),
  ];

  const [docId, setDocId] = useState("");

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

  // Remark view modal
  const [isModalRedo, setIsModalRedo] = useState(false);
  const openModalRedo = () => {
    setIsModalRedo(true);
  };
  const closeModalRedo = () => {
    setIsModalRedo(false);
  };

  //  add more view
  const [isModalAddMore, setIsModalAddMore] = useState(false);

  //  add more view
  const [isModalAddMoreView, setIsModalAddMoreView] = useState(false);

  // add document
  const [isModalAddDocument, setIsModalAddDocument] = useState(false);

  //  document upload  modal
  const [uploadDocData, setUploadDocData] = useState({});
  const [addDocModal, setAddDocModal] = useState(false);
  const openAddDocModal = () => {
    setAddDocModal(true);
  };
  const closeAddDocModal = () => {
    setAddDocModal(false);
  };

  // document status modal verify
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const handleConfirm = async () => {
    const Data = {
      status: "verify",
      id: docId.id,
      name: docId.doc_type,
    };

    try {
      await dispatch(enquiryStatusUpdate(Data, setErrorMsg, handleOpenModal));
    } catch (error) {
      console.error("Error updating enquiry status:", error);
    } finally {
      fetchEnqData();
    }
  };

  // error alert
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModals = () => setModalOpen(false);

  return (
    <>
      <AddDocument
        isOpen={isModalAddDocument}
        closeModal={() => setIsModalAddDocument(false)}
        id={docId}
        eid={props.data.eid}
        userid={enquiryDoumentData.userid}
        fetchEnqData={fetchEnqData}
      />

      <DocumentUpload
        isOpen={addDocModal}
        closeModal={closeAddDocModal}
        uploadDocData={uploadDocData}
        fetchEnqData={fetchEnqData}
      />

      <AddMoreDocLawyerLayout
        isOpen={isModalAddMore}
        closeModal={() => setIsModalAddMore(false)}
        id={docId}
        props={props.data}
      />

      <FileView
        isOpen={isModalOpenFile}
        closeModal={closeModalFile}
        fileUrls={url}
      />
      <RedoModel isOpen={isModalRedo} closeModal={closeModalRedo} id={docId} />

      {/* <AddMoreView
        isOpen={isModalAddMoreView}
        closeModal={() => setIsModalAddMoreView(false)}
        id={docId}
      /> */}

      <ConfirmationModal
        isOpen={verifyConfirm}
        closeModal={() => setIsVerifyConfirm(false)}
        onConfirm={handleConfirm}
        message={"Are you sure this has been verified?"}
      />

      <AlertPop
        isOpen={modalOpen}
        onClose={handleCloseModals}
        message={errorMsg}
      />

      {loadingPage ? (
        ""
      ) : (
        <div className="">
          <div className="col-12">
            <div className="card border-0">
              <div className="card-body border-0">
                <div className="d-flex justify-content-between mb-3">
                  <h6> Document Details</h6>
                  {(props.data.status === "pending" ||
                    props.data.status === "complete") &&
                    staffid.Login === "staff" &&
                    props.data.pagetype !== "reminder" &&
                    enquiryDoumentData?.status !== "booking" && (
                      <div className="ms-2">
                        <a
                          href="#"
                          onClick={() => setIsModalAddDocument(true)}
                          className="btn1 me-2"
                        >
                          + Add document
                        </a>
                      </div>
                    )}
                </div>
                <hr />

                <DataTable
                  persistTableHead={true}
                  columns={columns}
                  data={enquiryDoumentData?.doc}
                  customStyles={customStyle}
                  pagination
                  // selectableRows
                  fixedLawyerAddDocument
                />
              </div>
            </div>
          </div>
        </div>
      )}
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
            Are you sure you want to delete the selected row
          </span>
        </div>
      </Dialog>
    </>
  );
};

const AddDocument = ({ isOpen, closeModal, eid, userid, fetchEnqData }) => {
  const dispatch = useDispatch();
  const LawyerDocument = useSelector((state) => state.LawyerDocument.lawyerDoc);

  useEffect(() => {
    dispatch(fetchDoc());
  }, [dispatch]);

  const options = LawyerDocument?.map((data) => ({
    value: data.id,
    label: data.document,
  }));

  const [selectedData, setSelectedData] = useState(null);
  const handleSelect = (data) => {
    setSelectedData(data);
  };

  //   docment add
  const [loading, setloading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedData) {
      alert("Please select document");
      return;
    }
    setloading(true);

    const updateData = {
      enqid: eid,
      docname: selectedData?.value,
      userid: userid,
    };

    try {
      await axios.post(`${API_BASE_URL}/lawyer`, updateData, {
        headers: {
          "Content-Type": "application/json",
          "Gl-Status": "lawyer ",
        },
      });
      setSelectedData(null);
    } catch (error) {
    } finally {
      setloading(false);
      closeModal();
      fetchEnqData();
    }
  };
  return (
    <>
      <div
        className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="d-flex" style={{ alignItems: "center" }}>
              <h4 className="page_subheading m-3">Add Document</h4>
              <button
                type="button"
                className="close closebutton"
                onClick={() => {
                  closeModal();
                  setSelectedData(null);
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <hr className="m-0" />
            <div className="card-body p-3">
              <form>
                <div className="row mt-3">
                  <div className="col-md-3">
                    <label className="form-label">select</label>
                  </div>
                  <div className="col-md-9">
                    <Select
                      options={options}
                      value={selectedData}
                      onChange={handleSelect}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused ? "#e7e7e7" : "#e7e7e7",
                          fontSize: "13px",
                        }),
                        option: (baseStyles, state) => ({
                          ...baseStyles,
                          fontSize: "12px",
                          color: "black",
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className="text-end mt-4">
                  <button
                    className="btn1 me-1"
                    type="button"
                    onClick={() => setSelectedData(null)}
                  >
                    Clear
                  </button>
                  <button
                    className="btn1"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" />
                        <span className="ms-2">Please wait...</span>
                      </>
                    ) : (
                      "Add"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DocumentUpload = ({
  isOpen,
  closeModal,
  uploadDocData,
  fetchEnqData,
}) => {
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const validTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
  ];

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (validTypes.includes(file.type)) {
        setSelectedFile(file);
        setError("");
      } else {
        setSelectedFile(null);
        setError(
          "Invalid file type. Only PDF, PNG, JPEG, and JPG are allowed."
        );
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("No file selected or invalid file.");
      return;
    }
    setLoading(true);
    const updateData = {
      document: selectedFile,
      id: uploadDocData.id,
      pid: "",
    };
    try {
      const response = await axios.post(
        `${API_BASE_URL}/fileupdate`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Gl-Status": "lawyer",
          },
        }
      );
      Toast({ message: "Successfully Uploaded", type: "success" });
    } catch (error) {
      Toast({ message: "Failed to upload", type: "error" });
    } finally {
      fetchEnqData();
      closeModal();
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="d-flex" style={{ alignItems: "center" }}>
              <h4 className="page_subheading m-3">Add Document</h4>
              <button
                type="button"
                className="close closebutton"
                onClick={() => {
                  closeModal();
                  setError("");
                  fileInputRef.current.value = "";
                  setSelectedFile(null);
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <hr className="m-0" />
            <div className="card-body p-3">
              <form>
                <div className="row mt-4">
                  <div className="col-sm-3">
                    <label className="form-label">
                      {uploadDocData.doc_type}
                    </label>
                  </div>
                  <div className="col-sm-9">
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleChange}
                      ref={fileInputRef}
                      accept=".pdf,.png,.jpeg,.jpg"
                    />
                    {error && <p className="validation_msg">{error}</p>}
                  </div>

                  <div className="text-end py-4 px-3 ">
                    <button
                      className="btn1 me-1"
                      type="button"
                      onClick={() => {
                        closeModal();
                        setError("");
                        fileInputRef.current.value = "";
                        setSelectedFile(null);
                      }}
                    >
                      Close
                    </button>

                    <button
                      type="button"
                      className="btn1"
                      onClick={handleUpload}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" />
                          <span className="ms-2">Please wait...</span>
                        </>
                      ) : (
                        "Update"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
