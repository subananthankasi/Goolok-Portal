import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";
import DayToDayProgress from "./DayToDayProgress";
import { TicketClosing } from "./TicketClosing";
import AnotherTicketClosing from "./AnotherTicketClosing";
import RoadPathway from "./RoadPathway";
import MarkingGmap from "./MarkingGmap";
import { FMBsketch } from "./FMBsketch";

export const WholeFieldSurveyLand = (props) => {


  const navigate = useNavigate()
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleConfirm = async () => {
    setConfirmLoading(true)
    try {
      await axios.post(`${API_BASE_URL}/completesurvey`, { enqid: props.eid, id: props.id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Toast({ message: "Successfully Updated", type: "success" });
      navigate("/enq_fieldsurvey#Complete");
      setConfirmLoading(false)
    } catch (error) {
      const errorMessage =
        error.response?.data?.messages?.error ||
        error.message ||
        "Failed to update";
      setErrorMsg(errorMessage);
      handleOpenModal();
      setConfirmLoading(false)
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
              <h6>Field Survey</h6>
            </div>

            <hr />

            {/* DayToDayProgress */}
            <DayToDayProgress props={props} />

            {/* Ticke tClosing  */}
            {props.landtype == "Agricultural Land" ? (
              <TicketClosing props={props} />
            ) : (
              <AnotherTicketClosing eid={props.eid} id={props.id} status={props.status} pagetype={props.pagetype} />
            )}

            <RoadPathway props={props} />

            {/* Marking in Gmap*/}
            {/* <MarkingGmap props={props} /> */}
            <MarkingGmap eid={props.eid} id={props.id} status={props.status} pagetype={props.pagetype} />

            {/* <LocationSelect eid={props.eid} id={props.id} status={props.status} pagetype={props.pagetype} /> */}


            {/* final FMB sketch */}
            <FMBsketch props={props} />

            {(staffid.logintype == "staff" && props.status == "pending") && (
              <div className="text-end mt-3">
                <button
                  onClick={() => setIsVerifyConfirm(true)}
                  className="btn1"
                  disabled={confirmLoading}
                >
                  {confirmLoading ? "Processing..." : "Confirm"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
