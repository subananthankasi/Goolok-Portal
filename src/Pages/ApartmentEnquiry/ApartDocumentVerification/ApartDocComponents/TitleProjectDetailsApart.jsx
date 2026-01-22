import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import { fetchState } from '../../../../Redux/Actions/MasterPage/StateAction';
import { fetchDistrict } from '../../../../Redux/Actions/MasterPage/DistrictAction';
import { fetchTaluk } from '../../../../Redux/Actions/MasterPage/TalukAction';
import { fetchVillage } from '../../../../Redux/Actions/MasterPage/VillageAction';
import Toast from '../../../../Utils/Toast';
import axios from 'axios';
import API_BASE_URL from '../../../../Api/api';
import Spinner from "react-bootstrap/Spinner";

const TitleProjectDetailsApart = ({ data }) => {
    const staffid = JSON.parse(localStorage.getItem("token"));
    const dispatch = useDispatch();




    const [prDetails, setPrDetails] = useState([])
    const fetchDetails = async (eid) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/prdetail/${eid}`
            );
            setPrDetails(response.data?.[0] || []);
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        if (data) {
            fetchDetails(data.eid);
        }
    }, [data]);

    const [isLoading, setIsLoading] = useState(true)

    const onSubmit = async (values) => {

        const payload = {
            ...values,
            enqid: data.eid,
        }
        setIsLoading(true)
        try {
            await axios.post(`${API_BASE_URL}/enquirydeed/add`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            Toast({ message: "Successfully Submited", type: "success" });
            setIsLoading(false);
            setPrDetails()
        } catch (error) {
            alert(error);
        } finally {
            fetchDetails(data.eid)
            setIsLoading(false)
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

    useEffect(() => {
        if (prDetails && Object.keys(prDetails).length > 0) {
            formik.setFieldValue("projectname", prDetails.project_name)
            formik.setFieldValue("aprovalno", prDetails.approval_no)
            formik.setFieldValue("rerano", prDetails.rera_no)
            formik.setFieldValue("planningno", prDetails.planing_permit_no)
            formik.setFieldValue("buildingno", prDetails.building_permit_no)
            formik.setFieldValue("aprtno", prDetails.apartment_no)
            formik.setFieldValue("nobhk", prDetails.bhk_count)
            formik.setFieldValue("facing", prDetails.facing)
            formik.setFieldValue("floor", prDetails.floor)
            formik.setFieldValue("builtarea", prDetails.builtup_area)
            formik.setFieldValue("commonarea", prDetails.common_area)
            formik.setFieldValue("superarea", prDetails.super_area)
            formik.setFieldValue("uds", prDetails.uds_size)
            formik.setFieldValue("carparking", prDetails.parking)
            formik.setFieldValue("id", prDetails.id)

        }
    }, [prDetails])


    return (
        <div>
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
                        {staffid.Login === "staff" && (data.status === "pending" || data.status === "verify") && (
                            <>
                                <Button variant="outlined" type="button" color="error" className='me-2' onClick={() => formik.resetForm()} >
                                    Clear
                                </Button>
                                <Button variant="contained" type="submit"  >
                                    Next
                                </Button>
                            </>
                        )}
                    </div>

                </div>


            </form>
        </div>
    )
}

export default TitleProjectDetailsApart