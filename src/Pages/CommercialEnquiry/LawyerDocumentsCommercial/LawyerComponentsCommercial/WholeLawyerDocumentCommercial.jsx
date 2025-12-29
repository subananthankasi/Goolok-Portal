import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";
import { LawyerAddDocumentCom } from "./LawyerAddDocumentCom";
import { subDays } from "rsuite/esm/utils/dateUtils";
import { LandClearanceDateCom } from "./LandClearanceDateCom";
import { OtherClearanceDateCom } from "./OtherClearanceDateCom";
import DayToDayProgressLawyerCom from "./DayToDayProgressLawyerCom";
import { LandProjectdetailLawyerCom } from "./LandProjectdetailLawyerCom";
import { OtherProjectDetailLawyerCom } from "./OtherProjectDetailLawyerCom";
import { FinalOpinionCom } from "./FinalOpinionCom";
import TicketClosingLawyerCom from "./TicketClosingLawyerCom";

export const WholeLawyerDocumentCommercial = (props) => {
  const navigate = useNavigate();
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleConfirm = async () => {
    setConfirmLoading(true)
    try {
      await axios.post(
        `${API_BASE_URL}/completeplotwork`,
        { enqid: props.eid, id: props.id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Toast({ message: "Successfully Updated", type: "success" });
      setConfirmLoading(false)
      navigate("/commercial_lawyerdocument#Complete");
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
        <LawyerAddDocumentCom data={props} />
        {props?.subtype === "Land" ? (
          <LandClearanceDateCom data={props} />
        ) : (
          <OtherClearanceDateCom data={props} />
        )}

        <DayToDayProgressLawyerCom data={props} />
        {props?.subtype === "Land" ? (
          <LandProjectdetailLawyerCom
            eid={props.eid}
            id={props.id}
            status={props.status}
            pagetype={props.pagetype}
          />
        ) : (
          <OtherProjectDetailLawyerCom eid={props.eid}
            id={props.id}
            status={props.status}
            pagetype={props.pagetype}
            subtype={props.subtype}
          />
        )}
        {props.subtype !== "Land" && (
          <TicketClosingLawyerCom
            eid={props.eid}
            id={props.id}
            status={props.status}
            pagetype={props.pagetype}
            subtype={props.subtype}
          />
        )}
        <FinalOpinionCom data={props} />

        {staffid.logintype == "staff" &&
          props.status == "pending" &&
          props.pagetype !== "reminder" && (
            <div className="ms-2 mt-3 mb-3 text-end">
              <button
                onClick={() => setIsVerifyConfirm(true)}
                className="btn1 me-2"
                disabled={confirmLoading}
              >
                {confirmLoading ? "Processing..." : "Confirm"}
              </button>
            </div>
          )}
      </div>
    </>
  );
};
