import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "react-data-table-component";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { eFeatureGetThunk } from "../../../../Redux/Actions/MasterPage/FeaturesThunk/ExteriorFeatureThunk";
import {
    eEnqFeatureDeleteThunk,
    eEnqFeatureGetThunk,
    eEnqFeaturePostThunk,
    eEnqFeatureUpdateThunk,
} from "../../../../Redux/Actions/Enquiry/ContentWritingThunk/CWDescriptionFeatureThunk";
import Toast from "../../../../Utils/Toast";
import customStyle from "../../../../Utils/tableStyle";

const ExteriorFeatureContentCom = ({ eid, id, status }) => {
    const [newDialog, setNewDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [editing, setEditing] = useState(false);
    const staffid = JSON.parse(localStorage.getItem("token"));
    const [deleteId, setDeleteId] = useState("");
    const dispatch = useDispatch();
    const enquiryDoumentData = useSelector(
        (state) => state.Enquiry.enquiryDocument
    );

    useEffect(() => {
        dispatch(eFeatureGetThunk());
        dispatch(eEnqFeatureGetThunk(eid));
    }, []);

    const onSubmit = (values) => {
        if (editing) {
            dispatch(eEnqFeatureUpdateThunk(values)).then(() => {
                dispatch(eEnqFeatureGetThunk(eid));
            });
            Toast({ message: "Successfully Updated", type: "success" });
            formik.resetForm();
            setEditDialog(false);
        } else {
            dispatch(eEnqFeaturePostThunk(values)).then(() => {
                dispatch(eEnqFeatureGetThunk(eid));
            });
            Toast({ message: "Successfully Added", type: "success" });
            formik.resetForm();
            setNewDialog(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            exterior: "",
            details: "",
            enqid: eid,
            id: null,
        },
        validationSchema: yup.object().shape({
            exterior: yup.string().required("exterior feature is  required!!"),
            details: yup.string().required("details is  required!!"),
        }),
        onSubmit,
    });

    const hideDialog = () => {
        setNewDialog(false);
        formik.resetForm();
    };
    const hideEditDialog = () => {
        setEditDialog(false);
        formik.resetForm();
    };

    const handleEdit = (row) => {
        setEditDialog(true);
        formik.setFieldValue("exterior", row.exterior_id);
        formik.setFieldValue("details", row.exterior_details);
        formik.setFieldValue("id", row.id);
    };
    const openDelete = (row) => {
        setDeleteDialog(true);
        setDeleteId(row.id);
    };
    const handleDelete = () => {
        dispatch(eEnqFeatureDeleteThunk(deleteId)).then(() => {
            dispatch(eEnqFeatureGetThunk(eid));
        });
        Toast({ message: "Successfully Deleted", type: "success" });
        setDeleteDialog(false);
    };

    const eData = useSelector((state) => state.exteriorFeatureData?.get?.data);
    const eEnqData = useSelector((state) => state.eEnqData?.get?.data);

    const column1 = [
        {
            name: "S.no",
            cell: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Exterior Features",
            selector: (row) => row.exterior,
            sortable: true,
        },
        {
            name: "Details",
            selector: (row) => row.exterior_details,
            sortable: true,
        },

        ...((status === "pending" || status === "complete") &&
            staffid.Login == "staff" &&
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
                                    onClick={() => openDelete(row)}
                                >
                                    <DeleteIcon />
                                </button>
                            </div>
                        </>
                    ),
                },
            ]
            : []),
    ];
    const deleteUnitsDialogFooter = (
        <div className=" d-flex gap-3 justify-content-end">
            <button onClick={handleDelete} className="btn1">
                Yes
            </button>
        </div>
    );
    const hideDeleteProductsDialog = () => {
        setDeleteDialog(false);
    };
    return (
        <>
            <div className="container-fluid p-0 mt-3">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header  p-3 d-flex justify-content-between">
                                <h6>Exterior Features</h6>
                                {(status == "pending" || status === "complete") &&
                                    staffid.Login == "staff" && enquiryDoumentData?.status !== "booking" && (
                                        <button
                                            onClick={() => setNewDialog(true)}
                                            className="btn1 me-2"
                                        >
                                            + Add
                                        </button>
                                    )}
                            </div>
                            <div className="card-body p-3">
                                <DataTable
                                    persistTableHead={true}
                                    columns={column1}
                                    data={eEnqData}
                                    customStyles={customStyle}
                                    pagination
                                    // selectableRows
                                    fixedHeader
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*new modal */}

            <Dialog
                visible={newDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Add Exterior Features"
                modal
                className="p-fluid"
                onHide={hideDialog}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div>
                        <div className="form-group">
                            <label htmlFor="exterior" className="form-label">
                                Exterior Features :
                            </label>
                            <select
                                id="exterior"
                                name="exterior"
                                className="form-select mt-2"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.exterior}
                            >
                                <option value={""}> Select Features</option>
                                {eData?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {" "}
                                        {item.feature_exname}{" "}
                                    </option>
                                ))}
                            </select>
                            {formik.errors.exterior && formik.touched.exterior && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.exterior}
                                </p>
                            )}
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="details" className="form-label">
                                {" "}
                                Features Details:
                            </label>
                            <input
                                id="details"
                                name="details"
                                placeholder="Enter Details..."
                                className="form-control mt-1"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.details}
                            />

                            {formik.errors.details && formik.touched.details && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.details}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <button
                            type="submit"
                            className="btn1"
                            onClick={() => setEditing(false)}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </Dialog>
            {/*Delete modal */}

            <Dialog
                visible={deleteDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                footer={deleteUnitsDialogFooter}
                onHide={hideDeleteProductsDialog}
            >
                <div className="confirmation-content">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <span style={{ marginLeft: "10px" }}>
                        Are you sure you want to delete the selected exterior Feature ?
                    </span>
                </div>
            </Dialog>

            {/*Edit modal */}

            <Dialog
                visible={editDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Edit Exterior Features"
                modal
                className="p-fluid"
                onHide={hideEditDialog}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div>
                        <div className="form-group">
                            <label htmlFor="exterior" className="form-label">
                                Exterior Features :
                            </label>
                            <select
                                id="exterior"
                                name="exterior"
                                className="form-select mt-2"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.exterior}
                            >
                                <option value={""}> Select Features</option>
                                {eData?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {" "}
                                        {item.feature_exname}{" "}
                                    </option>
                                ))}
                            </select>
                            {formik.errors.exterior && formik.touched.exterior && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.exterior}
                                </p>
                            )}
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="details" className="form-label">
                                {" "}
                                Features Details:
                            </label>
                            <input
                                id="details"
                                name="details"
                                placeholder="Enter Details..."
                                className="form-control mt-1"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.details}
                            />

                            {formik.errors.details && formik.touched.details && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.details}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <button
                            type="submit"
                            className="btn1"
                            onClick={() => setEditing(true)}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </Dialog>
        </>
    );
};

export default ExteriorFeatureContentCom;
