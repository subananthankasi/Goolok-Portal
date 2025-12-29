import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Spinner from "react-bootstrap/Spinner";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { decryptData } from "../../../../Utils/encrypt";
import {
  enquiryStatusUpdate,
  fetchEnquiryDocument,
} from "../../../../Redux/Actions/Enquiry/enquiryReportAction";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import { fetchDoc } from "../../../../Redux/Actions/MasterPage/LawyerDocumentAction";
import FileView from "../../../../Utils/FileView/FileView";
import { RedoModel } from "../../../Enquiry/Reusable/RedoStatus";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";
import { DateFormatcustom } from "../../../../Utils/DateFormatcustom";
import customStyle from "../../../../Utils/tableStyle";
import AddMoreGoogle from "./ResubleGoogleDoc/AddMoreGoogle";
import AddMoreViewGoogle from "./ResubleGoogleDoc/AddMoreViewGoogle";
import AddMoreDocDetailsViewGoogle from "./ResubleGoogleDoc/AddMoreDocDetailsViewGoogle";
import AddMoreDocDetailsGoogle from "./ResubleGoogleDoc/AddMoreDocDetailsGoogle";

const UpdateDocumentGoogleMap = () => {
  const dispatch = useDispatch();
  const { eid, id, status } = useParams();
  const decryEid = decryptData(eid);

  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [loadingPage, setLoadingPage] = useState(true);
  const [isAddMoreDetails, setIsAddMoreDetails] = useState(false);
  const [isAddMoreDetailsView, setIsAddMoreDetailsView] = useState(false);

  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  useEffect(() => {
    const fetchData = async () => {
      const payload = {
        id: eid,
        staffid: staffid.loginid,
      };
      try {
        await dispatch(fetchEnquiryDocument(payload));
        setLoadingPage(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch, staffid.loginid]);

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
    const payload = {
      id: eid,
      staffid: staffid.loginid,
    };
    try {
      await axios.delete(`${API_BASE_URL}/docdelete/${deleteId}`);
      Toast({ message: "Successfully Deleted", type: "success" });
      setDeleteDialog(false);
      await dispatch(fetchEnquiryDocument(payload));
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

  const [documentVisible, setDocumentVisible] = useState(false);
  const columns = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Date",
      // selector: (row) => DateFormatcustom(row.created_at),
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
      // selector: (row) => AgeCalculate(row.created_at),
      selector: (row) => row.age,

      sortable: true,
    },

    {
      name: "View/Upload",
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

            {/* <button
              type="button"
              className="btn btn-info rounded-0 ms-2"
              onClick={() => {
                openAddDocModal();
                setUploadDocData(row);
              }}
            >
              <AddIcon />
            </button> */}
            {staffid.logintype === "staff" &&
              enquiryDoumentData?.status !== "live" && (
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
          </div>
        </>
      ),
    },

    {
      name: "Add Details",
      cell: (row) => {
        const handleClick = () => {
          if (row.document) {
            if (row.upload_type === "document") {
              setIsAddMoreDetails(true);
            } else {
              setIsModalAddMore(true);
            }
            setDocId(row);
          }
        };
        const handleClickView = () => {
          if (row.document) {
            if (row.upload_type === "document") {
              setIsFillView(true);
            } else {
              setIsModalAddMoreView(true);
            }
            setDocId(row);
          }
        };

        return (
          <>
            {staffid.logintype === "staff" && enquiryDoumentData?.status !== "live" ? (
              <button
                type="button"
                className="btn btn-primary rounded-0"
                onClick={handleClick}
              >
                Fill Details..
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary rounded-0"
                // onClick={() => {
                //   if (row.document) {
                //     setIsModalAddMoreView(true);
                //     setDocId(row);
                //   }
                // }}
                onClick={handleClickView}
              >
                View
              </button>
            )}
          </>
        );
      },
    },

    {
      name: "Status",
      cell: (row) => {
        const handleClick = () => {
          // if (row.document) {
          if (row.upload_type === "document") {
            setDocumentVisible(true);
          } else {
            openModalDoc();
            setDocId(row);
          }
          setDocId(row);
          // }
        };
        return (
          <>
            <button
              type="button"
              className={`badge rounded-pill btnhover btn p-2 ${row.status == "verify"
                ? "bg-success"
                : row.status == "pending"
                  ? "bg-danger"
                  : "bg-info"
                }`}
              style={{ width: "60px" }}
              // onClick={() => {
              //   if (staffid.logintype == "staff") {
              //     openModalDoc();
              //     setDocId(row);
              //   }
              // }}
              onClick={() => {
                if (
                  staffid.logintype !== "admin" &&
                  enquiryDoumentData?.status !== "live"
                ) {
                  openModalDoc();
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
        );
      },
      sortable: true,
    },
    {
      name: "Redo Status",
      cell: (row) => (
        <>
          <button
            type="button"
            className={`btn btn-outline-info`}
            onClick={() => {
              openModalRedo();
              setDocId(row);
            }}
          >
            {row.redocount}
          </button>
        </>
      ),
      sortable: true,
    },
    {
      name: "Verified Date",
      selector: (row) => row.veryfi_date,
      sortable: true,
    },

    ...(staffid.Login == "staff" &&
      (status == "pending" || status === "complete") && enquiryDoumentData?.status !== "live"
      ? [
        {
          name: "Actions",
          cell: (row) =>
            row.upload_type === "document" ? (
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

  // document status modal
  const [docId, setDocId] = useState("");
  const [docIdView, setDocIdView] = useState("");

  const [isModalDoc, setIsModalDoc] = useState(false);
  const openModalDoc = () => {
    setIsModalDoc(true);
  };
  const closeModalDoc = () => {
    setIsModalDoc(false);
  };

  //add document   modal
  const [uploadDocData, setUploadDocData] = useState({});
  const [addDocModal, setAddDocModal] = useState(false);
  const openAddDocModal = () => {
    setAddDocModal(true);
  };
  const closeAddDocModal = () => {
    setAddDocModal(false);
  };

  // Remark view modal
  const [isModalRedo, setIsModalRedo] = useState(false);
  const openModalRedo = () => {
    setIsModalRedo(true);
  };
  const closeModalRedo = () => {
    setIsModalRedo(false);
    setDocId("");
  };

  const navigate = useNavigate();

  //  add more
  const [isModalAddMore, setIsModalAddMore] = useState(false);
  const [isModalAddMoreView, setIsModalAddMoreView] = useState(false);
  const [isFillView, setIsFillView] = useState(false);
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false)


  const handleConfirm = async () => {
    setConfirmLoading(true)
    try {
      await axios.post(
        `${API_BASE_URL}/servicedocverify`,
        { id: eid },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Toast({ message: "Successfully Updated", type: "success" });
      setConfirmLoading(false)
      navigate("/documentmap#Complete");
    } catch (error) {
      const errorMessage =
        error.response?.data?.messages?.error ||
        error.message ||
        "Failed to update";
      setErrorMsg(errorMessage);
      handleOpenModal();
      setConfirmLoading(false)
    }
  };

  // error alert
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModals = () => setModalOpen(false);

  // add document
  const [postLoading, setPostLoading] = useState(false)
  const onSubmit = async (values) => {
    const payload = {
      id: eid,
      staffid: staffid.loginid,
    };
    const updateData = {
      ...values,
      enqid: eid,
      userid: id,
    };
    setPostLoading(true)

    try {
      await axios.post(`${API_BASE_URL}/lawyer`, updateData, {
        headers: {
          "Content-Type": "application/json",
          "Gl-Status": "document",
        },
      });
      setPostLoading(false)
      setVisible(false);
      formik.resetForm();
    } catch (error) {
      setPostLoading(false)
    } finally {
      dispatch(fetchEnquiryDocument(payload));
      // fetchEnqData();
    }
  };
  const [visible, setVisible] = useState(false);
  const formik = useFormik({
    initialValues: {
      docname: "",
    },
    validationSchema: yup.object().shape({
      docname: yup.string().required("document  is required!!"),
    }),
    onSubmit,
  });
  // const dispatch = useDispatch();
  const selectOptions = useSelector((state) => state.LawyerDocument.lawyerDoc);

  useEffect(() => {
    dispatch(fetchDoc());
  }, [dispatch]);
  return (
    <>
      <FileView
        isOpen={isModalOpenFile}
        closeModal={closeModalFile}
        fileUrls={url}
      />

      <DocumentModel
        isOpen={isModalDoc}
        closeModal={closeModalDoc}
        primaryID={eid}
        id={docId}
        staff={staffid}
      />

      <AddDocumentModel
        isOpen={addDocModal}
        closeModal={closeAddDocModal}
        uploadDocData={uploadDocData}
        staff={staffid}
        eid={eid}
      />

      <RedoModel isOpen={isModalRedo} closeModal={closeModalRedo} id={docId} />

      <ConfirmationModal
        isOpen={verifyConfirm}
        closeModal={() => setIsVerifyConfirm(false)}
        onConfirm={handleConfirm}
        message={"Are you sure this has been verified?"}
        loading={confirmLoading}
      />

      <AddMoreGoogle
        isOpen={isModalAddMore}
        closeModal={() => setIsModalAddMore(false)}
        id={docId}
      />
      <AddMoreViewGoogle
        isOpen={isModalAddMoreView}
        closeModal={() => setIsModalAddMoreView(false)}
        id={docId}
      />
      {/* <AddMoreDocDetailsGoogle
      isOpen={isAddMoreDetails}
      closeModal={() => setIsAddMoreDetails(false)}
      id={docId}
      eid={eid}
      iid={id}
      status={status}
    /> */}
      <AddMoreDocDetailsViewGoogle
        isOpen={isFillView}
        closeModal={() => setIsFillView(false)}
        data={docId}
      />

      <AlertPop
        isOpen={modalOpen}
        onClose={handleCloseModals}
        message={errorMsg}
      />
      <AddMoreDocDetailsGoogle
        isOpen={isAddMoreDetails}
        closeModal={() => setIsAddMoreDetails(false)}
        id={docId}
        eid={eid}
        iid={id}
        status={status}
      // props={props.data}
      />

      <section className="section">
        <div className="container-fluid">
          {loadingPage ? (
            <div
              style={{
                height: "32vh",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Spinner className="mt-auto" />
            </div>
          ) : (
            <>
              <div className="row">
                {status == "pending" && (
                  <div className="col-12">
                    <div className="d-flex justify-content-end">
                      <div
                        className="p-2 d-flex align-items-center mb-2 text-white"
                        style={{
                          cursor: "pointer",
                          background: "#2f4f4f",
                          clipPath: `polygon(20% 0, 100% 0, 100% 100%, 20% 100%, 0 50%)`,
                          justifyContent: "center",
                          width: "100px",
                          fontSize: "13px",
                        }}
                        onClick={() => navigate(-1)}
                      >
                        <ArrowBackIcon /> back
                      </div>
                    </div>
                    <div className="card shadow border-0">
                      <div className="row p-3 align-items-center">
                        <div className="col-4">
                          <div
                            style={{ width: 130, height: 130, margin: "auto" }}
                          >
                            <CircularProgressbar
                              value={"100"}
                              text={enquiryDoumentData.age}
                              styles={buildStyles({
                                textSize: "20px",
                                pathColor: "#ffae42",
                                textColor: "black",
                                trailColor: "#d6d6d6",
                                backgroundColor: "#3e98c7",
                              })}
                            />
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="">
                            <p className="mb-3" style={{ fontSize: "13px" }}>
                              <b>Name :</b>
                              {enquiryDoumentData.customer}
                            </p>
                            <p className="mb-3" style={{ fontSize: "13px" }}>
                              <b>Enquiry ID :</b> ENQID{enquiryDoumentData.id}
                            </p>
                            <p className="mb-3" style={{ fontSize: "13px" }}>
                              <b>Mobile :</b> {enquiryDoumentData.mobile}
                            </p>
                            <p className="mb-3" style={{ fontSize: "13px" }}>
                              <b>Email :</b> {enquiryDoumentData.email_id}
                            </p>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="">
                            <p className="mb-3" style={{ fontSize: "13px" }}>
                              <b>Enquiry Date :</b>{" "}
                              {DateFormatcustom(enquiryDoumentData.updated_at)}
                            </p>
                            <p className="mb-3" style={{ fontSize: "13px" }}>
                              <b>Property Type :</b>{" "}
                              {enquiryDoumentData.property_type}
                            </p>
                            <p className="mb-3" style={{ fontSize: "13px" }}>
                              <b>Subproperty Type :</b>{" "}
                              {enquiryDoumentData.subpro_name}
                            </p>
                            <p className="mb-3" style={{ fontSize: "13px" }}>
                              <b>Taken by :</b> {enquiryDoumentData.taken_by}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="col-12 mt-4">
                  <div className="card shadow border-0">
                    <div className="card shadow border-0 p-4">
                      <div className="d-flex justify-content-between">
                        <h6>Document Details</h6>
                        {staffid.Login === "staff" && enquiryDoumentData?.status !== "live" && (
                          <div className="ms-2">
                            <a
                              href="#"
                              // onClick={() => setIsModalAddDocument(true)}
                              onClick={() => setVisible(true)}
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
                        fixedHeader
                      />

                      {status == "pending" && staffid.logintype == "staff" && (
                        <div className="ms-2 text-end">
                          <button
                            onClick={() => setIsVerifyConfirm(true)}
                            className="btn1 me-2"
                            disabled={confirmLoading}
                          >
                            {confirmLoading ? "Processing...." : "Confirm"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Dialog
                header="Verify Document"
                visible={documentVisible}
                position={"top"}
                style={{ width: "50vw" }}
                onHide={() => {
                  if (!documentVisible) return;
                  setDocumentVisible(false);
                }}
                draggable={false}
                resizable={false}
              >
                <div>
                  <p style={{ fontWeight: "600" }}>
                    {" "}
                    <ErrorOutlineIcon sx={{ fontSize: 25 }} /> Are you sure you
                    want to proceed to closed ?
                  </p>
                </div>
              </Dialog>
            </>
          )}
        </div>
      </section>

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
            <select
              type="file"
              name="docname"
              id="docname"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.docname}
            >
              <option value=""> select document</option>
              {selectOptions?.map((item) => (
                <option value={item.id}>{item.document} </option>
              ))}
            </select>
            {formik.errors.docname && formik.touched.docname ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.docname}
              </p>
            ) : null}
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button className="btn1" type="submit" disabled={postLoading} >
              {postLoading ? "Adding..." : "Add"}
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
            Are you sure you want to delete the selected row
          </span>
        </div>
      </Dialog>
    </>
  );
};

export default UpdateDocumentGoogleMap;

const DocumentModel = ({ isOpen, closeModal, id, staff, primaryID }) => {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedStatus(value);
  };

  //remark set
  const [remarks, setRemarks] = useState("");
  const [remarkLoad, setRemarkLoad] = useState(false);
  const payload = {
    id: id,
    staffid: staff.loginid,
  };
  const handleUpdate = async () => {
    if (selectedStatus == "") {
      alert("Please select status");
      return;
    }

    const Data = {
      status: selectedStatus,
      id: id.id,
      remark: remarks,
      name: id.doc_type,
    };

    setRemarkLoad(true);
    const payload = {
      id: id.eid,
      staffid: staff.loginid,
    };

    try {
      await dispatch(enquiryStatusUpdate(Data, setErrorMsg, handleOpenModal));
      dispatch(fetchEnquiryDocument(payload));
      handleCloseModal();
    } catch (error) { }
  };

  const handleCloseModal = () => {
    setRemarkLoad(false);
    setRemarks("");
    setSelectedStatus("");
    closeModal();
  };

  // error alert
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModals = () => setModalOpen(false);

  return (
    <>
      <AlertPop
        isOpen={modalOpen}
        onClose={handleCloseModals}
        message={errorMsg}
      />
      <div
        className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="d-flex" style={{ alignItems: "center" }}>
              <h4 className="page_subheading m-3">Status Update</h4>
              <button
                type="button"
                className="close closebutton"
                onClick={handleCloseModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <hr className="m-0" />
            <div className="card-body p-3">
              <form>
                <div className="row">
                  <div className="col-sm-4">
                    <label className="form-label">Status</label>
                  </div>
                  <div className="col-sm-8">
                    <select
                      name="selectedStatus"
                      className="form-select"
                      value={selectedStatus || id.status}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="">--Select Status--</option>
                      <option value="verify">Verify</option>
                      <option value="redo">Redo</option>
                    </select>
                  </div>

                  {selectedStatus === "redo" && (
                    <>
                      <div className="col-sm-4 mt-3">
                        <label className="form-label">Remark</label>
                      </div>
                      <div className="col-8 mt-3">
                        <input
                          className="form-control"
                          rows="3"
                          name="remark"
                          placeholder="Remark"
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  <div className="text-end py-3 px-3">
                    <button
                      className="btn1 me-1"
                      type="button"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>

                    <button
                      type="button"
                      className="btn1"
                      onClick={handleUpdate}
                      disabled={remarkLoad}
                    >
                      {remarkLoad ? (
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

const AddDocumentModel = ({
  isOpen,
  closeModal,
  uploadDocData,
  staff,
  eid,
}) => {
  // const staffid = JSON.parse(sessionStorage.getItem("token"));

  const dispatch = useDispatch();
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
    const payload = {
      id: eid,
      staffid: staff.loginid,
    };
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
            "Gl-Status": "document",
          },
        }
      );
      setLoading(false);
      Toast({ message: "Successfully Uploaded", type: "success" });
      dispatch(fetchEnquiryDocument(payload));
      setError("");
      fileInputRef.current.value = "";
      setSelectedFile(null);
      closeModal();
    } catch (error) {
      Toast({ message: "Failed to upload", type: "error" });
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
