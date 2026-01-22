import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import WaitingMarketCom from "./WaitingMarketCom";
import PendingMarketCom from "./PendingMarketCom";
import CompleteMarketCom from "./CompleteMarketCom";


function MarketResearchCom() {

  const staffid = JSON.parse(localStorage.getItem('token'));

  const [step, setStep] = useState(() => {
    if (staffid?.Login === "admin") {
      return 1;
    } else if (staffid?.Login === "staff") {
      return 2;
    } else {
      return 1;
    }
  });

  useEffect(() => {
    const hash = window.location.hash.slice(1);

    if (staffid?.Login === "admin") {
      if (hash === "waiting") setStep(1);
      else if (hash === "Pending") setStep(2);
      else if (hash === "Complete") setStep(3);
    } else if (staffid?.Login === "staff") {
      if (hash === "Pending") setStep(2);
      else if (hash === "Complete") setStep(3);
    }
  }, [staffid]);



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
                        {staffid.Login === "admin" && (
                          <a
                            className={`nav-link link1 ${step === 1 ? "active1" : ""
                              }`}
                            href="#waiting"
                            onClick={() => setStep(1)}
                          >
                            Assign work
                          </a>
                        )}

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
                  {step === 1 && staffid.Login === "admin" && (
                    <>
                      <WaitingMarketCom />

                    </>
                  )}

                  {step === 2 && (
                    <>
                      <PendingMarketCom />

                    </>
                  )}
                  {step === 3 && (
                    <>
                      <CompleteMarketCom />

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

export default MarketResearchCom;
