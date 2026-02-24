import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmServiceSurvey from "./ConfirmServiceSurvey";
import AddServiceSurvey from "./AddServiceSurvey";
import API_BASE_URL from "../../../../../Api/api";
import Toast from "../../../../../Utils/Toast";
import ConfirmationModal from "../../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../../Utils/AlertPop";

const WholeServiceSurvey = ({ eid, id, status, pagetype }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));

  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const [postLoading, setPostLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModals = () => setModalOpen(false);
  const navigate = useNavigate();
  const handleConfirm = async () => {
    setPostLoading(true)
    try {
      await axios.get(`${API_BASE_URL}/confirmation/${eid}/${id}`);
      Toast({ message: "Successfully Updated", type: "success" });
      setPostLoading(false)
      navigate("/service_confirm_survey#Complete");
    } catch (error) {
      const errorMessage =
        error.response?.data?.messages?.error ||
        error.message ||
        "Failed to update";
      setErrorMsg(errorMessage);
      handleOpenModal();
      setPostLoading(false)
    }
  };
  return (
    <div className="col-12 mt-4">
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
      <ConfirmServiceSurvey
        eid={eid}
        id={id}
        status={status}
        pagetype={pagetype}
      />
      <AddServiceSurvey eid={eid} id={id} status={status} pagetype={pagetype} />

      {staffid.logintype == "staff" &&
        status == "pending" &&
        pagetype !== "reminder" && (
          <div className="text-end mt-3 mb-3">
            <button
              onClick={() => setIsVerifyConfirm(true)}
              className="btn1"
              disabled={postLoading}
            >
              {postLoading ? "Processing..." : "Confirm"}
            </button>
          </div>
        )}
    </div>
  );
};

export default WholeServiceSurvey;
