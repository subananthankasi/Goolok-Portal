import React from 'react'
import { useParams } from "react-router-dom";
import { Header } from "../Reusable/Header";
import { TabView, TabPanel } from 'primereact/tabview';
import LocationSelect from "../Reusable/LocationSelect";
import { InvoiceDetails } from "../Reusable/InvoiceDetails";
import { MarketResearch } from "../Reusable/MarketResearch";
import { Priceproposal } from "../Reusable/Priceproposal";
import { PaymentLegalOpinion } from "../Reusable/PaymentLegalOpinion";
import { LawyerDocumentsUploadStages } from "../LawyerDocuments/LawyerDocumentsUploadStages";
import { DocumentVerification } from "../Reusable/DocumentVerification";
import { MandatoryDocumentUpdateStages } from "../MandatoryDocument/MandatoryDocumentUpdateStages";
import { EnquirySurveyUpdateStages } from "../Fieldsurvey/EnquirySurveyUpdateStages";
import PaymentScheduleUpdateStage from './PaymentScheduleUpdateStage';

const PaymentScheduleUpdate = () => {
         const { eid, id, status } = useParams();
    
  return (
   <>
   
   <section className="section">
        <div className="container-fluid">
          <div className="row">
            <Header eid={eid} />
            <TabView>
              <TabPanel header="Current">
               <PaymentScheduleUpdateStage eid = {eid}/>
                
              </TabPanel>
              <TabPanel header="Remainder">
              <DocumentVerification eid={eid} />
                <InvoiceDetails id={eid} status={"success"} />
                <LocationSelect eid={eid} status={'complete'} />
                <MarketResearch eid={eid} status={"complete"} />
                <Priceproposal eid={eid} status={'complete'} />
                <PaymentLegalOpinion eid={eid} status={'complete'} />
                <LawyerDocumentsUploadStages eid={eid} status={'complete'} />
                <MandatoryDocumentUpdateStages eid={eid} status={'complete'} />
                <EnquirySurveyUpdateStages eid={eid} status={'complete'} />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section></>
  )
}

export default PaymentScheduleUpdate