import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";
import { LawyerAddDocumentPlot } from "./LawyerAddDocumentPlot";
import { ClearanceDaatePlot } from "./ClearanceDaatePlot";
import { DayToDayProgressPlot } from "./DayToDayProgressPlot";
import { ProjectDetailsLawyerPlot } from "./ProjectDetailsLawyerPlot";
import { FinalOpinionPlot } from "./FinalOpinionPlot";

export const PlotLawyerDocument = (props) => {
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
      navigate("/plot_lawyer_document#Complete");

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
        <LawyerAddDocumentPlot data={props} />
        <ClearanceDaatePlot data={props} />
        <DayToDayProgressPlot data={props} />
        <ProjectDetailsLawyerPlot
          eid={props.eid}
          id={props.id}
          status={props.status}
          pagetype={props.pagetype}
        />
        <FinalOpinionPlot data={props} />

        {staffid.logintype == "staff" && props.status == "pending" && props.pagetype !== "reminder" && (
          <div className="ms-2 mt-3 mb-3 text-end">
            <button
              onClick={() => setIsVerifyConfirm(true)}
              className="btn1 me-2"
              disabled = {confirmLoading}
            >
              {confirmLoading ? "Processing..." : "Confirm"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};
