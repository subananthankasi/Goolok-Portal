import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../../../Api/api";
import Toast from "../../../../../Utils/Toast";
import AlertPop from "../../../../../Utils/AlertPop";
import ConfirmationModal from "../../../../Enquiry/Reusable/AppartResuable/ConfirmationModal";
import TicketFollowDateMissing from "./TicketFollowDateMissing";
import FileUploadMissing from "./FileUploadMissing";
import { useSelector } from "react-redux";

const WholeTicketHubMissing = ({ eid, id, status }) => {
  const navigate = useNavigate();
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const [postLoading, setPostLoading] = useState(false)
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  const handleConfirm = async () => {
    setPostLoading(true)
    try {
      await axios.get(`${API_BASE_URL}/servicehub/${eid}/${id}`);
      Toast({ message: "Successfully Updated", type: "success" });
      setPostLoading(false)
      navigate("/ticket_hub_missing#Complete");
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
        loading={postLoading}
      />
      <AlertPop
        isOpen={modalOpen}
        onClose={handleCloseModals}
        message={errorMsg}
      />
      <TicketFollowDateMissing eid={eid} id={id} status={status} />
      <FileUploadMissing eid={eid} id={id} status={status} />

      {staffid.logintype == "staff" && status == "pending" && (
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
    </>
  );
};
export default WholeTicketHubMissing;
