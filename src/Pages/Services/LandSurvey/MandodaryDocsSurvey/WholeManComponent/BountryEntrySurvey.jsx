import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import API_BASE_URL from "../../../../../Api/api";
import Toast from "../../../../../Utils/Toast";
import { useSelector } from "react-redux";

const BountryEntrySurvey = ({ eid, id, status, pagetype }) => {
    const staffid = JSON.parse(sessionStorage.getItem("token"));

    const [newDialog, setNewDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [editDialog, setEditDialog] = useState(false);
    const [editing, setEditing] = useState(false);
    const [getData, setGetData] = useState([]);
    const enquiryDoumentData = useSelector(
        (state) => state.Enquiry.enquiryDocument
    );

    const [postLoading, setPostLoading] = useState(false);
    const onSubmit = async (values) => {
        setPostLoading(true);
        try {
            const updateData = {
                id: values.id,
                details: values,
            };
            const response = await axios.post(
                `${API_BASE_URL}/enquirylandowner/adddetails`,
                updateData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            Toast({ message: "Successfully Updated", type: "success" });
            setPostLoading(false);
            setNewDialog(false);
            formik.resetForm();
        } catch (error) {
            console.error(error);
            setPostLoading(false);
        } finally {
            // fetch()
            fetchSurveyData();
        }
    };
    const fetchSurveyData = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/allowner_details/${eid}`
            );
            const data = response.data.map((data, index) => ({
                ...data,
                sno: index + 1,
            }));
            setGetData(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSurveyData();
    }, []);

    const formik = useFormik({
        initialValues: {
            surveyno: "",
            subdivision: "",
            area: "",
            dimension: [
                {
                    north: "",
                    south: "",
                    east: "",
                    west: "",
                    others: "",
                },
            ],
            enqid: eid,
            id: null,
        },
        validationSchema: yup.object().shape({
            surveyno: yup.string().required("survey no  is required!"),
            // subdivision: yup.string().required("Subdivision is required!"),
            area: yup.string().required("remark type is required!"),

            dimension: yup.array().of(
                yup.object().shape({
                    north: yup.string().required("North dimension is required!"),
                    south: yup.string().required("South dimension is required!"),
                    east: yup.string().required("East dimension is required!"),
                    west: yup.string().required("West dimension is required!"),
                    others: yup.string().required("Other dimension is required!"),
                })
            ),
        }),
        onSubmit,
    });

    const hideDeleteProductsDialog = () => {
        setDeleteDialog(false);
    };

    const handleDelete = (row) => {
        setDeleteDialog(true);
        setDeleteId(row.id);
    };
    const DeleteRow = async () => {
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/ownerdelete/${deleteId}`,
                {}
            );
            Toast({ message: "Successfully Deleted", type: "success" });
            fetch();
        } catch (error) {
            console.error(error);
        } finally {
            fetch();
        }

        setDeleteDialog(false);
    };

    const deleteUnitsDialogFooter = (
        <div className=" d-flex gap-3 justify-content-end">
            <Button
                variant="outlined"
                color="error"
                onClick={() => setDeleteDialog(false)}
            >
                No
            </Button>
            <Button variant="contained" color="success" onClick={DeleteRow}>
                Yes
            </Button>
        </div>
    );
    const hideDialog = () => {
        setNewDialog(false);
        formik.resetForm();
    };
    const editHide = () => {
        setEditDialog(false);
        formik.resetForm();
    };

    const handleEdit = (item) => {
        setNewDialog(true);

        let landDetails = {};
        try {
            landDetails = item.land_details ? JSON.parse(item.land_details) : {};
        } catch (error) {
            console.error("Error parsing land_details JSON:", error);
        }

        formik.setFieldValue("surveyno", item.survey_no || "");
        formik.setFieldValue("subdivision", item.sub_division || "");
        formik.setFieldValue("area", landDetails.area || "");
        // dimension
        formik.setFieldValue("dimension", landDetails.dimension || []);
        formik.setFieldValue("id", landDetails.id || item.id);
    };

    return (
        <>
            <div className="col-12 mt-4">
                <div className="card shadow border-0 mb-4">
                    <div className="card shadow border-0 p-4">
                        <h6>Boundry Entry</h6>
                        <hr />
                        <div style={{ overflowX: "auto" }} className="table-responsive">
                            <table
                                className="table table-bordered table-hover"
                                style={{ overflow: "scroll" }}
                            >
                                <thead>
                                    <tr className="text-center">
                                        <th className="landowner_enq_th">S.No</th>
                                        <th className="landowner_enq_th">Survey No</th>
                                        <th className="landowner_enq_th_1">Sub-Division</th>
                                        <th className="landowner_enq_th_1">Area</th>

                                        <th colSpan="5" className="text-center landowner_enq_th">
                                            Dimension
                                        </th>

                                        {/* {staffid.Login === "staff" && (status === "pending" || status === "complete") && pagetype !== "reminder" && (
                                            <th className='landowner_enq_th'> </th>
                                        )} */}
                                        {staffid.Login === "staff" &&
                                            (status === "pending" || status === "complete") &&
                                            pagetype !== "reminder" && enquiryDoumentData?.status !== "live" && (
                                                <th className="landowner_enq_th">Action </th>
                                            )}
                                    </tr>
                                    <tr className="text-center">
                                        <th colSpan="4" className="landowner_enq_th"></th>
                                        <th className="landowner_enq_th">North</th>
                                        <th className="landowner_enq_th">South</th>
                                        <th className="landowner_enq_th">East</th>
                                        <th className="landowner_enq_th">West</th>
                                        <th className="landowner_enq_th">Others</th>
                                        {staffid.Login === "staff" &&
                                            (status === "pending" || status === "complete") &&
                                            pagetype !== "reminder" && enquiryDoumentData?.status !== "live" && (
                                                <th className="landowner_enq_th"> </th>
                                            )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {getData?.map((item, index) => {
                                        let landDetails = {};
                                        landDetails = item.land_details
                                            ? JSON.parse(item.land_details)
                                            : {};
                                        return (
                                            <tr key={index} className="text-center">
                                                <td>{index + 1} </td>
                                                <td>{item.survey_no} </td>
                                                <td>{item.sub_division} </td>
                                                <td>{landDetails.area} </td>

                                                {landDetails.dimension &&
                                                    Array.isArray(landDetails.dimension) ? (
                                                    landDetails.dimension.map((item, i) => (
                                                        <React.Fragment key={i}>
                                                            <td>{item.north || "N/A"}</td>
                                                            <td>{item.south || "N/A"}</td>
                                                            <td>{item.east || "N/A"}</td>
                                                            <td>{item.west || "N/A"}</td>
                                                            <td>{item.others || "N/A"}</td>
                                                        </React.Fragment>
                                                    ))
                                                ) : (
                                                    <React.Fragment>
                                                        <td colSpan="5">No Dimension Data</td>
                                                    </React.Fragment>
                                                )}

                                                {staffid.Login === "staff" &&
                                                    (status === "pending" || status === "complete") &&
                                                    pagetype !== "reminder" &&
                                                    enquiryDoumentData?.status !== "live" && (
                                                        <td>
                                                            {" "}
                                                            <button
                                                                className="btn btn-outline-info me-1 edit"
                                                                data-tooltip-id="edit"
                                                                onClick={() => handleEdit(item)}
                                                            >
                                                                <EditIcon />
                                                            </button>{" "}
                                                        </td>
                                                    )}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                visible={newDialog}
                style={{ width: "55rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Boundry Details  "
                modal
                className="p-fluid"
                onHide={hideDialog}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className="row">
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="surveyno" className="form-label">
                                {" "}
                                Survey No
                                <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                id="surveyno"
                                type="text"
                                name="surveyno"
                                className="form-control"
                                value={formik.values.surveyno}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter Survey No"
                                readOnly
                            />

                            {formik.errors.surveyno && formik.touched.surveyno ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.surveyno}
                                </p>
                            ) : null}
                        </div>
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="subdivision" className="form-label">
                                Sub_Division <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                id="subdivision"
                                type="text"
                                name="subdivision"
                                className="form-control"
                                value={formik.values.subdivision}
                                onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                readOnly
                            />
                        </div>
                    </div>
                    {/**.............. */}
                    <div className="row">
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="extent" className="form-label">
                                Area
                                <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                id="area"
                                type="text"
                                name="area"
                                className="form-control"
                                value={formik.values.area}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter Area.,"
                            />

                            {formik.errors.area && formik.touched.area ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.area}
                                </p>
                            ) : null}
                        </div>
                    </div>

                    <hr />
                    <div className="d-flex justify-content-start">
                        <h6>Dimension</h6>
                    </div>
                    <div className="row">
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="north" className="form-label">
                                {" "}
                                North
                                <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                id="north"
                                type="text"
                                name="dimension[0].north"
                                // name="dimension.0.north"
                                className="form-control"
                                value={formik.values.dimension[0]?.north || ""}
                                onChange={formik.handleChange}
                                // onBlur={(e) => {
                                //     formik.handleBlur(e);
                                //     formik.setFieldTouched("dimension.0.north", true);
                                // }}
                                onBlur={formik.handleBlur}
                                placeholder="Enter dimension north"
                            />
                            {formik.touched.dimension?.[0]?.north &&
                                formik.errors.dimension?.[0]?.north && (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.dimension[0].north}
                                    </p>
                                )}
                        </div>
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="period" className="form-label">
                                {" "}
                                South
                                <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                id="south"
                                type="text"
                                name="dimension[0].south"
                                className="form-control"
                                value={formik.values.dimension[0]?.south || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter dimension south"
                            />
                            {formik.touched.dimension?.[0]?.south &&
                                formik.errors.dimension?.[0]?.south && (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.dimension[0].south}
                                    </p>
                                )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="period" className="form-label">
                                {" "}
                                East
                                <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                id="days"
                                type="text"
                                name="dimension[0].east"
                                className="form-control "
                                value={formik.values.dimension?.[0]?.east || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter dimension East"
                            />

                            {formik.errors.dimension?.[0]?.east &&
                                formik.touched.dimension?.[0]?.east ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.dimension[0].east}
                                </p>
                            ) : null}
                        </div>
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="period" className="form-label">
                                {" "}
                                West
                                <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                id="days"
                                type="text"
                                name="dimension[0].west"
                                className="form-control "
                                value={formik.values.dimension?.[0]?.west || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter dimenstion west"
                            />

                            {formik.errors.dimension?.[0]?.west &&
                                formik.touched.dimension?.[0]?.west ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.dimension[0].west}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="period" className="form-label">
                                {" "}
                                Others
                                <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                id="days"
                                type="text"
                                name="dimension[0].others"
                                className="form-control "
                                value={formik.values.dimension?.[0]?.others || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter dimension Others"
                            />
                            {formik.errors.dimension?.[0]?.others &&
                                formik.touched.dimension?.[0]?.others ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.dimension[0].others}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <Button
                            variant="contained"
                            color="success"
                            type="submit"
                            disabled={postLoading}
                        >
                            {" "}
                            {postLoading ? "Processing..." : "Save"}{" "}
                        </Button>
                    </div>
                </form>
            </Dialog>
        </>
    );
};

export default BountryEntrySurvey;
