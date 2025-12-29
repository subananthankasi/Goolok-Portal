import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../../Utils/encrypt";
import { Header } from "../../../Enquiry/Reusable/Header";
import ReminderDocVerifySurvey from "../DocumentLandSurvey/DocResubleSurvey/ReminderDocVerifySurvey";
import LocationSurveySelect from "../LocationLandSurvey/LocSurveyResuble/LocationSurveySelect";
import WholeServiceSurvey from "../ServiceConfirmSurvey/ConfirmSurvey/WholeServiceSurvey";
import InvoiceComponentSurvey from "../InvoicePaymentSurvey/Component/InvoiceComponentSurvey";
import PattaComponentSurvey from "../PattaApplication/PattaApplicationSurvey/PattaComponentSurvey";
import { WholeMandatoryComponent } from "../MandodaryDocsSurvey/WholeManComponent/WholeMandatoryComponent";
import WholeTicketSurvey from "./TicketSurveyComponent/WholeTicketSurvey";

const UpdateTicketSurvey = () => {
  const { eid, id, status } = useParams();
  const decryEid = decryptData(eid);
  const decryid = decryptData(id);
  const decryStatus = decryptData(status);

  return (
    <section className="section">
      <div className="container-fluid">
        <div className="row">
          <Header eid={eid} />

          <TabView>
            <TabPanel header="Current">
              <WholeTicketSurvey id={id} eid={eid} status={status} />
            </TabPanel>
            <TabPanel header="Remainder">
              <ReminderDocVerifySurvey id={id} eid={eid} status={status} pagetype="reminder" />
              <LocationSurveySelect
                eid={eid}
                id={id}
                status={status}
                pagetype={"reminder"}
              />
              <WholeServiceSurvey
                eid={eid}
                id={id}
                status={status}
                pagetype={"reminder"}
              />
              <InvoiceComponentSurvey
                id={id}
                eid={eid}
                status={status}
                pagetype={"reminder"}
              />
              <PattaComponentSurvey
                eid={eid}
                id={id}
                status={status}
                pagetype={"reminder"}
              />
              <WholeMandatoryComponent id={id} eid={eid} status={status} pagetype={"reminder"} />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </section>
  );
};

export default UpdateTicketSurvey;
