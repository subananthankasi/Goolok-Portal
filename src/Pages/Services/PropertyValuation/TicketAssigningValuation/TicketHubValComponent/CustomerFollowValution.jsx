import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import axios from "axios";
import { DateFormatcustom } from "../../../../../Utils/DateFormatcustom";
import API_BASE_URL from "../../../../../Api/api";
import Toast from "../../../../../Utils/Toast";
import customStyle from "../../../../../Utils/tableStyle";
import { useSelector } from "react-redux";

const CustomerFollowValution = ({ eid, id, status, pagetype }) => {
    const staffid = JSON.parse(localStorage.getItem("token"));
    const [editing, setEditing] = useState(false);
    const [newDialog, setNewDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteId, setdeleteId] = useState(null);
    const [getData, setGetData] = useState([]);
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
            name: "Followup Status",
            selector: (row) => row.followup_status,
            sortable: true,
        },
        {
            name: "Date",
            selector: (row) => DateFormatcustom(row.followup_date),
            sortable: true,
        },
        {
            name: "Remark",
            selector: (row) => row.followup_remark,
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
                `${API_BASE_URL}/landsurvey/${deleteId}`
            );
            Toast({ message: "Successfully deleted", type: "success" });
            fetch();
            setDeleteDialog(false);
        } catch (error) {
            console.error(error);
        }
    };
    const handleEdit = (row) => {
        setEditDialog(true);
        formik.setFieldValue("status", row.followup_status);
        formik.setFieldValue("date", row.followup_date);
        formik.setFieldValue("remark", row.followup_remark);
        formik.setFieldValue("id", row.id);
    };

    const [postLoading, setPostLoading] = useState(false);
    const onSubmit = async (values) => {
        const payload = {
            ...values,
            eid: eid,
            type: "customer",
        };
        setPostLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/landsurvey`, payload);
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
            const response = await axios.get(`${API_BASE_URL}/landsurvey/${eid}`, {
                headers: {
                    "Gl-Status": "customer",
                },
            });
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
            status: "",
            date: "",
            remark: "",
        },
        validationSchema: yup.object().shape({
            status: yup.string().required(" followed status is required !!"),
            remark: yup.string().required("remark is required !!"),
            date: yup.string().required(" date is required !!"),
        }),
        onSubmit,
    });

    return (
        <>
            <div className=" mt-4">
                <div className="d-flex justify-content-end">
                    {staffid.logintype == "staff" &&
                        (status === "complete" || status === "pending") &&
                        pagetype !== "reminder" && enquiryDoumentData?.status !== "live" && (
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
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className="form-group">
                        <label className="form-label">
                            {" "}
                            Follow Up status :<span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                            type="text"
                            className="form-select"
                            name="status"
                            id="status"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.status}
                        >
                            <option>Select...</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Not confirmed">Not Confirmed</option>
                        </select>
                        {formik.errors.status && formik.touched.status ? (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.status}
                            </p>
                        ) : null}
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-label">
                            {" "}
                            Date :<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            name="date"
                            id="date"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.date}
                        />
                        {formik.errors.date && formik.touched.date ? (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.date}
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
                }}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className="form-group">
                        <label className="form-label">
                            {" "}
                            Follow Up status :<span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                            type="text"
                            className="form-select"
                            name="status"
                            id="status"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.status}
                        >
                            <option>Select...</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Not confirmed">Not Confirmed</option>
                        </select>
                        {formik.errors.status && formik.touched.status ? (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.status}
                            </p>
                        ) : null}
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-label">
                            {" "}
                            Date :<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            name="date"
                            id="date"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.date}
                        />
                        {formik.errors.date && formik.touched.date ? (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.date}
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

export default CustomerFollowValution;
