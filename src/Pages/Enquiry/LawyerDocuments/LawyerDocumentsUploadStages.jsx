import { LawyerAddDocument } from "../Reusable/Lawyer/LawyerAddDocument";
import DayToDayProgress from "../Reusable/Lawyer/DayToDayProgress";
import { FinalOpinion } from "../Reusable/Lawyer/FinalOpinion";
import { Clearancedate } from "../Reusable/Lawyer/Clearancedate";
import ConfirmationModal from "../../../Utils/ConfirmationModal";
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import Toast from "../../../Utils/Toast";
import { useNavigate } from "react-router-dom";
import AlertPop from "../../../Utils/AlertPop";

export const LawyerDocumentsUploadStages = (props) => {

  const navigate = useNavigate()
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleConfirm = async () => {
    setConfirmLoading(true)
    try {
      await axios.post(`${API_BASE_URL}/completework`, { enqid: props.eid, id: props.id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Toast({ message: "Successfully Updated", type: "success" });
      navigate("/lawyer_documents#Complete");
      setConfirmLoading(false)
    } catch (error) {
      const errorMessage =
        error.response?.data?.messages?.error ||
        error.message ||
        "Failed to update";
      setErrorMsg(errorMessage);
      handleOpenModal();
      setConfirmLoading(false)
    }
  }



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
            <div className="d-flex justify-content-between">
              <h6>Legal Opinion by lawyer List of documents</h6>
            </div>

            <hr />

            <LawyerAddDocument data={props} />

            {/* Expected legal opinion clearance date   */}
            <Clearancedate data={props} />

            {/* day to day progress  */}
            <DayToDayProgress data={props} />

            {/* final opinion  */}
            <FinalOpinion data={props} />


            {(staffid.logintype == "staff" && props.status == "pending") && (
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
