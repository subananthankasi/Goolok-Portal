import React from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { Header } from "../../Enquiry/Reusable/Header";
import { decryptData } from "../../../Utils/encrypt";
import WholeLandOwnerAgreeLayout from "./LandOwnerAgreeLayoutComponents/WholeLandOwnerAgreeLayout";
import { WholeFieldSurveyLayout } from "../FieldSurveyLayout/FieldSurveyLayoutComponents/WholeFieldSurveyLayout";
import { WholeLawyerDocLayout } from "../LawyerDocumentsLayout/LawyerDocumentComponentsLayout/WholeLawyerDocLayout";
import { WholeMarketResearchLayout } from "../MarketResearchLayout/MarketResearchComponentsLayout/WholeMarketResearchLayout";
import WholeLocationLayout from "../LocationVerifyLayout/LocationComponentsLayout/WholeLocationLayout";
import { WholeInvoiceLayout } from "../InvoiceVerifyLayout/InvoiceLayoutComponents/WholeInvoiceLayout";
import WholeDocumentLayout from "../DocumentVerifyLayout/DocumentLayoutComponents/WholeDocumentLayout";


const UpdateLandOwnerAgreementLayout = () => {
  const { eid, id, status,sub_property } = useParams();
  const decryEid = decryptData(eid);
  const decryId = decryptData(id);
  const decryStatus = decryptData(status);
  const decrySubProperty = decryptData(sub_property);

  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <Header eid={decryEid} />
            <TabView>
              <TabPanel header="Current">
                <WholeLandOwnerAgreeLayout
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  sub_property={decrySubProperty}
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
                <WholeFieldSurveyLayout
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

export default UpdateLandOwnerAgreementLayout;
