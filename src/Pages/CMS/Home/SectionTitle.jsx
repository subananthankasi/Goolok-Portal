import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import { Button } from "rsuite";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import Toast from "../../../Utils/Toast";

const SectionTitle = ({ visible, setVisible, section }) => {
    const [loading, setLoading] = useState(false);
    const [getData, setGetData] = useState(null);




    const onSubmit = async (values, { resetForm }) => {
        setLoading(true);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/sectiontitle`,
                values
            );

            Toast({
                message: values.id
                    ? "Title updated successfully"
                    : "Title saved successfully",
                type: "success",
            });

            await fetchSectionTitle();

            resetForm();
            setVisible(false);

        } catch (error) {
            Toast({
                message:
                    error.response?.data?.message ||
                    "Failed to save title",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };
    const formik = useFormik({
        initialValues: {
            id: "",
            title: "",
            sub_title: "",
            section_type: section || "",
        },

        validationSchema: yup.object({
            // title: yup
            //     .string()
            //     .trim()
            //     .required("Title is required!"),

            // sub_title: yup
            //     .string()
            //     .trim()
            //     .required("Sub-Title is required!"),
        }),

        enableReinitialize: false,

        onSubmit

    });

    // Fetch title for selected section
    const fetchSectionTitle = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/sectiontitle`,
                {
                    headers: {
                        "Gl-Status": section,
                    },
                }
            );

            const data = response.data?.data || [];

            setGetData(data);

            // Existing section title
            if (data.length > 0) {
                const existingData = data[0];

                formik.setValues({
                    id: existingData.id || "",
                    title: existingData.title || "",
                    sub_title: existingData.sub_title || "",
                    section_type: existingData.section_type || section,
                });
            } else {
                // No title for this section
                formik.resetForm({
                    values: {
                        id: "",
                        title: "",
                        sub_title: "",
                        section_type: section || "",
                    },
                });
            }

        } catch (error) {
            console.log("Section title fetch error:", error);
        }
    };

    // Fetch whenever section changes
    useEffect(() => {
        if (section) {
            fetchSectionTitle();
        }
    }, [section]);

    // When modal opens, fetch latest data
    useEffect(() => {
        if (visible && section) {
            fetchSectionTitle();
        }
    }, [visible, section]);

    const handleClose = () => {
        formik.resetForm({
            values: {
                id: "",
                title: "",
                sub_title: "",
                section_type: section || "",
            },
        });

        setVisible(false);
    };

    return (
        <Dialog
            header={
                formik.values.id
                    ? "Edit Section Title"
                    : "Add Section Title"
            }
            visible={visible}
            style={{ width: "30vw" }}
            onHide={handleClose}
        >
            <form onSubmit={formik.handleSubmit}>

                {/* Title */}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>

                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        placeholder="Enter title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    {formik.touched.title &&
                        formik.errors.title && (
                            <small className="text-danger">
                                {formik.errors.title}
                            </small>
                        )}
                </div>

                {/* Sub Title */}
                <div className="mb-3">
                    <label
                        htmlFor="sub_title"
                        className="form-label"
                    >
                        Sub-Title
                    </label>

                    <input
                        type="text"
                        id="sub_title"
                        name="sub_title"
                        className="form-control"
                        placeholder="Enter sub-title"
                        value={formik.values.sub_title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    {formik.touched.sub_title &&
                        formik.errors.sub_title && (
                            <small className="text-danger">
                                {formik.errors.sub_title}
                            </small>
                        )}
                </div>

                {/* Section Type */}
                <div className="mb-3">
                    <label className="form-label">
                        Section
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={formik.values.section_type}
                        disabled
                    />
                </div>

                {/* Buttons */}
                <div className="d-flex gap-2 justify-content-end">

                    <Button
                        color="blue"
                        appearance="primary"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : formik.values.id
                                ? "Update"
                                : "Save"}
                    </Button>

                    <Button
                        color="red"
                        appearance="ghost"
                        type="button"
                        onClick={() => formik.resetForm()}
                    >
                        Clear
                    </Button>

                </div>
            </form>
        </Dialog>
    );
};

export default SectionTitle;

