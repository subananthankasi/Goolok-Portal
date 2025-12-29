import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import { Header } from "../../../Enquiry/Reusable/Header";
import { decryptData } from "../../../../Utils/encrypt";
import GoogleLocationSelect from "./GooglemapComponent/GoogleLocationSelect";
import ReminderDocVerificationGoogle from "../DocumentVerificationLoc/ResubleGoogleDoc/ReminderDocVerificationGoogle";
const UpdateLocationMap = () => {
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
              <GoogleLocationSelect
                eid={decryEid}
                id={decryLocation}
                status={decryStatus}
              />
            </TabPanel>
            <TabPanel header="Remainder">
            <ReminderDocVerificationGoogle id = {decryLocation} eid={decryEid} status = {decryStatus} pagetype = "reminder"/>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </section>
  );
};

export default UpdateLocationMap;
