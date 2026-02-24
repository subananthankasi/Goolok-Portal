import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../../Utils/encrypt";
import { Header } from "../../../Enquiry/Reusable/Header";
import WholeTicketHubMissing from "./TicketComponentMissing/WholeTicketHubMissing";
import WholeComponentDocVerifyMissing from "../DocumentVeirficationMissing/ComponentDocMissings/WholeComponentDocVerifyMissing";
import LocationSelectMissingDocument from "../LocationVerifyMissing/LocMissingComponents/LocationSelectMissingDocument";
import WholeServiceMissingComponent from "../ServiceConfirmationMissing/ServiceComponentMissing/WholeServiceMissingComponent";
import InvoiceComponentMissing from "../InvoicePaymentMissing/InvoiceMissingComponent/InvoiceComponentMissing";

const UpdateTicketHubMissing = () => {
  const { eid, id, status } = useParams();
  const decryEid = decryptData(eid);
  const decryid = decryptData(id);
  const decryStatus = decryptData(status);

  return (
    <section className="section">
      <div className="container-fluid">
        <div className="row">
          <Header eid={eid} />

          <TabView>
            <TabPanel header="Current">
              <WholeTicketHubMissing id={id} eid={eid} status={status} />
            </TabPanel>
            <TabPanel header="Remainder">
              <WholeComponentDocVerifyMissing
                id={id}
                eid={eid}
                status={status}
                pagetype={"reminder"}
              />
              <LocationSelectMissingDocument
                eid={eid}
                id={id}
                status={status}
                pagetype={"reminder"}
              />
              <WholeServiceMissingComponent
                eid={eid}
                id={id}
                status={status}
                pagetype={"reminder"}
              />
              <InvoiceComponentMissing
                id={id}
                eid={eid}
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

export default UpdateTicketHubMissing;
