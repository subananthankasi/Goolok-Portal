import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import { Header } from "../../../Enquiry/Reusable/Header";
import { decryptData } from "../../../../Utils/encrypt";
import PaymentLegalComponent from "./PaymentLegalComponent/PaymentLegalComponent";
import ReminderDocLegal from "../DocumentLegalOpinion/LegalDocResuble/ReminderDocLegal";
import LocationSelectlegal from "../LocationLegalOpinion/legalLocComponent/LocationSelectlegal";
import WholeServiceConfirmLegal from "../ServiceConfirmation/ServiceConfirmComponent/WholeServiceConfirmLegal";

const UpdateLegalOpinion = () => {
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
              <PaymentLegalComponent
                id={decryid}
                eid={decryEid}
                status={decryStatus}
              />
            </TabPanel>
            <TabPanel header="Remainder">
              <ReminderDocLegal
                id={decryid}
                eid={decryEid}
                status={decryStatus}
                pagetype="reminder"
              />
              <LocationSelectlegal
                eid={decryEid}
                id={decryid}
                status={decryStatus}
                pagetype="reminder"
              />
              <WholeServiceConfirmLegal
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

export default UpdateLegalOpinion;
