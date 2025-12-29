import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Reusable/Header";
import { InvoiceDetails } from "../Reusable/InvoiceDetails";
import LocationSelect from "../Reusable/LocationSelect";
import { MarketResearch } from "../Reusable/MarketResearch";
import { Priceproposal } from "../Reusable/Priceproposal";
import { DocumentVerification } from "../Reusable/DocumentVerification"; 
import { TabView, TabPanel } from 'primereact/tabview';
import { decryptData } from "../../../Utils/encrypt";

function PriceProposalAgreementUpdate() {
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
                <Priceproposal eid={decryEid} id={decryId} status={decryStatus} />
              </TabPanel>
              <TabPanel header="Remainder">
                <DocumentVerification eid={decryEid} pagetype="reminder"/>
                <InvoiceDetails id={decryEid} status={"success"} />
                <LocationSelect eid={decryEid} status={'complete'} pagetype= "reminder"/>
                <MarketResearch eid={decryEid} status={"complete"} pagetype= "reminder" />
              </TabPanel>
            </TabView> 
          </div>
        </div>
      </section>
    </>
  );
}

export default PriceProposalAgreementUpdate;






