import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";
import { LawyerAddDocAp } from "./LawyerAddDocAp";
import { ClearanceDateLawyerAP } from "./ClearanceDateLawyerAP";
import DayToDayProgresslawyerAP from "./DayToDayProgresslawyerAP";
import { ProjectDetailsLawyerAP } from "./ProjectDetailsLawyerAP";
import { FinalOpinionLawyerAP } from "./FinalOpinionLawyerAP";
import TicketClosingLawyerAP from "./TicketClosingLawyerAP";
// import { LawyerAddDocumentCom } from "./LawyerAddDocumentCom";

export const WholeLawyerDocumentAP = (props) => {
  const navigate = useNavigate();
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const [postLoading, setPostLoading] = useState(false)

  const handleConfirm = async () => {
    setPostLoading(true)
    try {
      await axios.post(
        `${API_BASE_URL}/completeaprtmentprwork`,
        { enqid: props.eid, id: props.id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Toast({ message: "Successfully Updated", type: "success" });
      setPostLoading(false)
      navigate("/aproject_lawyerdocument#Complete");
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

      <div className="col-12 mt-4">
        <LawyerAddDocAp data={props} />
        <ClearanceDateLawyerAP data={props} />
        <DayToDayProgresslawyerAP data={props} />
        <ProjectDetailsLawyerAP
          eid={props.eid}
          id={props.id}
          status={props.status}
          pagetype={props.pagetype}
          subtype={props.subtype}
        />
        <TicketClosingLawyerAP
          eid={props.eid}
          id={props.id}
          status={props.status}
          pagetype={props.pagetype}
          subtype={props.subtype}
        />
        <FinalOpinionLawyerAP data={props} />
        {/* {props?.subtype === "Land" ? (
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
          subtype = {props.subtype}
        />
        )}
        <FinalOpinionCom data={props} /> */}

        {staffid.logintype == "staff" &&
          props.status == "pending" &&
          props.pagetype !== "reminder" && (
            <div className="ms-2 mt-3 mb-3 text-end">
              <button
                onClick={() => setIsVerifyConfirm(true)}
                className="btn1 me-2"
                disabled={postLoading}
              >
                {postLoading ? "Processing..." : "Confirm"}
              </button>
            </div>
          )}
      </div>
    </>
  );
};
