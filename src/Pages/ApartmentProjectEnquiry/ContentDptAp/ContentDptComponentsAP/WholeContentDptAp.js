import React, { useState } from 'react'
import { Tabs } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../../../Api/api';
import Toast from '../../../../Utils/Toast';
import ConfirmationModal from '../../../../Utils/ConfirmationModal';
import AlertPop from '../../../../Utils/AlertPop';
import DescriptionContentAP from './DescriptionContentAP';
import LocalitiesContentAp from './LocalitiesContentAp';
import TagsContentAP from './TagsContentAP';


const WholeContentDptAp = ({ eid, id, status, pagetype, subtype }) => {

  const navigate = useNavigate()
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const [postLoading, setPostLoading] = useState(false)

  const handleConfirm = async () => {
    setPostLoading(true)
    try {
      await axios.post(`${API_BASE_URL}/contentdpt/confirm`, { enqid: eid, id: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Toast({ message: "Successfully Updated", type: "success" });
      navigate("/aproject_contentwriting#Complete");
      setPostLoading(false)

    } catch (error) {
      const errorMessage =
        error.response?.data?.messages?.error ||
        error.message ||
        "Failed to update";
      setErrorMsg(errorMessage);
      handleOpenModal();
      setPostLoading(false)
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
        loading={postLoading}
      />
      <AlertPop
        isOpen={modalOpen}
        onClose={handleCloseModals}
        message={errorMsg}
      />
      <div className='p-2 mt-4'>
        <Tabs defaultActiveKey="1" >
          <Tabs.Tab eventKey="1" title="Description & Features">

            <DescriptionContentAP eid={eid} id={id} status={status} subtype={subtype} />
          </Tabs.Tab>
          <Tabs.Tab eventKey="2" title="Localities">
            <LocalitiesContentAp eid={eid} id={id} status={status} />
          </Tabs.Tab>
          <Tabs.Tab eventKey="3" title="Tags">
            <TagsContentAP eid={eid} id={id} status={status} />
          </Tabs.Tab>
        </Tabs>

        {(staffid.logintype == "staff" && status == "pending") && pagetype !== "reminder" && (
          <div className="text-end mt-3 mb-3">
            <button
              onClick={() => setIsVerifyConfirm(true)}
              className="btn1"
              disabled={postLoading}
            >
              {postLoading ? "Processing..." : "Confirm"}
            </button>
          </div>
        )}

      </div>
    </>

  )
}

export default WholeContentDptAp