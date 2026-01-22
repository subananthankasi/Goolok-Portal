import React, { useEffect, useState } from 'react';
import Toast from '../../../../Utils/Toast';
import Button from "@mui/material/Button";
import Spinner from "react-bootstrap/Spinner";
import { useFormik } from "formik";
import * as yup from "yup";
import API_BASE_URL from '../../../../Api/api';
import axios from 'axios';


const AadharDetailsGetPatta = ({ data, clearFormRef, isOpen }) => {
    const staffid = JSON.parse(localStorage.getItem("token"));
    const [isLoading, setIsLoading] = useState(true);
    const [aadharData, setAadharData] = useState([]);

    const [nameErrors, setNameErrors] = useState({
        aadhar_name: "",
        father_name: "",
    });
    useEffect(() => {
        if (!isOpen && clearFormRef) {
            clearFormRef.current = () => {
                formik.resetForm();
                setNameErrors({
                    aadhar_name: "",
                    father_name: "",
                });
            };
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && data?.id) {
            fetchAadhar(data.id);
        }
    }, [isOpen, data?.id]);


    const fetchAadhar = async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/enqaadhar/${id}`);
            setAadharData(response.data || {});
        } catch (error) {
            console.error(error);
        }
    };



    const onSubmit = async (values) => {
        const payload = {
            ...values,
            docid: data.id,
        };
        setIsLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/enqaadhar`, payload, {
                headers: { "Content-Type": "application/json" },
            });
            Toast({ message: "Successfully Submited", type: "success" });
            formik.resetForm();
            fetchAadhar(data.id);
            setNameErrors({
                aadhar_name: "",
                father_name: "",
            });
            setIsLoading(false);
        } catch (error) {
            alert(error);
            setIsLoading(false);
        }
    };

    // Formik
    const formik = useFormik({
        initialValues: {
            id: null,
            aadhar_name: "",
            father_name: "",
            aadhar_number: "",
            address: "",
        },
        validationSchema: yup.object().shape({
            aadhar_name: yup.string().required("Aadhaar Name is required"),
            father_name: yup
                .string()
                .matches(/^[A-Za-z ]*$/, "Only letters are allowed")
                .required("Father name is required !!"),
            address: yup.string().required("address is required !!"),
            aadhar_number: yup
                .string()
                .required("aadhar_number is required !!")
                .test(
                    "len",
                    "Aadhaar number must be 12 digits",
                    (val) => {
                        if (!val) return false;
                        const digits = val.replace(/\D/g, "");
                        return digits.length === 12;
                    }
                ),
        }),
        onSubmit,
        enableReinitialize: true,
    });


    useEffect(() => {
        if (isOpen && aadharData) {
            formik.setValues({
                id: aadharData.id || null,
                aadhar_name: aadharData.aadhar_name || "",
                father_name: aadharData.father_name || "",
                address: aadharData.address || "",
                aadhar_number: (aadharData.aadhar_number || "")
                    .toString()
                    .replace(/\D/g, "")
                    .slice(0, 12)
                    .replace(/(\d{4})(?=\d)/g, "$1 "),
            });
        }
    }, [aadharData, isOpen]);


    const handleLetterOnly = (e) => {
        const { name, value } = e.target;
        const cleaned = value.replace(/[^A-Za-z ]/g, "");
        formik.setFieldValue(name, cleaned);
        if (value !== cleaned) {
            setNameErrors((prev) => ({ ...prev, [name]: "Only letters allowed" }));
            formik.setFieldTouched(name, true, false);
        } else {
            setNameErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };


    const handleAadharNumberChange = (e) => {
        let v = e.target.value;
        let digits = v.replace(/\D/g, "").slice(0, 12);
        const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
        formik.setFieldValue("aadhar_number", formatted);
        formik.setFieldTouched("aadhar_number", true, false);
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="row mt-4">
                    {/* Aadhar Name */}
                    <div className="col-md-6 mb-3 ">
                        <div className="row">
                            <div className="col-4 mb-3 ">
                                <label className="form-label">Aadhar name</label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <input
                                    type="text"
                                    className="form-control"
                                    autoComplete="off"
                                    name="aadhar_name"
                                    value={formik.values.aadhar_name}
                                    placeholder="Enter Aadhar Name..."
                                    onChange={handleLetterOnly}
                                    onBlur={formik.handleBlur}
                                />
                                {nameErrors.aadhar_name ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>{nameErrors.aadhar_name}</p>
                                ) : formik.errors.aadhar_name && formik.touched.aadhar_name ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>{formik.errors.aadhar_name}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-3 ">
                        <div className="row">
                            <div className="col-4 mb-3 ">
                                <label className="form-label">Father name</label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <input
                                    type="text"
                                    className="form-control"
                                    autoComplete="off"
                                    name="father_name"
                                    placeholder="Enter Father Name..."
                                    value={formik.values.father_name}
                                    onChange={handleLetterOnly}
                                    onBlur={formik.handleBlur}
                                />
                                {nameErrors.father_name ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>{nameErrors.father_name}</p>
                                ) : formik.errors.father_name && formik.touched.father_name ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>{formik.errors.father_name}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {/* Aadhar Number */}
                    <div className="col-md-6 mb-3 ">
                        <div className="row">
                            <div className="col-4 mb-3 ">
                                <label className="form-label">Aadhar number</label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <input
                                    type="text"
                                    className="form-control"
                                    autoComplete="off"
                                    name="aadhar_number"
                                    placeholder="Enter Aadhar Number..."
                                    value={formik.values.aadhar_number}
                                    onChange={handleAadharNumberChange}
                                    onBlur={formik.handleBlur}
                                    maxLength={14}
                                />
                                {formik.errors.aadhar_number && formik.touched.aadhar_number ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>{formik.errors.aadhar_number}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="col-md-6 mb-3 ">
                        <div className="row">
                            <div className="col-4 mb-3 ">
                                <label className="form-label">Address</label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <textarea
                                    className="form-control"
                                    autoComplete="off"
                                    name="address"
                                    placeholder="text here..."
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.address && formik.touched.address ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>{formik.errors.address}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {staffid.Login === "staff" && (data.status === "pending" || data.status === "verify") && (
                        <div className="text-end">
                            <button className="btn1 me-1" type="button" onClick={() => {
                                formik.resetForm();
                                setNameErrors({
                                    aadhar_name: "",
                                    father_name: "",
                                });
                            }}>
                                Clear
                            </button>
                            <button className="btn1" type="submit">
                                {isLoading == 3 ? (
                                    <>
                                        <Spinner animation="border" size="sm" />
                                        <span className="ms-2">Please wait...</span>
                                    </>
                                ) : (
                                    "Save"
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </>
    );
};

export default AadharDetailsGetPatta;
