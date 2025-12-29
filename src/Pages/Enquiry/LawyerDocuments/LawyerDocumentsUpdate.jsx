import React from "react";
import { LawyerDocumentsUploadStages } from "./LawyerDocumentsUploadStages";
import { Header } from "../Reusable/Header";
import { InvoiceDetails } from "../Reusable/InvoiceDetails";
import LocationSelect from "../Reusable/LocationSelect";
import { MarketResearch } from "../Reusable/MarketResearch";
import { Priceproposal } from "../Reusable/Priceproposal";
import { PaymentLegalOpinion } from "../Reusable/PaymentLegalOpinion";
import { useParams } from "react-router-dom"; 
import { DocumentVerification } from "../Reusable/DocumentVerification";
import { TabView, TabPanel } from 'primereact/tabview';
import { decryptData } from "../../../Utils/encrypt";

function LawyerDocumentsUpdate() {
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
              <TabPanel header="Current"  key="current">
                <LawyerDocumentsUploadStages eid={decryEid} id={decryId} status={decryStatus} />
              </TabPanel>
              <TabPanel header="Remainder"  key="remainder">
                <DocumentVerification eid={decryEid} pagetype="reminder"/>
                <InvoiceDetails id={decryEid} status={"success"} />
                <LocationSelect eid={decryEid} status={'complete'} pagetype= "reminder"/>
                <MarketResearch eid={decryEid} status={"complete"} pagetype= "reminder"/>
                <Priceproposal eid={decryEid} status={'complete'} pagetype= "reminder" />
                <PaymentLegalOpinion eid={decryEid} status={'complete'} pagetype= "reminder" />
              </TabPanel>
            </TabView> 
          </div>
        </div>
      </section>
    </>
  );
}

export default LawyerDocumentsUpdate;



