import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../../../Api/api";
import ConfirmationModal from "../../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../../Utils/AlertPop";
import Toast from "../../../../../Utils/Toast";
import { FMBSketchSurvey } from "./FMBSketchSurvey";
import BountryEntrySurvey from "./BountryEntrySurvey";
import { useSelector } from "react-redux";

export const WholeMandatoryComponent = (props) => {
  const navigate = useNavigate();
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false)
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  const handleConfirm = async () => {
    setConfirmLoading(true)
    try {
      await axios.get(
        `${API_BASE_URL}/servicemandatory/${props.eid}/${props.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Toast({ message: "Successfully Updated", type: "success" });
      setConfirmLoading(false)
      navigate("/mandadory_survey#Complete");
    } catch (error) {
      const errorMessage =
        error.response?.data?.messages?.error ||
        error.message ||
        "Failed to update";
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

      <div className="col-12 mt-4">
        <div className="card shadow border-0">
          <div className="card shadow border-0 p-4">
            <FMBSketchSurvey props={props} />
          </div>
        </div>
      </div>
      <BountryEntrySurvey eid={props.eid} id={props.id} status={props.status} pagetype={props.pagetype} />

      {staffid.Login === "staff" && props.status === "pending" && props.pagetype !== "reminder" && (
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
