import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import { fetchState } from '../../../../../Redux/Actions/MasterPage/StateAction';
import { fetchDistrict } from '../../../../../Redux/Actions/MasterPage/DistrictAction';
import { fetchTaluk } from '../../../../../Redux/Actions/MasterPage/TalukAction';
import { fetchVillage } from '../../../../../Redux/Actions/MasterPage/VillageAction';
import Toast from '../../../../../Utils/Toast';
import axios from 'axios';
import API_BASE_URL from '../../../../../Api/api';
import Spinner from "react-bootstrap/Spinner";

const TitleDetails = ({ data }) => {
    const staffid = JSON.parse(sessionStorage.getItem("token"));
    const dispatch = useDispatch();
    const StateData = useSelector((state) => state.State.StateNameData);
    const DistrictData = useSelector((state) => state.District.districtData);
    const talukData = useSelector((state) => state.Taluk.TalukData);
    const VillageData = useSelector((state) => state.Village.villageData);
    const [titeleData, setTitledata] = useState([])

    const [sroData, setSroData] = useState([])

    const fetchSro = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/srodetails`
            );
            setSroData(response?.data || []);
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        dispatch(fetchState());
        dispatch(fetchDistrict());
        dispatch(fetchTaluk());
        dispatch(fetchVillage());

        fetchSro()
    }, [dispatch, data]);

    const fetchPatta = async (id) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/enquirydeed/${id}`
            );
            setTitledata(response.data || []);
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        if (data) {
            fetchPatta(data.id);
        }
    }, [data]);

    const [isLoading, setIsLoading] = useState(true)

    const onSubmit = async (values) => {

        const payload = {
            ...values,
            docid: data.id,
            eid:data.eid,
            pid: null
        }
        setIsLoading(true)
        try {
            await axios.post(`${API_BASE_URL}/enquirydeed`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            Toast({ message: "Successfully Submited", type: "success" });
            setIsLoading(false);
            setTitledata()
        } catch (error) {
            alert(error);
        } finally {
            fetchPatta(data.id)
            setIsLoading(false)
        }
    };
    const formik = useFormik({
        initialValues: {
            document: "",
            title: "",
            registerDate: "",
            ownerName: "",
            type: "",
            state: "",
            district: "",
            taluk: "",
            village: "",
            sro: ""
        },
        validationSchema: yup.object().shape({
            document: yup.string().required("document is required !!"),
            title: yup.string().required("title is required !!"),
            ownerName: yup.string().required("ownerName is required !!"),
            registerDate: yup.string().required("date is required !!"),
            type: yup.string().required("type is required !!"),
            state: yup.string().required("state is required !!"),
            district: yup.string().required("district is required !!"),
            taluk: yup.string().required("taluk is required !!"),
            village: yup.string().required("village is required !!"),
            sro: yup.string().required("sro is required !!"),

        }),
        onSubmit,
    });

    useEffect(() => {
        if (titeleData && Object.keys(titeleData).length > 0) {
            formik.setFieldValue("document", titeleData.document)
            formik.setFieldValue("title", titeleData.title)
            formik.setFieldValue("ownerName", titeleData.ownerName)
            formik.setFieldValue("registerDate", titeleData.registerDate)
            formik.setFieldValue("state", titeleData.state)
            formik.setFieldValue("district", titeleData.district)
            formik.setFieldValue("taluk", titeleData.taluk)
            formik.setFieldValue("village", titeleData.village)
            formik.setFieldValue("type", titeleData.type)
            formik.setFieldValue("sro", titeleData.sro)
        }
    }, [titeleData])


    return (
        <div>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div className="row mt-4" >


                    <div className="col-md-6 mb-3 ">
                        <div className="row">
                            <div className="col-4 mb-3 ">
                                <label
                                    htmlFor="lastName"
                                    className="form-label"
                                >
                                    Title document no
                                </label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="document"
                                    placeholder='Enter document No...'
                                    value={formik.values.document}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.document && formik.touched.document ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.document}
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
                                    Title document Name
                                </label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    placeholder='Enter title Name...'
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.title && formik.touched.title ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.title}
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
                                    Registered date
                                </label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <DatePicker
                                    selected={formik.values.registerDate ? new Date(formik.values.registerDate) : null}
                                    onChange={(date) => {
                                        const formattedDate = date ? date.toISOString().split("T")[0] : "";
                                        formik.setFieldValue("registerDate", formattedDate);
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Select a Date"
                                    className="form-control w-100"
                                    style={{ width: "100%" }}
                                />
                                {formik.errors.registerDate && formik.touched.registerDate ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.registerDate}
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
                                    Present owner name
                                </label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="ownerName"
                                    placeholder='Enter ownerName ...'
                                    value={formik.values.ownerName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.ownerName && formik.touched.ownerName ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.ownerName}
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
                                    Property type
                                </label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="type"
                                    placeholder='Enter Property Type ...'
                                    value={formik.values.type}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.type && formik.touched.type ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.type}
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
                                    State
                                </label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <select
                                    name="state"
                                    id="state"
                                    className='form-select'
                                    value={formik.values.state}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Select State</option>
                                    {StateData?.map((item) => (
                                        <option value={item.id} >{item.state_name} </option>
                                    ))}
                                </select>
                                {formik.errors.state && formik.touched.state ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.state}
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
                                    District
                                </label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <select
                                    name="district"
                                    id="district"
                                    className='form-select'
                                    value={formik.values.district}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Select district</option>
                                    {DistrictData?.filter((district) => district.state_type === formik.values.state).map((item) => (
                                        <option key={item.id} value={item.id}> {item.district} </option>
                                    ))}
                                </select>
                                {formik.errors.district && formik.touched.district ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.district}
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
                                    Taluk
                                </label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <select
                                    name="taluk"
                                    id="taluk"
                                    className='form-select'
                                    value={formik.values.taluk}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Select Taluk</option>
                                    {talukData?.filter((taluk) => taluk.taluk_district === formik.values.district).map((item) => (
                                        <option key={item.id} value={item.id}> {item.taluk_name} </option>
                                    ))}
                                </select>
                                {formik.errors.taluk && formik.touched.taluk ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.taluk}
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

                                    {/* {formik.values.type === "Town_patta" ? "Town" : "Revenue village "} */}
                                    Revenue village
                                </label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <select
                                    name="village"
                                    id="village"
                                    className='form-select'
                                    value={formik.values.village}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Select Village</option>
                                    {VillageData?.filter((vill) => vill.village_taluk === formik.values.taluk).map((item) => (
                                        <option key={item.id} value={item.id}> {item.village_name} </option>
                                    ))}
                                </select>
                                {formik.errors.village && formik.touched.village ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.village}
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
                                    SRO
                                </label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <select
                                    type="text"
                                    className="form-select"
                                    name="sro"
                                    value={formik.values.sro}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Select SRO</option>
                                    {
                                        sroData?.map((item) => (
                                            <option key={item.id} value={item.id}>{item.sro_title} </option>
                                        ))
                                    }
                                </select>
                                {formik.errors.sro && formik.touched.sro ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.sro}
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

export default TitleDetails