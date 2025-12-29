import { useFormik } from 'formik'
import React from 'react'
import { useEffect, useState } from "react";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal, Button, TagPicker } from "rsuite";
import DataTable from "react-data-table-component";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toast from '../../../../Utils/Toast';
import customStyle from "../../../../Utils/tableStyle";
import { Dialog } from 'primereact/dialog';
import Stack from '@mui/material/Stack';
import MuiButton from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import API_BASE_URL from '../../../../Api/api';

const CustomerCareService = () => {

    const navigate = useNavigate()

    const [newDialog, setNewDialog] = useState(false)
    const [fetchbanner, setFetchbanner] = useState([])
    
    const [deleteconfirmmodal, setDeleteconfirmmodal] = useState(false)
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const [fetchServicename, setFetchServicename] = useState([])
    
    const [isSubmitting, setIsSubmitting] = useState(false);


    const columns = [
        {
            name: "S.no",
            selector: (row, index) => index + 1,
            sortable: true,
        },

        {
            name: "MenuName",
            selector: (row) => row.service_title,
            sortable: true,

        },
        {
            name: "Question ",
            selector: (row) => {
                try {
                    const answer = JSON.parse(row.question_answer);
                    return answer.map((n) => n.question).join(", ");
                } catch {
                    return "";
                }
            },
            sortable: true,
            width: "180px",
        },

        {
            name: "Answer",
            selector: (row) => {
                try {
                    const answer = JSON.parse(row.question_answer);
                    return answer.map((n) => n.answer).join(", ");
                } catch {
                    return "";
                }
            },
            sortable: true,
            width: "180px",

        },

        {
            name: "ButtonText",
            selector: (row) => row.button_text,
            sortable: true,
        },
        {
            name: "ButtonUrl",
            selector: (row) => row.button_url,
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
                        onClick={() => {
                            setDeleteconfirmmodal(true);
                            setSelectedRowId(row.id);
                        }}
                    >
                        <DeleteIcon />
                    </button>
                </div>
            ),
        },
    ];

    const handleEdit = (row) => {
       
        setNewDialog(true);

        formik.setFieldValue("id", row.id || "");
        formik.setFieldValue("service_id", row.service_id || "");

        try {
            const qa = row.question_answer ? JSON.parse(row.question_answer) : [];
            formik.setFieldValue("question", qa.map((n) => n.question) || [""]);
            formik.setFieldValue("answer", qa.map((n) => n.answer) || [""]);
        } catch (error) {
            console.error("Error parsing question_answer:", error);
            formik.setFieldValue("question", [""]);
            formik.setFieldValue("answer", [""]);
        }

        formik.setFieldValue("button_text", row.button_text || "");
        formik.setFieldValue("button_url", row.button_url || "");
        formik.setFieldValue("status", row.status || "");

    };
    const fetchRoles = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/customercareviewall`,);

            // setFetchbanner(response.data);
            setFetchbanner(response.data?.data || []);
          
        } catch (error) {
           
        }
    };

    useEffect(() => {
        fetchRoles()
    }, [])

    const fetchRolesServiceCreation = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/servicename`, {
                // headers: {
                //   "Gl-status": "service_block2",
                // },

            });

            // setFetchbanner(response.data);
            setFetchServicename(response.data?.data || []);
        } catch (error) {
         
        }
    };

    useEffect(() => {
        fetchRolesServiceCreation()
    }, [])

    const onSubmit = async (values) => {
       
        setIsSubmitting(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/customercare`, values, {
                headers: { "Content-Type": "multipart/form-data" },

            });
            Toast({ message: "Successfully Created", type: "success" });
            setNewDialog(false)
            await fetchRoles()
            formik.resetForm();
            setPreviewImage(null)
        } catch (error) {
            const errorMessage =
                error.response?.data?.messages?.message || "Error while creating banner";

            Toast({ message: errorMessage, type: "error" });
        }
        finally {
            setIsSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            service_id: "",
            question: [""],
            answer: [""],
            button_text: "",
            button_url: "",
            status: "",
        },
        // validationSchema: yup.object().shape({
        //   service_id: yup.string().required("service_id is required!"),
        //   Question: yup.string().required("Question is required!"),
        //   answer: yup.string().required("answer is required!"),
        //   button_text: yup.string().required("button_text is required!"),
        //   button_url: yup.string().required("button_url is required!"),
        //   status: yup.string().required("Status is required"),
        // }),
        onSubmit,

    })
    const handleConfirmClosedelete = () => {
        setDeleteconfirmmodal(false)
    }
    const handleconfirmopendelete = async () => {

        try {
            await axios.delete(`${API_BASE_URL}/customercare/${selectedRowId}`);
            fetchRoles()
            Toast({ message: "Successfully Deleted", type: "success" });
        } catch (error) {
            console.error("Delete error:", error);
        } finally {
            setDeleteconfirmmodal(false);
        }

    }

    // const handleAddQuestion = () => {
    //     formik.setFieldValue("question", [...formik.values.question, ""]);
    // };

    // const handleDeleteQuestion = (index) => {
    //     const updated = formik.values.question.filter((_, i) => i !== index);
    //     formik.setFieldValue("question", updated);
    // };

    const handleAddQuestion = () => {
        formik.setFieldValue("question", [...formik.values.question, ""]);
        formik.setFieldValue("answer", [...formik.values.answer, ""]);
    };

    const handleDeleteQuestion = (index) => {
        const updatedNet = formik.values.question.filter((_, i) => i !== index);
        const updatedLink = formik.values.answer.filter((_, i) => i !== index);

        formik.setFieldValue("question", updatedNet);
        formik.setFieldValue("answer", updatedLink);
    };


    return (
        <>

            <section className="section">
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between">
                                <h4 className="page_heading">CustomerCare View Table</h4>
                                <button
                                    type="button"
                                    className="btn1"
                                    onClick={() => {
                                        setNewDialog(true);
                                    }}
                                >
                                    Add
                                </button>

                            </div>
                        </div>
                        <div className="card-body">
                            <div className="col-lg-12  mb-4">
                                <DataTable
                                    columns={columns}
                                    data={fetchbanner}
                                    customStyles={customStyle}
                                    pagination
                                    persistTableHead={true}
                                    fixedHeader
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </section>


            <Modal

                size={"40rem"}

                open={newDialog}
                onClose={() => {
                    setNewDialog(false);
                    formik.resetForm();
                    setPreviewImage(null)
                }}
            >
                <Modal.Header>
                    <Modal.Title>CustomerCare </Modal.Title>
                </Modal.Header>

                <Modal.Body
                    className="p-2"
                    style={{ overflow: "scroll", overflowX: "hidden" }}
                >
                    <form onSubmit={formik.handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="service_id">
                                MenuName
                            </label>
                            <select
                                name="service_id"
                                className="form-select"
                                value={formik.values.service_id}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">Select ...</option>
                                {fetchServicename?.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        {item.title}
                                    </option>
                                ))}

                            </select>
                            {formik.errors.service_id && formik.touched.service_id && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.service_id}
                                </p>
                            )}
                        </div>

                        {/* <div className="col-md-11 mb-3">
                            {formik.values.question.map((q, index) => (
                                <div key={index} className="d-flex align-items-start mb-2 gap-2">
                                   
                                    <div className="flex-grow-1">
                                        <label
                                            htmlFor={`question.${index}`}
                                            className="form-label"
                                        >
                                            Question
                                        </label>
                                        <textarea
                                            id={`question.${index}`}
                                            name={`question.${index}`}
                                            className="form-control"
                                            placeholder="Enter question..."
                                            value={q}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.question?.[index] &&
                                            formik.touched.question?.[index] && (
                                                <p style={{ color: "red", fontSize: "12px" }}>
                                                    {formik.errors.question[index]}
                                                </p>
                                            )}
                                    </div>

                                   
                                    <div className="d-flex  gap-2 mt-5">
                                        {index !== 0 && (
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                onClick={() => handleDeleteQuestion(index)}
                                            >
                                                <DeleteIcon />
                                            </button>
                                        )}
                                        {index === formik.values.question.length - 1 && (
                                            <button
                                                type="button"
                                                className="btn btn-outline-success"
                                                onClick={handleAddQuestion}
                                            >
                                                <AddIcon />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div> */}

                        <div className="col-md-12 mb-3">
                            <label className="form-label">Question & Answer</label>

                            {formik.values.question.map((_, index) => (
                                <div key={index} className="row mb-2 align-items-center">

                                    {/* question  */}
                                    <div className="col-md-4">
                                        <textarea
                                            type="text"
                                            name={`question[${index}]`}
                                            className="form-control"
                                            placeholder="Enter question"
                                            value={formik.values.question[index]}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.question?.[index] &&
                                            formik.touched.question?.[index] && (
                                                <p style={{ color: "red", fontSize: "12px" }}>
                                                    {formik.errors.question[index]}
                                                </p>
                                            )}
                                    </div>

                                    {/* answer  */}
                                    <div className="col-md-5">
                                        <textarea
                                            type="text"
                                            name={`answer[${index}]`}
                                            className="form-control"
                                            placeholder="Enter answer"
                                            value={formik.values.answer[index]}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.answer?.[index] &&
                                            formik.touched.answer?.[index] && (
                                                <p style={{ color: "red", fontSize: "12px" }}>
                                                    {formik.errors.answer[index]}
                                                </p>
                                            )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="col-md-3 d-flex gap-2">
                                        {index !== 0 && (
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                onClick={() => handleDeleteQuestion(index)}
                                            >
                                                <DeleteIcon />
                                            </button>
                                        )}
                                        {index === formik.values.question.length - 1 && (
                                            <button
                                                type="button"
                                                className="btn btn-outline-success"
                                                onClick={handleAddQuestion}
                                            >
                                                <AddIcon />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>



                        <div className=" mb-3 ">
                            <label htmlFor="button_text"
                                className="form-label"> ButtonText </label>
                            <input
                                type="text"
                                name="button_text"
                                className="form-control"
                                placeholder="Enter button_text"
                                value={formik.values.button_text}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.button_text && formik.touched.button_text && (
                                <small className="text-danger">{formik.errors.button_text}</small>
                            )}
                        </div>
                        <div className=" mb-3 ">
                            <label htmlFor="button_url"
                                className="form-label"> ButtonUrl </label>
                            <input
                                type="text"
                                name="button_url"
                                className="form-control"
                                placeholder="Enter button_url"
                                value={formik.values.button_url}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.button_url && formik.touched.button_url && (
                                <small className="text-danger">{formik.errors.button_url}</small>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select
                                id="status"
                                name="status"
                                className="form-select w-50"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">-- Select Status --</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            {formik.errors.status && formik.touched.status && (
                                <small className="text-danger">{formik.errors.status}</small>
                            )}
                        </div>


                        <div className=" d-flex gap-2 justify-content-end">
                            <Button
                                color="blue"
                                appearance="primary"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Saving..." : "Save"}
                            </Button>
                            <Button
                                color="red"
                                appearance="ghost"
                                onClick={() => {
                                    formik.resetForm();
                                    setPreviewImage(null)
                                }}
                            >
                                Clear
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>

            <Dialog header="Confirm Deleted " visible={deleteconfirmmodal} position="top" style={{ width: '30vw' }} onHide={() => { if (!deleteconfirmmodal) return; setDeleteconfirmmodal(false); }}>

                <div className=" form-group">
                    <p>Do you want to delete this record?</p>
                </div>
                <div className="d-flex p-3 justify-content-end mt-3">

                    <Stack direction="row" spacing={2}>
                        <MuiButton variant="outlined" color="error" onClick={() => handleConfirmClosedelete()}> No  </MuiButton>&nbsp;
                    </Stack>
                    <MuiButton variant="contained" color="success" onClick={() => handleconfirmopendelete(setSelectedRowId)}>Yes </MuiButton>
                </div>

            </Dialog>


        </>
    )
}

export default CustomerCareService