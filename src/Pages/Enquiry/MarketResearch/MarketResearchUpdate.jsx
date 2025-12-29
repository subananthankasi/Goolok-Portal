import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Reusable/Header";
import { InvoiceDetails } from "../Reusable/InvoiceDetails";
import LocationSelect from "../Reusable/LocationSelect";
import { MarketResearch } from "../Reusable/MarketResearch";
import { DocumentVerification } from "../Reusable/DocumentVerification"; 
import { TabView, TabPanel } from 'primereact/tabview';
import { decryptData } from "../../../Utils/encrypt";

function MarketResearchUpdate() {

  const { eid, marketid, status } = useParams();
  const decryEid = decryptData(eid);
  const decrymarketid = decryptData(marketid);
  const decryStatus = decryptData(status);

  return (
    <>

      <section className="section">
        <div className="container-fluid">
          <div className="row">

            <Header eid={decryEid} />
            <TabView>
              <TabPanel header="Current">
                <MarketResearch eid={decryEid} marketid={decrymarketid} status={decryStatus} />
              </TabPanel>
              <TabPanel header="Remainder">
                <DocumentVerification eid={decryEid}  pagetype="reminder"/>
                <InvoiceDetails id={decryEid} status={"success"} />
                <LocationSelect eid={decryEid} status={'complete'} pagetype={"reminder"}/>
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  );
}

export default MarketResearchUpdate;










