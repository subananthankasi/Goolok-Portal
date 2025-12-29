import React, { useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import Button from "@mui/material/Button";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import { TabView, TabPanel } from "primereact/tabview";
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL, { IMG_PATH } from "../../../Api/api";
import Toast from "../../../Utils/Toast";
import {
  enquiryStatusUpdate,
  fetchEnquiryDocument,
} from "../../../Redux/Actions/Enquiry/enquiryReportAction";
import { fetchDoc } from "../../../Redux/Actions/MasterPage/LawyerDocumentAction";
import ConfirmationModal from "../../../Utils/ConfirmationModal";
import AlertPop from "../../../Utils/AlertPop";
import FileView from "../../../Utils/FileView/FileView";
import customStyle from "../../../Utils/tableStyle";
import { Skeleton } from "primereact/skeleton";



const UploadDocumentsTele = ({ eid, id }) => {
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState(null);

  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  const [loadingPage, setLoadingPage] = useState(true);
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
  useEffect(() => {
    fetchData();
  }, [dispatch, staffid.loginid]);

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
  //upload File
  const [uploadDocData, setUploadDocData] = useState({});
  const [addDocModal, setAddDocModal] = useState(false);
  const openAddDocModal = () => {
    setAddDocModal(true);
  };
  const closeAddDocModal = () => {
    setAddDocModal(false);
  };

  const [isModalDoc, setIsModalDoc] = useState(false);

  const closeModalDoc = () => {
    setIsModalDoc(false);
  };

  //........................................................................................

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
          <div className="d-flex gap-2">
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

            {staffid.logintype === "staff" && (
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
  ];

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
    try {
      await axios.post(`${API_BASE_URL}/lawyer`, updateData, {
        headers: {
          "Content-Type": "application/json",
          "Gl-Status": "document",
        },
      });
      setVisible(false);
      formik.resetForm();
    } catch (error) {
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
      <AddDocumentModel
        isOpen={addDocModal}
        closeModal={closeAddDocModal}
        uploadDocData={uploadDocData}
        staff={staffid}
        eid={eid}
      />
      {loadingPage ? (
        <div className="col-lg-12 mb-4 mt-4">
          <Skeleton height="14rem" width="100%" className="mb-1 " />
        </div>
      ) : (
        <div className="col-12 mt-4">
          <div className="card shadow border-0">
            <div className="card shadow border-0 p-4">
              <DataTable
                persistTableHead={true}
                columns={columns}
                data={enquiryDoumentData?.doc}
                customStyles={customStyle}
                pagination
                fixedHeader
              />
            </div>
          </div>
        </div>
      )}

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
            <button className="btn1" type="submit">
              Save{" "}
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default UploadDocumentsTele;

const AddDocumentModel = ({
  isOpen,
  closeModal,
  uploadDocData,
  staff,
  eid,
}) => {
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
