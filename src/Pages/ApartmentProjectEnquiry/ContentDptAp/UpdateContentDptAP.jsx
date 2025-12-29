import React from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { Header } from "../../Enquiry/Reusable/Header";
import { decryptData } from "../../../Utils/encrypt";
import WholeMediaDptAP from "../MediaDptAP/MediaDptComponentsAp/WholeMediaDptAP";
import WholePricingDptAp from "../PricingDptAP/PricingDptComponentsAP/WholePricingDptAp";
import WholeLandOwnerAgreeAP from "../LandOwnerAgreeAP/LandOwnerComponentsAP/WholeLandOwnerAgreeAP";
import { WholeLawyerDocumentAP } from "../LawyerDocumentsAP/LawyerDocumentsComponentsAP/WholeLawyerDocumentAP";
import { WholeMarketResearchAP } from "../MarketResearchAP/MarketResearchComponentsAP/WholeMarketResearchAP";
import WholeLocationVerifyAP from "../LocationVerifyAP/LocationComponentsAP/WholeLocationVerifyAP";
import WholeDocumentAP from "../DocumentVerificationAP/DocumentComponetsAP/WholeDocumentAP";
import WholeContentDptAp from "./ContentDptComponentsAP/WholeContentDptAp";

const UpdateContentDptAP = () => {
  const { eid, id, status ,subtype} = useParams();
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
                <WholeContentDptAp
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  subtype = {decrySubtype}
                />
              </TabPanel>
               <TabPanel header="Remainder">
                <WholeDocumentAP
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <WholeLocationVerifyAP
                  eid={decryEid}
                  status={decryStatus}
                  id={decryId}
                  pagetype={"reminder"}
                />
                <WholeMarketResearchAP
                  eid={decryEid}
                  marketid={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <WholeLawyerDocumentAP
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <WholeLandOwnerAgreeAP
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <WholePricingDptAp
                  id={decryId}
                  eid={decryEid}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                 <WholeMediaDptAP
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
};

export default UpdateContentDptAP;
