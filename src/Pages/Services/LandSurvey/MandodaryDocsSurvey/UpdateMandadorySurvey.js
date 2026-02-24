import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../../Utils/encrypt";
import { Header } from "../../../Enquiry/Reusable/Header";
import LocationSurveySelect from "../LocationLandSurvey/LocSurveyResuble/LocationSurveySelect";
import WholeServiceSurvey from "../ServiceConfirmSurvey/ConfirmSurvey/WholeServiceSurvey";
import InvoiceComponentSurvey from "../InvoicePaymentSurvey/Component/InvoiceComponentSurvey";
import PattaComponentSurvey from "../PattaApplication/PattaApplicationSurvey/PattaComponentSurvey";
import { WholeMandatoryComponent } from "./WholeManComponent/WholeMandatoryComponent";
import WholeDocGetPatta from "../../DocumentService/GetPattaComponents/WholeDocGetPatta";


const UpdateMandadorySurvey = () => {
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
              <WholeMandatoryComponent id={decryid} eid={decryEid} status={decryStatus} />
            </TabPanel>
            <TabPanel header="Remainder">
              {/* <ReminderDocVerifySurvey
                id={decryid}
                eid={decryEid}
                status={decryStatus}
                pagetype="reminder"
              /> */}
              <WholeDocGetPatta eid={decryEid} id={decryid} status={decryStatus} pagetype="reminder" />
              <LocationSurveySelect
                eid={decryEid}
                id={decryid}
                status={decryStatus}
                pagetype={"reminder"}
              />
              <WholeServiceSurvey
                eid={decryEid}
                id={decryid}
                status={decryStatus}
                pagetype={"reminder"}
              />
              <InvoiceComponentSurvey
                id={decryid}
                eid={decryEid}
                status={decryStatus}
                pagetype={"reminder"}
              />
              <PattaComponentSurvey
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

export default UpdateMandadorySurvey;
