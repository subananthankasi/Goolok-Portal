import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../../../Api/api";
import ConfirmationModal from "../../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../../Utils/AlertPop";
import Toast from "../../../../../Utils/Toast";
import TicketAssignSurvey from "./TicketAssignSurvey";
import BountryEntrySurvey from "../../MandodaryDocsSurvey/WholeManComponent/BountryEntrySurvey";
import BountryTicketSurvey from "./BountryTicketSurvey";
import SurveyDateConfirmation from "./SurveyDateConfirmation";
import MediaTicketSurvey from "./MediaTicketSurvey/MediaTicketSurvey";
import TicketClosingComponentSurvey from "./TicketClosingInput/TicketClosingComponentSurvey";



const WholeTicketSurvey = ({ eid, id, status }) => {
  const navigate = useNavigate();
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleConfirm = async () => {
    setConfirmLoading(true)
    try {
      await axios.get(`${API_BASE_URL}/servicehub/${eid}/${id}`);
      Toast({ message: "Successfully Updated", type: "success" });
      setConfirmLoading(false)
      navigate("/ticket_assigning_hub#Complete")
    } catch (error) {
      const errorMessage = error.response?.data?.messages?.error || error.message || "Failed to update";
      setErrorMsg(errorMessage);
      handleOpenModal();
      setConfirmLoading(false)
    }
  };

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
        loading={confirmLoading}
      />
      <AlertPop
        isOpen={modalOpen}
        onClose={handleCloseModals}
        message={errorMsg}
      />
      <TicketAssignSurvey eid={eid} id={id} status={status} />
      <BountryTicketSurvey eid={eid} id={id} status={status} />
      <SurveyDateConfirmation eid={eid} id={id} status={status} />
      <MediaTicketSurvey eid={eid} id={id} status={status} />
      <TicketClosingComponentSurvey eid={eid} id={id} status={status} />

      {staffid.logintype == "staff" && status == "pending" && (
        <div className="text-end mt-3 mb-3">
          <button
            onClick={() => setIsVerifyConfirm(true)}
            className="btn1"
            disabled={confirmLoading}
          >
            {confirmLoading ? "Processing..." : "Confirm"}
          </button>
        </div>
      )}
    </>
  );
};
export default WholeTicketSurvey