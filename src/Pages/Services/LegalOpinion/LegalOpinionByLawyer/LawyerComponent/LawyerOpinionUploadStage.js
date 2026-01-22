import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../../../Api/api";
import Toast from "../../../../../Utils/Toast";
import ConfirmationModal from "../../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../../Utils/AlertPop";
import { AddDocOpinionLawyer } from "./AddDocOpinionLawyer";
import { FinalOpinionLawyer } from "./FinalOpinionLawyer";
import { CleranceDateLawyer } from "./CleranceDateLawyer";
import { DayToDayProgressLawyer } from "./DayToDayProgressLawyer";

export const LawyerOpinionUploadStage = (props) => {
  const navigate = useNavigate();
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleConfirm = async () => {
    setConfirmLoading(true)
    try {
      await axios.post(
        `${API_BASE_URL}/completeservicework`,
        { enqid: props.eid, id: props.id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Toast({ message: "Successfully Updated", type: "success" });
      setConfirmLoading(false)
      navigate("/legalopinionlawyer#Complete");
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
      />
      <AlertPop
        isOpen={modalOpen}
        onClose={handleCloseModals}
        message={errorMsg}
      />

      <div className="col-12 mt-4">
        <div className="card shadow border-0">
          <div className="card shadow border-0 p-4">
            <div className="d-flex justify-content-between">
              <h6>Legal Opinion by lawyer List of documents</h6>
            </div>

            <hr />

            <AddDocOpinionLawyer data={props} />

            <CleranceDateLawyer data={props} />

            <DayToDayProgressLawyer data={props} />

            <FinalOpinionLawyer data={props} />

            {staffid.logintype == "staff" && props.status == "pending" && (
              <div className="ms-2 text-end">
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
        </div>
      </div>
    </>
  );
};
