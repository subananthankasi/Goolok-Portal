import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import RegistrationIdAsale from "./RegistrationIdAsale";
import RegistrationDateAsale from "./RegistrationDateAsale";

const WholeRegistraionTickeAsale = ({ eid, id, status, shortform, bookingid, pagetype }) => {
  const navigate = useNavigate();
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const [postLoading, setPostLoading] = useState(false)
  const handleConfirm = async () => {
    setPostLoading(true)
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
      setPostLoading(false)
      navigate("/registeration_ticket#Complete");
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
      <RegistrationIdAsale
        eid={eid}
        id={id}
        status={status}
        shortform={shortform}
        bookingid={bookingid}
        pagetype={pagetype}
      />
      <RegistrationDateAsale
        eid={eid}
        id={id}
        status={status}
        shortform={shortform}
        bookingid={bookingid}
        pagetype={pagetype}
      />

      {staffid.logintype === "staff" && status === "pending" && pagetype !== "reminder" && (
        <div className="mt-3 mb-5 ms-2 mx-4  text-end">
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={() => setIsVerifyConfirm(true)}
            disabled={postLoading}
          >
            {postLoading ? "Processing..." : "Confirm"}
          </Button>
        </div>
      )}
    </>
  );
};
export default WholeRegistraionTickeAsale;
