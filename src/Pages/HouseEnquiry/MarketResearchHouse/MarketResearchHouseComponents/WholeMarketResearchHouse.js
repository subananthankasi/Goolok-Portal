import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Spinner from "react-bootstrap/Spinner";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import EditIcon from "@mui/icons-material/Edit";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import { DateFormatcustom } from "../../../../Utils/DateFormatcustom";
import Toast from "../../../../Utils/Toast";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";
import customStyle from "../../../../Utils/tableStyle";
import CustomerMarketHouse from "./CustomerMarketHouse";
import NearbyMarketHouse from "./NearbyMarketHouse";
import { useSelector } from "react-redux";

export const WholeMarketResearchHouse = ({
  eid,
  marketid,
  status,
  pagetype,
}) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [step, setStep] = useState(1);
  const [pageLoading, setPageLoading] = useState(true);
  // tab 1 ------------------------------------------------------------------------------------------------------
  const [customerdata, setCustomerdata] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [customerVisible, setCustomerVisible] = useState(false);

  const [visible, setVisible] = useState(false);
  const [nearVisible, setNearVisible] = useState(false);
  const [nearVideosVisible, setNearVideosVisible] = useState(false);
  const [videosVisible, setVideosVisible] = useState(false);
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );
  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customerprop/${eid}`, {
        headers: {
          "Gl-Status": "customer",
        },
      });
      setCustomerdata(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, [marketid]);

  // tab 2----------------------------------------------------------------------------------------------------------------
  const picturesColumns = [
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
      name: "Image",
      cell: (row) => (
        <div className="d-flex">
          <img
            src={`${IMG_PATH}/enquiry/market/${row.image}`}
            style={{ width: "100px", height: "80px", objectFit: "cover" }}
            alt=""
          ></img>
        </div>
      ),
      sortable: true,
    },

    ...(staffid.logintype == "staff" &&
      (status === "complete" || status === "pending") &&
      pagetype !== "reminder" &&
      enquiryDoumentData?.status !== "booking"
      ? [
        {
          name: "Action",
          cell: (row) => (
            <div className="d-flex">
              <button
                className="btn btn-outline-danger delete"
                data-tooltip-id="delete"
                onClick={() => {
                  setDeletePicConfirm(true);
                  setDeleteId(row.id);
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          ),
          sortable: true,
        },
      ]
      : []),
  ];
  const picturesNearColumns = [
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
      name: "Image",
      cell: (row) => (
        <div className="d-flex">
          <img
            src={`${IMG_PATH}/enquiry/market/${row.image}`}
            style={{ width: "100px", height: "80px", objectFit: "cover" }}
            alt=""
          ></img>
        </div>
      ),
      sortable: true,
    },

    ...(staffid.logintype == "staff" &&
      (status === "complete" || status === "pending") &&
      pagetype !== "reminder" &&
      enquiryDoumentData?.status !== "booking"
      ? [
        {
          name: "Action",
          cell: (row) => (
            <div className="d-flex">
              <button
                className="btn btn-outline-danger delete"
                data-tooltip-id="delete"
                onClick={() => {
                  setDeleteNearPicConfirm(true);
                  setDeleteId(row.id);
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          ),
          sortable: true,
        },
      ]
      : []),
  ];
  const videosColumns = [
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
    // {
    //   name: "Video",
    //   cell: (row) => {
    //     if (row.video_file) {
    //       const videoFileUrl = `${IMG_PATH}/enquiry/market/${row.video_file}`;

    //       return (
    //         <video width="150" height="100" controls className='mt-1 mb-1'>
    //           <source src={videoFileUrl} type="video/mp4" />
    //           Your browser does not support the video tag.
    //         </video>
    //       );
    //     }
    //   },
    //   sortable: true,
    // },
    {
      name: "Video",
      cell: (row) => {
        if (!row.video_file) return null;

        let videoUrl = row.video_file;

        if (videoUrl.includes("youtube.com/watch?v=")) {
          const videoId = videoUrl.split("v=")[1]?.split("&")[0];
          videoUrl = `https://www.youtube.com/embed/${videoId}`;
          return (
            <iframe
              width="200"
              height="120"
              src={videoUrl}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ borderRadius: "10px", backgroundColor: "#000" }}
            />
          );
        }

        if (videoUrl.includes("vimeo.com")) {
          const videoId = videoUrl.split("/").pop();
          videoUrl = `https://player.vimeo.com/video/${videoId}`;
          return (
            <iframe
              width="200"
              height="120"
              src={videoUrl}
              title="Vimeo video"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: "10px", backgroundColor: "#000" }}
            />
          );
        }

        const videoFileUrl = row.video_file.startsWith("http")
          ? row.video_file
          : `${IMG_PATH}/enquiry/market/${row.video_file}`;

        return (
          <video
            width="200"
            height="120"
            controls
            style={{ borderRadius: "10px", backgroundColor: "#000" }}
          >
            <source src={videoFileUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      },
    },

    ...(staffid.logintype == "staff" &&
      (status === "complete" || status === "pending") &&
      pagetype !== "reminder" &&
      enquiryDoumentData?.status !== "booking"
      ? [
        {
          name: "Action",
          cell: (row) => (
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-danger delete"
                data-tooltip-id="delete"
                onClick={() => {
                  setDeleteVideoConfirm(true);
                  setDeleteId(row.id);
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          ),
          sortable: true,
        },
      ]
      : []),
  ];
  const videosNearColumns = [
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
    // {
    //   name: "Video",
    //   cell: (row) => {
    //     if (row.video_file) {
    //       const videoFileUrl = `${IMG_PATH}/enquiry/market/${row.video_file}`;

    //       return (
    //         <video width="150" height="100" controls className='mt-1 mb-1'>
    //           <source src={videoFileUrl} type="video/mp4" />
    //           Your browser does not support the video tag.
    //         </video>
    //       );
    //     }
    //   },
    //   sortable: true,
    // },
    {
      name: "Video",
      cell: (row) => {
        if (!row.video_file) return null;

        let videoUrl = row.video_file;

        if (videoUrl.includes("youtube.com/watch?v=")) {
          const videoId = videoUrl.split("v=")[1]?.split("&")[0];
          videoUrl = `https://www.youtube.com/embed/${videoId}`;
          return (
            <iframe
              width="200"
              height="120"
              src={videoUrl}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ borderRadius: "10px", backgroundColor: "#000" }}
            />
          );
        }

        if (videoUrl.includes("vimeo.com")) {
          const videoId = videoUrl.split("/").pop();
          videoUrl = `https://player.vimeo.com/video/${videoId}`;
          return (
            <iframe
              width="200"
              height="120"
              src={videoUrl}
              title="Vimeo video"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: "10px", backgroundColor: "#000" }}
            />
          );
        }

        const videoFileUrl = row.video_file.startsWith("http")
          ? row.video_file
          : `${IMG_PATH}/enquiry/market/${row.video_file}`;

        return (
          <video
            width="200"
            height="120"
            controls
            style={{ borderRadius: "10px", backgroundColor: "#000" }}
          >
            <source src={videoFileUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      },
    },

    ...(staffid.logintype == "staff" &&
      (status === "complete" || status === "pending") &&
      pagetype !== "reminder" &&
      enquiryDoumentData?.status !== "booking"
      ? [
        {
          name: "Action",
          cell: (row) => (
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-danger delete"
                data-tooltip-id="delete"
                onClick={() => {
                  setDeleteNearVideoConfirm(true);
                  setDeleteId(row.id);
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          ),
          sortable: true,
        },
      ]
      : []),
  ];

  const [files, setFiles] = useState();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [deletePicConfirm, setDeletePicConfirm] = useState(false);
  const [deleteNearPicConfirm, setDeleteNearPicConfirm] = useState(false);

  const [errorFile, setErrorFile] = useState("");
  const validTypes = ["image/png", "image/jpeg", "image/jpg"];
  const handleClear = () => {
    setFiles(null);
    setErrorFile("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleVideoClear = () => {
    setVideos(null);
    setErrorFile("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!validTypes.includes(file.type)) {
      setErrorFile(
        "Invalid file type. Please upload a  PNG, JPEG, or JPG file."
      );
      return;
    }
    setFiles(file);
    setErrorFile("");
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    if (!files) {
      setErrorFile("Please select a file before submitting.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("picture", files);
    formData.append("marketid", marketid);
    formData.append("enqid", eid);
    formData.append("type", "customer");

    try {
      await axios.post(`${API_BASE_URL}/addpicture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setVisible(false);
    } catch (error) {
    } finally {
      setErrorFile("");
      setLoading(false);
      fetchCustomer();
      fileInputRef.current.value = "";
      setFiles("");
    }
  };
  const refereceHandleFileUpload = async (event) => {
    event.preventDefault();
    if (!files) {
      setErrorFile("Please select a file before submitting.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("picture", files);
    formData.append("marketid", marketid);
    formData.append("enqid", eid);
    formData.append("type", "nearby");

    try {
      await axios.post(`${API_BASE_URL}/addpicture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setNearVisible(false);
    } catch (error) {
    } finally {
      setErrorFile("");
      setLoading(false);
      fetchNear();
      fileInputRef.current.value = "";
      setFiles("");
    }
  };
  const [videos, setVideos] = useState("");

  const validVideoTypes = [
    "video/mp4",
    "video/avi",
    "video/mov",
    "video/wmv",
    "video/flv",
    "video/mkv",
  ];

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (!validVideoTypes.includes(file.type)) {
      setErrorFile(
        "Invalid file type. Please upload a video file (MP4, AVI, MOV, WMV, FLV, MKV)."
      );
      return;
    }
    setVideos(file);
    setErrorFile("");
  };

  // const HandleVideoUpload = async (event) => {
  //   event.preventDefault();
  //   if (!videos) {
  //     setErrorFile("Please select a video file before submitting.");
  //     return;
  //   }
  //   setLoading(true);

  //   const payload = {
  //     video: videos,
  //     enqid: eid,
  //     type: "customer",
  //     marketid:marketid
  //   }

  //   try {
  //     await axios.post(`${API_BASE_URL}/addvideo`, payload, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     setVideosVisible(false);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setErrorFile('');
  //     setLoading(false);
  //     fetchVideo();
  //     fileInputRef.current.value = '';
  //     setVideos('');
  //   }
  // };
  // const refereceHandleVideoUpload = async (event) => {
  //   event.preventDefault();
  //   if (!videos) {
  //     setErrorFile("Please select a video file before submitting.");
  //     return;
  //   }
  //   setLoading(true);

  //   const payload = {
  //     video: videos,
  //     enqid: eid,
  //     type: "nearby",
  //     marketid:marketid
  //   }

  //   try {
  //     await axios.post(`${API_BASE_URL}/addvideo`, payload, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     setNearVideosVisible(false);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setErrorFile('');
  //     setLoading(false);
  //     fetchNearVideo();
  //     fileInputRef.current.value = '';
  //     setVideos('');
  //   }
  // };

  // get img data
  const [customerVideoType, setCustomerVideoType] = useState("File");
  const HandleVideoUpload = async (e) => {
    e.preventDefault();

    if (!videos) {
      setErrorFile("Please provide a video file or link");
      return;
    }

    const formData = new FormData();
    formData.append("video", videos);
    formData.append("filetype", customerVideoType);
    formData.append("enqid", eid);
    formData.append("type", "customer");
    formData.append("marketid", marketid);

    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/addvideo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      setVideos("");
      setErrorFile("");
      setVideosVisible(false);
      setCustomerVideoType("File");
      fetchVideo();
    } catch (error) {
      setLoading(false);
      setErrorFile("Upload failed. Try again!");
    }
  };

  const refereceHandleVideoUpload = async (e) => {
    e.preventDefault();

    if (!videos) {
      setErrorFile("Please provide a video file or link");
      return;
    }

    const formData = new FormData();
    formData.append("video", videos);
    formData.append("filetype", customerVideoType);
    formData.append("enqid", eid);
    formData.append("type", "nearby");
    formData.append("marketid", marketid);

    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/addvideo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      setVideos("");
      setErrorFile("");
      setNearVideosVisible(false);
      setCustomerVideoType("File");
      fetchNearVideo();
    } catch (error) {
      setLoading(false);
      setErrorFile("Upload failed. Try again!");
    }
  };

  const [imgData, setImgData] = useState([]);
  const [imgNearData, setImgNearData] = useState([]);

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/customerprop/${eid}/edit`,
        {
          headers: {
            "Gl-Status": "customer",
          },
        }
      );
      setImgData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchNear = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/customerprop/${eid}/edit`,
        {
          headers: {
            "Gl-Status": "nearby",
          },
        }
      );
      setImgNearData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomer();
    fetchNear();
    fetchVideo();
    fetchNearVideo();
  }, [marketid]);

  const [customerVideos, setCustomerVideos] = useState([]);

  const fetchVideo = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/allvideo/${eid}/edit`, {
        headers: {
          "Gl-Status": "customer",
        },
      });
      setCustomerVideos(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const [nearVideosData, setNearVideosData] = useState([]);
  const fetchNearVideo = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/allvideo/${eid}/edit`, {
        headers: {
          "Gl-Status": "nearby",
        },
      });
      setNearVideosData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePicDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/customerprops/remove/${deleteId}`);
      Toast({ message: "Successfully deleted", type: "success" });
    } catch (error) {
      Toast({ message: "Error to delete! try again", type: "error" });
    } finally {
      fetchCustomer();
    }
  };
  const handlePicNearDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/customerprops/remove/${deleteId}`);
      Toast({ message: "Successfully deleted", type: "success" });
    } catch (error) {
      Toast({ message: "Error to delete! try again", type: "error" });
    } finally {
      fetchNear();
    }
  };

  const handleVideoDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/videodelete/${deleteId}`);
      Toast({ message: "Successfully deleted", type: "success" });
    } catch (error) {
      Toast({ message: "Error to delete! try again", type: "error" });
    } finally {
      fetchVideo();
    }
  };

  const handleVideoNearDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/videodelete/${deleteId}`);
      Toast({ message: "Successfully deleted", type: "success" });
    } catch (error) {
      Toast({ message: "Error to delete! try again", type: "error" });
    } finally {
      fetchNearVideo();
    }
  };
  const [deleteVideoId, setDeleteVideoId] = useState("");
  const [deleteNearVideoId, setDeleteNearVideoId] = useState("");
  const [deleteVideoConfirm, setDeleteVideoConfirm] = useState(false);
  const [deleteNearVideoConfirm, setDeleteNearVideoConfirm] = useState(false);

  // error alert
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModals = () => setModalOpen(false);

  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const navigate = useNavigate();

  const handleConfirm = async () => {
    setConfirmLoading(true);
    try {
      await axios.get(`${API_BASE_URL}/market/${marketid}`);
      Toast({ message: "Successfully Updated", type: "success" });
      setConfirmLoading(false);
      navigate("/layout_marketresearch#Complete");
    } catch (error) {
      const errorMessage =
        error.response?.data?.messages?.error ||
        error.message ||
        "Failed to update";
      setErrorMsg(errorMessage);
      handleOpenModal();
      setConfirmLoading(false);
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={verifyConfirm}
        closeModal={() => setIsVerifyConfirm(false)}
        onConfirm={handleConfirm}
        message={"Are you sure this has been verified?"}
      />

      <AlertPop
        isOpen={modalOpen}
        onClose={handleCloseModals}
        message={errorMsg}
      />

      {/* <ConfirmationModal
        isOpen={deleteConfirm}
        closeModal={() => setDeleteConfirm(false)}
        onConfirm={handleDelete}
        message={"Are you want to delete this ? "}
      /> */}
      <ConfirmationModal
        isOpen={deletePicConfirm}
        closeModal={() => setDeletePicConfirm(false)}
        onConfirm={handlePicDelete}
        message={"Are you want to delete this ? "}
      />

      <ConfirmationModal
        isOpen={deleteNearPicConfirm}
        closeModal={() => setDeleteNearPicConfirm(false)}
        onConfirm={handlePicNearDelete}
        message={"Are you want to delete this ? "}
      />
      <ConfirmationModal
        isOpen={deleteVideoConfirm}
        closeModal={() => setDeleteVideoConfirm(false)}
        onConfirm={handleVideoDelete}
        message={"Are you want to delete this ? "}
      />
      <ConfirmationModal
        isOpen={deleteNearVideoConfirm}
        closeModal={() => setDeleteNearVideoConfirm(false)}
        onConfirm={handleVideoNearDelete}
        message={"Are you want to delete this ? "}
      />

      {pageLoading ? (
        ""
      ) : (
        <div className="col-12 mt-4">
          <div className="card shadow border-0 p-4">
            <h6>Market Research</h6>
            <hr />
            <nav className="nav">
              <a
                className={`nav-link link1 ${step === 1 ? "active1" : ""}`}
                href="javascript:void(0)"
                onClick={() => setStep(1)}
              >
                Customer property
              </a>
              {/* <a
                className={`nav-link link1 ${step === 2 ? "active1" : ""}`}
                href="javascript:void(0)"
                onClick={() => setStep(2)}
              >
                Add Pictures
              </a> */}
              <a
                className={`nav-link link1 ${step === 2 ? "active1" : ""}`}
                href="javascript:void(0)"
                onClick={() => setStep(2)}
              >
                Nearby Reference properties
              </a>
            </nav>

            <div className={`${step === 1 ? "d-block" : "d-none"}`}>
              <div className="col-12 ">
                <div className="pt-3">
                  <CustomerMarketHouse
                    eid={eid}
                    marketid={marketid}
                    status={status}
                    pagetype={pagetype}
                  />

                  <div className="d-flex justify-content-between mt-5">
                    <h6>Add Pictures</h6>
                    {staffid.logintype == "staff" &&
                      (status === "complete" || status == "pending") &&
                      pagetype !== "reminder" &&
                      enquiryDoumentData?.status !== "booking" && (
                        <a
                          href="#0"
                          onClick={() => setVisible(true)}
                          className="btn1 me-2"
                        >
                          + Add
                        </a>
                      )}
                  </div>
                  <div className="mt-2">
                    <DataTable
                      persistTableHead={true}
                      columns={picturesColumns}
                      data={imgData}
                      customStyles={customStyle}
                      pagination
                      // selectableRows
                      fixedHeader
                    />
                  </div>

                  <div className="d-flex justify-content-between mt-5">
                    <h6>Add Videos</h6>
                    {staffid.logintype == "staff" &&
                      (status === "complete" || status == "pending") &&
                      pagetype !== "reminder" && enquiryDoumentData?.status !== "booking" && (
                        <a
                          href="#0"
                          onClick={() => setVideosVisible(true)}
                          className="btn1 me-2"
                        >
                          + Add
                        </a>
                      )}
                  </div>

                  <div className="mt-2">
                    <DataTable
                      persistTableHead={true}
                      columns={videosColumns}
                      data={customerVideos}
                      customStyles={customStyle}
                      pagination
                      // selectableRows
                      fixedHeader
                    />
                  </div>
                </div>
              </div>
            </div>
            <Dialog
              visible={customerVisible}
              style={{ width: "32rem" }}
              breakpoints={{ "960px": "75vw", "641px": "90vw" }}
              header="Upload Images/Videos"
              modal
              className="p-fluid"
              onHide={() => setCustomerVisible(false)}
            >
              <form>
                <div className="form-group">
                  <label htmlFor="img" className="form-label">
                    Upload Img: <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    type="file"
                    class="form-control"
                    onChange={(e) => handleFileChange(e)}
                    ref={fileInputRef}
                  />
                  {errorFile && (
                    <div className="validation_msg">{errorFile}</div>
                  )}
                </div>
                <div className="d-flex justify-content-end mt-4">
                  <button className="btn1 me-1" onClick={handleClear}>
                    Clear
                  </button>
                  <button
                    className="btn1"
                    onClick={handleFileUpload}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        />
                        Adding...
                      </>
                    ) : (
                      "Add"
                    )}
                  </button>
                </div>
              </form>
            </Dialog>
            <Dialog
              visible={visible}
              style={{ width: "32rem" }}
              breakpoints={{ "960px": "75vw", "641px": "90vw" }}
              header="Upload Images/Videos"
              modal
              className="p-fluid"
              onHide={() => setVisible(false)}
            >
              <form>
                <div className="form-group">
                  <label htmlFor="img" className="form-label">
                    Upload Img: <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    type="file"
                    class="form-control"
                    onChange={(e) => handleFileChange(e)}
                    ref={fileInputRef}
                  />
                  {errorFile && (
                    <div className="validation_msg">{errorFile}</div>
                  )}
                </div>
                <div className="d-flex justify-content-end mt-4">
                  <button className="btn1 me-1" onClick={handleClear}>
                    Clear
                  </button>
                  <button
                    className="btn1"
                    onClick={handleFileUpload}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        />
                        Adding...
                      </>
                    ) : (
                      "Add"
                    )}
                  </button>
                </div>
              </form>
            </Dialog>
            <Dialog
              visible={videosVisible}
              style={{ width: "32rem" }}
              breakpoints={{ "960px": "75vw", "641px": "90vw" }}
              header="Upload Videos"
              modal
              className="p-fluid"
              // onHide={() => setVideosVisible(false)}
              onHide={() => {
                setVideosVisible(false);
                setCustomerVideoType("File");
                setVideos("");
                setErrorFile("");
              }}
            >
              {/* <form>
                <div className="form-group">
                  <label htmlFor="img" className="form-label">Upload Video: <span className="text-danger">*</span> </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => handleVideoChange(e)}
                    accept="video/*"
                    ref={fileInputRef}
                  />
                  {errorFile && <div className="validation_msg">{errorFile}</div>}
                </div>
                <div className="d-flex justify-content-end mt-4">
                  <button className="btn1 me-1" onClick={handleVideoClear}>
                    Clear
                  </button>
                  <button className="btn1" onClick={HandleVideoUpload}
                    disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                        Adding...
                      </>
                    ) : (
                      "Add"
                    )}
                  </button>
                </div>
              </form> */}
              <form>
                <div className="form-group">
                  <label htmlFor="img" className="form-label">
                    Upload Type: <span className="text-danger">*</span>{" "}
                  </label>
                  <select
                    className="form-select"
                    value={customerVideoType}
                    name="customerVideoType"
                    onChange={(e) => setCustomerVideoType(e.target.value)}
                  >
                    <option value="File">File</option>
                    <option value="Link">Link</option>
                  </select>
                  {errorFile && (
                    <div className="validation_msg">{errorFile}</div>
                  )}
                </div>
                {customerVideoType === "Link" ? (
                  <div className="form-group mt-2">
                    <label htmlFor="videoLink" className="form-label">
                      Upload Link: <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="videoLink"
                      className="form-control"
                      onChange={(e) => setVideos(e.target.value)}
                      value={videos}
                    />
                    {errorFile && (
                      <div className="validation_msg">{errorFile}</div>
                    )}
                  </div>
                ) : (
                  <div className="form-group mt-2">
                    {/* <label htmlFor="img" className="form-label">
                      Upload Video: <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => handleVideoChange(e)}
                      accept="video/*"
                      ref={fileInputRef}
                    /> */}
                    <label htmlFor="videoFile" className="form-label">
                      Upload Video: <span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      id="videoFile"
                      className="form-control"
                      onChange={(e) => setVideos(e.target.files[0])}
                      accept="video/*"
                      ref={fileInputRef}
                    />
                    {errorFile && (
                      <div className="validation_msg">{errorFile}</div>
                    )}
                  </div>
                )}

                <div className="d-flex justify-content-end mt-4">
                  <button className="btn1 me-1" onClick={handleVideoClear}>
                    Clear
                  </button>
                  <button
                    className="btn1"
                    onClick={HandleVideoUpload}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        />
                        Adding...
                      </>
                    ) : (
                      "Add"
                    )}
                  </button>
                </div>
              </form>
            </Dialog>

            <div className={`${step === 2 ? "d-block" : "d-none"}`}>
              <div className="col-12 ">
                <div className="pt-3">
                  <NearbyMarketHouse
                    eid={eid}
                    marketid={marketid}
                    status={status}
                    pagetype={pagetype}
                  />
                </div>
                <hr />

                <div className="d-flex justify-content-between mt-5">
                  <h6>Add Pictures</h6>
                  {staffid.logintype == "staff" &&
                    (status === "complete" || status == "pending") &&
                    pagetype !== "reminder" && enquiryDoumentData?.status !== "booking" && (
                      <a
                        href="#0"
                        onClick={() => setNearVisible(true)}
                        className="btn1 me-2"
                      >
                        + Add
                      </a>
                    )}
                </div>

                <div className="mt-2">
                  <DataTable
                    persistTableHead={true}
                    columns={picturesNearColumns}
                    data={imgNearData}
                    customStyles={customStyle}
                    pagination
                    // selectableRows
                    fixedHeader
                  />
                </div>
                <hr />

                <div className="d-flex justify-content-between mt-5">
                  <h6>Add Videos</h6>
                  {staffid.logintype == "staff" &&
                    (status === "complete" || status == "pending") &&
                    pagetype !== "reminder" && enquiryDoumentData?.status !== "booking" && (
                      <a
                        href="#0"
                        onClick={() => setNearVideosVisible(true)}
                        className="btn1 me-2"
                      >
                        + Add
                      </a>
                    )}
                </div>

                <div className="mt-2">
                  <DataTable
                    persistTableHead={true}
                    columns={videosNearColumns}
                    data={nearVideosData}
                    customStyles={customStyle}
                    pagination
                    // selectableRows
                    fixedHeader
                  />
                </div>
              </div>

              <Dialog
                visible={nearVisible}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Upload Images"
                modal
                className="p-fluid"
                onHide={() => setNearVisible(false)}
              >
                <form>
                  <div className="form-group">
                    <label htmlFor="img" className="form-label">
                      Upload Img: <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      type="file"
                      class="form-control"
                      onChange={(e) => handleFileChange(e)}
                      ref={fileInputRef}
                    />
                    {errorFile && (
                      <div className="validation_msg">{errorFile}</div>
                    )}
                  </div>
                  <div className="d-flex justify-content-end mt-4">
                    <button className="btn1 me-1" onClick={handleClear}>
                      Clear
                    </button>
                    <button
                      className="btn1"
                      onClick={refereceHandleFileUpload}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          />
                          Adding...
                        </>
                      ) : (
                        "Add"
                      )}
                    </button>
                  </div>
                </form>
              </Dialog>
              <Dialog
                visible={nearVideosVisible}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Upload Videos"
                modal
                className="p-fluid"
                // onHide={() => setNearVideosVisible(false)}
                onHide={() => {
                  setNearVideosVisible(false);
                  setCustomerVideoType("File");
                  setVideos("");
                  setErrorFile("");
                }}
              >
                {/* <form>
                  <div className="form-group">
                    <label htmlFor="img" className="form-label">Upload Video: <span className="text-danger">*</span> </label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => handleVideoChange(e)}
                      accept="video/*"
                      ref={fileInputRef}
                    />
                    {errorFile && <div className="validation_msg">{errorFile}</div>}
                  </div>
                  <div className="d-flex justify-content-end mt-4">
                    <button className="btn1 me-1" onClick={handleVideoClear}>
                      Clear
                    </button>
                    <button className="btn1"
                      onClick={refereceHandleVideoUpload}
                      disabled={loading}>
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" />
                          Adding...
                        </>
                      ) : (
                        "Add"
                      )}
                    </button>
                  </div>
                </form> */}
                <form>
                  <div className="form-group">
                    <label htmlFor="img" className="form-label">
                      Upload Type: <span className="text-danger">*</span>{" "}
                    </label>
                    <select
                      className="form-select"
                      value={customerVideoType}
                      name="customerVideoType"
                      onChange={(e) => setCustomerVideoType(e.target.value)}
                    >
                      <option value="File">File</option>
                      <option value="Link">Link</option>
                    </select>
                    {errorFile && (
                      <div className="validation_msg">{errorFile}</div>
                    )}
                  </div>
                  {customerVideoType === "Link" ? (
                    <div className="form-group mt-2">
                      <label htmlFor="videoLink" className="form-label">
                        Upload Link: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="videoLink"
                        className="form-control"
                        onChange={(e) => setVideos(e.target.value)}
                        value={videos}
                      />
                      {errorFile && (
                        <div className="validation_msg">{errorFile}</div>
                      )}
                    </div>
                  ) : (
                    <div className="form-group mt-2">
                      {/* <label htmlFor="img" className="form-label">
                      Upload Video: <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => handleVideoChange(e)}
                      accept="video/*"
                      ref={fileInputRef}
                    /> */}
                      <label htmlFor="videoFile" className="form-label">
                        Upload Video: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        id="videoFile"
                        className="form-control"
                        onChange={(e) => setVideos(e.target.files[0])}
                        accept="video/*"
                        ref={fileInputRef}
                      />
                      {errorFile && (
                        <div className="validation_msg">{errorFile}</div>
                      )}
                    </div>
                  )}

                  <div className="d-flex justify-content-end mt-4">
                    <button className="btn1 me-1" onClick={handleVideoClear}>
                      Clear
                    </button>
                    <button
                      className="btn1"
                      onClick={refereceHandleVideoUpload}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          />
                          Adding...
                        </>
                      ) : (
                        "Add"
                      )}
                    </button>
                  </div>
                </form>
              </Dialog>
            </div>
            <hr />

            {staffid.logintype == "staff" &&
              status !== "complete" &&
              pagetype !== "reminder" && (
                <div className="ms-2 text-end mt-4">
                  <button
                    onClick={() => setIsVerifyConfirm(true)}
                    className="btn1 me-2"
                    disabled={confirmLoading}
                  >
                    {confirmLoading ? "Processing" : "Confirm"}
                  </button>
                </div>
              )}
          </div>
        </div>
      )}
    </>
  );
};
