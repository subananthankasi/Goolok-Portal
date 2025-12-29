import React, { useRef, useState } from "react";
import FileViewUtils from "../../../../Utils/FileView/FileViewUtils";
import { IMG_PATH } from "../../../../Api/api";
import PattaDetailsAP from "./PattaDetailsAP";
import PattaSurveyAP from "./PattaSurveyAP";
import AadharDetailsAP from "./AadharDetailsAP";
import TitleDetailsAP from "./TitleDetailsAP";
import TitleSurveyAP from "./TitleSurveyAP";
import TitleProjectAP from "./TitleProjectAP";


const AddMoreAP = ({ isOpen, closeModal, data }) => {
  const [step, setStep] = useState(1);
  const formRef = useRef();

  const handleClose = () => {
    if (formRef.current) {
      formRef.current();
    }
    closeModal(false);
    setStep(1);

  };
  // const handleClose = () => {
  //   closeModal(false);
  //   setStep(1);
  // };
  const [isLoading, setIsLoading] = useState("");

  return (
    <>
      <div
        className={`modal p-0 modal-overlay ${isOpen ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-fullscreen" role="document">
          <div className="modal-content">
            <div className="d-flex" style={{ alignItems: "center" }}>
              <button
                type="button"
                className="close closebutton"
                onClick={() => {
                  handleClose();
                  // setError("");
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="card-body">
              <div className="row p-2">
                <div className="col-6">
                  <FileViewUtils
                    fileUrls={`${IMG_PATH}/enquiry/${data?.document}`}
                  />
                </div>
                <div className="col-6 ">
                  <div>
                    {data?.doc_type === "Aadhaar" ? (
                      <h4 className="page_subheading m-3">
                        {data.doc_type} Details
                      </h4>
                    ) : (
                      <nav className="nav">
                        <button
                          style={{ height: "45px", fontSize: "14px" }}
                          className={`nav-link link1 ${step === 1 ? "active1" : ""
                            }`}
                          onClick={() => {
                            setStep(1);
                          }}
                        >
                          {data.doc_type} Details 1
                        </button>
                        <button
                          style={{ height: "45px", fontSize: "14px" }}
                          className={`nav-link link1 ${step === 2 ? "active1" : ""
                            }`}
                          onClick={() => {
                            setStep(2);
                          }}
                        >
                          {data.doc_type} Details 2
                        </button>

                        {data?.doc_type === "Title document" && (
                          <button
                            style={{ height: "45px", fontSize: "14px" }}
                            className={`nav-link link1 ${step === 3 ? "active1" : ""
                              }`}
                            onClick={() => {
                              setStep(3);
                            }}
                          >
                            Project details
                          </button>
                        )}

                      </nav>
                    )}
                    <hr className="m-0" />
                    <div
                      className="p-0 m-0"
                      style={{ height: "540px", overflowY: "scroll", overflowX: "hidden" }}
                    >
                      {data?.doc_type == "Patta" && (
                        <div className="">
                          {step === 1 &&
                            (isLoading == 1 ? (
                              <div
                                className="d-flex justify-content-center "
                                style={{
                                  position: "fixed",
                                  width: "50%",
                                  height: "85%",
                                  color: "white",
                                  backgroundColor: "white",
                                  opacity: 0.5,
                                  zIndex: 9999,
                                  alignItems: "center",
                                }}
                              >
                                <div>
                                  <l-waveform
                                    size="35"
                                    stroke="3.5"
                                    speed="1"
                                    color="black"
                                  ></l-waveform>
                                </div>
                              </div>
                            ) : (
                              <>
                                <PattaDetailsAP data={data} setStep={setStep} />
                              </>
                            ))}
                          {step === 2 && (
                            <>
                              <PattaSurveyAP data={data} />
                            </>
                          )}
                        </div>
                      )}

                      {data?.doc_type == "Aadhaar" && (
                        <AadharDetailsAP data={data} isOpen={isOpen} clearFormRef={formRef} />
                      )}
                      {data?.doc_type == "Title document" && (
                        <>
                          {step === 1 &&
                            (isLoading == 4 ? (
                              <div
                                className="d-flex justify-content-center "
                                style={{
                                  position: "fixed",
                                  width: "50%",
                                  height: "85%",
                                  color: "white",
                                  backgroundColor: "white",
                                  opacity: 0.5,
                                  zIndex: 9999,
                                  alignItems: "center",
                                }}
                              >
                                <div>
                                  <l-waveform
                                    size="35"
                                    stroke="3.5"
                                    speed="1"
                                    color="black"
                                  ></l-waveform>
                                </div>
                              </div>
                            ) : (
                              <>
                                {" "}
                                <TitleDetailsAP data={data} setStep={setStep} />{" "}
                              </>
                            ))}
                          {step === 2 && (
                            <>
                              {" "}
                              <TitleSurveyAP data={data} />{" "}
                            </>
                          )}
                          {step === 3 && (
                            <>
                              {" "}
                              <TitleProjectAP data={data} />{" "}
                            </>
                          )}

                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMoreAP;
