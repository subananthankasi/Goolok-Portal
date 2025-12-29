import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import InvoiceComponentSurvey from "./Component/InvoiceComponentSurvey";
import ReminderDocVerifySurvey from "../DocumentLandSurvey/DocResubleSurvey/ReminderDocVerifySurvey";
import LocationSurveySelect from "../LocationLandSurvey/LocSurveyResuble/LocationSurveySelect";
import WholeServiceSurvey from "../ServiceConfirmSurvey/ConfirmSurvey/WholeServiceSurvey";
import { decryptData } from "../../../../Utils/encrypt";
import { Header } from "../../../Enquiry/Reusable/Header";


const UpdateInvoiceSurvey = () => {
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
              <InvoiceComponentSurvey id={decryid} eid={decryEid} status={decryStatus} />
            </TabPanel>
            <TabPanel header="Remainder">
              <ReminderDocVerifySurvey id={decryid} eid={decryEid} status={decryStatus}  pagetype="reminder"/>
              <LocationSurveySelect eid={decryEid} id={decryid} status={decryStatus} pagetype={"reminder"} />
              <WholeServiceSurvey eid={decryEid} id={decryid} status={decryStatus} pagetype={"reminder"} />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </section>
  );
};

export default UpdateInvoiceSurvey;
