import React from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from 'primereact/tabview';
import './invoiceReport.css'
import { decryptData } from "../../../Utils/encrypt";
import WholeDocumentLand from "../DocumentVerificationLand/LandDocumentComponents/WholeDocumentLand";
import { InvoiceDetails } from "./InvoiceComponentsLand/InvoiceDetails";
import { Header } from "../../Enquiry/Reusable/Header";

function InvoiceReport() {

  const { eid,id, status } = useParams();
  const decryEid = decryptData(eid);
  const decryStatus = decryptData(status);
  const decryptedId = decryptData(id);


  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <Header eid={decryEid} />
            <TabView>
              <TabPanel header="Current">
                <InvoiceDetails id={decryEid} status={decryStatus} />
              </TabPanel>
              <TabPanel header="Remainder">
                {/* <DocumentVerification eid={decryEid} pagetype="reminder" /> */}
                <WholeDocumentLand
                  eid={decryEid}
                  id={decryptedId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  );
}

export default InvoiceReport;







