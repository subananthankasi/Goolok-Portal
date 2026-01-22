import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "react-data-table-component";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import customStyle from "../../../../Utils/tableStyle";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SearchIcon from "@mui/icons-material/Search";
import { validateDescription, validateMedia } from "./Validation";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import Spinner from "react-bootstrap/Spinner";
import ViewMediaDetails from "./ViewMediaDetails";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocationSelect from "./LocationSelect";
 
function LayoutMediaDepartment() {
  let navigate = useNavigate();

  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const status = queryParams.get("status");
  const projectid = queryParams.get("projectid");
  const staffid = JSON.parse(localStorage.getItem("token"));

  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
      wrap: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      wrap: true,
      sortable: true,
    },
    {
      name: "Images",
      selector: (row) => row.filename,
      wrap: true,
      sortable: true,
    },

    {
      name: "Link",
      selector: (row) => row.source_link,
      wrap: true,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.source_remark,
      wrap: true,
      sortable: true,
    },
    ...(staffid.logintype === "admin" || status ==="pending" || status ==="complete"
      ? []: [
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <button
            className="btn btn-danger delete"
            data-tooltip-id="delete"
            onClick={() => handleDelete(row.id)}
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },])
  ];

  const adminColumns = [
    {
      name: "S.no",
      selector: (row,index) => index + 1,
      sortable: true,
      wrap: true,
    },  
    {
      name: "Media",
      cell: (row) => {
        let tag;
        switch (row.type) {
          case 'image': 
            tag =  <img src={`${IMG_PATH}/property/${row.source_name}`} style={{ width: "150px", height: "100%"}} alt=""></img>; 
            break;
          case 'video': 
            tag = (
              <video width="200px" controls>
                <source src={`${IMG_PATH}/property/${row.source_name}`} type="video/mp4" />   
                Your browser does not support the video tag.
              </video>
            );
            break;
          case 'link': 
            tag =    <img src={row.source_link} style={{ width: "150px", height: "100%"}} alt=""></img>;  
            break;
          default: 
            tag = 'No Data'; 
            break;
        }
        
        return (
          <>
            {tag}
          </>
        );
      },
      wrap: true,
      sortable: true,
    }, 
    {
      name: "Description",
      selector: (row) => row.source_remark,
      wrap: true,
      sortable: true,
    }, 
   
  ];

  const columnDiscription = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
      wrap: true,
    },
    {
      name: "Meta Tag",
      selector: (row) => row.meta_tag,
      wrap: true,
      sortable: true,
    },
    {
      name: "Tag",
      selector: (row) => row.content_tag,
      wrap: true,
      sortable: true,
    },

    {
      name: "Language",
      selector: (row) => row.select_lang,
      wrap: true,
      sortable: true,
    },
    {
      name: "Description", 
      cell: (row) => (<>
          <div dangerouslySetInnerHTML={{ __html: row.content }} />
      </>),
      wrap: true,
      sortable: true,
    },
    ...(staffid.logintype === "admin" || status ==="pending" || status ==="complete"
      ? []: [
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <button
            className="btn btn-danger delete"
            data-tooltip-id="delete"
            onClick={() => handleDeleteDiscription(row.id)}
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },])
  ];

  // image / video

  // select base on img or url
  const [selectedProceedOption, setSelectedProceedOption] = useState("");

  const [formDataImg, setFormDataImg] = useState({
    filename: "",
    source_link: "",
    source_remark: "",
    type: "",
  });

  const [file, setFile] = useState(null);

  const handleProceedChange = (event) => {
    setSelectedProceedOption(event.target.value);
    setFile(null);
    setFormDataImg({
      ...formDataImg,
      filename: "",
      source_link: "",
    });
  };

  const [imgErrors, setImgErrors] = useState({});
  const [dataList, setDataList] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  useEffect(() => {
    if (file) {
      setFormDataImg((prevFormData) => ({
        ...prevFormData,
        filename: file.name,
        source_name: file,
      }));
    }
  }, [file]);

  useEffect(() => {
    if (selectedProceedOption) {
      setFormDataImg((prevFormData) => ({
        ...prevFormData,
        type: selectedProceedOption,
      }));
    }
  }, [selectedProceedOption]);

  const handleChangeImg = (e) => {
    const { name, value } = e.target;
    setFormDataImg((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImgAdd = (e) => {
    e.preventDefault();
    const result = validateMedia(formDataImg);
    if (result.isValid) {
      const newItem = {
        id: dataList.length + 1,
        ...formDataImg,
      };

      setDataList((prevList) => [...prevList, newItem]);
      setFormDataImg({
        source_link: "",
        source_remark: "",
        source_name: "",
      });
      setFile(null);
      setSelectedProceedOption("")
      setImgErrors({});
    } else {
      setImgErrors(result.errors);
    }
  };

  const handleDelete = (id) => {
    const updatedList = dataList.filter((item) => item.id !== id);
    setDataList(updatedList);
  };



  const [isLoading, setIsLoading] = useState(false);
  const ImgeSave = async (e) => {
    e.preventDefault();
    if (dataList.length === 0) {
      alert("Please Add Contact Details");
      return;
    }

    setIsLoading(true);
    const form = new FormData();
    form.append("id", id);
    form.append("status", "active");
    form.append("projectid", projectid);

    dataList.forEach((doc, index) => {
      form.append("source_remark[]", doc.source_remark);
      form.append("source_name[]", doc.source_name);
      form.append("source_link[]", doc.source_link);
      form.append("type[]", doc.type);
    });

    try {
      await axios.post(`${API_BASE_URL}/media`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setDataList([]);
      Toast({ message: "Successfully Updated", type: "success" });
      setIsLoading(false);
    } catch (error) {
      alert("Error updating");
    }
  };


  const [data, setData] = useState([]);  
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const fetchData = async () => { 
        try {
            const response = await axios.get(`${API_BASE_URL}/media/${projectid}`, {
                headers: { 
                  'Gl-Status':status,  
                  'Gl-Type':staffid.logintype, 
                  'Gl-Out':staffid.loginid,  
                  'Gl-Root':'Layout', 
                },
            });
          setData(response.data);
          setLoading(false)
        } catch (err) {
          console.error(err.message);
          setLoading(false)
        }  
      }; 
      fetchData();
    }
  }, [id]);  

  const [isModalOpenMedia, setIsModalOpenMedia] = useState(false);
  const openModalBank = () => {
    setIsModalOpenMedia(true);
  };
  const closeModalMedia = () => {
    setIsModalOpenMedia(false);
  };









  // Discription

  const [formDataDiscription, setFormDataDiscription] = useState({
    meta_tag: "",
    content_tag: "",
    select_lang: "tamil",
    content: "",
    projectid: projectid,
    mediaid: id,
  });

  const handleChangeDiscription = (e) => {
    const { name, value } = e.target;
    setFormDataDiscription((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormDataDiscription((prevData) => ({
      ...prevData,
      content: data,
    }));
  };

  const [discriptionErrors, setDiscriptionErrors] = useState({});



  const [isLoadingDiscription, setIsLoadingDiscription] = useState(false);

  const DiscriptioneSave = async (e) => {
    e.preventDefault();
    
    const result = validateDescription(formDataDiscription);
    if (result.isValid) {
      setIsLoadingDiscription(true);
      try {
        await axios.post(`${API_BASE_URL}/contentadd`, formDataDiscription, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        Toast({ message: "Successfully Updated", type: "success" });
        setIsLoadingDiscription(false);
        setDiscriptionErrors("")
        setFormDataDiscription((prevData) => ({
          meta_tag: "",
          content_tag: "",
          select_lang: "tamil",
          content: prevData.content,  
          projectid: projectid,
          mediaid: id,
        }));
        fetchData();
      } catch (error) {
        alert("Error updating");
        setIsLoadingDiscription(false);
      }
    }else{
      setDiscriptionErrors(result.errors)
    }

  };


  const [dataListDiscription, setDataListDiscription] = useState([]); 

  // fetch 

  const fetchData = async () => {
    try{
      const response = await axios.get(`${API_BASE_URL}/contentdata/${projectid}`); 
      setDataListDiscription(response.data)
    }catch(error){
      console.error(error);
    }
  }
  useEffect(()=>{ 
    fetchData();
  },[])
  // delete 
  const handleDeleteDiscription = async(id) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
    try{
      await axios.delete(`${API_BASE_URL}/media/${id}`);
      const updatedList = dataListDiscription.filter((item) => item.id !== id);
      setDataListDiscription(updatedList);
      Toast({ message: "Successfully deleted", type: "error" }); 
    }catch(error){
      console.error('Error deleting:', error);
    }
  }
  };

  return (
    <>
      <ViewMediaDetails
        isOpen={isModalOpenMedia}
        closeModal={closeModalMedia}
        id={projectid}
        staffid={staffid}
        status={status}
      />

      <section className="section">
        <div className="container">
          <div className="row">
          {loading ? 
          <div style={{height:"32vh",display:"flex",justifyContent:"center"}}>
             <Spinner className="mt-auto"/> 
          </div>
          :
            <div className="col-12">
              <div className="card">
                <div className="card-heaer mb-3">
                  <div className="d-flex bottom1">
                    <div>
                      <nav className="nav">
                        <a
                          className={`nav-link link1 ${
                            step === 1 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(1)}
                        >
                          Image/Video
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 2 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(2)}
                        >
                          Description
                        </a>

                        <a
                          className={`nav-link link1 ${
                            step === 3 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(3)}
                        >
                          Map
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 4 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(4)}
                        >
                          Near By
                        </a>
                      </nav>
                    </div>

                    <div className="p-2" style={{ marginLeft: "auto" }}>
                      <button className="btn1" onClick={() => navigate(-1)}>
                        <ArrowBackIcon /> back
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body p-2">
                  {step === 1 && (
                    <div className="row">
                      {staffid.logintype === "admin" ||
                      status === "pending" ||
                      status === "complete" ? (
                        " "
                      ) : (
                        <div className="d-flex">
                          <button
                            className="btn1 me-2 mb-3"
                            onClick={openModalBank}
                          >
                            <VisibilityIcon />
                          </button>
                        </div>
                      )}

                      <DataTable
                        columns={staffid.logintype === "admin" || status ==="pending" || status ==="complete" ? adminColumns: columns} 
                        data={staffid.logintype === "admin" || status ==="pending" || status ==="complete" ? data: dataList} 
                        customStyles={customStyle}
                        pagination
                        // selectableRows
                        persistTableHead={true}
                        fixedHeader
                      />

                    {staffid.logintype === "admin" || status ==="pending" || status ==="complete"
                      ? "" :(
                        <div className="container mt-5 mb-3">
                        <div className="row">
                          <div className="col-2">
                            <label className="form-label">Select Type</label>
                          </div>
                          <div className="col-10">
                            <div className="d-flex">
                              <div
                                className="form-check"
                                style={{ fontSize: "14px" }}
                              >
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  id="yes"
                                  name="proceedOption"
                                  value="image"
                                  onChange={handleProceedChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="yes"
                                >
                                  Image
                                </label>
                              </div>

                              <div
                                className="form-check ms-4"
                                style={{ fontSize: "14px" }}
                              >
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  id="yes"
                                  name="proceedOption"
                                  value="video"
                                  onChange={handleProceedChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="yes"
                                >
                                  Video
                                </label>
                              </div>

                              <div
                                className="form-check ms-4"
                                style={{ fontSize: "14px" }}
                              >
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  id="yes"
                                  name="proceedOption"
                                  value="link"
                                  onChange={handleProceedChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="yes"
                                >
                                  Link
                                </label>
                              </div>

                              {selectedProceedOption == "image" && (
                                <div className="ms-5">
                                  <div className="form-group">
                                    <input
                                      type="file"
                                      className="form-control"
                                      id="lastName"
                                      onChange={handleFileChange}
                                    />
                                  </div>
                                </div>
                              )}

                              {selectedProceedOption == "video" && (
                                <div className="ms-5">
                                  <div className="form-group">
                                    <input
                                      type="file"
                                      className="form-control"
                                      id="lastName"
                                      onChange={handleFileChange}
                                    />
                                  </div>
                                </div>
                              )}

                              {selectedProceedOption == "link" && (
                                <div className="ms-5">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="source_link"
                                      onChange={handleChangeImg}
                                      value={formDataImg.source_link}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                            {imgErrors.anyone && (
                              <div className="validation_msg">
                                {imgErrors.anyone}
                              </div>
                            )}
                          </div>

                          <div className="col-md-12">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-2">
                                  <label className="form-label">
                                    Description
                                  </label>
                                </div>
                                <div className="col-5">
                                  <textarea
                                    type="text"
                                    className="form-control"
                                    name="source_remark"
                                    onChange={handleChangeImg}
                                    value={formDataImg.source_remark}
                                  />
                                  {imgErrors.source_remark && (
                                    <div className="validation_msg">
                                      {imgErrors.source_remark}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-end py-3 px-3">
                          <button className="btn1 me-1">Clear</button>
                          <button className="btn1" onClick={handleImgAdd}>
                            Add
                          </button>
                        </div>
                      </div>)}

                      <div className="text-end py-3 px-3">
                        <button className="btn1 me-1" onClick={prevStep}>
                          Previous
                        </button>

                        <button
                          className="btn1 me-2"
                          onClick={(e) => {
                            ImgeSave(e);
                          }}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Spinner animation="border" size="sm" />
                              <span className="ms-2">Please wait...</span>
                            </>
                          ) : (
                            "Save"
                          )}
                        </button>

                        <button className="btn1" onClick={nextStep}>
                          next
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <>
                      <div className="row">

                        <div className="row">
                        {staffid.logintype === "admin" || status ==="pending" || status ==="complete"
                          ? "" :(
                          <div className="col-lg-4 col-md-6">
                            <div className="card2">
                              <div className="card-body">
                                <form>
                                  <div className="row">
                                        <h4 className="page_heading">Add Description</h4> 
                                    <div className="col-md-12 mb-3 mt-4">
                                      <label
                                        htmlFor="lastName"
                                        className="form-label"
                                      >
                                        Meta Tag
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="meta_tag"
                                        value={formDataDiscription.meta_tag}
                                        onChange={handleChangeDiscription}
                                      />
                                        {discriptionErrors.meta_tag && (<div className="validation_msg">{discriptionErrors.meta_tag} </div>)}
                                    </div>
                                  </div>

                                  <div className="mb-3 col-md-12">
                                    <label
                                      className="form-label"
                                      htmlFor="inputState"
                                    >
                                      Tag
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="content_tag"
                                      value={formDataDiscription.content_tag}
                                      onChange={handleChangeDiscription}
                                    />
                                    {discriptionErrors.content_tag && (<div className="validation_msg">{discriptionErrors.content_tag} </div>)}
                                  </div>

                                  <div className="mb-3 col-md-12">
                                    <label
                                      className="form-label"
                                      htmlFor="inputState"
                                    >
                                      Select Language
                                    </label>
                                    <select
                                      id="inputState"
                                      className="form-select"
                                      name="select_lang"
                                      value={formDataDiscription.select_lang}
                                      onChange={handleChangeDiscription}
                                    >
                                      <option value="tamil">Tamil</option>
                                      <option value="english">English</option>
                                    </select>
                                    {discriptionErrors.select_lang && (<div className="validation_msg">{discriptionErrors.select_lang} </div>)}
                                  </div>

                                  <div className="mb-3 col-md-12">
                                    <label
                                      className="form-label"
                                      htmlFor="inputState"
                                    >
                                      Description
                                    </label>
                                    <CKEditor
                                      editor={ClassicEditor}
                                      data=""
                                      onChange={handleEditorChange}
                                    />
                                    {discriptionErrors.content && (<div className="validation_msg">{discriptionErrors.content} </div>)}
                                  </div>
                                </form>
                              </div>
                              <div className="text-end py-3 px-3">
                                <button className="btn1 me-1">Clear</button>

                                <button
                                  className="btn1 me-2"
                                  onClick={DiscriptioneSave}
                                  disabled={isLoading}
                                 >
                          {isLoadingDiscription ? (
                            <>
                              <Spinner animation="border" size="sm" />
                              <span className="ms-2">Please wait...</span>
                            </>
                          ) : (
                            "Add"
                          )}
                        </button> 
                                 
                              </div>
                            </div>
                          </div>)}

                          <div className={`${staffid.logintype === "admin" || status === "pending" || status === "complete" ? "col-12" : "col-lg-8 col-md-6"}`}>
                          <div className="card2">
                              <div className="card-header">
                                <div className="d-flex">
                                  <h4 className="page_heading">Report</h4>
                                </div>
                              </div>
                              <div className="card-body">
                                <div className="col-lg-12  mb-4">
                                  <div className="searchbar mt-3"></div>
                                  <DataTable
                                    columns={columnDiscription}
                                    data={dataListDiscription}
                                    customStyles={customStyle}
                                    pagination
                                    // selectableRows
                                    persistTableHead={true}
                                    fixedHeader
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-end py-3 px-3">
                          <button className="btn1 me-1" onClick={prevStep}>
                            Previous
                          </button>
                          <button className="btn1" onClick={nextStep}>
                            Next
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                    <div className={step === 3 ? "d-block" : "d-none"}>
               
                      <LocationSelect id={id} staffid={staffid} status={status}/>
                      <div className="text-end py-3 px-3">
                        <button className="btn1 me-1" onClick={prevStep}>
                          Previous
                        </button>
                        <button className="btn1" onClick={nextStep}>
                          next
                        </button>
                      </div>
                      </div>
                 

                  {step === 4 && (
                    <>
                      <div>
                        <div className="container mt-5 mb-3">
                          <div className="row" style={{ maxWidth: "150px" }}>
                            <button className="btn1">
                              <SearchIcon />
                              Search
                            </button>
                          </div>
                        </div>
                        <div className="text-end py-3 px-3">
                          <button className="btn1 me-1" onClick={prevStep}>
                            Previous
                          </button>
                          <button className="btn1" onClick={nextStep}>
                            Next
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>}
          </div>
        </div>
      </section>
    </>
  );
}

export default LayoutMediaDepartment;
