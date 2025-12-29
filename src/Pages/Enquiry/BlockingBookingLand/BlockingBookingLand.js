import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PendingBlockBooking from "./PendingBlockBooking";
import BookingReports from "./BookingReports";

const BlockingBookingLand = () => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash === "Pending") setStep(1);
    else if (hash === "booking") setStep(2);
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
                          href="#booking"
                          onClick={() => setStep(2)}
                        >
                          Booking
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
                      <PendingBlockBooking />
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <BookingReports />
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

export default BlockingBookingLand;
