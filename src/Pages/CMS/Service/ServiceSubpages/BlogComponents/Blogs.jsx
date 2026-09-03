
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "react-data-table-component";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import { Editor } from "primereact/editor";
import { Switch } from 'antd';
import customStyle from "../../../../../Utils/tableStyle";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../../../../Api/api";
import Toast from "../../../../../Utils/Toast";

const Blogs = ({ eid, id, status }) => {

    // main = 2
    // other = 1

    const [newDialog, setNewDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [getData, setGetData] = useState("")
    const [editing, setEditing] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [currentImage, setCurrentImage] = useState("");


    const fetch = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/blogbanner`);
            setGetData(response.data?.data || []);
        } catch (error) { }
    };

    useEffect(() => {
        fetch()
    }, []);


    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append("blog_banner", values.blog_banner);
            formData.append("id", values.id || "");
            formData.append("title", values.title);
            // formData.append("date", values.date);
            formData.append("blog_type", values.blog_type);
            formData.append("introduction", values.introduction);
            formData.append("status", values.status);
            formData.append("theme", values.theme);
            formData.append(
                "tableOfContents",
                JSON.stringify(values.tableOfContents)
            );
            formData.append(
                "sourceLinks",
                JSON.stringify(values.sourceLinks)
            );
            const res = await axios.post(
                `${API_BASE_URL}/blogbanner`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            Toast({
                message: editing ? "Updated Successfully" : "Created Successfully",
                type: "success",
            });
            fetch();
            hideDialog();

        } catch (err) {
            Toast({
                message:
                    err.response?.data?.messages?.error ||
                    "Something went wrong",
                type: "error",
            });
        }
    };
    const formik = useFormik({
        initialValues: {
            blog_banner: "",
            title: "",
            blog_type: 1,
            date: "",
            introduction: "",
            status: "",
            theme: "light",
            tableOfContents: [
                {
                    title: "",
                    description: ""
                }
            ],
            sourceLinks: [
                {
                    title: "",
                    link: ""
                }
            ]
        },

        validationSchema: yup.object({
            blog_banner: yup.mixed().test(
                "banner",
                "Banner is required",
                function (value) {
                    if (editing) return true;
                    return value instanceof File;
                }
            ),
            title: yup.string().required("Title is required"),
            // date: yup.string().required("Date is required"),
            introduction: yup.string().required("Introduction is required"),
            status: yup.string().required("Status is required"),

            tableOfContents: yup.array().of(
                yup.object({
                    title: yup.string().required("Content title is required"),
                    description: yup.string().required("Description is required")
                })
            ),
            sourceLinks: yup.array().of(
                yup.object({
                    title: yup.string().required("title is required"),
                    link: yup.string().required("link is required")
                })
            )
        }),

        onSubmit
    });

    const hideDialog = () => {
        setNewDialog(false);
        setEditing(false);
        setCurrentImage("");
        formik.resetForm();
    };

    const handleEdit = (row) => {
        setEditing(true);
        setCurrentImage(row.image);

        formik.setValues({
            id: row.id,
            blog_banner: row.image,
            title: row.title,
            // date: row.created_at,
            introduction: row.introduction,
            status: row.status,
            theme: row.theme,
            blog_type: row.blog_type,
            tableOfContents: row.contents || [],
            sourceLinks: row.sourceLinks || [],
        });
        console.log("reeee", row)

        setNewDialog(true);
    };
    const openDelete = (row) => {
        setDeleteDialog(true);
        setDeleteId(row.id);
    };
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/blogbanner/${deleteId}`);
            Toast({
                message: "Deleted Successfully",
                type: "success",
            });
            setDeleteDialog(false)
            fetch()

        } catch (error) { }
    };


    const column1 = [
        {
            name: "S.No",
            cell: (row, index) => index + 1,
            sortable: true,
            width: "80px",
        },
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Date",
            selector: (row) => row.formatted_date,
            sortable: true,
        },
        {
            name: "Banner",
            cell: (row) => (
                row.image ? (
                    <img
                        src={`${IMG_PATH}/blog_banner/${row.image}`}
                        alt="Banner"
                        style={{
                            width: "80px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "6px",
                        }}
                    />
                ) : (
                    <span>No Image</span>
                )
            ),
        },
        {
            name: "Introduction",
            cell: (row) => {
                const text = row.introduction
                    ?.replace(/<[^>]+>/g, "")
                    ?.substring(0, 100);

                return (
                    <span title={text}>
                        {text}...
                    </span>
                );
            },
            grow: 2,
        },
        {
            name: "Table of Content",
            cell: (row) => (
                <div>
                    {row.contents?.length > 0 ? (
                        row.contents?.map((item, index) => (
                            <div key={index} style={{ marginBottom: "8px" }}>
                                <strong>{index + 1}. {item.title}</strong>
                            </div>
                        ))
                    ) : (
                        <span>-</span>
                    )}
                </div>
            ),
            grow: 2,
        },
        {
            name: "Source Links",
            cell: (row) => (
                <div>
                    {row.sourceLinks?.length > 0 ? (
                        row.sourceLinks?.map((item, index) => (
                            <div key={index} style={{ marginBottom: "8px" }}>
                                <strong>{index + 1}. {item.title}</strong>
                            </div>
                        ))
                    ) : (
                        <span>-</span>
                    )}
                </div>
            ),
            grow: 2,
        },
        {
            name: "BlogType",
            width: "100px",
            cell: (row) => (
                <span
                    className={`badge ${row.blog_type === "2" || row.blog_type === 2
                        ? "bg-primary"
                        : "bg-secondary"
                        }`}
                >
                    {row.blog_type === "2" || row.blog_type === 2
                        ? "Main"
                        : "Other"}
                </span>
            ),
            sortable: true,
        },
        {
            name: "Theme",
            selector: (row) => row.theme,
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
                        className="btn btn-outline-info me-1 edit"
                        onClick={() => handleEdit(row)}
                    >
                        <EditIcon />
                    </button>

                    <button
                        className="btn btn-outline-danger delete"
                        onClick={() => openDelete(row)}
                    >
                        <DeleteIcon />
                    </button>
                </div>
            ),
        },

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
    const handleAdd = () => {
        setEditing(false);
        setCurrentImage("");

        formik.resetForm();

        setNewDialog(true);
    };

    return (
        <>
            <section className="mt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header  p-3 d-flex justify-content-between">
                                    <h6>Blogs</h6>

                                    <button

                                        onClick={handleAdd}
                                        className="btn1 me-2"
                                    >
                                        + Add
                                    </button>

                                </div>
                                <div className="card-body p-3">
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*new modal */}

            <Dialog
                visible={newDialog}
                style={{ width: "52rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Add Blog Banner"
                modal
                className="p-fluid"
                onHide={hideDialog}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div>
                        <div className="form-group mt-3">
                            <label htmlFor="" className="form-label me-2"> Blog Type :</label>
                            <label htmlFor="" className="form-label me-2">Other</label>
                            <Switch
                                checked={formik.values.blog_type === 2}
                                onChange={(checked) => {
                                    formik.setFieldValue("blog_type", checked ? 2 : 1);
                                }}

                            />
                            <label htmlFor="" className="form-label ms-2">Main</label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Blog Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            {formik.touched.title && formik.errors.title &&
                                <small className="text-danger">
                                    {formik.errors.title}
                                </small>
                            }
                        </div>
                        {/* <div className="mb-3">
                            <label className="form-label">Date</label>

                            <input
                                type="date"
                                name="date"
                                className="form-control"
                                value={formik.values.date}
                                onChange={formik.handleChange}
                            />
                        </div> */}
                        <div className="form-group mb-3">
                            <label htmlFor="exterior" className="form-label">
                                Blog Banner :
                            </label>
                            <input
                                type="file"
                                id="blog_banner"
                                name="blog_banner"
                                className="form-select mt-1"
                                onChange={(e) => {
                                    formik.setFieldValue("blog_banner", e.target.files[0]);
                                }}
                                onBlur={formik.handleBlur}
                            />
                            {editing && currentImage && (
                                <button
                                    type="button"
                                    className="btn btn-outline-primary mt-1"
                                    onClick={() =>
                                        window.open(
                                            `${IMG_PATH}/blog_banner/${currentImage}`,
                                            "_blank"
                                        )
                                    }
                                >
                                    Preview
                                </button>
                            )}
                            {formik.errors.blog_banner && formik.touched.blog_banner && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.blog_banner}
                                </p>
                            )}
                        </div>
                        <div className="mb-3">

                            <label className="form-label">Introduction</label>

                            <Editor
                                style={{ height: "250px" }}
                                value={formik.values.introduction}
                                onTextChange={(e) => {
                                    formik.setFieldValue(
                                        "introduction",
                                        e.htmlValue
                                    );
                                }}
                            />

                            {
                                formik.errors.introduction &&
                                <small className="text-danger">
                                    {formik.errors.introduction}
                                </small>
                            }

                        </div>
                        <h6 className="mt-4">
                            Table Of Contents :
                        </h6>

                        {
                            formik.values.tableOfContents.map((item, index) => (

                                <div
                                    key={index}
                                    className="border rounded p-3 mb-3"
                                >

                                    <div className="mb-3">

                                        <label className="form-label">Content Title</label>

                                        <input
                                            className="form-control"
                                            value={item.title}
                                            onChange={(e) => {

                                                const data = [...formik.values.tableOfContents];

                                                data[index].title = e.target.value;

                                                formik.setFieldValue(
                                                    "tableOfContents",
                                                    data
                                                );

                                            }}
                                        />

                                    </div>


                                    <div>

                                        <label className="form-label">Description</label>

                                        <Editor

                                            style={{ height: "220px" }}

                                            value={item.description}

                                            onTextChange={(e) => {

                                                const data = [...formik.values.tableOfContents];

                                                data[index].description = e.htmlValue;

                                                formik.setFieldValue(
                                                    "tableOfContents",
                                                    data
                                                );

                                            }}

                                        />

                                    </div>

                                    <button

                                        type="button"

                                        className="btn btn-danger mt-3"

                                        onClick={() => {

                                            const data = [...formik.values.tableOfContents];

                                            data.splice(index, 1);

                                            formik.setFieldValue(
                                                "tableOfContents",
                                                data
                                            );

                                        }}

                                    >

                                        Remove

                                    </button>

                                </div>

                            ))
                        }
                        <button
                            type="button"
                            className="btn btn-primary"

                            onClick={() => {

                                formik.setFieldValue(

                                    "tableOfContents",

                                    [
                                        ...formik.values.tableOfContents,

                                        {
                                            title: "",
                                            description: ""
                                        }

                                    ]

                                );

                            }}
                        >

                            + Add Content

                        </button>


                        {/* .................SorceLinks Start.............. */}

                        <h6 className="mt-4">
                            Source Links :
                        </h6>

                        {
                            formik.values?.sourceLinks.map((item, index) => (

                                <div
                                    key={index}
                                    className="border rounded p-3 mb-3"
                                >

                                    <div className="mb-3">

                                        <label className="form-label"> Title</label>

                                        <input
                                            className="form-control"
                                            placeholder="Enter title"
                                            value={item.title}
                                            onChange={(e) => {

                                                const data = [...formik.values.sourceLinks];

                                                data[index].title = e.target.value;

                                                formik.setFieldValue(
                                                    "sourceLinks",
                                                    data
                                                );

                                            }}
                                        />

                                    </div>


                                    <div>

                                        <label className="form-label">Link</label>

                                        <input
                                            className="form-control"
                                            value={item.link}
                                            placeholder="Enter links"
                                            onChange={(e) => {

                                                const data = [...formik.values.sourceLinks];

                                                data[index].link = e.target.value;

                                                formik.setFieldValue(
                                                    "sourceLinks",
                                                    data
                                                );

                                            }}
                                        />

                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-danger mt-3"
                                        onClick={() => {
                                            const data = [...formik.values.sourceLinks];
                                            data.splice(index, 1);
                                            formik.setFieldValue(
                                                "sourceLinks",
                                                data
                                            );

                                        }}

                                    >
                                        Remove
                                    </button>

                                </div>
                            ))
                        }
                        <button
                            type="button"
                            className="btn btn-primary"

                            onClick={() => {

                                formik.setFieldValue(

                                    "sourceLinks",

                                    [
                                        ...formik.values.sourceLinks,

                                        {
                                            title: "",
                                            link: ""
                                        }

                                    ]

                                );

                            }}
                        >
                            + Add Links

                        </button>

                        {/* .................SorceLinks end.............. */}

                        <div className="form-group mt-3">
                            <label htmlFor="" className="form-label me-2">Dark Theme :</label>
                            <Switch
                                checked={formik.values.theme === "dark"}
                                onChange={(checked) => {
                                    formik.setFieldValue("theme", checked ? "dark" : "light");
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                className="form-select"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">-- Select Status --</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            {formik.errors.status && formik.touched.status && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.status}
                                </p>
                            )}
                        </div>

                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <button
                            type="button"
                            className="btn1"
                            onClick={() => formik.resetForm()}
                        >
                            Clear
                        </button>
                        <button
                            type="submit"
                            className="btn1"
                        // onClick={() => setEditing(false)}
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


        </>
    );
};

export default Blogs;


