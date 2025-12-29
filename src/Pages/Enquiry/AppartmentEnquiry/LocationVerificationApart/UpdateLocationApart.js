import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../../Utils/encrypt";
import { Header } from "../../Reusable/Header";
import LocationSelectApart from "./LocationApartComponent/LocationSelectApart";
import WholeComponentDocApart from "../ApartDocumentVerification/ApartDocComponents/WholeComponentDocApart";
import { InvoiceApart } from "../InvoiceVerifiCationApart/InvoiceComponentApart/InvoiceApart";

const UpdateLocationApart = () => {
  const { eid, id, status } = useParams();
  const decryEid = decryptData(eid);
  const decryId = decryptData(id);
  const decryStatus = decryptData(status);

  return (
    <section className="section">
      <div className="container-fluid">
        <div className="row">
          <Header eid={decryEid} />
          <TabView>
            <TabPanel header="Current">
              <LocationSelectApart
                eid={decryEid}
                status={decryStatus}
                id={decryId}
              />
            </TabPanel>
            <TabPanel header="Remainder">
              <WholeComponentDocApart
                eid={decryEid}
                id={decryId}
                status={decryStatus}
                pagetype={"reminder"}
              />
              <InvoiceApart id={decryEid} status={"success"} />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </section>
  );
};

export default UpdateLocationApart;
