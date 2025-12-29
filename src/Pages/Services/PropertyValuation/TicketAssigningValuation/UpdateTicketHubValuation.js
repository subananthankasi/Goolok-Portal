import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../../Utils/encrypt";
import WholeTicketHubValuation from "./TicketHubValComponent/WholeTicketHubValuation";
import ReminderDocVerifyValution from "../DocumentVerifyValuation/ValuationComponents/ReminderDocVerifyValution";
import LocationSelectValuation from "../LocationVerifyValuation/LocValComponent/LocationSelectValuation";
import { Header } from "../../../Enquiry/Reusable/Header";
import WholeServiceValuation from "../ServiceConfirmationValuation/ServiceComponentValuation/WholeServiceValuation";
import InvoiceComponentValuation from "../InvoiceVerificationValuation/InvoiceValuComponent/InvoiceComponentValuation";



const UpdateTicketHubValuation = () => {
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
              <WholeTicketHubValuation id={id} eid={eid} status={status} />
            </TabPanel>
            <TabPanel header="Remainder">
              <ReminderDocVerifyValution id={id} eid={eid} status={status} pagetype="reminder" />
              <LocationSelectValuation
                eid={eid}
                id={id}
                status={status}
                pagetype={"reminder"}
              />
              <WholeServiceValuation eid={eid} id={id} status={status} pagetype={"reminder"} />
              <InvoiceComponentValuation id={id} eid={eid} status={status} pagetype={"reminder"} />

            </TabPanel>
          </TabView>
        </div>
      </div>
    </section>
  );
};

export default UpdateTicketHubValuation;
