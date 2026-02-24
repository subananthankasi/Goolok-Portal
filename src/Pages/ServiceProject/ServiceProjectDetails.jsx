import React from 'react'
import { useParams } from 'react-router-dom';
import { Header } from '../Enquiry/Reusable/Header';
import LocationSelectService from '../Services/LocationService/Locations/LocationSelectService';
import WholeServiceConfirmation from '../Services/ServiceConfirm/ServiceComponent/WholeServiceConfirmation';
import InvoiceComponent from '../Services/InvoiceService/InvoiceComponet/InvoiceComponent';
import PattaComponent from '../Services/PattaApplication/PattaComponent/PattaComponent';
import UpdateHub from '../Services/TicketAssigningHub/UpdateHub';
import { LawyerOpinionUploadStage } from '../Services/LegalOpinion/LegalOpinionByLawyer/LawyerComponent/LawyerOpinionUploadStage';
import LocationSurveySelect from '../Services/LandSurvey/LocationLandSurvey/LocSurveyResuble/LocationSurveySelect';
import WholeServiceSurvey from '../Services/LandSurvey/ServiceConfirmSurvey/ConfirmSurvey/WholeServiceSurvey';
import InvoiceComponentSurvey from '../Services/LandSurvey/InvoicePaymentSurvey/Component/InvoiceComponentSurvey';
import PattaComponentSurvey from '../Services/LandSurvey/PattaApplication/PattaApplicationSurvey/PattaComponentSurvey';
import { WholeMandatoryComponent } from '../Services/LandSurvey/MandodaryDocsSurvey/WholeManComponent/WholeMandatoryComponent';
import WholeTicketSurvey from '../Services/LandSurvey/TicketAssignSurvey/TicketSurveyComponent/WholeTicketSurvey';
import LocationSelectValuation from '../Services/PropertyValuation/LocationVerifyValuation/LocValComponent/LocationSelectValuation';
import WholeServiceValuation from '../Services/PropertyValuation/ServiceConfirmationValuation/ServiceComponentValuation/WholeServiceValuation';
import InvoiceComponentValuation from '../Services/PropertyValuation/InvoiceVerificationValuation/InvoiceValuComponent/InvoiceComponentValuation';
import WholeTicketHubValuation from '../Services/PropertyValuation/TicketAssigningValuation/TicketHubValComponent/WholeTicketHubValuation';
import WholeComponentDocVerifyMissing from '../Services/MissingDocuments/DocumentVeirficationMissing/ComponentDocMissings/WholeComponentDocVerifyMissing';
import LocationSelectMissingDocument from '../Services/MissingDocuments/LocationVerifyMissing/LocMissingComponents/LocationSelectMissingDocument';
import WholeServiceMissingComponent from '../Services/MissingDocuments/ServiceConfirmationMissing/ServiceComponentMissing/WholeServiceMissingComponent';
import InvoiceComponentMissing from '../Services/MissingDocuments/InvoicePaymentMissing/InvoiceMissingComponent/InvoiceComponentMissing';
import WholeTicketHubMissing from '../Services/MissingDocuments/TicketAssigningHubMissing/TicketComponentMissing/WholeTicketHubMissing';
import WholeDocGetPatta from '../Services/DocumentService/GetPattaComponents/WholeDocGetPatta';

const ServiceProjectDetails = () => {
    const { eid, id, status, category, } = useParams();
    return (
        <section className="section">
            <div className="container-fluid">
                {category?.toLowerCase() === "find your property google map location" ? (
                    <>
                        <Header eid={eid} />
                        {/* <ReminderDocumentVerification id={id} eid={eid} status={status} /> */}
                        <WholeDocGetPatta eid={eid} id={id} status={status} pagetype="reminder" />
                        <LocationSelectService
                            eid={eid}
                            id={id}
                            status={status}
                            pagetype={"reminder"}
                        />
                    </>
                ) : category?.toLowerCase() === "get patta for your property" ? (
                    <>
                        <Header eid={eid} />
                        {/* <ReminderDocumentVerification id={id} eid={eid} status={status} /> */}
                        <WholeDocGetPatta eid={eid} id={id} status={status} pagetype="reminder" />
                        <LocationSelectService
                            eid={eid}
                            id={id}
                            status={status}
                            pagetype={"reminder"}
                        />
                        <WholeServiceConfirmation
                            eid={eid}
                            id={id}
                            status={status}
                            pagetype={"reminder"}
                        />
                        <InvoiceComponent
                            id={id}
                            eid={eid}
                            status={status}
                            pagetype={"reminder"}
                        />
                        <PattaComponent
                            eid={eid}
                            id={id}
                            status={status}
                            pagetype={"reminder"}
                        />
                        <UpdateHub pagetype={"reminder"} />
                    </>
                ) : category?.toLowerCase() === "legal opinion" ? (
                    <>
                        <Header eid={eid} />
                        {/* <ReminderDocumentVerification id={id} eid={eid} status={status} /> */}
                        <WholeDocGetPatta eid={eid} id={id} status={status} pagetype="reminder" />
                        <LocationSelectService
                            eid={eid}
                            id={id}
                            status={status}
                            pagetype={"reminder"}
                        />
                        <WholeServiceConfirmation
                            eid={eid}
                            id={id}
                            status={status}
                            pagetype={"reminder"}
                        />
                        <InvoiceComponent
                            id={id}
                            eid={eid}
                            status={status}
                            pagetype={"reminder"}
                        />
                        <LawyerOpinionUploadStage
                            eid={eid}
                            id={id}
                            status={status}
                        />
                    </>
                ) : category?.toLowerCase() === "land survey" ? (
                    <>
                        <Header eid={eid} />
                        {/* <ReminderDocVerifySurvey id={id} eid={eid} status={status} /> */}
                        <WholeDocGetPatta eid={eid} id={id} status={status} pagetype="reminder" />
                        <LocationSurveySelect
                            eid={eid}
                            id={id}
                            status={status}
                            pagetype={"reminder"}
                        />
                        <WholeServiceSurvey
                            eid={eid}
                            id={id}
                            status={status}
                            pagetype={"reminder"}
                        />
                        <InvoiceComponentSurvey
                            id={id}
                            eid={eid}
                            status={status}
                            pagetype={"reminder"}
                        />
                        <PattaComponentSurvey
                            eid={eid}
                            id={id}
                            status={status}
                            pagetype={"reminder"}
                        />
                        <WholeMandatoryComponent id={id} eid={eid} status={status} pagetype={"reminder"} />
                        <WholeTicketSurvey id={id} eid={eid} status={status} />
                    </>
                ) : category?.toLowerCase() === "property valuation" ? (
                    <>
                        <Header eid={eid} />
                        {/* <ReminderDocVerifyValution id={id} eid={eid} status={status} /> */}
                        <WholeDocGetPatta eid={eid} id={id} status={status} pagetype="reminder" />
                        <LocationSelectValuation
                            eid={eid}
                            id={id}
                            status={status}
                            pagetype={"reminder"}
                        />
                        <WholeServiceValuation eid={eid} id={id} status={status} pagetype={"reminder"} />
                        <InvoiceComponentValuation id={id} eid={eid} status={status} pagetype={"reminder"} />
                        <WholeTicketHubValuation id={id} eid={eid} status={status} pagetype={"reminder"} />

                    </>
                ) : category?.toLowerCase() === "missing documents" ? (
                    <>
                        <Header eid={eid} />
                        <WholeComponentDocVerifyMissing
                            id={id}
                            eid={eid}
                            status={status}
                            pagetype={"reminder"}
                        />
                        <LocationSelectMissingDocument
                            eid={eid}
                            id={id}
                            status={status}
                            pagetype={"reminder"}
                        />
                        <WholeServiceMissingComponent
                            eid={eid}
                            id={id}
                            status={status}
                            pagetype={"reminder"}
                        />
                        <InvoiceComponentMissing
                            id={id}
                            eid={eid}
                            status={status}
                            pagetype={"reminder"}
                        />
                        <WholeTicketHubMissing id={id} eid={eid} status={status} pagetype={"reminder"} />

                    </>
                ) : null}


            </div>
        </section>
    )
}

export default ServiceProjectDetails