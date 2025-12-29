import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnquiryDocument } from "../../../Redux/Actions/Enquiry/enquiryReportAction";
import DataTable from "react-data-table-component";
import customStyle from "../../../Utils/tableStyle";
import Spinner from "react-bootstrap/Spinner";
import { RedoModel } from "../Reusable/RedoStatus";
import API_BASE_URL, { IMG_PATH } from "../../../Api/api";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FileView from "../../../Utils/FileView/FileView";
import { AddMoreView } from "./AddMoreView";
import { AddMore } from "./AddMore";
import AddMoreDocumentDetails from "../DocumentVerification/AddMoreDocumentDetails";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Toast from "../../../Utils/Toast";
import AddMoreDocumentView from "../DocumentVerification/AddMoreDocumentView";

export const DocumentVerification = ({ eid, status,pagetype }) => {
  const dispatch = useDispatch();
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [loadingPage, setLoadingPage] = useState(true);
  const [isAddMoreDetails, setIsAddMoreDetails] = useState(false);
  const [isModalAddMoreView, setIsModalAddMoreView] = useState(false);

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
  }, [dispatch, eid, staffid.loginid]);

  const [uploadDocData, setUploadDocData] = useState({});
  const [addDocModal, setAddDocModal] = useState(false);
  const openAddDocModal = () => {
    setAddDocModal(true);
  };
  const closeAddDocModal = () => {
    setAddDocModal(false);
  };
  const [isFillView, setIsFillView] = useState(false);
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
            {staffid.logintype === "staff" &&
              (status === "pending" || status === "complete") && (
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
    // {
    //   name: "Fill Details",
    //   cell: (row) => {
    //     const handleClick = () => {
    //       if (row.document) {
    //         if (row.upload_type === "document") {
    //           setIsAddMoreDetails(true);
    //         } else {
    //           setIsModalAddMore(true);
    //         }
    //         setDocId(row);
    //       }
    //     };

    //     return (
    //       <>
    //         {staffid.logintype === "staff"  ? (
    //           <button
    //             type="button"
    //             className="btn btn-primary rounded-0"
    //             onClick={handleClick}
    //           >
    //             Fill Details..
    //           </button>
    //         ) : (
    //           <button
    //             type="button"
    //             className="btn btn-primary rounded-0"
    //             onClick={() => {
    //               if (row.document) {
    //                 setIsModalAddMoreView(true);
    //                 setDocId(row);
    //               }
    //             }}
    //           >
    //             View
    //           </button>
    //         )}
    //       </>
    //     );
    //   },
    // },
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
          } else {
            Toast({ message: "please upload document", type: "info" });
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
            {staffid.logintype === "staff" &&
              enquiryDoumentData?.status !== "booking" && pagetype !=="reminder"  ? (
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
      cell: (row) => (
        <>
          <button
            type="button"
            className={`badge rounded-pill btnhover btn p-2 ${row.status == "verify" ? "bg-success" : "bg-danger"
              }`}
            style={{ width: "60px" }}
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

  //  add more
  const [isModalAddMore, setIsModalAddMore] = useState(false);

  return (
    <>
      <AddDocumentModel
        isOpen={addDocModal}
        closeModal={closeAddDocModal}
        uploadDocData={uploadDocData}
        staff={staffid}
        eid={eid}
      />
      <FileView
        isOpen={isModalOpenFile}
        closeModal={closeModalFile}
        fileUrls={url}
      />
      <RedoModel isOpen={isModalRedo} closeModal={closeModalRedo} id={docId} />

      <AddMoreView
        isOpen={isModalAddMoreView}
        closeModal={() => setIsModalAddMoreView(false)}
        id={docId}
      />
      <AddMoreDocumentView
        isOpen={isFillView}
        closeModal={() => setIsFillView(false)}
        data={docId}
      />
      <AddMore
        isOpen={isModalAddMore}
        closeModal={() => setIsModalAddMore(false)}
        id={docId}
      />
      <AddMoreDocumentDetails
        isOpen={isAddMoreDetails}
        closeModal={() => setIsAddMoreDetails(false)}
        id={docId}
        eid={eid}
        // iid={id}
        status={status}
      // props={props.data}
      />
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
        <div className="">
          <div className="col-12 mt-4">
            <div className="card shadow border-0">
              <div className="card shadow border-0 p-4">
                <div className="d-flex justify-content-between">
                  <h6>Document Details</h6>
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
              </div>
            </div>
          </div>
        </div>
      )}
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
