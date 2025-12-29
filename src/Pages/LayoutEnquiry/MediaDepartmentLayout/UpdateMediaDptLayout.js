import React from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { decryptData } from "../../../Utils/encrypt";
import { Header } from "../../Enquiry/Reusable/Header";
import WholeDocumentLayout from "../DocumentVerifyLayout/DocumentLayoutComponents/WholeDocumentLayout";
import { WholeInvoiceLayout } from "../InvoiceVerifyLayout/InvoiceLayoutComponents/WholeInvoiceLayout";
import WholeLocationLayout from "../LocationVerifyLayout/LocationComponentsLayout/WholeLocationLayout";
import { WholeMarketResearchLayout } from "../MarketResearchLayout/MarketResearchComponentsLayout/WholeMarketResearchLayout";
import { WholeLawyerDocLayout } from "../LawyerDocumentsLayout/LawyerDocumentComponentsLayout/WholeLawyerDocLayout";
import { WholeFieldSurveyLayout } from "../FieldSurveyLayout/FieldSurveyLayoutComponents/WholeFieldSurveyLayout";
import WholeLandOwnerAgreeLayout from "../LandOwnerAgreementLayout/LandOwnerAgreeLayoutComponents/WholeLandOwnerAgreeLayout";
import WholePricingDptLayout from "../PricingDepartmentLayout/PricingComponentsLayout/WholePricingDptLayout";
import WholeMediaDptLayour from "./MediaDptComponentsLayout/WholeMediaDptLayour";


const UpdateMediaDptLayout = () => {
  const { eid, id, status} = useParams();
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
                <WholeMediaDptLayour
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
                <WholeFieldSurveyLayout
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <WholeLandOwnerAgreeLayout
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}

                />
                <WholePricingDptLayout id = {decryId} eid={decryEid} status={decryStatus}  pagetype={"reminder"} discountPage ="discount" />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateMediaDptLayout;
