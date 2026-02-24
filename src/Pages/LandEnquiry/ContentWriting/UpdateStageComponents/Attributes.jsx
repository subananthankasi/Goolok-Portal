import  {  useState } from 'react'
import customStyle from '../../../../Utils/tableStyle';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "react-data-table-component";
import { Dialog } from 'primereact/dialog';
import { useFormik } from "formik";
import * as yup from "yup";


const Attributes = ({ eid, id, status }) => {
    const staffid = JSON.parse(localStorage.getItem('token'));
    const [newDialog, setNewDialog] = useState(false)

    const column1 = [
        {
            name: "S.no",
            cell: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Property Id",
            selector: (row) => row.feature,
            sortable: true,
        },
        {
            name: "District",
            selector: (row) => row.details,
            sortable: true,
        },
        {
            name: "Taluk",
            selector: (row) => row.details,
            sortable: true,
        },
        {
            name: "Village",
            selector: (row) => row.details,
            sortable: true,
        },
        {
            name: "Pincode",
            selector: (row) => row.details,
            sortable: true,
        },
        {
            name: "Land Classification",
            selector: (row) => row.details,
            sortable: true,
        },
        {
            name: "Total Extent",
            selector: (row) => row.details,
            sortable: true,
        },
        {
            name: "Price Per Acre",
            selector: (row) => row.details,
            sortable: true,
        },
        {
            name: "Total Land Cost",
            selector: (row) => row.details,
            sortable: true,
        },
        {
            name: "Road Frontage",
            selector: (row) => row.details,
            sortable: true,
        },
        {
            name: "Road Facing",
            selector: (row) => row.details,
            sortable: true,
        },
        {
            name: "Road Width",
            selector: (row) => row.details,
            sortable: true,
        },
        {
            name: "Boundary Wall",
            selector: (row) => row.details,
            sortable: true,
        },

        ...(status === "pending" && staffid.Login == "staff"
            ? [
                {
                    name: "Actions",
                    cell: (row) => (
                        <>
                            <div className="d-flex">
                                <button
                                    className="btn btn-outline-info me-1 edit"
                                    data-tooltip-id="edit"
                                    // onClick={() => handleEdit(row)}
                                >
                                    <EditIcon />
                                </button>
                                <button
                                    className="btn btn-outline-danger delete"
                                    data-tooltip-id="delete"
                                    // onClick={() => openDelete(row)}
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
    const onSubmit = (values) => {
        
    }

    const formik = useFormik({
        initialValues: {
            property_id: '',
            district: '',
            taluk: '',
            village: '',
            pincode: '',
            classification: '',
            extent_in_units: '',
            price_per_acre: '',
            land_cost: '',
            road_frontage:'',
            road_facing: '',
            road_width:'',
            boundary_wall:'',
            enqid: eid,
            id: null
        },

        validationSchema: yup.object().shape({
            property_id: yup.string().required("property id is required!!"),
            district: yup.string().required(" district is required!!"),
            taluk: yup.string().required(" taluk is required!!"),
            village: yup.string().required("village is required!!"),
            pincode: yup.string().required(" pincode details is required!!"),
            classification: yup.string().required(" classification details is required!!"),
            extent_in_units: yup.string().required(" total extent in units is required!!"),
            price_per_acre: yup.string().required(" price per acre is required!!"),
            land_cost: yup.string().required(" total land cost is required!!"),
            road_frontage: yup.string().required(" road frontage is required!!"),
            road_facing: yup.string().required(" road facing is required!!"),
            road_width: yup.string().required(" road width is required!!"),
            boundary_wall: yup.string().required(" boundary wall is required!!"),
        }),
        onSubmit
    })
    const hideDialog = () => {
        setNewDialog(false)
        formik.resetForm()
    }

    return (
        <>
            <div className="container-fluid p-0 mt-3">
                <div className="row">

                    <div className="col-12">
                        <div className="card">
                            <div className="card-header  p-3 d-flex justify-content-start">
                                <h6>Attributes</h6>
                            </div>

                            <div className="card-body p-3">
                                {status == "pending" && staffid.Login == "staff" && (
                                    <div className='d-flex justify-content-center'>
                                        <button
                                            onClick={() => setNewDialog(true)}
                                            className="btn1 me-2 mb-3"
                                        >
                                            + create
                                        </button>
                                    </div>


                                )}
                                <DataTable
                                    persistTableHead={true}
                                    columns={column1}
                                    // data={GEnqData}
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
            <Dialog visible={newDialog} style={{ width: '45rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Add Attributes" modal className="p-fluid" onHide={hideDialog} >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className='row'>
                        <div className='form-group col-6' >
                            <label htmlFor="property_id" className='form-label'>Property Id :</label>
                            <input
                                id='property_id'
                                name='property_id'
                                placeholder='Enter Property Id...'
                                className='form-control'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.property_id}
                            />
                            {formik.errors.property_id && formik.touched.property_id && (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.property_id}</p>
                            )}
                        </div>
                        <div className='form-group col-6'>
                            <label htmlFor="district" className='form-label'>District:</label>
                       
                            <select
                                id='district'
                                name='district'
                                className='form-select'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.district}
                            >
                                <option value={''} > Select District</option>
                               
                            </select>

                            {formik.errors.district && formik.touched.district && (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.district}</p>
                            )}
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='form-group col-6' >
                            <label htmlFor="taluk" className='form-label'>Taluk :</label>
                            <select
                                id='taluk'
                                name='taluk'
                                className='form-select'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.taluk}
                            >
                                <option value={''} > Select District</option>
                               
                            </select>
                            {formik.errors.taluk && formik.touched.taluk && (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.taluk}</p>
                            )}
                        </div>
                        <div className='form-group col-6'>
                            <label htmlFor="village" className='form-label'>Village:</label>
                       
                            <select
                                id='village'
                                name='village'
                                className='form-select'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.village}
                            >
                                <option value={''} > Select District</option>
                               
                            </select>

                            {formik.errors.village && formik.touched.village && (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.village}</p>
                            )}
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='form-group col-6' >
                            <label htmlFor="pincode" className='form-label'>Pin Code :</label>
                            <select
                                id='pincode'
                                name='pincode'
                                className='form-select'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.pincode}
                            >
                                <option value={''} > Select Pin Code</option>
                               
                            </select>
                            {formik.errors.pincode && formik.touched.pincode && (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.pincode}</p>
                            )}
                        </div>
                        <div className='form-group col-6'>
                            <label htmlFor="classification" className='form-label'>Land Classification:</label>
                       
                            <input
                                id='classification'
                                name='classification'
                                placeholder='Enter Land Classifcation...'
                                className='form-control'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.details}
                            />

                            {formik.errors.classification && formik.touched.classification && (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.classification}</p>
                            )}
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='form-group col-6' >
                            <label htmlFor="extent_in_units" className='form-label'>Total Extent in units :</label>
                            <input
                                id='extent_in_units'
                                name='extent_in_units'
                                placeholder='Enter extent in units...'
                                className='form-control'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.extent_in_units}
                            />
                            {formik.errors.extent_in_units && formik.touched.extent_in_units && (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.extent_in_units}</p>
                            )}
                        </div>
                        <div className='form-group col-6'>
                            <label htmlFor="price_per_acre" className='form-label'>Price per Acre/Cent:</label>
                       
                            <input
                                id='price_per_acre'
                                name='price_per_acre'
                                placeholder='Enter Price per Acre/Cent...'
                                className='form-control'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price_per_acre}
                            />

                            {formik.errors.price_per_acre && formik.touched.price_per_acre && (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.price_per_acre}</p>
                            )}
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='form-group col-6' >
                            <label htmlFor="land_cost" className='form-label'>Total Land Cost :</label>
                            <input
                                id='land_cost'
                                name='land_cost'
                                placeholder='Enter Total land Cost...'
                                className='form-control'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.land_cost}
                            />
                            {formik.errors.land_cost && formik.touched.land_cost && (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.land_cost}</p>
                            )}
                        </div>
                        <div className='form-group col-6'>
                            <label htmlFor="road_frontage" className='form-label'>Road Frontage:</label>
                       
                            <input
                                id='road_frontage'
                                name='road_frontage'
                                placeholder='Enter Road Frontage...'
                                className='form-control'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.road_frontage}
                            />

                            {formik.errors.road_frontage && formik.touched.road_frontage && (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.road_frontage}</p>
                            )}
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='form-group col-6' >
                            <label htmlFor="road_facing" className='form-label'>Road Facing :</label>
                            <input
                                id='road_facing'
                                name='road_facing'
                                placeholder='Enter Road facing...'
                                className='form-control'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.road_facing}
                            />
                            {formik.errors.road_facing && formik.touched.road_facing && (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.road_facing}</p>
                            )}
                        </div>
                        <div className='form-group col-6'>
                            <label htmlFor="road_width" className='form-label'>Road Width:</label>
                       
                            <input
                                id='road_width'
                                name='road_width'
                                placeholder='Enter Road Width...'
                                className='form-control'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.road_width}
                            />

                            {formik.errors.road_width && formik.touched.road_width && (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.road_width}</p>
                            )}
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='form-group col-6' >
                            <label htmlFor="boundary_wall" className='form-label'>Boundary Wall :</label>
                            <input
                                id='boundary_wall'
                                name='boundary_wall'
                                placeholder='Enter Boundary Wall...'
                                className='form-control'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.boundary_wall}
                            />
                            {formik.errors.boundary_wall && formik.touched.boundary_wall && (
                                <p style={{ color: "red", fontSize: '12px' }}>{formik.errors.boundary_wall}</p>
                            )}
                        </div>
                        
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <button className='btn1' type='submit' >Save</button>
                    </div>
                </form>
            </Dialog>
        </>
    )
}

export default Attributes