import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WaitingRegTicketApart from "./WaitingRegTicketApart";
import PendingRegTicketApart from "./PendingRegTicketApart";
import CompleteRegTicketApart from "./CompleteRegTicketApart";
import PostPonedTicketApart from "./PostPonedTicketApart";

const RegistrationTicketApartment = () => {

  const [step, setStep] = useState(1);

  const staffid = JSON.parse(sessionStorage.getItem("token"));

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash === "waiting") setStep(1);
    else if (hash === "Pending") setStep(2);
    else if (hash === "Complete") setStep(3);
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
                          Waiting
                        </a>


                        <a
                          className={`nav-link link1 ${step === 2 ? "active1" : ""
                            }`}
                          href="#Pending"
                          onClick={() => setStep(2)}
                        >
                          Pending
                        </a>
                        <a
                          className={`nav-link link1 ${step === 3 ? "active1" : ""
                            }`}
                          href="#Complete"
                          onClick={() => setStep(3)}
                        >
                          Complete
                        </a>
                        <a
                          className={`nav-link link1 ${step === 4 ? "active1" : ""
                            }`}
                          href="#postpond"
                          onClick={() => setStep(4)}
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
                      <WaitingRegTicketApart />
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <PendingRegTicketApart />
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <CompleteRegTicketApart />
                    </>
                  )}
                  {step === 4 && (
                    <>
                      <PostPonedTicketApart />
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

export default RegistrationTicketApartment;
