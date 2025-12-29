import {  useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import RegistrationIdLand from "./RegistrationIdLand";
import RegistratinDateLand from "./RegistratinDateLand";

const WholeRegTicketLand = ({ eid, id, status, shortform, bookingid,pagetype }) => {
  const navigate = useNavigate();
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);

  const handleConfirm = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/confirmticket`,
        { enqid: eid, id: id, bid: bookingid },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Toast({ message: "Successfully Updated", type: "success" });
      navigate("/registeration_ticket#Complete");
    } catch (error) {
      const errorMessage =
        error.response?.data?.messages?.error ||
        error.message ||
        "Failed to update";
      setErrorMsg(errorMessage);
      handleOpenModal();
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
      />
      <AlertPop
        isOpen={modalOpen}
        onClose={handleCloseModals}
        message={errorMsg}
      />
      <RegistrationIdLand
        eid={eid}
        id={id}
        status={status}
        shortform={shortform}
        bookingid={bookingid}
        pagetype = {pagetype}
      />
      <RegistratinDateLand
        eid={eid}
        id={id}
        status={status}
        shortform={shortform}
        bookingid={bookingid}
        pagetype = {pagetype}
      />

      {staffid.logintype === "staff" && status === "pending"  && pagetype !== "reminder"  &&(
        <div className="mt-3 ms-2 mx-4 mb-3 text-end">
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={() => setIsVerifyConfirm(true)}
          >
            Confirms
          </Button>
        </div>
      )}
    </>
  );
};
export default WholeRegTicketLand;
