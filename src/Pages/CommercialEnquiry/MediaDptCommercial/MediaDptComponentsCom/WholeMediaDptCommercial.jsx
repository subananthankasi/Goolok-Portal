import  {  useState } from "react";
import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import { TabView, TabPanel } from "primereact/tabview";
import Toast from "../../../../Utils/Toast";
import API_BASE_URL from "../../../../Api/api";
import axios from "axios";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";
import AddVideosCom from "./AddVideosCom";
import AddPhotosCom from "./AddPhotosCom";
import AddAttachementsCom from "./AddAttachementsCom";

const WholeMediaDptCommercial = ({ eid, id, status, pagetype }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const navigate = useNavigate();
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  const [confirmLoading, setConfirmLoading] = useState(false)
  const handleConfirm = async () => {
    setConfirmLoading(true)
    try {
      await axios.post(
        `${API_BASE_URL}/mediacomplete`,
        { enqid: eid, id: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Toast({ message: "Successfully Updated", type: "success" });
      setConfirmLoading(false)
      navigate("/commercial_media#Complete");
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
              <h6>Media Department</h6>
            </div>

            <hr />
            <TabView>
              <TabPanel header="Videos">
                <AddVideosCom
                  eid={eid}
                  id={id}
                  status={status}
                  pagetype={pagetype}
                />
              </TabPanel>
              <TabPanel header="Gallery">
                <AddPhotosCom
                  eid={eid}
                  id={id}
                  status={status}
                  pagetype={pagetype}
                />
              </TabPanel>
              <TabPanel header="Attachments">
                <AddAttachementsCom
                  eid={eid}
                  id={id}
                  status={status}
                  pagetype={pagetype}
                />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
      {staffid.logintype == "staff" &&
        (status === "pending" || status === "complete") &&
        pagetype !== "reminder" && enquiryDoumentData?.status !== "booking" && (
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

export default WholeMediaDptCommercial;
