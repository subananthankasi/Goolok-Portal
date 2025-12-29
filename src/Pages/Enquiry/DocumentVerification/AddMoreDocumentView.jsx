import React, { useEffect, useState } from 'react'
import API_BASE_URL from '../../../Api/api';
import axios from 'axios';

const AddMoreDocumentView = ({ isOpen, closeModal, data }) => {
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [pageLoading, setPageLoadingPage] = useState(true);
  const [fetchData, setFetchData] = useState([]);
  const [isfetchInputData, setFetchInputData] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});



  const existingData = isfetchInputData?.details ? JSON.parse(isfetchInputData.details) : {};

  const fetch = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/lawyer/${data.lawyer_doc}/edit`
      );
      setFetchData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setPageLoadingPage(false);
    }
  };


  const fetchInputData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/alldetails/${data.id}`
      );
      setFetchInputData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }
  useEffect(() => {
    if (isOpen) {
      fetch();
      fetchInputData()
    }
  }, [isOpen]);

  useEffect(() => {
    if (isfetchInputData) {
      setFormData({
        ...existingData
      })
    }
  }, [isfetchInputData])

  const closing = () => {
    closeModal(false);
    fetch()
    fetchInputData()
  }

  return (
    <div
      className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"

    >
      <div className="modal-dialog modal-xl" role="document" style={{ width: "50%" }}>
        <div className="modal-content">
          <div className="d-flex p-1" style={{ alignItems: "center" }}>
            <h6 className='ps-3'>{data.doc_type} </h6>
            <button
              type="button"
              className="close closebutton"
              // onClick={() => { closeModal(false); }}
              onClick={closing}

            >
              <span aria-hidden="true">&times;</span>
            </button>

          </div>
          <hr className="m-0" />
          <div className='card p-3'>

            {fetchData?.map((item, index) => (

              <div className="row" key={index}>
                <div className="col-4 mb-3">
                  <label htmlFor={item.documentsub} className="form-label">
                    {item.documentsub}
                  </label>
                </div>
                <div className="col-8 mb-3">
                  <input
                    type="text"
                    className={`form-control  ${errors[item.documentsub] ? "is-invalid" : ""
                      }`}
                    autoComplete="off"
                    name={item.documentsub}
                    value={formData[item.documentsub] || ""}
                    style={{ width: "50%" }}

                  />
                  {errors[item.documentsub] && (
                    <div className="invalid-feedback">
                      {errors[item.documentsub]}
                    </div>
                  )}
                </div>
              </div>

            ))}





          </div>


        </div>
      </div>
    </div>
  )
}

export default AddMoreDocumentView