import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../Utils/encrypt";
import { Header } from "../../Enquiry/Reusable/Header";
import WholeLocationHouse from "./LocationHouseComponents/WholeLocationHouse";
import WholeDocHouse from "../DocumentVerificationHouse/HouseDocComponents/WholeDocHouse";
import { WholeInvoiceHouse } from "../InvoiceVerificationHouse/InvoiceHouseComponent/WholeInvoiceHouse";


const UpdateLocationHouse = () => {
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
              <WholeLocationHouse
                eid={decryEid}
                status={decryStatus}
                id={decryId}
              />
            </TabPanel>
            <TabPanel header="Remainder">
              <WholeDocHouse
                eid={decryEid}
                id={decryId}
                status={decryStatus}
                pagetype={"reminder"}
              />
              <WholeInvoiceHouse id={decryEid} status={"success"} />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </section>
  );
};

export default UpdateLocationHouse;
