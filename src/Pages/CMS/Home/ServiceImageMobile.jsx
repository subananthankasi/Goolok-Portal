import { useFormik } from "formik";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal, Button, TagPicker } from "rsuite";
import DataTable from "react-data-table-component";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../../Api/api";
import Toast from "../../../Utils/Toast";
import customStyle from "../../../Utils/tableStyle";
import { Dialog } from "primereact/dialog";
import Stack from "@mui/material/Stack";
import MuiButton from "@mui/material/Button";
import OpenPreviewImage from "../../../Utils/OpenPreviewImage";
import { Switch } from "antd";
import SectionTitle from "./SectionTitle";

const ServiceImageMobile = () => {
    const [newDialog, setNewDialog] = useState(false);
    const [fetchbanner, setFetchbanner] = useState([]);
    const [deleteconfirmmodal, setDeleteconfirmmodal] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [fetchcoupon, setFetchcoupon] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [preview, setPreview] = useState(false);
    const [previewUrl, setPreviwUrl] = useState(null);
    const [titlemodal, setTitlemodal] = useState(false);

    const handlePreview = (row) => {
        setPreview(true);
        const url = `${IMG_PATH}/cms/mobileserviceimg/${row.image}`;
        setPreviwUrl(url);
    };

    const columns = [
        {
            name: "S.no",
            selector: (row, index) => index + 1,
            sortable: true,
        },

        // {
        //   name: "Coupon",
        //   selector: (row) => row.coupon_name,
        //   sortable: true,
        // },

        {
            name: "Image",
            cell: (row) =>
                row.image ? (
                    <div onClick={() => handlePreview(row)} style={{ cursor: "pointer" }}>
                        <img
                            src={`${IMG_PATH}/cms/mobileserviceimg/${row.image}`}
                            alt={row.title}
                            style={{
                                width: "100px",
                                height: "80px",
                                objectFit: "cover",
                                borderRadius: "6px",
                            }}
                        />
                    </div>
                ) : (
                    <span className="text-muted">No image</span>
                ),
            wrap: true,
            sortable: false,
        },
        {
            name: "Link",
            selector: (row) => row.link,
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
        formik.setFieldValue("image", row.image || "");
        formik.setFieldValue("link", row.link || "");
        setPreviewImage(`${IMG_PATH}/cms/mobileserviceimg/${row.image}`);
        formik.setFieldValue("old_image", row.image || "");
        formik.setFieldValue("status", row.status || "");
    };

    const fetch = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/mobileserviceimg`);
            setFetchbanner(response.data?.data || []);
        } catch (error) { }
    };

    useEffect(() => {
        fetch();
    }, []);



    const onSubmit = async (values) => {
        setIsSubmitting(true);
        values.theme = values.theme || "light";
        try {
            const response = await axios.post(
                `${API_BASE_URL}/mobileserviceimg`,
                values,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                },
            );
            Toast({ message: "Successfully Created", type: "success" });
            setNewDialog(false);
            await fetch();
            formik.resetForm();
            setPreviewImage(null);
        } catch (error) {
            Toast({ message: "Error while creating banner", type: "error" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            // coupon: [],
            image: "",
            link: "",
            status: "",
            theme: "light",
        },
        // validationSchema: yup.object().shape({
        //   image: yup.string().required("image is required!"),
        //   link: yup.string().required("url is link!"),
        //   status: yup.string().required("Status is required"),
        // }),
        onSubmit,
    });
    const handleConfirmClosedelete = () => {
        setDeleteconfirmmodal(false);
    };
    const handleconfirmopendelete = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/mobileserviceimg/${selectedRowId}`);
            fetch();
            Toast({ message: "Successfully Deleted", type: "success" });
        } catch (error) {
        } finally {
            setDeleteconfirmmodal(false);
        }
    };

    const data = fetchcoupon?.map((item) => ({
        label: item.coupon_code,
        value: item.id,
    }));

    return (
        <>
            <OpenPreviewImage
                preview={preview}
                setPreview={setPreview}
                url={previewUrl}
            />
            <SectionTitle
                visible={titlemodal}
                setVisible={setTitlemodal}
                section="ServiceMobileImage"
            />
            <section className="section">
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between">
                                <h4 className="page_heading">Service Image For Mobile</h4>
                                <div className="d-flex gap-2">
                                    <button
                                        type="button"
                                        className="btn1"
                                        onClick={() => {
                                            setTitlemodal(true);
                                        }}
                                    >
                                        Add Title
                                    </button>
                                    {fetchbanner.length === 0 && (
                                        <button
                                            type="button"
                                            className="btn1"
                                            onClick={() => {
                                                setNewDialog(true);
                                            }}
                                        >
                                            Add
                                        </button>
                                    )}
                                </div>
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
                size={"30rem"}
                open={newDialog}
                onClose={() => {
                    setNewDialog(false);
                    formik.resetForm();
                    setPreviewImage(null);
                }}
            >
                <Modal.Header>
                    <Modal.Title>Image Upload </Modal.Title>
                </Modal.Header>

                <Modal.Body
                    className="p-2"
                //   style={{ overflow: "scroll", overflowX: "hidden" }}
                >
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                                Banner Image
                            </label>

                            {previewImage && (
                                <div className="mb-2">
                                    <img
                                        src={previewImage}
                                        alt="preview"
                                        style={{
                                            width: "120px",
                                            height: "90px",
                                            objectFit: "cover",
                                            borderRadius: "6px",
                                        }}
                                    />
                                </div>
                            )}

                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    formik.setFieldValue("image", file);
                                    if (file) {
                                        setPreviewImage(URL.createObjectURL(file));
                                    }
                                }}
                            />
                            {formik.errors.image && formik.touched.image && (
                                <small className="text-danger">{formik.errors.image}</small>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="url" className="form-label">
                                URL
                            </label>
                            <input
                                id="url"
                                name="link"
                                className="form-control"
                                placeholder="Enter url ..."
                                value={formik.values.link}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            {formik.errors.link && formik.touched.link && (
                                <small className="text-danger">{formik.errors.link}</small>
                            )}
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

export default ServiceImageMobile;
