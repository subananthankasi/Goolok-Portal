import  { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dialog } from "primereact/dialog";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as yup from "yup";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import customStyle from "../../../../Utils/tableStyle";
import { useSelector } from "react-redux";


const BuildingDetailsHouse = ({ eid, marketid, status, pagetype }) => {
    const staffid = JSON.parse(localStorage.getItem("token"));
    const [buildingData, setBuildingData] = useState([]);
    const [newDialog, setNewDialog] = useState(false);
    const [editing, setEditing] = useState(false);
    const [loading, setloading] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const enquiryDoumentData = useSelector(
        (state) => state.Enquiry.enquiryDocument
    );

    const handleEdit = (row) => {
        setEditDialog(true);
        formik.setFieldValue("approved_plan", row.approved_plan);
        formik.setFieldValue("architectural_plan", row.architectural_plan);
        formik.setFieldValue("electrical_plan", row.electrical_plan);
        formik.setFieldValue("plumbing_plan", row.plumbing_plan);
        formik.setFieldValue("quality_check", row.quality_check);
        formik.setFieldValue("working_plan", row.working_plan);
        formik.setFieldValue("id", row.id);
    };
    const openDelete = (id) => {
        setDeleteDialog(true);
        setDeleteId(id);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/buildingdelete/${deleteId}`);
            Toast({ message: "Successfully deleted", type: "success" });
            setDeleteDialog(false);
        } catch (error) {
            Toast({ message: "Error to delete! try again", type: "error" });
        } finally {
            fetchBuildingData();
        }
    };

    const customerColumns = [
        {
            name: "S.No",
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Approved Plan",
            selector: (row) => row.approved_plan,
            sortable: true,
            width: "160px",
        },
        {
            name: "Architectural Plan",
            selector: (row) => row.architectural_plan,
            sortable: true,
            width: "180px",
        },
        {
            name: "Working Plan",
            selector: (row) => row.working_plan,
            sortable: true,
            width: "160px",
        },
        {
            name: "Electrical Plan",
            selector: (row) => row.electrical_plan,
            sortable: true,
            width: "160px",
        },
        {
            name: "Plumbing Plan",
            selector: (row) => row.plumbing_plan,
            sortable: true,
            width: "160px",
        },
        {
            name: "Quality Check",
            selector: (row) => row.quality_check,
            sortable: true,
            width: "160px",
        },

        ...(staffid.logintype == "staff" &&
            (status === "complete" || status === "pending") &&
            pagetype !== "reminder" &&
            enquiryDoumentData?.status !== "booking"
            ? [
                // ? [
                {
                    name: "Actions",
                    cell: (row) => (
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-outline-danger delete"
                                data-tooltip-id="delete"
                                onClick={() => openDelete(row.id)}
                            >
                                <DeleteIcon />
                            </button>
                            <button
                                className="btn btn-outline-primary delete"
                                data-tooltip-id="delete"
                                onClick={() => handleEdit(row)}
                            >
                                <EditIcon />
                            </button>
                        </div>
                    ),
                },
            ]
            : []),
    ];
    const onSubmit = async (values) => {
        setloading(true);

        try {
            await axios.post(`${API_BASE_URL}/addbuilding`, values);
            setloading(false);
            setNewDialog(false);
            setEditDialog(false);
            fetchBuildingData();
            Toast({ message: "Successfully added", type: "success" });
            formik.resetForm();
        } catch (error) {
            Toast({ message: "Failed to add", type: "error" });
            setloading(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            approved_plan: "",
            architectural_plan: "",
            working_plan: "",
            electrical_plan: "",
            plumbing_plan: "",
            quality_check: "",
            enqid: eid,
        },
        validationSchema: yup.object().shape({
            approved_plan: yup.string().required("approved plan is required !!"),
            architectural_plan: yup
                .string()
                .required("architectural plan is required !!"),
            working_plan: yup.string().required("working plan is required !!"),
            electrical_plan: yup.string().required("electrical plan is required !!"),
            plumbing_plan: yup.string().required("plumbing plan is required !!"),
            quality_check: yup.string().required("quality check is required !!"),
        }),
        onSubmit,
    });
    const fetchBuildingData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/buildingdata/${eid}`);
            setBuildingData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBuildingData();
    }, [marketid]);

    const deleteUnitsDialogFooter = (
        <div className=" d-flex gap-3 justify-content-end">
            <button className="btn1" onClick={() => setDeleteDialog(false)}>
                No
            </button>
            <button className="btn1" onClick={handleDelete}>
                yes
            </button>
        </div>
    );

    return (
        <>
            <div className="card shadow border-0 mt-3">
                <div className="card shadow border-0 p-4">
                    <div className="d-flex justify-content-start">
                        <h6>Building Details</h6>
                    </div>
                    <hr />
                    {staffid.logintype == "staff" &&
                        (status === "pending" || status === "complete") &&
                        pagetype !== "reminder" &&
                        buildingData.length === 0 ? (
                        <div className="d-flex justify-content-center">
                            <a
                                href="#0"
                                onClick={() => setNewDialog(true)}
                                className="btn1 me-2"
                            >
                                + Create Details
                            </a>
                        </div>
                    ) : null}

                    {buildingData.length > 0 && (
                        <DataTable
                            persistTableHead={true}
                            columns={customerColumns}
                            data={buildingData}
                            customStyles={customStyle}
                            fixedHeader
                        />
                    )}
                </div>
            </div>

            <Dialog
                visible={newDialog}
                style={{ width: "55rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Add Building Details"
                modal
                className="p-fluid"
                onHide={() => setNewDialog(false)}
            >
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="facing_width" className="form-label">
                                        Approved Plan
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="approved_plan"
                                        name="approved_plan"
                                        placeholder="Enter approved plan...."
                                        value={formik.values.approved_plan}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        maxLength="100"
                                    />
                                    {formik.errors.approved_plan &&
                                        formik.touched.approved_plan ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.approved_plan}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* Road Width */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="road_width" className="form-label">
                                        Architectural Plan
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="architectural_plan"
                                        name="architectural_plan"
                                        placeholder="Enter architectural plan...."
                                        value={formik.values.architectural_plan}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    // maxLength='100'
                                    />
                                    {formik.errors.architectural_plan &&
                                        formik.touched.architectural_plan ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.architectural_plan}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="amenities" className="form-label">
                                        Working Plan
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="working_plan"
                                        name="working_plan"
                                        placeholder="Enter working plan...."
                                        value={formik.values.working_plan}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.working_plan && formik.touched.working_plan ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.working_plan}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* Facing */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="facing" className="form-label">
                                        Electrical Plan
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="electrical_plan"
                                        name="electrical_plan"
                                        placeholder="Enter electrical plan...."
                                        value={formik.values.electrical_plan}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.electrical_plan &&
                                        formik.touched.electrical_plan ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.electrical_plan}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* Corner Property */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="corner_property" className="form-label">
                                        Plumbing Plan
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="plumbing_plan"
                                        name="plumbing_plan"
                                        placeholder="Enter plumbing plan...."
                                        value={formik.values.plumbing_plan}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.plumbing_plan &&
                                        formik.touched.plumbing_plan ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.plumbing_plan}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="corner_property" className="form-label">
                                        Quality Check
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="quality_check"
                                        name="quality_check"
                                        placeholder="Enter quality plan...."
                                        value={formik.values.quality_check}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.quality_check &&
                                        formik.touched.quality_check ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.quality_check}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                        <button
                            className="btn1"
                            type="submit"
                            onClick={() => setEditing(true)}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Save"}{" "}
                        </button>
                    </div>
                </form>
            </Dialog>
            <Dialog
                visible={editDialog}
                style={{ width: "55rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Edit Building Details"
                modal
                className="p-fluid"
                onHide={() => setEditDialog(false)}
            >
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="facing_width" className="form-label">
                                        Approved Plan
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="approved_plan"
                                        name="approved_plan"
                                        placeholder="Enter approved plan...."
                                        value={formik.values.approved_plan}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        maxLength="100"
                                    />
                                    {formik.errors.approved_plan &&
                                        formik.touched.approved_plan ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.approved_plan}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* Road Width */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="road_width" className="form-label">
                                        Architectural Plan
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="architectural_plan"
                                        name="architectural_plan"
                                        placeholder="Enter architectural plan...."
                                        value={formik.values.architectural_plan}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    // maxLength='100'
                                    />
                                    {formik.errors.architectural_plan &&
                                        formik.touched.architectural_plan ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.architectural_plan}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="amenities" className="form-label">
                                        Working Plan
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="working_plan"
                                        name="working_plan"
                                        placeholder="Enter working plan...."
                                        value={formik.values.working_plan}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.working_plan && formik.touched.working_plan ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.working_plan}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* Facing */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="facing" className="form-label">
                                        Electrical Plan
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="electrical_plan"
                                        name="electrical_plan"
                                        placeholder="Enter electrical plan...."
                                        value={formik.values.electrical_plan}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.electrical_plan &&
                                        formik.touched.electrical_plan ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.electrical_plan}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* Corner Property */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="corner_property" className="form-label">
                                        Plumbing Plan
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="plumbing_plan"
                                        name="plumbing_plan"
                                        placeholder="Enter plumbing plan...."
                                        value={formik.values.plumbing_plan}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.plumbing_plan &&
                                        formik.touched.plumbing_plan ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.plumbing_plan}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="corner_property" className="form-label">
                                        Quality Check
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="quality_check"
                                        name="quality_check"
                                        placeholder="Enter quality plan...."
                                        value={formik.values.quality_check}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.quality_check &&
                                        formik.touched.quality_check ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.quality_check}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                        <button className="btn1" type="submit" disabled={loading}>
                            {loading ? "Processing..." : "Save"}{" "}
                        </button>
                    </div>
                </form>
            </Dialog>

            <Dialog
                visible={deleteDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                footer={deleteUnitsDialogFooter}
                onHide={() => setDeleteDialog(false)}
            >
                <div className="confirmation-content">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <span style={{ marginLeft: "10px" }}>
                        Are you sure you want to delete the selected row ?
                    </span>
                </div>
            </Dialog>
        </>
    );
};

export default BuildingDetailsHouse;
