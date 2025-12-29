import React from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { Header } from "../../Enquiry/Reusable/Header";
import { decryptData } from "../../../Utils/encrypt";
import {WholeFieldSurveyLayout} from "./FieldSurveyLayoutComponents/WholeFieldSurveyLayout";
import { WholeLawyerDocLayout } from "../LawyerDocumentsLayout/LawyerDocumentComponentsLayout/WholeLawyerDocLayout";
import { WholeMarketResearchLayout } from "../MarketResearchLayout/MarketResearchComponentsLayout/WholeMarketResearchLayout";
import WholeLocationLayout from "../LocationVerifyLayout/LocationComponentsLayout/WholeLocationLayout";
import { WholeInvoiceLayout } from "../InvoiceVerifyLayout/InvoiceLayoutComponents/WholeInvoiceLayout";
import WholeDocumentLayout from "../DocumentVerifyLayout/DocumentLayoutComponents/WholeDocumentLayout";


const UpdateFieldSurveylayout = () => {
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
              <TabPanel header="Current">
                <WholeFieldSurveyLayout
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                />
              </TabPanel>
               <TabPanel header="Remainder" key="remainder">
                <WholeDocumentLayout
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <WholeInvoiceLayout id={decryEid} status={"success"} />
                <WholeLocationLayout
                  eid={decryEid}
                  status={decryStatus}
                  id={decryId}
                  pagetype={"reminder"}
                />
                <WholeMarketResearchLayout
                  eid={decryEid}
                  marketid={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <WholeLawyerDocLayout
                  eid={decryEid}
                  id={decryId}
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
};

export default UpdateFieldSurveylayout;
