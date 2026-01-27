import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "react-data-table-component";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { ThreeDots } from "react-loader-spinner";
import Button from "@mui/material/Button";
import { Progress } from "antd";
import { mediaDeletePhotoThunk, mediaGetPhotoThunk, mediaPostPhotoThunk, mediaUpdatePhotoThunk } from "../../../../Redux/Actions/Enquiry/MediaDptEnq/MediaDptPhotoThunk";
import Toast from "../../../../Utils/Toast";
import { IMG_PATH } from "../../../../Api/api";
import customStyle from "../../../../Utils/tableStyle";


const AddPhotosApart = ({ eid, status, pagetype }) => {
    const [photoDialog, setPhotoDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [url, setUrl] = useState("");
    const [editing, setEditing] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const dispatch = useDispatch();
    const staffid = JSON.parse(localStorage.getItem("token"));

    const photoData = useSelector((state) => state.mediaPhotodata?.get?.data);
    const updateLoading = useSelector(
        (state) => state.mediaPhotodata?.update?.loading
    );
    const postLoading = useSelector(
        (state) => state.mediaPhotodata?.post?.loading
    );
    const deleteLoading = useSelector(
        (state) => state.mediaPhotodata?.delete?.loading
    );

    const openDelete = (row) => {
        setDeleteDialog(true);
        setDeleteId(row.id);
    };
    const handleDelete = async () => {
        try {
            const response = await dispatch(mediaDeletePhotoThunk(deleteId));

            if (mediaDeletePhotoThunk.fulfilled.match(response)) {
                const message = response.payload.data;
                setDeleteDialog(false);
                formik.resetForm();
                dispatch(mediaGetPhotoThunk(eid));

            } else if (mediaDeletePhotoThunk.rejected.match(response)) {
                const errorPayload = response.payload.error.reason;
            }
        } catch (error) {
            console.error(error);
        }
    };
    const hideDeleteProductsDialog = () => {
        setDeleteDialog(false);
    };
    const deleteUnitsDialogFooter = (
        <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="outlined" onClick={() => setDeleteDialog(false)}>
                {" "}
                No{" "}
            </Button>
            <Button variant="contained" onClick={handleDelete}>
                {deleteLoading ? (
                    <ThreeDots
                        visible={true}
                        height="20"
                        width="80"
                        color="#ffffff"
                        radius="18"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{
                            justifyContent: "center",
                            fontSize: "12px",
                        }}
                        wrapperClass=""
                    />
                ) : (
                    "Yes "
                )}
            </Button>
        </div>
    );

    const onSubmit = async (values) => {
        if (editing) {
            try {
                const payload = {
                    ...values,
                    oldfile: values.file,
                    id: values.id,
                };
                const response = await dispatch(mediaUpdatePhotoThunk(payload));
                if (mediaUpdatePhotoThunk.fulfilled.match(response)) {
                    const message = response.payload.data;
                    setEditDialog(false);
                    formik.resetForm();
                    dispatch(mediaGetPhotoThunk(eid));
                    Toast({ message: "Successfully Updated", type: "success" });


                } else if (mediaUpdatePhotoThunk.rejected.match(response)) {
                    const errorPayload = response.payload.error.reason;

                }
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await dispatch(mediaPostPhotoThunk(values));

                if (mediaPostPhotoThunk.fulfilled.match(response)) {
                    const message = response.payload.data;
                    setPhotoDialog(false);
                    formik.resetForm();
                    dispatch(mediaGetPhotoThunk(eid));
                    Toast({ message: "Successfully Created", type: "success" });
                } else if (mediaPostPhotoThunk.rejected.match(response)) {
                    const errorPayload = response.payload.error.reason;
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
    useEffect(() => {
        dispatch(mediaGetPhotoThunk(eid));
    }, []);

    const formik = useFormik({
        initialValues: {
            file: "",
            notes: "",
            enqid: eid,
        },
        validationSchema: yup.object().shape({
            file: yup.string().required("file is required!!"),
            notes: yup.string().required("notes is required!!"),
        }),
        onSubmit,
    });
    const hideDialog = () => {
        setPhotoDialog(false);
        formik.resetForm();
    };

    const handleEdit = (row) => {
        setEditDialog(true);
        formik.setFieldValue("notes", row.notes);
        formik.setFieldValue("id", row.id);

        const imgFileUrl = `${IMG_PATH}/enquiry/gallery/${row.gallery}`;
        formik.setFieldValue("file", row.gallery);
        setUrl(imgFileUrl);
    };
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
            name: "Images",
            selector: (row) => row.gallery,
            sortable: true,
            cell: (row) => {
                if (row.gallery) {
                    const imgFileUrl = `${IMG_PATH}/enquiry/gallery/${row.gallery}`;

                    return (
                        <img
                            width="150"
                            height="100"
                            controls
                            className="mt-1 mb-1 rounded-circle"
                            src={imgFileUrl}
                            alt="media img"
                        />
                    );
                } else {
                    return <div>no photo</div>;
                }
            },
        },
        {
            name: "Description",
            selector: (row) => row.notes,
            sortable: true,
        },
        ...(staffid.Login == "staff" &&
            (status == "pending" || status == "complete") &&
            pagetype !== "reminder" && enquiryDoumentData?.status !== "booking"
            ? [
                {
                    name: "Actions",
                    cell: (row) => (
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
                    ),
                },
            ]
            : []),
    ];

    const viewFile = () => {
        window.open(url, "_blank");
    };

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let timer;

        if (postLoading) {
            setProgress(10);

            timer = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 95) return prev;
                    return prev + 5;
                });
            }, 300);
        } else {
            setProgress(100);
            setTimeout(() => setProgress(0), 500);
        }

        return () => clearInterval(timer);
    }, [postLoading]);


    useEffect(() => {
        let timer;

        if (updateLoading) {
            setProgress(10);

            timer = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 95) return prev;
                    return prev + 5;
                });
            }, 300);
        } else {
            setProgress(100);
            setTimeout(() => setProgress(0), 500);
        }

        return () => clearInterval(timer);
    }, [updateLoading]);
    return (
        <>
            <div className="mt-2">
                <div className="d-flex justify-content-end mb-3">
                    {(status === "pending" || status === "complete") &&
                        staffid.Login === "staff" &&
                        pagetype !== "reminder" && enquiryDoumentData?.status !== "booking" && (
                            <div className="ms-2">
                                <button
                                    onClick={() => setPhotoDialog(true)}
                                    className="btn1 me-2"
                                >
                                    + Add
                                </button>
                            </div>
                        )}
                </div>
                <DataTable
                    persistTableHead={true}
                    columns={column1}
                    data={photoData}
                    customStyles={customStyle}
                    pagination
                    fixedHeader
                />
            </div>

            <Dialog
                visible={photoDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Add Photos"
                modal
                className="p-fluid"
                onHide={() => {
                    if (!postLoading) hideDialog();
                }}
                closable={!postLoading}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div>
                        <div className="mt-3 form-group">
                            <label htmlFor="file" className="form-label">
                                {" "}
                                Choose Image : <span style={{ color: "red" }}>*</span>{" "}
                            </label>
                            <input
                                name="file"
                                id="file"
                                type="file"
                                className="form-control mt-2"
                                accept="image/*"
                                style={{ height: "40px" }}
                                onChange={(event) => {
                                    formik.setFieldValue("file", event.target.files[0]);
                                }}
                                onBlur={formik.handleBlur}
                            // value={formik.values.file}
                            />
                            {formik.errors.file && formik.touched.file ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.file}
                                </p>
                            ) : null}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="notes" className="form-label">
                                {" "}
                                Description :<span style={{ color: "red" }}>*</span>{" "}
                            </label>
                            <textarea
                                name="notes"
                                id="notes"
                                placeholder="Text here...."
                                className="form-control mt-2"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.notes}
                                style={{ height: "100px" }}
                            />
                            {formik.errors.notes && formik.touched.notes && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.notes}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        {!postLoading && (
                            <button
                                type="button"
                                className="btn1 "
                                onClick={() => {
                                    setPhotoDialog(false);
                                    formik.resetForm();
                                }}
                            >
                                Cancel
                            </button>
                        )}

                        <button
                            type="submit"
                            className="btn1 "
                            onClick={() => setEditing(false)}
                            disabled={postLoading}
                        >
                            {postLoading ? (
                                <>
                                    <Progress type="circle" percent={progress} size={35} strokeColor="#39534e" />
                                    <span style={{ marginLeft: "10px" }}>uploading...</span>
                                </>
                            ) : (
                                "Save"
                            )}
                        </button>
                    </div>
                    {postLoading && (
                        <p
                            className="text-center mt-3"
                            style={{ color: "green", fontSize: "13px" }}
                        >
                            Please wait while the photo is uploading...
                        </p>
                    )}
                </form>
            </Dialog>

            {/*Delete Dialog */}
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
                        Are you sure you want to delete the selected Image
                    </span>
                </div>
            </Dialog>

            {/*Edit Modal */}
            <Dialog
                visible={editDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Edit Images"
                modal
                className="p-fluid"
                onHide={() => {
                    if (!updateLoading) hideDialog();
                }}
                closable={!updateLoading}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div>
                        <div className="mt-3 form-group">
                            <label htmlFor="file"> Choose Image :</label>
                            <div className="d-flex gap-3 align-items-center">
                                <input
                                    name="file"
                                    id="file"
                                    type="file"
                                    className="form-control mt-2"
                                    accept="image/*"
                                    style={{ height: "40px" }}
                                    onChange={(event) => {
                                        formik.setFieldValue("file", event.target.files[0]);
                                    }}
                                    onBlur={formik.handleBlur}
                                // value={formik.values.file}
                                />
                                {/* {formik.errors.file && formik.touched.file ? (
                                    <p style={{ color: "red", fontSize: '14px' }}>{formik.errors.file}</p>
                                ) : null} */}

                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={viewFile}
                                >
                                    <RemoveRedEyeIcon />
                                </button>
                            </div>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="notes"> Description :</label>
                            <textarea
                                name="notes"
                                id="notes"
                                placeholder="Text here...."
                                className="form-control mt-2"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.notes}
                                style={{ height: "100px" }}
                            />

                            {formik.errors.notes && formik.touched.notes && (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.notes}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        {!updateLoading && (
                            <button
                                type="button"
                                className="btn1 "
                                onClick={() => {
                                    setEditDialog(false);
                                    formik.resetForm();
                                }}
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            className="btn1 "
                            onClick={() => setEditing(true)}
                            disabled={updateLoading}
                        >
                            {updateLoading ? (
                                <>
                                    <Progress type="circle" percent={progress} size={35} strokeColor="#39534e" />
                                    <span style={{ marginLeft: "10px" }}>uploading...</span>
                                </>
                            ) : (
                                "Update"
                            )}
                        </button>
                    </div>

                    {updateLoading && (
                        <p
                            className="text-center mt-3"
                            style={{ color: "green", fontSize: "13px" }}
                        >
                            Please wait while the photo is updating...
                        </p>
                    )}
                </form>
            </Dialog>
        </>
    );
};

export default AddPhotosApart;
