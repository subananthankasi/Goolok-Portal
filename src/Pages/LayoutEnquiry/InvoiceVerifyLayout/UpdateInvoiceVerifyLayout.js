import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import { Header } from "../../Enquiry/Reusable/Header";
import { decryptData } from "../../../Utils/encrypt";
import {WholeInvoiceLayout} from "./InvoiceLayoutComponents/WholeInvoiceLayout";
import WholeDocumentLayout from "../DocumentVerifyLayout/DocumentLayoutComponents/WholeDocumentLayout";

const UpdateInvoiceVerifyLayout = () => {
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
              <WholeInvoiceLayout id={decryptedEid} status={decryptedStatus} />
            </TabPanel>
            <TabPanel header="Remainder">
              <WholeDocumentLayout
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

export default UpdateInvoiceVerifyLayout;
