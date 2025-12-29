import React from 'react'
import { useParams } from "react-router-dom";
import { Header } from "../Reusable/Header";
import { TabView, TabPanel } from 'primereact/tabview';
import LocationSelect from "../Reusable/LocationSelect";
import { InvoiceDetails } from "../Reusable/InvoiceDetails";
import { MarketResearch } from "../Reusable/MarketResearch";
import { Priceproposal } from "../Reusable/Priceproposal";
import { PaymentLegalOpinion } from "../Reusable/PaymentLegalOpinion";
import { LawyerDocumentsUploadStages } from "../LawyerDocuments/LawyerDocumentsUploadStages";
import { DocumentVerification } from "../Reusable/DocumentVerification";
import { MandatoryDocumentUpdateStages } from "../MandatoryDocument/MandatoryDocumentUpdateStages";
import { EnquirySurveyUpdateStages } from "../Fieldsurvey/EnquirySurveyUpdateStages";
import MediaDeptUpdateStage from './MediaDeptUpdateStage';
import { LandOwnerAgreement } from '../Reusable/LandOwnerAgreement';
import PriceDepartment from '../PricingDepartment/PriceDepartmentUpdateStage';
import PaymentScheduleUpdateStage from '../PaymentSchedule/PaymentScheduleUpdateStage';
import PaymentScheduleStage from '../PaymentScheduleStage/PaymentScheduleStage';
import { decryptData } from '../../../Utils/encrypt';

const MediaDeptUpdate = () => {

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
                                <MediaDeptUpdateStage id={id} eid={eid} status={status} />
                            </TabPanel>
                            <TabPanel header="Remainder">
                                <DocumentVerification eid={eid} pagetype="reminder" />
                                <InvoiceDetails id={eid} status={"success"} />
                                <LocationSelect eid={eid} status={'complete'} pagetype="reminder" />
                                <MarketResearch eid={eid} status={"complete"} pagetype="reminder" />
                                <Priceproposal eid={eid} status={'complete'} pagetype="reminder" />
                                <PaymentLegalOpinion eid={eid} status={'complete'} pagetype="reminder" />
                                <LawyerDocumentsUploadStages eid={eid} status={'complete'} pagetype="reminder" />
                                <MandatoryDocumentUpdateStages eid={eid} status={'complete'} pagetype="reminder" landtype={decryLandtype} />
                                <EnquirySurveyUpdateStages eid={eid} status={'complete'} pagetype="reminder" landtype={decryLandtype} />
                                <LandOwnerAgreement eid={eid} id={id} status={status} pagetype="reminder" landtype={decryLandtype} />
                                <PriceDepartment eid={eid} status={status} pagetype="reminder" landtype={decryLandtype} />
                                <PaymentScheduleUpdateStage eid={eid} status={status} pagetype="reminder" landtype={decryLandtype} />
                                {/* <PaymentScheduleStage id={id} status={status} pagetype="reminder" landtype={decryLandtype} /> */}

                            </TabPanel>
                        </TabView>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MediaDeptUpdate