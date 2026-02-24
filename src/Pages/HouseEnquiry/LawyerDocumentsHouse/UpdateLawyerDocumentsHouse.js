import React from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { Header } from "../../Enquiry/Reusable/Header";
import { decryptData } from "../../../Utils/encrypt";
import {WholeLawyerDocumentsHouse} from "./LawyerDocumentsComponentsHouse/WholeLawyerDocumentsHouse";
import WholeDocHouse from "../DocumentVerificationHouse/HouseDocComponents/WholeDocHouse";
import { WholeInvoiceHouse } from "../InvoiceVerificationHouse/InvoiceHouseComponent/WholeInvoiceHouse";
import WholeLocationHouse from "../LocationVertificationHouse/LocationHouseComponents/WholeLocationHouse";
import { WholeMarketResearchHouse } from "../MarketResearchHouse/MarketResearchHouseComponents/WholeMarketResearchHouse";
import { WholeProposalHouse } from "../PriceProposalHouse/ProposalHouseComponents/WholeProposalHouse";
import { WholePaymentLegalHouse } from "../PaymentLegalOpinionHouse/PaymentLegalHouseComponents/WholePaymentLegalHouse";

function UpdateLawyerDocumentsHouse() {
  const { eid, id, status ,sub_property} = useParams();
  const decryEid = decryptData(eid);
  const decryId = decryptData(id);
  const decryStatus = decryptData(status);
  const decrySubProperty = decryptData(sub_property)

  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <Header eid={decryEid} />
            <TabView>
              <TabPanel header="Current" key="current">
                <WholeLawyerDocumentsHouse
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
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  );
}

export default UpdateLawyerDocumentsHouse;
