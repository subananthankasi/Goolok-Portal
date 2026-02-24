import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClearanceDateApart } from "./ClearanceDateApart";
import DayToDayProgressApart from "./DayToDayProgressApart";
import { FinalOpinionApart } from "./FinalOpinionApart";
import { LawyerAddDocumentApart } from "./LawyerAddDocumentApart";
import { ProjectDetailsLawyerApart } from "./ProjectDetailsLawyerApart";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";


export const WholeApartLawyerDocuments = (props) => {

    const navigate = useNavigate()
    const staffid = JSON.parse(localStorage.getItem("token"));
    const [verifyConfirm, setIsVerifyConfirm] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false)

    const handleConfirm = async () => {
        setConfirmLoading(true)
        try {
            await axios.post(`${API_BASE_URL}/completeaptwork`, { enqid: props.eid, id: props.id },
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
            />
            <AlertPop
                isOpen={modalOpen}
                onClose={handleCloseModals}
                message={errorMsg}
            />

            <div className="col-12 mt-4">
                <LawyerAddDocumentApart data={props} />
                <ClearanceDateApart data={props} />
                <DayToDayProgressApart data={props} />
                <ProjectDetailsLawyerApart eid={props.eid} id={props.id} status={props.status} pagetype={props.pagetype} />
                <FinalOpinionApart data={props} />

                {(staffid.logintype === "staff" && props.status === "pending") && props.pagetype !== "reminder" && (
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
