import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import { Button } from "rsuite";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import Toast from "../../../Utils/Toast";
import DataTable from "react-data-table-component";
import customStyle from "../../../Utils/tableStyle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import MuiButton from "@mui/material/Button";

const USB = () => {
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false);
    const [getData, setGetData] = useState([]);
    const [deleteconfirmmodal, setDeleteconfirmmodal] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);




    const onSubmit = async (values, { resetForm }) => {
        setLoading(true);

        if (
            values.bold_text.trim() === "" &&
            values.light_text.trim() === ""
        ) {
            Toast({
                message: "Please fill at least one field",
                type: "error",
            });

            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}/usbsection`,
                values
            );

            Toast({
                message: values.id
                    ? "USB updated successfully"
                    : "USB saved successfully",
                type: "success",
            });

            await fetch();

            resetForm();
            setVisible(false);

        } catch (error) {
            Toast({
                message:
                    error.response?.data?.message ||
                    "Failed to save USB",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };
    const formik = useFormik({
        initialValues: {
            id: "",
            bold_text: "",
            light_text: "",
            element: "",

        },

        // validationSchema: yup.object({
        //     bold_text: yup
        //         .string()
        //         .trim()
        //         .required("Title is required!"),

        //     sub_title: yup
        //         .string()
        //         .trim()
        //         .required("Sub-Title is required!"),
        // }),

        enableReinitialize: false,

        onSubmit

    });

    // Fetch title for selected section
    const fetch = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/usbsection`,

            );

            const data = response.data?.data || [];

            setGetData(data);

            // Existing section title
            if (data.length > 0) {
                const existingData = data[0];

                formik.setValues({
                    id: existingData.id || "",
                    bold_text: existingData.bold_text || "",
                    light_text: existingData.light_text || "",
                    element: existingData.element || "",
                });
            } else {
                // No title for this section
                formik.resetForm({
                    values: {
                        id: "",
                        bold_text: "",
                        light_text: "",
                        element: "",

                    },
                });
            }

        } catch (error) {
            console.log("Section title fetch error:", error);
        }
    };

    // Fetch whenever section changes
    useEffect(() => {

        fetch();

    }, []);



    const handleClose = () => {
        formik.resetForm({
            values: {
                id: "",
                bold_text: "",
                light_text: "",
                element: "",

            },
        });

        setVisible(false);
    };
    const handleEdit = (row) => {
        formik.setValues({
            id: row.id || "",
            bold_text: row.bold_text || "",
            light_text: row.light_text || "",
            element: row.element || "",
        });
        setVisible(true);
    }


    const handleConfirmClosedelete = () => {
        setDeleteconfirmmodal(false);
    };
    const handleconfirmopendelete = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/usbsection/${selectedRowId}`);
            fetch();
            Toast({ message: "Successfully Deleted", type: "success" });
        } catch (error) {
        } finally {
            setDeleteconfirmmodal(false);
        }
    };

    const columns = [
        {
            name: "S.no",
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Bold Text",
            selector: (row) => row.bold_text,
            sortable: true,
        },
        {
            name: "Light Text",
            selector: (row) => row.light_text,
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
    return (

        <>
            <section className="section">
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between">
                                <h4 className="page_heading">USP Reports</h4>
                                <div className="d-flex gap-2">
                                    <button
                                        type="button"
                                        className="btn1"
                                        onClick={() => {
                                            setVisible(true);
                                        }}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="col-lg-12  mb-4">
                                <DataTable
                                    columns={columns}
                                    data={getData}
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

            <Dialog
                header={
                    formik.values.id
                        ? "Edit USP"
                        : "Add USP"
                }
                visible={visible}
                style={{ width: "30vw" }}
                onHide={handleClose}
            >
                <form onSubmit={formik.handleSubmit}>

                    {/* Title */}
                    <div className="mb-3">
                        <label htmlFor="bold_text" className="form-label">
                            Bold Text
                        </label>

                        <input
                            type="text"
                            id="bold_text"
                            name="bold_text"
                            className="form-control"
                            placeholder="Enter bold text"
                            value={formik.values.bold_text}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.bold_text &&
                            formik.errors.bold_text && (
                                <small className="text-danger">
                                    {formik.errors.bold_text}
                                </small>
                            )}
                    </div>

                    {/* Light Text */}
                    <div className="mb-3">
                        <label
                            htmlFor="light_text"
                            className="form-label"
                        >
                            Light Text
                        </label>

                        <input
                            type="text"
                            id="light_text"
                            name="light_text"
                            className="form-control"
                            placeholder="Enter light text"
                            value={formik.values.light_text}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.light_text &&
                            formik.errors.light_text && (
                                <small className="text-danger">
                                    {formik.errors.light_text}
                                </small>
                            )}
                    </div>


                    {/* Buttons */}
                    <div className="d-flex gap-2 justify-content-end">

                        <Button
                            color="blue"
                            appearance="primary"
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : formik.values.id
                                    ? "Update"
                                    : "Save"}
                        </Button>

                        <Button
                            color="red"
                            appearance="ghost"
                            type="button"
                            onClick={() => formik.resetForm()}
                        >
                            Clear
                        </Button>

                    </div>
                </form>
            </Dialog>

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

export default USB;

