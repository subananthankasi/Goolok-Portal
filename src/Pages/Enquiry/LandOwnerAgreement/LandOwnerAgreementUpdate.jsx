import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Reusable/Header";
import { InvoiceDetails } from "../Reusable/InvoiceDetails";
import LocationSelect from "../Reusable/LocationSelect";
import { MarketResearch } from "../Reusable/MarketResearch";
import { Priceproposal } from "../Reusable/Priceproposal";
import { PaymentLegalOpinion } from "../Reusable/PaymentLegalOpinion";
import { LawyerDocumentsUploadStages } from "../LawyerDocuments/LawyerDocumentsUploadStages";
import { DocumentVerification } from "../Reusable/DocumentVerification";
import { MandatoryDocumentUpdateStages } from "../MandatoryDocument/MandatoryDocumentUpdateStages";
import { EnquirySurveyUpdateStages } from "../Fieldsurvey/EnquirySurveyUpdateStages";
import { LandOwnerAgreement } from "../Reusable/LandOwnerAgreement";
import { TabView, TabPanel } from "primereact/tabview";
import { decryptData } from "../../../Utils/encrypt";
import LandOwnerDetails from "../Reusable/LandOwnerDetails";
import LandOwnerAddedTable from "../Reusable/LandOwnerAddedTable";
import { LandOwnerAgreementDraft } from "../Reusable/LandOwnerAgreementDraft";

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
                <LandOwnerAgreement
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                />
                {/* new */}
                {/* <LandOwnerAgreementDraft eid={decryEid} id={decryId} status={decryStatus} /> */}
                {/* new */}
                <LandOwnerDetails
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                />
                <LandOwnerAddedTable
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                />
              </TabPanel>
              <TabPanel header="Remainder">
                <DocumentVerification eid={decryEid} pagetype="reminder" />
                <InvoiceDetails id={decryEid} status={"success"} />
                <LocationSelect
                  eid={decryEid}
                  status={"complete"}
                  pagetype="reminder"
                />
                <MarketResearch
                  eid={decryEid}
                  status={"complete"}
                  pagetype="reminder"
                />
                <Priceproposal
                  eid={decryEid}
                  status={"complete"}
                  pagetype="reminder"
                />
                <PaymentLegalOpinion
                  eid={decryEid}
                  status={"complete"}
                  pagetype="reminder"
                />
                <LawyerDocumentsUploadStages
                  eid={decryEid}
                  status={"complete"}
                  pagetype="reminder"
                />
                <MandatoryDocumentUpdateStages
                  eid={decryEid}
                  status={"complete"}
                  pagetype="reminder"
                  landtype={decryLandtype}
                />
                <EnquirySurveyUpdateStages
                  eid={decryEid}
                  status={"complete"}
                  pagetype="reminder"
                  landtype={decryLandtype}
                />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandOwnerAgreementUpdate;
