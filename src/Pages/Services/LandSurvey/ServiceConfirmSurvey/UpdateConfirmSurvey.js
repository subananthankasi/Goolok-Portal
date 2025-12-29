import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import LocationSurveySelect from "../LocationLandSurvey/LocSurveyResuble/LocationSurveySelect";
import ReminderDocVerifySurvey from "../DocumentLandSurvey/DocResubleSurvey/ReminderDocVerifySurvey";
import { Header } from "../../../Enquiry/Reusable/Header";
import { decryptData } from "../../../../Utils/encrypt";
import WholeServiceSurvey from "./ConfirmSurvey/WholeServiceSurvey";

const UpdateConfirmSurvey = () => {
  const { eid, id, status } = useParams();
  const decryEid = decryptData(eid);
  const decryid = decryptData(id);
  const decryStatus = decryptData(status);

  return (
    <section className="section">
      <div className="container-fluid">
        <div className="row">
          <Header eid={decryEid} />

          <TabView>
            <TabPanel header="Current">
              <WholeServiceSurvey
                eid={decryEid}
                id={decryid}
                status={decryStatus}
              />
            </TabPanel>
            <TabPanel header="Remainder">
              <ReminderDocVerifySurvey
                id={decryid}
                eid={decryEid}
                status={decryStatus}
                pagetype="reminder"
              />
              <LocationSurveySelect
                eid={decryEid}
                id={decryid}
                status={decryStatus}
                pagetype={"reminder"}
              />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </section>
  );
};

export default UpdateConfirmSurvey;
