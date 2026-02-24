import { useState } from 'react'
import { Tabs } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../../../Api/api';
import Toast from '../../../../Utils/Toast';
import ConfirmationModal from '../../../../Utils/ConfirmationModal';
import AlertPop from '../../../../Utils/AlertPop';
import DescriptionContentCom from './DescriptionContentCom';
import LocalitiesContentCom from './LocalitiesContentCom';
import TagesContentCom from './TagesContentCom';


const WholeContentWritingCommercial = ({ eid, id, status, pagetype, subtype }) => {

  const navigate = useNavigate()
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleConfirm = async () => {
    setConfirmLoading(true)
    try {
      await axios.post(`${API_BASE_URL}/contentdpt/confirm`, { enqid: eid, id: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Toast({ message: "Successfully Updated", type: "success" });
      setConfirmLoading(false)
      navigate("/commercial_contentwriting#Complete");
    } catch (error) {
      const errorMessage =
        error.response?.data?.messages?.error ||
        error.message ||
        "Failed to update";
      setErrorMsg(errorMessage);
      setConfirmLoading(false)
      handleOpenModal();
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
      <div className='p-2 mt-4'>
        <Tabs defaultActiveKey="1" >
          <Tabs.Tab eventKey="1" title="Description & Features">

            <DescriptionContentCom eid={eid} id={id} status={status} subtype={subtype} />
          </Tabs.Tab>
          <Tabs.Tab eventKey="2" title="Localities">
            <LocalitiesContentCom eid={eid} id={id} status={status} />
          </Tabs.Tab>
          <Tabs.Tab eventKey="3" title="Tags">
            <TagesContentCom eid={eid} id={id} status={status} />
          </Tabs.Tab>
        </Tabs>

        {(staffid.logintype == "staff" && status == "pending") && pagetype !== "reminder" && (
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
    </>

  )
}

export default WholeContentWritingCommercial