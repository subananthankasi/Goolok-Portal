import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import DayToDayProgressPlot from "./DayToDayProgressPlot";
import MarkingGmapApart from "./MarkingGmapApart";
import TicketClosingApart from "./TicketClosingApart";
import BuildingDetails from "./BuildingDetails";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";


export const WholeFieldSurveyApart = (props) => {


    const navigate = useNavigate()
    const staffid = JSON.parse(localStorage.getItem("token"));
    const [verifyConfirm, setIsVerifyConfirm] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false)

    const handleConfirm = async () => {
        setConfirmLoading(true)
        try {
            await axios.post(`${API_BASE_URL}/completesurvey`, { enqid: props.eid, id: props.id },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            Toast({ message: "Successfully Updated", type: "success" });
            navigate("/apart_field_survey#Complete");
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

            <DayToDayProgressPlot props={props} />
            <TicketClosingApart eid={props.eid} id={props.id} status={props.status} pagetype={props.pagetype} />
            <BuildingDetails eid={props.eid} id={props.id} status={props.status} pagetype={props.pagetype} />
            <MarkingGmapApart eid={props.eid} id={props.id} status={props.status} pagetype={props.pagetype} />


            {(staffid.logintype === "staff" && props.status === "pending") && props.pagetype !== "reminder" && (
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
