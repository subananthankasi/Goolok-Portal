import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import customStyle from '../../../Utils/tableStyle';
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { SearchData } from '../../../Utils/Search';
import { offerDeleteThunk, offerGetThunk, offerPostThunk, offerUpdateThunk } from '../../../Redux/Actions/MasterPage/OfferThunk/OfferThunk';

const Offer = () => {
    const dispatch = useDispatch()
    const toast = useRef(null);
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [editDialog, setEditDialog] = useState(false)
    const [editing, setEditing] = useState(false)
    const [filterText, setFilterText] = useState("");

    const searchColumns = ["sno", "discount", "status"];

    useEffect(() => {
        dispatch(offerGetThunk())
    }, [])


    const Getdata = useSelector((state) => state.offerData.get.data)



    const filterdata = SearchData(Getdata, filterText, searchColumns);


    const onSubmit = async (values) => {
        if (editing) {

            const payload = { ...values, id: values.id }
            try {
                const response = await dispatch(offerUpdateThunk(payload))
                if (offerUpdateThunk.fulfilled.match(response)) {
                    const message = response.payload.data;
                    setEditDialog(false);
                    formik.resetForm();
                    dispatch(offerGetThunk());
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successfully Updated', life: 3000 });
                } else if (offerUpdateThunk.rejected.match(response)) {
                    const errorPayload = response.payload.reason
                    toast.current.show({ severity: 'error', summary: 'Success', detail: 'rejected', life: 3000 });
                }
            }
            catch (error) {
                toast.current.show({ severity: 'error', summary: 'Success', detail: ' Rejected', life: 3000 });
            }
        }
        else {
            dispatch(offerPostThunk(values)).then(() => {
                dispatch(offerGetThunk())
            })
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successfully Added', life: 3000 });
            formik.resetForm()
        }

    }
    const formik = useFormik({
        initialValues: {
            discount: '',
            status: 'enable',

        },
        validationSchema: yup.object().shape({
            discount: yup.string().required(" offer & discount is required !!"),
        }),
        onSubmit
    })
    const handleEdit = (row) => {
        setEditDialog(true)
        formik.setFieldValue('discount', row.discount)
        formik.setFieldValue('status', row.status)
        formik.setFieldValue('id', row.id)

    }

    const handleDelete = (row) => {
        setDeleteDialog(true)
        setDeleteId(row.id)
    }
    const deletePricing = () => {
        dispatch(offerDeleteThunk(deleteId)).then(() => {
            dispatch(offerGetThunk())
        })
        setDeleteDialog(false)
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successfully Deleted', life: 3000 });

    }

    const editCancel = () => {
        setEditDialog(false)
    }
    const editHide = () => {
        setEditDialog(false)
        formik.resetForm()
    }
    const columns = [
        {
            name: "S.no",
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Discount Name",
            selector: (row) => row.discount,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="d-flex">
                    <button
                        className="btn  btn-outline-info me-1 edit"
                        data-tooltip-id="edit"
                        onClick={() => {
                            handleEdit(row);
                        }}
                    >
                        <EditIcon />
                    </button>
                    <button
                        className="btn btn-outline-danger delete"
                        data-tooltip-id="delete"
                        onClick={() => handleDelete(row)}
                    >
                        <DeleteIcon />
                    </button>
                </div>
            ),
        },
    ];
    const deleteUnitsDialogFooter = (
        <div className=" d-flex gap-3 justify-content-end">
            <Button label="No" icon="pi pi-times" outlined style={{ borderRadius: '7px' }} onClick={() => setDeleteDialog(false)} />
            <Button label="Yes" icon="pi pi-check" severity="danger" style={{ borderRadius: '7px' }} onClick={deletePricing} />
        </div>
    );
    const hideDeleteProductsDialog = () => {
        setDeleteDialog(false)
    }
    const handleFilter = (event) => {
        setFilterText(event.target.value);
    };
    return (
        <>
            <Toast ref={toast} />
            <section className="section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-4 col-sm-6">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="page_heading">Add Offer & Discount </h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-12 mb-3 ">
                                                <label htmlFor="discount" className="form-label">
                                                    Offer & Discount Name
                                                </label>
                                                <input
                                                    name="discount"
                                                    className="form-control"
                                                    placeholder='Enter discount Name'
                                                    value={formik.values.discount}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.errors.discount && formik.touched.discount ? (
                                                    <p style={{ color: "red", fontSize: '14px' }}>{formik.errors.discount}</p>
                                                ) : null}
                                            </div>

                                        </div>

                                        <div className="mb-3 col-md-12">
                                            <label className="form-label" htmlFor="inputState">
                                                Status
                                            </label>
                                            <select
                                                name="status"
                                                className="form-select"
                                                value={formik.values.status}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option value="enable"  >Enable</option>
                                                <option value="disable">Disable</option>
                                            </select>
                                        </div>

                                        <div className="text-end py-3 px-3">
                                            <a
                                                href="javascript:void(0);"
                                                className="btn1 text-dark me-1"
                                                onClick={() => {
                                                    formik.resetForm()
                                                }}
                                            >
                                                Clear
                                            </a>
                                            <button type="submit" className="btn1" onClick={() => setEditing(false)}>
                                                Add
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-sm-6">
                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex">
                                        <h4 className="page_heading">Report</h4>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="col-lg-12  mb-4">
                                        <div className="searchbar">
                                            <input
                                                type="text"
                                                className="search"
                                                onChange={handleFilter}
                                                placeholder="..Search"
                                            ></input>
                                        </div>
                                        <DataTable
                                            columns={columns}
                                            data={filterdata}
                                            customStyles={customStyle}
                                            pagination
                                            // selectableRows
                                            persistTableHead={true}
                                            fixedHeader
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*Delete modal */}
            <Dialog visible={deleteDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteUnitsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <span style={{ marginLeft: '10px' }}>Are you sure you want to delete the selected row?</span>
                </div>
            </Dialog>
            {/*Edit modal */}
            <Dialog visible={editDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Edit Offers" modal className="p-fluid" onHide={editHide} >
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-md-12 mb-3 ">
                            <label htmlFor="discount" className="form-label">
                                Offer & Discount Name
                            </label>
                            <input
                                name="discount"
                                className="form-control"
                                placeholder='Enter discount Name'
                                value={formik.values.discount}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.discount && formik.touched.discount ? (
                                <p style={{ color: "red", fontSize: '14px' }}>{formik.errors.discount}</p>
                            ) : null}
                        </div>

                    </div>

                    <div className="mb-3 col-md-12">
                        <label className="form-label" htmlFor="inputState">
                            Status
                        </label>
                        <select
                            name="status"
                            className="form-select"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="enable"  >Enable</option>
                            <option value="disable">Disable</option>
                        </select>
                    </div>

                    <div className="text-end py-3 px-3">
                        <a
                            href="javascript:void(0);"
                            className="btn1 text-dark me-1"
                            onClick={() => {
                                formik.resetForm()
                            }}
                        >
                            Clear
                        </a>
                        <button type="submit" className="btn1" onClick={() => setEditing(true)}>
                            Update
                        </button>
                    </div>
                </form>
            </Dialog>
        </>
    )
}

export default Offer