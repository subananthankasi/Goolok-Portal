import { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import axios from "axios";
import { TabView, TabPanel } from "primereact/tabview";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useNavigate } from "react-router-dom";
import API_BASE_URL, { IMG_PATH } from "../../../../../Api/api";
import Toast from "../../../../../Utils/Toast";
import ConfirmationModal from "../../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../../Utils/AlertPop";
import customStyle from "../../../../../Utils/tableStyle";
import FileViewUtils from "../../../../../Utils/FileView/FileViewUtils";
import ApplicationDetailSurvey from "./ApplicationDetailSurvey";
import TalukDetailsSurvey from "./TalukDetailsSurvey";
import { useSelector } from "react-redux";

const PattaComponentSurvey = ({ eid, id, status, pagetype }) => {
    const staffid = JSON.parse(localStorage.getItem("token"));
    const pattaref = useRef(null);
    const [editing, setEditing] = useState(false);
    const [fillDialog, setFillDialog] = useState(false);
    const [visible, setVisible] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteId, setdeleteId] = useState(null);
    const [getData, setGetData] = useState([]);
    const [rowId, setRowId] = useState(null);
    const [document, setDocument] = useState("");

    const viewFile = (row) => {
        const url = `${IMG_PATH}/service/document/${row.document}`;
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
            name: "Document",
            cell: (row) => (
                <>
                    <div className="d-flex">
                        <button className="btn" onClick={() => viewFile(row)}>
                            <PictureAsPdfIcon sx={{ fontStyle: "45px" }} />{" "}
                        </button>
                    </div>
                </>
            ),
            sortable: true,
        },
        {
            name: "Remark",
            selector: (row) => row.remark,
            sortable: true,
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
                `${API_BASE_URL}/pattaApp/${deleteId}`
            );
            fetch();
            Toast({ message: "Successfully Deleted", type: "success" });
            setDeleteDialog(false);
        } catch (error) {
            console.error(error);
        }
    };
    const [postLoading, setPostLoading] = useState(false);
    const onSubmit = async (values) => {
        const payload = {
            ...values,
            enqid: eid,
            pattaid: id,
        };
        setPostLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/pattaApp`, payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            fetch();
            setPostLoading(false);
            Toast({ message: "Successfully Submited", type: "success" });
            setVisible(false);

            formik.resetForm();
        } catch (error) {
            Toast({ message: "Failed to save", type: "error" });
            setPostLoading(false);
        }
    };

    const fetch = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/pattaApp/${eid}/edit`);
            setGetData(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetch();
    }, []);

    const formik = useFormik({
        initialValues: {
            patta: null,
            remark: "",
        },
        validationSchema: yup.object().shape({
            patta: yup.string().required("patta is required !!"),
            remark: yup.string().required("remark is required !!"),
        }),
        onSubmit,
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModals = () => setModalOpen(false);

    // confirm verification
    const [verifyConfirm, setIsVerifyConfirm] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const navigate = useNavigate();
    const handleConfirm = async () => {
        const payload = {
            id: id,
            enqid: eid,
        };
        setConfirmLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/completeapp`, payload);
            Toast({ message: "Successfully Updated", type: "success" });
            setConfirmLoading(false);
            navigate("/application_survey#Complete");
        } catch (error) {
            const errorMessage =
                error.response?.data?.messages?.error ||
                error.message ||
                "Failed to update";
            setErrorMsg(errorMessage);
            handleOpenModal();
            setConfirmLoading(false);
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
            <div className="col-12 mt-4">
                <div className="card shadow border-0">
                    <div className="card shadow border-0 p-4">
                        <div className="d-flex justify-content-between">
                            <h6> Application</h6>
                            {staffid.logintype == "staff" &&
                                (status === "complete" || status === "pending") &&
                                pagetype !== "reminder" && enquiryDoumentData?.status !== "live" && (
                                    <button className="btn1" onClick={() => setVisible(true)}>
                                        Add Document
                                    </button>
                                )}
                        </div>

                        <hr />
                        <div className="mt-2">
                            <DataTable
                                persistTableHead={true}
                                columns={column}
                                data={getData}
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
                header="Application"
                modal
                className="p-fluid"
                onHide={() => {
                    setFillDialog(false);
                    formik.resetForm();
                }}
            >
                <div className="row">
                    <div className="col-6">
                        <FileViewUtils
                            fileUrls={`${IMG_PATH}/service/document/${document}`}
                        />
                    </div>
                    <div className="col-6">
                        <TabView>
                            <TabPanel header="Application Details">
                                <ApplicationDetailSurvey
                                    eid={eid}
                                    id={id}
                                    status={status}
                                    rowId={rowId}
                                    pagetype={pagetype}
                                />
                            </TabPanel>
                            {/* <TabPanel header="Survey No">
                                <SurveyNoSurvey eid={eid} id={id} status={status} rowId={rowId} pagetype={pagetype}/>
                            </TabPanel> */}
                            <TabPanel header="Taluk office Details">
                                <TalukDetailsSurvey
                                    eid={eid}
                                    id={id}
                                    status={status}
                                    rowId={rowId}
                                    pagetype={pagetype}
                                />
                            </TabPanel>
                        </TabView>
                    </div>
                </div>
            </Dialog>
            <Dialog
                visible={visible}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Add Application"
                modal
                className="p-fluid"
                onHide={() => {
                    setVisible(false);
                    formik.resetForm();
                }}
                position="top"
            >
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group ">
                        <label className="form-label">
                            Upload Document:(pdf) <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            name="patta"
                            id="patta"
                            ref={pattaref}
                            accept="application/pdf"
                            onChange={(event) => {
                                formik.setFieldValue("patta", event.currentTarget.files[0]);
                            }}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.patta && formik.touched.patta ? (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.patta}
                            </p>
                        ) : null}
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-label">
                            Remark: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <textarea
                            type="file"
                            className="form-control"
                            name="remark"
                            id="remark"
                            placeholder="Enter remark ..."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.remark}
                            style={{ height: "100px" }}
                        />
                        {formik.errors.remark && formik.touched.remark ? (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.remark}
                            </p>
                        ) : null}
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            variant="contained"
                            type="submit"
                            onClick={() => setEditing(false)}
                            disabled={postLoading}
                        >
                            Submit
                        </Button>
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

            {staffid.Login === "staff" &&
                status === "pending" &&
                pagetype !== "reminder" && (
                    <div className="ms-2 text-end mt-4 mb-4">
                        <button
                            onClick={() => setIsVerifyConfirm(true)}
                            className="btn1 me-2"
                            disabled={confirmLoading}
                        >
                            {confirmLoading ? "Processing..." : "Confirm"}
                        </button>
                    </div>
                )}
        </>
    );
};

export default PattaComponentSurvey;
