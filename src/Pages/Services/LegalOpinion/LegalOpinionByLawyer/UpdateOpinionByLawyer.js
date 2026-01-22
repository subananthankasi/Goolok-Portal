import React from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { decryptData } from "../../../../Utils/encrypt";
import { LawyerOpinionUploadStage } from "./LawyerComponent/LawyerOpinionUploadStage";
import { Header } from "../../../Enquiry/Reusable/Header";
import LocationSelectlegal from "../LocationLegalOpinion/legalLocComponent/LocationSelectlegal";
import WholeServiceConfirmLegal from "../ServiceConfirmation/ServiceConfirmComponent/WholeServiceConfirmLegal";
import PaymentLegalComponent from "../PaymentForLegalOpinion/PaymentLegalComponent/PaymentLegalComponent";
import WholeDocGetPatta from "../../DocumentService/GetPattaComponents/WholeDocGetPatta";


function UpdateOpinionByLawyer() {
  const { eid, id, status } = useParams();
  const decryEid = decryptData(eid);
  const decryId = decryptData(id);
  const decryStatus = decryptData(status);

  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <Header eid={decryEid} />
            <TabView>
              <TabPanel header="Current" key="current">
                <LawyerOpinionUploadStage
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                />
              </TabPanel>
              <TabPanel header="Remainder" key="remainder">
                {/* <ReminderDocLegal
                  id={decryId}
                  eid={decryEid}
                  status={decryStatus}
                  pagetype="reminder"
                /> */}
                <WholeDocGetPatta eid={decryEid} id={decryId} status={decryStatus} pagetype="reminder" />
                <LocationSelectlegal
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype="reminder"
                />
                <WholeServiceConfirmLegal
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <PaymentLegalComponent
                  id={decryId}
                  eid={decryEid}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  );
}

export default UpdateOpinionByLawyer;
