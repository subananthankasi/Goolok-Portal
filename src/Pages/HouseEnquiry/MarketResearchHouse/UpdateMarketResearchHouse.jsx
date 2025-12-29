import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import { Header } from "../../Enquiry/Reusable/Header";
import { decryptData } from "../../../Utils/encrypt";
import  {WholeMarketResearchHouse}  from "./MarketResearchHouseComponents/WholeMarketResearchHouse";
import WholeDocHouse from "../DocumentVerificationHouse/HouseDocComponents/WholeDocHouse";
import { WholeInvoiceHouse } from "../InvoiceVerificationHouse/InvoiceHouseComponent/WholeInvoiceHouse";
import WholeLocationHouse from "../LocationVertificationHouse/LocationHouseComponents/WholeLocationHouse";

const UpdateMarketResearchHouse = () => {
    
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
                <WholeMarketResearchHouse
                  eid={decryEid}
                  marketid={decryId}
                  status={decryStatus}
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
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateMarketResearchHouse;
