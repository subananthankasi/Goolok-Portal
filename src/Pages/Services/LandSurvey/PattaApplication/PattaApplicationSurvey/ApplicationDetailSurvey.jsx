import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
// import { DateFormatcustom } from "../../../../Utils/DateFormatcustom";
// import customStyle from "../../../../Utils/tableStyle";
// import API_BASE_URL from "../../../../Api/api";
import axios from "axios";
// import Toast from "../../../../Utils/Toast";
import { TabView, TabPanel } from "primereact/tabview";
import { useDispatch, useSelector } from "react-redux";
// import { fetchDistrict } from "../../../../Redux/Actions/MasterPage/DistrictAction";
// import { fetchTaluk } from "../../../../Redux/Actions/MasterPage/TalukAction";
// import { fetchVillage } from "../../../../Redux/Actions/MasterPage/VillageAction";
// import { fetchSRODetails } from "../../../../Redux/Actions/MasterPage/SRODetailsAction";
import Spinner from "react-bootstrap/Spinner";
import { fetchDistrict } from "../../../../../Redux/Actions/MasterPage/DistrictAction";
import { fetchTaluk } from "../../../../../Redux/Actions/MasterPage/TalukAction";
import { fetchVillage } from "../../../../../Redux/Actions/MasterPage/VillageAction";
import { fetchSRODetails } from "../../../../../Redux/Actions/MasterPage/SRODetailsAction";
import API_BASE_URL from "../../../../../Api/api";
import Toast from "../../../../../Utils/Toast";
import customStyle from "../../../../../Utils/tableStyle";

const ApplicationDetailSurvey = ({ eid, id, status, rowId, pagetype }) => {

    const staffid = JSON.parse(sessionStorage.getItem("token"));
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [deleteId, setdeleteId] = useState(null)
    const [getData, setGetData] = useState([])
    const [loading, setLoading] = useState(true)

    const districtData = useSelector((state) => state.District.districtData);
    const TalukData = useSelector((state) => state.Taluk.TalukData);
    const VillageData = useSelector((state) => state.Village.villageData);
    const SRODetailsData = useSelector((state) => state.SRODetails.SRODetailsData);
    const enquiryDoumentData = useSelector(
        (state) => state.Enquiry.enquiryDocument
    );

    useEffect(() => {
        dispatch(fetchDistrict());
        dispatch(fetchTaluk());
        dispatch(fetchVillage());
        dispatch(fetchSRODetails());
    }, [dispatch]);

    const column1 = [
        {
            name: "S.no",
            cell: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Application Type",
            selector: (row) => row.patta_type,
            sortable: true,
            width: "180px",
        },
        {
            name: "Land survey Application No",
            selector: (row) => row.application_no,
            sortable: true,
            width: "180px",
        },
        {
            name: "Application Date",
            selector: (row) => row.patta_date,
            sortable: true,
            width: "180px",
        },
        {
            name: "Sale Deed No",
            selector: (row) => row.saledeed_no,
            sortable: true,
            width: "180px",
        },
        {
            name: "District",
            selector: (row) => row.districtName,
            sortable: true,
        },
        {
            name: "Taluk",
            selector: (row) => row.talukName,
            sortable: true,
        },
        {
            name: "Village",
            selector: (row) => row.villageName,
            sortable: true,
        },
        {
            name: "Sro",
            selector: (row) => row.sro_title,
            sortable: true,
        },
        ...(staffid.logintype == "staff" && (status === "complete" || status === "pending")) && pagetype !== "reminder" && enquiryDoumentData?.status !== "live" ? [
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
                            <button
                                className="btn btn-outline-danger delete"
                                data-tooltip-id="delete"
                                onClick={() => handleDeleteOpen(row)}
                            >
                                <DeleteIcon />
                            </button>
                        </div>
                    </>
                ),
                sortable: true,
            }] : [],
    ];
    const handleDeleteOpen = (row) => {
        setDeleteDialog(true)
        setdeleteId(row.id)
    }
    const handleDelete = async (row) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/pattadelete/${deleteId}`)
            Toast({ message: "Successfully deleted", type: "success" })
            fetch()
            setDeleteDialog(false)
        } catch (error) {
            console.error(error)
        }
    }
    const handleEdit = (row) => {
        setEditing(true)
        formik.setFieldValue("pattatype", row.patta_type)
        formik.setFieldValue("pattano", row.application_no)
        formik.setFieldValue("pattadate", row.patta_date)
        formik.setFieldValue("deedno", row.saledeed_no)
        formik.setFieldValue("district", row.district)
        formik.setFieldValue("taluk", row.taluk)
        formik.setFieldValue("village", row.village)
        formik.setFieldValue("sro", row.sro)
        formik.setFieldValue("id", row.id)
    }
    const [postLoading, setPostLoading] = useState(false)
    const onSubmit = async (values) => {
        const payload = {
            ...values,
            enqid: eid,
            docid: id,
            rowId: rowId
        }
        setPostLoading(true)
        try {
            const response = await axios.post(`${API_BASE_URL}/pattacreate`, payload)
            fetch()

            if (payload.id) {
                Toast({ message: "Successfully Updated", type: "success" })
                setEditing(false)
            } else {
                Toast({ message: "Successfully Created", type: "success" })
            }
            formik.resetForm()
            setPostLoading(false)
        } catch (error) {
            Toast({ message: "Failed to save", type: "error" })
            setPostLoading(false)
        }
    }
    const fetch = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/pattalist/${rowId}`)
            setGetData(response.data)
            setLoading(false)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetch()
    }, [])

    const formik = useFormik({
        initialValues: {
            pattatype: "",
            pattano: "",
            pattadate: "",
            deedno: "",
            district: "",
            taluk: "",
            village: "",
            sro: "",
        },
        validationSchema: yup.object().shape({
            pattatype: yup.string().required("pattatype is required !!"),
            pattano: yup.string().required(" pattano is required !!"),
            pattadate: yup.string().required("pattadate is required !!"),
            deedno: yup.string().required("sale deed no is required !!"),
            district: yup.string().required("district is required !!"),
            taluk: yup.string().required("taluk is required !!"),
            village: yup.string().required("village is required !!"),
            sro: yup.string().required("sro is required !!"),
        }),
        onSubmit,
    });

    return (
        <>

            <div className="mt-3">
                {loading ? (
                    <div
                        style={{
                            height: "32vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Spinner className="mt-auto" />
                    </div>
                ) : (getData.length === 0 || editing) && (
                    <form onSubmit={formik.handleSubmit} autoComplete="off">
                        <div className="row">
                            <div className="form-group col-6">
                                <label className="form-label"> Patta Type : <span style={{ color: "red" }}>*</span> </label>
                                <select
                                    type="text"
                                    className="form-select"
                                    name="pattatype"
                                    id="pattatype"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.pattatype}
                                >
                                    <option>Select type ... </option>
                                    <option value="Rural"> Rural</option>
                                    <option value="Town"> Town</option>


                                </select>

                                {formik.errors.pattatype && formik.touched.pattatype ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.pattatype}
                                    </p>
                                ) : null}
                            </div>
                            <div className="form-group  col-6">
                                <label className="form-label"> Patta Application No: <span style={{ color: "red" }}>*</span>  </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="pattano"
                                    id="pattano"
                                    placeholder="Enter patta no..."
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.pattano}
                                />
                                {formik.errors.pattano && formik.touched.pattano ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.pattano}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-6 mt-2">
                                <label className="form-label"> Patta Application Date: <span style={{ color: "red" }}>*</span>  </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="pattadate"
                                    id="pattadate"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.pattadate}
                                />
                                {formik.errors.pattadate && formik.touched.pattadate ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.pattadate}
                                    </p>
                                ) : null}
                            </div>
                            <div className="form-group mt-2  col-6">
                                <label className="form-label"> Sale Deed No: <span style={{ color: "red" }}>*</span>  </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="deedno"
                                    id="deedno"
                                    placeholder="Enter sale deed no..."
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.deedno}
                                />
                                {formik.errors.deedno && formik.touched.deedno ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.deedno}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-6 mt-2">
                                <label className="form-label">District : <span style={{ color: "red" }}>*</span>  </label>
                                <select
                                    type="text"
                                    className="form-select"
                                    name="district"
                                    id="district"
                                    placeholder="Enter district..."
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        formik.setFieldValue("taluk", "");
                                    }}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.district}
                                >
                                    <option>select district</option>
                                    {districtData?.map((item) => (
                                        <option key={item.id} value={item.id}> {item.district} </option>
                                    ))}
                                </select>
                                {formik.errors.district && formik.touched.district ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.district}
                                    </p>
                                ) : null}
                            </div>
                            <div className="form-group col-6 mt-2">
                                <label className="form-label">Taluk : <span style={{ color: "red" }}>*</span>  </label>
                                <select
                                    type="text"
                                    className="form-select"
                                    name="taluk"
                                    id="taluk"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.taluk}
                                >
                                    <option>select Taluk</option>
                                    {TalukData?.filter((taluk) => taluk.taluk_district === formik.values.district).map((item) => (
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
                        <div className="row">
                            <div className="form-group col-6 mt-2">
                                <label className="form-label">Village : <span style={{ color: "red" }}>*</span>  </label>
                                <select
                                    type="text"
                                    className="form-select"
                                    name="village"
                                    id="village"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.village}
                                >
                                    <option>select Village</option>
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
                            <div className="form-group col-6 mt-2">
                                <label className="form-label">Sro : <span style={{ color: "red" }}>*</span>  </label>
                                <select
                                    type="text"
                                    className="form-select"
                                    name="sro"
                                    id="sro"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.sro}
                                >
                                    <option>select Sro</option>
                                    {SRODetailsData?.map((item) => (
                                        <option key={item.id} value={item.id}>{item.sro_title} </option>
                                    ))}
                                </select>
                                {formik.errors.sro && formik.touched.sro ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.sro}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mt-4">
                            <Button variant="contained" type="submit" disabled={postLoading} >
                                {editing ? "Update" : "Submit"}
                            </Button>
                        </div>
                    </form>
                )}
                {!loading && getData.length > 0 && !editing && (
                    <div className="mt-5">
                        <DataTable
                            persistTableHead={true}
                            columns={column1}
                            data={getData}
                            customStyles={customStyle}
                            // pagination
                            fixedHeader
                        />
                    </div>
                )}
            </div>
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
                    <Button variant="outlined" color="error" onClick={() => setDeleteDialog(false)} >No</Button>
                    <Button variant="contained" onClick={handleDelete}>Yes</Button>
                </div>

            </Dialog>
        </>
    )
}

export default ApplicationDetailSurvey