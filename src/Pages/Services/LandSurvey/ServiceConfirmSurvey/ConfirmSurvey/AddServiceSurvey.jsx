import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import axios from "axios";
import API_BASE_URL from "../../../../../Api/api";
import Toast from "../../../../../Utils/Toast";
import customStyle from "../../../../../Utils/tableStyle";
import { useSelector } from "react-redux";

const AddServiceSurvey = ({ eid, id, status, pagetype }) => {
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
            name: "Service",
            selector: (row) => row.service,
            sortable: true,
        },
        {
            name: "Other Service",
            selector: (row) => row.other_service,
            sortable: true,
        },
        {
            name: "Remark",
            selector: (row) => row.remark,
            sortable: true,
        },
        ...(staffid.logintype == "staff" &&
            (status === "complete" || status === "pending") &&
            pagetype !== "reminder" && enquiryDoumentData?.status !== "live"
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
                `${API_BASE_URL}/servicedelete/${deleteId}`
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
        formik.setFieldValue("service", row.service);
        formik.setFieldValue("other_service", row.other_service);
        formik.setFieldValue("remark", row.remark);
        formik.setFieldValue("id", row.id);
    };
    const [postLoading, setPostLoading] = useState(false);
    const onSubmit = async (values) => {
        const payload = {
            ...values,
            eid: eid,
        };
        setPostLoading(true);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/servicecreate`,
                payload
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
                `${API_BASE_URL}/servicelist/${eid}/edit`
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
            service: "",
            other_service: "",
            remark: "",
        },
        validationSchema: yup.object().shape({
            service: yup.string().required("service is required !!"),
            other_service: yup.string().required("other service is required !!"),
            remark: yup.string().required("remark is required !!"),
        }),
        onSubmit,
    });

    return (
        <>
            <div className="col-12 mt-4">
                <div className="card shadow border-0">
                    <div className="card shadow border-0 p-4">
                        <div className="d-flex justify-content-between">
                            <h6>Add Service</h6>
                            {staffid.logintype == "staff" &&
                                (status === "complete" || status === "pending") &&
                                pagetype !== "reminder" && enquiryDoumentData?.status !== "live" && (
                                    <div className="d-flex justify-content-end">
                                        <div className="ms-2">
                                            <a
                                                href="#"
                                                onClick={() => setNewDialog(true)}
                                                className="btn1 me-2"
                                            >
                                                + Add
                                            </a>
                                        </div>
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
                                // selectableRows
                                fixedHeader
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                visible={newDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Add Service"
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
                            Service : <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <select
                            type="text"
                            className="form-select"
                            name="service"
                            id="service"
                            placeholder="Enter Service ..."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.service}
                        >
                            <option>Select Service ... </option>
                            <option value="sell your property">Sell Your Property</option>
                            <option value="find your property's google map location">
                                Find Your Property's Google Map Location
                            </option>
                            <option value="missing documents">Missing Documents </option>
                            <option value="get patta for your property">
                                Get Patta For Your Property{" "}
                            </option>
                            <option value="legal opinion">Legal Opinion </option>
                            <option value="land survey">Land Survey </option>
                            <option value="property valuation">Property Valuation </option>
                        </select>

                        {formik.errors.service && formik.touched.service ? (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.service}
                            </p>
                        ) : null}
                    </div>
                    <div className="form-group mt-3">
                        <label className="form-label">
                            {" "}
                            Other Service: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="other_service"
                            id="other_service"
                            placeholder="Enter Other Service..."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.other_service}
                        />
                        {formik.errors.other_service && formik.touched.other_service ? (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.other_service}
                            </p>
                        ) : null}
                    </div>
                    <div className="form-group mt-3">
                        <label className="form-label">
                            {" "}
                            Remark: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <textarea
                            type="text"
                            className="form-control"
                            name="remark"
                            id="remark"
                            placeholder="text here..."
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
                            {postLoading ? "Processing..." : "Save"}
                        </Button>
                    </div>
                </form>
            </Dialog>
            <Dialog
                visible={editDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Update Service"
                modal
                className="p-fluid"
                onHide={() => {
                    setEditDialog(false);
                    formik.resetForm();
                }}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className="form-group">
                        <label className="form-label">
                            {" "}
                            Service : <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <select
                            type="text"
                            className="form-select"
                            name="service"
                            id="service"
                            placeholder="Enter Service ..."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.service}
                        >
                            <option>Select Service ... </option>
                            <option value="sell your property">Sell Your Property</option>
                            <option value="find your property's google map location">
                                Find Your Property's Google Map Location
                            </option>
                            <option value="missing documents">Missing Documents </option>
                            <option value="get patta for your property">
                                Get Patta For Your Property{" "}
                            </option>
                            <option value="legal opinion">Legal Opinion </option>
                            <option value="land survey">Land Survey </option>
                            <option value="property valuation">Property Valuation </option>
                        </select>

                        {formik.errors.service && formik.touched.service ? (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.service}
                            </p>
                        ) : null}
                    </div>
                    <div className="form-group mt-3">
                        <label className="form-label">
                            {" "}
                            Other Service: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="other_service"
                            id="other_service"
                            placeholder="Enter Other Service..."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.other_service}
                        />
                        {formik.errors.other_service && formik.touched.other_service ? (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.other_service}
                            </p>
                        ) : null}
                    </div>
                    <div className="form-group mt-3">
                        <label className="form-label">
                            {" "}
                            Remark: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <textarea
                            type="text"
                            className="form-control"
                            name="remark"
                            id="remark"
                            placeholder="Enter remark..."
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

export default AddServiceSurvey;
