import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PendingRegTicketTele from "./PendingRegTicketTele";
import PostPonedTikcetTele from "./PostPonedTikcetTele";


const StaffTicketsTele = () => {

  const [step, setStep] = useState(1);
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash === "Pending") setStep(1);
    else if (hash === "PostPoned") setStep(2);
  }, []);

  let navigate = useNavigate();


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
                          href="#waiting"
                          onClick={() => setStep(1)}
                        >
                          Pending
                        </a>


                        <a
                          className={`nav-link link1 ${step === 2 ? "active1" : ""
                            }`}
                          href="#Pending"
                          onClick={() => setStep(2)}
                        >
                          PostPoned Ticket
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
                      <PendingRegTicketTele />
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <PostPonedTikcetTele />
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

export default StaffTicketsTele;
