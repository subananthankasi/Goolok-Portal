import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../Reusable/Header";
import { TabView, TabPanel } from 'primereact/tabview';
import PriceDepartment from './PriceDepartmentUpdateStage';
import LocationSelect from "../Reusable/LocationSelect";
import { InvoiceDetails } from "../Reusable/InvoiceDetails";
import { MarketResearch } from "../Reusable/MarketResearch";
import { Priceproposal } from "../Reusable/Priceproposal";
import { PaymentLegalOpinion } from "../Reusable/PaymentLegalOpinion";
import { LawyerDocumentsUploadStages } from "../LawyerDocuments/LawyerDocumentsUploadStages";
import { DocumentVerification } from "../Reusable/DocumentVerification";
import { MandatoryDocumentUpdateStages } from "../MandatoryDocument/MandatoryDocumentUpdateStages";
import { EnquirySurveyUpdateStages } from "../Fieldsurvey/EnquirySurveyUpdateStages";
import PaymentScheduleUpdateStage from '../PaymentSchedule/PaymentScheduleUpdateStage';
import PaymentScheduleStage from '../PaymentScheduleStage/PaymentScheduleStage';
import { useDispatch } from 'react-redux';
import { pricingConfirmThunk } from '../../../Redux/Actions/Enquiry/pricingConfirmThunk';
import { Toast } from 'primereact/toast';
import { LandOwnerAgreement } from '../Reusable/LandOwnerAgreement';
import LandOwnerAddedTable from '../Reusable/LandOwnerAddedTable';
import LandOwnerDetails from '../Reusable/LandOwnerDetails';
import { decryptData } from '../../../Utils/encrypt';
import ConfirmationModal from '../../../Utils/ConfirmationModal';



const PricingDeptUpdate = () => {
  const { eid, id, status, landtype } = useParams();
  const decryLandtype = decryptData(landtype);
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useRef()
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModals = () => setModalOpen(false);
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false)


  const handleConfirm = async () => {
    const payload = {
      enqid: eid,
      id: id
    }
    try {
      setConfirmLoading(true)
      const response = await dispatch(pricingConfirmThunk(payload))
      if (pricingConfirmThunk.fulfilled.match(response)) {
        const message = response.payload.data;

        toast.current.show({ severity: 'success', summary: 'Successfully Submited', detail: ' Success', life: 3000 });
        navigate("/PricingDepartment#Complete");
        setConfirmLoading(false)

      } else if (pricingConfirmThunk.rejected.match(response)) {
        const errorPayload = response?.payload?.reason?.response?.data?.messages?.error

        toast.current.show({ severity: 'error', summary: errorPayload, detail: ' Rejected', life: 3000 });

      }
    }
    catch (error) {
      console.error(error)
      setConfirmLoading(false)
    }
  }


  return (
    <>
      <Toast ref={toast} />
      <ConfirmationModal
        isOpen={verifyConfirm}
        closeModal={() => setIsVerifyConfirm(false)}
        onConfirm={handleConfirm}
        message={"Are you sure this has been verified?"}
        loading={confirmLoading}
      />
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <Header eid={eid} />
            <TabView>
              <TabPanel header="Current">
                <PriceDepartment eid={eid} status={status} />
                <PaymentScheduleUpdateStage eid={eid} status={status} />
                {/* <PaymentScheduleStage id={id} eid={eid} status={status} /> */}

                {/* {(staffid.logintype == "staff" && status == "pending") && (
                  <div className="text-end mt-3 mb-3">
                    <a
                      href="#0"
                      onClick={handleConfirm}
                      className="btn1"
                    >
                      Confirm
                    </a>
                  </div>
                )} */}
                {(staffid.logintype == "staff" && status == "pending") && (
                  <div className="ms-2 text-end mt-4">
                    <a
                      href="#0"
                      onClick={() => setIsVerifyConfirm(true)}
                      className="btn1 me-2"
                      disabled={confirmLoading}
                    >
                      {confirmLoading ? "Processing..." : "Confirm"}
                    </a>
                  </div>
                )}

              </TabPanel>
              <TabPanel header="Remainder">
                <DocumentVerification eid={eid} pagetype="reminder"/>
                <InvoiceDetails id={eid} status={"success"} />
                <LocationSelect eid={eid} status={'complete'} pagetype="reminder" />
                <MarketResearch eid={eid} status={"complete"} pagetype="reminder" />
                <Priceproposal eid={eid} status={'complete'} pagetype="reminder" />
                <PaymentLegalOpinion eid={eid} status={'complete'} pagetype="reminder" />
                <LawyerDocumentsUploadStages eid={eid} status={'complete'} pagetype="reminder" />
                <MandatoryDocumentUpdateStages eid={eid} status={'complete'} pagetype="reminder" />
                <EnquirySurveyUpdateStages eid={eid} status={'complete'} pagetype="reminder" landtype={decryLandtype} />
                {/* <LandOwnerAgreement eid={eid} id={id} status={status} pagetype= "reminder"/> */}
                <LandOwnerDetails eid={eid} id={id} status={status} pagetype="reminder" />
                <LandOwnerAddedTable eid={eid} id={id} status={status} pagetype="reminder" />
                <LandOwnerAgreement eid={eid} id={id} status={status} pagetype="reminder" />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  )
}

export default PricingDeptUpdate