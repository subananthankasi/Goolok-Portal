import { useParams } from "react-router-dom";
import { TabView, TabPanel } from 'primereact/tabview';
import { decryptData } from "../../../Utils/encrypt";
import { WholeFieldSurveyLand } from "./FieldsurveyComponentsLand/WholeFieldSurveyLand";
import WholeDocumentLand from "../DocumentVerificationLand/LandDocumentComponents/WholeDocumentLand";
import { InvoiceDetails } from "../InvoiceVerification/InvoiceComponentsLand/InvoiceDetails";
import LocationSelectLand from "../LocationVerifyLand/LocationComponents/LocationSelectLand";
import { WholeMarketResearchLand } from "../MarketResearchLand/MarketResearchComponentsLand/WholeMarketResearchLand";
import { PriceProposalLand } from "../PriceProposalAgreement/PriceProposalComponentLand/PriceProposalLand";
import { PaymentLegalOpinionLand } from "../PaymentLegalopinion/PaymentLegalOpinionComponent/PaymentLegalOpinionLand";
import { WholeLawyerDocumentLand } from "../LawyerDocumentsLand/LawyerDocumentComponents/WholeLawyerDocumentLand";
import { Header } from "../../Enquiry/Reusable/Header";
import { WholeMandatoryDocLand } from "../MandatoryDocumentLand/MandatoryDocComponentsLand/WholeMandatoryDocLand";


function FieldSurveyUpdate() {

  const { eid, sid, status, landtype } = useParams();
  const decryEid = decryptData(eid);
  const decryId = decryptData(sid);
  const decryStatus = decryptData(status);
  const decryLandtype = decryptData(landtype);

  return (
    <>

      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <Header eid={decryEid} />
            <TabView>
              <TabPanel header="Current">
                <WholeFieldSurveyLand eid={decryEid} id={decryId} status={decryStatus} landtype={decryLandtype} />
              </TabPanel>
              <TabPanel header="Remainder">
                <WholeDocumentLand
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <InvoiceDetails id={decryEid} status={"success"} />
                <LocationSelectLand eid={decryEid} status={'complete'} pagetype="reminder" />
                <WholeMarketResearchLand eid={decryEid} status={"complete"} pagetype="reminder" />
                <PriceProposalLand eid={decryEid} status={'complete'} pagetype="reminder" />
                <PaymentLegalOpinionLand eid={decryEid} status={'complete'} pagetype="reminder" />
                <WholeLawyerDocumentLand eid={decryEid} id={decryId} status={decryStatus} pagetype="reminder" />
                <WholeMandatoryDocLand eid={decryEid} status={'complete'} pagetype="reminder" landtype={decryLandtype} />
              </TabPanel>
            </TabView>

          </div>
        </div>
      </section>
    </>
  );
}

export default FieldSurveyUpdate;



