import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../Utils/encrypt";
import { Header } from "../../Enquiry/Reusable/Header";
import WholeLocationLayout from "./LocationComponentsLayout/WholeLocationLayout";
import WholeDocumentLayout from "../DocumentVerifyLayout/DocumentLayoutComponents/WholeDocumentLayout";
import { WholeInvoiceLayout } from "../InvoiceVerifyLayout/InvoiceLayoutComponents/WholeInvoiceLayout";


const UpdateLocationverifyLayout = () => {
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
              <WholeLocationLayout
                eid={decryEid}
                status={decryStatus}
                id={decryId}
              />
            </TabPanel>
            <TabPanel header="Remainder">
              <WholeDocumentLayout
                eid={decryEid}
                id={decryId}
                status={decryStatus}
                pagetype={"reminder"}
              />
              <WholeInvoiceLayout id={decryEid} status={"success"} />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </section>
  );
};

export default UpdateLocationverifyLayout;
