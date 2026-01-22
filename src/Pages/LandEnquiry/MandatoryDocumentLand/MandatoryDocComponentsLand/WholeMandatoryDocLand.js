import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import AlertPop from "../../../../Utils/AlertPop";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import AnotherBountryEntry from "./AnotherBountryEntry";
import { BoundryEntry } from "./BoundryEntry";
import AddDocument from "./AddDocument";


export const WholeMandatoryDocLand = (props) => {

    const navigate = useNavigate()
    const staffid = JSON.parse(localStorage.getItem("token"));
    const [verifyConfirm, setIsVerifyConfirm] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false)


    const handleConfirm = async () => {
        setConfirmLoading(true)
        try {
            await axios.post(`${API_BASE_URL}/completemandatory`, { enqid: props.eid, id: props.id },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            Toast({ message: "Successfully Updated", type: "success" });
            navigate("/mandatory_docs#Complete");
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
                            <h6>Mandatory docs and fields fillup</h6>
                        </div>

                        <hr />

                        {/* add document  */}
                        <AddDocument props={props} />

                        {/* Boundry Entry   */}
                        {props.landtype === "Agricultural Land" ? (
                            <BoundryEntry props={props} />
                        ) : (
                            <AnotherBountryEntry eid={props.eid} id={props.id} status={props.status} pagetype={props.pagetype} />
                        )}

                        {(staffid.logintype == "staff" && props.status == "pending") && (
                            <div className="text-end mt-3">
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
                </div>
            </div>
        </>
    );
};
