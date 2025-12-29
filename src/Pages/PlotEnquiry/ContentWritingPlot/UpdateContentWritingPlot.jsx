import React from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { Header } from "../../Enquiry/Reusable/Header";
import WholeContentWritingComponentPlot from "./ContentPlotComponent/WholeContentWritingComponentPlot";
import { decryptData } from "../../../Utils/encrypt";
import WholeDocPlot from "../DocumentPlot/DocumentPlotComponents/WholeDocPlot";
import { WholeInvoicePlot } from "../InvoicePlot/InvoicePlotComponent/WholeInvoicePlot";
import LocationSelectPlot from "../LocationPlot/LocationPlotComponent/LocationSelectPlot";
import { PlotMarketResearch } from "../MarketResearchPlot/MarketPlotComponent/PlotMarketResearch";
import { PlotProposal } from "../PriceProposalagreePlot/PriceProposalComponentPlot/PlotProposal";
import { PlotLegalOpinion } from "../PaymentLegalOpinion/PaymentLegalComponentPlot/PlotLegalOpinion";
import { PlotLawyerDocument } from "../LawyerDocumentPlot/LawyerDocumentComponentPlot/PlotLawyerDocument";
import { PlotFieldSurvey } from "../FieldSurveyPlot/FieldSurveyComponentPlot/PlotFieldSurvey";
import PlotLandOwnerAgree from "../LandOwnerAgreementPlot/LandOwnerComponentPlot/PlotLandOwnerAgree";
import WholePricingDptPlot from "../PricingDepartmentPlot/PricingDepComponentPlot/WholePricingDptPlot";
import PlotMediaDepartment from "../MediaDepartmentPlot/MediaDepartmentComponentPlot/PlotMediaDepartment";

const UpdateContentWritingPlot = () => {
  const { eid, id, status, landtype } = useParams();
  const decryEid = decryptData(eid);
  const decryId = decryptData(id);
  const decryStatus = decryptData(status);
  const decryLandtype = decryptData(landtype);

  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <Header eid={decryEid} />
            <TabView>
              <TabPanel header="Current">
                <WholeContentWritingComponentPlot
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  sub_property={decryLandtype}
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
                <PlotProposal
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <PlotLegalOpinion
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <PlotLawyerDocument
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <PlotFieldSurvey
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <PlotLandOwnerAgree
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                  sub_property={decryLandtype}
                />
                <WholePricingDptPlot
                  id={decryId}
                  eid={decryEid}
                  status={decryStatus}
                  pagetype={"reminder"}
                  sub_property={decryLandtype}
                />
                <PlotMediaDepartment
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  sub_property={decryLandtype}
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

export default UpdateContentWritingPlot;
