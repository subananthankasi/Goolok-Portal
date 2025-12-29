import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import { Header } from "../../../Enquiry/Reusable/Header";
import { decryptData } from "../../../../Utils/encrypt";
import InvoiceComponentMissing from "./InvoiceMissingComponent/InvoiceComponentMissing";
import WholeComponentDocVerifyMissing from "../DocumentVeirficationMissing/ComponentDocMissings/WholeComponentDocVerifyMissing";
import LocationSelectMissingDocument from "../LocationVerifyMissing/LocMissingComponents/LocationSelectMissingDocument";
import WholeServiceMissingComponent from "../ServiceConfirmationMissing/ServiceComponentMissing/WholeServiceMissingComponent";

const UpdateInvoiceMissing = () => {
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
              <InvoiceComponentMissing
                id={decryid}
                eid={decryEid}
                status={decryStatus}
              />
            </TabPanel>
            <TabPanel header="Remainder">
              <WholeComponentDocVerifyMissing
                id={decryid}
                eid={decryEid}
                status={decryStatus}
                pagetype={"reminder"}
              />
              <LocationSelectMissingDocument
                eid={decryEid}
                id={decryid}
                status={decryStatus}
                pagetype={"reminder"}
              />
              <WholeServiceMissingComponent
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

export default UpdateInvoiceMissing;
