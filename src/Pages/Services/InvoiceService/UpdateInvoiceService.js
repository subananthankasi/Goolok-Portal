import React from "react";
import { Header } from "../../Enquiry/Reusable/Header";
import { TabView, TabPanel } from "primereact/tabview";
import InvoiceComponent from "./InvoiceComponet/InvoiceComponent";
import LocationSelectService from "../LocationService/Locations/LocationSelectService";
import { useParams } from "react-router-dom";
import WholeServiceConfirmation from "../ServiceConfirm/ServiceComponent/WholeServiceConfirmation";
import { decryptData } from "../../../Utils/encrypt";
import WholeDocGetPatta from "../DocumentService/GetPattaComponents/WholeDocGetPatta";

const UpdateInvoiceService = () => {
  const { eid, id, status } = useParams();
  const decryEid = decryptData(eid);
  const decryid = decryptData(id);
  const decryStatus = decryptData(status);

  return (
    <section className="section">
      <div className="container-fluid">
        <div className="row">
          <Header eid={decryEid} />
          <TabView>
            <TabPanel header="Current">
              <InvoiceComponent id={decryid} eid={decryEid} status={decryStatus} />
            </TabPanel>
            <TabPanel header="Remainder">
              {/* <ReminderDocumentVerification id={decryid} eid={decryEid} status={decryStatus} /> */}
              <WholeDocGetPatta eid={decryEid} id={decryid} status={decryStatus} pagetype="reminder" />
              <LocationSelectService eid={decryEid} id={decryid} status={decryStatus} pagetype={"reminder"} />
              <WholeServiceConfirmation eid={decryEid} id={decryid} status={decryStatus} pagetype={"reminder"} />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </section>
  );
};

export default UpdateInvoiceService;
