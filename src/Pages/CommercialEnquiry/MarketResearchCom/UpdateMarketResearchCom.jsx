import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import { Header } from "../../Enquiry/Reusable/Header";
import { decryptData } from "../../../Utils/encrypt";
import {WholeMarketResearchCommercial} from "./ComponentsMarketcommercial/WholeMarketResearchCommercial";
import WholeDocCommercial from "../DocumentCommercial/DocumentComponentsCom/WholeDocCommercial";
import { WholeInvoiceCommercial } from "../InvoiceCommercial/InvoiceComComponents/WholeInvoiceCommercial";
import WholeLocationComercial from "../LocationCommercial/CommercialLocationComponents/WholeLocationComercial";

const UpdateMarketResearchCom = () => {
    
  const { eid, id, status,subtype } = useParams();
  const decryEid = decryptData(eid);
  const decryId = decryptData(id);
  const decryStatus = decryptData(status);
  const decrySubtype = decryptData(subtype);

  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <Header eid={decryEid} />
            <TabView>
              <TabPanel header="Current">
                <WholeMarketResearchCommercial
                  eid={decryEid}
                  marketid={decryId}
                  status={decryStatus}
                  subtype = {decrySubtype}
                />
              </TabPanel>

              <TabPanel header="Remainder">
                <WholeDocCommercial
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <WholeInvoiceCommercial id={decryEid} status={"success"} />
                <WholeLocationComercial
                  eid={decryEid}
                  status={decryStatus}
                  id={decryId}
                  pagetype={"reminder"}
                />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateMarketResearchCom;
