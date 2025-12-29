import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import API_BASE_URL, { IMG_PATH } from "../../../../../Api/api";
import FileView from "../../../../../Utils/FileView/FileView";
import customStyle from "../../../../../Utils/tableStyle";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import { FileDownload } from "../../../../../Utils/FileDownload";
import Toast from "../../../../../Utils/Toast";
import { useSelector } from "react-redux";

export const ProjectDetailsLawyerApart = ({ eid, id, status, pagetype }) => {

    const staffid = JSON.parse(sessionStorage.getItem("token"));
    const [newDialog, setNewDialog] = useState(false)
    const [prDetails, setPrDetails] = useState([])
    const enquiryDoumentData = useSelector(
        (state) => state.Enquiry.enquiryDocument
    );
    const column = [
        {
            name: "S.no",
            cell: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "ProjectName",
            selector: (row) => row.project_name,
            sortable: true,
        },
        {
            name: "DTCP / CMDA Approval No.",
            selector: (row) => row.approval_no,
            sortable: true,
            width: "150px"
        },
        {
            name: "RERA No",
            selector: (row) => row.rera_no,
            sortable: true,
            width: "150px"
        },
        {
            name: "Planning Permit No",
            selector: (row) => row.planing_permit_no,
            sortable: true,
            width: "150px"
        },
        {
            name: "Building Permit No",
            selector: (row) => row.building_permit_no,
            sortable: true,
            width: "150px"
        },
        {
            name: "Apartment No",
            selector: (row) => row.apartment_no,
            sortable: true,
            width: "150px"
        },
        {
            name: "Floor",
            selector: (row) => row.floor,
            sortable: true,
            width: "150px"
        },
        {
            name: "Car Parking",
            selector: (row) => row.parking,
            sortable: true,
            width: "150px"
        },
        {
            name: "Built up area (Units)",
            selector: (row) => row.builtup_area,
            sortable: true,
            width: "150px"
        },
        {
            name: "Common Area  (Units)",
            selector: (row) => row.common_area,
            sortable: true,
            width: "150px"
        },
        {
            name: "Super Built up area ",
            selector: (row) => row.super_area,
            sortable: true,
            width: "150px"
        },
        {
            name: "UDS (Units)",
            selector: (row) => row.uds_size,
            sortable: true,
            width: "150px"
        },
        {
            name: "No of BHK",
            selector: (row) => row.bhk_count,
            sortable: true,
            width: "150px"
        },
        {
            name: "Facing",
            selector: (row) => row.facing,
            sortable: true,
        },

        ...((status === "pending" || status === "complete") && staffid.Login == "staff" && pagetype !== "reminder" && enquiryDoumentData?.status !== "booking"
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
                        </div>
                    ),
                }]
            : []),
    ];

    const handleEdit = (row) => {
        setNewDialog(true)
        formik.setFieldValue("projectname", row.project_name)
        formik.setFieldValue("aprovalno", row.approval_no)
        formik.setFieldValue("rerano", row.rera_no)
        formik.setFieldValue("planningno", row.planing_permit_no)
        formik.setFieldValue("buildingno", row.building_permit_no)
        formik.setFieldValue("aprtno", row.apartment_no)
        formik.setFieldValue("nobhk", row.bhk_count)
        formik.setFieldValue("facing", row.facing)
        formik.setFieldValue("floor", row.floor)
        formik.setFieldValue("builtarea", row.builtup_area)
        formik.setFieldValue("commonarea", row.common_area)
        formik.setFieldValue("superarea", row.super_area)
        formik.setFieldValue("uds", row.uds_size)
        formik.setFieldValue("carparking", row.parking)
        formik.setFieldValue("id", row.id)
    }

    const fetchDetails = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/prdetail/${eid}`, {
            })
            setPrDetails(response.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchDetails()
    }, [])
    const onSubmit = async (values) => {

        const payload = {
            ...values,
            enqid: eid,
        }

        try {
            await axios.post(`${API_BASE_URL}/enquirydeed/add`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            Toast({ message: "Successfully Submited", type: "success" });
            setNewDialog(false)
            fetchDetails()
        } catch (error) {
            alert(error);
        }
    };
    const formik = useFormik({
        initialValues: {
            projectname: "",
            aprovalno: "",
            rerano: "",
            planningno: "",
            buildingno: "",
            aprtno: "",
            nobhk: "",
            facing: "",
            floor: "",
            builtarea: "",
            commonarea: "",
            superarea: "",
            uds: "",
            carparking: ""
        },
        validationSchema: yup.object().shape({
            projectname: yup.string().required("projectname is required !!"),
            planningno: yup.string().required("planning permit no is required !!"),
            buildingno: yup.string().required("building permit no is required !!"),
            aprtno: yup.string().required("aprtment no is required !!"),
            nobhk: yup.string().required("no of bhk is required !!"),
            facing: yup.string().required("facing is required !!"),
            floor: yup.string().required("floor is required !!"),
            superarea: yup.string().required("super built up area is required !!"),
            uds: yup.string().required("uds is required !!"),
            carparking: yup.string().required("car parking is required !!"),

        }),
        onSubmit,
    });

    return (
        <>
            <div className="col-12 mt-4">
                <div className="card shadow border-0">
                    <div className="card shadow border-0 p-4">
                        <div className="  justify-content-between mb-3">
                            <h6>Project Details</h6>
                            <hr />
                        </div>
                        <DataTable
                            persistTableHead={true}
                            columns={column}
                            data={prDetails}
                            customStyles={customStyle}
                            pagination
                            fixedHeader
                        />

                    </div>
                </div>
            </div>
            <Dialog
                visible={newDialog}
                style={{ width: "62rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Project Details "
                modal
                className="p-fluid"
                onHide={() => {
                    setNewDialog(false);
                    formik.resetForm();
                }}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className="row mt-4" >
                        <div className="col-md-6 mb-3 ">
                            <div className="row">
                                <div className="col-4 mb-3 ">
                                    <label
                                        htmlFor="projectname"
                                        className="form-label"
                                    >
                                        Project Name
                                    </label>
                                </div>
                                <div className="col-8 mb-3 ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="projectname"
                                        placeholder='enter project name...'
                                        value={formik.values.projectname}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.projectname && formik.touched.projectname ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.projectname}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mb-3 ">
                            <div className="row">
                                <div className="col-4 mb-3 ">
                                    <label
                                        htmlFor="lastName"
                                        className="form-label"
                                    >
                                        DTCP / CMDA Approval No.
                                    </label>
                                </div>
                                <div className="col-8 mb-3 ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="aprovalno"
                                        placeholder='enter aproval no...'
                                        value={formik.values.aprovalno}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.aprovalno && formik.touched.aprovalno ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.aprovalno}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 ">
                            <div className="row">
                                <div className="col-4 mb-3 ">
                                    <label
                                        htmlFor="lastName"
                                        className="form-label"
                                    >
                                        RERA No
                                    </label>
                                </div>
                                <div className="col-8 mb-3 ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="rerano"
                                        placeholder='enter rera no...'
                                        value={formik.values.rerano}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />

                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mb-3 ">
                            <div className="row">
                                <div className="col-4 mb-3 ">
                                    <label
                                        htmlFor="lastName"
                                        className="form-label"
                                    >
                                        Planning Permit No.
                                    </label>
                                </div>
                                <div className="col-8 mb-3 ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="planningno"
                                        placeholder='enter planing permit no...'
                                        value={formik.values.planningno}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.planningno && formik.touched.planningno ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.planningno}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 ">
                            <div className="row">
                                <div className="col-4 mb-3 ">
                                    <label
                                        htmlFor="lastName"
                                        className="form-label"
                                    >
                                        Building Permit No.
                                    </label>
                                </div>
                                <div className="col-8 mb-3 ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="buildingno"
                                        placeholder='Enter building permit no ...'
                                        value={formik.values.buildingno}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.buildingno && formik.touched.buildingno ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.buildingno}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 ">
                            <div className="row">
                                <div className="col-4 mb-3 ">
                                    <label
                                        htmlFor="lastName"
                                        className="form-label"
                                    >
                                        Apartment No.
                                    </label>
                                </div>
                                <div className="col-8 mb-3 ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="aprtno"
                                        placeholder='Enter apartment no ...'
                                        value={formik.values.aprtno}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.aprtno && formik.touched.aprtno ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.aprtno}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 ">
                            <div className="row">
                                <div className="col-4 mb-3 ">
                                    <label
                                        htmlFor="lastName"
                                        className="form-label"
                                    >
                                        No of BHK
                                    </label>
                                </div>
                                <div className="col-8 mb-3 ">
                                    <input
                                        name="nobhk"
                                        id="nobhk"
                                        className='form-control'
                                        placeholder='Enter no of bhk ...'
                                        type="text"
                                        value={formik.values.nobhk}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />

                                    {formik.errors.nobhk && formik.touched.nobhk ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.nobhk}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 ">
                            <div className="row">
                                <div className="col-4 mb-3 ">
                                    <label
                                        htmlFor="lastName"
                                        className="form-label"
                                    >
                                        Facing
                                    </label>
                                </div>
                                <div className="col-8 mb-3 ">
                                    <input
                                        name="facing"
                                        id="facing"
                                        className='form-control'
                                        placeholder='Enter facing ...'
                                        value={formik.values.facing}
                                        onChange={(e) => {
                                            const regex = /^[A-Za-z\s]*$/;
                                            if (regex.test(e.target.value)) {
                                                formik.handleChange(e);
                                            } else {
                                                alert("Please Enter Letters Only")
                                            }
                                        }}
                                        onBlur={formik.handleBlur}
                                    />

                                    {formik.errors.facing && formik.touched.facing ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.facing}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 ">
                            <div className="row">
                                <div className="col-4 mb-3 ">
                                    <label
                                        htmlFor="lastName"
                                        className="form-label"
                                    >
                                        Floor
                                    </label>
                                </div>
                                <div className="col-8 mb-3 ">
                                    <input
                                        name="floor"
                                        id="floor"
                                        className='form-control'
                                        placeholder='Enter floor ...'
                                        value={formik.values.floor}
                                        onChange={(e) => {
                                            const regex = /^[0-9]*$/;
                                            if (regex.test(e.target.value)) {
                                                formik.handleChange(e);
                                            }
                                            else {
                                                alert("Please Enter Number Only")
                                            }
                                        }}
                                        onBlur={formik.handleBlur}
                                    />

                                    {formik.errors.floor && formik.touched.floor ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.floor}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>


                        <div className="col-md-6 mb-3 ">
                            <div className="row">
                                <div className="col-4 mb-3 ">
                                    <label
                                        htmlFor="builtarea"
                                        className="form-label"
                                    >
                                        Built up area (units)
                                    </label>
                                </div>
                                <div className="col-8 mb-3 ">
                                    <input
                                        name="builtarea"
                                        id="builtarea"
                                        className='form-control'
                                        placeholder='Enter built up area ...'
                                        value={formik.values.builtarea}
                                        onChange={(e) => {
                                            const regex = /^[0-9]*$/;
                                            if (regex.test(e.target.value)) {
                                                formik.handleChange(e);
                                            }
                                            else {
                                                alert("Please Enter Number Only")
                                            }
                                        }}
                                        onBlur={formik.handleBlur}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 ">
                            <div className="row">
                                <div className="col-4 mb-3 ">
                                    <label
                                        htmlFor="builtarea"
                                        className="form-label"
                                    >
                                        Common Area  (units)
                                    </label>
                                </div>
                                <div className="col-8 mb-3 ">
                                    <input
                                        name="commonarea"
                                        id="commonarea"
                                        className='form-control'
                                        placeholder='Enter common area ...'
                                        value={formik.values.commonarea}
                                        onChange={(e) => {
                                            const regex = /^[0-9]*$/;
                                            if (regex.test(e.target.value)) {
                                                formik.handleChange(e);
                                            }
                                            else {
                                                alert("Please Enter Number Only")
                                            }
                                        }}
                                        onBlur={formik.handleBlur}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 ">
                            <div className="row">
                                <div className="col-4 mb-3 ">
                                    <label
                                        htmlFor="lastName"
                                        className="form-label"
                                    >
                                        Super Built up area / Saleable Area  (units)
                                    </label>
                                </div>
                                <div className="col-8 mb-3 ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="superarea"
                                        placeholder='Enter super built up area ...'
                                        value={formik.values.superarea}
                                        onChange={(e) => {
                                            const regex = /^[0-9]*$/;
                                            if (regex.test(e.target.value)) {
                                                formik.handleChange(e);
                                            }
                                            else {
                                                alert("Please Enter Number Only")
                                            }
                                        }}
                                        onBlur={formik.handleBlur}
                                    />

                                    {formik.errors.superarea && formik.touched.superarea ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.superarea}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 ">
                            <div className="row">
                                <div className="col-4 mb-3 ">
                                    <label
                                        htmlFor="lastName"
                                        className="form-label"
                                    >
                                        UDS
                                    </label>
                                </div>
                                <div className="col-8 mb-3 ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="uds"
                                        placeholder='Enter uds...'
                                        value={formik.values.uds}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />

                                    {formik.errors.uds && formik.touched.uds ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.uds}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 ">
                            <div className="row">
                                <div className="col-4 mb-3 ">
                                    <label
                                        htmlFor="carparking"
                                        className="form-label"
                                    >
                                        Car Parking
                                    </label>
                                </div>
                                <div className="col-8 mb-3 ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="carparking"
                                        placeholder='car parking ...'
                                        value={formik.values.carparking}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />

                                    {formik.errors.carparking && formik.touched.carparking ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.carparking}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="text-end gap-3">
                            {staffid.Login === "staff" && (status === "pending" || status === "complete") && (
                                <>

                                    <Button variant="contained" type="submit"  >
                                        Update
                                    </Button>
                                </>
                            )}
                        </div>

                    </div>


                </form>
            </Dialog>
        </>
    );
}

