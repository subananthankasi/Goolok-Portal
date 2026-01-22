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
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import {
  enquiryStatusUpdate,
  fetchEnquiryDocument,
} from "../../../../Redux/Actions/Enquiry/enquiryReportAction";
import { fetchDoc } from "../../../../Redux/Actions/MasterPage/LawyerDocumentAction";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";
import customStyle from "../../../../Utils/tableStyle";
import { DateFormatcustom } from "../../../../Utils/DateFormatcustom";
import { useNavigate } from "react-router-dom";
import AddMorePlot from "./AddMorePlot";
import AnotherAddMorePlot from "./AnotherAddMorePlot";
import FileView from "../../../../Utils/FileView/FileView";

const WholeDocPlot = ({ eid, id, status, pagetype }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const [loadingPage, setLoadingPage] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [viewDetails, setViewDetails] = useState(false);
  const navigate = useNavigate();

  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

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
  //Add More
  const [isModalAddMore, setIsModalAddMore] = useState(false);
  const [anotherAdd, setAnotherAdd] = useState(false);
  const [docId, setDocId] = useState("");
  const [isModalDoc, setIsModalDoc] = useState(false);
  const openModalDoc = () => {
    setIsModalDoc(true);
  };
  const closeModalDoc = () => {
    setIsModalDoc(false);
  };

  // Redoview modal
  const [isModalRedo, setIsModalRedo] = useState(false);
  const openModalRedo = () => {
    setIsModalRedo(true);
  };
  const closeModalRedo = () => {
    setIsModalRedo(false);
    setDocId("");
  };
  ///Viewdatas....................
  const [pattaOneview, setPattaOneView] = useState([]);
  const [pattaTwoview, setPattaTwoView] = useState([]);
  const [titleOneview, setTitleOneView] = useState([]);
  const [titlTwoview, setTitleTwoView] = useState([]);
  const [aadharData, setAadharData] = useState([]);
  const [anotherDocView, setAnotherDocView] = useState([]);
  const [projectData, setProjectData] = useState([]);

  const [viewData, setViewData] = useState([]);

  const fetchPattaOneView = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/enquirypatta/${id}`);
      setPattaOneView(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchPattaTwoView = async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/enquirypatta/${id}/edit`
      );
      setPattaTwoView(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTitleDocument = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/enquirydeed/${id}`);
      setTitleTwoView(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTitleSurvey = async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/enquirydeed/${id}/edit`
      );
      const dataValue = response?.data?.map((map, index) => ({
        ...map,
        sno: index + 1,
      }));
      setTitleOneView(dataValue);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchAadhar = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/enqaadhar/${id}`);
      setAadharData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const anotherDocViewFetch = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/alldetails/${id}`);
      setAnotherDocView(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  const fetchTitleProjectDetails = async (eid) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/prdetail/${eid}`);
      setProjectData(response.data?.[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (viewData?.id && viewData.doc_type === "Patta") {
      fetchPattaOneView(viewData?.id);
      fetchPattaTwoView(viewData?.id);
    } else if (viewData?.id && viewData.doc_type === "Title document") {
      fetchTitleSurvey(viewData?.id);
      fetchTitleDocument(viewData?.id);
      fetchTitleProjectDetails(viewData?.eid);
    } else if (viewData?.id && viewData.doc_type === "Aadhaar") {
      fetchAadhar(viewData?.id);
    }
  }, [viewData]);
  useEffect(() => {
    if (viewData?.id && viewData?.upload_type === "document") {
      anotherDocViewFetch(viewData?.id);
    }
  }, [viewData]);
  const anotherData = anotherDocView?.details
    ? JSON.parse(anotherDocView.details)
    : {};

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

            {staffid.logintype === "staff" && pagetype !== "reminder" && enquiryDoumentData?.status !== "booking" && (
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
      name: "Fill Details",
      cell: (row) => {
        const handleClick = () => {
          if (row.document) {
            if (row.upload_type === "document") {
              setAnotherAdd(true);
            } else {
              setIsModalAddMore(true);
            }
            setDocId(row);
          }
          else {
            Toast({ message: "please upload document", type: "info" });
          }
        };
        return (
          <>
            {staffid.logintype === "staff" && pagetype !== "reminder" && enquiryDoumentData?.status !== "booking" ? (
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
                onClick={() => {
                  setViewDetails(true);
                  setViewData(row);
                }}
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
                  enquiryDoumentData?.status !== "booking" &&
                  pagetype !== "reminder"
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
      (status == "pending" || status === "complete") &&
      pagetype !== "reminder" && enquiryDoumentData?.status !== "booking"
      ? [
        {
          name: "Actions",
          cell: (row) =>
            row.upload_type === "document" ? (
              <button
                type="button"
                className="btn btn-outline-danger delete"
                onClick={() => {
                  setDeleteDialog(true);
                  setDeleteId(row.id);
                }}
              >
                <DeleteIcon />
              </button>
            ) : null,
        },
      ]
      : []),
  ];
  const showOldFields = pattaTwoview?.some(
    (row) => row.old_survey_no || row.old_sub_division
  );
  const showTitleOldFields = titleOneview?.some(
    (row) => row.old_survey || row.old_division
  );

  const columnPattaSurveyView = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Survey NO",
      selector: (row) => row.survey_no,
      sortable: true,
    },
    {
      name: "Sub Division",
      selector: (row) => row.sub_division,
      sortable: true,
    },
    {
      name: "Hectare",
      selector: (row) => row.hectare,
      sortable: true,
    },
    ...(showOldFields
      ? [
        {
          name: "Old Survey No",
          selector: (row) => row.old_survey_no,
          sortable: true,
        },
        {
          name: "Old Sub Division",
          selector: (row) => row.old_sub_division,
          sortable: true,
        },
      ]
      : []),
  ];
  const columnTitleSurveyView = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Survey NO",
      selector: (row) => row.survey_no,
      sortable: true,
    },
    {
      name: "Sub Division",
      selector: (row) => row.sub_division,
      sortable: true,
    },
    {
      name: "Extent",
      selector: (row) => row.extent,
      sortable: true,
    },
    {
      name: "Units",
      selector: (row) => row.units,
      sortable: true,
    },
    ...(showTitleOldFields
      ? [
        {
          name: "Old Survey No",
          selector: (row) => row.old_survey,
          sortable: true,
        },
        {
          name: "Old Sub Division",
          selector: (row) => row.old_division,
          sortable: true,
        },
      ]
      : []),
  ];
  const [visibleLoading, setVisibleLoading] = useState(false)
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
    setVisibleLoading(true)
    try {
      await axios.post(`${API_BASE_URL}/lawyer`, updateData, {
        headers: {
          "Content-Type": "application/json",
          "Gl-Status": "document",
        },
      });
      setVisible(false);
      formik.resetForm();
      setVisibleLoading(false)
    } catch (error) {
      setVisibleLoading(false)
    } finally {
      dispatch(fetchEnquiryDocument(payload));
      setVisibleLoading(false)
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

  const [modalOpen, setModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModals = () => setModalOpen(false);
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleConfirm = async () => {
    setConfirmLoading(true)
    try {
      await axios.post(
        `${API_BASE_URL}/enqupdate`,
        { id: eid },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Toast({ message: "Successfully Updated", type: "success" });
      navigate("/plot_document#Complete");
      setConfirmLoading(false)
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
  return (
    <>
      <ConfirmationModal
        isOpen={verifyConfirm}
        closeModal={() => setIsVerifyConfirm(false)}
        onConfirm={handleConfirm}
        message={"Are you sure this has been verified?"}
        loading={confirmLoading}
      />
      <AlertPop
        isOpen={modalOpen}
        onClose={handleCloseModals}
        message={errorMsg}
      />
      {/* <FileViewUtils
        isOpen={isModalOpenFile}
        closeModal={closeModalFile}
        fileUrls={url}
      /> */}
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
      <VerifyModel
        isOpen={isModalDoc}
        closeModal={closeModalDoc}
        primaryID={eid}
        id={docId}
        staff={staffid}
      />
      <RedoModel isOpen={isModalRedo} closeModal={closeModalRedo} id={docId} />

      <AddMorePlot
        isOpen={isModalAddMore}
        closeModal={() => setIsModalAddMore(false)}
        data={docId}
      />
      <AnotherAddMorePlot
        isOpen={anotherAdd}
        closeModal={() => setAnotherAdd(false)}
        data={docId}
      />
      <div className="col-12 mt-4">
        <div className="card shadow border-0">
          <div className="card shadow border-0 p-4">
            <div className="d-flex justify-content-between">
              <h6>Document Details</h6>
              {staffid.Login === "staff" && pagetype !== "reminder" && enquiryDoumentData?.status !== "booking" && (
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
            <hr />

            <DataTable
              persistTableHead={true}
              columns={columns}
              data={enquiryDoumentData?.doc}
              customStyles={customStyle}
              pagination
              fixedHeader
            />

            {status == "pending" &&
              staffid.logintype == "staff" &&
              pagetype !== "reminder" && (
                <div className="ms-2 text-end">
                  <button
                    href="#0"
                    onClick={() => setIsVerifyConfirm(true)}
                    className="btn1 me-2"
                    disabled={confirmLoading}
                  >
                    {confirmLoading ? "Processing..." : "Confirm"}
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>

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
            <button className="btn1" type="submit" disabled={visibleLoading}>
              {visibleLoading ? "Processing..." : "Save"}
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
      <Dialog
        visible={viewDetails}
        style={{ width: "62rem", height: "35rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="View Details"
        modal
        onHide={() => setViewDetails(false)}
      >
        {viewData?.upload_type === "document" ? (
          <>
            <>
              <h6 className="text-center">{viewData?.doc_type} Details </h6>
              <hr />
              {Object.entries(anotherData).map(([key, value], index) => (
                <div className="row mb-2" key={index}>
                  <div className="col-6 mt-4">
                    <strong>{key} :</strong>
                  </div>
                  <div className="col-6 mt-4">{value}</div>
                </div>
              ))}
            </>
          </>
        ) : viewData?.doc_type === "Aadhaar" ? (
          <>
            <h6 className="text-center">Aadhar Details </h6>
            <hr />
            <div className="row">
              <div className="col-6">
                <div className="row mt-5">
                  <div className="col-6">Aadhar Name :</div>
                  <div className="col-6">{aadharData?.aadhar_name}</div>
                </div>
                <div className="row mt-5">
                  <div className="col-6">Fathers Name :</div>
                  <div className="col-6">{aadharData?.father_name}</div>
                </div>
              </div>
              <div className="col-6">
                <div className="row mt-5">
                  <div className="col-6">Aadhar Number :</div>
                  <div className="col-6">{aadharData?.aadhar_number}</div>
                </div>
                <div className="row mt-5">
                  <div className="col-6">Address : </div>
                  <div className="col-6">{aadharData?.address}</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <TabView>
              <TabPanel header={`${viewData?.doc_type} Details 1`}>
                {viewData?.doc_type === "Patta" && (
                  <div className="row">
                    <div className="col-6">
                      <div className="row mt-5">
                        <div className="col-6">Patta No :</div>
                        <div className="col-6">{pattaOneview?.pattano}</div>
                      </div>
                      <div className="row mt-5">
                        <div className="col-6">Patta Name :</div>
                        <div className="col-6">{pattaOneview?.pattaname}</div>
                      </div>
                      <div className=" row mt-5">
                        <div className="col-6">Patta Date :</div>
                        <div className="col-6">{pattaOneview?.date}</div>
                      </div>
                      <div className=" row mt-5">
                        <div className="col-6"> District :</div>
                        <div className="col-6">
                          {pattaOneview?.districtName}
                        </div>
                      </div>
                      <div className=" row mt-5">
                        <div className="col-6">Revenue village :</div>
                        <div className="col-6">{pattaOneview?.villageName}</div>
                      </div>
                      {pattaOneview?.block && (
                        <div className=" row mt-5 mb-5">
                          <div className="col-6"> Block :</div>
                          <div className="col-6">{pattaOneview?.block}</div>
                        </div>
                      )}
                    </div>
                    <div className="col-6">
                      <div className="row mt-5">
                        <div className="col-6">Patta Type :</div>
                        <div className="col-6">{pattaOneview?.patta_type}</div>
                      </div>
                      <div className="row mt-5">
                        <div className="col-6">Fathers Name :</div>
                        <div className="col-6">{pattaOneview?.father_name}</div>
                      </div>
                      <div className=" row mt-5">
                        <div className="col-6">State :</div>
                        <div className="col-6">{pattaOneview?.stateName}</div>
                      </div>
                      <div className=" row mt-5">
                        <div className="col-6"> Taluk :</div>
                        <div className="col-6">{pattaOneview?.talukName}</div>
                      </div>
                      <div className=" row mt-5">
                        <div className="col-6">Classification :</div>
                        <div className="col-6">
                          {pattaOneview?.classification}
                        </div>
                      </div>
                      {pattaOneview?.ward && (
                        <div className=" row mt-5 mb-5">
                          <div className="col-6"> Ward :</div>
                          <div className="col-6">{pattaOneview?.ward}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {viewData?.doc_type === "Title document" && (
                  <div className="row">
                    <div className="col-6">
                      <div className="row mt-5">
                        <div className="col-6">Village Type :</div>
                        <div className="col-6">{titlTwoview?.areatype}</div>
                      </div>
                      <div className="row mt-5">
                        <div className="col-6">Title document no :</div>
                        <div className="col-6">{titlTwoview?.document}</div>
                      </div>
                      <div className="row mt-5">
                        <div className="col-6">Register Date :</div>
                        <div className="col-6">{titlTwoview?.registerDate}</div>
                      </div>
                      <div className=" row mt-5">
                        <div className="col-6">Property type :</div>
                        <div className="col-6">{titlTwoview?.type}</div>
                      </div>
                      <div className=" row mt-5">
                        <div className="col-6"> District :</div>
                        <div className="col-6">{titlTwoview?.districtName}</div>
                      </div>
                      <div className=" row mt-5">
                        <div className="col-6">Revenue village :</div>
                        <div className="col-6">{titlTwoview?.villageName}</div>
                      </div>
                      {titlTwoview?.ward && (
                        <div className=" row mt-5 mb-5">
                          <div className="col-6"> Ward :</div>
                          <div className="col-6">{titlTwoview?.ward}</div>
                        </div>
                      )}
                    </div>
                    <div className="col-6">
                      <div className="row mt-5">
                        <div className="col-6">Title document Name :</div>
                        <div className="col-6">{titlTwoview?.title}</div>
                      </div>
                      <div className="row mt-5">
                        <div className="col-6">Present owner name :</div>
                        <div className="col-6">{titlTwoview?.ownerName}</div>
                      </div>
                      <div className=" row mt-5">
                        <div className="col-6">State :</div>
                        <div className="col-6">{titlTwoview?.stateName}</div>
                      </div>
                      <div className=" row mt-5">
                        <div className="col-6"> Taluk :</div>
                        <div className="col-6">{titlTwoview?.talukName}</div>
                      </div>
                      <div className=" row mt-5">
                        <div className="col-6">Sro :</div>
                        <div className="col-6">{titlTwoview?.sro_title}</div>
                      </div>
                      {titlTwoview?.block && (
                        <div className=" row mt-5 mb-5">
                          <div className="col-6"> Ward :</div>
                          <div className="col-6">{titlTwoview?.block}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </TabPanel>
              <TabPanel header={`${viewData?.doc_type} Details 2`}>
                {viewData?.doc_type === "Patta" && (
                  <div>
                    <DataTable
                      persistTableHead={true}
                      columns={columnPattaSurveyView}
                      data={pattaTwoview}
                      customStyles={customStyle}
                      pagination
                      fixedHeader
                    />
                  </div>
                )}
                {viewData?.doc_type === "Title document" && (
                  <div>
                    <DataTable
                      persistTableHead={true}
                      columns={columnTitleSurveyView}
                      data={titleOneview}
                      customStyles={customStyle}
                      pagination
                      fixedHeader
                    />
                  </div>
                )}
              </TabPanel>
              {viewData?.doc_type === "Title document" && (
                <TabPanel header="Project Details">
                  <div className="row">
                    <div className="col-6">
                      <div className="row mt-5">
                        <div className="col-6">Project name :</div>
                        <div className="col-6">{projectData?.project_name}</div>
                      </div>
                      <div className="row mt-5">
                        <div className="col-6">Approval No :</div>
                        <div className="col-6">{projectData?.approval_no}</div>
                      </div>
                      <div className=" row mt-5">
                        <div className="col-6">Extent in units.:</div>
                        <div className="col-6">{projectData?.builtup_area}</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className=" row mt-5">
                        <div className="col-6">Approval Type :</div>
                        <div className="col-6">
                          {projectData?.approval_type}
                        </div>
                      </div>
                      <div className=" row mt-5">
                        <div className="col-6"> Plot No. :</div>
                        <div className="col-6">{projectData?.builtup_area}</div>
                      </div>

                    </div>
                  </div>
                </TabPanel>
              )}
            </TabView>
          </>
        )}
      </Dialog>
    </>
  );
};

export default WholeDocPlot;

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
      fileInputRef.current.value = "";
      setSelectedFile(null);
      setError("");
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

const VerifyModel = ({ isOpen, closeModal, id, staff, primaryID }) => {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedStatus(value);
  };

  //remark set
  const [remarks, setRemarks] = useState("");
  const [remarkLoad, setRemarkLoad] = useState(false);

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

const RedoModel = ({ isOpen, closeModal, id }) => {
  const columns = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: "Redo Date",
      selector: (row) => DateFormatcustom(row.notif_time),
      sortable: true,
      width: "150px",
    },
    {
      name: "Remark",
      selector: (row) => row.notif_content,
      sortable: true,
      // wrap: true,
    },
  ];

  const [data, setData] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/enquiryreport/${id.id}/edit`
        );
        setData(response.data);
        setLoadingPage(false);
      } catch (error) {
        setLoadingPage(false);
      }
    };
    if (id) {
      setLoadingPage(true);
      fetchData();
    }
  }, [id]);
  return (
    <>
      <div
        className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-l" role="document">
          <div className="modal-content  ">
            <div className="d-flex" style={{ alignItems: "center" }}>
              <h4 className="page_subheading m-3">Redo Details</h4>
              <button
                type="button"
                className="close closebutton"
                onClick={() => {
                  closeModal();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <hr className="m-0" />
            <div className="card-body p-3">
              <form>
                {loadingPage ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Spinner className="mt-auto" />
                  </div>
                ) : (
                  <div className="row ">
                    <DataTable
                      persistTableHead={true}
                      columns={columns}
                      data={data}
                      customStyles={customStyle}
                      pagination
                      // selectableRows
                      fixedHeader
                    />
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
