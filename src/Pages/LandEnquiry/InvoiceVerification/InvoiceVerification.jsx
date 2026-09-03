import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import PendingDocument from "./PendingDocument";
import CompleteDocument from "./CompleteDocument";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";

function InvoiceVerification() {



  const [step, setStep] = useState(1);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash === "Pending") setStep(1);
    else if (hash === "Complete") setStep(2);
  }, []);

  let navigate = useNavigate();

  const [pendingCount, setPendingCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const staffid = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    getCounts();
  }, []);

  const getCounts = async () => {
    try {
      const [pendingRes, completeRes] = await Promise.all([
        axios.get(
          `${API_BASE_URL}/invoice`,
          {
            headers: {
              "Gl-status": 'pending',
              "Pr-Root": "land",
            }
          },
        ),

        axios.get(
          `${API_BASE_URL}/invoice`,
          {
            headers: {
              "Gl-status": 'success',
              "Pr-Root": "land"
            }
          },
        ),
      ]);
      setPendingCount(pendingRes.data?.length || 0);
      setCompleteCount(completeRes.data?.length || 0);
    } catch (err) {
      // console.log(err);
    }
  };

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
                          className={`nav-link link1 ${step === 1 ? "active1" : ""
                            }`}
                          href="#Pending"
                          onClick={() => setStep(1)}
                        >
                          Pending  <span className="tab-count-badge">
                            {pendingCount}
                          </span>
                        </a>
                        <a
                          className={`nav-link link1 ${step === 2 ? "active1" : ""
                            }`}
                          href="#Complete"
                          onClick={() => setStep(2)}
                        >
                          Complete  <span className="tab-count-badge">
                            {completeCount}
                          </span>
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
                <div className="card-b ody">
                  {step === 1 && (
                    <>
                      <PendingDocument />

                    </>
                  )}

                  {step === 2 && (
                    <>
                      <CompleteDocument />

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
}

export default InvoiceVerification;
