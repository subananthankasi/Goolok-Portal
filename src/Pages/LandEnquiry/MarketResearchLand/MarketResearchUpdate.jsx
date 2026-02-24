import { useParams } from "react-router-dom";
import { TabView, TabPanel } from 'primereact/tabview';
import { decryptData } from "../../../Utils/encrypt";
import { WholeMarketResearchLand } from "./MarketResearchComponentsLand/WholeMarketResearchLand";
import { Header } from "../../Enquiry/Reusable/Header";
import WholeDocumentLand from "../DocumentVerificationLand/LandDocumentComponents/WholeDocumentLand";
import { InvoiceDetails } from "../InvoiceVerification/InvoiceComponentsLand/InvoiceDetails";
import LocationSelectLand from "../LocationVerifyLand/LocationComponents/LocationSelectLand";

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
                <WholeMarketResearchLand eid={decryEid} marketid={decrymarketid} status={decryStatus} />
              </TabPanel>
              <TabPanel header="Remainder">
                 <WholeDocumentLand
                  eid={decryEid}
                  id={decrymarketid}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <InvoiceDetails id={decryEid} status={"success"} />
                <LocationSelectLand eid={decryEid} status={'complete'} pagetype={"reminder"} />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  );
}

export default MarketResearchUpdate;










