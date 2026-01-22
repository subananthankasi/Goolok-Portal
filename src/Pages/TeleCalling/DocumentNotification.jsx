import axios from "axios";
import React, {  useEffect,useState } from "react";
import API_BASE_URL from "../../Api/api";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Toast from "../../Utils/Toast";
import FileView from "../../Utils/FileView/FileView";
import FollowUp from "./FollowUp";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FollowUpView from "./FollowUpView";


function DocumentNotification() {
  
  const { eid } = useParams();
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  useEffect(() => {
    fetchTelecomData(eid);
  }, [eid]);

  const fetchTelecomData = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/telecall/1`);
      setLoading(false);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching telecom data:", error);
    }
  };

  const [fileErrors, setFileErrors] = React.useState({});
  const [formData, setFormData] = React.useState({
    pid: eid,
    staffid: staffid.loginid,
    id: [],
    document: [],
  });
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);

  // document upload
  const handleChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const validTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];

    if (file && validTypes.includes(file.type)) {
      setFormData((prevData) => {
        const idIndex = prevData.id.indexOf(name);

        if (idIndex !== -1) {
          const updatedDocuments = [...prevData.document];
          updatedDocuments[idIndex] = file;

          return {
            ...prevData,
            document: updatedDocuments,
          };
        } else {
          return {
            ...prevData,
            id: [...prevData.id, name],
            document: [...prevData.document, file],
          };
        }
      });

      setFileErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    } else {
      setFileErrors((prevErrors) => ({
        ...prevErrors,
        [name]:
          "Invalid file type. Please upload a PDF, PNG, JPEG, or JPG file.",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(fileErrors).some((error) => error !== "");
    const hasAllFiles =
      formData.id.length > 0 && formData.document.length === formData.id.length;

    if (hasErrors || !hasAllFiles) {
      alert("Please fill in all fields or upload a valid file");
      return;
    }

    setLoadingSubmit(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/telecallupdate`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoadingSubmit(false);
      Toast({ message: "Document successfully Updated", type: "success" });
      fetchTelecomData(eid);
    } catch (error) {
      Toast({ message: "Failed! Please try again later!", type: "error" });
      setLoadingSubmit(false);
    }
  };

  // base on status
  const renderBasedOnDocumentType = () => {
    switch (data.docstatus) {
      case "pending":
      case "redo":
        return (
          <>
            <div className="row mt-4">
              <label className="mb-2" style={{ fontSize: "10px" }}>
                <b>Note :</b> Please upload a file in PDF, PNG, JPEG, or JPG
                format only!
              </label>

              {data?.body?.map((doc) => (
                <>
                  <div className="d-flex mb-3" key={doc.id}>
                    <div className="me-4">
                      <label
                        style={{ fontSize: "14px" }}
                        className="mb-1 text-dark"
                      >
                        <b> {doc.doc_type} :</b>
                      </label>
                    </div>
                    <div className="">
                    <input
                            type="file"
                            name={doc.docid}
                            className="form-control"
                            onChange={handleChange}
                            accept=".pdf,.png,.jpeg,.jpg"
                            key={`${doc.docid}-${data.docstatus}`} // Unique key for re-rendering
                          />
                          {fileErrors[doc.docid] && (
                            <p className="validation_msg">
                              {fileErrors[doc.docid]}
                            </p>
                          )}

                      {/* {data.notifstatus === "complete" ? (
                        <a
                          onClick={() =>
                            viewFileUrl(`${IMG_PATH}/enquiry/${doc.document}`)
                          }
                          className="btn btn-warning ms-2"
                          download
                        >
                          <RemoveRedEyeIcon />
                        </a>
                      ) : (
                        <>
                          <input
                            type="file"
                            name={doc.docid}
                            className="form-control"
                            onChange={handleChange}
                            accept=".pdf,.png,.jpeg,.jpg"
                            key={`${doc.docid}-${data.docstatus}`} // Unique key for re-rendering
                          />
                          {fileErrors[doc.docid] && (
                            <p className="validation_msg">
                              {fileErrors[doc.docid]}
                            </p>
                          )}
                        </>
                      )} */}
                    </div>

                    <div className="ms-4">
                        <a
                          href="#0"
                          onClick={handleSubmit}
                          className="btn1 me-2"
                        >
                          {loadingSubmit ? (
                            <>
                              <Spinner animation="border" size="sm" />
                              <span className="ms-2">Please wait...</span>
                            </>
                          ) : (
                            "Update"
                          )}
                        </a>
                      </div> 

                    {/* {data.notifstatus == "complete" ? (
                      ""
                    ) : (
                      <div className="ms-4">
                        <a
                          href="#0"
                          onClick={handleSubmit}
                          className="btn1 me-2"
                        >
                          {loadingSubmit ? (
                            <>
                              <Spinner animation="border" size="sm" />
                              <span className="ms-2">Please wait...</span>
                            </>
                          ) : (
                            "Update"
                          )}
                        </a>
                      </div>
                    )} */}
                  </div>
                </>
              ))}
            </div>
          </>
        );

      // case "verify":
      //   return (
      //     <>
      //       <div style={{minHeight:"200px"}}>
      //         <h5>{data.title}</h5>
      //         <p><i style={{ fontSize: "15px", fontWeight: "500" }}>Note:</i> {data.message}</p>
      //       </div>
      //     </>
      //   );

      default:
        return <p>Unknown status.</p>;
    }
  };

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [isModalOpenView, setIsModalOpenView] = useState(false);
  const openModalView = () => {
    setIsModalOpenView(true);
  };
  const closeModalView = () => {
    setIsModalOpenView(false);
  };

 
  return (
    <>
      <FileView
        isOpen={isModalOpenFile}
        closeModal={closeModalFile}
        fileUrls={url}
      />
      <FollowUp isOpen={isModalOpen} closeModal={closeModal}/> 
      <FollowUpView isOpen={isModalOpenView} closeModal={closeModalView}/> 
      
        
          <div >
            {loading ? (
              <div
                style={{
                  height: "32vh",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Spinner className="mt-auto" />
              </div>
            ) : (
              <> 

                <div className="col-12 mt-4">
                  
                    <div className="card shadow border-0 p-4">
                    <div className="d-flex justify-content-between">
                           <h6>Document Update</h6>
                          <div className="ms-2">
                            <a
                              href="#0"
                              onClick={()=>openModal()}
                              className="btn1 me-2"
                            >
                              + Follow up
                            </a>
                            <a
                              href="#0"
                              onClick={()=>openModalView()}
                              className="btn1 me-2"
                            >
                            <VisibilityIcon />
                             </a>
                          </div>
                        </div>
                      <hr />

                      <div className="col-lg-8 col-12 mt-3">
                        <h5>{data.title}</h5>
                        <p style={{ fontSize: "13px" }}>{data.message}</p>

                        <div className="mt-2">
                          {data?.type === "document" &&
                            renderBasedOnDocumentType()}
                        </div>
                      </div>
                    </div>
                 
                </div> 

              </>
            )}
          </div>
     
    </>
  );
}

export default DocumentNotification;



 