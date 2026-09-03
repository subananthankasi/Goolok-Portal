import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import API_BASE_URL from "../../../Api/api";
import Toast from "../../../Utils/Toast";
import customStyle from "../../../Utils/tableStyle";

const PricePerUnitComponent = ({ eid, id, status, pagetype }) => {
    const staffid = JSON.parse(localStorage.getItem("token"));
    const enquiryDoumentData = useSelector(
        (state) => state.Enquiry.enquiryDocument,
    );
    const [editing, setEditing] = useState(false);
    const [newDialog, setNewDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteId, setdeleteId] = useState(null);
    const [getData, setGetData] = useState([]);

    const column1 = [
        {
            name: "S.no",
            cell: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Price Per Unit",
            selector: (row) => row.price_per_unit,
            sortable: true,
        },

        ...(staffid.logintype == "staff" &&
            (status === "complete" || status === "pending") &&
            pagetype !== "reminder" &&
            enquiryDoumentData?.status !== "booking"
            ? [
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
                },
            ]
            : []),
    ];
    const handleDeleteOpen = (row) => {
        setDeleteDialog(true);
        setdeleteId(row.id);
    };
    const handleDelete = async (row) => {
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/pricingperunit/${deleteId}`,
            );
            Toast({ message: "Successfully deleted", type: "success" });
            fetch();
            setDeleteDialog(false);
        } catch (error) { }
    };
    const handleEdit = (row) => {
        setNewDialog(true);
        setEditing(true);
        formik.setFieldValue("price_per_unit", row.price_per_unit);
        formik.setFieldValue("id", row.id);
    };
    const onSubmit = async (values) => {
        const payload = {
            ...values,
            enqid: eid,
        };
        try {
            const response = await axios.post(
                `${API_BASE_URL}/pricingperunit`,
                payload,
            );
            fetch();
            if (editing) {
                Toast({ message: "Successfully Updated", type: "success" });
                setNewDialog(false);
            } else {
                Toast({ message: "Successfully Submited", type: "success" });
                setNewDialog(false);
            }
            formik.resetForm();
            setEditing(false);
        } catch (error) {
            Toast({ message: "Failed to save", type: "error" });
        }
    };
    const fetch = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/pricingperunit/${eid}`);
            setGetData(response.data);
        } catch (error) { }
    };
    useEffect(() => {
        fetch();
    }, []);


    console.log("geteeee", getData.length)

    const formik = useFormik({
        initialValues: {
            price_per_unit: "",
        },
        validationSchema: yup.object().shape({
            price_per_unit: yup.string().required("price per unit is required!!"),
        }),
        onSubmit,
    });

    return (
        <>
            <div className="col-12 mt-4">
                <div className="card shadow border-0">
                    <div className="card shadow border-0 p-4">
                        <div className="d-flex justify-content-between">
                            <h6>Price Per Unit Report</h6>
                            {staffid.logintype === "staff" &&
                                (status === "complete" || status === "pending") &&
                                pagetype !== "reminder" &&
                                enquiryDoumentData?.status !== "booking" && getData?.length === 0 && (
                                    <div className="d-flex justify-content-end">
                                        <div className="ms-2">
                                            <button
                                                onClick={() => setNewDialog(true)}
                                                className="btn1 me-2"
                                            >
                                                + Add
                                            </button>
                                        </div>
                                    </div>
                                )}
                        </div>

                        <hr />
                        <div className="mt-2">
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
                    </div>
                </div>
            </div>

            <Dialog
                visible={newDialog}
                style={{ width: "25rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Add Price Per Unit"
                modal
                className="p-fluid"
                onHide={() => {
                    setNewDialog(false);
                    formik.resetForm();
                }}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className="form-group">
                        <label className="form-label">
                            {" "}
                            Price Per Unit: <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="price_per_unit"
                            id="price_per_unit"
                            placeholder="Enter price per unit..."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.price_per_unit}
                        />
                        {formik.errors.price_per_unit && formik.touched.price_per_unit ? (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.price_per_unit}
                            </p>
                        ) : null}
                    </div>

                    <div className="d-flex justify-content-end mt-4">

                        <button
                            className="btn1"
                            type="submit"
                            onClick={() => setEditing(false)}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </Dialog>


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
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setDeleteDialog(false)}
                    >
                        No
                    </Button>
                    <Button variant="contained" onClick={handleDelete}>
                        Yes
                    </Button>
                </div>
            </Dialog>
        </>
    );
};

export default PricePerUnitComponent;
