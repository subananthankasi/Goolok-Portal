import { useFormik } from 'formik'
import { useEffect} from 'react'
import * as yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSRODetails } from '../../../Redux/Actions/MasterPage/SRODetailsAction';
import { contactPersonTalukGetThunk, contactPersonTalukPostThunk } from '../../../Redux/Actions/MasterPage/ContactPersonTalukThunk';
import Toast from '../../../Utils/Toast';
import AddIcon from '@mui/icons-material/Add';
import { talukDetailsGetThunk } from '../../../Redux/Actions/MasterPage/TalukDetailsThunk';


const TalukTab = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchSRODetails());
        dispatch(contactPersonTalukGetThunk())
        dispatch(talukDetailsGetThunk())
    }, [dispatch])

    const talukOffice = useSelector((state) => state.talukDetailsData.get.data)
    const postLoading = useSelector((state) => state.contactPersonTalukData.post.loading)

    const onSubmit = async (values) => {

        const payload = {
            ...values,
            type: "taluk"
        }
        formik.resetForm()
        try {
            dispatch(contactPersonTalukPostThunk(payload)).then(() => {
                dispatch(contactPersonTalukGetThunk())
            })
            if (values.id) {
                Toast({ message: "Successfully Updated", type: "success" })
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
            contactsName: [''],
            contactsNo: ['']
        },
        validationSchema: yup.object().shape({
            talukoffice: yup.string().required('talukoffice is required!'),
            contactsName: yup.array().of(
                yup.string()
                    .matches(/^[A-Za-z\s]+$/, "Only letters allowed")
                    .required("Contact name is required")
            ),
            contactsNo: yup.array().of(
                yup.string().required('Contact no is required!')
            ),
        }),
        onSubmit
    })


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
                    {formik.errors.talukoffice && formik.touched.talukoffice ? (
                        <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.talukoffice}</p>
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
                                onChange={(e) => {
                                    if (/^[A-Za-z ]*$/.test(e.target.value)) {
                                        formik.handleChange(e);
                                    } else {
                                        formik.setFieldError(`contactsName[${index}]`, "Numbers are not allowed");
                                    }
                                }}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.contactsName &&
                                formik.errors.contactsName[index] &&
                                formik.touched.contactsName &&
                                formik.touched.contactsName[index] && (
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
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value) && value.length <= 10) {
                                        formik.handleChange(e);
                                    } else {
                                        formik.setFieldError(`contactsNo[${index}]`, "Only numbers allowed & max 10 digits");
                                    }
                                }}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.contactsNo &&
                                formik.errors.contactsNo[index] &&
                                formik.touched.contactsNo &&
                                formik.touched.contactsNo[index] && (
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
                <button
                    className="btn1 text-dark me-1"
                    onClick={() => {
                        formik.resetForm()
                    }}
                >
                    Clear
                </button>
                <button type="submit" className="btn1" disabled={postLoading}>
                    {postLoading ? "Submitting..." : "Submit"}
                </button>
            </div>
        </form>
    )
}

export default TalukTab