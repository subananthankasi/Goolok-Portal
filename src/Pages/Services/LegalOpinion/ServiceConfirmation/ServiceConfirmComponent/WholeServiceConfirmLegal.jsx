import React, { useState } from "react";
// import ConfirmServiceComponent from './ConfirmServiceComponent'
// import AddService from './AddService'
// import ConfirmationModal from '../../../../Utils/ConfirmationModal';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmationModal from "../../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../../Utils/AlertPop";
import ServiceLegalComponent from "./ServiceLegalComponent";
import AddServiceLegal from "./AddServiceLegal";
import API_BASE_URL from "../../../../../Api/api";
import Toast from "../../../../../Utils/Toast";
// import API_BASE_URL from '../../../../Api/api';
// import Toast from '../../../../Utils/Toast';
// import AlertPop from '../../../../Utils/AlertPop';
// import ServiceLegalComponent from './ServiceLegalComponent';
// import AddServiceLegal from './AddServiceLegal';

const WholeServiceConfirmLegal = ({ eid, id, status, pagetype }) => {
  const staffid = JSON.parse(sessionStorage.getItem("token"));

  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModals = () => setModalOpen(false);
  const navigate = useNavigate();
  const [confirmLoading, setConfirmLoading] = useState(false)
  const handleConfirm = async () => {
    setConfirmLoading(true)
    try {
      await axios.get(`${API_BASE_URL}/confirmation/${eid}/${id}`);
      Toast({ message: "Successfully Updated", type: "success" });
      setConfirmLoading(false)
      navigate("/cofirm_service_legal#Complete");
    } catch (error) {
      const errorMessage =
        error.response?.data?.messages?.error ||
        error.message ||
        "Failed to update";
      setErrorMsg(errorMessage);
      setConfirmLoading(false)
      handleOpenModal();
    }
  };
  return (
    <div className="col-12 mt-4">
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
      <ServiceLegalComponent
        eid={eid}
        id={id}
        status={status}
        pagetype={pagetype}
      />
      <AddServiceLegal eid={eid} id={id} status={status} pagetype={pagetype} />

      {staffid.logintype == "staff" &&
        status == "pending" &&
        pagetype !== "reminder" && (
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
    </div>
  );
};

export default WholeServiceConfirmLegal;
