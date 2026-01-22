import DataTable from "react-data-table-component";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import customStyle from "../../../../Utils/tableStyle";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoc } from "../../../../Redux/Actions/MasterPage/LawyerDocumentAction";
import axios from "axios";
import Select from "react-select";
import Spinner from "react-bootstrap/Spinner";
import FileView from "../../../../Utils/FileView/FileView";
import AddIcon from "@mui/icons-material/Add";
import Toast from "../../../../Utils/Toast";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Dialog } from "primereact/dialog";

export const AddDocument = (props) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
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
      id: props.eid,
      staffid: staffid.loginid,
    };
    try {
      await axios.delete(`${API_BASE_URL}/docdelete/${deleteId}`);
      Toast({ message: "Successfully Deleted", type: "success" });
      setDeleteDialog(false);
      fetchDocData();
      // await dispatch(fetchEnquiryDocument(payload));
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
  const [enquiryDoumentData, setEnquiryDoumentData] = useState([]);

  const fetchDocData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/enquiryreport/${props.props.eid}/${staffid.loginid}`,
        {
          headers: {
            "Gl-Status": "mandatory ",
          },
        }
      );
      setEnquiryDoumentData(response.data);
      setLoadingPage(false);
    } catch (error) {
      console.error(error);
    }
  };
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
      cell: (row) => (
        <>
          <div className="d-flex">
            {row.upload_type == "mandatory" ? (
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

                {(props.props.status == "pending" ||
                  props.props.status == "complete") &&
                  staffid.Login == "staff" &&
                  props.props.pagetype !== "reminder" &&
                  enquiryDoumentData?.status !== "booking" && (
                    <button
                      type="button"
                      className="btn btn-info rounded-0 ms-2"
                      onClick={() => {
                        setAddDocModal(true);
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
    ...(staffid.Login == "staff" &&
      (props.props.status == "pending" || props.props.status == "complete") &&
      props.props.pagetype !== "reminder" && enquiryDoumentData?.status !== "booking"
      ? [
        {
          name: "Actions",
          cell: (row) =>
            row.upload_type === "mandatory" ? (
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

  const [loadingPage, setLoadingPage] = useState(true);


  useEffect(() => {
    fetchDocData();
  }, []);

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

  // add document
  const [isModalAddDocument, setIsModalAddDocument] = useState(false);
  const closeModal = () => {
    setIsModalAddDocument(false);
  };

  // file upload
  const [uploadDocData, setUploadDocData] = useState({});
  const [addDocModal, setAddDocModal] = useState(false);
  return (
    <>
      <Document
        isOpen={isModalAddDocument}
        // closeModal={() => setIsModalAddDocument(false)}
        closeModal={closeModal}
        eid={props.props.eid}
        userid={enquiryDoumentData.userid}
        fetchDocData={fetchDocData}
      />

      <FileView
        isOpen={isModalOpenFile}
        closeModal={closeModalFile}
        fileUrls={url}
      />
      <DocumentUpload
        isOpen={addDocModal}
        closeModal={() => setAddDocModal(false)}
        uploadDocData={uploadDocData}
        fetchEnqData={fetchDocData}
      />

      {loadingPage ? (
        " "
      ) : (
        <div>
          <div className="d-flex justify-content-between mb-3">
            <h6>Document</h6>

            {(props.props.status == "pending" ||
              props.props.status == "complete") &&
              staffid.Login == "staff" &&
              props.props.pagetype !== "reminder" &&
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

export default AddDocument;

const Document = ({ isOpen, closeModal, eid, userid, fetchDocData }) => {
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
          "Gl-Status": "mandatory",
        },
      });
    } catch (error) {
    } finally {
      setloading(false);
      closeModal();
      fetchDocData();
      setSelectedData(null);
    }
  };
  const closeModaling = () => {
    setSelectedData(null);
    closeModal();
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
                onClick={closeModaling}
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
            "Gl-Status": "mandatory",
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
      fileInputRef.current.value = "";
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
