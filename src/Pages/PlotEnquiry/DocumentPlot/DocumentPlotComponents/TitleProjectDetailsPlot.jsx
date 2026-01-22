import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

import Spinner from "react-bootstrap/Spinner";
import API_BASE_URL from '../../../../Api/api';
import Toast from '../../../../Utils/Toast';

const TitleProjectDetailsPlot = ({ data }) => {

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
            aprtno: "",
            builtarea: "",
            approvaltype: ""

        },
        validationSchema: yup.object().shape({
            projectname: yup.string().required("projectname is required !!"),
            aprovalno: yup.string().required("aprovalno is required !!"),
            // rerano: yup.string().required("rerano is required !!"),
            builtarea: yup.string().required("extent unit  is required !!"),
            aprtno: yup.string().required("plot no is required !!"),


        }),
        onSubmit,
    });

    useEffect(() => {
        if (prDetails && Object.keys(prDetails).length > 0) {
            formik.setFieldValue("projectname", prDetails.project_name)
            formik.setFieldValue("aprovalno", prDetails.approval_no)
            formik.setFieldValue("rerano", prDetails.rera_no)
            formik.setFieldValue("aprtno", prDetails.apartment_no)
            formik.setFieldValue("builtarea", prDetails.builtup_area)
            formik.setFieldValue("approvaltype", prDetails.approval_type)
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
                                    {data.property === "UnApproved Plot" ? "Approval No." : data.property === "CMDA" ? "CMDA Approval No" : "DTCP Approval No."}
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
                    {data.property === "CMDA" || data.property === "DTCP" ? (

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

                    ) : (
                        <div className="col-md-6 mb-3 ">
                            <div className="row">
                                <div className="col-4 mb-3 ">
                                    <label
                                        htmlFor="lastName"
                                        className="form-label"
                                    >
                                        Approval Type
                                    </label>
                                </div>
                                <div className="col-8 mb-3 ">
                                    <select
                                        type="select"
                                        className="form-select"
                                        name="approvaltype"
                                        placeholder='enter approvaltype...'
                                        value={formik.values.approvaltype}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Local body approved">Local body approved</option>
                                        <option value="Unapproved">Unapproved</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="col-md-6 mb-3 ">
                        <div className="row">
                            <div className="col-4 mb-3 ">
                                <label
                                    htmlFor="lastName"
                                    className="form-label"
                                >
                                    Plot No.
                                </label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="aprtno"
                                    placeholder='enter plot no...'
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
                                    Extent in units.
                                </label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <input
                                    type="number"
                                    className="form-control"
                                    name="builtarea"
                                    placeholder='enter extent units...'
                                    value={formik.values.builtarea}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.builtarea && formik.touched.builtarea ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.builtarea}
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
                                    Submit
                                </Button>
                            </>
                        )}
                    </div>

                </div>


            </form>
        </div>
    )
}

export default TitleProjectDetailsPlot