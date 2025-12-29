import React, { useEffect, useState } from 'react'
import API_BASE_URL from '../../../../../Api/api';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUnit } from '../../../../../Redux/Actions/MasterPage/UnitAction';
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as yup from "yup";
import Toast from '../../../../../Utils/Toast';
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";


const TitleSurveyDetails = ({ data }) => {

    const staffid = JSON.parse(sessionStorage.getItem("token"));
    const [surveyData, setSurveyData] = useState([]);
    const dispatch = useDispatch()
    const unitData = useSelector(state => state.Unit.Unit);
    const [isLoading, setIsLoading] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [deleteId, setDeleteId] = useState(null)




    const fetchSurvey = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/enquirydeed/${data.id}/edit`
            );
            const dataValue = response?.data?.map((map, index) => ({
                ...map,
                sno: index + 1
            }))
            setSurveyData(dataValue);
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        dispatch(fetchUnit());

    }, [data])
    useEffect(() => {
        fetchSurvey();
    }, [data])


    const extentTotal = () => {
        let total = 0;

        for (let count of surveyData) {
            total += Number(count.extent);
        }

        return `${total} / ${surveyData?.[0]?.units || ""}`;
    };
    const footerGroup = (
        <ColumnGroup>
            <Row>
                <Column footer="Total Extent:" colSpan={3} footerStyle={{ textAlign: 'right' }} className="p-3" />
                <Column footer={extentTotal} />
                <Column colSpan={2} />
            </Row>
        </ColumnGroup>
    );

    const onSubmit = async (values) => {

        const payload = {
            ...values,
            eid: data.eid,
            docid: data.id,
        }
        setIsLoading(true)
        try {
            await axios.put(`${API_BASE_URL}/enquirydeed/${data.id}`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            fetchSurvey()
            Toast({ message: "Successfully Submited", type: "success" });
            setIsLoading(false);
            formik.resetForm()
        } catch (error) {
            alert(error);
            setIsLoading(false)
        } finally {
            fetchSurvey()

        }
    };
    const formik = useFormik({
        initialValues: {
            surveyno: "",
            units: "",
            division: "",
            extent: "",
        },
        validationSchema: yup.object().shape({
            surveyno: yup
                .number()
                .typeError("Survey number must be a number")
                .required("surveyno is required !!"),
            division: yup.string().required("sub_division is required !!"),
            units: yup.string().required("units is required !!"),
            extent: yup
                .number()
                .typeError("Hectare must be a number")
                .required("hectare is required !!"),
        }),
        onSubmit,
    });


    const handleDelete = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/enquirydeed/${deleteId}`);
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
                {/* <DataTable
                                    persistTableHead={true}
                                    columns={columns1}
                                    data={deedData}
                                    customStyles={customStyle}
                                    pagination
                                    fixedHeader
                                  /> */}
                <DataTable value={surveyData} stripedRows footerColumnGroup={footerGroup} tableStyle={{ minWidth: '50rem' }}>
                    <Column
                        header="S.No"
                        body={(rowData, options) => options.rowIndex + 1}
                    />
                    <Column field="survey_no" header="Survey No" className="p-2"></Column>
                    <Column field="sub_division" header="Sub Division"></Column>
                    <Column field="extent" header="Extent"></Column>
                    <Column field="units" header="Units"></Column>
                    {staffid.Login === "staff" && (data.status === "pending" || data.status === "verify") && (
                        <Column
                            header="Action"
                            body={(rowData) => (
                                <button
                                    className="btn btn-outline-danger delete"
                                    data-tooltip-id="delete"
                                    onClick={() => {
                                        setDeleteDialog(true);
                                        setDeleteId(rowData.id);
                                    }}>
                                    <DeleteIcon />
                                </button>
                            )}
                        />
                    )}
                </DataTable>

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
                                    placeholder='Enter Survey Number..'
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
                                    name="division"
                                    placeholder='Enter Subdivision'
                                    value={formik.values.division}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.division && formik.touched.division ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.division}
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
                                    Extent
                                </label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <input
                                    type="text"
                                    className="form-control"
                                    autoComplete="off"
                                    name="extent"
                                    placeholder='Enter extent...'
                                    value={formik.values.extent}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.extent && formik.touched.extent ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.extent}
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
                                    Units
                                </label>
                            </div>
                            <div className="col-8 mb-3 ">
                                <select
                                    type="text"
                                    className="form-select"
                                    autoComplete="off"
                                    name="units"
                                    value={formik.values.units}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Select Units </option>
                                    {unitData?.map((item) => (
                                        <option key={item.id} value={item.unit}> {item.unit} </option>
                                    ))}
                                </select>
                                {formik.errors.units && formik.touched.units ? (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.units}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    </div>


                    <div className="row mb-3 ">
                        <div className="text-end">
                            {staffid.Login === "staff" && (data.status === "pending" || data.status === "verify") && (
                                <>
                                    <button
                                        className="btn1"
                                        type='submit'
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Adding..." : "Add"}
                                    </button>
                                </>
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

export default TitleSurveyDetails