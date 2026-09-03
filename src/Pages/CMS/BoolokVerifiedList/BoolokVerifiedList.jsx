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
import { fetchPropertyType } from "../../../Redux/Actions/PropertyTypeAction";
import { useDispatch, useSelector } from "react-redux";

const BoolokVerifiedList = () => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false);
    const [getData, setGetData] = useState([]);
    const [deleteconfirmmodal, setDeleteconfirmmodal] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [verifiedInput, setVerifiedInput] = useState("");




    useEffect(() => {
        dispatch(fetchPropertyType());
    }, [])
    const propertyTypeData = useSelector(
        (state) => state.PropertyType.PropertyTypeData
    );


    const onSubmit = async (values, { resetForm }) => {


        console.log("values", values)
        setLoading(true);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/verifiedproperties`,
                values
            );

            Toast({
                message: values.id
                    ? "updated successfully"
                    : " saved successfully",
                type: "success",
            });

            await fetch();

            resetForm();
            setVisible(false);

        } catch (error) {
            Toast({
                message:
                    error.response?.data?.message ||
                    "Failed to save ",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };
    const formik = useFormik({
        initialValues: {
            property_type: "",
            title: "",
            verified_list: [],
        },

        validationSchema: yup.object({
            property_type: yup
                .string()
                .trim()
                .required("Property type is required!"),

            title: yup
                .string()
                .trim()
                .required("Title is required!"),

            verified_list: yup
                .array()
                .min(1, "Please add at least one verified list")
                .required("Verified list is required"),
        }),

        enableReinitialize: false,

        onSubmit,
    });

    const handleAddVerifiedList = () => {
        const value = verifiedInput.trim();

        if (!value) return;

        // Duplicate avoid
        if (formik.values.verified_list.includes(value)) {
            Toast({
                message: "This verified list is already added",
                type: "error",
            });
            return;
        }

        formik.setFieldValue("verified_list", [
            ...formik.values.verified_list,
            value,
        ]);

        setVerifiedInput("");
    };

    const handleVerifiedKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddVerifiedList();
        }
    };

    // Fetch title for selected section
    const fetch = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/verifiedproperties`,

            );
            const data = response.data || [];
            setGetData(data);

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
                property_type: "",
                title: "",
                verified_list: [],
            },
        });

        setVerifiedInput("");
        setVisible(false);
    };


    const handleEdit = (row) => {
        formik.setValues({
            id: row.id || "",
            property_type: row.property_type || "",
            title: row.title || "",
            verified_list: Array.isArray(row.verified_list)
                ? row.verified_list
                : [],
        });

        setVerifiedInput("");
        setVisible(true);
    };


    const handleConfirmClosedelete = () => {
        setDeleteconfirmmodal(false);
    };
    const handleconfirmopendelete = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/verifiedproperties/${selectedRowId}`);
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
            name: "Propert Type",
            selector: (row) => row.property_type_name,
            sortable: true,
        },
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Verified Lists",
            selector: (row) =>
                Array.isArray(row.verified_list)
                    ? row.verified_list.join(", ")
                    : row.verified_list || "-",
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
                                <h4 className="page_heading">Boolok Verified lists</h4>
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
                        ? "Edit Boolok Verified List"
                        : "Add Boolok Verified List"
                }
                visible={visible}
                style={{ width: "30vw" }}
                onHide={handleClose}
            >
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label
                            htmlFor="light_text"
                            className="form-label"
                        >
                            Select Property
                        </label>

                        <select
                            type="text"
                            id="property_type"
                            name="property_type"
                            className="form-select"
                            value={formik.values.property_type}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">--Select Property--</option>
                            {propertyTypeData?.map((item) => (
                                <option value={item.id} >{item?.property_type} </option>
                            ))}
                        </select>

                        {formik.touched.property_type &&
                            formik.errors.property_type && (
                                <small className="text-danger">
                                    {formik.errors.property_type}
                                </small>
                            )}
                    </div>
                    {/* Title */}
                    <div className="mb-3">
                        <label htmlFor="bold_text" className="form-label">
                            Title
                        </label>

                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-control"
                            placeholder="Enter bold text"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.title &&
                            formik.errors.title && (
                                <small className="text-danger">
                                    {formik.errors.title}
                                </small>
                            )}
                    </div>

                    {/* Verified Lists */}
                    {/* Verified Lists */}
                    <div className="mb-3">
                        <label className="form-label">
                            Verified Lists
                        </label>

                        <div className="d-flex gap-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter verified list"
                                value={verifiedInput}
                                onChange={(e) => setVerifiedInput(e.target.value)}
                                onKeyDown={handleVerifiedKeyDown}
                            />

                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAddVerifiedList}
                            >
                                Add
                            </button>
                        </div>

                        {/* Added Lists */}
                        {formik.values.verified_list?.length > 0 && (
                            <div className="mt-3">
                                {formik.values.verified_list.map((list, index) => (
                                    <div
                                        key={index}
                                        className="d-flex align-items-center justify-content-between border rounded p-2 mb-2"
                                    >
                                        <span style={{ fontSize: "13px" }}>
                                            {index + 1}. {list}
                                        </span>

                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => {
                                                const updatedList =
                                                    formik.values.verified_list.filter(
                                                        (_, i) => i !== index
                                                    );

                                                formik.setFieldValue(
                                                    "verified_list",
                                                    updatedList
                                                );
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {formik.touched.verified_list &&
                            formik.errors.verified_list && (
                                <small className="text-danger">
                                    {formik.errors.verified_list}
                                </small>
                            )}
                    </div>




                    {/* Buttons */}
                    <div className="d-flex gap-2 justify-content-end">

                        <Button
                            color="red"
                            appearance="ghost"
                            type="button"
                            onClick={() => {
                                formik.resetForm({
                                    values: {
                                        property_type: "",
                                        title: "",
                                        verified_list: [],
                                    },
                                });

                                setVerifiedInput("");
                            }}
                        >
                            Clear
                        </Button>
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

export default BoolokVerifiedList;

