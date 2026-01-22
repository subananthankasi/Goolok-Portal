import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import axios from "axios";
import API_BASE_URL from "../../../../../Api/api";
import Toast from "../../../../../Utils/Toast";
import customStyle from "../../../../../Utils/tableStyle";


const SurveyNoSurvey = ({ eid, id, status, rowId, pagetype }) => {

    const staffid = JSON.parse(localStorage.getItem("token"));
    const [editing, setEditing] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [deleteId, setdeleteId] = useState(null)
    const [getData, setGetData] = useState([])
    const [loading, setLoading] = useState(true)

    const column1 = [
        {
            name: "S.no",
            cell: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Survey No",
            selector: (row) => row.survey_no,
            sortable: true,
        },

        ...(staffid.logintype == "staff" && (status === "complete" || status === "pending")) && pagetype !== "reminder" ? [
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
            }
        ] : [],
    ];

    const handleDeleteOpen = (row) => {
        setDeleteDialog(true)
        setdeleteId(row.id)
    }

    const handleDelete = async (row) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/surveydelete/${deleteId}`)
            Toast({ message: "Successfully deleted", type: "success" })
            fetch()
            setDeleteDialog(false)
        } catch (error) {
            console.error(error)
        }
    }

    const handleEdit = (row) => {
        setEditing(true)
        formik.setFieldValue("surveyNo", row.survey_no)
        formik.setFieldValue("id", row.id)
    }

    const onSubmit = async (values) => {
        const payload = {
            ...values,
            enqid: eid,
            docid: id,
            rowId: rowId
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/surveycreate`, payload)
            fetch()

            if (payload.id) {
                Toast({ message: "Successfully Updated", type: "success" })
                setEditing(false)
            } else {
                Toast({ message: "Successfully Created", type: "success" })
            }
            formik.resetForm()
        } catch (error) {
            Toast({ message: "Failed to save", type: "error" })
        }
    }

    const fetch = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/surveylist/${rowId}`)
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
            surveyNo: "",
        },
        validationSchema: yup.object().shape({
            surveyNo: yup.string().required("surveyno is required !!"),
        }),
        onSubmit,
    });
    return (
        <>
            <div className="mt-3">
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    {staffid.logintype == "staff" && (status === "complete" || status === "pending") && pagetype !== "reminder" && (

                        <div className="form-group">
                            <label className="form-label mt-1"> Survey No: <span style={{ color: "red" }}>*</span>  </label>
                            <div className="d-flex gap-3 w-50">
                                <div className="w-50">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="surveyNo"
                                        id="surveyNo"
                                        placeholder="Enter Survey no..."
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.surveyNo}
                                    />
                                    {formik.errors.surveyNo && formik.touched.surveyNo ? (
                                        <p style={{ color: "red", fontSize: "12px" }}>
                                            {formik.errors.surveyNo}
                                        </p>
                                    ) : null}
                                </div>
                                <div>

                                    <Button variant="contained" type="submit" > Add</Button>



                                </div>

                            </div>
                        </div>
                    )}

                </form>
            </div>
            <div className="mt-5">

                <DataTable
                    persistTableHead={true}
                    columns={column1}
                    data={getData}
                    customStyles={customStyle}
                    pagination
                    // selectableRows
                    fixedHeader
                />
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

export default SurveyNoSurvey