import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../Utils/encrypt";
import { Header } from "../../Enquiry/Reusable/Header";
import LocationSelectPlot from "./LocationPlotComponent/LocationSelectPlot";
import WholeDocPlot from "../DocumentPlot/DocumentPlotComponents/WholeDocPlot";
import { WholeInvoicePlot } from "../InvoicePlot/InvoicePlotComponent/WholeInvoicePlot";
// import { decryptData } from "../../../../Utils/encrypt";
// import { Header } from "../../Reusable/Header";
// import ApartmentLocationMap from "../../Reusable/AppartResuable/ApartmentLocationMap";
// import UpdateStageDocumentVerifyApart from '../ApartDocumentVerification/UpdateStageDocumentVerifyApart';

// import { ApartmentInvoiceDetail } from "../../Reusable/AppartResuable/ApartmentInvoiceDetail";
// import LocationSelectApart from "./LocationApartComponent/LocationSelectApart";
// import WholeComponentDocApart from "../ApartDocumentVerification/ApartDocComponents/WholeComponentDocApart";
// import { InvoiceApart } from "../InvoiceVerifiCationApart/InvoiceComponentApart/InvoiceApart";
// import { colGroup } from '@syncfusion/ej2-react-grids';

const UpdateLocationPlot = () => {
  const { eid, id, status } = useParams();
  const decryEid = decryptData(eid);
  const decryId = decryptData(id);
  const decryStatus = decryptData(status);

  return (
    <section className="section">
      <div className="container-fluid">
        <div className="row">
          <Header eid={decryEid} />
          <TabView>
            <TabPanel header="Current">
              <LocationSelectPlot
                eid={decryEid}
                status={decryStatus}
                id={decryId}
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
            </TabPanel>
          </TabView>
        </div>
      </div>
    </section>
  );
};

export default UpdateLocationPlot;
