import React, { useState, useEffect, } from 'react'
import customStyle from '../../../../Utils/tableStyle';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "react-data-table-component";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useFormik } from "formik";
import * as yup from "yup";
import { nearByDeleteThunk, nearByGetThunk, nearByPostThunk, nearByUpdateThunk } from '../../../../Redux/Actions/Enquiry/ContentWritingThunk/NearByDevelopmentThunk';
import { useDispatch, useSelector } from 'react-redux';

const NearbyDevelopments = ({ eid, id, status }) => {
    const [newDialog, setNewDialog] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [editDialog, setEditDialog] = useState(false)
    const [editing, setEditing] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const dispatch = useDispatch()
    const staffid = JSON.parse(sessionStorage.getItem('token'));

    const onSubmit = (values) => {
        if (editing) {
            dispatch(nearByUpdateThunk(values)).then(() => {
                dispatch(nearByGetThunk(eid))
            })
            setEditDialog(false)
            formik.resetForm()
        }
        else {
            dispatch(nearByPostThunk(values)).then(() => {
                dispatch(nearByGetThunk(eid))
            })
            setNewDialog(false)
            formik.resetForm()
        }
    }
    useEffect(() => {
        dispatch(nearByGetThunk(eid))
    }, [])

    const formik = useFormik({
        initialValues: {
            nearbyDivision: '',
            nearbyTitle: '',
            nearbyNotes: '',
            enqid: eid,
            id: null

        },
        validationSchema: yup.object().shape({
            nearbyDivision: yup.string().required(" required!!"),
            nearbyTitle: yup.string().required(" required!!"),
            nearbyNotes: yup.string().required(" required!!"),
        }),
        onSubmit
    })

    const hideDialog = () => {
        setNewDialog(false)
        formik.resetForm()
    }
    const hideEditDialog = () => {
        setEditDialog(false)
        formik.resetForm()
    }
    const openDelete = (row) => {
        setDeleteDialog(true)
        setDeleteId(row.id)


    }
    const handleDelete = async () => {

        try {
            const response = await dispatch(nearByDeleteThunk(deleteId));

            if (nearByDeleteThunk.fulfilled.match(response)) {
                const message = response.payload.data;
                setDeleteDialog(false)
                formik.resetForm()
                await dispatch(nearByGetThunk(eid))


            } else if (nearByDeleteThunk.rejected.match(response)) {


            }
        } catch (error) {
            console.error(error)
        }

    }
    const deleteUnitsDialogFooter = (
        <div className=" d-flex gap-3 justify-content-end">
            <Button label="No" icon="pi pi-times" outlined style={{ borderRadius: '7px' }} onClick={() => setDeleteDialog(false)} />
            <Button label="Yes" icon="pi pi-check" severity="danger" style={{ borderRadius: '7px' }} onClick={handleDelete} />
        </div>
    );
    const hideDeleteProductsDialog = () => {
        setDeleteDialog(false)
    }
    const handleEdit = (row) => {
        setEditDialog(true)
        formik.setFieldValue('nearbyDivision', row.nearby_division)
        formik.setFieldValue('nearbyTitle', row.nearby_title)
        formik.setFieldValue('nearbyNotes', row.nearby_notes)
        formik.setFieldValue('id', row.id)
    }
    const getData = useSelector((state) => state.nearByData?.get?.data)

    const column1 = [
        {
            name: "S.no",
            cell: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Division",
            selector: (row) => row.nearby_division,
            sortable: true,
        },
        {
            name: "Title",
            selector: (row) => row.nearby_title,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row.nearby_notes,
            sortable: true,
        },



        ...(status === "pending" && staffid.Login == "staff"
            ? [

                {
                    name: "Actions",
                    cell: (row) => (
                        <>
                            <div className="d-flex" >
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

    return (
        <>
            <div className="mt-4">
                <div className="d-flex justify-content-between mb-3">
                    <h6>Nearby Developments: </h6>

                    {status == "pending" && staffid.Login == "staff" && (
                    <div className="ms-2">
                        <a
                            href="#"
                            onClick={() => setNewDialog(true)}
                            className="btn1 me-2"
                        >
                            + Add
                        </a>
                    </div>
                    )}
                </div>
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
            <Dialog visible={newDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Add NearBy Development" modal className="p-fluid" onHide={hideDialog} >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div>
                        <div >
                            <label htmlFor="nearbyDivision" className="form-label">Sector :</label>
                            <select
                                id="nearbyDivision"
                                name="nearbyDivision"
                                className="form-select mt-2"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nearbyDivision}
                            >
                                <option value="">Select Sectors</option>
                                <option value="Factory">Factory</option>
                                <option value="Industry">Industry</option>
                                <option value="SIPCOT">SIPCOT</option>
                                <option value="Road developments">Road developments</option>
                                <option value="Bus stand">Bus stand</option>
                                <option value="Metro">Metro</option>
                                <option value="Railway station">Railway station</option>
                                <option value="Railway station">Port</option>



                            </select>
                            {formik.errors.nearbyDivision && formik.touched.nearbyDivision && (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.nearbyDivision}
                                </p>
                            )}

                        </div>
                        <div className="mt-2 col-md-12">
                            <label className="form-label" htmlFor="nearbyTitle">
                                Title :
                            </label>
                            <input
                                name='nearbyTitle'
                                id='nearbyTitle'
                                placeholder='Enter Title'
                                className='form-control'
                                value={formik.values.nearbyTitle}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                            />
                            {formik.errors.nearbyTitle && formik.touched.nearbyTitle ? (
                                <p style={{ color: "red", fontSize: '14px' }}>{formik.errors.nearbyTitle}</p>
                            ) : null}
                        </div>
                        <div className="mt-2 col-md-12">
                            <label className="form-label" htmlFor="nearbyNotes">
                                Description :
                            </label>
                            <textarea
                                name='nearbyNotes'
                                id='nearbyNotes'
                                style={{ height: '100px' }}
                                placeholder='Enter Description'
                                className='form-control'
                                value={formik.values.nearbyNotes}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                            />
                            {formik.errors.nearbyNotes && formik.touched.nearbyNotes ? (
                                <p style={{ color: "red", fontSize: '14px' }}>{formik.errors.nearbyNotes}</p>
                            ) : null}
                        </div>


                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        {/* <div>
                            <Button label="Cancel" icon="pi pi-times" outlined size="small" style={{ borderRadius: '7px' }} onClick={() => setEditDialog(false)} />
                        </div> */}
                        <div>
                            <Button label="Submit" icon="pi pi-upload" type="submit" size="small" style={{ borderRadius: '7px' }} onClick={() => setEditing(false)} />
                        </div>
                    </div>
                </form>
            </Dialog>
            {/*delete */}

            <Dialog visible={deleteDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteUnitsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <span style={{ marginLeft: '10px' }}>Are you sure you want to delete selected devlopment?</span>
                </div>
            </Dialog>

            {/*edit dialog */}
            <Dialog visible={editDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Edit Near By Development" modal className="p-fluid" onHide={hideEditDialog} >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div>
                        <div >
                            <label htmlFor="nearbyDivision" className="form-label">Sector :</label>
                            <select
                                id="nearbyDivision"
                                name="nearbyDivision"
                                className="form-select mt-2"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nearbyDivision}
                            >
                                <option value="">Select Sectors</option>
                                <option value="Factory">Factory</option>
                                <option value="Industry">Industry</option>
                                <option value="SIPCOT">SIPCOT</option>
                                <option value="Road developments">Road developments</option>
                                <option value="Bus stand">Bus stand</option>
                                <option value="Metro">Metro</option>
                                <option value="Railway station">Railway station</option>
                                <option value="Railway station">Port</option>



                            </select>
                            {formik.errors.nearbyDivision && formik.touched.nearbyDivision && (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.nearbyDivision}
                                </p>
                            )}

                        </div>
                        <div className="mt-2 col-md-12">
                            <label className="form-label" htmlFor="nearbyTitle">
                                Title :
                            </label>
                            <input
                                name='nearbyTitle'
                                id='nearbyTitle'
                                placeholder='Enter Title'
                                className='form-control'
                                value={formik.values.nearbyTitle}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                            />
                            {formik.errors.nearbyTitle && formik.touched.nearbyTitle ? (
                                <p style={{ color: "red", fontSize: '14px' }}>{formik.errors.nearbyTitle}</p>
                            ) : null}
                        </div>
                        <div className="mt-2 col-md-12">
                            <label className="form-label" htmlFor="nearbyNotes">
                                Description :
                            </label>
                            <textarea
                                name='nearbyNotes'
                                id='nearbyNotes'
                                style={{ height: '100px' }}
                                placeholder='Enter Description'
                                className='form-control'
                                value={formik.values.nearbyNotes}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                            />
                            {formik.errors.nearbyNotes && formik.touched.nearbyNotes ? (
                                <p style={{ color: "red", fontSize: '14px' }}>{formik.errors.nearbyNotes}</p>
                            ) : null}
                        </div>


                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        {/* <div>
                            <Button label="Cancel" icon="pi pi-times" outlined size="small" style={{ borderRadius: '7px' }} onClick={() => setEditDialog(false)} />
                        </div> */}
                        <div>
                            <Button label="Update" icon="pi pi-upload" type="submit" size="small" style={{ borderRadius: '7px' }} onClick={() => setEditing(true)} />
                        </div>
                    </div>
                </form>
            </Dialog>
        </>
    )
}

export default NearbyDevelopments