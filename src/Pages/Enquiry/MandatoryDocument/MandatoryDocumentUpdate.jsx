import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Reusable/Header";
import { InvoiceDetails } from "../Reusable/InvoiceDetails";
import LocationSelect from "../Reusable/LocationSelect";
import { MarketResearch } from "../Reusable/MarketResearch";
import { Priceproposal } from "../Reusable/Priceproposal";
import { PaymentLegalOpinion } from "../Reusable/PaymentLegalOpinion";
import { LawyerDocumentsUploadStages } from "../LawyerDocuments/LawyerDocumentsUploadStages";
import { MandatoryDocumentUpdateStages } from "./MandatoryDocumentUpdateStages";
import { DocumentVerification } from "../Reusable/DocumentVerification";
import { TabView, TabPanel } from 'primereact/tabview';
import { decryptData } from "../../../Utils/encrypt";

function MandatoryDocumentUpdate() {

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
                <MandatoryDocumentUpdateStages eid={decryEid} id={decryId} status={decryStatus} landtype = {decryLandtype} />
              </TabPanel>
              <TabPanel header="Remainder">
                <DocumentVerification eid={decryEid} pagetype="reminder"/>
                <InvoiceDetails id={decryEid} status={"success"} />
                <LocationSelect eid={decryEid} status={'complete'} pagetype="reminder" />
                <MarketResearch eid={decryEid} status={"complete"} pagetype="reminder" />
                <Priceproposal eid={decryEid} status={'complete'} pagetype="reminder" />
                <PaymentLegalOpinion eid={decryEid} status={'complete'} pagetype="reminder" />
                <LawyerDocumentsUploadStages eid={decryEid} status={'complete'} pagetype="reminder" />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  );
}

export default MandatoryDocumentUpdate;



