import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Reusable/Header";
import { InvoiceDetails } from "../Reusable/InvoiceDetails"; 
import { TabView, TabPanel } from 'primereact/tabview';
import { DocumentVerification } from "../Reusable/DocumentVerification";
import './invoiceReport.css'
import { decryptData } from "../../../Utils/encrypt";

function InvoiceReport() {

  const { eid, status } = useParams();
  const decryEid = decryptData(eid);
  const decryStatus = decryptData(status);
 

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
                <DocumentVerification eid={decryEid} pagetype="reminder"/>
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  );
}

export default InvoiceReport;







