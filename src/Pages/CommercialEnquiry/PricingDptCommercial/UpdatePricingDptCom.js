import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../Enquiry/Reusable/Header";
import { decryptData } from "../../../Utils/encrypt";
import { TabView, TabPanel } from "primereact/tabview";
import WholePricingDptCommercial from "./PricingDptComponentsCom/WholePricingDptCommercial";
import WholeLandOwnerCommercial from "../LandOwnerAgreeCommercial/LandOwnerDetailsComponentsCom/WholeLandOwnerCommercial";
import { WholeFieldSurveyCommercial } from "../FieldSurveyCommercial/FieldSurveyComponents/WholeFieldSurveyCommercial";
import { WholeLawyerDocumentCommercial } from "../LawyerDocumentsCommercial/LawyerComponentsCommercial/WholeLawyerDocumentCommercial";
import { WholePaymentLegalCommercial } from "../PaymentForLegalCommercial/PaymentComponentCom/WholePaymentLegalCommercial";
import { WholePriceProposalCommercial } from "../PriceProposalCommercial/PriceProposalComponentCommercial/WholePriceProposalCommercial";
import { WholeMarketResearchCommercial } from "../MarketResearchCom/ComponentsMarketcommercial/WholeMarketResearchCommercial";
import WholeLocationComercial from "../LocationCommercial/CommercialLocationComponents/WholeLocationComercial";
import { WholeInvoiceCommercial } from "../InvoiceCommercial/InvoiceComComponents/WholeInvoiceCommercial";
import WholeDocCommercial from "../DocumentCommercial/DocumentComponentsCom/WholeDocCommercial";

const UpdatePricingDptCom = () => {
  const { eid, id, status, subtype } = useParams();

  const decryEid = decryptData(eid);
  const decryId = decryptData(id);
  const decryStatus = decryptData(status);
  const decrySubtype = decryptData(subtype);

  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <Header eid={decryEid} />
            <TabView>
              <TabPanel header="Current">
                <WholePricingDptCommercial
                  id={decryId}
                  eid={decryEid}
                  status={decryStatus}
                  subtype={decrySubtype}
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
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdatePricingDptCom;
