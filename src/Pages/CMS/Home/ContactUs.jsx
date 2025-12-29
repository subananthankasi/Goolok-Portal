import { useFormik } from "formik";
import React from "react";

import { useEffect, useState } from "react";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal, Button, TagPicker } from "rsuite";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL, { base_url, IMG_PATH } from "../../../Api/api";
import Toast from "../../../Utils/Toast";
import customStyle from "../../../Utils/tableStyle";
import { Dialog } from "primereact/dialog";
import Stack from "@mui/material/Stack";
import MuiButton from "@mui/material/Button";
// import { ThreeDots } from "react-loader-spinner";
import AddIcon from "@mui/icons-material/Add";

const ContactUs = () => {
    const navigate = useNavigate();

    const [newDialog, setNewDialog] = useState(false);
    const [fetchbanner, setFetchbanner] = useState([]);

    const [deleteconfirmmodal, setDeleteconfirmmodal] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const columns = [
        {
            name: "S.no",
            selector: (row, index) => index + 1,
            sortable: true,
        },

        {
            name: "AddressType",
            selector: (row) => row.address_type,
            sortable: true,
        },
        {
            name: "Address ",
            selector: (row) => row.address,
            sortable: true,
            width: "180px",
        },

        {
            name: "Mobile",
            selector: (row) => row.mobile,

            sortable: true,
            width: "180px",
        },

        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },

        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
        },

        {
            name: "Actions",
            cell: (row) => (
                <div className="d-flex">
                    <button
                        className="btn  btn-outline-info me-1 edit"
                        data-tooltip-id="edit"
                        onClick={() => {
                            handleEdit(row);
                        }}
                    >
                        <EditIcon />
                    </button>
                    <button
                        className="btn btn-outline-danger delete"
                        data-tooltip-id="delete"
                        onClick={() => {
                            setDeleteconfirmmodal(true);
                            setSelectedRowId(row.id);
                        }}
                    >
                        <DeleteIcon />
                    </button>
                </div>
            ),
        },
    ];

    const handleEdit = (row) => {
        setNewDialog(true);

        formik.setFieldValue("id", row.id || "");
        formik.setFieldValue("address_type", row.address_type || "");
        formik.setFieldValue("address", row.address || "");
        formik.setFieldValue("mobile", row.mobile || "");
        formik.setFieldValue("email", row.email || "");
        formik.setFieldValue("status", row.status || "");
    };
    const fetchRoles = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/contactus`);

            // setFetchbanner(response.data);
            setFetchbanner(response.data?.data || []);
        } catch (error) { }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const onSubmit = async (values) => {
        setIsSubmitting(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/contactus`, values, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            Toast({ message: "Successfully Created", type: "success" });
            setNewDialog(false);
            await fetchRoles();
            formik.resetForm();
            setPreviewImage(null);
        } catch (error) {
            const errorMessage =
                error.response?.data?.messages?.message ||
                "Error while creating banner";

            Toast({ message: errorMessage, type: "error" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            address_type: "",
            address: "",
            mobile: "",
            email: "",

            status: "",
        },
        // validationSchema: yup.object().shape({
        //   address_type: yup.string().required("address_type is required!"),
        //   address: yup.string().required("address is required!"),
        //   mobile: yup.string().required("mobile is required!"),
        //   email: yup.string().required("email is required!"),

        //   status: yup.string().required("Status is required"),
        // }),
        onSubmit,
    });
    const handleConfirmClosedelete = () => {
        setDeleteconfirmmodal(false);
    };
    const handleconfirmopendelete = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/contactus/${selectedRowId}`);
            fetchRoles();
            Toast({ message: "Successfully Deleted", type: "success" });
        } catch (error) {
        } finally {
            setDeleteconfirmmodal(false);
        }
    };

    // const handleAddQuestion = () => {
    //     formik.setFieldValue("question", [...formik.values.question, ""]);
    // };

    // const handleDeleteQuestion = (index) => {
    //     const updated = formik.values.question.filter((_, i) => i !== index);
    //     formik.setFieldValue("question", updated);
    // };

    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between">
                                <h4 className="page_heading">ContactUs View Table</h4>
                                <button
                                    type="button"
                                    className="btn1"
                                    onClick={() => {
                                        setNewDialog(true);
                                    }}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="col-lg-12  mb-4">
                                <DataTable
                                    columns={columns}
                                    data={fetchbanner}
                                    customStyles={customStyle}
                                    pagination
                                    persistTableHead={true}
                                    fixedHeader
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Modal
                size={"40rem"}
                open={newDialog}
                onClose={() => {
                    setNewDialog(false);
                    formik.resetForm();
                    setPreviewImage(null);
                }}
            >
                <Modal.Header>
                    <Modal.Title>ContactUs </Modal.Title>
                </Modal.Header>

                <Modal.Body
                    className="p-2"
                    style={{ overflow: "scroll", overflowX: "hidden" }}
                >
                    <form onSubmit={formik.handleSubmit} autoComplete="off">
                        <input type="text" autoComplete="off" style={{ display: "none" }} />
                        <div className=" mb-3 ">
                            <label htmlFor="address_type" className="form-label">
                                {" "}
                                Address Type{" "}
                            </label>
                            <input
                                type="text"
                                name="address_type"
                                className="form-control"
                                placeholder="Enter address_type"
                                value={formik.values.address_type}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete="off"
                            />
                            {formik.errors.address_type && formik.touched.address_type && (
                                <small className="text-danger">
                                    {formik.errors.address_type}
                                </small>
                            )}
                        </div>

                        <div className=" mb-3 ">
                            <label htmlFor="address" className="form-label">
                                {" "}
                                Address{" "}
                            </label>
                            <textarea
                                name="address"
                                className="form-control"
                                placeholder="Enter address..."
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete="new-password"
                            />
                            {formik.errors.address && formik.touched.address && (
                                <small className="text-danger">{formik.errors.address}</small>
                            )}
                        </div>

                        <div className=" mb-3 ">
                            <label htmlFor="mobile" className="form-label">
                                {" "}
                                Mobile{" "}
                            </label>
                            <input
                                type="text"
                                name="mobile"
                                className="form-control"
                                placeholder="Enter mobile"
                                value={formik.values.mobile}
                                // onChange={formik.handleChange}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                        formik.setFieldValue("mobile", value);
                                    }
                                }}
                                minLength={10}
                                maxLength={10}
                                onBlur={formik.handleBlur}
                                autoComplete="off"
                                aria-autocomplete="none"
                            />
                            {formik.errors.mobile && formik.touched.mobile && (
                                <small className="text-danger">{formik.errors.mobile}</small>
                            )}
                        </div>
                        <div className=" mb-3 ">
                            <label htmlFor="email" className="form-label">
                                {" "}
                                Email{" "}
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete="new-password"
                            />
                            {formik.errors.email && formik.touched.email && (
                                <small className="text-danger">{formik.errors.email}</small>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                className="form-select w-50"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">-- Select Status --</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            {formik.errors.status && formik.touched.status && (
                                <small className="text-danger">{formik.errors.status}</small>
                            )}
                        </div>

                        <div className=" d-flex gap-2 justify-content-end">
                            <Button
                                color="blue"
                                appearance="primary"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Saving..." : "Save"}
                            </Button>
                            <Button
                                color="red"
                                appearance="ghost"
                                onClick={() => {
                                    formik.resetForm();
                                    setPreviewImage(null);
                                }}
                            >
                                Clear
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>

            <Dialog
                header="Confirm Deleted "
                visible={deleteconfirmmodal}
                position="top"
                style={{ width: "30vw" }}
                onHide={() => {
                    if (!deleteconfirmmodal) return;
                    setDeleteconfirmmodal(false);
                }}
            >
                <div className=" form-group">
                    <p>Do you want to delete this record?</p>
                </div>
                <div className="d-flex p-3 justify-content-end mt-3">
                    <Stack direction="row" spacing={2}>
                        <MuiButton
                            variant="outlined"
                            color="error"
                            onClick={() => handleConfirmClosedelete()}
                        >
                            {" "}
                            No{" "}
                        </MuiButton>
                        &nbsp;
                    </Stack>
                    <MuiButton
                        variant="contained"
                        color="success"
                        onClick={() => handleconfirmopendelete(setSelectedRowId)}
                    >
                        Yes{" "}
                    </MuiButton>
                </div>
            </Dialog>
        </>
    );
};

export default ContactUs;
