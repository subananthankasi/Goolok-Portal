import React from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { decryptData } from "../../../Utils/encrypt";
import { Header } from "../../Enquiry/Reusable/Header";
import WholeMediaDptCommercial from "./MediaDptComponentsCom/WholeMediaDptCommercial";
import WholeDocCommercial from "../DocumentCommercial/DocumentComponentsCom/WholeDocCommercial";
import { WholeInvoiceCommercial } from "../InvoiceCommercial/InvoiceComComponents/WholeInvoiceCommercial";
import WholeLocationComercial from "../LocationCommercial/CommercialLocationComponents/WholeLocationComercial";
import { WholeMarketResearchCommercial } from "../MarketResearchCom/ComponentsMarketcommercial/WholeMarketResearchCommercial";
import { WholePriceProposalCommercial } from "../PriceProposalCommercial/PriceProposalComponentCommercial/WholePriceProposalCommercial";
import { WholePaymentLegalCommercial } from "../PaymentForLegalCommercial/PaymentComponentCom/WholePaymentLegalCommercial";
import { WholeLawyerDocumentCommercial } from "../LawyerDocumentsCommercial/LawyerComponentsCommercial/WholeLawyerDocumentCommercial";
import { WholeFieldSurveyCommercial } from "../FieldSurveyCommercial/FieldSurveyComponents/WholeFieldSurveyCommercial";
import WholeLandOwnerCommercial from "../LandOwnerAgreeCommercial/LandOwnerDetailsComponentsCom/WholeLandOwnerCommercial";
import WholePricingDptCommercial from "../PricingDptCommercial/PricingDptComponentsCom/WholePricingDptCommercial";


const UpdateMediaDptCom = () => {
  const { eid, id, status,subtype} = useParams();
  const decryEid = decryptData(eid);
  const decryId = decryptData(id);
  const decryStatus = decryptData(status);
  const decrySubtype = decryptData(status);


  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <Header eid={decryEid} />
            <TabView>
              <TabPanel header="Current">
                <WholeMediaDptCommercial
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                />
              </TabPanel>
              <TabPanel header="Remainder">
                <WholeDocCommercial
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <WholeInvoiceCommercial id={decryEid} status={"success"} />
                <WholeLocationComercial
                  eid={decryEid}
                  status={decryStatus}
                  id={decryId}
                  pagetype={"reminder"}
                />
                <WholeMarketResearchCommercial
                  eid={decryEid}
                  marketid={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                  subtype={decrySubtype}
                />
                <WholePriceProposalCommercial
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <WholePaymentLegalCommercial
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <WholeLawyerDocumentCommercial
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  subtype={decrySubtype}
                    pagetype={"reminder"}
                />
                <WholeFieldSurveyCommercial
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  subtype={decrySubtype}
                  pagetype={"reminder"}
                />
                <WholeLandOwnerCommercial
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  subtype={decrySubtype}
                  pagetype={"reminder"}
                />
                <WholePricingDptCommercial
                  id={decryId}
                  eid={decryEid}
                  status={decryStatus}
                  subtype={decrySubtype}
                  pagetype={"reminder"}
                />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateMediaDptCom;
