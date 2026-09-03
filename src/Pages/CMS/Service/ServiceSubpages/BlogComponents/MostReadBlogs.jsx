
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "react-data-table-component";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";

// import Toast from "../../../../Utils/Toast";
import { Switch } from 'antd';
import customStyle from "../../../../../Utils/tableStyle";
import axios from "axios";
import API_BASE_URL from "../../../../../Api/api";
import Toast from "../../../../../Utils/Toast";

const MostReadBlogs = ({ eid, id, status }) => {
    const [newDialog, setNewDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [editing, setEditing] = useState(false);
    const staffid = JSON.parse(localStorage.getItem("token"));
    const [deleteId, setDeleteId] = useState("");
    const [getData, setGetData] = useState("")
    const dispatch = useDispatch();

    const fetch = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/mostreadbloglinks`);
            setGetData(response.data?.data || []);
        } catch (error) { }
    };

    useEffect(() => {
        fetch()
    }, []);

    const onSubmit = async (values) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/mostreadbloglinks`,
                values,
            );
            if (values.id) (
                Toast({
                    message:
                        "Updated Successfully",
                    type: "success",
                })
            )
            else {
                Toast({
                    message:
                        "Updated Successfully",
                    type: "success",
                })
            }


            fetch();
            hideDialog();
        } catch (error) {
            Toast({
                message:
                    error.response?.data?.messages?.message ||
                    error.response?.data?.message ||
                    "Something went wrong",
                type: "error",
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            title: "",
            link: "",
            status: "",
            // theme: "light",
        },
        validationSchema: yup.object().shape({
            title: yup.string().required("Title is  required!!"),
            link: yup.string().required("Link is  required!!"),
            status: yup.string().required("status is  required!!"),
        }),
        onSubmit,
    });

    const hideDialog = () => {
        setNewDialog(false);
        formik.resetForm();
    };


    const handleEdit = (row) => {
        setNewDialog(true);
        formik.setFieldValue("title", row.title);
        formik.setFieldValue("link", row.link);
        formik.setFieldValue("status", row.status);
        formik.setFieldValue("id", row.id);
    };
    const openDelete = (row) => {
        setDeleteDialog(true);
        setDeleteId(row.id);
    };
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/mostreadbloglinks/${deleteId}`);
            Toast({
                message: "Deleted Successfully",
                type: "success",
            });
            setDeleteDialog(false)
            fetch()

        } catch (error) { }
    };

    const column1 = [
        {
            name: "S.no",
            cell: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Link",
            selector: (row) => row.link,
            sortable: true,
        },

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
                            onClick={() => openDelete(row)}
                        >
                            <DeleteIcon />
                        </button>
                    </div>
                </>
            ),
        },

    ];
    const deleteUnitsDialogFooter = (
        <div className=" d-flex gap-3 justify-content-end">
            <button onClick={handleDelete} className="btn1">
                Yes
            </button>
        </div>
    );
    const hideDeleteProductsDialog = () => {
        setDeleteDialog(false);
    };
    return (
        <>
            <section className="mt-3 mb-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header  p-3 d-flex justify-content-between">
                                    <h6>Most Read Blog Links</h6>

                                    <button
                                        onClick={() => setNewDialog(true)}
                                        className="btn1 me-2"
                                    >
                                        + Add
                                    </button>

                                </div>
                                <div className="card-body p-3">
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
                </div>
            </section>
            {/*new modal */}

            <Dialog
                visible={newDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Add Most Read Blogs Links"
                modal
                className="p-fluid"
                onHide={hideDialog}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div>
                        <div className="form-group">
                            <label htmlFor="exterior" className="form-label">
                                Title :
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="form-control"
                                placeholder="Enter Title"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.title}
                            />
                            {formik.errors.title && formik.touched.title && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.title}
                                </p>
                            )}
                        </div>
                        <div className="form-group mt-1">
                            <label htmlFor="exterior" className="form-label">
                                Link :
                            </label>
                            <input
                                type="text"
                                id="link"
                                name="link"
                                className="form-control"
                                placeholder="Enter Links"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.link}
                            />
                            {formik.errors.link && formik.touched.link && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.link}
                                </p>
                            )}
                        </div>
                        {/* <div className="form-group mt-3">
                            <label htmlFor="" className="form-label me-2">Dark Theme :</label>
                            <Switch
                                checked={formik.values.theme === "dark"}
                                onChange={(checked) => {
                                    formik.setFieldValue("theme", checked ? "dark" : "light");
                                }}
                            />
                        </div> */}
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                className="form-select"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">-- Select Status --</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            {formik.errors.status && formik.touched.status && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.status}
                                </p>
                            )}
                        </div>

                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <button
                            type="button"
                            className="btn1"
                            onClick={() => formik.resetForm()}
                        >
                            Clear
                        </button>
                        <button
                            type="submit"
                            className="btn1"
                            onClick={() => setEditing(false)}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </Dialog>
            {/*Delete modal */}

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
                        Are you sure you want to delete the selected exterior Feature ?
                    </span>
                </div>
            </Dialog>

            {/*Edit modal */}


        </>
    );
};

export default MostReadBlogs;


