import  { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import customStyle from "../../../../Utils/tableStyle";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FileView from "../../../../Utils/FileView/FileView";
import { FileDownload } from "../../../../Utils/FileDownload";
import { useSelector } from "react-redux";

export const FinalOpinion = (props) => {
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );
  const staffid = JSON.parse(localStorage.getItem("token"));

  const column = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },

    {
      name: "View",
      cell: (row) => (
        <>
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-warning rounded-0"
              onClick={() =>
                viewFileUrl(`${IMG_PATH}/enquiry/lawyer/${row.document}`)
              }
            >
              <RemoveRedEyeIcon />
            </button>
          </div>
        </>
      ),
    },

    {
      name: "Positive Impressions",
      cell: (row) => (
        <>
          <div dangerouslySetInnerHTML={{ __html: row.positive }} />
        </>
      ),
      sortable: true,
    },
    {
      name: "Negative Impressions",
      cell: (row) => (
        <>
          <div dangerouslySetInnerHTML={{ __html: row.negative }} />
        </>
      ),
      sortable: true,
    },
    ...((props.data.status === "pending" || props.data.status === "complete") &&
    staffid.Login == "staff" &&
    props.data.pagetype !== "reminder" &&
    enquiryDoumentData?.status !== "booking"
      ? [
          {
            name: "Actions",
            cell: (row) => (
              <div className="d-flex">
                <button
                  className="btn btn-outline-info me-1 edit"
                  data-tooltip-id="edit"
                  onClick={() => {
                    setEditData(row);
                    setIsModalFinalEdit(true);
                  }}
                >
                  <EditIcon />
                </button>
              </div>
            ),
          },
        ]
      : []),
  ];

  const [loadingPage, setLoadingPage] = useState(true);
  const [opininonData, setOpinionData] = useState([]);
  const [editData, setEditData] = useState({});

  const fetchFinalOpinion = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/allopinions/${props.data.eid}`,
        {
          headers: {
            "Gl-status": "All",
          },
        }
      );
      setOpinionData(response.data);
    } catch (error) {
    } finally {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    fetchFinalOpinion();
  }, []);

  const [isModalFinal, setIsModalFinal] = useState(false);
  const [isModalFinalEdit, setIsModalFinalEdit] = useState(false);

  // view file
  const [url, setUrl] = useState("");
  const viewFileUrl = (url) => {
    setUrl(url);
    openModalFile();
  };
  const [isModalOpenFile, setIsModalOpenfile] = useState(false);
  const openModalFile = () => {
    setIsModalOpenfile(true);
  };
  const closeModalFile = () => {
    setIsModalOpenfile(false);
  };

  return (
    <>
      <FinalOpinionModal
        isOpen={isModalFinal}
        closeModal={() => setIsModalFinal(false)}
        enqid={props.data.eid}
        fetchFinalOpinion={fetchFinalOpinion}
      />

      <FinalOpinionModalEdit
        isOpen={isModalFinalEdit}
        closeModal={() => setIsModalFinalEdit(false)}
        editData={editData}
        fetchFinalOpinion={fetchFinalOpinion}
      />

      <FileView
        isOpen={isModalOpenFile}
        closeModal={closeModalFile}
        fileUrls={url}
      />

      {!loadingPage && (
        <div className="mt-5">
          <div className="  justify-content-between mb-3">
            <h6>Final opinion</h6>
            <hr />
          </div>

          {opininonData.length == "0" && staffid.logintype == "staff" ? (
            <div className="container" style={{ maxWidth: "350px" }}>
              <div className="p-4 text-center">
                <a
                  href="#0"
                  onClick={() => setIsModalFinal(true)}
                  className="btn1"
                >
                  + Create Final Opinion
                </a>
              </div>
            </div>
          ) : (
            <DataTable
              persistTableHead={true}
              columns={column}
              data={opininonData}
              customStyles={customStyle}
              pagination
              // selectableRows
              fixedHeader
            />
          )}
        </div>
      )}
    </>
  );
};

const FinalOpinionModal = ({
  isOpen,
  closeModal,
  enqid,
  fetchFinalOpinion,
}) => {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editorLoad, setEditorLoad] = useState(false);

  const [formData, setFormData] = useState({
    positive: "",
    negative: "",
    document: null,
    id: "",
    enqid: "",
    oldfile: null,
  });

  useEffect(() => {
    if (enqid) {
      setFormData({
        ...formData,
        enqid: enqid,
      });
    }

    if (isOpen) {
      setEditorLoad(true);
    }
  }, [enqid, isOpen]);

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      document: e.target.files[0],
    });
  };

  const validation = (formData) => {
    const newErrors = {};
    if (!formData.document) newErrors.document = "* file is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    const isValid = validation(formData);
    if (isValid) {
      setLoading(true);
      try {
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("positive", formData.positive);
        formDataToSubmit.append("negative", formData.negative);
        formDataToSubmit.append("document", formData.document);
        formDataToSubmit.append("enqid", formData.enqid);

        const response = await axios.post(
          `${API_BASE_URL}/addopinion`,
          formDataToSubmit,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setFormData({
          positive: "",
          negative: "",
          document: null,
        });
        setErrors({});
        setLoading(false);
        fetchFinalOpinion();
        closeModal();
      }
    }
  };

  return (
    <>
      <div
        className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="d-flex" style={{ alignItems: "center" }}>
              <h4 className="page_subheading m-3">Add final opinion</h4>
              <button
                type="button"
                className="close closebutton"
                onClick={closeModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <hr className="m-0" />
            <div className="card-body p-3">
              <form>
                <div className="mt-3">
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="row align-items-center">
                        <div className="col-4">
                          <label className="form-label">Upload file :</label>
                        </div>
                        <div className="col-8">
                          <input
                            type="file"
                            className="form-control"
                            onChange={handleFileChange} // Handle file input change
                          />
                          {errors.file && (
                            <span className="validation_msg">
                              {errors.file}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12 mb-3">
                      <div className="row">
                        <div className="col-4 mb-3">
                          <label htmlFor="positive" className="form-label">
                            Positive Impressions :
                          </label>
                        </div>
                        {editorLoad && (
                          <div className="col-8 mb-3">
                            <CKEditor
                              editor={ClassicEditor}
                              data={formData.positive}
                              onChange={(event, editor) => {
                                const data = editor?.getData();
                                setFormData((prevData) => ({
                                  ...prevData,
                                  positive: data,
                                }));
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12 mb-3">
                      <div className="row">
                        <div className="col-4 mb-3">
                          <label htmlFor="negative" className="form-label">
                            Negative Impressions :
                          </label>
                        </div>

                        {editorLoad && (
                          <div className="col-8 mb-3">
                            <CKEditor
                              editor={ClassicEditor}
                              data={formData.negative || ""}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                setFormData((prevData) => ({
                                  ...prevData,
                                  negative: data,
                                }));
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-end">
                    <button
                      className="btn1 me-1"
                      type="button"
                      onClick={() => {
                        setFormData({
                          positive: "",
                          negative: "",
                          document: null,
                        });
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
                      {loading ? "Submitting..." : "Add"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const FinalOpinionModalEdit = ({
  isOpen,
  closeModal,
  editData,
  fetchFinalOpinion,
}) => {
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editorLoad, setEditorLoad] = useState(false);

  const [formData, setFormData] = useState({
    positive: "",
    negative: "",
    document: null,
    id: "",
    enqid: "",
    oldfile: null,
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        document: "",
        oldfile: editData.document,
      });
    }

    if (isOpen) {
      setEditorLoad(true);
    }
  }, [editData, isOpen]);

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      document: e.target.files[0],
    });
  };

  const validation = (formData) => {
    const newErrors = {};
    if (!formData.oldfile) newErrors.document = "* file is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    const isValid = validation(formData);
    if (isValid) {
      setLoading(true);
      try {
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("positive", formData.positive);
        formDataToSubmit.append("negative", formData.negative);
        formDataToSubmit.append("document", formData.document);
        formDataToSubmit.append("oldfile", formData.oldfile);
        formDataToSubmit.append("enqid", formData.enqid);
        formDataToSubmit.append("id", formData.id);

        const response = await axios.post(
          `${API_BASE_URL}/addopinion`,
          formDataToSubmit,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setFormData({
          positive: "",
          negative: "",
          document: null,
        });
        setErrors({});
        fetchFinalOpinion();
        setLoading(false);
        fileInputRef.current.value = "";
        closeModal();
      }
    }
  };

  return (
    <>
      <div
        className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="d-flex" style={{ alignItems: "center" }}>
              <h4 className="page_subheading m-3">Update data</h4>
              <button
                type="button"
                className="close closebutton"
                onClick={closeModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <hr className="m-0" />
            <div className="card-body p-3">
              <form>
                <div className="mt-3">
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="row align-items-center">
                        <div className="col-4">
                          <label className="form-label">Upload file :</label>
                        </div>
                        <div className="col-8">
                          <div className="row">
                            <div className="col-10">
                              <input
                                type="file"
                                className="form-control"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                              />
                            </div>

                            <div className="col-2 text-end">
                              <button
                                type="button"
                                className="btn btn-warning rounded-0"
                                onClick={() =>
                                  FileDownload(
                                    `${IMG_PATH}/enquiry/lawyer/${formData.oldfile}`
                                  )
                                }
                              >
                                <RemoveRedEyeIcon />
                              </button>
                            </div>
                          </div>
                          {errors.document && (
                            <span className="validation_msg">
                              {errors.document}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12 mb-3">
                      <div className="row">
                        <div className="col-4 mb-3">
                          <label htmlFor="positive" className="form-label">
                            Positive Impressions :
                          </label>
                        </div>
                        <div className="col-8 mb-3">
                          {editorLoad && (
                            <CKEditor
                              editor={ClassicEditor}
                              data={formData.positive ? formData?.positive : ""}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                setFormData((prevData) => ({
                                  ...prevData,
                                  positive: data,
                                }));
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12 mb-3">
                      <div className="row">
                        <div className="col-4 mb-3">
                          <label htmlFor="negative" className="form-label">
                            Negative Impressions :
                          </label>
                        </div>
                        <div className="col-8 mb-3">
                          {editorLoad && (
                            <CKEditor
                              editor={ClassicEditor}
                              data={formData.negative ? formData.negative : ""}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                setFormData((prevData) => ({
                                  ...prevData,
                                  negative: data,
                                }));
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-end">
                    <button
                      className="btn1 me-1"
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          positive: "",
                          negative: "",
                          document: null,
                        });
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
                      {loading ? "Saving......." : "Save"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
