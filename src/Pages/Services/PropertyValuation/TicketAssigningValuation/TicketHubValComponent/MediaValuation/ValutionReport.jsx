import  { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../../../../../Api/api";
import Toast from "../../../../../../Utils/Toast";
import customStyle from "../../../../../../Utils/tableStyle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useSelector } from "react-redux";

const ValutionReport = ({ eid, id, status, pagetype }) => {
    const staffid = JSON.parse(localStorage.getItem("token"));
    const [editing, setEditing] = useState(false);
    const [newDialog, setNewDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteId, setdeleteId] = useState(null);
    const [getData, setGetData] = useState([]);
    const pdfRef = useRef(null);
    const enquiryDoumentData = useSelector(
        (state) => state.Enquiry.enquiryDocument
    );

    const column1 = [
        {
            name: "S.no",
            cell: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: " File",
            selector: (row) => row.document,
            sortable: true,
            cell: (row) =>
                row.document ? (
                    <a
                        href={`${IMG_PATH}/service/document/${row.document}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                    >
                        <i
                            className="pi pi-file-pdf"
                            style={{ fontSize: "1.5rem", color: "red" }}
                        ></i>
                    </a>
                ) : (
                    <span>No File</span>
                ),
        },
        {
            name: "Remark",
            selector: (row) => row.remark,
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
                                    className="btn btn-outline-info me-1 edit"
                                    data-tooltip-id="edit"
                                    onClick={() => handleEdit(row)}
                                >
                                    <EditIcon />
                                </button>
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
                `${API_BASE_URL}/surveydocument/${deleteId}`
            );
            Toast({ message: "Successfully deleted", type: "success" });
            fetch();
            setDeleteDialog(false);
        } catch (error) {
            console.error(error);
        }
    };
    const [pdfUrl, setPdfUrl] = useState(null);

    const handleEdit = (row) => {
        setEditDialog(true);
        formik.setFieldValue("file", row.document);
        formik.setFieldValue("remark", row.remark);
        formik.setFieldValue("id", row.id);
        const docUrl = `${IMG_PATH}/service/document/${row.document}`;
        setPdfUrl(docUrl);
    };

    const viewFile = () => {
        window.open(pdfUrl, "_blank");
    };

    const [postLoading, setPostLoading] = useState(false);
    const onSubmit = async (values) => {
        const payload = {
            ...values,
            eid: eid,
            type: "measurment",
        };
        setPostLoading(true);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/surveydocument`,
                payload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            fetch();
            if (editing) {
                Toast({ message: "Successfully Updated", type: "success" });
                setEditDialog(false);
            } else {
                Toast({ message: "Successfully Submited", type: "success" });
                setNewDialog(false);
            }
            formik.resetForm();
            setPostLoading(false);
        } catch (error) {
            Toast({ message: "Failed to save", type: "error" });
            setPostLoading(false);
        }
    };
    const fetch = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/surveydocument/${eid}`,
                {
                    headers: {
                        "Gl-Status": "measurment",
                    },
                }
            );
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
            file: "",
            remark: "",
        },
        validationSchema: yup.object().shape({
            file: yup.string().required(" File is required !!"),
            remark: yup.string().required("remark is required !!"),
        }),
        onSubmit,
    });

    return (
        <>
            <div className=" mt-4">
                <div className="d-flex justify-content-end">
                    {staffid.logintype == "staff" &&
                        (status === "complete" || status === "pending") &&
                        pagetype !== "reminder" &&
                        enquiryDoumentData?.status !== "live" && (
                            <div className="ms-2">
                                <a
                                    href="#"
                                    onClick={() => setNewDialog(true)}
                                    className="btn1 me-2"
                                >
                                    + Add
                                </a>
                            </div>
                        )}
                </div>
                <hr />
                <div className="mt-2">
                    <DataTable
                        persistTableHead={true}
                        columns={column1}
                        data={getData}
                        customStyles={customStyle}
                        pagination
                        fixedHeader
                    />
                </div>
            </div>

            <Dialog
                visible={newDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Add "
                modal
                className="p-fluid"
                onHide={() => {
                    setNewDialog(false);
                    formik.resetForm();
                }}
                closable={!postLoading}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className="form-group mt-2">
                        <label className="form-label">
                            {" "}
                            Measurment File :<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            name="file"
                            id="file"
                            ref={pdfRef}
                            onChange={(event) => {
                                formik.setFieldValue("file", event.currentTarget.files[0]);
                            }}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.file && formik.touched.file ? (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.file}
                            </p>
                        ) : null}
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-label">
                            Remark:<span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <textarea
                            type="text"
                            className="form-control"
                            name="remark"
                            id="remark"
                            placeholder="enter remark..."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.remark}
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
                            {postLoading ? "Processing..." : "Save"}
                        </Button>
                    </div>
                    {postLoading && (
                        <p
                            className="text-center mt-2"
                            style={{ fontSize: "13px", color: "green" }}
                        >
                            {" "}
                            Please wait while file is uploading
                        </p>
                    )}
                </form>
            </Dialog>
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
                closable={!postLoading}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className="form-group mt-2">
                        <label className="form-label">
                            {" "}
                            Measurment File :<span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="d-flex gap-1">
                            <input
                                type="file"
                                className="form-control"
                                name="file"
                                id="file"
                                ref={pdfRef}
                                onChange={(event) => {
                                    formik.setFieldValue("file", event.currentTarget.files[0]);
                                }}
                                onBlur={formik.handleBlur}
                            />
                            <button onClick={viewFile}>
                                <RemoveRedEyeIcon />{" "}
                            </button>
                        </div>

                        {formik.errors.file && formik.touched.file ? (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.file}
                            </p>
                        ) : null}
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-label">
                            Remark:<span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <textarea
                            type="text"
                            className="form-control"
                            name="remark"
                            id="remark"
                            placeholder="enter remark..."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.remark}
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
                            onClick={() => setEditing(true)}
                            disabled={postLoading}
                        >
                            {postLoading ? "Processing..." : "Update"}
                        </Button>
                    </div>
                    {postLoading && (
                        <p
                            className="text-center mt-2"
                            style={{ fontSize: "13px", color: "green" }}
                        >
                            {" "}
                            Please wait while file is uploading
                        </p>
                    )}
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

export default ValutionReport;
