import React from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { decryptData } from "../../../Utils/encrypt";
import { Header } from "../../Enquiry/Reusable/Header";
import WholeDocPlot from "../DocumentPlot/DocumentPlotComponents/WholeDocPlot";
import { WholeInvoicePlot } from "../InvoicePlot/InvoicePlotComponent/WholeInvoicePlot";
import LocationSelectPlot from "../LocationPlot/LocationPlotComponent/LocationSelectPlot";
import { PlotMarketResearch } from "../MarketResearchPlot/MarketPlotComponent/PlotMarketResearch";
import { PlotProposal } from "./PriceProposalComponentPlot/PlotProposal";
// import PlotProposal from "./PriceProposalComponentPlot/PlotProposal";
// import { decryptData } from "../../../../Utils/encrypt";
// import { Header } from "../../Reusable/Header";
// import { ApartMarketResearch } from "../MarketResearchApart/MarketResearchApartComponent/ApartMarketResearch";
// import LocationSelectApart from "../LocationVerificationApart/LocationApartComponent/LocationSelectApart";
// import { InvoiceApart } from "../InvoiceVerifiCationApart/InvoiceComponentApart/InvoiceApart";
// import WholeComponentDocApart from "../ApartDocumentVerification/ApartDocComponents/WholeComponentDocApart";
// import { ApartmentProposal } from "./ApartProposalComponent/ApartmentProposal";

const UpdatePriceProposalPlot = () => {
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
                <PlotProposal
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                />
              </TabPanel>

              <TabPanel header="Remainder">
                <WholeDocPlot
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <WholeInvoicePlot id={decryEid} status={"success"} />
                <LocationSelectPlot
                  eid={decryEid}
                  status={decryStatus}
                  id={decryId}
                  pagetype={"reminder"}
                />
                <PlotMarketResearch
                  eid={decryEid}
                  marketid={decryId}
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

export default UpdatePriceProposalPlot;
