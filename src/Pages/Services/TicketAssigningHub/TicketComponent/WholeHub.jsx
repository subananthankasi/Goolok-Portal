import React, { useState } from 'react'
import ConfirmationModal from '../../../../Utils/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../../../Api/api';
import Toast from '../../../../Utils/Toast';
import AlertPop from '../../../../Utils/AlertPop';
import TicketAssigning from './TicketAssigning';

const WholeHub = ({ eid, id, status, pagetype }) => {
    const staffid = JSON.parse(sessionStorage.getItem('token'));

    const [verifyConfirm, setIsVerifyConfirm] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModals = () => setModalOpen(false);
    const navigate = useNavigate()
    const handleConfirm = async () => {
        try {
            await axios.get(`${API_BASE_URL}/confirmation/${eid}/${id}`);
            Toast({ message: "Successfully Updated", type: "success" });
            navigate("/cofirm_service#Complete")
        } catch (error) {
            const errorMessage = error.response?.data?.messages?.error || error.message || "Failed to update";
            setErrorMsg(errorMessage);
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
            />

            <AlertPop
                isOpen={modalOpen}
                onClose={handleCloseModals}
                message={errorMsg}
            />
            {/* <ConfirmServiceComponent eid={eid} id={id} status={status} pagetype={pagetype} /> */}
            {/* <AddService eid={eid} id={id} status={status} pagetype={pagetype} /> */}
            <TicketAssigning eid={eid} id={id} status={status} pagetype={pagetype} />

            {staffid.logintype === "staff" && status === "pending" && pagetype !== "reminder" && (
                <div className="text-end mt-3 mb-3">
                    <a
                        href="#0"
                        onClick={() => setIsVerifyConfirm(true)}
                        className="btn1"
                    >
                        Confirm
                    </a>
                </div>
            )}
        </div>
    )
}

export default WholeHub