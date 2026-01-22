import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import * as yup from "yup";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import customStyle from "../../../../Utils/tableStyle";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FileView from "../../../../Utils/FileView/FileView";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { enquiryStatusUpdate, fetchEnquiryDocument } from "../../../../Redux/Actions/Enquiry/enquiryReportAction";
import Toast from "../../../../Utils/Toast";
import { AddMoreView } from "../../Reusable/AddMoreView";
import AlertPop from "../../../../Utils/AlertPop";
import { decryptData } from "../../../../Utils/encrypt";
import { RedoModel } from "../../Reusable/RedoStatus";
import AddMoreApart from "../../Reusable/AppartResuable/AddMoreApart";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Dialog } from 'primereact/dialog';
import { AddDocumentDropdown, AddDocumentPendingCreate } from "../../../../Redux/Actions/ApartmentDocument/AddDocument";
import { useFormik } from "formik";
import AddmoreDocument from "../../Reusable/AppartResuable/AddmoreDocument";
import ConfirmationModal from "../../Reusable/AppartResuable/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";



const UpdateStageDocumentVerifyApart = ({ eid, id, status }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [opensadd, setOpensadd] = useState(false);
    const [getData, setGetData] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleteId, setDeleteId] = useState(null)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const staffid = JSON.parse(localStorage.getItem("token"));
    const decryEid = decryptData(eid);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/enquiryreport/${eid}/${staffid.loginid}`, {
                headers: {
                    "Gl-status": 'staff'
                }
            })
            setLoading(false);
            setGetData(response.data)
        } catch (error) {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData()
    }, []);
    const hideDeleteProductsDialog = () => {
        setDeleteDialog(false)
    }
    const openDeleteopn = (id) => {
        setDeleteId(id)
        setDeleteDialog(true)
    }
    const handleDelete = async () => {
     
        const payload = {
            id: eid,
            staffid: staffid.loginid
        }
        try {
            await axios.delete(`${API_BASE_URL}/docdelete/${deleteId}`);
            Toast({ message: "Successfully Deleted", type: "success" });
            setDeleteDialog(false)
            await dispatch(fetchEnquiryDocument(payload));
        } catch (error) {
            console.error(error)
        }
    }
    const deleteUnitsDialogFooter = (
        <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="outlined" color="error" onClick={() => setDeleteDialog(false)}>No</Button>
            <Button variant="contained" onClick={handleDelete}>Yes</Button>
        </div >
    );

    const handleClickOpen = () => {
        dispatch(AddDocumentDropdown())
        setOpensadd(true);
    };
    const onSubmit = (values) => {
        const payload = {
            ...values,
            enqid: eid,
            userid: id
        }

        dispatch(AddDocumentPendingCreate(payload)).then(() => {
            dispatch(AddDocumentDropdown())

            setOpensadd(false); fetchData()

        })


    }


    const formik = useFormik({

        initialValues: {

            docname: '',

        },
        validationSchema: yup.object().shape({
            // docname: yup.string().required(" Document name is required !!"),

        }),
        onSubmit
    })

    const addDatas = useSelector((state) => state?.AddDocGet?.data)


    //vie File
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
    //Add
    const [docId, setDocId] = useState("");
    const [isModalAddMoreView, setIsModalAddMoreView] = useState(false);
    const [isModalAddMore, setIsModalAddMore] = useState(false);
    const [uploadDocData, setUploadDocData] = useState({});
    const [addDocModal, setAddDocModal] = useState(false);
    const [isModalDoc, setIsModalDoc] = useState(false);
    const openAddDocModal = () => {
        setAddDocModal(true);
    };
    const closeAddDocModal = () => {
        setAddDocModal(false);
    };
    const openModalDoc = () => {
        setIsModalDoc(true);
    };
    const closeModalDoc = () => {
        setIsModalDoc(false);
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModals = () => setModalOpen(false);
    const [isAddMoreDetails, setIsAddMoreDetails] = useState(false);
    const [verifyConfirm, setIsVerifyConfirm] = useState(false);



    const [isModalRedo, setIsModalRedo] = useState(false);

    const handleConfirms = async () => {
        try {
            await axios.post(
                `${API_BASE_URL}/enqupdate`,
                { id: decryEid },
                // { id: eid },

                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            Toast({ message: "Successfully Updated", type: "success" });
            navigate("/apart_document_verification#Complete");
        } catch (error) {
            const errorMessage =
                error.response?.data?.messages?.error ||
                error.message ||
                "Failed to update";
            setErrorMsg(errorMessage);
            handleOpenModal();
        }
    };
    const openModalRedo = () => {
        setIsModalRedo(true);
    };
    const closeModalRedo = () => {
        setIsModalRedo(false);
        setDocId("");
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




        // {
        //     name: "Add Details",
        //     cell: (row) => (
        //         <>
        //             {staffid.logintype == "staff" ? (
        //                 <button
        //                     type="button"
        //                     className={`btn btn-primary rounded-0`}
        //                     onClick={() => {
        //                         if (row.document) {
        //                             setIsModalAddMore(true);
        //                             setDocId(row);
        //                         }
        //                     }}
        //                 >
        //                     Add More..
        //                 </button>
        //             ) : (
        //                 <button
        //                     type="button"
        //                     className={`btn btn-primary rounded-0`}
        //                     onClick={() => {
        //                         if (row.document) {
        //                             setIsModalAddMoreView(true);
        //                             setDocId(row);
        //                         }
        //                     }}
        //                 >
        //                     View
        //                 </button>
        //             )}
        //         </>
        //     ),
        //     sortable: true,
        // },

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

                return (
                    <>
                        {staffid.logintype === "staff" ? (
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
                );
            },
        },
        {
            name: "Status",
            cell: (row) => (
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
                        onClick={() => {
                            if (staffid.logintype == "staff") {
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
        // ...(staffid.Login == "staff"
            ...(staffid.Login == "staff" &&( status == "pending" || status === "complete")
            ? [
                {
                    name: "Actions",
                    cell: (row) =>
                        row.upload_type === "document" ? (
                            <button type="button" className="btn btn-outline-danger delete" onClick={() => openDeleteopn(row.id)}>
                                <DeleteIcon />
                            </button>
                        ) : null,
                },
            ]
            : []),

    ];

    return (
        <>
            <ConfirmationModal
                isOpen={verifyConfirm}
                closeModal={() => setIsVerifyConfirm(false)}
                onConfirm={handleConfirms}
                message={"Are you sure this has been verified?"}
            />
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
            />

            <AddMoreApart
                isOpen={isModalAddMore}
                closeModal={() => setIsModalAddMore(false)}
                id={docId}
                 enqid={eid}
    
            />
            <AddMoreView
                isOpen={isModalAddMoreView}
                closeModal={() => setIsModalAddMoreView(false)}
                id={docId}
            />
            <DocumentModel
                isOpen={isModalDoc}
                closeModal={closeModalDoc}
                primaryID={decryEid}
                id={docId}
                staff={staffid}
            />
            <AlertPop
                isOpen={modalOpen}
                onClose={handleCloseModals}
                message={errorMsg}
            />
            <AddmoreDocument
                isOpen={isAddMoreDetails}
                closeModal={() => setIsAddMoreDetails(false)}
                id={docId}
                eid={eid}
                iid={id}
                status={status}
            // props={props.data}
            />
            <RedoModel isOpen={isModalRedo} closeModal={closeModalRedo} id={docId} />

            <div className="">
                <div className="col-12 mt-4">
                    <div className="card shadow border-0">
                        <div className="card shadow border-0 p-4">
                            <div className="d-flex justify-content-between">
                                <h6>Document Details</h6>
                                {staffid.Login === 'staff' &&
                                <span className="bg-warning p-2" variant="outlined" onClick={handleClickOpen}> + Add Document</span>
                                }
                            </div>
                            <hr />

                            <DataTable
                                persistTableHead={true}
                                columns={columns}
                                data={getData?.doc}
                                customStyles={customStyle}
                                pagination
                                // selectableRows
                                fixedHeader
                            />
                      {status == 'pending' && staffid.logintype == "staff" && (

                            <div className="ms-2 text-end" >
                                <a
                                    href="#0"
                                    onClick={() => setIsVerifyConfirm(true)}
                                    className="btn1 me-2"style={{cursor:"pointer"}}
                                >
                                    Confirm
                                </a>
                            </div>
                      )}

                        </div>
                    </div>
                </div>
            </div>
            <Dialog visible={deleteDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteUnitsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <span style={{ marginLeft: '10px' }}>Are you sure you want to delete the selected row</span>
                </div>
            </Dialog>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
            {/* <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={opensadd}
                fullWidth
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Add Document
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent  >
            
                    <form onSubmit={formik.handleSubmit} autoComplete="off">
                        <label className="mx-3" htmlFor="docname">select</label>
                        <select id="docname" name="docname" className=" form-control-sm p-2"
                            value={formik.values.docname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            {formik.errors.docname && formik.touched.docname ? (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.docname}</p>
                            ) : null}

                            <option value="">select</option>
                            {addDatas.length > 0 ? (
                                addDatas.map((val) => (
                                    <option key={val.id} value={val.id}>
                                        {val.document}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No documents available</option>
                            )}

                            
                        </select>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                                Clear
                            </Button>
                            <Button variant="contained" autoFocus type="submit"
                            >
                                Add
                            </Button>

                        </DialogActions>

                    </form>
                 
                 </DialogContent  >


            </BootstrapDialog>
            */}
            
                  <Dialog header="Add Document" visible={opensadd} position="top" style={{ width: '30vw' }} onHide={() => { if (!opensadd) return; setOpensadd(false); formik.resetForm() }}>
                    <form action="" onSubmit={formik.handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="docname" className="form-label">Select document : <span style={{ color: "red" }}>*</span> </label>
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
                          {addDatas?.map((item) => (
                            <option value={item.id}>{item.document} </option>
                          ))}
            
                        </select>
                        {formik.errors.docname && formik.touched.docname ? (
                          <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.docname}</p>
                        ) : null}
                      </div>
                      <div className="d-flex justify-content-end mt-3">
                        <button className="btn1" type="submit">Save </button>
                      </div>
                    </form>
                  </Dialog>
        </>
    )
}

export default UpdateStageDocumentVerifyApart

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

        try {
            await dispatch(enquiryStatusUpdate(Data, setErrorMsg, handleOpenModal));
            dispatch(fetchEnquiryDocument(primaryID, staff.loginid));
            handleCloseModal();
        } catch (error) {
        }
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

const AddDocumentModel = ({ isOpen, closeModal, uploadDocData, staff }) => {
    const dispatch = useDispatch()
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
        const payload = {
            id: uploadDocData.id,
            staffid: staff.loginid
        }
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
            closeModal()

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
                                onClick={() => { closeModal(); setError(""); fileInputRef.current.value = ''; setSelectedFile(null) }}
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
                                            onClick={() => { closeModal(); setError(""); fileInputRef.current.value = ''; setSelectedFile(null) }}
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
            <div>

            </div>
        </>
    );
};