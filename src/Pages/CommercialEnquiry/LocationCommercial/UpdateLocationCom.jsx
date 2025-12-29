import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../Utils/encrypt";
import { Header } from "../../Enquiry/Reusable/Header";
import WholeLocationComercial from "./CommercialLocationComponents/WholeLocationComercial";
import WholeDocCommercial from "../DocumentCommercial/DocumentComponentsCom/WholeDocCommercial";
import { WholeInvoiceCommercial } from "../InvoiceCommercial/InvoiceComComponents/WholeInvoiceCommercial";



const UpdateLocationCom = () => {
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
              <WholeLocationComercial
                eid={decryEid}
                status={decryStatus}
                id={decryId}
              />
            </TabPanel>
            <TabPanel header="Remainder">
              <WholeDocCommercial
                eid={decryEid}
                id={decryId}
                status={decryStatus}
                pagetype={"reminder"}
              />
              <WholeInvoiceCommercial id={decryEid} status={"success"} />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </section>
  );
};

export default UpdateLocationCom;
