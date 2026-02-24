import { useFormik } from 'formik'
import React from 'react'
import { useEffect, useState } from "react";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal, Button } from "rsuite";
import DataTable from "react-data-table-component";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toast from '../../../../Utils/Toast';
import customStyle from "../../../../Utils/tableStyle";
import { Dialog } from 'primereact/dialog';
import Stack from '@mui/material/Stack';
import MuiButton from "@mui/material/Button";
import { Editor } from 'primereact/editor';
import API_BASE_URL from '../../../../Api/api';


const PrivacyPolicy = () => {

  const navigate = useNavigate()

  const [newDialog, setNewDialog] = useState(false)
  const [fetchbanner, setFetchbanner] = useState([])
 
  const [deleteconfirmmodal, setDeleteconfirmmodal] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
   const [isSubmitting, setIsSubmitting] = useState(false);
  


  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
    },
   
    {
      name: "Content",
      // selector: (row) => row.content,
      selector: (row) => row.content ? row.content.replace(/<[^>]+>/g, '') : "",
      sortable: true,
       width: "220px",
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
     formik.setFieldValue("content", row.content || ""); ;
   
    formik.setFieldValue("status", row.status || "");

  };


  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/termspoliciesviewall`, {
        headers: {
          "Gl-status": "privacypolicy",
        },

      });

      // setFetchbanner(response.data);
      setFetchbanner(response.data?.data || []);
      
    } catch (error) {
     
    }
  };

  useEffect(() => {
    fetchRoles()
  }, [])


  const onSubmit = async (values) => {
    setIsSubmitting(true);
     try {
      const response = await axios.post(`${API_BASE_URL}/termspolicies`, values, {
        headers: { "Content-Type": "multipart/form-data" },

      });
     
      Toast({ message: "Successfully Created", type: "success" });
      setNewDialog(false)
      await fetchRoles()
      formik.resetForm();
      
      } catch (error) {
      Toast({ message: "Error while creating banner", type: "error" });
    }
    finally {
      setIsSubmitting(false); 
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "privacypolicy",
      content:"",
      status: "",
    
    },
    // validationSchema: yup.object().shape({

    //   status: yup.string().required("Status is required"),
    //   content: yup.string().required("content is required"),
     
    // }),
    onSubmit,

  })
  const handleConfirmClosedelete = () => {
    setDeleteconfirmmodal(false)
  }
  const handleconfirmopendelete = async () => {

    try {
      await axios.delete(`${API_BASE_URL}/termspolicies/${selectedRowId}`);
      fetchRoles()
      Toast({ message: "Successfully Deleted", type: "success" });
    } catch (error) {
     
    } finally {
      setDeleteconfirmmodal(false);
    }

  }

  return (
    <>

      <section className="section">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <h4 className="page_heading">Service PrivacyPolice View Table</h4>
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
          <Modal.Title> Service PrivacyPolice </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="p-2"
          style={{ overflow: "scroll", overflowX: "hidden" }}
        >
          <form onSubmit={formik.handleSubmit}>


               <div className='col-12 mb-3'>
                                
                                   <div className="">
                                    <label htmlFor="content" className='form-label text-muted'>PrivacyPolice</label>
            
                                    <Editor
                                      id="content"
                                      name="content"
                                      value={formik.values.content}
                                      onTextChange={(e) => formik.setFieldValue("content", e.htmlValue)}
                                      onBlur={formik.handleBlur}
                                      style={{ height: "320px" }}
                                    />
                                    {formik.errors.content && formik.touched.content && (
                                      <p style={{ color: "red", fontSize: "12px" }}>
                                        {formik.errors.content}
                                      </p>
                                    )}
            
                                  </div>
                             </div>

                  
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                id="status"
                name="status"
                className="form-select "
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

export default PrivacyPolicy