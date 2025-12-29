import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../../Utils/encrypt";
import { Header } from "../../../Enquiry/Reusable/Header";
import ReminderDocVerifyValution from "../DocumentVerifyValuation/ValuationComponents/ReminderDocVerifyValution";
import LocationSelectValuation from "./LocValComponent/LocationSelectValuation";

const UpdateLocationValuation = () => {
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
              <LocationSelectValuation
                eid={decryEid}
                id={decryLocation}
                status={decryStatus}
                pagetype={pagetype}
              />
            </TabPanel>
            <TabPanel header="Remainder">
              <ReminderDocVerifyValution id = {decryLocation} eid={decryEid} status = {decryStatus}  pagetype="reminder"/>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </section>
  );
};

export default UpdateLocationValuation;
