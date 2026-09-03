import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PendingSellerPayment from "./PendingSellerPayment";
import CompleteSellerPayment from "./CompleteSellerPayment";
import axios from "axios";
import API_BASE_URL from "../../Api/api";

const SellerPayment = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash === "Pending") setStep(1);
    else if (hash === "Complete") setStep(2);
    // else if (hash === "Complete") setStep(3);
  }, []);
  const [data, SetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/sellerpayment`);
        SetData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex">
                    <div>
                      <nav className="nav">
                        <a
                          className={`nav-link link1 ${
                            step === 1 ? "active1" : ""
                          }`}
                          href="#Pending"
                          onClick={() => setStep(1)}
                        >
                          Pending
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 2 ? "active1" : ""
                          }`}
                          href="#Complete"
                          onClick={() => setStep(2)}
                        >
                          Complete
                        </a>
                      </nav>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                      <button className="btn1" onClick={() => navigate(-1)}>
                        <ArrowBackIcon /> back
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  {step === 1 && (
                    <>
                      <PendingSellerPayment pendingDatas = {data?.pending} loading ={loading} />
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <CompleteSellerPayment completeDatas = {data?.completed} loading ={loading}  />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SellerPayment;
