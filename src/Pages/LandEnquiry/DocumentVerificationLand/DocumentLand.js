import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WaitingDocLand from "./WaitingDocLand";
import PendingDocLand from "./PendingDocLand";
import CompleteDocLand from "./CompleteDocLand";
import API_BASE_URL from "../../../Api/api";
import axios from "axios";

const DocumentLand = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash === "waiting") setStep(1);
    else if (hash === "Pending") setStep(2);
    else if (hash === "Complete") setStep(3);
  }, []);

  const [waitingCount, setWaitingCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const staffid = JSON.parse(localStorage.getItem("token"));

useEffect(() => {
  getCounts();
}, []);

const getCounts = async () => {
  try {
    const [waitingRes, pendingRes, completeRes] = await Promise.all([
      axios.get(`${API_BASE_URL}/enquirywaiting`, {
        headers: {
          "Gl-status": "land",
          "Pr-Root": "xc7SkSIo5IGJv6w",
        },
      }),

      axios.get(
        `${API_BASE_URL}/enquiryreport?id=${staffid.loginid}&status=progress`,
        {
          headers: {
            "Gl-status": "land",
          },
        }
      ),

      axios.get(
        `${API_BASE_URL}/enquiryreport?id=${staffid.loginid}&status=complete`,
        {
          headers: {
            "Gl-status": "land",
          },
        }
      ),
    ]);

    setWaitingCount(waitingRes.data?.length || 0);
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
              {/* <input type="file" name="file" className="form-control" value={file} onChange={(e) => onChange(e)} /> */}
              <div className="card">
                <div className="card-header">
                  <div className="d-flex">
                    <div>
                      <nav className="nav">
                        <a
                          className={`nav-link link1 ${
                            step === 1 ? "active1" : ""
                          }`}
                          href="#waiting"
                          onClick={() => setStep(1)}
                         
                        >
                          Waiting  <span className="tab-count-badge">{waitingCount}</span>
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 2 ? "active1" : ""
                          }`}
                          href="#Pending"
                          onClick={() => setStep(2)}
                        
                        >
                          Pending <span className="tab-count-badge">{pendingCount}</span>
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 3 ? "active1" : ""
                          }`}
                          href="#Complete"
                          onClick={() => setStep(3)}
                        
                        >
                          Complete <span className="tab-count-badge">{completeCount}</span>
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
                      <WaitingDocLand setWaitingCount={setWaitingCount} />
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <PendingDocLand setPendingCount={setPendingCount} />
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <CompleteDocLand setCompleteCount={setCompleteCount} />
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

export default DocumentLand;
