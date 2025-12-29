import React, { useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { TableFooter } from "@mui/material";
import Spinner from "react-bootstrap/Spinner";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import API_BASE_URL from '../../../../Api/api';
import Toast from '../../../../Utils/Toast';

const PattaSurveyLayout = ({ data }) => {
    const staffid = JSON.parse(sessionStorage.getItem("token"));
    const [isLoading, setIsLoading] = useState(false)
    const [surveyData, setSurveyData] = useState([])
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [type, setType] = useState("")


    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));


    const fetchType = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/enquirypatta/${data.id}`
            );
            setType(response.data);
        } catch (error) {
            console.error(error)
        }
    };
    const fetchSurvey = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/enquirypatta/${data.id}/edit`
            );
            setSurveyData(response.data);
        } catch (error) {
            console.error(error)
        }
    };
    useEffect(() => {
        fetchSurvey()
        fetchType()
    }, [data])

    const onSubmit = async (values) => {

        const payload = {
            ...values,
            enqid: data.eid,
            id: data.id,
        }
        setIsLoading(true)
        try {
            await axios.post(`${API_BASE_URL}/pattasurveyadd`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            Toast({ message: "Successfully Submited", type: "success" });
            setIsLoading(false);
            formik.resetForm()
            fetchSurvey()
        } catch (error) {
            alert(error);
        } finally {
            fetchSurvey()
            setIsLoading(false)
        }
    };
    const formik = useFormik({
        initialValues: {
            surveyno: "",
            sub_division: "",
            oldSurvey: "",
            oldDivision: "",
            hectare: "",
        },
        validationSchema: yup.object().shape({
            surveyno: yup
                .number()
                .typeError("Survey number must be a number")
                .required("surveyno is required !!"),
            sub_division: yup.string().required("sub_division is required !!"),
            hectare: yup
                .number()
                .typeError("Hectare must be a number")
                .required("hectare is required !!"),
        }),
        onSubmit,
    });

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/enquirypatta/${deleteId}`);
            Toast({ message: "Successfully Deleted", type: "success" });
            fetchSurvey();
            setDeleteDialog(false)
        } catch (error) {
            Toast({ message: "Failed to error", type: "error" });
        }
    }

    return (

        <>
            <div className="row mt-3">
                <div className="">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table" >
                            <TableHead style={{ backgroundColor: 'rgb(47, 79, 79)' }}>
                                <TableRow>
                                    <TableCell style={{ color: "white" }} >S.No</TableCell >
                                    <TableCell align="right" style={{ color: "white" }}>Survey No</TableCell >
                                    <TableCell align="right" style={{ color: "white" }}>Sub Division</TableCell >
                                    {type.patta_type === "Town_patta" && (
                                        <>
                                            <TableCell align="right" style={{ color: "white" }}> Old Survey No</TableCell >
                                            <TableCell align="right" style={{ color: "white" }}> Old Sub Division</TableCell ></>

                                    )}
                                    <TableCell align="right" style={{ color: "white" }}>Hectare-Are</TableCell >
                                    {staffid.Login === "staff" && (data.status === "pending" || data.status === "verify") && (
                                        <TableCell align="right" style={{ color: "white" }}>Action</TableCell >

                                    )}

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {surveyData.map((item, index) => (
                                    <StyledTableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell >
                                        <TableCell align="right">{item.survey_no}</TableCell >
                                        <TableCell align="right">{item.sub_division}</TableCell >
                                        {type.patta_type === "Town_patta" && (
                                            <>
                                                <TableCell align="right" > {item.old_survey_no} </TableCell >
                                                <TableCell align="right" >{item.old_sub_division} </TableCell ></>

                                        )}
                                        <TableCell align="right">{item.hectare}</TableCell >
                                        {staffid.Login === "staff" && (data.status === "pending" || data.status === "verify") && (
                                            <TableCell align="right"><button
                                                className="btn btn-outline-danger delete"
                                                data-tooltip-id="delete"
                                                onClick={() => {
                                                    setDeleteDialog(true);
                                                    setDeleteId(item.id);
                                                }}
                                            >
                                                <DeleteIcon />
                                            </button>
                                            </TableCell >
                                        )}
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                            <TableFooter>

                                {type.patta_type === "Town_patta" ? (
                                    <TableCell align="right" colSpan={'5'} style={{ fontSize: '14px' }}> </TableCell >
                                ) : (
                                    <TableCell align="right" colSpan={'3'} style={{ fontSize: '14px' }}> </TableCell >
                                )}
                                <TableCell colSpan={'2'} className="text-center" style={{ fontSize: '14px' }}>
                                    Sub Total :  {surveyData?.reduce((total, item) => total + Number(item.hectare || 0), 0)}
                                </TableCell >
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="row mt-4">

                    <div className="col-md-6 mb-3 ">
                        <div className="row">
                            <div className="col-4 mb-3 ">
                                <label
                                    htmlFor="lastName"
                                    className="form-label"
                                >
                                    Survey no
                                </label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="surveyno"
                                    autoComplete="off"
                                    value={formik.values.surveyno}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.surveyno && formik.touched.surveyno ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.surveyno}
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
                                    sub division
                                </label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <input
                                    type="text"
                                    className="form-control"
                                    autoComplete="off"
                                    name="sub_division"
                                    value={formik.values.sub_division}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.sub_division && formik.touched.sub_division ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.sub_division}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    {type.patta_type === "Town_patta" && (
                        <>

                            <div className="col-md-6 mb-3 ">
                                <div className="row">
                                    <div className="col-4 mb-3 ">
                                        <label
                                            htmlFor="lastName"
                                            className="form-label"
                                        >
                                            Old Survey No
                                        </label>
                                    </div>
                                    <div className="col-8 mb-3 ">
                                        <input
                                            type="text"
                                            className="form-control"
                                            autoComplete="off"
                                            name="oldSurvey"
                                            value={formik.values.oldSurvey}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.oldSurvey && formik.touched.oldSurvey ? (
                                            <p style={{ color: "red", fontSize: "12px" }}>
                                                {formik.errors.oldSurvey}
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
                                            Old Sub Division
                                        </label>
                                    </div>
                                    <div className="col-8 mb-3 ">
                                        <input
                                            type="text"
                                            className="form-control"
                                            autoComplete="off"
                                            name="oldDivision"
                                            value={formik.values.oldDivision}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.oldDivision && formik.touched.oldDivision ? (
                                            <p style={{ color: "red", fontSize: "12px" }}>
                                                {formik.errors.oldDivision}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="col-md-6 mb-3 ">
                        <div className="row">
                            <div className="col-4 mb-3 ">
                                <label
                                    htmlFor="lastName"
                                    className="form-label"
                                >
                                    Hectare-Are
                                </label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <input
                                    type="text"
                                    className="form-control"
                                    autoComplete="off"
                                    name="hectare"
                                    value={formik.values.hectare}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                // onChange={(e) => {
                                //     const onlyAllowedChars = e.target.value.replace(/[^0-9./,]/g, "");
                                //     handlePattaTwoChange({ target: { name: "hectare", value: onlyAllowedChars } });
                                // }}

                                />
                                {formik.errors.hectare && formik.touched.hectare ? (
                                    <h6 style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.hectare}
                                    </h6>
                                ) : null}
                            </div>
                        </div>
                    </div>


                    <div className="col-md-6 mb-3 ">
                        <div className="">
                            {staffid.Login === "staff" && (data.status === "pending" || data.status === "verify") && (
                                <div className='d-flex justify-content-end gap-2'>
                                    <button
                                        className="btn1"
                                        type='button'
                                        onClick={() => formik.resetForm()}
                                    >
                                        Clear
                                    </button>
                                    <button
                                        className="btn1"
                                        type='submit'
                                        // onClick={handlePattaTwoSubmit}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Spinner animation="border" size="sm" />
                                                <span className="ms-2">
                                                    Please wait...
                                                </span>
                                            </>
                                        ) : (
                                            "Add"
                                        )}

                                    </button>
                                </div>
                            )}
                        </div>
                    </div>



                </div>
            </form>

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

export default PattaSurveyLayout