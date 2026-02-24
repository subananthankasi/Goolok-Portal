import { useParams } from "react-router-dom";
import { TabView, TabPanel } from 'primereact/tabview';
import ContentWritingUpdateStage from './ContentWritingUpdateStage';
import { decryptData } from '../../../Utils/encrypt';
import WholeDocumentLand from '../DocumentVerificationLand/LandDocumentComponents/WholeDocumentLand';
import { InvoiceDetails } from '../InvoiceVerification/InvoiceComponentsLand/InvoiceDetails';
import LocationSelectLand from '../LocationVerifyLand/LocationComponents/LocationSelectLand';
import { WholeMarketResearchLand } from '../MarketResearchLand/MarketResearchComponentsLand/WholeMarketResearchLand';
import { PriceProposalLand } from '../PriceProposalAgreement/PriceProposalComponentLand/PriceProposalLand';
import { PaymentLegalOpinionLand } from '../PaymentLegalopinion/PaymentLegalOpinionComponent/PaymentLegalOpinionLand';
import { WholeLawyerDocumentLand } from '../LawyerDocumentsLand/LawyerDocumentComponents/WholeLawyerDocumentLand';
import { WholeMandatoryDocLand } from '../MandatoryDocumentLand/MandatoryDocComponentsLand/WholeMandatoryDocLand';
import { WholeFieldSurveyLand } from '../FieldsurveyLand/FieldsurveyComponentsLand/WholeFieldSurveyLand';
import WholeLandOwnerAgreement from '../LandOwnerAgreement/LandOwnerAgreementComponents/WholeLandOwnerAgreement';
import WholePricingDptLand from '../PricingDepartmentLand/PricingDptLandComponents/WholePricingDptLand';
import WholeMediaDptLand from '../Media Department/MediaDptLandComponents/WholeMediaDptLand';
import { Header } from "../../Enquiry/Reusable/Header";




const ContentWritingUpdate = () => {
    const { eid, id, status, landtype } = useParams();
    const decryLandtype = decryptData(landtype);
    return (
        <>
            <section className="section">
                <div className="container-fluid">
                    <div className="row">
                        <Header eid={eid} />
                        <TabView>
                            <TabPanel header="Current">
                                <ContentWritingUpdateStage eid={eid} id={id} status={status} />
                            </TabPanel>
                            <TabPanel header="Remainder">
                                <WholeDocumentLand
                                    eid={eid}
                                    id={id}
                                    status={status}
                                    pagetype={"reminder"}
                                />
                                <InvoiceDetails id={eid} status={"success"} />
                                <LocationSelectLand eid={eid} status={'complete'} pagetype="reminder" />
                                <WholeMarketResearchLand eid={eid} status={"complete"} pagetype="reminder" />
                                <PriceProposalLand eid={eid} status={'complete'} pagetype="reminder" />
                                <PaymentLegalOpinionLand eid={eid} status={'complete'} pagetype="reminder" />
                                <WholeLawyerDocumentLand eid={eid} id={id} status={status} pagetype="reminder" />
                                <WholeMandatoryDocLand eid={eid} status={'complete'} pagetype="reminder" landtype={decryLandtype} />
                                <WholeFieldSurveyLand eid={eid} id={id} status={status} landtype={decryLandtype} pagetype="reminder" />
                                <WholeLandOwnerAgreement decryEid={eid} decryId={id} decryStatus={status} />
                                <WholePricingDptLand eid={eid} status={status} id={id} pagetype="reminder" />
                                <WholeMediaDptLand id={id} eid={eid} status={status} pagetype="reminder" />
                            </TabPanel>
                        </TabView>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContentWritingUpdate