import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import { Header } from "../../Enquiry/Reusable/Header";
import { decryptData } from "../../../Utils/encrypt";
import {WholeInvoiceCommercial} from "./InvoiceComComponents/WholeInvoiceCommercial";
import WholeDocCommercial from "../DocumentCommercial/DocumentComponentsCom/WholeDocCommercial";


const UpdateInvoiceCom = () => {
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
              <WholeInvoiceCommercial id={decryptedEid} status={decryptedStatus} />
            </TabPanel>
            <TabPanel header="Remainder">
              <WholeDocCommercial
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

export default UpdateInvoiceCom;
