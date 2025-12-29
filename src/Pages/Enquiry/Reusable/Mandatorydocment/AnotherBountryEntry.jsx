import React, { useEffect, useState } from 'react'
import EditIcon from "@mui/icons-material/Edit";
import Button from '@mui/material/Button'
import { Dialog } from 'primereact/dialog';
import {  useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import API_BASE_URL from '../../../../Api/api';
import Toast from '../../../../Utils/Toast';


const AnotherBountryEntry = ({ eid, id, status, pagetype }) => {
    const staffid = JSON.parse(sessionStorage.getItem("token"));

    const [newDialog, setNewDialog] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [getData, setGetData] = useState([])

    const onSubmit = async (values) => {
        

        try {
            const updateData = {
                "id": values.id,
                "details": values
            };
            const response = await axios.post(`${API_BASE_URL}/enquirylandowner/adddetails`, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            Toast({ message: 'Successfully Updated', type: "success" });
        } catch (error) {
            console.error(error)
        } finally {
            // fetch()
            fetchSurveyData();
        }
        setNewDialog(false)
        formik.resetForm()



    }
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
            console.error(error)
        }
    };

    useEffect(() => {
        fetchSurveyData();
    }, []);


    const formik = useFormik({
        initialValues: {
            surveyno: '',
            subdivision: '',
            area: "",
            old_survey_no: "",
            old_sub_division: "",
            dimension: [
                {
                    north: "",
                    south: "",
                    east: "",
                    west: "",
                    others: ""
                }
            ],
            boundry: [{
                north: "",
                south: "",
                east: "",
                west: "",
                others: ""
            }],
            enqid: eid,
            id: null
        },
        validationSchema: yup.object().shape({
            surveyno: yup.string().required("survey no  is required!"),
            // subdivision: yup.string().required("Subdivision is required!"),
            area: yup.string().required("area is required!"),
            dimension: yup.array().of(
                yup.object().shape({
                    north: yup.string().required("North dimension is required!"),
                    south: yup.string().required("South dimension is required!"),
                    east: yup.string().required("East dimension is required!"),
                    west: yup.string().required("West dimension is required!"),
                    others: yup.string().required("Other dimension is required!"),
                })
            ).required("At least one dimension is required").min(1),

            boundry: yup.array().of(
                yup.object().shape({
                    north: yup.string().required("North boundary is required!"),
                    south: yup.string().required("South boundary is required!"),
                    east: yup.string().required("East boundary is required!"),
                    west: yup.string().required("West boundary is required!"),
                    others: yup.string().required("other boundary is required!"),
                })
            ).required("At least one dimension is required").min(1),
        }),
        onSubmit
    })

    const DeleteRow = async () => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/ownerdelete/${deleteId}`, {
            });
            Toast({ message: 'Successfully Deleted', type: "success" })
            fetch()
        } catch (error) {
            console.error(error)
        } finally {
            fetch()
        }

    }

    const hideDialog = () => {
        setNewDialog(false)
        formik.resetForm()
    }

    const handleEdit = (item) => {
        setNewDialog(true);

        let landDetails = {};
        try {

            landDetails = item.land_details ? JSON.parse(item.land_details) : {};
        } catch (error) {
            console.error("Error parsing land_details JSON:", error);
        }


        formik.setFieldValue('surveyno', item.survey_no || '');
        formik.setFieldValue('old_survey_no', item.old_survey_no || '');
        formik.setFieldValue('subdivision', item.sub_division || '');
        formik.setFieldValue('old_sub_division', item.old_sub_division || '');
        formik.setFieldValue('area', landDetails.area || '');


        formik.setFieldValue('dimension', landDetails.dimension || []);
        formik.setFieldValue('boundry', landDetails.boundry || []);

        formik.setFieldValue('id', landDetails.id || item.id);
    };
    return (
        <>
            <div className="col-12 mt-4">
                <div className="  border-0 mb-4">
                    <div className="  border-0">
                        Bountry Entry
                        <hr />
                        <div style={{ overflowX: 'auto' }} className="table-responsive">
                            <table className="table table-bordered table-hover" style={{ overflow: 'scroll' }}>
                                <thead>
                                    <tr className='text-center'>
                                        <th className='landowner_enq_th'>S.No</th>
                                        <th className='landowner_enq_th'>{getData?.[0]?.patta_type === "Town_patta" ? "Town Survey No" : "Survey No"}  </th>
                                        <th className='landowner_enq_th_1'>Sub-Division</th>
                                        {getData?.[0]?.patta_type === "Town_patta" ? (
                                            <>
                                                <th className='landowner_enq_th'>Old Survey No</th>
                                                <th className='landowner_enq_th'>Old Sub Division </th>
                                            </>
                                        ) : null}


                                        <th className='landowner_enq_th'>Area</th>
                                        <th colSpan="5" className="text-center landowner_enq_th" >Dimension</th>
                                        <th colSpan="5" className="text-center landowner_enq_th">Boundary</th>
                                        {staffid.Login === "staff" && (status === "pending" || status === "complete") && pagetype !== "reminder" && (
                                            <th className='landowner_enq_th'> </th>
                                        )}


                                    </tr>
                                    <tr className='text-center'>
                                        {getData?.[0]?.patta_type === "Town_patta" ? (
                                            <th colSpan="6" className='landowner_enq_th'></th>
                                        ) : (
                                            <th colSpan="4" className='landowner_enq_th'></th>
                                        )}
                                        <th className='landowner_enq_th'>North</th>
                                        <th className='landowner_enq_th'>South</th>
                                        <th className='landowner_enq_th'>East</th>
                                        <th className='landowner_enq_th'>West</th>
                                        <th className='landowner_enq_th'>Others</th>
                                        <th className='landowner_enq_th'>North</th>
                                        <th className='landowner_enq_th'>South</th>
                                        <th className='landowner_enq_th'>East</th>
                                        <th className='landowner_enq_th'>West</th>
                                        <th className='landowner_enq_th'>Others</th>
                                        {/* <th className='landowner_enq_th'></th> */}

                                        {staffid.Login === "staff" && (status === "pending" || status === "complete") && pagetype !== "reminder" && (
                                            <th className='landowner_enq_th'>Action </th>
                                        )}

                                    </tr>
                                </thead>
                                <tbody>
                                    {getData?.map((item, index) => {
                                        let landDetails = {};
                                        landDetails = item.land_details ? JSON.parse(item.land_details) : {};
                                        return (
                                            <tr key={index} className='text-center'>
                                                <td>{index + 1} </td>
                                                <td>{item.survey_no} </td>
                                                <td>{item.sub_division} </td>

                                                {getData?.[0]?.patta_type === "Town_patta" ? (
                                                    <>
                                                        <td>{item.old_survey_no} </td>
                                                        <td>{item.old_sub_division} </td>
                                                    </>
                                                ) : null}
                                                <td>{landDetails.area} </td>

                                                {landDetails.dimension && Array.isArray(landDetails.dimension) ? (
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
                                                {landDetails.boundry && Array.isArray(landDetails.boundry) ? (
                                                    landDetails.boundry.map((boundaryItem, i) => (
                                                        <React.Fragment key={i}>
                                                            <td>{boundaryItem.north || "N/A"}</td>
                                                            <td>{boundaryItem.south || "N/A"}</td>
                                                            <td>{boundaryItem.east || "N/A"}</td>
                                                            <td>{boundaryItem.west || "N/A"}</td>
                                                            <td>{boundaryItem.others || "N/A"}</td>
                                                        </React.Fragment>
                                                    ))
                                                ) : (
                                                    <React.Fragment>
                                                        <td colSpan="5">No Boundary Data</td>
                                                    </React.Fragment>
                                                )}

                                                {staffid.Login === "staff" && (status === "pending" || status === "complete") && pagetype !== "reminder" && (
                                                    <td> <button
                                                        className="btn btn-outline-info me-1 edit"
                                                        data-tooltip-id="edit"
                                                        onClick={() => handleEdit(item)}
                                                    >
                                                        <EditIcon />
                                                    </button> </td>
                                                )}

                                            </tr>
                                        )
                                    }

                                    )}

                                </tbody>
                            </table>
                        </div>


                    </div>
                </div>
            </div>
            <Dialog visible={newDialog} style={{ width: '55rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Land Owner Details" modal className="p-fluid" onHide={hideDialog} >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className='row'>
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="surveyno" className="form-label"> Survey No
                                <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                id="surveyno"
                                type='text'
                                name="surveyno"
                                className="form-control"
                                value={formik.values.surveyno}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter Survey No"
                                disabled
                            />

                            {formik.errors.surveyno && formik.touched.surveyno ? (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.surveyno}</p>
                            ) : null}

                        </div>
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="subdivision" className="form-label">
                                Sub_Division <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                id="subdivision"
                                type='text'
                                name="subdivision"
                                className="form-control"
                                value={formik.values.subdivision}
                                onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                disabled
                            />

                        </div>
                    </div>

                    {getData?.[0]?.patta_type === "Town_patta" ? (
                        <div className='row'>
                            <div className="form-group mt-2 col-6">
                                <label htmlFor="old_survey_no" className="form-label"> Old Survey No
                                    <span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    id="old_survey_no"
                                    type='text'
                                    name="old_survey_no"
                                    className="form-control"
                                    value={formik.values.old_survey_no}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter Survey No"
                                    disabled
                                />

                                {formik.errors.old_survey_no && formik.touched.old_survey_no ? (
                                    <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.old_survey_no}</p>
                                ) : null}

                            </div>
                            <div className="form-group mt-2 col-6">
                                <label htmlFor="subdivision" className="form-label">
                                    Old Sub_Division <span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    id="old_sub_division"
                                    type='text'
                                    name="old_sub_division"
                                    className="form-control"
                                    value={formik.values.old_sub_division}
                                    onChange={formik.handleChange}
                                    // onBlur={formik.handleBlur}
                                    disabled
                                />

                            </div>
                        </div>
                    ) : null}

                    {/**.............. */}

                    <div className='row'>
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="remark" className="form-label"> area
                                <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                id="area"
                                type='text'
                                name="area"
                                className="form-control "
                                value={formik.values.area}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter area"
                            />

                            {formik.errors.area && formik.touched.area ? (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.area}</p>
                            ) : null}

                        </div>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-start'>
                        <h6>Dimension</h6>
                    </div>

                    <div className='row'>
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="north" className="form-label"> North
                                <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                id="north"
                                type="text"
                                name="dimension[0].north"
                                // name={`dimension.0.north`}
                                className="form-control"
                                value={formik.values.dimension[0]?.north || ""}
                                onChange={formik.handleChange}
                                // onBlur={() => formik.setFieldTouched(`dimension.0.north`, true)}
                                onBlur={formik.handleBlur}
                                placeholder="Enter dimension north"
                            />
                            {formik.touched.dimension?.[0]?.north && formik.errors.dimension?.[0]?.north && (
                                <p style={{ color: "red", fontSize: '12px' }}>
                                    {formik.errors.dimension[0].north}
                                </p>
                            )}

                        </div>
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="period" className="form-label"> South
                                <span style={{ color: 'red' }}>*</span>
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
                            {formik.touched.dimension?.[0]?.south && formik.errors.dimension?.[0]?.south && (
                                <p style={{ color: "red", fontSize: '12px' }}>
                                    {formik.errors.dimension[0].south}
                                </p>
                            )}

                        </div>
                    </div>
                    <div className='row'>
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="period" className="form-label"> East
                                <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                id="days"
                                type='text'
                                name="dimension[0].east"
                                className="form-control "
                                value={formik.values.dimension?.[0]?.east || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter dimension East"
                            />

                            {formik.errors.dimension?.[0]?.east && formik.touched.dimension?.[0]?.east ? (
                                <p style={{ color: "red", fontSize: '12px' }}>
                                    {formik.errors.dimension[0].east}
                                </p>
                            ) : null}

                        </div>
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="period" className="form-label"> West
                                <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                id="days"
                                type='text'
                                name="dimension[0].west"
                                className="form-control "
                                value={formik.values.dimension?.[0]?.west || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter dimenstion west"
                            />

                            {formik.errors.dimension?.[0]?.west && formik.touched.dimension?.[0]?.west ? (
                                <p style={{ color: "red", fontSize: '12px' }}>
                                    {formik.errors.dimension[0].west}
                                </p>
                            ) : null}

                        </div>
                    </div>
                    <div className='row'>
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="period" className="form-label"> Others
                                <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                id="days"
                                type='text'
                                name="dimension[0].others"
                                className="form-control "
                                value={formik.values.dimension?.[0]?.others || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter dimension Others"
                            />
                            {formik.errors.dimension?.[0]?.others && formik.touched.dimension?.[0]?.others ? (
                                <p style={{ color: "red", fontSize: '12px' }}>
                                    {formik.errors.dimension[0].others}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    {formik.errors.dimension?.[0] && formik.touched.dimension?.[0] && (
                        <div className='mt-3'>
                            {Object.entries(formik.errors.dimension[0]) &&
                                <p style={{ color: "red", fontSize: '12px' }}>
                                    All dimension fields are required
                                </p>
                            }
                        </div>

                    )}
                    <hr />
                    <div className='d-flex justify-content-start'>
                        <h6>Boundary</h6>
                    </div>
                    <div className='row'>
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="period" className="form-label"> North
                                <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                id="days"
                                type='text'
                                name="boundry[0].north"
                                className="form-control "
                                value={formik.values.boundry?.[0]?.north || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter boundary north"
                            />

                            {formik.errors.boundry?.[0]?.north && formik.touched.boundry?.[0]?.north ? (
                                <p style={{ color: "red", fontSize: '12px' }}>
                                    {formik.errors.boundry[0].north}
                                </p>
                            ) : null}

                        </div>
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="period" className="form-label"> South
                                <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                id="days"
                                type='text'
                                name="boundry[0].south"
                                className="form-control "
                                value={formik.values.boundry?.[0]?.south || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter boundary south"
                            />

                            {formik.errors.boundry?.[0]?.south && formik.touched.boundry?.[0]?.south ? (
                                <p style={{ color: "red", fontSize: '12px' }}>
                                    {formik.errors.boundry[0].south}
                                </p>
                            ) : null}

                        </div>
                    </div>
                    <div className='row'>
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="period" className="form-label"> East
                                <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                id="days"
                                type='text'
                                name="boundry[0].east"
                                className="form-control "
                                value={formik.values.boundry?.[0]?.east || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter boundary East"
                            />
                            {formik.errors.boundry?.[0]?.east && formik.touched.boundry?.[0]?.east ? (
                                <p style={{ color: "red", fontSize: '12px' }}>
                                    {formik.errors.boundry[0].east}
                                </p>
                            ) : null}

                        </div>
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="period" className="form-label"> West
                                <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                id="days"
                                type='text'
                                name="boundry[0].west"
                                className="form-control "
                                value={formik.values.boundry?.[0]?.west || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter boundary west"
                            />

                            {formik.errors.boundry?.[0]?.west && formik.touched.boundry?.[0]?.west ? (
                                <p style={{ color: "red", fontSize: '12px' }}>
                                    {formik.errors.boundry[0].west}
                                </p>
                            ) : null}

                        </div>
                    </div>
                    <div className='row'>
                        <div className="form-group mt-2 col-6">
                            <label htmlFor="period" className="form-label"> Others
                                <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                id="days"
                                type='text'
                                name="boundry[0].others"
                                className="form-control "
                                value={formik.values.boundry?.[0]?.others || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter boundary Others"
                            />
                            {formik.errors.boundry?.[0]?.others && formik.touched.boundry?.[0]?.others ? (
                                <p style={{ color: "red", fontSize: '12px' }}>
                                    {formik.errors.boundry[0].others}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    {formik.errors.boundry?.[0] && formik.touched.boundry?.[0] && (
                        <div className='mt-3'>
                            {formik.errors.boundry[0] &&
                                <p style={{ color: "red", fontSize: '12px' }}>
                                    All boundary fields are required
                                </p>
                            }
                        </div>

                    )}


                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <Button variant="contained" color="success" type='submit'>Save</Button>
                    </div>
                </form>
            </Dialog>
        </>
    )
}

export default AnotherBountryEntry

