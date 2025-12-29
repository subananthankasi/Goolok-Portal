import React from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { Header } from "../../Enquiry/Reusable/Header";
import { decryptData } from "../../../Utils/encrypt";
import WholeContentWritingHouse from "./ContentWritingComponentsHouse/WholeContentWritingHouse";
import WholeMediaDptHouse from "../MediaDptHouse/MediaComponentsHouse/WholeMediaDptHouse";
import WholePricingDptHouse from "../PricingDptHouse/PricingDptHouseComponents/WholePricingDptHouse";
import WholeLandOwnerAgreeHouse from "../LandOwnerHouse/LandOwnerComponentsHouse/WholeLandOwnerAgreeHouse";
import { WholeFieldSurveyHouse } from "../FeildSurveyHouse/FieldSurveyHouseComponents/WholeFieldSurveyHouse";
import { WholeLawyerDocumentsHouse } from "../LawyerDocumentsHouse/LawyerDocumentsComponentsHouse/WholeLawyerDocumentsHouse";
import { WholePaymentLegalHouse } from "../PaymentLegalOpinionHouse/PaymentLegalHouseComponents/WholePaymentLegalHouse";
import { WholeProposalHouse } from "../PriceProposalHouse/ProposalHouseComponents/WholeProposalHouse";
import { WholeMarketResearchHouse } from "../MarketResearchHouse/MarketResearchHouseComponents/WholeMarketResearchHouse";
import WholeLocationHouse from "../LocationVertificationHouse/LocationHouseComponents/WholeLocationHouse";
import { WholeInvoiceHouse } from "../InvoiceVerificationHouse/InvoiceHouseComponent/WholeInvoiceHouse";
import WholeDocHouse from "../DocumentVerificationHouse/HouseDocComponents/WholeDocHouse";

const UpdateContentWritingHouse = () => {
  const { eid, id, status, sub_property } = useParams();
  const decryEid = decryptData(eid);
  const decryId = decryptData(id);
  const decryStatus = decryptData(status);
  const decrySubProperty = decryptData(sub_property);

  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <Header eid={decryEid} />
            <TabView>
              <TabPanel header="Current">
                <WholeContentWritingHouse
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  sub_property={decrySubProperty}
                />
              </TabPanel>
              <TabPanel header="Remainder">
                <WholeDocHouse
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <WholeInvoiceHouse id={decryEid} status={"success"} />
                <WholeLocationHouse
                  eid={decryEid}
                  status={decryStatus}
                  id={decryId}
                  pagetype={"reminder"}
                />
                <WholeMarketResearchHouse
                  eid={decryEid}
                  marketid={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <WholeProposalHouse
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <WholePaymentLegalHouse
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <WholeLawyerDocumentsHouse
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  sub_property={decrySubProperty}
                  pagetype={"reminder"}
                />
                <WholeFieldSurveyHouse
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <WholeLandOwnerAgreeHouse
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  sub_property={decrySubProperty}
                  pagetype={"reminder"}
                />
                <WholePricingDptHouse
                  id={decryId}
                  eid={decryEid}
                  status={decryStatus}
                  sub_property={decrySubProperty}
                  pagetype={"reminder"}
                />
                <WholeMediaDptHouse
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  sub_property={decrySubProperty}
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

export default UpdateContentWritingHouse;
