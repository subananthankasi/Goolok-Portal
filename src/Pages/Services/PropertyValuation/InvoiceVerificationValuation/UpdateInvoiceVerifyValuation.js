import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import LocationSelectValuation from "../LocationVerifyValuation/LocValComponent/LocationSelectValuation";
import WholeServiceValuation from "../ServiceConfirmationValuation/ServiceComponentValuation/WholeServiceValuation";
import { Header } from "../../../Enquiry/Reusable/Header";
import { decryptData } from "../../../../Utils/encrypt";
import InvoiceComponentValuation from "./InvoiceValuComponent/InvoiceComponentValuation";
import WholeDocGetPatta from "../../DocumentService/GetPattaComponents/WholeDocGetPatta";

const UpdateInvoiceVerifyValuation = () => {
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
              <InvoiceComponentValuation
                id={decryid}
                eid={decryEid}
                status={decryStatus}
              />
            </TabPanel>
            <TabPanel header="Remainder">
              {/* <ReminderDocVerifyValution
                id={decryid}
                eid={decryEid}
                status={decryStatus}
                pagetype="reminder"
              /> */}
              <WholeDocGetPatta eid={decryEid} id={decryid} status={decryStatus} pagetype="reminder" />
              <LocationSelectValuation
                eid={decryEid}
                id={decryid}
                status={decryStatus}
                pagetype={"reminder"}
              />
              <WholeServiceValuation
                eid={decryEid}
                id={decryid}
                status={decryStatus}
                pagetype={"reminder"}
              />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </section>
  );
};

export default UpdateInvoiceVerifyValuation;
