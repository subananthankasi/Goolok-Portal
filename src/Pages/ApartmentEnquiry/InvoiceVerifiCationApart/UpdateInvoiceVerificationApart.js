import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import WholeComponentDocApart from "../ApartDocumentVerification/ApartDocComponents/WholeComponentDocApart";
import { InvoiceApart } from "./InvoiceComponentApart/InvoiceApart";
import { Header } from "../../Enquiry/Reusable/Header";
import { decryptData } from "../../../Utils/encrypt";

const UpdateInvoiceVerificationApart = () => {
  const { eid, id, status } = useParams();

  const decryptedEid = decryptData(eid);
  const decryptedId = decryptData(id);
  const decryptedStatus = decryptData(status);

  return (
    <section className="section">
      <div className="container-fluid">
        <div className="row">
          <Header eid={decryptedEid} />
          <TabView>
            <TabPanel header="Current">
              <InvoiceApart id={decryptedEid} status={decryptedStatus} />
            </TabPanel>
            <TabPanel header="Remainder">
              <WholeComponentDocApart
                eid={decryptedEid}
                id={decryptedId}
                status={decryptedStatus}
                pagetype={"reminder"}
              />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </section>
  );
};

export default UpdateInvoiceVerificationApart;
