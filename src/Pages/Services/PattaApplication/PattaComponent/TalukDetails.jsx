import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import customStyle from "../../../../Utils/tableStyle";
import API_BASE_URL from "../../../../Api/api";
import axios from "axios";
import Toast from "../../../../Utils/Toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaluk } from "../../../../Redux/Actions/MasterPage/TalukAction";
import { fetchSRODetails } from "../../../../Redux/Actions/MasterPage/SRODetailsAction";
import { talukDetailsGetThunk } from "../../../../Redux/Actions/MasterPage/TalukDetailsThunk";
import { MultiSelect } from "primereact/multiselect";
import Spinner from "react-bootstrap/Spinner";

const TalukDetails = ({ eid, id, status, rowId, pagetype }) => {
    const staffid = JSON.parse(localStorage.getItem("token"));
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteId, setdeleteId] = useState(null);
    const [loading, setLoading] = useState(true);
    const enquiryDoumentData = useSelector(
        (state) => state.Enquiry.enquiryDocument
    );

    useEffect(() => {
        dispatch(talukDetailsGetThunk());
        dispatch(fetchTaluk());
        dispatch(fetchSRODetails());
    }, []);
    const talukOfficeData = useSelector(
        (state) => state.talukDetailsData.get.data
    );
    const TalukData = useSelector((state) => state.Taluk.TalukData);
    const SRODetailsData = useSelector(
        (state) => state.SRODetails.SRODetailsData
    );

    const [wholeData, setWholeData] = useState([]);
    const fetchWholeData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/officelist/${rowId}`);
            setWholeData(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchWholeData();
    }, []);
    const [postLoading, setPostLoading] = useState(false);
    const onSubmit = async (values) => {
        const payload = {
            ...values,
            talukPersonName: values.talukPersonName.map((item) => item.code),
            talukPersonNo: values.talukPersonNo.map((item) => item.code),
            sroPersonName: values.sroPersonName.map((item) => item.code),
            sroPersonNo: values.sroPersonNo.map((item) => item.code),
            enqid: eid,
            docid: id,
            rowId: rowId,
        };
        setPostLoading(true);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/officecreate`,
                payload
            );
            fetchWholeData();
            formik.resetForm();

            if (payload.id) {
                Toast({ message: "Successfully Updated", type: "success" });
                setEditing(false);
            } else {
                Toast({ message: "Successfully Created", type: "success" });
            }
            formik.resetForm();
            setPostLoading(false);
        } catch (error) {
            Toast({ message: "Failed to save", type: "error" });
            setPostLoading(false);
        }
    };

    const column1 = [
        {
            name: "S.no",
            cell: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Taluk",
            selector: (row) => row.taluk_name,
            sortable: true,
        },
        {
            name: "Taluk Office",
            selector: (row) => row.office,
            sortable: true,
        },
        {
            name: "Sro",
            selector: (row) => row.sro_title,
            sortable: true,
        },
        {
            name: "Taluk Contact Person",
            selector: (row) => {
                try {
                    const names = JSON.parse(row.contact);
                    return Array.isArray(names) ? names.join(", ") : "";
                } catch (error) {
                    return "Invalid Format";
                }
            },
            sortable: true,
        },
        {
            name: "Taluk Contact Number",
            selector: (row) => {
                try {
                    const names = JSON.parse(row.mobnumber);
                    return Array.isArray(names) ? names.join(", ") : "";
                } catch (error) {
                    return "Invalid Format";
                }
            },
            sortable: true,
        },
        {
            name: "Sro Contact Number",
            selector: (row) => {
                try {
                    const names = JSON.parse(row.srocontact);
                    return Array.isArray(names) ? names.join(", ") : "";
                } catch (error) {
                    return "Invalid Format";
                }
            },
            sortable: true,
        },
        {
            name: "Sro Contact Number",
            selector: (row) => {
                try {
                    const names = JSON.parse(row.sromobnumber);
                    return Array.isArray(names) ? names.join(", ") : "";
                } catch (error) {
                    return "Invalid Format";
                }
            },
            sortable: true,
        },

        ...(staffid.logintype == "staff" &&
            (status === "complete" || status === "pending") &&
            pagetype !== "reminder" &&
            enquiryDoumentData?.status !== "live"
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
                `${API_BASE_URL}/officedelete/${deleteId}`
            );
            Toast({ message: "Successfully deleted", type: "success" });
            fetchWholeData();
            setDeleteDialog(false);
        } catch (error) {
            console.error(error);
        }
    };
    // const handleEdit = (row) => {
    //     setEditing(true)
    //     const parseTalukPersonName = row.contact ? JSON.parse(row.contact) : [];
    //     const parseTalukPersonNo = row.mobnumber ? JSON.parse(row.mobnumber) : [];
    //     const parseSroPersonName = row.srocontact ? JSON.parse(row.srocontact) : [];
    //     const parsedSroPersonNo = row.sromobnumber ? JSON.parse(row.sromobnumber) : [];
    //     const talukPersonNameObjects = parseTalukPersonName.map((item) => ({
    //         value: item,
    //         label: item,
    //     }));

    //     const talukPersonNoObjects = parseTalukPersonNo.map((item) => ({
    //         value: item,
    //         label: item,
    //     }));

    //     const sroPersonNameObjects = parseSroPersonName.map((item) => ({
    //         value: item,
    //         label: item,
    //     }));

    //     const sroPersonNoObjects = parsedSroPersonNo.map((item) => ({
    //         value: item,
    //         label: item,
    //     }));

    //     formik.setFieldValue('talukPersonName', talukPersonNameObjects);
    //     formik.setFieldValue('talukPersonNo', talukPersonNoObjects);
    //     formik.setFieldValue('sroPersonName', sroPersonNameObjects);
    //     formik.setFieldValue('sroPersonNo', sroPersonNoObjects);
    //     formik.setFieldValue('taluk', row.type)
    //     formik.setFieldValue('talukOffice', row.taluk_office);
    //     formik.setFieldValue('talukoffice', row.toffice)
    //     formik.setFieldValue('sro', row.sroname)
    //     formik.setFieldValue('id', row.id)
    // }

    // const handleEdit = (row) => {
    //     setEditing(true);

    //     formik.setFieldValue('taluk', row.type);
    //     formik.setFieldValue('talukOffice', row.taluk_office);
    //     formik.setFieldValue('sro', row.sroname);
    //     formik.setFieldValue('id', row.id);

    //     const parseTalukPersonName = row.contact ? JSON.parse(row.contact) : [];

    //     const parseTalukPersonNo = row.mobnumber ? JSON.parse(row.mobnumber) : [];
    //     const parseSroPersonName = row.srocontact ? JSON.parse(row.srocontact) : [];
    //     const parsedSroPersonNo = row.sromobnumber ? JSON.parse(row.sromobnumber) : [];

    //     const talukPersonNameObjects = contactTalukPersonNameOptions.filter(option =>
    //         parseTalukPersonName.includes(option.value)
    //     );
    //     formik.setFieldValue('talukPersonName', talukPersonNameObjects);

    //     // formik.setFieldValue('talukPersonName', talukPersonNameObjects);
    //     const talukPersonNoObjects = parseTalukPersonNo.map((item) => ({
    //         value: item,
    //         label: item,
    //     }));

    //     const sroPersonNameObjects = parseSroPersonName.map((item) => ({
    //         value: item,
    //         label: item,
    //     }));

    //     const sroPersonNoObjects = parsedSroPersonNo.map((item) => ({
    //         value: item,
    //         label: item,
    //     }));

    //     // formik.setFieldValue('talukPersonName', talukPersonNameObjects);
    //     formik.setFieldValue('talukPersonNo', talukPersonNoObjects);
    //     formik.setFieldValue('sroPersonName', sroPersonNameObjects);
    //     formik.setFieldValue('sroPersonNo', sroPersonNoObjects);
    // };
    // const handleEdit = (row) => {
    //     setEditing(true);

    //     formik.setFieldValue('taluk', row.type);
    //     formik.setFieldValue('talukOffice', row.taluk_office);
    //     formik.setFieldValue('sro', row.sroname);
    //     formik.setFieldValue('id', row.id);

    //     const parseTalukPersonName = row.contact ? JSON.parse(row.contact) : [];
    //     const parseTalukPersonNo = row.mobnumber ? JSON.parse(row.mobnumber) : [];
    //     const parseSroPersonName = row.srocontact ? JSON.parse(row.srocontact) : [];
    //     const parsedSroPersonNo = row.sromobnumber ? JSON.parse(row.sromobnumber) : [];

    //     const talukPersonNameObjects = contactTalukPersonNameOptions.filter(option =>
    //         parseTalukPersonName.includes(option.value)
    //     );

    //     const talukPersonNoObjects = contactTalukPersonNoOptions.filter(option =>
    //         parseTalukPersonNo.includes(option.value)
    //     );

    //     const sroPersonNameObjects = contactSroPersonNameOptions.filter(option =>
    //         parseSroPersonName.includes(option.value)
    //     );

    //     const sroPersonNoObjects = contactSroPersonNoOptions.filter(option =>
    //         parsedSroPersonNo.includes(option.value)
    //     );

    //     formik.setFieldValue('talukPersonName', talukPersonNameObjects);
    //     formik.setFieldValue('talukPersonNo', talukPersonNoObjects);
    //     formik.setFieldValue('sroPersonName', sroPersonNameObjects);
    //     formik.setFieldValue('sroPersonNo', sroPersonNoObjects);

    // };
    const handleEdit = (row) => {
        setEditing(true);

        formik.setFieldValue("taluk", row.type);
        formik.setFieldValue("talukOffice", row.taluk_office);
        formik.setFieldValue("sro", row.sroname);
        formik.setFieldValue("id", row.id);

        const parseTalukPersonName = row.contact ? JSON.parse(row.contact) : [];
        const parseTalukPersonNo = row.mobnumber ? JSON.parse(row.mobnumber) : [];
        const parseSroPersonName = row.srocontact ? JSON.parse(row.srocontact) : [];
        const parseSroPersonNo = row.sromobnumber
            ? JSON.parse(row.sromobnumber)
            : [];

        const talukPersonNameObjects = parseTalukPersonName.map((item) => ({
            name: item,
            code: item,
        }));

        const talukPersonNoObjects = parseTalukPersonNo.map((item) => ({
            name: item,
            code: item,
        }));

        const SroPersonNameObjects = parseSroPersonName.map((item) => ({
            name: item,
            code: item,
        }));
        const SroPersonNoObjects = parseSroPersonNo.map((item) => ({
            name: item,
            code: item,
        }));

        formik.setFieldValue("talukPersonName", talukPersonNameObjects);
        formik.setFieldValue("talukPersonNo", talukPersonNoObjects);
        formik.setFieldValue("sroPersonName", SroPersonNameObjects);
        formik.setFieldValue("sroPersonNo", SroPersonNoObjects);
    };

    const formik = useFormik({
        initialValues: {
            taluk: "",
            talukOffice: "",
            sro: "",
            talukPersonName: [],
            talukPersonNo: [],
            sroPersonName: [],
            sroPersonNo: [],
        },
        validationSchema: yup.object({
            // pattatype: yup.string().required('Taluk Office is required'),
            // personName: yup.array().min(1, 'At least one person must be selected').required('Required'),
        }),
        onSubmit,
    });
    const [contactPersonNameTalukData, setContactPersonNameTalukData] = useState(
        []
    );
    const [contactPersonNoTalukData, setContactPersonNoTalukData] = useState([]);
    const [contactPersonNameSroData, setContactPersonNameSroData] = useState([]);
    const [contactPersonNoSroData, setContactPersonNoSroData] = useState([]);

    const fetchTalukContactPersonNo = async (talukOfficeId) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/contactPerson/${talukOfficeId}`,
                {
                    headers: {
                        "Pr-Root": "taluk",
                    },
                }
            );
            setContactPersonNoTalukData(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSroContactPersonNo = async (talukOfficeId) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/contactPerson/${talukOfficeId}`,
                {
                    headers: {
                        "Pr-Root": "sro",
                    },
                }
            );
            setContactPersonNoSroData(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTalukContactPersonName = async (talukOfficeId) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${API_BASE_URL}/contactPerson/${talukOfficeId}/edit`,
                {
                    headers: {
                        "Pr-Root": "taluk",
                    },
                }
            );
            setContactPersonNameTalukData(response.data);
        } catch (error) {
            console.error("Error fetching contact person data:", error);
        } finally {
            setLoading(false);
        }
    };
    const fetchSroContactPersonName = async (talukOfficeId) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${API_BASE_URL}/contactPerson/${talukOfficeId}/edit`,
                {
                    headers: {
                        "Pr-Root": "sro",
                    },
                }
            );
            setContactPersonNameSroData(response.data);
        } catch (error) {
            console.error("Error fetching contact person data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (formik.values.talukOffice) {
            fetchTalukContactPersonName(formik.values.talukOffice);
            fetchTalukContactPersonNo(formik.values.talukOffice);
        }
    }, [formik.values.talukOffice]);
    useEffect(() => {
        if (formik.values.sro) {
            fetchSroContactPersonName(formik.values.sro);
            fetchSroContactPersonNo(formik.values.sro);
        }
    }, [formik.values.sro]);

    // const contactTalukPersonNameOptions = contactPersonNameTalukData?.map((item, index) => ({

    //     value: item,
    //     label: item,

    // }));
    const contactTalukPersonNameOptions = contactPersonNameTalukData?.map(
        (item, index) => ({
            name: item,
            code: item,
        })
    );

    // const contactTalukPersonNoOptions = contactPersonNoTalukData?.map((item, index) => ({
    //     value: item,
    //     label: item,
    // }));
    const contactTalukPersonNoOptions = contactPersonNoTalukData?.map(
        (item, index) => ({
            name: item,
            code: item,
        })
    );

    // const contactSroPersonNameOptions = contactPersonNameSroData?.map((item, index) => ({
    //     value: item,
    //     label: item,
    // }));
    const contactSroPersonNameOptions = contactPersonNameSroData?.map(
        (item, index) => ({
            name: item,
            code: item,
        })
    );
    // const contactSroPersonNoOptions = contactPersonNoSroData?.map((item, index) => ({
    //     value: item,
    //     label: item,
    // }));
    const contactSroPersonNoOptions = contactPersonNoSroData?.map(
        (item, index) => ({
            name: item,
            code: item,
        })
    );

    return (
        <>
            <div className="mt-3">
                <div className="mt-3">
                    {loading ? (
                        <div
                            style={{
                                height: "32vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Spinner className="mt-auto" />
                        </div>
                    ) : (
                        (wholeData.length === 0 || editing) && (
                            <form onSubmit={formik.handleSubmit} autoComplete="off">
                                <div className="d-flex justify-content-center">
                                    <div className="form-group col-6">
                                        <label className="form-label">
                                            {" "}
                                            Taluk : <span style={{ color: "red" }}>*</span>{" "}
                                        </label>
                                        <select
                                            type="text"
                                            className="form-select"
                                            name="taluk"
                                            id="taluk"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.taluk}
                                        >
                                            <option>Select Taluk ... </option>
                                            {TalukData?.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.taluk_name}{" "}
                                                </option>
                                            ))}
                                        </select>

                                        {formik.errors.taluk && formik.touched.taluk ? (
                                            <p style={{ color: "red", fontSize: "12px" }}>
                                                {formik.errors.taluk}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <h6 className="text-start col-6 ">Taluk Details</h6>
                                    <h6 className="col-6">Sro Details</h6>
                                    <hr />
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group ">
                                            <label className="form-label">
                                                {" "}
                                                Taluk Office : <span style={{ color: "red" }}>
                                                    *
                                                </span>{" "}
                                            </label>
                                            <select
                                                type="text"
                                                className="form-select"
                                                name="talukOffice"
                                                id="talukOffice"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.talukOffice}
                                            >
                                                <option>Select Taluk office ... </option>
                                                {talukOfficeData
                                                    ?.filter(
                                                        (taluk) => taluk.talukname === formik.values.taluk
                                                    )
                                                    .map((item) => (
                                                        <option key={item.id} value={item.id}>
                                                            {" "}
                                                            {item.office}{" "}
                                                        </option>
                                                    ))}
                                            </select>

                                            {formik.errors.talukOffice &&
                                                formik.touched.talukOffice ? (
                                                <p style={{ color: "red", fontSize: "12px" }}>
                                                    {formik.errors.talukOffice}
                                                </p>
                                            ) : null}
                                        </div>
                                        <div className="form-group mt-3">
                                            {/* <CMultiSelect
                                        options={contactTalukPersonNameOptions}
                                        name="talukPersonName"
                                        label="Contact Person Name"
                                        search="global"
                                        value={formik.values.talukPersonName.length ? formik.values.talukPersonName : []}
                                        onChange={(selectedOptions) => {
                                            formik.setFieldValue("talukPersonName", selectedOptions);
                                        }}
                                    /> */}
                                            <MultiSelect
                                                value={
                                                    formik.values.talukPersonName.length
                                                        ? formik.values.talukPersonName
                                                        : []
                                                }
                                                // onChange={(selectedOptions) => {
                                                //     formik.setFieldValue("talukPersonName", selectedOptions);
                                                // }}
                                                onChange={(e) => {
                                                    formik.setFieldValue("talukPersonName", e.value);
                                                }}
                                                options={contactTalukPersonNameOptions}
                                                optionLabel="name"
                                                placeholder="Select Contact Person Name"
                                                className="w-full md:w-20rem"
                                            />

                                            {formik.errors.talukPersonName &&
                                                formik.touched.talukPersonName ? (
                                                <p style={{ color: "red", fontSize: "12px" }}>
                                                    {formik.errors.talukPersonName}
                                                </p>
                                            ) : null}
                                        </div>
                                        <div className="form-group mt-3">
                                            {/* <CMultiSelect
                                        options={contactTalukPersonNoOptions}
                                        name="talukPersonNo"
                                        label="contact Person No"
                                        search="global"
                                        value={formik.values.talukPersonNo}
                                        onChange={(selectedOptions) => {
                                            formik.setFieldValue("talukPersonNo", selectedOptions);
                                        }}
                                    /> */}
                                            <MultiSelect
                                                value={formik.values.talukPersonNo}
                                                // onChange={(selectedOptions) => {

                                                //     formik.setFieldValue("talukPersonNo", selectedOptions);
                                                // }}
                                                onChange={(e) => {
                                                    formik.setFieldValue("talukPersonNo", e.value);
                                                }}
                                                options={contactTalukPersonNoOptions}
                                                optionLabel="name"
                                                placeholder="Select Contact Person No"
                                                className="w-full md:w-20rem"
                                            />

                                            {formik.errors.talukPersonNo &&
                                                formik.touched.talukPersonNo ? (
                                                <p style={{ color: "red", fontSize: "12px" }}>
                                                    {formik.errors.talukPersonNo}
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group ">
                                            <label className="form-label">
                                                {" "}
                                                Sro : <span style={{ color: "red" }}>*</span>{" "}
                                            </label>
                                            <select
                                                type="text"
                                                className="form-select"
                                                name="sro"
                                                id="sro"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.sro}
                                            >
                                                <option>Select Sro ... </option>
                                                {SRODetailsData?.filter(
                                                    (taluk) => taluk.sro_taluk === formik.values.taluk
                                                ).map((item) => (
                                                    <option key={item.id} value={item.id}>
                                                        {" "}
                                                        {item.sro_title}{" "}
                                                    </option>
                                                ))}
                                            </select>

                                            {formik.errors.sro && formik.touched.sro ? (
                                                <p style={{ color: "red", fontSize: "12px" }}>
                                                    {formik.errors.sro}
                                                </p>
                                            ) : null}
                                        </div>
                                        <div className="form-group mt-3">
                                            {/* <CMultiSelect
                                        options={contactSroPersonNameOptions}
                                        name="sroPersonName"
                                        label="contact Person No"
                                        search="global"
                                        value={formik.values.sroPersonName}
                                        onChange={(selectedOptions) => {
                                            formik.setFieldValue("sroPersonName", selectedOptions);
                                        }}
                                    /> */}
                                            <MultiSelect
                                                value={formik.values.sroPersonName}
                                                // onChange={(selectedOptions) => {
                                                //     formik.setFieldValue("sroPersonName", selectedOptions);
                                                // }}
                                                onChange={(e) => {
                                                    formik.setFieldValue("sroPersonName", e.value);
                                                }}
                                                options={contactSroPersonNameOptions}
                                                optionLabel="name"
                                                placeholder="Select Contact Person Name"
                                                className="w-full md:w-20rem"
                                            />

                                            {formik.errors.sroPersonName &&
                                                formik.touched.sroPersonName ? (
                                                <p style={{ color: "red", fontSize: "12px" }}>
                                                    {formik.errors.sroPersonName}
                                                </p>
                                            ) : null}
                                        </div>
                                        <div className="form-group mt-3">
                                            {/* <CMultiSelect
                                        options={contactSroPersonNoOptions}
                                        name="sroPersonNo"
                                        label="contact Person No"
                                        search="global"
                                        value={formik.values.sroPersonNo}
                                        onChange={(selectedOptions) => {
                                            formik.setFieldValue("sroPersonNo", selectedOptions);
                                        }}
                                    /> */}
                                            <MultiSelect
                                                value={formik.values.sroPersonNo}
                                                // onChange={(selectedOptions) => {
                                                //     formik.setFieldValue("sroPersonNo", selectedOptions);
                                                // }}
                                                onChange={(e) => {
                                                    formik.setFieldValue("sroPersonNo", e.value);
                                                }}
                                                options={contactSroPersonNoOptions}
                                                optionLabel="name"
                                                placeholder="Select Contact Person No"
                                                className="w-full md:w-20rem"
                                            />

                                            {formik.errors.sroPersonNo &&
                                                formik.touched.sroPersonNo ? (
                                                <p style={{ color: "red", fontSize: "12px" }}>
                                                    {formik.errors.sroPersonNo}
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end mt-4">
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        disabled={postLoading}
                                    >
                                        {postLoading ? "Submitting..." : "Submit"}
                                    </Button>
                                </div>
                            </form>
                        )
                    )}
                    {!loading && wholeData.length > 0 && !editing && (
                        <div className="mt-5">
                            <DataTable
                                persistTableHead={true}
                                columns={column1}
                                data={wholeData}
                                customStyles={customStyle}
                                pagination
                                fixedHeader
                            />
                        </div>
                    )}
                </div>
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

export default TalukDetails;
