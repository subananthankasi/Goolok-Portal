import React from "react";
import { useParams } from "react-router-dom";
// import { Header } from "../Reusable/Header";
import { TabView, TabPanel } from 'primereact/tabview';
import { decryptData } from "../../../Utils/encrypt";
import LocationSelectLand from "./LocationComponents/LocationSelectLand";
import WholeDocumentLand from "../DocumentVerificationLand/LandDocumentComponents/WholeDocumentLand";
import { InvoiceDetails } from "../InvoiceVerification/InvoiceComponentsLand/InvoiceDetails";
import { Header } from "../../Enquiry/Reusable/Header";

function LocationMappingUpdate() {

  const { eid, locationid, status, pagetype } = useParams();
  const decryEid = decryptData(eid);
  const decryLocation = decryptData(locationid);
  const decryStatus = decryptData(status);



  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <Header eid={decryEid} />

            <TabView>
              <TabPanel header="Current">
                <LocationSelectLand eid={decryEid} id={decryLocation} status={decryStatus} pagetype={pagetype} />
              </TabPanel>
              <TabPanel header="Remainder">
                <WholeDocumentLand
                  eid={decryEid}
                  id={decryLocation}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <InvoiceDetails id={decryEid} status={"success"} />
              </TabPanel>
            </TabView>


          </div>
        </div>
      </section>
    </>
  );
}

export default LocationMappingUpdate;











