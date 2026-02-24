import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import * as yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import Button from "@mui/material/Button";
import { fetchSRODetails } from '../../../Redux/Actions/MasterPage/SRODetailsAction';
import Toast from '../../../Utils/Toast';
import AddIcon from '@mui/icons-material/Add';
import { talukDetailsGetThunk } from '../../../Redux/Actions/MasterPage/TalukDetailsThunk';
import { Tab, Tabs } from "react-bootstrap";
import TalukTab from './TalukTab';
import SroTab from './SroTab';
import TalukTable from './TalukTable';
import SroTable from './SroTable';


const ContactPersonDetails = () => {
    const dispatch = useDispatch()
    const toast = useRef(null);
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [editDialog, setEditDialog] = useState(false)

    useEffect(() => {
        dispatch(fetchSRODetails());
        dispatch(talukDetailsGetThunk())
    }, [])

    const SRODetailsData = useSelector((state) => state.SRODetails.SRODetailsData);
    const talukOffice = useSelector((state) => state.talukDetailsData.get.data)

    const onSubmit = async (values) => {

        formik.resetForm()
        try {
            if (values.id) {
                Toast({ message: "Successfully Updated", type: "success" })
                setEditDialog(false)
            } else {
                Toast({ message: "Successfully Submited", type: "success" })
            }
        } catch (error) {
            Toast({ message: "Successfully Submited", type: "error" })
        }
    }


    const formik = useFormik({
        initialValues: {
            talukoffice: '',
            sro: '',
            contactsName: [''],
            contactsNo: ['']
        },
        validationSchema: yup.object().shape({
            talukoffice: yup.string().required('talukoffice is required!'),
            sro: yup.string().required('sro is required!'),
            contactsName: yup.array().of(
                yup.string().required('Contact name is required!')
            ),
            contactsNo: yup.array().of(
                yup.string().required('Contact no is required!')
            ),
        }),
        onSubmit
    })
    const handleDelete = () => {
        try {
            setDeleteDialog(false)
            Toast({ message: "SuccessFully deleted", type: "success" })
        } catch (error) {
            Toast({ message: "Not Deleted", type: "error" })
        }
    }

    const handleAdd = () => {
        formik.setFieldValue('contactsName', [...formik.values.contactsName, '']);
    };

    const handleDeleteIndex = (index) => {
        const updatedContacts = formik.values.contactsName.filter((_, i) => i !== index);
        formik.setFieldValue('contactsName', updatedContacts);
    };
    const personNoAdd = () => {
        formik.setFieldValue('contactsNo', [...formik.values.contactsNo, '']);
    };

    const deletePersonNo = (index) => {
        const updatedContacts = formik.values.contactsNo.filter((_, i) => i !== index);
        formik.setFieldValue('contactsNo', updatedContacts);
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
                                    <Tabs
                                        defaultActiveKey="tab1"
                                        id="fill-tab-example"
                                        className=" "
                                        fill
                                    >
                                        <Tab eventKey="tab1" title="Taluk Office ">
                                            <div className="card-body">
                                                <TalukTab />
                                            </div>
                                        </Tab>
                                        <Tab eventKey="longer-tab" title="Sro">
                                            <div className="card-body">
                                                <SroTab />
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-8 col-sm-6">
                            <div className="card">
                                <div className="card-header">
                                    <Tabs
                                        defaultActiveKey="tab1"
                                        id="fill-tab-example"
                                        className=" "
                                        fill
                                    >
                                        <Tab eventKey="tab1" title="Taluk Office ">
                                            <div className="card-body">

                                                <TalukTable />
                                            </div>
                                        </Tab>
                                        <Tab eventKey="longer-tab" title="Sro">
                                            <div className="card-body">

                                                <SroTable />
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*Delete modal */}
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
            {/*Edit modal */}
            <Dialog
                visible={editDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Update "
                modal
                className="p-fluid"
                onHide={() => {
                    setEditDialog(false);
                    formik.resetForm()
                }}
            >
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-md-12 mb-3 ">
                            <label htmlFor="discount" className="form-label">
                                Taluk Office
                            </label>
                            <select
                                name="talukoffice"
                                className="form-select"
                                placeholder='Enter Taluk '
                                value={formik.values.talukoffice}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option>Select Taluk ..</option>
                                {talukOffice?.map((item) => (
                                    <option key={item.id} value={item.id}>{item.office} </option>
                                ))}


                            </select>
                            {formik.errors.taluk && formik.touched.taluk ? (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.taluk}</p>
                            ) : null}
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3 ">
                            <label htmlFor="discount" className="form-label">
                                Sro
                            </label>
                            <select
                                name="sro"
                                className="form-select"
                                placeholder='Enter Taluk '
                                value={formik.values.sro}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option>Select Sro ..</option>
                                {SRODetailsData?.map((item) => (
                                    <option key={item.id} value={item.id}> {item.sro_title}</option>
                                ))}
                            </select>
                            {formik.errors.sro && formik.touched.sro ? (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.sro}</p>
                            ) : null}
                        </div>

                    </div>
                    <div className="row">
                        <label htmlFor="discount" className="form-label">
                            Contact Person Name
                        </label>
                        {formik.values.contactsName?.map((contact, index) => (
                            <div className="row mb-3" key={index}>
                                <div className="col-md-9">
                                    <input
                                        type="text"
                                        name={`contactsName[${index}]`}
                                        className="form-control"
                                        placeholder={index === 0 ? "Enter Contact Person Name" : `Enter Contact Person Name ${index}`}
                                        value={contact}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.contactsName && formik.errors.contactsName[index] && formik.touched.contactsName && formik.touched.contactsName[index] && (
                                        <p style={{ color: 'red', fontSize: '12px' }}>
                                            {formik.errors.contactsName[index]}
                                        </p>
                                    )}
                                </div>
                                <div className="d-flex gap-2 col-md-3">
                                    {index !== 0 && (
                                        <div className=" p-0 m-0">
                                            <button
                                                type="button"
                                                className="btn  btn-outline-danger me-1 delete"
                                                onClick={() => handleDeleteIndex(index)}
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    )}

                                    {/* <div className=" p-0 m-0">
                                                            <button className='btn  btn-outline-success me-1 edit' type='button' onClick={handleAdd}><AddIcon /> </button>
                                                        </div> */}
                                    {index === formik.values.contactsName.length - 1 && (
                                        <div className="p-0 m-0">
                                            <button
                                                className="btn btn-outline-success me-1 edit"
                                                type="button"
                                                onClick={handleAdd}
                                            >
                                                <AddIcon />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}



                    </div>
                    <div className="row">
                        <label htmlFor="discount" className="form-label">
                            Contact Person Number
                        </label>
                        {formik.values.contactsNo?.map((contact, index) => (
                            <div className="row mb-3" key={index}>
                                <div className="col-md-9">
                                    <input
                                        type="text"
                                        name={`contactsNo[${index}]`}
                                        className="form-control"
                                        placeholder={index === 0 ? "Enter Contact Person No" : `Enter Contact Person No ${index}`}
                                        value={contact}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.contactsNo && formik.errors.contactsNo[index] && formik.touched.contactsNo && formik.touched.contactsNo[index] && (
                                        <p style={{ color: 'red', fontSize: '12px' }}>
                                            {formik.errors.contactsNo[index]}
                                        </p>
                                    )}
                                </div>
                                <div className="d-flex gap-2 col-md-3">
                                    {index !== 0 && (
                                        <div className=" p-0 m-0">
                                            <button
                                                type="button"
                                                className="btn  btn-outline-danger me-1 delete"
                                                onClick={() => deletePersonNo(index)}
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    )}
                                    {index === formik.values.contactsNo.length - 1 && (
                                        <div className=" p-0 m-0">
                                            <button className='btn  btn-outline-success me-1 edit' type='button' onClick={personNoAdd}><AddIcon /> </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-end py-3 px-3">
                        <button type="submit" className="btn1" >
                            Update
                        </button>
                    </div>
                </form>
            </Dialog>
        </>
    )
}

export default ContactPersonDetails