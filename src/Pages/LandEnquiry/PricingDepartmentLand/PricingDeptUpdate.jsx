import { useRef, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { TabView, TabPanel } from 'primereact/tabview';
import { useDispatch } from 'react-redux';
import { pricingConfirmThunk } from '../../../Redux/Actions/Enquiry/pricingConfirmThunk';
import { Toast } from 'primereact/toast';
import { decryptData } from '../../../Utils/encrypt';
import ConfirmationModal from '../../../Utils/ConfirmationModal';
import WholeDocumentLand from '../DocumentVerificationLand/LandDocumentComponents/WholeDocumentLand';
import { InvoiceDetails } from '../InvoiceVerification/InvoiceComponentsLand/InvoiceDetails';
import LocationSelectLand from '../LocationVerifyLand/LocationComponents/LocationSelectLand';
import { WholeMarketResearchLand } from '../MarketResearchLand/MarketResearchComponentsLand/WholeMarketResearchLand';
import { PriceProposalLand } from '../PriceProposalAgreement/PriceProposalComponentLand/PriceProposalLand';
import { PaymentLegalOpinionLand } from '../PaymentLegalopinion/PaymentLegalOpinionComponent/PaymentLegalOpinionLand';
import { WholeLawyerDocumentLand } from '../LawyerDocumentsLand/LawyerDocumentComponents/WholeLawyerDocumentLand';
import { WholeMandatoryDocLand } from '../MandatoryDocumentLand/MandatoryDocComponentsLand/WholeMandatoryDocLand';
import { WholeFieldSurveyLand } from '../FieldsurveyLand/FieldsurveyComponentsLand/WholeFieldSurveyLand';
import { Header } from '../../Enquiry/Reusable/Header';
import WholePricingDptLand from './PricingDptLandComponents/WholePricingDptLand';
import WholeLandOwnerAgreement from '../LandOwnerAgreement/LandOwnerAgreementComponents/WholeLandOwnerAgreement';



const PricingDeptUpdate = () => {
  const { eid, id, status, landtype } = useParams();
  const decryLandtype = decryptData(landtype);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useRef()
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
                <WholePricingDptLand eid={eid} status={status} id={id} />
              </TabPanel>
              <TabPanel header="Remainder">
                <WholeDocumentLand
                  eid={eid}
                  id={id}
                  status={status}
                  pagetype={"reminder"}
                />
                <InvoiceDetails id={eid} status={"success"} />
                <LocationSelectLand eid={eid} status={'complete'} pagetype="reminder" />
                <WholeMarketResearchLand eid={eid} status={"complete"} pagetype="reminder" />
                <PriceProposalLand eid={eid} status={'complete'} pagetype="reminder" />
                <PaymentLegalOpinionLand eid={eid} status={'complete'} pagetype="reminder" />
                <WholeLawyerDocumentLand eid={eid} id={id} status={status} pagetype="reminder" />
                <WholeMandatoryDocLand eid={eid} status={'complete'} pagetype="reminder" landtype={decryLandtype} />
                <WholeFieldSurveyLand eid={eid} id={id} status={status} landtype={decryLandtype} pagetype="reminder" />
                <WholeLandOwnerAgreement decryEid={eid} decryId={id} decryStatus={status} pagetype="reminder"/>
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  )
}

export default PricingDeptUpdate