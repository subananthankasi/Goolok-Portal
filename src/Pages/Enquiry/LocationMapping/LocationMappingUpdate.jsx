import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Reusable/Header";
import { InvoiceDetails } from "../Reusable/InvoiceDetails";
import LocationSelect from "../Reusable/LocationSelect";
import { DocumentVerification } from "../Reusable/DocumentVerification";
import { TabView, TabPanel } from 'primereact/tabview';
import { decryptData } from "../../../Utils/encrypt";

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
                <LocationSelect eid={decryEid} id={decryLocation} status={decryStatus} pagetype={pagetype} />

              </TabPanel>
              <TabPanel header="Remainder">
                <DocumentVerification eid={decryEid} pagetype="reminder"/>
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











