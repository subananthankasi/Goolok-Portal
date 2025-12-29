import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../../Api/api";
import { useState } from "react";
import Toast from "../../../../Utils/Toast";
import { ApartLawyerAddDoc } from "./ApartmentLawyer/ApartLawyerAddDoc";
import ConfirmationModal from "./ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";
import { ApartClearancedate } from "./ApartmentLawyer/ApartClearancedate";
import { ApartDayToDayProgress } from "./ApartmentLawyer/ApartDayToDayProgress";
import { ApartFinalOpinion } from "./ApartmentLawyer/ApartFinalOpinion";



export const ApartmentLawyerDocUploadStages = (props) => {

    const navigate = useNavigate()
    const staffid = JSON.parse(sessionStorage.getItem("token"));
    const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  
    const handleConfirm = async () => {
      try {
        await axios.post(`${API_BASE_URL}/completework`, { enqid: props.eid, id: props.id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        Toast({ message: "Successfully Updated", type: "success" });
        navigate("/lawyer_documents#Complete");
      } catch (error) {
        const errorMessage =
          error.response?.data?.messages?.error ||
          error.message ||
          "Failed to update";
        setErrorMsg(errorMessage);
        handleOpenModal();
      }
    }
  
  
  
    // error alert
    const [modalOpen, setModalOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
  
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModals = () => setModalOpen(false);
    return (
      <>
        <ConfirmationModal
          isOpen={verifyConfirm}
          closeModal={() => setIsVerifyConfirm(false)}
          onConfirm={handleConfirm}
          message={"Are you sure this has been verified?"}
        />
        <AlertPop
          isOpen={modalOpen}
          onClose={handleCloseModals}
          message={errorMsg}
        />
  
        <div className="col-12 mt-4">
          <div className="card shadow border-0">
            <div className="card shadow border-0 p-4">
              <div className="d-flex justify-content-between">
                <h6>Legal Opinion by lawyer List of documents</h6>
              </div>
  
              <hr />
  
              <ApartLawyerAddDoc data={props} />
  
              {/* Expected legal opinion clearance date   */}
               <ApartClearancedate data={props} /> 
  
              {/* day to day progress  */}
               <ApartDayToDayProgress data={props} /> 
  
              {/* final opinion  */}
               <ApartFinalOpinion data={props} /> 
  
  
              {(staffid.logintype == "staff" && props.status == "pending") && (
                <div className="ms-2 text-end">
                  <a
                    href="#0"
                    onClick={() => setIsVerifyConfirm(true)}
                    className="btn1 me-2"
                  >
                    Confirm
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };
  