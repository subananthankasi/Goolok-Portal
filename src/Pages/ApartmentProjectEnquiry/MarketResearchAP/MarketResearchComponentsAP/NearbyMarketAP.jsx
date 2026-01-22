import { useFormik } from "formik";
import  { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dialog } from "primereact/dialog";
import EditIcon from "@mui/icons-material/Edit";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import customStyle from "../../../../Utils/tableStyle";
import { useSelector } from "react-redux";

const NearbyMarketAP = ({ eid, status, marketid, pagetype }) => {
    const [nearByData, setNearByData] = useState([]);
    const enquiryDoumentData = useSelector(
        (state) => state.Enquiry.enquiryDocument
    );

    const staffid = JSON.parse(localStorage.getItem("token"));
    const [newDialog, setNewDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [editing, setEditing] = useState(false);

    const NearbyColumns = [
        {
            name: "S.No",
            selector: (row, index) => index + 1,
            sortable: true,
            width: "150px",
        },
        {
            name: "Reference Property",
            selector: (row) => row.property_reference,
            sortable: true,
            width: "150px",
        },
        {
            name: "Price Per Unit",
            selector: (row) => row.per_unit,
            sortable: true,
            width: "150px",
        },
        {
            name: "Lat & long",
            selector: (row) => row.location,
            sortable: true,
            width: "150px",
        },
        {
            name: "Road width",
            selector: (row) => row.road_width,
            sortable: true,
            width: "150px",
        },
        {
            name: "Transportation feasibility",
            selector: (row) => row.feasibility,
            sortable: true,
            width: "150px",
        },
        {
            name: "Contact no",
            selector: (row) => row.contact,
            sortable: true,
            width: "150px",
        },
        {
            name: "Direction",
            selector: (row) => row.direction,
            sortable: true,
            width: "150px",
        },
        {
            name: "Distance",
            selector: (row) => row.distance,
            sortable: true,
            width: "150px",
        },
        {
            name: "Road type",
            selector: (row) => row.road_types,
            sortable: true,
            width: "150px",
        },
        {
            name: "Location advantages",
            selector: (row) => row.advantages,
            sortable: true,
            width: "150px",
        },
        {
            name: "Amenities",
            selector: (row) => row.amenities,
            sortable: true,
            width: "150px",
        },
        {
            name: "Corner property",
            selector: (row) => row.corner_property,
            sortable: true,
            width: "150px",
        },
        {
            name: "New developments",
            selector: (row) => row.developments,
            sortable: true,
            width: "150px",
        },
        {
            name: "Rumors",
            selector: (row) => row.rumors,
            sortable: true,
            width: "150px",
        },
        {
            name: "Remark",
            selector: (row) => row.remark,
            sortable: true,
            width: "150px",
        },
        ...(staffid.logintype == "staff" &&
            (status === "complete" || status === "pending") &&
            pagetype !== "reminder" && enquiryDoumentData?.status !== "booking"
            ? [
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
    const handleEdit = (row) => {
        setEditDialog(true);
        formik.setFieldValue("property", row.property_reference);
        formik.setFieldValue("priceperunit", row.per_unit);
        formik.setFieldValue("remark", row.remark);
        formik.setFieldValue("loc", row.location);
        formik.setFieldValue("road_width", row.road_width);
        formik.setFieldValue("amenities", row.amenities);
        formik.setFieldValue("location_advantages", row.advantages);
        formik.setFieldValue("transportation_feasibility", row.feasibility);
        formik.setFieldValue("corner_property", row.corner_property);
        formik.setFieldValue("new_developments", row.developments);
        formik.setFieldValue("road_types", row.road_types);
        formik.setFieldValue("contact_no", row.contact);
        formik.setFieldValue("direction", row.direction);
        formik.setFieldValue("distance", row.distance);
        formik.setFieldValue("rumors", row.rumors);
        formik.setFieldValue("id", row.id);
    };
    const openDelete = (id) => {
        setDeleteDialog(true);
        setDeleteId(id);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/customerprop/${deleteId}`);
            Toast({ message: "Successfully deleted", type: "success" });
            setDeleteDialog(false);
        } catch (error) {
            Toast({ message: "Error to delete! try again", type: "error" });
        } finally {
            fetchNerbyData();
        }
    };
    const [postLoading, setPostLoading] = useState(false);
    const onSubmit = async (values) => {
        if (editing) {
            const payload = {
                ...values,
                marketid: marketid,
            };
            setPostLoading(true);
            try {
                await axios.post(`${API_BASE_URL}/customerprop`, payload, {
                    headers: {
                        "Content-Type": "application/json",
                        "Gl-Status": "nearby",
                    },
                });
                fetchNerbyData();
                setEditDialog(false);
                Toast({ message: "Successfully add", type: "success" });
                formik.resetForm();
                setPostLoading(false);
            } catch (error) {
                Toast({ message: "Failed to add", type: "error" });
                setPostLoading(false);
            }
        } else {
            const payload = {
                ...values,
                marketid: marketid,
            };
            setPostLoading(true);
            try {
                await axios.post(`${API_BASE_URL}/customerprop`, payload, {
                    headers: {
                        "Content-Type": "application/json",
                        "Gl-Status": "nearby",
                    },
                });
                fetchNerbyData();
                setNewDialog(false);
                Toast({ message: "Successfully add", type: "success" });
                formik.resetForm();
                setPostLoading(false);
            } catch (error) {
                Toast({ message: "Failed to add", type: "error" });
                setPostLoading(false);
            }
        }
    };
    const formik = useFormik({
        initialValues: {
            property: "",
            priceperunit: "",
            loc: "",
            road_width: "",
            amenities: "",
            location_advantages: "",
            transportation_feasibility: "",
            corner_property: "",
            new_developments: "",
            road_types: "",
            contact_no: "",
            direction: "",
            distance: "",
            rumors: "",
            enqid: eid,
            staff_id: staffid.loginid,
        },
        // validationSchema: yup.object().shape({
        //     loc: yup.number().typeError('loc must be a number !!').required('loc is required !!'),
        //     road_width: yup.string().required('road_width is required !!').max(100),
        //     amenities: yup.string()
        //         .required('amenities is required !!')
        //         .matches(/^[A-Za-z\s]+$/, 'amenities must contain only letters and spaces'),
        //     transportation_feasibility: yup.string()
        //         .required('transportation_feasibility is required !!')
        //         .matches(/^[A-Za-z\s]+$/, 'transportation_feasibility must contain only letters and spaces'),
        //     corner_property: yup.string()
        //         .required('corner_property is required !!')
        //         .matches(/^[A-Za-z\s]+$/, 'corner_property must contain only letters and spaces'),
        //     road_types: yup.string()
        //         .required('road_types is required !!')
        //         .matches(/^[A-Za-z\s]+$/, 'road_types must contain only letters and spaces'),
        //     direction: yup.string()
        //         .required('direction is required !!')
        //         .matches(/^[A-Za-z\s]+$/, 'direction must contain only letters and spaces'),
        //     distance: yup.string().required('distance is required !!').max(100),

        // }),
        onSubmit,
    });

    const fetchNerbyData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/customerprop/${eid}`, {
                headers: {
                    "Gl-Status": "nearby",
                },
            });
            setNearByData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchNerbyData();
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
            <div className="d-flex justify-content-end mt-4 mb-3">
                {staffid.logintype == "staff" &&
                    (status === "pending" || status === "complete") &&
                    pagetype !== "reminder" && enquiryDoumentData?.status !== "booking" ? (
                    <a href="#0" onClick={() => setNewDialog(true)} className="btn1 me-2">
                        + Add
                    </a>
                ) : null}
            </div>

            <DataTable
                persistTableHead={true}
                columns={NearbyColumns}
                data={nearByData}
                customStyles={customStyle}
                pagination
                // selectableRows
                fixedHeader
            />
            <Dialog
                visible={newDialog}
                style={{ width: "55rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Add Reference Properties"
                modal
                className="p-fluid"
                onHide={() => {
                    setNewDialog(false);
                    formik.resetForm();
                }}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className="row">
                        {/* Reference property  */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="loc" className="form-label">
                                        Reference property
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        autoComplete="off"
                                        name="property"
                                        value={formik.values.property}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.property && formik.touched.property ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.property}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        {/* Price Per Unit  */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="loc" className="form-label">
                                        Price Per Unit
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        autoComplete="off"
                                        name="priceperunit"
                                        value={formik.values.priceperunit}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.priceperunit && formik.touched.priceperunit ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.priceperunit}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        {/* Lat, Long */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="loc" className="form-label">
                                        Lat & Long
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        autoComplete="off"
                                        name="loc"
                                        value={formik.values.loc}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.loc && formik.touched.loc ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.loc}
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
                                        Road Width
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="road_width"
                                        name="road_width"
                                        value={formik.values.road_width}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    // maxLength='100'
                                    />
                                    {formik.errors.road_width && formik.touched.road_width ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.road_width}
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
                                        Amenities
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="amenities"
                                        name="amenities"
                                        value={formik.values.amenities}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.amenities && formik.touched.amenities ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.amenities}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* Location Advantages */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="location_advantages" className="form-label">
                                        Location Advantages
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="location_advantages"
                                        name="location_advantages"
                                        value={formik.values.location_advantages}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Transportation Feasibility */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label
                                        htmlFor="transportation_feasibility"
                                        className="form-label"
                                    >
                                        Transportation Feasibility
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="transportation_feasibility"
                                        name="transportation_feasibility"
                                        value={formik.values.transportation_feasibility}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.transportation_feasibility &&
                                        formik.touched.transportation_feasibility ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.transportation_feasibility}
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
                                        Corner Property
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="corner_property"
                                        name="corner_property"
                                        value={formik.values.corner_property}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.corner_property &&
                                        formik.touched.corner_property ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.corner_property}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* New Developments */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="new_developments" className="form-label">
                                        New Developments
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="new_developments"
                                        name="new_developments"
                                        value={formik.values.new_developments}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Road Types */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="road_types" className="form-label">
                                        Road Types
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="road_types"
                                        name="road_types"
                                        value={formik.values.road_types}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.road_types && formik.touched.road_types ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.road_types}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* Contact Number */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="contact_no" className="form-label">
                                        Contact Number
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="contact_no"
                                        name="contact_no"
                                        value={formik.values.contact_no}
                                        // onChange={formik.handleChange}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*$/.test(value)) {
                                                formik.setFieldValue("contact_no", value);
                                            }
                                        }}
                                        minLength={10}
                                        maxLength={10}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Direction */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="direction" className="form-label">
                                        Direction
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="direction"
                                        name="direction"
                                        value={formik.values.direction}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.direction && formik.touched.direction ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.direction}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* Distance */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="distance" className="form-label">
                                        Distance
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="distance"
                                        name="distance"
                                        value={formik.values.distance}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.distance && formik.touched.distance ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.distance}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* Rumors */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="rumors" className="form-label">
                                        Rumors
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="rumors"
                                        name="rumors"
                                        value={formik.values.rumors}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                        <button
                            className="btn1"
                            type="submit"
                            onClick={() => setEditing(false)}
                            disabled={postLoading}
                        >
                            {postLoading ? "Processing" : "Submit"}
                        </button>
                    </div>
                </form>
            </Dialog>
            <Dialog
                visible={editDialog}
                style={{ width: "55rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Edit Reference Properties"
                modal
                className="p-fluid"
                onHide={() => setEditDialog(false)}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className="row">
                        {/* Reference property  */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="loc" className="form-label">
                                        Reference property
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        autoComplete="off"
                                        name="property"
                                        value={formik.values.property}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.property && formik.touched.property ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.property}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        {/* Price Per Unit  */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="loc" className="form-label">
                                        Price Per Unit
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        autoComplete="off"
                                        name="priceperunit"
                                        value={formik.values.priceperunit}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.priceperunit && formik.touched.priceperunit ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.priceperunit}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        {/* Lat, Long */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="loc" className="form-label">
                                        Lat & Long
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        autoComplete="off"
                                        name="loc"
                                        value={formik.values.loc}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.loc && formik.touched.loc ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.loc}
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
                                        Road Width
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="road_width"
                                        name="road_width"
                                        value={formik.values.road_width}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    // maxLength='100'
                                    />
                                    {formik.errors.road_width && formik.touched.road_width ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.road_width}
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
                                        Amenities
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="amenities"
                                        name="amenities"
                                        value={formik.values.amenities}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.amenities && formik.touched.amenities ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.amenities}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* Location Advantages */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="location_advantages" className="form-label">
                                        Location Advantages
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="location_advantages"
                                        name="location_advantages"
                                        value={formik.values.location_advantages}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Transportation Feasibility */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label
                                        htmlFor="transportation_feasibility"
                                        className="form-label"
                                    >
                                        Transportation Feasibility
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="transportation_feasibility"
                                        name="transportation_feasibility"
                                        value={formik.values.transportation_feasibility}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.transportation_feasibility &&
                                        formik.touched.transportation_feasibility ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.transportation_feasibility}
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
                                        Corner Property
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="corner_property"
                                        name="corner_property"
                                        value={formik.values.corner_property}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.corner_property &&
                                        formik.touched.corner_property ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.corner_property}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* New Developments */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="new_developments" className="form-label">
                                        New Developments
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="new_developments"
                                        name="new_developments"
                                        value={formik.values.new_developments}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Road Types */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="road_types" className="form-label">
                                        Road Types
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="road_types"
                                        name="road_types"
                                        value={formik.values.road_types}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.road_types && formik.touched.road_types ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.road_types}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* Contact Number */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="contact_no" className="form-label">
                                        Contact Number
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="contact_no"
                                        name="contact_no"
                                        value={formik.values.contact_no}
                                        // onChange={formik.handleChange}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*$/.test(value)) {
                                                formik.setFieldValue("contact_no", value);
                                            }
                                        }}
                                        minLength={10}
                                        maxLength={10}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Direction */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="direction" className="form-label">
                                        Direction
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="direction"
                                        name="direction"
                                        value={formik.values.direction}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.direction && formik.touched.direction ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.direction}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* Distance */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="distance" className="form-label">
                                        Distance
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="distance"
                                        name="distance"
                                        value={formik.values.distance}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.distance && formik.touched.distance ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.distance}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* Rumors */}
                        <div className="col-md-12 col-lg-6 mb-3">
                            <div className="row">
                                <div className="col-4 mb-3">
                                    <label htmlFor="rumors" className="form-label">
                                        Rumors
                                    </label>
                                </div>
                                <div className="col-7 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="rumors"
                                        name="rumors"
                                        value={formik.values.rumors}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                        <button
                            className="btn1"
                            type="submit"
                            onClick={() => setEditing(true)}
                            disabled={postLoading}
                        >
                            {postLoading ? "Updating..." : "Update"}{" "}
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
                        Are you sure you want to delete the selected Row ?
                    </span>
                </div>
            </Dialog>
        </>
    );
};

export default NearbyMarketAP;
