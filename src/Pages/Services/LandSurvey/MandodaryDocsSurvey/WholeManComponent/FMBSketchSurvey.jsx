import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
// import customStyle from "../../../../Utils/tableStyle";
import axios from "axios";
// import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import Spinner from "react-bootstrap/Spinner";
// import Toast from "../../../../Utils/Toast";
// import { DateFormatcustom } from "../../../../Utils/DateFormatcustom";
import { confirmDialog } from "primereact/confirmdialog";
// import FileView from "../../../../Utils/FileView/FileView";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { DateFormatcustom } from "../../../../../Utils/DateFormatcustom";
import API_BASE_URL, { IMG_PATH } from "../../../../../Api/api";
import Toast from "../../../../../Utils/Toast";
import FileView from "../../../../../Utils/FileView/FileView";
import customStyle from "../../../../../Utils/tableStyle";
import { useSelector } from "react-redux";

export const FMBSketchSurvey = (props) => {
    const staffid = JSON.parse(sessionStorage.getItem("token"));

    const enquiryDoumentData = useSelector(
        (state) => state.Enquiry.enquiryDocument
    );

    // view file
    const [url, setUrl] = useState("");
    const viewFileUrl = (url) => {
        setUrl(url);
        setIsModalOpenfile(true);
    };
    const [isModalOpenFile, setIsModalOpenfile] = useState(false);

    const column1 = [
        {
            name: "S.no",
            cell: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Date",
            selector: (row) => DateFormatcustom(row.created_at),
            sortable: true,
        },
        {
            name: "File",
            cell: (row) => (
                <>
                    <button
                        type="button"
                        className="btn btn-warning rounded-0"
                        onClick={() =>
                            viewFileUrl(`${IMG_PATH}/enquiry/sketch/${row.document}`)
                        }
                    >
                        <RemoveRedEyeIcon />
                    </button>
                </>
            ),
            sortable: true,
        },

        ...((props.props.status === "pending" ||
            props.props.status === "complete") &&
            staffid.Login == "staff" &&
            props.props.pagetype !== "reminder" &&
            enquiryDoumentData?.status !== "live"
            ? [
                {
                    name: "Actions",
                    cell: (row) => (
                        <>
                            <div className="d-flex">
                                {/* <button
                                    className="btn btn-outline-info me-1 edit"
                                    data-tooltip-id="edit"
                                    onClick={() => {
                                        setEditData(row);
                                        setIsModalSketchEdit(true);
                                    }}
                                >
                                    <EditIcon />
                                </button> */}
                                <button
                                    className="btn btn-outline-danger delete"
                                    data-tooltip-id="delete"
                                    onClick={() => handleDelete(row)}
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

    const [loadingPage, setLoadingPage] = useState(true);
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({});

    const fetchFmbSketch = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/allsketch/${props.props.eid}`
            );
            setData(response.data);
        } catch {
        } finally {
            setLoadingPage(false);
        }
    };

    useEffect(() => {
        fetchFmbSketch();
    }, []);

    //   modal open and close
    const [isModalSketch, setIsModalSketch] = useState(false);

    // edit
    const [isModalSketchEdit, setIsModalSketchEdit] = useState(false);

    const handleDelete = async (row) => {
        const confirm1 = () => {
            confirmDialog({
                message: "Are you sure you want to delete this item?",
                header: "Confirmation",
                icon: "pi pi-exclamation-triangle",
                defaultFocus: "accept",
                acceptClassName: "custom-accept-button",
                accept,
            });
        };
        const accept = async () => {
            try {
                await axios.delete(`${API_BASE_URL}/sketchdelete/${row.id}`);
                Toast({ message: "Successfully Deleted", type: "success" });
            } catch (error) {
                Toast({ message: "Failed to delete item", type: "error" });
                console.error("Error deleting item:", error);
            } finally {
                fetchFmbSketch();
            }
        };

        confirm1();
    };

    return (
        <>
            <AddSketch
                isOpen={isModalSketch}
                closeModal={() => setIsModalSketch(false)}
                enqid={props.props.eid}
                fetchFmbSketch={fetchFmbSketch}
            />

            <EditSketch
                isOpen={isModalSketchEdit}
                closeModal={() => setIsModalSketchEdit(false)}
                fetchFmbSketch={fetchFmbSketch}
                editData={editData}
            />

            <FileView
                isOpen={isModalOpenFile}
                closeModal={() => setIsModalOpenfile(false)}
                fileUrls={url}
            />

            {!loadingPage && (
                <div>
                    <div className="">
                        <div className="d-flex justify-content-between mb-3">
                            <h6>Final FMB sketch</h6>

                            {(props.props.status === "pending" ||
                                props.props.status === "complete") &&
                                staffid.Login === "staff" &&
                                props.props.pagetype !== "reminder" &&
                                enquiryDoumentData?.status !== "live" && (
                                    <div className="ms-2">
                                        <a
                                            href="#"
                                            onClick={() => setIsModalSketch(true)}
                                            className="btn1 me-2"
                                        >
                                            + Add
                                        </a>
                                    </div>
                                )}
                        </div>
                        <hr />
                        <DataTable
                            persistTableHead={true}
                            columns={column1}
                            data={data}
                            customStyles={customStyle}
                            pagination
                            // selectableRows
                            fixedHeader
                        />
                    </div>
                </div>
            )}
        </>
    );
};

const AddSketch = ({ isOpen, closeModal, enqid, fetchFmbSketch }) => {
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [loading, setloading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
            setErrors((prev) => ({ ...prev, file: null }));
        } else {
            setFile(null);
            setErrors((prev) => ({
                ...prev,
                file: "Only PDF files are allowed.",
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!file) {
            newErrors.file = "Please upload a file.";
        } else if (file.type !== "application/pdf") {
            newErrors.file = "Only PDF files are allowed.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("enqid", enqid);
        formData.append("file", file);
        setloading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/addsketch`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            Toast({ message: "Added successfully", type: "success" });
            closeModal();
            handleClear();
        } catch (error) {
            Toast({ message: "Error to add...Try again!", type: "error" });
        } finally {
            setloading(false);
            fetchFmbSketch();
        }
    };

    // Handle Clear button
    const handleClear = () => {
        setFile(null);
        setErrors({});
        fileInputRef.current.value = "";
    };

    return (
        <>
            <div
                className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
                tabIndex="-1"
                role="dialog"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="d-flex" style={{ alignItems: "center" }}>
                            <h4 className="page_subheading m-3">Add FMB sketch</h4>
                            <button
                                type="button"
                                className="close closebutton"
                                onClick={() => {
                                    closeModal();
                                    fileInputRef.current.value = "";
                                }}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <hr className="m-0" />
                        <div className="card-body p-3">
                            <form>
                                <div className="mt-3 mb-4 row">
                                    <div className="col-12 mt-3">
                                        <div className="row">
                                            <div className="col-4">
                                                <label className="form-label">File Upload</label>
                                            </div>
                                            <div className="col-8">
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                />
                                                {errors.file && (
                                                    <div className="validation_msg">{errors.file}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-end mt-4">
                                    <button
                                        className="btn1 me-1"
                                        type="button"
                                        onClick={() => {
                                            setErrors({});
                                            fileInputRef.current.value = "";
                                        }}
                                    >
                                        Clear
                                    </button>
                                    <button
                                        className="btn1"
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner animation="border" size="sm" />
                                                <span className="ms-2">wait...</span>
                                            </>
                                        ) : (
                                            "Add"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const EditSketch = ({ isOpen, closeModal, fetchFmbSketch, editData }) => {
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [loading, setloading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
            setErrors((prev) => ({ ...prev, file: null }));
        } else {
            setFile(null);
            setErrors((prev) => ({
                ...prev,
                file: "Only PDF files are allowed.",
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!file && !editData.document) {
            newErrors.file = "Please upload a file.";
        } else if (file.type !== "application/pdf") {
            newErrors.file = "Only PDF files are allowed.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("id", editData.id);
        formData.append("enqid", editData.enqid);
        formData.append("file", file);
        formData.append("oldfile", editData.document);
        setloading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/addsketch`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            Toast({ message: "Added successfully", type: "success" });
            closeModal();
            handleClear();
        } catch (error) {
            Toast({ message: "Error to add...Try again!", type: "error" });
        } finally {
            setloading(false);
            fetchFmbSketch();
        }
    };

    // Handle Clear button
    const handleClear = () => {
        setFile(null);
        setErrors({});
        fileInputRef.current.value = "";
    };

    return (
        <>
            <div
                className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
                tabIndex="-1"
                role="dialog"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="d-flex" style={{ alignItems: "center" }}>
                            <h4 className="page_subheading m-3">Add FMB sketch</h4>
                            <button
                                type="button"
                                className="close closebutton"
                                onClick={() => {
                                    closeModal();
                                    setErrors({});
                                }}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <hr className="m-0" />
                        <div className="card-body p-3">
                            <form>
                                <div className="mt-3 mb-4 row">
                                    <div className="col-12 mt-3">
                                        <div className="row">
                                            <div className="col-4">
                                                <label className="form-label">File Upload</label>
                                            </div>
                                            <div className="col-8">
                                                <div className="d-flex">
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        ref={fileInputRef}
                                                        onChange={handleFileChange}
                                                    />
                                                    <a
                                                        href={`${IMG_PATH}/enquiry/sketch/${editData.document}`}
                                                        class="btn btn-warning ms-1 text-end"
                                                        download="download"
                                                        target="_blank"
                                                    >
                                                        <RemoveRedEyeIcon />
                                                    </a>
                                                </div>
                                                {errors.file && (
                                                    <div className="validation_msg">{errors.file}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-end mt-4">
                                    <button
                                        className="btn1 me-1"
                                        type="button"
                                        onClick={() => {
                                            setErrors({});
                                        }}
                                    >
                                        Clear
                                    </button>
                                    <button
                                        className="btn1"
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner animation="border" size="sm" />
                                                <span className="ms-2">wait...</span>
                                            </>
                                        ) : (
                                            "Add"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
