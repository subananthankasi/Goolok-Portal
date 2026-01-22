import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TabView, TabPanel } from "primereact/tabview";
import Toast from "../../../../Utils/Toast";
import API_BASE_URL from "../../../../Api/api";
import axios from "axios";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";
import AddVideosAp from "./AddVideosAp";
import AddPhotosAP from "./AddPhotosAP";
import AddAttachmentsAP from "./AddAttachmentsAP";

const WholeMediaDptAP = ({ eid, id, status, pagetype }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const navigate = useNavigate();
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );


  const [postLoading, setPostLoading] = useState(false)
  const handleConfirm = async () => {
    setPostLoading(true)
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
      setPostLoading(false)
      navigate("/aproject_media#Complete");
    } catch (error) {
      const errorMessage =
        error.response?.data?.messages?.error ||
        error.message ||
        "Failed to update";
      setErrorMsg(errorMessage);
      setPostLoading(false)
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
        loading={postLoading}
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
                <AddVideosAp
                  eid={eid}
                  id={id}
                  status={status}
                  pagetype={pagetype}
                />
              </TabPanel>
              <TabPanel header="Gallery">
                <AddPhotosAP
                  eid={eid}
                  id={id}
                  status={status}
                  pagetype={pagetype}
                />
              </TabPanel>
              <TabPanel header="Attachments">
                <AddAttachmentsAP
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
              disabled={postLoading}
            >
              {postLoading ? "Processing..." : "Confirm"}
            </button>
          </div>
        )}
    </>
  );
};

export default WholeMediaDptAP;
