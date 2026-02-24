import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import WholeLandOwnerApart from "./LandOwnerApartComponents.jsx/WholeLandOwnerApart";
import WholeComponentDocApart from "../ApartDocumentVerification/ApartDocComponents/WholeComponentDocApart";
import { InvoiceApart } from "../InvoiceVerifiCationApart/InvoiceComponentApart/InvoiceApart";
import LocationSelectApart from "../LocationVerificationApart/LocationApartComponent/LocationSelectApart";
import { ApartMarketResearch } from "../MarketResearchApart/MarketResearchApartComponent/ApartMarketResearch";
import { ApartmentProposal } from "../PriceProposalAgreementApart/ApartProposalComponent/ApartmentProposal";
import { ApartLegalOpinion } from "../PaymentLegalOpinion/ApartLegalOpinionComponent/ApartLegalOpinion";
import { WholeApartLawyerDocuments } from "../LawyerDocumentsApart/ApartLawyerDocumentComponents/WholeApartLawyerDocuments";
import { WholeFieldSurveyApart } from "../FieldSurveyApart/ApartFieldSurveyComponents/WholeFieldSurveyApart";
import { decryptData } from "../../../Utils/encrypt";
import { Header } from "../../Enquiry/Reusable/Header";

const UpdateLandOwnerApart = () => {
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
                <WholeLandOwnerApart
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
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
                <LocationSelectApart
                  eid={decryEid}
                  status={decryStatus}
                  id={decryId}
                  pagetype={"reminder"}
                />
                <ApartMarketResearch
                  eid={decryEid}
                  marketid={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <ApartmentProposal
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <ApartLegalOpinion
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <WholeApartLawyerDocuments
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  pagetype={"reminder"}
                />
                <WholeFieldSurveyApart
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

export default UpdateLandOwnerApart;
