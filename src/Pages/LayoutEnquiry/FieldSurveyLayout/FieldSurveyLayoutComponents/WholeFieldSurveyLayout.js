import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";
import DayToDayProgressFieldLayout from "./DayToDayProgressFieldLayout";
import { TicketClosingFieldLayout } from "./TicketClosingFieldLayout";
import RoadPathwayDetailsLayout from "./RoadPathwayDetailsLayout";
import MarkingGmapLayout from "./MarkingGmapLayout";

export const WholeFieldSurveyLayout = (props) => {
  const navigate = useNavigate();
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleConfirm = async () => {
    setConfirmLoading(true)
    try {
      await axios.post(
        `${API_BASE_URL}/completesurvey`,
        { enqid: props.eid, id: props.id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Toast({ message: "Successfully Updated", type: "success" });
      setConfirmLoading(false)
      navigate("/layout_fieldsurvey#Complete");
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

      <DayToDayProgressFieldLayout props={props} />
      <TicketClosingFieldLayout
        eid={props.eid}
        id={props.id}
        status={props.status}
        pagetype={props.pagetype}
      />
      <RoadPathwayDetailsLayout
        eid={props.eid}
        id={props.id}
        status={props.status}
        pagetype={props.pagetype}
      />
      <MarkingGmapLayout
        eid={props.eid}
        id={props.id}
        status={props.status}
        pagetype={props.pagetype}
      />

      {staffid.logintype == "staff" &&
        props.status == "pending" &&
        props.pagetype !== "reminder" && (
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
