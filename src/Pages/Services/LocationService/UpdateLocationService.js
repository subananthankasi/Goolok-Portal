import React from "react";
import { Header } from "../../Enquiry/Reusable/Header";
import { TabView, TabPanel } from "primereact/tabview";
import LocationSelectService from "./Locations/LocationSelectService";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../Utils/encrypt";
import ReminderDocumentVerification from "../DocumentService/Reusable/ReminderDocumentVerification";

const UpdateLocationService = () => {
  const { eid, locationid, status, pagetype } = useParams();
  const decryEid = decryptData(eid);
  const decryLocation = decryptData(locationid);
  const decryStatus = decryptData(status);
  return (
    <section className="section">
      <div className="container-fluid">
        <div className="row">
          <Header eid={decryEid} />

          <TabView>
            <TabPanel header="Current">
              <LocationSelectService
                eid={decryEid}
                id={decryLocation}
                status={decryStatus}
                pagetype={pagetype}
              />
            </TabPanel>
            <TabPanel header="Remainder">
              <ReminderDocumentVerification id = {decryLocation} eid={decryEid} status = {decryStatus} pagetype = "reminder"/>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </section>
  );
};

export default UpdateLocationService;
