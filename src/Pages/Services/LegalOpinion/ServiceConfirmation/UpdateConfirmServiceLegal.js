import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import WholeServiceConfirmLegal from "./ServiceConfirmComponent/WholeServiceConfirmLegal";
import { decryptData } from "../../../../Utils/encrypt";
import { Header } from "../../../Enquiry/Reusable/Header";
import LocationSelectlegal from "../LocationLegalOpinion/legalLocComponent/LocationSelectlegal";
import WholeDocGetPatta from "../../DocumentService/GetPattaComponents/WholeDocGetPatta";

const UpdateConfirmServiceLegal = () => {
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
              <WholeServiceConfirmLegal
                eid={decryEid}
                id={decryid}
                status={decryStatus}
              />
            </TabPanel>
            <TabPanel header="Remainder">
              <WholeDocGetPatta eid={decryEid} id={decryid} status={decryStatus} pagetype="reminder" />
              <LocationSelectlegal
                eid={decryEid}
                id={decryid}
                status={decryStatus}
                pagetype="reminder"
              />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </section>
  );
};

export default UpdateConfirmServiceLegal;
