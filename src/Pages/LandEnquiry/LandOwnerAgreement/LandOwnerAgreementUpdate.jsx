import React from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { decryptData } from "../../../Utils/encrypt";
import WholeLandOwnerAgreement from "./LandOwnerAgreementComponents/WholeLandOwnerAgreement";
import WholeDocumentLand from "../DocumentVerificationLand/LandDocumentComponents/WholeDocumentLand";
import { Header } from "../../Enquiry/Reusable/Header";
import { InvoiceDetails } from "../InvoiceVerification/InvoiceComponentsLand/InvoiceDetails";
import LocationSelectLand from "../LocationVerifyLand/LocationComponents/LocationSelectLand";
import { WholeMarketResearchLand } from "../MarketResearchLand/MarketResearchComponentsLand/WholeMarketResearchLand";
import { PriceProposalLand } from "../PriceProposalAgreement/PriceProposalComponentLand/PriceProposalLand";
import { PaymentLegalOpinionLand } from "../PaymentLegalopinion/PaymentLegalOpinionComponent/PaymentLegalOpinionLand";
import { WholeLawyerDocumentLand } from "../LawyerDocumentsLand/LawyerDocumentComponents/WholeLawyerDocumentLand";
import { WholeMandatoryDocLand } from "../MandatoryDocumentLand/MandatoryDocComponentsLand/WholeMandatoryDocLand";
import { WholeFieldSurveyLand } from "../FieldsurveyLand/FieldsurveyComponentsLand/WholeFieldSurveyLand";

function LandOwnerAgreementUpdate() {
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
                {/* <LandOwnerAgreement
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                />
                <LandOwnerDetails
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                />
                <LandOwnerAddedTable
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                /> */}
                <WholeLandOwnerAgreement decryEid={decryEid} decryId={decryId} decryStatus={decryStatus} />
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
                <WholeFieldSurveyLand eid={decryEid} id={decryId} status={decryStatus} landtype={decryLandtype} pagetype="reminder"/>
               
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandOwnerAgreementUpdate;
