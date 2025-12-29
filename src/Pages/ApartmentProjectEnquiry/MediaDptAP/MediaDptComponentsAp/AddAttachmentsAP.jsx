import React, { useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DataTable from "react-data-table-component";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { ThreeCircles } from "react-loader-spinner";
import { Progress } from "antd";
import { mediaAttachmentDeleteThunk, mediaAttachmentGetThunk, mediaAttachmentPostThunk, mediaAttachmentUpdateThunk } from "../../../../Redux/Actions/Enquiry/MediaDptEnq/MediaDptAttachmentThunk";
import { IMG_PATH } from "../../../../Api/api";
import customStyle from "../../../../Utils/tableStyle";

const AddAttachmentsAP = ({ eid, status, pagetype }) => {
    const [broucherDialog, setBroucherDialog] = useState(false);
    const [vrTextType, setVrTextType] = useState(false);
    const [arTextType, setArTextType] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [broucherUrl, setBroucherUrl] = useState("");
    const [buildingUrl, setBuildingUrl] = useState("");
    const [floorUrl, setFloorUrl] = useState("");
    const [layoutsUrl, setLayoutsUrl] = useState("");
    const [mappingUrl, setMappingUrl] = useState("");
    const [vrUrl, setVrUrl] = useState("");
    const [arUrl, setArUrl] = useState("");
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const staffid = JSON.parse(sessionStorage.getItem("token"));
    const enquiryDoumentData = useSelector(
        (state) => state.Enquiry.enquiryDocument
    );

    const [editing, setEditing] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(mediaAttachmentGetThunk(eid));
    }, []);

    const mediaData = useSelector(
        (state) => state.mediaAttachmentData?.get?.data
    );
    const mediaDataLoading = useSelector(
        (state) => state.mediaAttachmentData?.get?.loading
    );
    const postLoading = useSelector(
        (state) => state.mediaAttachmentData?.post?.loading
    );
    const updateLoading = useSelector(
        (state) => state.mediaAttachmentData?.update?.loading
    );
    const deleteLoading = useSelector(
        (state) => state.mediaAttachmentData?.delete?.loading
    );

    const openDelete = (row) => {
        setDeleteDialog(true);
        setDeleteId(row.id);
    };
    const handleDelete = async () => {
        try {
            const response = await dispatch(mediaAttachmentDeleteThunk(deleteId));

            if (mediaAttachmentDeleteThunk.fulfilled.match(response)) {
                const message = response.payload.data;
                setDeleteDialog(false);
                formik.resetForm();
                await dispatch(mediaAttachmentGetThunk(eid));
            } else if (mediaAttachmentDeleteThunk.rejected.match(response)) {
                const errorPayload = response;
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
            <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setDeleteDialog(false)}
            >
                Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
                {deleteLoading ? (
                    <ThreeDots
                        visible={true}
                        height="10"
                        width="40"
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
                    "Delete "
                )}
            </button>
        </div>
    );

    const onSubmit = async (values) => {
        if (editing) {
            //editSubmit

            try {
                const response = await dispatch(mediaAttachmentUpdateThunk(values));

                if (mediaAttachmentUpdateThunk.fulfilled.match(response)) {
                    const message = response.payload.data;
                    await dispatch(mediaAttachmentGetThunk(eid));
                    setEditDialog(false);
                    formik.resetForm();
                } else if (mediaAttachmentUpdateThunk.rejected.match(response)) {
                    const errorPayload = response.payload.error.reason;
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            // Create Submit
            try {
                const response = await dispatch(mediaAttachmentPostThunk(values));

                if (mediaAttachmentPostThunk.fulfilled.match(response)) {
                    const message = response.payload.data;
                    await dispatch(mediaAttachmentGetThunk(eid));
                    setBroucherDialog(false);
                    formik.resetForm();
                } else if (mediaAttachmentPostThunk.rejected.match(response)) {
                    const errorPayload = response.payload.error.reason;
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
    const validate = (values) => {
        const errors = {};

        // === COMMON FIELDS ===
        if (!values.brochures) {
            errors.brochures = "Brochures is required";
        }
        if (!values.layouts) {
            errors.layouts = "Layouts is required";
        }
        if (!values.floor) {
            errors.floor = "Floor plan is required";
        }
        if (!values.building) {
            errors.building = "Building details is required";
        }
        if (!values.mapping) {
            errors.mapping = "Mapping is required";
        }

        // === VR SECTION ===
        if (!values.vrtype) {
            errors.vrtype = "Please select VR type";
        } else {
            if (values.vrtype === "file") {
                if (!values.vrfile) {
                    errors.vrfile = "Please upload VR file";
                }
            } else if (values.vrtype === "link") {
                if (!values.vrlink) {
                    errors.vrlink = "Please enter VR link";
                }
            }
        }

        // === AR SECTION ===
        if (!values.artype) {
            errors.artype = "Please select AR type";
        } else {
            if (values.artype === "file") {
                if (!values.arfile) {
                    errors.arfile = "Please upload AR file";
                }
            } else if (values.artype === "link") {
                if (!values.arlink) {
                    errors.arlink = "Please enter AR link";
                }
            }
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            brochures: "",
            layouts: "",
            floor: "",
            building: "",
            mapping: "",
            artype: "file",
            vrtype: "file",
            vrfile: null,
            vrlink: "",
            arfile: null,
            arlink: "",
            enqid: eid,
            id: null,
        },

        // validationSchema: yup.object().shape({
        //   brochures: yup.string().required("brouchers is required!!"),
        //   layouts: yup.string().required("layouts is required!!"),
        //   floor: yup.string().required("floor is required!!"),
        //   building: yup.string().required("building is required!!"),
        //   mapping: yup.string().required("mapping is required!!"),
        //   vrtype: yup.string().required("vrtype is required!!"),
        //   artype: yup.string().required("artype is required!!"),
        //   vrlink: yup.string().when("vrtype", {
        //     is: "link",
        //     then: (schema) => schema.required("VR Link is required !!"),
        //   }),
        //   vrfile: yup.mixed().when("vrtype", {
        //     is: "file",
        //     then: (schema) => schema.required("VR File is required !!"),
        //   }),

        //   arlink: yup.string().when("artype", {
        //     is: "link",
        //     then: (schema) => schema.required("AR Link is required !!"),
        //   }),
        //   arfile: yup.mixed().when("artype", {
        //     is: "file",
        //     then: (schema) => schema.required("AR File is required !!"),
        //   }),
        // }),

        validate,
        onSubmit,
    });
    const hideDialog = () => {
        setBroucherDialog(false);
        formik.resetForm();
    };
    const hideEditDialog = () => {
        setEditDialog(false);
        formik.resetForm();
    };

    const handleEdit = (row) => {
        setEditDialog(true);
        const broucherUrl = `${IMG_PATH}/enquiry/attach/${row.brochures}`;
        const buildingUrl = `${IMG_PATH}/enquiry/attach/${row.building}`;
        const floor = `${IMG_PATH}/enquiry/attach/${row.floor}`;
        const layouts = `${IMG_PATH}/enquiry/attach/${row.layouts}`;
        const mapping = `${IMG_PATH}/enquiry/attach/${row.mapping}`;
        const vr = `${IMG_PATH}/enquiry/attach/${row.vr_file}`;
        const ar = `${IMG_PATH}/enquiry/attach/${row.ar_file}`;
        setBroucherUrl(broucherUrl);
        setBuildingUrl(buildingUrl);
        setFloorUrl(floor);
        setLayoutsUrl(layouts);
        setMappingUrl(mapping);
        setVrUrl(vr);
        setArUrl(ar);
        formik.setFieldValue("brochures", row.brochures);
        formik.setFieldValue("building", row.building);
        formik.setFieldValue("floor", row.floor);
        formik.setFieldValue("layouts", row.layouts);
        formik.setFieldValue("mapping", row.mapping);
        formik.setFieldValue("vrfile", row.vr_file);
        formik.setFieldValue("arfile", row.ar_file);
        formik.setFieldValue("arlink", row.ar_link);
        formik.setFieldValue("vrlink", row.vr_link);
        formik.setFieldValue("vrtype", row.vr_type);
        formik.setFieldValue("artype", row.ar_type);
        formik.setFieldValue("id", row.id);
    };

    const viewBroucher = () => {
        window.open(broucherUrl, "_blank");
    };
    const viewBuilding = () => {
        window.open(buildingUrl, "_blank");
    };
    const viewFloor = () => {
        window.open(floorUrl, "_blank");
    };
    const viewLayouts = () => {
        window.open(layoutsUrl, "_blank");
    };
    const viewMapping = () => {
        window.open(mappingUrl, "_blank");
    };
    const viewVr = () => {
        window.open(vrUrl, "_blank");
    };
    const viewAr = () => {
        window.open(arUrl, "_blank");
    };

    const column1 = [
        {
            name: "S.no",
            cell: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Broucher",
            selector: (row) => row.brochures,
            sortable: true,
            cell: (row) =>
                row.brochures ? (
                    <a
                        href={`${IMG_PATH}/enquiry/attach/${row.brochures}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                    >
                        <i className="pi pi-file-pdf" style={{ fontSize: "1.5rem" }}></i>
                    </a>
                ) : (
                    <span>No Brochure</span>
                ),
        },
        {
            name: "Building",
            selector: (row) => row.building,
            sortable: true,
            cell: (row) =>
                row.brochures ? (
                    <a
                        href={`${IMG_PATH}/enquiry/attach/${row.building}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                    >
                        <i className="pi pi-file-pdf" style={{ fontSize: "1.5rem" }}></i>
                    </a>
                ) : (
                    <span>No building</span>
                ),
        },
        {
            name: "Floor",
            selector: (row) => row.floor,
            sortable: true,
            cell: (row) =>
                row.brochures ? (
                    <a
                        href={`${IMG_PATH}/enquiry/attach/${row.floor}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                    >
                        <i className="pi pi-file-pdf" style={{ fontSize: "1.5rem" }}></i>
                    </a>
                ) : (
                    <span>No Floor</span>
                ),
        },
        {
            name: "Layouts",
            selector: (row) => row.layouts,
            sortable: true,
            cell: (row) =>
                row.brochures ? (
                    <a
                        href={`${IMG_PATH}/enquiry/attach/${row.layouts}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                    >
                        <i className="pi pi-file-pdf" style={{ fontSize: "1.5rem" }}></i>
                    </a>
                ) : (
                    <span>No layouts</span>
                ),
        },
        {
            name: "Mapping",
            selector: (row) => row.mapping,
            sortable: true,
            cell: (row) => {
                if (row.mapping) {
                    const imgFileUrl = `${IMG_PATH}/enquiry/attach/${row.mapping}`;

                    return (
                        <img
                            width="50"
                            height="50"
                            controls
                            className="mt-1 mb-1 rounded-circle"
                            src={imgFileUrl}
                        />
                    );
                } else {
                    return <div>no photo</div>;
                }
            },
        },
        {
            name: "VR",
            selector: (row) => row.vr_file,
            sortable: true,
            cell: (row) => {
                if (row.vr_file) {
                    const videoFileUrl = `${IMG_PATH}/enquiry/attach/${row.vr_file}`;

                    return (
                        <video width="50" height="50" controls className="mt-1 mb-1">
                            <source src={videoFileUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    );
                } else if (row.vr_link) {
                    return (
                        <a href={row.vr_link} target="_blank" rel="noopener noreferrer">
                            <button className="btn btn-primary" style={{ minWidth: "50px" }}>
                                Link
                            </button>
                        </a>
                    );
                } else {
                    return <span>No Video</span>;
                }
            },
        },
        {
            name: "AR",
            selector: (row) => row.ar_file,
            sortable: true,
            cell: (row) => {
                if (row.ar_file) {
                    const audioFileUrl = `${IMG_PATH}/enquiry/attach/${row.ar_file}`;

                    return (
                        <audio controls className="mt-1 mb-1" style={{ height: "20px" }}>
                            <source src={audioFileUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    );
                } else if (row.ar_link) {
                    return (
                        <a href={row.ar_link} target="_blank" rel="noopener noreferrer">
                            <button className="btn btn-primary" style={{ minWidth: "50px" }}>
                                Link
                            </button>
                        </a>
                    );
                } else {
                    return <span>No Audio</span>;
                }
            },
        },

        ...((status === "pending" || status === "complete") &&
            staffid.Login === "staff" &&
            pagetype !== "reminder" && enquiryDoumentData?.status !== "booking"
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
                            </div>
                        </>
                    ),
                },
            ]
            : []),
    ];

    const handleCategoryVRChange = (e) => {
        const value = e.target.value;

        setVrTextType(value === "link");
        formik.setFieldValue("vrtype", value);

        if (value === "link") {
            formik.setFieldValue("vrfile", null);
        } else {
            formik.setFieldValue("vrlink", "");
        }
    };

    const handleCategoryARChange = (e) => {
        const value = e.target.value;

        setArTextType(value === "link");
        formik.setFieldValue("artype", value);

        if (value === "link") {
            formik.setFieldValue("arfile", null);
        } else {
            formik.setFieldValue("arlink", "");
        }
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
            <div className="">
                {mediaDataLoading ? (
                    <div className="d-flex justify-content-center mt-5 mb-5">
                        <ThreeCircles
                            visible={true}
                            height="50"
                            width="50"
                            color="#2f4f4f"
                            ariaLabel="three-circles-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div>
                ) : (status === "pending" || status === "complete") &&
                    staffid.Login === "staff" &&
                    mediaData.length === 0 ? (
                    <>
                        <div className="d-flex justify-content-center mb-3 mt-3">
                            <div className="ms-2">
                                <button
                                    onClick={() => setBroucherDialog(true)}
                                    className="btn1 me-2"
                                >
                                    + Create
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <DataTable
                        persistTableHead={true}
                        columns={column1}
                        data={mediaData}
                        customStyles={customStyle}
                        pagination
                        // selectableRows
                        fixedHeader
                    />
                )}
            </div>

            <Dialog
                visible={broucherDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Add Attachments"
                modal
                className="p-fluid"
                onHide={() => {
                    if (!postLoading) hideDialog();
                }}
                closable={!postLoading}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div>
                        {/* <div className='d-flex gap-4'> */}
                        <div className="mt-3 form-group">
                            <label htmlFor="broucher" style={{ fontSize: "14px" }}>
                                {" "}
                                Broucher <span style={{ color: "red" }}>*</span> :
                            </label>
                            <input
                                name="brochures"
                                id="brochures"
                                type="file"
                                className="form-control mt-2"
                                accept="application/pdf"
                                style={{ height: "40px" }}
                                onChange={(event) => {
                                    formik.setFieldValue("brochures", event.target.files[0]);
                                }}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.brochures && formik.touched.brochures ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.brochures}
                                </p>
                            ) : null}
                        </div>
                        <div className="mt-2 form-group">
                            <label htmlFor="photo" style={{ fontSize: "14px" }}>
                                {" "}
                                Layouts <span style={{ color: "red" }}>*</span>:
                            </label>
                            <input
                                name="layouts"
                                id="layouts"
                                type="file"
                                className="form-control mt-2"
                                accept="application/pdf"
                                style={{ height: "40px" }}
                                onChange={(event) => {
                                    formik.setFieldValue("layouts", event.target.files[0]);
                                }}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.layouts && formik.touched.layouts ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.layouts}
                                </p>
                            ) : null}
                        </div>
                        {/* </div> */}
                        {/* <div className='d-flex gap-4'> */}
                        <div className=" form-group mt-2">
                            <label htmlFor="photo" style={{ fontSize: "14px" }}>
                                {" "}
                                Floor plans <span style={{ color: "red" }}>*</span> :
                            </label>
                            <input
                                name="floor"
                                id="floor"
                                type="file"
                                className="form-control mt-2"
                                accept="application/pdf"
                                style={{ height: "40px" }}
                                onChange={(event) => {
                                    formik.setFieldValue("floor", event.target.files[0]);
                                }}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.floor && formik.touched.floor ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.floor}
                                </p>
                            ) : null}
                        </div>
                        <div className="form-group mt-2">
                            <label
                                htmlFor="buildingSpecification"
                                style={{ fontSize: "14px" }}
                            >
                                building specifications <span style={{ color: "red" }}>*</span>:
                            </label>
                            <input
                                name="building"
                                id="building"
                                type="file"
                                className="form-control mt-2"
                                accept="application/pdf"
                                style={{ height: "40px" }}
                                onChange={(event) => {
                                    formik.setFieldValue("building", event.target.files[0]);
                                }}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.building && formik.touched.building ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.building}
                                </p>
                            ) : null}
                        </div>
                        {/* </div> */}

                        {/* <div className='d-flex gap-4'> */}

                        <div className="form-group mt-2" style={{ width: "100%" }}>
                            <label htmlFor="areaMaping" style={{ fontSize: "14px" }}>
                                Area Mapping <span style={{ color: "red" }}>*</span>:
                            </label>
                            <input
                                name="mapping"
                                id="areaMaping"
                                type="file"
                                className="form-control mt-2"
                                accept="image/*"
                                style={{ height: "40px" }}
                                onChange={(event) => {
                                    formik.setFieldValue("mapping", event.target.files[0]);
                                }}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.mapping && formik.touched.mapping ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.mapping}
                                </p>
                            ) : null}
                        </div>
                        <div className="d-flex gap-4" style={{ width: "100%" }}>
                            <div className="form-group" style={{ width: "100%" }}>
                                <label htmlFor="vrType" style={{ fontSize: "14px" }}>
                                    Add VR <span style={{ color: "red" }}>*</span>:
                                </label>
                                <select
                                    name="vrtype"
                                    className="form-select mt-2"
                                    value={formik.values.vrtype}
                                    onChange={handleCategoryVRChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="file">File</option>
                                    <option value="link">Link</option>
                                </select>

                                {formik.errors.vrtype && formik.touched.vrtype ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.vrtype}
                                    </p>
                                ) : null}
                            </div>
                            {/* { */}
                            <div className=" form-group " style={{ width: "100%" }}>
                                {vrTextType ? (
                                    <>
                                        <label htmlFor="textInput" style={{ fontSize: "14px" }}>
                                            Enter Link :
                                        </label>
                                        <input
                                            name="vrlink"
                                            type="text"
                                            className="form-control mt-2"
                                            value={formik.values.vrlink}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.vrlink && formik.touched.vrlink ? (
                                            <p style={{ color: "red", fontSize: "12px" }}>
                                                {formik.errors.vrlink}
                                            </p>
                                        ) : null}
                                    </>
                                ) : (
                                    <div>
                                        <label htmlFor="video" style={{ fontSize: "14px" }}>
                                            Choose Video :
                                        </label>
                                        <div className="d-flex gap-3 align-items-center">
                                            <input
                                                name="vrfile"
                                                id="file"
                                                type="file"
                                                className="form-control mt-2"
                                                accept="video/*"
                                                style={{ height: "40px" }}
                                                onChange={(event) =>
                                                    formik.setFieldValue("vrfile", event.target.files[0])
                                                }
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>
                                        {formik.errors.vrfile && formik.touched.vrfile ? (
                                            <p style={{ color: "red", fontSize: "12px" }}>
                                                {formik.errors.vrfile}
                                            </p>
                                        ) : null}
                                    </div>
                                )}
                            </div>
                            {/* } */}
                        </div>
                        {/* </div> */}

                        <div className="d-flex gap-4">
                            <div className="d-flex gap-4 mt-2" style={{ width: "100%" }}>
                                <div className=" form-group" style={{ width: "100%" }}>
                                    <label htmlFor="artype" style={{ fontSize: "14px" }}>
                                        Add AR <span style={{ color: "red" }}>*</span>:
                                    </label>
                                    <select
                                        name="artype"
                                        className="form-select mt-2"
                                        value={formik.values.artype}
                                        onChange={handleCategoryARChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <option value="file">File</option>
                                        <option value="link">Link</option>
                                    </select>

                                    {formik.errors.artype && formik.touched.artype ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.artype}
                                        </p>
                                    ) : null}
                                </div>
                                {
                                    <div
                                        className=" form-group d-block"
                                        style={{ width: "100%" }}
                                    >
                                        {arTextType ? (
                                            <>
                                                <label htmlFor="textInput" style={{ fontSize: "14px" }}>
                                                    Enter Link :
                                                </label>
                                                <input
                                                    name="arlink"
                                                    type="text"
                                                    className="form-control mt-2"
                                                    value={formik.values.arlink}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.errors.arlink && formik.touched.arlink ? (
                                                    <p style={{ color: "red", fontSize: "12px" }}>
                                                        {formik.errors.arlink}
                                                    </p>
                                                ) : null}
                                            </>
                                        ) : (
                                            <div>
                                                <label htmlFor="video" style={{ fontSize: "14px" }}>
                                                    Choose Audio :
                                                </label>
                                                <div className="d-flex gap-3 align-items-center">
                                                    <input
                                                        name="arfile"
                                                        id="file"
                                                        type="file"
                                                        className="form-control mt-2"
                                                        accept="audio/*"
                                                        style={{ height: "40px" }}
                                                        onChange={(event) =>
                                                            formik.setFieldValue(
                                                                "arfile",
                                                                event.target.files[0]
                                                            )
                                                        }
                                                        onBlur={formik.handleBlur}
                                                    />
                                                </div>
                                                {formik.errors.arfile && formik.touched.arfile ? (
                                                    <p style={{ color: "red", fontSize: "12px" }}>
                                                        {formik.errors.arfile}
                                                    </p>
                                                ) : null}
                                            </div>
                                        )}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        {!postLoading && (
                            <button
                                type="button"
                                className="btn1 "
                                onClick={() => {
                                    setBroucherDialog(false);
                                    formik.resetForm();
                                }}
                                disabled={postLoading}
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
                            please wait while uploading the documents ...!
                        </p>
                    )}
                </form>
            </Dialog>
            {/*Delete Dialog*/}
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
                        Are you sure you want to delete the selected Attachment
                    </span>
                </div>
            </Dialog>

            {/*Edit Dailog */}
            <Dialog
                visible={editDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Edit Attachments"
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
                            <label htmlFor="broucher" style={{ fontSize: "14px" }}>
                                {" "}
                                Broucher <span style={{ color: "red" }}>*</span> :
                            </label>
                            <div className="d-flex gap-3 align-items-center">
                                <input
                                    name="brochures"
                                    id="brochures"
                                    type="file"
                                    className="form-control mt-2"
                                    accept="application/pdf"
                                    style={{ height: "40px" }}
                                    onChange={(event) => {
                                        formik.setFieldValue("brochures", event.target.files[0]);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={viewBroucher}
                                >
                                    <RemoveRedEyeIcon />
                                </button>
                            </div>
                        </div>
                        <div className="mt-2 form-group">
                            <label htmlFor="photo" style={{ fontSize: "14px" }}>
                                {" "}
                                Layouts <span style={{ color: "red" }}>*</span>:
                            </label>
                            <div className="d-flex gap-3 align-items-center">
                                <input
                                    name="layouts"
                                    id="layouts"
                                    type="file"
                                    className="form-control mt-2"
                                    accept="application/pdf"
                                    style={{ height: "40px" }}
                                    onChange={(event) => {
                                        formik.setFieldValue("layouts", event.target.files[0]);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={viewLayouts}
                                >
                                    <RemoveRedEyeIcon />
                                </button>
                            </div>
                        </div>
                        <div className=" form-group mt-2">
                            <label htmlFor="photo" style={{ fontSize: "14px" }}>
                                {" "}
                                Floor plans <span style={{ color: "red" }}>*</span> :
                            </label>
                            <div className="d-flex gap-3 align-items-center">
                                <input
                                    name="floor"
                                    id="floor"
                                    type="file"
                                    className="form-control mt-2"
                                    accept="application/pdf"
                                    style={{ height: "40px" }}
                                    onChange={(event) => {
                                        formik.setFieldValue("floor", event.target.files[0]);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={viewFloor}
                                >
                                    <RemoveRedEyeIcon />
                                </button>
                            </div>
                        </div>
                        <div className="form-group mt-2">
                            <label
                                htmlFor="buildingSpecification"
                                style={{ fontSize: "14px" }}
                            >
                                building specifications <span style={{ color: "red" }}>*</span>:
                            </label>
                            <div className="d-flex gap-3 align-items-center">
                                <input
                                    name="building"
                                    id="building"
                                    type="file"
                                    className="form-control mt-2"
                                    accept="application/pdf"
                                    style={{ height: "40px" }}
                                    onChange={(event) => {
                                        formik.setFieldValue("building", event.target.files[0]);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={viewBuilding}
                                >
                                    <RemoveRedEyeIcon />
                                </button>
                            </div>
                        </div>

                        <div className="form-group mt-2" style={{ width: "100%" }}>
                            <label htmlFor="areaMaping" style={{ fontSize: "14px" }}>
                                Area Mapping <span style={{ color: "red" }}>*</span>:
                            </label>
                            <div className="d-flex gap-3 align-items-center">
                                <input
                                    name="mapping"
                                    id="areaMaping"
                                    type="file"
                                    className="form-control mt-2"
                                    accept="image/*"
                                    style={{ height: "40px" }}
                                    onChange={(event) => {
                                        formik.setFieldValue("mapping", event.target.files[0]);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={viewMapping}
                                >
                                    <RemoveRedEyeIcon />
                                </button>
                            </div>
                        </div>
                        {/* {formik.errors.mapping && formik.touched.mapping ? (
                            <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.mapping}</p>
                        ) : null} */}

                        <div className="d-flex gap-4" style={{ width: "100%" }}>
                            <div className="form-group" style={{ width: "100%" }}>
                                <label htmlFor="vrType" style={{ fontSize: "14px" }}>
                                    Add VR <span style={{ color: "red" }}>*</span>:
                                </label>
                                <select
                                    name="vrtype"
                                    id="vrtype"
                                    type="file"
                                    className="form-select mt-2"
                                    style={{ height: "40px" }}
                                    value={formik.values.vrtype}
                                    onChange={handleCategoryVRChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="file">File</option>
                                    <option value="link">Link</option>+
                                </select>
                            </div>
                            {
                                <div className=" form-group " style={{ width: "100%" }}>
                                    {vrTextType ? (
                                        <>
                                            <label htmlFor="textInput" style={{ fontSize: "14px" }}>
                                                Enter Text :
                                            </label>
                                            <input
                                                name="vrlink"
                                                id="link"
                                                type="text"
                                                className="form-control mt-2"
                                                value={formik.values.vrlink || ""}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.errors.vrlink && formik.touched.vrlink ? (
                                                <p style={{ color: "red", fontSize: "12px" }}>
                                                    {formik.errors.vrlink}
                                                </p>
                                            ) : null}
                                        </>
                                    ) : (
                                        <div>
                                            <label htmlFor="video" style={{ fontSize: "14px" }}>
                                                Choose Video :
                                            </label>
                                            <div className="d-flex gap-3 align-items-center">
                                                <input
                                                    name="vrfile"
                                                    id="file"
                                                    type="file"
                                                    className="form-control mt-2"
                                                    accept="video/*"
                                                    style={{ height: "40px" }}
                                                    onChange={(event) =>
                                                        formik.setFieldValue(
                                                            "vrfile",
                                                            event.target.files[0]
                                                        )
                                                    }
                                                    onBlur={formik.handleBlur}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-success"
                                                    onClick={viewVr}
                                                >
                                                    <RemoveRedEyeIcon />
                                                </button>
                                            </div>
                                            {formik.errors.vrfile && formik.touched.vrfile ? (
                                                <p style={{ color: "red", fontSize: "12px" }}>
                                                    {formik.errors.vrfile}
                                                </p>
                                            ) : null}
                                        </div>
                                    )}
                                </div>
                            }
                        </div>
                        {/* </div> */}

                        <div className="d-flex gap-4">
                            <div className="d-flex gap-4 mt-2" style={{ width: "100%" }}>
                                <div className=" form-group" style={{ width: "100%" }}>
                                    <label htmlFor="artype" style={{ fontSize: "14px" }}>
                                        Add AR <span style={{ color: "red" }}>*</span>:
                                    </label>
                                    <select
                                        name="artype"
                                        id="artype"
                                        type="file"
                                        className="form-select mt-2"
                                        style={{ height: "40px" }}
                                        value={formik.values.artype}
                                        onChange={handleCategoryARChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <option value="file">File</option>
                                        <option value="link">Link</option>+
                                    </select>
                                    {formik.errors.artype && formik.touched.artype ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.artype}
                                        </p>
                                    ) : null}
                                </div>
                                {
                                    <div
                                        className=" form-group d-block"
                                        style={{ width: "100%" }}
                                    >
                                        {arTextType ? (
                                            <>
                                                <label htmlFor="textInput" style={{ fontSize: "14px" }}>
                                                    Enter Text :
                                                </label>
                                                <input
                                                    name="arlink"
                                                    id="link"
                                                    type="text"
                                                    className="form-control mt-2"
                                                    value={formik.values.arlink || ""}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.errors.arlink && formik.touched.arlink ? (
                                                    <p style={{ color: "red", fontSize: "12px" }}>
                                                        {formik.errors.arlink}
                                                    </p>
                                                ) : null}
                                            </>
                                        ) : (
                                            <div>
                                                <label htmlFor="video" style={{ fontSize: "14px" }}>
                                                    Choose Audio :
                                                </label>
                                                <div className="d-flex gap-3 align-items-center">
                                                    <input
                                                        name="arfile"
                                                        id="file"
                                                        type="file"
                                                        className="form-control mt-2"
                                                        accept="audio/*"
                                                        style={{ height: "40px" }}
                                                        onChange={(event) =>
                                                            formik.setFieldValue(
                                                                "arfile",
                                                                event.target.files[0]
                                                            )
                                                        }
                                                        onBlur={formik.handleBlur}
                                                    />

                                                    <button
                                                        type="button"
                                                        className="btn btn-success"
                                                        onClick={viewAr}
                                                    >
                                                        <RemoveRedEyeIcon />
                                                    </button>
                                                </div>
                                                {formik.errors.arfile && formik.touched.arfile ? (
                                                    <p style={{ color: "red", fontSize: "12px" }}>
                                                        {formik.errors.arfile}
                                                    </p>
                                                ) : null}
                                            </div>
                                        )}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        {!updateLoading && (
                            <button
                                type="button"
                                className="btn1"
                                onClick={() => {
                                    setEditDialog(false);
                                    formik.resetForm();
                                }}
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
                            Please wait while the document is uploading...
                        </p>
                    )}
                </form>
            </Dialog>
        </>
    );
};

export default AddAttachmentsAP;
