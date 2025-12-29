import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import dummy from "../../Assets/images/dummyProfile.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; 
import DocumentNotification from "./DocumentNotification";
import InvoiceNotification from "./InvoiceNotification";

function EnquiryNotification() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            {loading ? (
              <div
                style={{
                  height: "32vh",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Spinner className="mt-auto" />
              </div>
            ) : (
              <>
                <div className="col-12">
                  <div className="d-flex justify-content-end">
                    <div
                      className="p-2 d-flex align-items-center mb-2 text-white"
                      style={{
                        cursor: "pointer",
                        background: "#2f4f4f",
                        clipPath: `polygon(20% 0, 100% 0, 100% 100%, 20% 100%, 0 50%)`,
                        justifyContent: "center",
                        width: "100px",
                        fontSize: "13px",
                      }}
                      onClick={() => navigate(-1)}
                    >
                      <ArrowBackIcon /> back
                    </div>
                  </div>
                  <div className="card shadow border-0">
                    <div className="row p-3 align-items-center">
                      <div className="col-4 text-center">
                        <img
                          src={dummy}
                          alt="image"
                          style={{ height: "auto", maxWidth: "100px" }}
                        />
                        <h6 className="text-center mt-2">Deva</h6>
                      </div>
                      <div className="col-4">
                        <div className="">
                          <p className="mb-3" style={{ fontSize: "13px" }}>
                            <b>Enquiry ID :</b> ENQID001
                          </p>
                          <p className="mb-3" style={{ fontSize: "13px" }}>
                            <b>Mobile :</b> 98565899974
                          </p>
                          <p className="mb-3" style={{ fontSize: "13px" }}>
                            <b>Email :</b> email@gmail.com
                          </p>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="">
                          <p className="mb-3" style={{ fontSize: "13px" }}>
                            <b>Enquiry Date :</b> 24/05/2024
                          </p>
                          <p className="mb-3" style={{ fontSize: "13px" }}>
                            <b>Property Type :</b> Land
                          </p>
                          <p className="mb-3" style={{ fontSize: "13px" }}>
                            <b>Subproperty Type :</b> Commercial land
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="col-12 mt-4">
                  <div className="card shadow border-0 p-4">
                    <h6>Notifications</h6>
                    <hr />

                    <div className="card card1">
                      <div className="card-body" onClick={()=>navigate('/document_notification/2')}> 
                        <div className="row align-items-center"> 
                          <div className="col-1">
                            <div className="text-center align-item-center bg_icon">
                              <AccountBalanceOutlinedIcon />
                            </div>
                          </div>
                          <div className="col-sm-12 col-lg-7">
                            <p
                              className="card-text"
                              style={{ fontSize: "14px" }}
                            >
                              <strong>
                                Successful Verification of Your Patta Document
                              </strong>{" "}
                              - Successful Verification of Your Patta Document
                            </p>
                          </div>
                          <div
                            className="col-sm-12 col-lg-4 text-end"
                            style={{ fontSize: "12px" }}
                          >
                            <p>24 Mar 2024</p>
                          </div>
                        </div>
                        
                      </div>
                    </div>

                    <div className="card card1">
                      <div className="card-body"  onClick={()=>navigate('/invoice_notification')}>
                        <div className="row align-items-center">
                          <div className="col-1">
                            <div className="text-center align-item-center bg_icon">
                              <AccountBalanceOutlinedIcon />
                            </div>
                          </div>
                          <div className="col-sm-12 col-lg-7">
                          <p
                              className="card-text"
                              style={{ fontSize: "14px" }}
                            >
                              <strong>
                              Invoice & Payments
                              </strong> {" "}
                              - Input the necessary payment details, including your invoice number, payment amount, and any other requested information
                            </p>
                          </div>
                          <div
                            className="col-sm-12 col-lg-4 text-end"
                            style={{ fontSize: "12px" }}
                          >
                            <p>24 Mar 2024</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card card1">
                      <div className="card-body" onClick={()=>navigate('/location_mapping_notification')}>
                        <div className="row">
                          <div className="col-1">
                            <div className="text-center align-item-center bg_icon">
                              <AccountBalanceOutlinedIcon />
                            </div>
                          </div>
                          <div className="col-sm-12 col-lg-7">
                          <p
                              className="card-text"
                              style={{ fontSize: "14px" }}
                            >
                              <strong>
                              Google map location mapping
                              </strong> {" "}
                              -  You can access Google Maps through the app on your phone or by visiting Google Maps Website on your browser
                            </p>
                          </div>
                          <div
                            className="col-sm-12 col-lg-4 text-end"
                            style={{ fontSize: "12px" }}
                          >
                            <p>24 Mar 2024</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card card1">
                      <div className="card-body" onClick={()=>navigate('/market_research_notification')}>
                        <div className="row">
                          <div className="col-1">
                            <div className="text-center align-item-center bg_icon">
                              <AccountBalanceOutlinedIcon />
                            </div>
                          </div>
                          <div className="col-sm-12 col-lg-7">
                          <p
                              className="card-text"
                              style={{ fontSize: "14px" }}
                            >
                              <strong>
                              Market Research
                              </strong> {" "}
                              -  Gain a deep understanding of your target audience, including preferences, buying behavior, and needs
                            </p>
                          </div>
                          <div
                            className="col-sm-12 col-lg-4 text-end"
                            style={{ fontSize: "12px" }}
                          >
                            <p>24 Mar 2024</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <DocumentNotification />

                <InvoiceNotification/>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default EnquiryNotification;
