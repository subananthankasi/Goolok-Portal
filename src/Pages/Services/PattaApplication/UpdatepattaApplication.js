import React from "react";
import PattaComponent from "./PattaComponent/PattaComponent";
import { Header } from "../../Enquiry/Reusable/Header";
import { TabView, TabPanel } from "primereact/tabview";
import { decryptData } from "../../../Utils/encrypt";
import { useParams } from "react-router-dom";
import LocationSelectService from "../LocationService/Locations/LocationSelectService";
import WholeServiceConfirmation from "../ServiceConfirm/ServiceComponent/WholeServiceConfirmation";
import InvoiceComponent from "../InvoiceService/InvoiceComponet/InvoiceComponent";
import WholeDocGetPatta from "../DocumentService/GetPattaComponents/WholeDocGetPatta";

const UpdatepattaApplication = () => {
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
              <PattaComponent
                eid={decryEid}
                id={decryid}
                status={decryStatus}
              />
            </TabPanel>
            <TabPanel header="Remainder">
              {/* <ReminderDocumentVerification
                id={decryid}
                eid={decryEid}
                status={decryStatus}
                pagetype="reminder"
              /> */}
              <WholeDocGetPatta eid={decryEid} id={decryid} status={decryStatus} pagetype="reminder" />
              <LocationSelectService
                eid={decryEid}
                id={decryid}
                status={decryStatus}
                pagetype={"reminder"}
              />
              <WholeServiceConfirmation
                eid={decryEid}
                id={decryid}
                status={decryStatus}
                pagetype={"reminder"}
              />
              <InvoiceComponent id={decryid} eid={decryEid} status={decryStatus} pagetype={"reminder"} />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </section>
  );
};

export default UpdatepattaApplication;
