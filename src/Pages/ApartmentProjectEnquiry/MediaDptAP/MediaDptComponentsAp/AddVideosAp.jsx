import { useEffect, useState } from "react";
import customStyle from "../../../../Utils/tableStyle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "react-data-table-component";
import Button from "@mui/material/Button";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
    mediaVideoDeleteThunk,
    mediaVideoGetThunk,
    mediaVideoPostThunk,
    mediaVideoUpdateThunk,
} from "../../../../Redux/Actions/Enquiry/MediaDptEnq/MediaDptEnqVideoThunk";
import { IMG_PATH } from "../../../../Api/api";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Progress } from "antd";
import Toast from "../../../../Utils/Toast";

const AddVideosAp = ({ eid, status, pagetype }) => {
    const staffid = JSON.parse(localStorage.getItem("token"));
    const [videoDialog, setvideoDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [textType, setTextType] = useState(false);
    const [editing, setEditing] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [url, setUrl] = useState("");
    const dispatch = useDispatch();

    const openDelete = (row) => {
        setDeleteDialog(true);
        setDeleteId(row.id);
    };
    const handleDelete = () => {
        dispatch(mediaVideoDeleteThunk(deleteId)).then(() => {
            dispatch(mediaVideoGetThunk(eid));
            Toast({ message: "Successfully Deleted", type: "success" });
        });
        setDeleteDialog(false);
    };
    const hideDeleteProductsDialog = () => {
        setDeleteDialog(false);
    };
    const deleteUnitsDialogFooter = (
        <div className=" d-flex gap-3 justify-content-end">
            <Button variant="outlined" onClick={() => setDeleteDialog(false)}>
                {" "}
                No{" "}
            </Button>
            <Button variant="contained" onClick={handleDelete}>
                {" "}
                Yes{" "}
            </Button>
        </div>
    );

    const onSubmit = async (values) => {
        let payload;
        if (editing) {
            if (textType) {
                payload = {
                    ...values,
                    file: "",
                    oldFile: null,
                };
            } else {
                payload = {
                    ...values,
                    file: values.file === formik.initialValues.file ? "" : values.file,
                };
            }
            try {
                await dispatch(mediaVideoUpdateThunk(payload)).then(() => {
                    dispatch(mediaVideoGetThunk(eid));
                    Toast({ message: "Successfully Updated", type: "success" });
                });
                setEditDialog(false);
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                await dispatch(mediaVideoPostThunk(values)).then(() => {
                    dispatch(mediaVideoGetThunk(eid));
                    Toast({ message: "Successfully created", type: "success" });
                });
                formik.resetForm();
                setvideoDialog(false);
            } catch (error) {
                console.error(error);
            }
        }
    };
    useEffect(() => {
        dispatch(mediaVideoGetThunk(eid));
    }, []);

    const videosData = useSelector((state) => state.mediaVideodata.get?.data);
    const postLoading = useSelector(
        (state) => state.mediaVideodata?.post?.loading
    );
    const updateLoading = useSelector(
        (state) => state.mediaVideodata?.update?.loading
    );

    const formik = useFormik({
        initialValues: {
            file: null,
            link: null,
            type: "",
            enqid: eid,
        },
        validationSchema: yup.object().shape({
            type: yup.string().required("type is required !!"),
            link: yup.string().when([], {
                is: () => textType === true,
                then: (schema) => schema.required("Link is required !!"),
                otherwise: (schema) => schema.notRequired(),
            }),
            file: yup.mixed().when([], {
                is: () => textType === false,
                then: (schema) => schema.required("File is required !!"),
                otherwise: (schema) => schema.notRequired(),
            }),
        }),
        onSubmit,
    });

    const hideDialog = () => {
        setvideoDialog(false);
        formik.resetForm();
    };

    const cancelDialog = () => {
        setvideoDialog(false);
        if (formik?.values) {
            formik.resetForm();
        }
    };

    const hideEditDialog = () => {
        setEditDialog(false);
        formik.resetForm();
    };

    const cancelEditDialog = () => {
        setEditDialog(false);
        if (formik?.values) {
            formik.resetForm();
        }
    };
    const handleEdit = (row) => {
        setTextType(row.type === "link");
        setEditDialog(true);
        formik.setFieldValue("type", row.type);
        formik.setFieldValue("link", row.video_link || "");
        formik.setFieldValue("id", row.id);
        formik.setFieldValue("oldfile", row.video_file);
        formik.setFieldValue("file", row.video_file);
        const videoFileUrl = `${IMG_PATH}/enquiry/media/${row.video_file}`;
        setUrl(videoFileUrl);
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
            name: "video",
            selector: (row) => row.video_file,
            sortable: true,
            cell: (row) => {
                if (row.video_file) {
                    const videoFileUrl = `${IMG_PATH}/enquiry/media/${row.video_file}`;

                    return (
                        <video width="150" height="100" controls className="mt-1 mb-1">
                            <source src={videoFileUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    );
                } else if (row.video_link) {
                    return (
                        <a href={row.video_link} target="_blank" rel="noopener noreferrer">
                            <button className="btn btn-primary" style={{ minWidth: "150px" }}>
                                Link
                            </button>
                        </a>
                    );
                } else {
                    return <span>No Video</span>;
                }
            },
        },
        ...(staffid.Login === "staff" &&
            (status === "pending" || status === "complete") &&
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
                    sortable: true,
                },
            ]
            : []),
    ];

    const handleCategoryChange = (event) => {
        const selectedType = event.target.value;

        setTextType(selectedType === "link");
        formik.handleChange(event);
    };

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
            <div className="mt-4">
                <div className="d-flex justify-content-end mb-3">
                    {(status == "pending" || status == "complete") &&
                        staffid.Login == "staff" &&
                        pagetype !== "reminder" && enquiryDoumentData?.status !== "booking" && (
                            <div className="ms-2">
                                <a
                                    href="#"
                                    onClick={() => setvideoDialog(true)}
                                    className="btn1 me-2"
                                >
                                    + Add
                                </a>
                            </div>
                        )}
                </div>
                <DataTable
                    persistTableHead={true}
                    columns={column1}
                    data={videosData}
                    customStyles={customStyle}
                    pagination
                    // selectableRows
                    fixedHeader
                />
            </div>
            {/*New Dialog */}
            <Dialog
                visible={videoDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Add Videos"
                modal
                className="p-fluid"
                onHide={() => {
                    if (!postLoading) hideDialog();
                }}
                closable={!postLoading}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div>
                        <div className="form-group">
                            <label className="form-label">
                                Type :<span style={{ color: "red" }}>*</span>{" "}
                            </label>
                            <select
                                name="type"
                                id="type"
                                className="form-select mt-2"
                                value={formik.values.type}
                                // onChange={formik.handleChange}
                                onChange={handleCategoryChange}
                                onBlur={formik.handleBlur}
                            >
                                <option>Select Type</option>
                                <option value="link">Link</option>
                                <option value="file">File</option>
                            </select>
                            {formik.errors.type && formik.touched.type ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.type}
                                </p>
                            ) : null}
                        </div>
                        {formik.values.type && (
                            <div className="mt-3 form-group">
                                {textType ? (
                                    <>
                                        <label htmlFor="textInput">Enter Text :</label>
                                        <input
                                            name="link"
                                            id="link"
                                            type="text"
                                            className="form-control mt-2"
                                            value={formik.values.link || null}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.link && formik.touched.link ? (
                                            <p style={{ color: "red", fontSize: "14px" }}>
                                                {formik.errors.link}
                                            </p>
                                        ) : null}
                                    </>
                                ) : (
                                    <>
                                        <label htmlFor="video">Choose Video :</label>
                                        <input
                                            name="file"
                                            id="file"
                                            type="file"
                                            // value={formik.values.file || null}
                                            className="form-control mt-2"
                                            accept="video/*"
                                            style={{ height: "40px" }}
                                            onChange={(event) =>
                                                formik.setFieldValue("file", event.target.files[0])
                                            }
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.file && formik.touched.file ? (
                                            <p style={{ color: "red", fontSize: "14px" }}>
                                                {formik.errors.file}
                                            </p>
                                        ) : null}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        {!postLoading && (
                            <button
                                onClick={cancelDialog}
                                type="button"
                                className="btn1"
                                disabled={postLoading}
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            className="btn1"
                            onClick={() => setEditing(false)}
                            disabled={postLoading}
                        >
                            {postLoading ? (
                                <>
                                    <Progress
                                        type="circle"
                                        percent={progress}
                                        size={35}
                                        strokeColor="#39534e"
                                    />
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
                            Please wait while the video is uploading...
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
                        Are you sure you want to delete the selected Video
                    </span>
                </div>
            </Dialog>

            {/*Edit Dialog */}

            <Dialog
                visible={editDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Edit Videos"
                modal
                className="p-fluid"
                onHide={() => {
                    if (!updateLoading) hideDialog();
                }}
                closable={!updateLoading}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div>
                        <div className="form-group">
                            <label>Type :</label>
                            <select
                                name="type"
                                id="type"
                                className="form-select mt-2"
                                value={formik.values.type}
                                onChange={handleCategoryChange}
                                onBlur={formik.handleBlur}
                            >
                                <option>Select Type</option>
                                <option value="link">Link</option>
                                <option value="file">File</option>
                            </select>
                            {/* {formik.errors.type && formik.touched.type ? (
                                <p style={{ color: "red", fontSize: '14px' }}>{formik.errors.type}</p>
                            ) : null} */}
                        </div>
                        {formik.values.type && (
                            <div className="mt-3 form-group">
                                {textType ? (
                                    <>
                                        <label htmlFor="textInput">Enter Text :</label>
                                        <input
                                            name="link"
                                            id="link"
                                            type="text"
                                            className="form-control mt-2"
                                            value={formik.values.link || ""}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.link && formik.touched.link ? (
                                            <p style={{ color: "red", fontSize: "14px" }}>
                                                {formik.errors.link}
                                            </p>
                                        ) : null}
                                    </>
                                ) : (
                                    <div>
                                        <label htmlFor="video">Choose Video :</label>
                                        <div className="d-flex gap-3 align-items-center">
                                            <input
                                                name="file"
                                                id="file"
                                                type="file"
                                                className="form-control mt-2"
                                                accept="video/*"
                                                style={{ height: "40px" }}
                                                onChange={(event) =>
                                                    formik.setFieldValue("file", event.target.files[0])
                                                }
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.errors.file && formik.touched.file ? (
                                                <p style={{ color: "red", fontSize: "14px" }}>
                                                    {formik.errors.file}
                                                </p>
                                            ) : null}

                                            <button className="btn btn-success" onClick={viewFile}>
                                                <RemoveRedEyeIcon />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        {!updateLoading && (
                            <button
                                onClick={cancelEditDialog}
                                type="button"
                                className="btn1"
                                disabled={updateLoading}
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
                            {/* {updateLoading ? (
                                <ThreeDots
                                    visible={true}
                                    height="16"
                                    width="70"
                                    color="#ffffff"
                                    radius="18"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{
                                        justifyContent: "center",
                                        fontSize: "10px",
                                    }}
                                    wrapperClass=""
                                />
                            ) : (
                                "Update "
                            )} */}

                            {updateLoading ? (
                                <>
                                    <Progress
                                        type="circle"
                                        percent={progress}
                                        size={35}
                                        strokeColor="#39534e"
                                    />
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
                            Please wait while the video is updating...
                        </p>
                    )}
                </form>
            </Dialog>
        </>
    );
};

export default AddVideosAp;
