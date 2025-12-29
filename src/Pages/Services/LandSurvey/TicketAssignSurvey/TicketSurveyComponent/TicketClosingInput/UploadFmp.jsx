import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import API_BASE_URL from "../../../../../../Api/api";
import Toast from "../../../../../../Utils/Toast";
import { useSelector } from "react-redux";
// import API_BASE_URL from '../../../../../Api/api';
// import Toast from '../../../../../Utils/Toast';

const UploadFmp = ({ eid, id, rowId, status, pagetype }) => {
    const staffid = JSON.parse(sessionStorage.getItem("token"));

    const [newDialog, setNewDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [editDialog, setEditDialog] = useState(false);
    const [editing, setEditing] = useState(false);
    const [getData, setGetData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const enquiryDoumentData = useSelector(
        (state) => state.Enquiry.enquiryDocument
    );

    const [postLoading, setPostLoading] = useState(false);
    const onSubmit = async (values) => {
        const payload = {
            ...values,
            enqid: eid,
            docid: rowId,
        };
        setPostLoading(true);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/fmbsurveyadd`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            Toast({ message: "Successfully Updated", type: "success" });
            setShowForm(false);
            formik.resetForm();
            setPostLoading(false);
            // setNewDialog(false)
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
                `${API_BASE_URL}/fmbsurveydata/${rowId}`
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
            north: "",
            south: "",
            east: "",
            west: "",
            others: "",
        },
        validationSchema: yup.object().shape({
            surveyno: yup.string().required("survey no  is required!"),
            subdivision: yup.string().required("Subdivision is required!"),
            area: yup.string().required("area type is required!"),
            north: yup.string().required("North dimension is required!"),
            south: yup.string().required("South dimension is required!"),
            east: yup.string().required("East dimension is required!"),
            west: yup.string().required("West dimension is required!"),
            others: yup.string().required("Other dimension is required!"),
        }),
        onSubmit,
    });

    const handleDeleteOpen = (row) => {
        setDeleteDialog(true);
        setDeleteId(row.id);
    };
    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/fmbsurveydelete/${deleteId}`,
                {}
            );
            Toast({ message: "Successfully Deleted", type: "success" });
            fetchSurveyData();
            setDeleteDialog(false);
        } catch (error) {
            console.error(error);
        } finally {
            fetchSurveyData();
        }

        setDeleteDialog(false);
    };

    const handleEdit = (item) => {
        setShowForm(true);
        formik.setFieldValue("id", item.id || "");
        formik.setFieldValue("surveyno", item.survey_no || "");
        formik.setFieldValue("subdivision", item.sub_division || "");
        formik.setFieldValue("area", item.area || "");
        formik.setFieldValue("north", item.north || "");
        formik.setFieldValue("south", item.south || "");
        formik.setFieldValue("east", item.east || "");
        formik.setFieldValue("west", item.west || "");
        formik.setFieldValue("others", item.other_side || "");
    };

    return (
        <>
            {!showForm && (
                <div className="col-12 mt-4">
                    <div className="  border-0 mb-4">
                        <div className="  border-0 p-4">
                            <div className="d-flex justify-content-between">
                                <h6>FMB Document</h6>
                                {staffid.Login === "staff" &&
                                    (status === "pending" || status === "complete") &&
                                    pagetype !== "reminder" &&
                                    enquiryDoumentData?.status !== "live" && (
                                        <button
                                            className="btn1 text-end"
                                            onClick={() => setShowForm(true)}
                                        >
                                            Add
                                        </button>
                                    )}
                            </div>
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

                                            {staffid.Login === "staff" &&
                                                (status === "pending" || status === "complete") &&
                                                pagetype !== "reminder" &&
                                                enquiryDoumentData?.status !== "live" && (
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
                                                pagetype !== "reminder" &&
                                                enquiryDoumentData?.status !== "live" && (
                                                    <th className="landowner_enq_th"></th>
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
                                                    <td>{item.area} </td>
                                                    <td>{item.north || "N/A"}</td>
                                                    <td>{item.south || "N/A"}</td>
                                                    <td>{item.east || "N/A"}</td>
                                                    <td>{item.west || "N/A"}</td>
                                                    <td>{item.other_side || "N/A"}</td>
                                                    {staffid.Login === "staff" &&
                                                        (status === "pending" || status === "complete") &&
                                                        pagetype !== "reminder" &&
                                                        enquiryDoumentData?.status !== "live" && (
                                                            <td>
                                                                <button
                                                                    className="btn btn-outline-info me-1 edit"
                                                                    data-tooltip-id="edit"
                                                                    onClick={() => handleEdit(item)}
                                                                >
                                                                    <EditIcon />
                                                                </button>
                                                                <button
                                                                    className="btn btn-outline-danger delete"
                                                                    data-tooltip-id="delete"
                                                                    onClick={() => handleDeleteOpen(item)}
                                                                >
                                                                    <DeleteIcon />
                                                                </button>
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
            )}

            {showForm && (
                <div>
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
                                    placeholder="Enter sub division "
                                    value={formik.values.subdivision}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                                {formik.errors.subdivision && formik.touched.subdivision ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.subdivision}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        {/**.............. */}
                        <div className="row">
                            <div className="form-group mt-2 col-6">
                                <label htmlFor="area" className="form-label">
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
                                    name="north"
                                    className="form-control"
                                    value={formik.values.north}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter dimension north"
                                />
                                {formik.touched.north && formik.errors.north && (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.north}
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
                                    name="south"
                                    className="form-control"
                                    value={formik.values.south}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter dimension south"
                                />
                                {formik.touched.south && formik.errors.south && (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.south}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group mt-2 col-6">
                                <label htmlFor="east" className="form-label">
                                    {" "}
                                    East
                                    <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    id="east"
                                    type="text"
                                    name="east"
                                    className="form-control "
                                    value={formik.values.east}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter dimension East"
                                />

                                {formik.errors.east && formik.touched.east ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.east}
                                    </p>
                                ) : null}
                            </div>
                            <div className="form-group mt-2 col-6">
                                <label htmlFor="west" className="form-label">
                                    {" "}
                                    West
                                    <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    id="west"
                                    type="text"
                                    name="west"
                                    className="form-control "
                                    value={formik.values.west}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter dimenstion west"
                                />

                                {formik.errors.west && formik.touched.west ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.west}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group mt-2 col-6">
                                <label htmlFor="others" className="form-label">
                                    {" "}
                                    Others
                                    <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    id="others"
                                    type="text"
                                    name="others"
                                    className="form-control "
                                    value={formik.values.others || ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter dimension Others"
                                />
                                {formik.errors.others && formik.touched.others ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.others}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <Button
                                variant="contained"
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    formik.resetForm();
                                }}
                            >
                                Close
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                type="submit"
                                disabled={postLoading}
                            >
                                {" "}
                                {postLoading ? "Processing..." : "Save"}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <Dialog
                visible={deleteDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                onHide={() => setDeleteDialog(false)}
            >
                <div className="confirmation-content">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <span style={{ marginLeft: "10px" }}>
                        Are you sure you want to delete the selected row
                    </span>
                </div>

                <div className="d-flex justify-content-end mt-3 gap-3">
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setDeleteDialog(false)}
                    >
                        No
                    </Button>
                    <Button variant="contained" onClick={handleDelete}>
                        Yes
                    </Button>
                </div>
            </Dialog>
        </>
    );
};

export default UploadFmp;
