import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import { Header } from "../../Enquiry/Reusable/Header";
import { decryptData } from "../../../Utils/encrypt";
import { WholeMarketResearchAP } from "./MarketResearchComponentsAP/WholeMarketResearchAP";
import WholeLocationVerifyAP from "../LocationVerifyAP/LocationComponentsAP/WholeLocationVerifyAP";
import WholeDocumentAP from "../DocumentVerificationAP/DocumentComponetsAP/WholeDocumentAP";

const UpdateMarketResearchAP = () => {
    
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
                <WholeMarketResearchAP
                  eid={decryEid}
                  marketid={decryId}
                  status={decryStatus}
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
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateMarketResearchAP;
