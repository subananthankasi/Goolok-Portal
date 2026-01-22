import React from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from 'primereact/tabview';
import { decryptData } from "../../../Utils/encrypt";
import { PaymentLegalOpinionLand } from "./PaymentLegalOpinionComponent/PaymentLegalOpinionLand";
import { PriceProposalLand } from "../PriceProposalAgreement/PriceProposalComponentLand/PriceProposalLand";
import WholeDocumentLand from "../DocumentVerificationLand/LandDocumentComponents/WholeDocumentLand";
import LocationSelectLand from "../LocationVerifyLand/LocationComponents/LocationSelectLand";
import { WholeMarketResearchLand } from "../MarketResearchLand/MarketResearchComponentsLand/WholeMarketResearchLand";
import { Header } from "../../Enquiry/Reusable/Header";
import { InvoiceDetails } from "../InvoiceVerification/InvoiceComponentsLand/InvoiceDetails";


function PaymenLegalReportUpdate() {

  const { eid, id, status } = useParams();
  const decryEid = decryptData(eid);
  const decryId = decryptData(id);
  const decryStatus = decryptData(status);

  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <Header eid={decryEid} />
            <TabView>
              <TabPanel header="Current">
                <PaymentLegalOpinionLand eid={decryEid} id={decryId} status={decryStatus} />
              </TabPanel>
              <TabPanel header="Remainder">
                <WholeDocumentLand
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <InvoiceDetails id={decryEid} status={"success"} />
                <LocationSelectLand eid={decryEid} status={'complete'} pagetype= "reminder"/>
                <WholeMarketResearchLand eid={decryEid} status={"complete"} pagetype= "reminder" />
                <PriceProposalLand eid={decryEid} status={'complete'} pagetype="reminder" />
              </TabPanel>
            </TabView>

          </div>
        </div>
      </section>

    </>
  );
}

export default PaymenLegalReportUpdate;





