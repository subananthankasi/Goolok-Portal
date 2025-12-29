import React from "react";
import { Header } from "../../Enquiry/Reusable/Header";
import { useParams } from "react-router-dom";
import UpdateHub from "./UpdateHub";
import ReminderDocumentVerification from "../DocumentService/Reusable/ReminderDocumentVerification";
import LocationSelectService from "../LocationService/Locations/LocationSelectService";
import WholeServiceConfirmation from "../ServiceConfirm/ServiceComponent/WholeServiceConfirmation";
import InvoiceComponent from "../InvoiceService/InvoiceComponet/InvoiceComponent";
import { TabView, TabPanel } from "primereact/tabview";
import PattaComponent from "../PattaApplication/PattaComponent/PattaComponent";
const DocumentSetHub = () => {
  const { eid, id, status } = useParams();
  return (
    <section className="section">
      <div className="container-fluid">
        <div className="row">
          <Header eid={eid} />

          <TabView>
            <TabPanel header="Current">
              <UpdateHub />
            </TabPanel>
            <TabPanel header="Remainder">
              <ReminderDocumentVerification id={id} eid={eid} status={status} />
              <LocationSelectService
                eid={eid}
                id={id}
                status={status}
                pagetype={"reminder"}
              />
              <WholeServiceConfirmation
                eid={eid}
                id={id}
                status={status}
                pagetype={"reminder"}
              />
              <InvoiceComponent
                id={id}
                eid={eid}
                status={status}
                pagetype={"reminder"}
              />
              <PattaComponent
                eid={eid}
                id={id}
                status={status}
                pagetype={"reminder"}
              />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </section>
  );
};

export default DocumentSetHub;
