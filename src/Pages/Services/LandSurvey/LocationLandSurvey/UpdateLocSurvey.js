import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../../Utils/encrypt";
import { Header } from "../../../Enquiry/Reusable/Header";
import LocationSurveySelect from "./LocSurveyResuble/LocationSurveySelect";
import WholeDocGetPatta from "../../DocumentService/GetPattaComponents/WholeDocGetPatta";


const UpdateLocSurvey = () => {
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
              <LocationSurveySelect
                eid={decryEid}
                id={decryLocation}
                status={decryStatus}
                pagetype={pagetype}
              />
            </TabPanel>
            <TabPanel header="Remainder">
              {/* <ReminderDocVerifySurvey
                id={decryLocation}
                eid={decryEid}
                status={decryStatus}
                pagetype="reminder"
              /> */}
              <WholeDocGetPatta eid={decryEid} id={decryLocation} status={decryStatus} pagetype="reminder" />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </section>
  );
};

export default UpdateLocSurvey;
