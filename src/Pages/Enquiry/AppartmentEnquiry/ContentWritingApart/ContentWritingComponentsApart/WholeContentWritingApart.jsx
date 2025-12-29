import React, { useState } from 'react'
import { TabView, TabPanel } from "primereact/tabview";
import DescriptionContentApart from './DescriptionContentApart';
import { Tabs, Placeholder } from 'rsuite';
import ConfirmationModal from '../../../../../Utils/ConfirmationModal';
import AlertPop from '../../../../../Utils/AlertPop';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../../../../Api/api';
import Toast from '../../../../../Utils/Toast';
import LocalitiesContentApart from './LocalitiesContentApart';
import TagsContentApart from './TagsContentApart';


const WholeContentWritingApart = ({ eid, id, status, pagetype }) => {

  const navigate = useNavigate()
  const staffid = JSON.parse(sessionStorage.getItem("token"));
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
      navigate("/apart_content_Writing#Complete");
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
        loading = {confirmLoading}
      />
      <AlertPop
        isOpen={modalOpen}
        onClose={handleCloseModals}
        message={errorMsg}
      />
      <div className='p-2 mt-4'>
        <Tabs defaultActiveKey="1" >
          <Tabs.Tab eventKey="1" title="Description & Features">
            <DescriptionContentApart eid={eid} id={id} status={status} />
          </Tabs.Tab>
          <Tabs.Tab eventKey="2" title="Localities">
            <LocalitiesContentApart eid={eid} id={id} status={status} />
          </Tabs.Tab>
          <Tabs.Tab eventKey="3" title="Tags">
            <TagsContentApart eid={eid} id={id} status={status} />
          </Tabs.Tab>
        </Tabs>

        {(staffid.logintype == "staff" && status == "pending") && pagetype !== "reminder" && (
          <div className="text-end mt-3 mb-3">
            <button
              onClick={() => setIsVerifyConfirm(true)}
              className="btn1"
              disabled={confirmLoading}
            >
              Confirm
            </button>
          </div>
        )}

      </div>
    </>

  )
}

export default WholeContentWritingApart