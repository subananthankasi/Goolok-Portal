import axios from "axios";
import { useEffect, useRef, useState } from "react";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dialog } from "primereact/dialog";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import customStyle from "../../../../Utils/tableStyle";
import ConfirmationModal from "./ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";
import { DateFormatcustom } from "../../../../Utils/DateFormatcustom";
import ApartmentCustomerResearch from "../../AppartmentEnquiry/MarketResearchApart/ApartmentCustomerResearch";
import ApartmentNearbyMarketResearch from "../../AppartmentEnquiry/MarketResearchApart/ApartmentNearbyMarketResearch";
import Toast from "../../../../Utils/Toast";


export const ApartmentMarketResearch = ({ eid, marketid, status, pagetype }) => {

  const staffid = JSON.parse(localStorage.getItem("token"));
  const [step, setStep] = useState(1);
  const [pageLoading, setPageLoading] = useState(true)
  // tab 1 ------------------------------------------------------------------------------------------------------
  const [customerdata, setCustomerdata] = useState([])
  const [deleteId, setDeleteId] = useState('')
  const [customerVisible, setCustomerVisible] = useState(false)


  const [visible, setVisible] = useState(false)
  const [nearVisible, setNearVisible] = useState(false)
  const [nearVideosVisible, setNearVideosVisible] = useState(false)
  const [videosVisible, setVideosVisible] = useState(false)




  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customerprop/${eid}`, {
        headers: {
          'Gl-Status': 'customer'
        },
      })
      setCustomerdata(response.data)
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomerData()
  }, [marketid])








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
          <img src={`${IMG_PATH}/enquiry/market/${row.image}`} style={{ width: "100px", height: "80px", objectFit: "cover" }} alt=""></img>
        </div>
      ),
      sortable: true,
    },

    ...(staffid.logintype == "staff" && (status === "complete" || status === "pending")) && pagetype !== "reminder" ? [
      {
        name: "Action",
        cell: (row) => (
          <div className="d-flex">
            <button
              className="btn btn-outline-danger delete"
              data-tooltip-id="delete" onClick={() => { setDeletePicConfirm(true); setDeleteId(row.id) }}
            >
              <DeleteIcon />
            </button>
          </div>
        ),
        sortable: true,
      }] : [],
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
          <img src={`${IMG_PATH}/enquiry/market/${row.image}`} style={{ width: "100px", height: "80px", objectFit: "cover" }} alt=""></img>
        </div>
      ),
      sortable: true,
    },

    ...(staffid.logintype == "staff" && (status === "complete" || status === "pending")) && pagetype !== "reminder" ? [
      {
        name: "Action",
        cell: (row) => (
          <div className="d-flex">
            <button
              className="btn btn-outline-danger delete"
              data-tooltip-id="delete" onClick={() => { setDeleteNearPicConfirm(true); setDeleteId(row.id) }}
            >
              <DeleteIcon />
            </button>
          </div>
        ),
        sortable: true,
      }] : [],
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
    {
      name: "Video",
      cell: (row) => {
        if (row.video_file) {
          const videoFileUrl = `${IMG_PATH}/enquiry/market/${row.video_file}`;

          return (
            <video width="150" height="100" controls className='mt-1 mb-1'>
              <source src={videoFileUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          );
        }
      },
      sortable: true,
    },

    ...(staffid.logintype == "staff" && (status === "complete" || status === "pending")) && pagetype !== "reminder" ? [
      {
        name: "Action",
        cell: (row) => (
          <div className="d-flex gap-2">

            <button
              className="btn btn-outline-danger delete"
              data-tooltip-id="delete" onClick={() => { setDeleteVideoConfirm(true); setDeleteId(row.id) }}
            >
              <DeleteIcon />
            </button>
          </div>
        ),
        sortable: true,
      }] : [],
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
    {
      name: "Video",
      cell: (row) => {
        if (row.video_file) {
          const videoFileUrl = `${IMG_PATH}/enquiry/market/${row.video_file}`;

          return (
            <video width="150" height="100" controls className='mt-1 mb-1'>
              <source src={videoFileUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          );
        }
      },
      sortable: true,
    },

    ...(staffid.logintype == "staff" && (status === "complete" || status === "pending")) && pagetype !== "reminder" ? [
      {
        name: "Action",
        cell: (row) => (
          <div className="d-flex gap-2">

            <button
              className="btn btn-outline-danger delete"
              data-tooltip-id="delete" onClick={() => { setDeleteNearVideoConfirm(true); setDeleteId(row.id) }}
            >
              <DeleteIcon />
            </button>
          </div>
        ),
        sortable: true,
      }] : [],
  ];


  const [files, setFiles] = useState();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [deletePicConfirm, setDeletePicConfirm] = useState(false);
  const [deleteNearPicConfirm, setDeleteNearPicConfirm] = useState(false);


  const [errorFile, setErrorFile] = useState('')
  const validTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
  ];


  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!validTypes.includes(file.type)) {
      setErrorFile("Invalid file type. Please upload a  PNG, JPEG, or JPG file.");
      return;
    }
    setFiles(file);
    setErrorFile('')
  };

  const handleFileUpload = async (event) => {

    event.preventDefault()
    if (!files) {
      setErrorFile("Please select a file before submitting.");
      return;
    }
    setLoading(true)
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
      setVisible(false)
    } catch (error) {

    } finally {
      setErrorFile('')
      setLoading(false)
      fetchCustomer()
      fileInputRef.current.value = '';
      setFiles('')
    }
  };
  const refereceHandleFileUpload = async (event) => {

    event.preventDefault()
    if (!files) {
      setErrorFile("Please select a file before submitting.");
      return;
    }
    setLoading(true)
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
      setNearVisible(false)
    } catch (error) {

    } finally {
      setErrorFile('')
      setLoading(false)
      fetchNear()
      fileInputRef.current.value = '';
      setFiles('')
    }
  };
  const [videos, setVideos] = useState('')

  const validVideoTypes = [
    "video/mp4",
    "video/avi",
    "video/mov",
    "video/wmv",
    "video/flv",
    "video/mkv"
  ];

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (!validVideoTypes.includes(file.type)) {
      setErrorFile("Invalid file type. Please upload a video file (MP4, AVI, MOV, WMV, FLV, MKV).");
      return;
    }
    setVideos(file);
    setErrorFile('');
  };

  const HandleVideoUpload = async (event) => {
    event.preventDefault();
    if (!videos) {
      setErrorFile("Please select a video file before submitting.");
      return;
    }
    setLoading(true);

    const payload = {
      video: videos,
      enqid: eid,
      type: "customer",
      
    }


    try {
      await axios.post(`${API_BASE_URL}/addvideo`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setVideosVisible(false);
    } catch (error) {
      console.error(error);
    } finally {
      setErrorFile('');
      setLoading(false);
      fetchVideo();
      fileInputRef.current.value = '';
      setVideos('');
    }
  };
  const refereceHandleVideoUpload = async (event) => {
    event.preventDefault();
    if (!videos) {
      setErrorFile("Please select a video file before submitting.");
      return;
    }
    setLoading(true);

    const payload = {
      video: videos,
      enqid: eid,
      type: "nearby",
      
    }


    try {
      await axios.post(`${API_BASE_URL}/addvideo`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setNearVideosVisible(false);
    } catch (error) {
      console.error(error);
    } finally {
      setErrorFile('');
      setLoading(false);
      fetchNearVideo();
      fileInputRef.current.value = '';
      setVideos('');
    }
  };
  // get img data 
  const [imgData, setImgData] = useState([])
  const [imgNearData, setImgNearData] = useState([])


  const fetchCustomer = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customerprop/${eid}/edit`, {
        headers: {
          'Gl-Status': 'customer'
        }
      })
      setImgData(response.data)
    } catch (error) {
      console.error(error);
    }
  }
  const fetchNear = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customerprop/${eid}/edit`, {
        headers: {
          'Gl-Status': 'nearby'
        }
      })
      setImgNearData(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCustomer()
    fetchNear()
    fetchVideo()
    fetchNearVideo()

  }, [marketid])

  const [customerVideos, setCustomerVideos] = useState([])

  const fetchVideo = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/allvideo/${eid}/edit`, {
        headers: {
          'Gl-Status': 'customer'
        }
      })
      setCustomerVideos(response.data)
    } catch (error) {
      console.error(error);
    }
  }
  const [nearVideosData, setNearVideosData] = useState([])
  const fetchNearVideo = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/allvideo/${eid}/edit`, {
        headers: {
          'Gl-Status': 'nearby'
        }
      })
      setNearVideosData(response.data)
    } catch (error) {
      console.error(error);
    }
  }


  const handlePicDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/customerprops/remove/${deleteId}`)
      Toast({ message: "Successfully deleted", type: "success" });
    } catch (error) {
      Toast({ message: "Error to delete! try again", type: "error" });
    } finally {
      fetchCustomer()
    }
  };
  const handlePicNearDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/customerprops/remove/${deleteId}`)
      Toast({ message: "Successfully deleted", type: "success" });
    } catch (error) {
      Toast({ message: "Error to delete! try again", type: "error" });
    } finally {
      fetchNear()
    }
  };

  const handleVideoDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/videodelete/${deleteId}`)
      Toast({ message: "Successfully deleted", type: "success" });
    } catch (error) {
      Toast({ message: "Error to delete! try again", type: "error" });
    } finally {
      fetchVideo()
    }
  };

  const handleVideoNearDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/videodelete/${deleteId}`)
      Toast({ message: "Successfully deleted", type: "success" });
    } catch (error) {
      Toast({ message: "Error to delete! try again", type: "error" });
    } finally {
      fetchNearVideo()
    }
  };
  const [deleteVideoId, setDeleteVideoId] = useState('')
  const [deleteNearVideoId, setDeleteNearVideoId] = useState('')
  const [deleteVideoConfirm, setDeleteVideoConfirm] = useState(false);
  const [deleteNearVideoConfirm, setDeleteNearVideoConfirm] = useState(false);


  // error alert 
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModals = () => setModalOpen(false);


  const [verifyConfirm, setIsVerifyConfirm] = useState(false);

  const navigate = useNavigate()

  const handleConfirm = async () => {
    try {
      await axios.get(`${API_BASE_URL}/market/${marketid}`);
      Toast({ message: "Successfully Updated", type: "success" });
      navigate("/apart_marketResearch_verification#Complete")
    } catch (error) {
      const errorMessage = error.response?.data?.messages?.error || error.message || "Failed to update";
      setErrorMsg(errorMessage);
      handleOpenModal();
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

      {pageLoading ? "" :
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
                  <ApartmentCustomerResearch eid={eid} marketid={marketid} status={status} pagetype={pagetype} />

                  <div className="d-flex justify-content-between mt-5">
                    <h6>Add Picturesss</h6>
                    {staffid.logintype == "staff" && (status === "complete" || status == "pending") && pagetype !== "reminder" &&

                      <a
                        href="#0"
                        onClick={() => setVisible(true)}
                        className="btn1 me-2"
                      >
                        + Add
                      </a>
                    }

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
                    {staffid.logintype == "staff" && (status === "complete" || status == "pending") && pagetype !== "reminder" &&
                      <a
                        href="#0"
                        onClick={() => setVideosVisible(true)}
                        className="btn1 me-2"
                      >
                        + Add
                      </a>
                    }

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
            <Dialog visible={customerVisible} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Upload Images/Videos" modal className="p-fluid" onHide={() => setCustomerVisible(false)} >
              <form>
                <div className="form-group">
                  <label htmlFor="img" className="form-label">Upload Img: <span className="text-danger">*</span> </label>
                  <input type="file" class="form-control"
                    onChange={(e) => handleFileChange(e)}
                    ref={fileInputRef}
                  />
                  {errorFile && <div className="validation_msg">{errorFile}</div>}
                </div>
                <div className="d-flex justify-content-end mt-4">
                  <button className="btn1 me-1" data-tooltip-id="edit">
                    Clear
                  </button>
                  <button className="btn1" onClick={handleFileUpload}
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
              </form>
            </Dialog>
            <Dialog visible={visible} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Upload Images/Videos" modal className="p-fluid" onHide={() => setVisible(false)} >
              <form>
                <div className="form-group">
                  <label htmlFor="img" className="form-label">Upload Img: <span className="text-danger">*</span> </label>
                  <input type="file" class="form-control"
                    onChange={(e) => handleFileChange(e)}
                    ref={fileInputRef}
                  />
                  {errorFile && <div className="validation_msg">{errorFile}</div>}
                </div>
                <div className="d-flex justify-content-end mt-4">
                  <button className="btn1 me-1" data-tooltip-id="edit">
                    Clear
                  </button>
                  <button className="btn1" onClick={handleFileUpload}
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
              </form>
            </Dialog>
            <Dialog visible={videosVisible} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Upload Videos" modal className="p-fluid" onHide={() => setVideosVisible(false)} >
              <form>
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
                  <button className="btn1 me-1" data-tooltip-id="edit">
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
              </form>
            </Dialog>


            {/* <div className={`${step === 2 ? "d-block" : "d-none"}`}>
              <div className="col-12 ">
                <div className="p-3">
                  <DataTable
                    persistTableHead={true}
                    columns={picturesColumns}
                    data={imgData}
                    customStyles={customStyle}
                    pagination
                    // selectableRows
                    fixedHeader
                  />

                  {(staffid.logintype == "staff" && status !== "complete") &&
                    <div className="row mt-4">
                      <div className="col-6">
                        <div className="row">
                          <div className="col-4">
                            <label className="label-form">Upload Img</label>
                          </div>
                          <div className="col-8">
                            <input type="file" class="form-control"
                              onChange={(e) => handleFileChange(e)}
                              ref={fileInputRef}
                            />
                            {errorFile && <div className="validation_msg">{errorFile}</div>}
                          </div>
                        </div>
                      </div>

                      <div className="col-4">
                        <div className="d-flex">
                          <button className="btn1 me-1" data-tooltip-id="edit">
                            Clear
                          </button>
                          <button className="btn1" onClick={() => handleFileUpload()}
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
                      </div>
                    </div>
                  }

                </div>
              </div>
            </div> */}


            <div className={`${step === 2 ? "d-block" : "d-none"}`}>
              <div className="col-12 ">



                <div className="pt-3">
                  <ApartmentNearbyMarketResearch eid={eid} marketid={marketid} status={status} pagetype={pagetype} />

                </div>
                <hr />

                <div className="d-flex justify-content-between mt-5">
                  <h6>Add Pictures</h6>
                  {staffid.logintype == "staff" && (status === "complete" || status == "pending") && pagetype !== "reminder" &&
                    <a
                      href="#0"
                      onClick={() => setNearVisible(true)}
                      className="btn1 me-2"
                    >
                      + Add
                    </a>
                  }
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
                  {staffid.logintype == "staff" && (status === "complete" || status == "pending") && pagetype !== "reminder" &&
                    <a
                      href="#0"
                      onClick={() => setNearVideosVisible(true)}
                      className="btn1 me-2"
                    >
                      + Add
                    </a>
                  }
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


              <Dialog visible={nearVisible} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Upload Images" modal className="p-fluid" onHide={() => setNearVisible(false)} >
                <form>
                  <div className="form-group">
                    <label htmlFor="img" className="form-label">Upload Img: <span className="text-danger">*</span> </label>
                    <input type="file" class="form-control"
                      onChange={(e) => handleFileChange(e)}
                      ref={fileInputRef}
                    />
                    {errorFile && <div className="validation_msg">{errorFile}</div>}
                  </div>
                  <div className="d-flex justify-content-end mt-4">
                    <button className="btn1 me-1" data-tooltip-id="edit">
                      Clear
                    </button>
                    <button className="btn1" onClick={refereceHandleFileUpload}
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
                </form>
              </Dialog>
              <Dialog visible={nearVideosVisible} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Upload Videos" modal className="p-fluid" onHide={() => setNearVideosVisible(false)} >
                <form>
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
                    <button className="btn1 me-1" data-tooltip-id="edit">
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
                </form>
              </Dialog>
            </div>
            <hr />



            {(staffid.logintype == "staff" && status !== "complete") &&
              <div className="ms-2 text-end mt-4">
                <a
                  href="#0"
                  onClick={() => setIsVerifyConfirm(true)}
                  className="btn1 me-2"
                >
                  Confirm
                </a>
              </div>
            }


          </div>
        </div>
      }
    </>
  );
};






