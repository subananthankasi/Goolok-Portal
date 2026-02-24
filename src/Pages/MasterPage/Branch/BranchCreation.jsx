import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addBranch,
    fetchBranch,
    fetchBranchID,
    updateBranch,
} from "../../../Redux/Actions/MasterPage/BranchAction";
import Toast from "../../../Utils/Toast";
import { useFormik } from "formik";
import * as yup from "yup";
import GeneralState from "../../../Utils/Dropdown/GeneralState";
import GeneralDistrict from "../../../Utils/Dropdown/GeneralDistrict";
import GeneralTalukDropdown from "../../../Utils/Dropdown/GeneralTalukDropdown";
import GeneralVillageDropdown from "../../../Utils/Dropdown/GeneralVillageDropdown";
import GeneralPincodeDropdown from "../../../Utils/Dropdown/GeneralPincodeDropdown";
import { Dialog } from "primereact/dialog";

const BranchCreation = ({ visible, setVisible, isEditing, editData }) => {
    const dispatch = useDispatch();
    const branchData = useSelector((state) => state.Branch.selectedBranchID);
    const addLoading = useSelector((state) => state.Branch.addLoading);

    useEffect(() => {
        if (visible) {
            dispatch(fetchBranchID());
            dispatch(fetchBranch());
        }
    }, [dispatch, visible]);


  
    const branchValidationSchema = yup.object().shape({
        branch_state: yup.string().trim().required("State name is required"),
        branch_district: yup.string().trim().required("District is required"),
        branch_taluk: yup.string().trim().required("Taluk is required"),
        branch_village: yup.string().trim().required("Village is required"),
        branch_pincode: yup.string().trim().required("Pincode is required"),
        branch_name: yup
            .string()
            .trim()
            .matches(/^[A-Za-z\s]+$/, "Branch Name should contain only letters")
            .required("Branch name is required"),
        short_name: yup
            .string()
            .trim()
            .matches(/^[A-Za-z\s]+$/, "short name should contain only letters")
            .required("Short name is required"),
        contact_person: yup.string().trim().required("Contact person is required"),
        mobile: yup
            .string()
            .trim()
            .matches(/^[0-9]{10}$/, "Mobile Number should contain 10 digit")
            .required("Mobile number is required"),
        email: yup
            .string()
            .trim()
            .email("Enter valid email")
            .required("Email is required"),
        geo_location: yup.string().trim().required("Geo location is required"),
        status: yup.string().trim().required("Status is required"),
    });

    const onSubmit = async (values, { resetForm, setErrors }) => {
        const payload = {
            ...values,
            branchid: branchData
        }
        try {
            if (isEditing) {
                const res = await dispatch(updateBranch(editData.id, payload));
                if (res.success) {
                    Toast({ message: "Updated Successfully", type: "success" });
                    await dispatch(fetchBranchID());
                    resetForm()
                    setVisible(false)
                } else {
                    const backendErrors = res?.error || {};
                    const mappedErrors = {};

                    if (backendErrors.email)
                        mappedErrors.email = backendErrors.email;

                    if (backendErrors.mobile)
                        mappedErrors.mobile = backendErrors.mobile;

                    if (backendErrors.branch_name)
                        mappedErrors.branch_name = backendErrors.branch_name;

                    setErrors(mappedErrors);

                    Object.keys(mappedErrors).forEach((field) => {
                        formik.setFieldTouched(field, true, false);
                    });
                }
            }
            else {
                const res = await dispatch(addBranch([payload]));
                if (res.success) {
                    Toast({ message: "Added Successfully", type: "success" });
                    await dispatch(fetchBranchID());
                    setVisible(false)
                } else {
                    // setErrors(res?.error);
                }
            }
        }
        catch (error) {

        }
    };
    const formik = useFormik({
        initialValues: {
            branchid: "",
            branch_name: " ",
            short_name: " ",
            branch_state: " ",
            branch_district: " ",
            branch_taluk: " ",
            branch_village: " ",
            branch_pincode: " ",
            contact_person: " ",
            mobile: " ",
            email: " ",
            geo_location: " ",
            status: "Enable",
        },
        validationSchema: branchValidationSchema,
        onSubmit,
    });


      useEffect(() => {
        if (isEditing && visible) {
            formik.setValues({
                branchid: editData?.branchid,
                branch_name: editData?.branch_name,
                short_name: editData?.short_name,
                branch_state: editData?.branch_state,
                branch_district: editData?.branch_district,
                branch_taluk: editData?.branch_taluk,
                branch_village: editData?.branch_village,
                branch_pincode: editData?.branch_pincode,
                contact_person: editData?.contact_person,
                mobile: editData?.mobile,
                email: editData?.email,
                geo_location: editData?.geo_location,
                status: editData?.status,
                id: editData.id
            });
        }
    }, [isEditing, visible, editData]);


    return (
        <Dialog
            visible={visible}
            style={{ width: "62rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Branch Creations"
            modal
            className="p-fluid"
            onHide={() => {
                setVisible(false);
                formik.resetForm();
            }}
        >
            <div className="p-3">
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-md-12 col-lg-6 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                                Branch ID
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                readOnly
                                name="branchid"
                                value={branchData}
                                disabled={branchData}
                            />
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                                Short Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="short_name"
                                value={formik.values.short_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.short_name && formik.touched.short_name ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.short_name}
                                </p>
                            ) : null}
                        </div>

                        <div className="col-md-12  col-lg-6 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                                Branch Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="branch_name"
                                value={formik.values.branch_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.branch_name && formik.touched.branch_name ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.branch_name}
                                </p>
                            ) : null}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                                Mobile Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="mobile"
                                value={formik.values.mobile}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.mobile && formik.touched.mobile ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.mobile}
                                </p>
                            ) : null}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                                Contact Person
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="contact_person"
                                value={formik.values.contact_person}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.contact_person && formik.touched.contact_person ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.contact_person}
                                </p>
                            ) : null}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                                Email ID
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.email && formik.touched.email ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.email}
                                </p>
                            ) : null}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                                Geo Location
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="geo_location"
                                value={formik.values.geo_location}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.geo_location && formik.touched.geo_location ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.geo_location}
                                </p>
                            ) : null}
                        </div>

                        <div className="mb-3 col-md-12 col-lg-6">
                            <label className="form-label" htmlFor="inputState">
                                State
                            </label>
                            <GeneralState
                                value={formik.values.branch_state}
                                onChange={(value) => {
                                    formik.setFieldValue("branch_state", value);
                                    formik.setFieldValue("branch_district", "");
                                    formik.setFieldValue("branch_taluk", "");
                                    formik.setFieldValue("branch_village", "");
                                }}
                                onBlur={() => formik.setFieldTouched("branch_state", true)}
                                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                            />
                            {formik.errors.branch_state && formik.touched.branch_state ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.branch_state}
                                </p>
                            ) : null}
                        </div>

                        <div className="mb-3 col-md-12 col-lg-6">
                            <label className="form-label" htmlFor="inputState">
                                District
                            </label>
                            <GeneralDistrict
                                stateId={formik.values.branch_state}
                                value={formik.values.branch_district}
                                onChange={(value) => {
                                    formik.setFieldValue("branch_district", value);
                                    formik.setFieldValue("branch_taluk", "");
                                    formik.setFieldValue("branch_village", "");
                                }}
                                onBlur={() => formik.setFieldTouched("branch_district", true)}
                            />
                            {formik.errors.branch_district &&
                                formik.touched.branch_district ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.branch_district}
                                </p>
                            ) : null}
                        </div>

                        <div className="mb-3 col-md-12 col-lg-6">
                            <label className="form-label" htmlFor="inputState">
                                Taluk
                            </label>
                            <GeneralTalukDropdown
                                districtId={formik.values.branch_district}
                                value={formik.values.branch_taluk}
                                onChange={(value) => {
                                    formik.setFieldValue("branch_taluk", value);
                                    formik.setFieldValue("branch_village", "");
                                }}
                                onBlur={() => formik.setFieldTouched("branch_taluk", true)}
                            />
                            {formik.errors.branch_taluk && formik.touched.branch_taluk ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.branch_taluk}
                                </p>
                            ) : null}
                        </div>

                        <div className="mb-3 col-md-12 col-lg-6">
                            <label className="form-label" htmlFor="inputState">
                                Village
                            </label>
                            <GeneralVillageDropdown
                                talukId={formik.values.branch_taluk}
                                value={formik.values.branch_village}
                                onChange={(value) =>
                                    formik.setFieldValue("branch_village", value)
                                }
                                onBlur={() => formik.setFieldTouched("branch_village", true)}
                            />
                            {formik.errors.branch_village && formik.touched.branch_village ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.branch_village}
                                </p>
                            ) : null}
                        </div>

                        <div className="mb-3 col-md-12 col-lg-6">
                            <label className="form-label" htmlFor="inputState">
                                Pincode
                            </label>
                            <GeneralPincodeDropdown
                                villageId={formik.values.branch_village}
                                value={formik.values.branch_pincode}
                                onChange={(value) =>
                                    formik.setFieldValue("branch_pincode", value)
                                }
                                onBlur={() => formik.setFieldTouched("branch_pincode", true)}
                            />
                            {formik.errors.branch_pincode && formik.touched.branch_pincode ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.branch_pincode}
                                </p>
                            ) : null}
                        </div>

                        <div className="mb-3 col-md-12 col-lg-6">
                            <label className="form-label" htmlFor="inputState">
                                Status
                            </label>
                            <select
                                id="inputState"
                                className="form-select"
                                name="status"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="Enable">Enable</option>
                                <option value="Disable">Disable</option>
                            </select>
                            {formik.errors.status && formik.touched.status ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.status}
                                </p>
                            ) : null}
                        </div>
                    </div>

                    <div className="text-end py-3 px-3">
                        <button
                            className="btn1 me-1"
                            type="button"
                            onClick={() => formik.resetForm()}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn1"
                            disabled={addLoading}
                            type="submit"
                        >
                            {addLoading ? "Processing..." : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
};

export default BranchCreation;
