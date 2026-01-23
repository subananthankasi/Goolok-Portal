import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
    addStaff,
    fetchStaff,
    fetchStaffID,
    updateStaff,
} from "../../../Redux/Actions/MasterPage/Staff";
import { useFormik } from "formik";
import * as yup from "yup";
import { fetchGroupType } from "../../../Redux/Actions/MasterPage/GroupTypeAction";
import Select from "react-select";
import { fetchBranch } from "../../../Redux/Actions/MasterPage/BranchAction";
import GeneralState from "../../../Utils/Dropdown/GeneralState";
import GeneralDistrict from "../../../Utils/Dropdown/GeneralDistrict";
import GeneralTalukDropdown from "../../../Utils/Dropdown/GeneralTalukDropdown";
import GeneralVillageDropdown from "../../../Utils/Dropdown/GeneralVillageDropdown";
import GeneralPincodeDropdown from "../../../Utils/Dropdown/GeneralPincodeDropdown";
import Common from "../../../common/Common";
import Toast from "../../../Utils/Toast";

const StaffCreation = ({ editData, visible, setEditModal }) => {
    const dispatch = useDispatch();
    const autoStaffID = useSelector((state) => state.staff.staffID);

    useEffect(() => {
        dispatch(fetchStaff());
        dispatch(fetchStaffID());
    }, [dispatch]);

    useEffect(() => {
        if (autoStaffID) {
            formik.setFieldValue("staffId", autoStaffID);
        }
    }, [autoStaffID]);

    useEffect(() => {
        if (visible) {
            formik.setValues({
                staffId: editData.staff_id,
                staffName: editData.staff_name,
                staffEmail: editData.staff_email,
                staffMobile: editData.staff_mobile,
                staffAadhaar: editData.staff_aadhaar,
                staffAddress: editData.staff_address,
                staffBranch: editData.staff_branch,
                staffGroup: editData.staff_group,
                staffState: editData.staff_state,
                staffDistrict: editData.staff_district,
                staffTaluk: editData.staff_taluk,
                staffVillage: editData.staff_village,
                staffPincode: editData.staff_pincode,
                staffPassword: editData.staff_password,
                staffConfirm: editData.staff_password,
                role: editData.role,
                status: editData.status,
                id: editData.id
            });
        }

    }, [visible, editData]);

    const staffValidationSchema = yup.object().shape({
        staffId: yup.string().trim().required("Staff ID is required"),
        staffName: yup
            .string()
            .trim()
            .matches(/^[A-Za-z\s]+$/, "Staff name should contain only letters")
            .required("Staff name is required"),

        staffEmail: yup
            .string()
            .trim()
            .email("Invalid email format")
            .required("Staff email is required"),

        staffMobile: yup
            .string()
            .trim()
            .matches(/^[0-9]{10}$/, "Invalid mobile number format")
            .required("Staff mobile number is required"),

        staffAadhaar: yup
            .string()
            .transform((value) => value?.replace(/\s/g, ""))
            .matches(/^\d{12}$/, "Aadhaar number must be 12 digits")
            .required("Aadhaar number is required"),

        staffAddress: yup.string().trim().required("Staff address is required"),

        staffBranch: yup.string().trim().required("Branch is required"),

        staffGroup: yup.string().trim().required("Group is required"),

        staffState: yup.string().trim().required("State is required"),

        staffDistrict: yup.string().trim().required("District is required"),

        staffTaluk: yup.string().trim().required("Taluk is required"),

        staffVillage: yup.string().trim().required("Village is required"),

        staffPincode: yup.string().trim().required("Pincode is required"),

        staffPassword: yup
            .string()
            .trim()
            .matches(
                /^[0-9a-zA-Z]{6}$/,
                "Password must contain exactly 6 letters or numbers",
            )
            .required("Staff password is required"),

        staffConfirm: yup
            .string()
            .oneOf([yup.ref("staffPassword"), null], "Passwords must match")
            .required("Confirm password is required"),
        status: yup.string().trim().required("Status is required"),
    });

    const { cleanText } = Common();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
        setLoading(true);
        const newData = {
            ...values,
            staffName: cleanText(values.staffName),
            staffEmail: cleanText(values.staffEmail),
        };
        const updatePayload = {
            ...values,
            staffName: cleanText(values.staffName),
            staffEmail: cleanText(values.staffEmail),
            staffConfirm: values.staffPassword
        };
        try {
            if (visible) {
                const res = await dispatch(updateStaff(editData.id, updatePayload))
                if (res.success) {
                    dispatch(fetchStaffID());
                    resetForm();
                    Toast({ message: "Updated Successfully", type: "success" });
                    setEditModal(false)
                    setLoading(false)
                } else {
                    const backendErrors = res?.error || {};
                    const mappedErrors = {};

                    if (backendErrors.staff_email)
                        mappedErrors.staffEmail = backendErrors.staff_email;

                    if (backendErrors.staff_mobile)
                        mappedErrors.staffMobile = backendErrors.staff_mobile;

                    if (backendErrors.staff_name)
                        mappedErrors.staffName = backendErrors.staff_name;

                    setErrors(mappedErrors);

                    Object.keys(mappedErrors).forEach((field) => {
                        formik.setFieldTouched(field, true, false);
                    });
                }
            } else {
                const res = await dispatch(addStaff(newData));
                if (res.success) {
                    dispatch(fetchStaffID());
                    resetForm();
                    Toast({ message: "Added Successfully", type: "success" });
                    setLoading(false)
                } else {
                    const backendErrors = res?.error || {};
                    const mappedErrors = {};

                    if (backendErrors.staff_email)
                        mappedErrors.staffEmail = backendErrors.staff_email;

                    if (backendErrors.staff_mobile)
                        mappedErrors.staffMobile = backendErrors.staff_mobile;

                    if (backendErrors.staff_name)
                        mappedErrors.staffName = backendErrors.staff_name;

                    setErrors(mappedErrors);

                    Object.keys(mappedErrors).forEach((field) => {
                        formik.setFieldTouched(field, true, false);
                    });
                }
            }
        }
        catch (error) {
            setLoading(false)
        }


    };

    const formik = useFormik({
        initialValues: {
            staffId: "",
            staffName: "",
            staffEmail: "",
            staffMobile: "",
            staffAadhaar: "",
            staffAddress: "",
            staffBranch: "",
            staffGroup: "",
            staffState: "",
            staffDistrict: "",
            staffTaluk: "",
            staffVillage: "",
            staffPincode: "",
            staffPassword: "",
            staffConfirm: "",
            role: "",
            status: "Enable",
        },
        validationSchema: staffValidationSchema,
        onSubmit,
    });

    const GroupData = useSelector((state) => state.GroupType.GroupTypeData);
    const BranchData = useSelector((state) => state.Branch.BranchData);

    useEffect(() => {
        dispatch(fetchGroupType());
        dispatch(fetchBranch());
    }, [dispatch]);

    const options = GroupData.map((data) => ({
        value: data.id,
        label: data.group_name,
    }));

    const branchOptions = BranchData.map((data) => ({
        value: data.id,
        label: data.branch_name,
    }));

    return (
        <>

            <div className="col-lg-12 ">
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className="row">
                        <div className="col-md-12 col-lg-6 mb-3  ">
                            <label htmlFor="lastName" className="form-label">
                                Staff ID
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                readOnly
                                name="staffId"
                                value={formik.values.staffId}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.staffId && formik.touched.staffId ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.staffId}
                                </p>
                            ) : null}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3  ">
                            <label htmlFor="lastName" className="form-label">
                                Staff Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="staffName"
                                value={formik.values.staffName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.staffName && formik.touched.staffName ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.staffName}
                                </p>
                            ) : null}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3  ">
                            <label htmlFor="lastName" className="form-label">
                                Email ID
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                name="staffEmail"
                                value={formik.values.staffEmail}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete="new-password"
                            />
                            {formik.errors.staffEmail && formik.touched.staffEmail ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.staffEmail}
                                </p>
                            ) : null}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3  ">
                            <label htmlFor="lastName" className="form-label">
                                Adhaar Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="staffAadhaar"
                                value={formik.values.staffAadhaar}
                                onChange={(e) => {
                                    let value = e.target.value.replace(/\D/g, "");
                                    value = value.slice(0, 12);
                                    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
                                    formik.setFieldValue("staffAadhaar", value);
                                }}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.staffAadhaar && formik.touched.staffAadhaar ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.staffAadhaar}
                                </p>
                            ) : null}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3  ">
                            <label htmlFor="lastName" className="form-label">
                                Phone number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="staffMobile"
                                value={formik.values.staffMobile}
                                onChange={(e) => {
                                    let value = e.target.value.replace(/\D/g, "");
                                    value = value.slice(0, 10);
                                    formik.setFieldValue("staffMobile", value);
                                }}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.staffMobile && formik.touched.staffMobile ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.staffMobile}
                                </p>
                            ) : null}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3  ">
                            <label htmlFor="lastName" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="staffAddress"
                                value={formik.values.staffAddress}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.staffAddress && formik.touched.staffAddress ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.staffAddress}
                                </p>
                            ) : null}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                            <label className="form-label">Group Type</label>
                            <Select
                                name="staffGroup"
                                options={options}
                                value={options.find(
                                    (option) => option.value === formik.values.staffGroup,
                                )}
                                onChange={(selectedOption) => {
                                    formik.setFieldValue("staffGroup", selectedOption.value);
                                }}
                                onBlur={() => formik.setFieldTouched("staffGroup", true)}
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderColor: state.isFocused ? "#e7e7e7" : "#e7e7e7",
                                        fontSize: "13px",
                                    }),
                                    option: (baseStyles) => ({
                                        ...baseStyles,
                                        fontSize: "12px",
                                        color: "black",
                                    }),
                                }}
                            />
                            {formik.errors.staffGroup && formik.touched.staffGroup ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.staffGroup}
                                </p>
                            ) : null}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                            <label className="form-label">Branch</label>
                            <Select
                                name="staffBranch"
                                options={branchOptions}
                                value={branchOptions.find(
                                    (option) => option.value === formik.values.staffBranch,
                                )}
                                onChange={(selectedOption) => {
                                    formik.setFieldValue("staffBranch", selectedOption.value);
                                }}
                                onBlur={() => formik.setFieldTouched("staffBranch", true)}
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderColor: state.isFocused ? "#e7e7e7" : "#e7e7e7",
                                        fontSize: "13px",
                                    }),
                                    option: (baseStyles) => ({
                                        ...baseStyles,
                                        fontSize: "12px",
                                        color: "black",
                                    }),
                                }}
                            />
                            {formik.errors.staffBranch && formik.touched.staffBranch ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.staffBranch}
                                </p>
                            ) : null}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                            <label className="form-label">State</label>
                            <GeneralState
                                value={formik.values.staffState}
                                onChange={(value) => {
                                    formik.setFieldValue("staffState", value);
                                    formik.setFieldValue("staffDistrict", "");
                                    formik.setFieldValue("staffTaluk", "");
                                    formik.setFieldValue("staffVillage", "");
                                }}
                                onBlur={() => formik.setFieldTouched("staffState", true)}
                                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                            />
                            {formik.errors.staffState && formik.touched.staffState ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.staffState}
                                </p>
                            ) : null}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                            <label className="form-label">District</label>
                            <GeneralDistrict
                                stateId={formik.values.staffState}
                                value={formik.values.staffDistrict}
                                onChange={(value) => {
                                    formik.setFieldValue("staffDistrict", value);
                                    formik.setFieldValue("staffTaluk", "");
                                    formik.setFieldValue("staffVillage", "");
                                }}
                                onBlur={() => formik.setFieldTouched("staffDistrict", true)}
                            />
                            {formik.errors.staffDistrict && formik.touched.staffDistrict ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.staffDistrict}
                                </p>
                            ) : null}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                            <label className="form-label">Taluk</label>
                            <GeneralTalukDropdown
                                districtId={formik.values.staffDistrict}
                                value={formik.values.staffTaluk}
                                onChange={(value) => {
                                    formik.setFieldValue("staffTaluk", value);
                                    formik.setFieldValue("staffVillage", "");
                                }}
                                onBlur={() => formik.setFieldTouched("staffTaluk", true)}
                            />
                            {formik.errors.staffTaluk && formik.touched.staffTaluk ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.staffTaluk}
                                </p>
                            ) : null}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                            <label className="form-label">Village</label>
                            <GeneralVillageDropdown
                                talukId={formik.values.staffTaluk}
                                value={formik.values.staffVillage}
                                onChange={(value) =>
                                    formik.setFieldValue("staffVillage", value)
                                }
                                onBlur={() => formik.setFieldTouched("staffVillage", true)}
                            />
                            {formik.errors.staffVillage && formik.touched.staffVillage ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.staffVillage}
                                </p>
                            ) : null}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3 ">
                            <label className="form-label">Pincode</label>
                            <GeneralPincodeDropdown
                                villageId={formik.values.staffVillage}
                                value={formik.values.staffPincode}
                                onChange={(value) =>
                                    formik.setFieldValue("staffPincode", value)
                                }
                                onBlur={() => formik.setFieldTouched("staffPincode", true)}
                            />
                            {formik.errors.staffPincode && formik.touched.staffPincode ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.staffPincode}
                                </p>
                            ) : null}
                        </div>

                        <div className="col-md-12 col-lg-6 mb-3  ">
                            <label htmlFor="lastName" className="form-label">
                                Password
                            </label>
                            <input
                                type={visible ? "text" : "password"}
                                className="form-control"
                                name="staffPassword"
                                value={formik.values.staffPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.staffPassword && formik.touched.staffPassword ? (
                                <p style={{ color: "red", fontSize: "14px" }}>
                                    {formik.errors.staffPassword}
                                </p>
                            ) : null}
                        </div>

                        {!visible && (
                            <div className="col-md-12 col-lg-6 mb-3  ">
                                <label htmlFor="lastName" className="form-label">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="staffConfirm"
                                    value={formik.values.staffConfirm}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.staffConfirm && formik.touched.staffConfirm ? (
                                    <p style={{ color: "red", fontSize: "14px" }}>
                                        {formik.errors.staffConfirm}
                                    </p>
                                ) : null}
                            </div>
                        )}

                        <div className="col-md-12 col-lg-6 mb-3 ">
                            <label className="form-label">Status</label>
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

                        <div className="text-end  ">
                            <button
                                className="btn1 me-1"
                                type="button"
                                onClick={() => formik.resetForm()}
                            >
                                Clear
                            </button>
                            <button type="submit" className="  btn1" disabled={loading}>
                                {loading ? "Adding..." : "Add"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default StaffCreation;
