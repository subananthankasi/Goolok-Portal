
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "react-data-table-component";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import { Switch } from 'antd';
import customStyle from "../../../../../Utils/tableStyle";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../../../../Api/api";
import Toast from "../../../../../Utils/Toast";
import VisibilityIcon from "@mui/icons-material/Visibility";

const MainBanner = ({ eid, id, status }) => {
    const [newDialog, setNewDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [editing, setEditing] = useState(false);
    const [getData, setGetData] = useState("")
    const [deleteId, setDeleteId] = useState("");
    const [currentImage, setCurrentImage] = useState("");

    const fetch = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/blogsinglebanner`);
            setGetData(response.data?.data || []);
        } catch (error) { }
    };

    useEffect(() => {
        fetch()
    }, []);

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();

            formData.append("blog_banner", values.blog_banner);
            formData.append("screen_size", values.screen_size);
            formData.append("status", values.status);
            formData.append("theme", values.theme);
            if (editing) {
                formData.append("id", values.id);
            }

            const response = await axios.post(
                `${API_BASE_URL}/blogsinglebanner`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            Toast({
                message: editing
                    ? "Updated Successfully"
                    : "Created Successfully",
                type: "success",
            });

            fetch();
            hideDialog();
        } catch (error) {
            Toast({
                message:
                    error?.response?.data?.messages?.theme ||
                    error.response?.data?.message ||
                    "Something went wrong",
                type: "error",
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            blog_banner: "",
            status: "",
            theme: "light",
            screen_size: ""
        },
        validationSchema: yup.object().shape({
            blog_banner: yup.mixed().test(
                "required",
                "Banner is required",
                function (value) {
                    if (editing) return true;
                    return value instanceof File;
                }
            ),
            screen_size: yup.string().required("screen is required!!"),
            status: yup.string().required("status is  required!!"),
        }),
        onSubmit,
    });

    const hideDialog = () => {
        setNewDialog(false);
        setEditing(false);
        setCurrentImage("");
        formik.resetForm();
    };

    const handleEdit = (row) => {
        setEditing(true);
        setCurrentImage(row.image);
        formik.setValues({
            id: row.id,
            blog_banner: row.image,
            status: row.status,
            theme: row.theme,
            screen_size: row.screen_size,
        });

        setNewDialog(true);
    };
    const openDelete = (row) => {
        setDeleteDialog(true);
        setDeleteId(row.id);
    };
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/blogsinglebanner/${deleteId}`);
            Toast({
                message: "Deleted Successfully",
                type: "success",
            });
            setDeleteDialog(false)
            fetch()

        } catch (error) { }
    };


    const column = [
        {
            name: "S.no",
            cell: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Screen Size",
            cell: (row, index) => row.screen_size ?? "-",
            sortable: true,
        },
        {
            name: "Banner Image",
            cell: (row) => (
                <img
                    src={`${IMG_PATH}/blog_single_banner/${row.image}`}
                    alt="Banner"
                    style={{
                        width: "80px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "6px",
                    }}
                />
            ),
        },
        {
            name: "Theme",
            selector: (row) => row.theme,
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
    const handleAdd = () => {
        setEditing(false);
        setCurrentImage("");
        formik.resetForm();
        setNewDialog(true);
    };


    const validateImageDimensions = (file, screenSize) => {
        return new Promise((resolve) => {
            if (!file || !screenSize) {
                resolve(true);
                return;
            }

            const image = new Image();
            const objectUrl = URL.createObjectURL(file);

            image.onload = () => {
                const dimensions = {
                    320: { width: 320, height: 70 },
                    375: { width: 375, height: 70 },
                    425: { width: 425, height: 70 },
                    768: { width: 768, height: 80 },
                    1024: { width: 1024, height: 90 },
                };

                // Desktop:
                // Width should be 1024px or above
                // Height should be exactly 365px
                if (screenSize === "desktop") {
                    const isValid = image.width >= 1024 && image.height === 120;

                    if (isValid) {
                        resolve(true);
                    } else {
                        Toast({
                            message: `Invalid image size! Required: 1024px or above x 365px, but uploaded image is ${image.width} x ${image.height} px.`,
                            type: "error",
                        });

                        resolve(false);
                    }

                    URL.revokeObjectURL(objectUrl);
                    return;
                }

                const required = dimensions[screenSize];

                // If screen size is not available in dimensions
                if (!required) {
                    resolve(true);
                    URL.revokeObjectURL(objectUrl);
                    return;
                }

                // Exact width & height validation
                const isValid =
                    image.width === required.width && image.height === required.height;

                if (isValid) {
                    resolve(true);
                } else {
                    Toast({
                        message: `Invalid image size! Required: ${required.width} x ${required.height} px, but uploaded image is ${image.width} x ${image.height} px.`,
                        type: "error",
                    });

                    resolve(false);
                }

                URL.revokeObjectURL(objectUrl);
            };

            image.onerror = () => {
                Toast({
                    message: "Unable to read the image. Please upload a valid image.",
                    type: "error",
                });

                URL.revokeObjectURL(objectUrl);
                resolve(false);
            };

            image.src = objectUrl;
        });
    };

    return (
        <>
            <section className="">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header  p-3 d-flex justify-content-between">
                                    <h6>Blog Main Banner</h6>

                                    <button
                                        onClick={handleAdd}
                                        className="btn1 me-2"
                                    >
                                        + Add
                                    </button>

                                </div>
                                <div className="card-body p-3">
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
                </div>
            </section>


            {/*new modal */}
            <Dialog
                visible={newDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Add Blog Banner"
                modal
                className="p-fluid"
                onHide={hideDialog}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div>

                        <div className="mt-2 mb-2">
                            <label htmlFor="" className="form-label">
                                Select Screen size:{" "}
                            </label>
                            <select
                                name="screen_size"
                                className="form-select"
                                value={formik.values.screen_size}
                                // onChange={formik.handleChange}
                                onChange={async (event) => {
                                    const selectedSize = event.target.value;
                                    formik.setFieldValue("screen_size", selectedSize);
                                    // if already selected image 
                                    const file = formik.values.image;
                                    if (file && selectedSize) {
                                        const isValid = await validateImageDimensions(
                                            file,
                                            selectedSize
                                        );
                                        if (!isValid) {
                                            formik.setFieldValue("image", "");
                                            // setPreviewImage(null);
                                        }
                                    }
                                }}
                            >
                                <option value="">--Select Screen Size--</option>
                                <option value="320">320 x 300 px - Small Mobile</option>
                                <option value="375">375 x 300 px - Mobile</option>
                                <option value="425">425 x 300 px - Large Mobile</option>
                                <option value="768">768 x 300 px - Tablet</option>
                                <option value="1024">1024 x 365 px - Small Desktop</option>
                                <option value="desktop">Desktop (1024 x 365 px or above) </option>
                            </select>
                            {formik.errors.screen_size && formik.touched.screen_size && (
                                <small className="text-danger">
                                    {formik.errors.screen_size}
                                </small>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Blog Banner :</label>

                            <div className="d-flex align-items-center gap-2">
                                <input
                                    type="file"
                                    id="blog_banner"
                                    name="blog_banner"
                                    className="form-select"
                                    // onChange={(e) => {
                                    //     formik.setFieldValue("blog_banner", e.target.files[0]);
                                    // }}
                                    onChange={async (event) => {
                                        const file = event.currentTarget.files[0];

                                        if (!file) return;

                                        if (!formik.values.screen_size) {
                                            Toast({
                                                message: "Please select screen size first.",
                                                type: "error",
                                            });
                                            event.target.value = "";
                                            return;
                                        }

                                        // .....Check image dimensions
                                        const isValid = await validateImageDimensions(
                                            file,
                                            formik.values.screen_size
                                        );

                                        if (!isValid) {
                                            //.... Invalid image clear the file input and formik value
                                            event.target.value = "";
                                            formik.setFieldValue("image", "");
                                            // setPreviewImage(null);
                                            return;
                                        }
                                        // ....Valid image
                                        formik.setFieldValue("image", file);
                                        //   setPreviewImage(URL.createObjectURL(file));
                                    }}
                                />

                                {editing && currentImage && (
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                        onClick={() =>
                                            window.open(
                                                `${IMG_PATH}/blog_single_banner/${currentImage}`,
                                                "_blank"
                                            )
                                        }
                                    >
                                        <VisibilityIcon />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="" className="form-label me-2">Dark Theme :</label>
                            <Switch
                                checked={formik.values.theme === "dark"}
                                onChange={(checked) => {
                                    formik.setFieldValue("theme", checked ? "dark" : "light");
                                }}
                            />
                        </div>
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

        </>
    );
};

export default MainBanner;


