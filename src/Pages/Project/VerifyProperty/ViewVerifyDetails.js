import React from "react";
import { useParams } from "react-router-dom";
import MediaDeptUpdateStage from "../../Enquiry/Media Department/MediaDeptUpdateStage";
import { EnquirySurveyUpdateStages } from "../../Enquiry/Fieldsurvey/EnquirySurveyUpdateStages";
import MandatoryDocumentUpdate from "../../Enquiry/MandatoryDocument/MandatoryDocumentUpdate";
import { DocumentVerification } from "../../Enquiry/Reusable/DocumentVerification";
import { LawyerDocumentsUploadStages } from "../../Enquiry/LawyerDocuments/LawyerDocumentsUploadStages";
import { PaymentLegalOpinion } from "../../Enquiry/Reusable/PaymentLegalOpinion";
import { Priceproposal } from "../../Enquiry/Reusable/Priceproposal";
import { MarketResearch } from "../../Enquiry/Reusable/MarketResearch";
import LocationSelect from "../../Enquiry/Reusable/LocationSelect";
import { InvoiceDetails } from "../../Enquiry/Reusable/InvoiceDetails";
import { Header } from "../../Enquiry/Reusable/Header";
import ContentWritingUpdateStage from "../../Enquiry/ContentWriting/ContentWritingUpdateStage";
import { MandatoryDocumentUpdateStages } from "../../Enquiry/MandatoryDocument/MandatoryDocumentUpdateStages";
import PriceDepartment from "../../Enquiry/PricingDepartment/PriceDepartmentUpdateStage";
import PaymentScheduleUpdateStage from "../../Enquiry/PaymentSchedule/PaymentScheduleUpdateStage";
import PaymentScheduleStage from "../../Enquiry/PaymentScheduleStage/PaymentScheduleStage";
import LandOwnerDetails from "../../Enquiry/Reusable/LandOwnerDetails";
import LandOwnerAddedTable from "../../Enquiry/Reusable/LandOwnerAddedTable";
import { LandOwnerAgreement } from "../../Enquiry/Reusable/LandOwnerAgreement";
import WholeComponentDocApart from "../../Enquiry/AppartmentEnquiry/ApartDocumentVerification/ApartDocComponents/WholeComponentDocApart";
import { InvoiceApart } from "../../Enquiry/AppartmentEnquiry/InvoiceVerifiCationApart/InvoiceComponentApart/InvoiceApart";
import LocationSelectApart from "../../Enquiry/AppartmentEnquiry/LocationVerificationApart/LocationApartComponent/LocationSelectApart";
import { ApartMarketResearch } from "../../Enquiry/AppartmentEnquiry/MarketResearchApart/MarketResearchApartComponent/ApartMarketResearch";
import { ApartmentProposal } from "../../Enquiry/AppartmentEnquiry/PriceProposalAgreementApart/ApartProposalComponent/ApartmentProposal";
import { ApartLegalOpinion } from "../../Enquiry/AppartmentEnquiry/PaymentLegalOpinion/ApartLegalOpinionComponent/ApartLegalOpinion";
import { WholeApartLawyerDocuments } from "../../Enquiry/AppartmentEnquiry/LawyerDocumentsApart/ApartLawyerDocumentComponents/WholeApartLawyerDocuments";
import { WholeFieldSurveyApart } from "../../Enquiry/AppartmentEnquiry/FieldSurveyApart/ApartFieldSurveyComponents/WholeFieldSurveyApart";
import WholeLandOwnerApart from "../../Enquiry/AppartmentEnquiry/LandOwnerAgreementApart/LandOwnerApartComponents.jsx/WholeLandOwnerApart";
import WholePricingDptApart from "../../Enquiry/AppartmentEnquiry/PricingDepartmentApart/PricingDptApartComponents/WholePricingDptApart";
import WholeMediaDptApart from "../../Enquiry/AppartmentEnquiry/MediaDepartmentApart/ApartMediaReUsable/WholeMediaDptApart";
import WholeContentWritingApart from "../../Enquiry/AppartmentEnquiry/ContentWritingApart/ContentWritingComponentsApart/WholeContentWritingApart";
import { decryptData } from "../../../Utils/encrypt";
import WholeDocPlot from "../../PlotEnquiry/DocumentPlot/DocumentPlotComponents/WholeDocPlot";
import { WholeInvoicePlot } from "../../PlotEnquiry/InvoicePlot/InvoicePlotComponent/WholeInvoicePlot";
import LocationSelectPlot from "../../PlotEnquiry/LocationPlot/LocationPlotComponent/LocationSelectPlot";
import { PlotMarketResearch } from "../../PlotEnquiry/MarketResearchPlot/MarketPlotComponent/PlotMarketResearch";
import { PlotProposal } from "../../PlotEnquiry/PriceProposalagreePlot/PriceProposalComponentPlot/PlotProposal";
import { PlotLegalOpinion } from "../../PlotEnquiry/PaymentLegalOpinion/PaymentLegalComponentPlot/PlotLegalOpinion";
import { PlotLawyerDocument } from "../../PlotEnquiry/LawyerDocumentPlot/LawyerDocumentComponentPlot/PlotLawyerDocument";
import { PlotFieldSurvey } from "../../PlotEnquiry/FieldSurveyPlot/FieldSurveyComponentPlot/PlotFieldSurvey";
import PlotLandOwnerAgree from "../../PlotEnquiry/LandOwnerAgreementPlot/LandOwnerComponentPlot/PlotLandOwnerAgree";
import WholePricingDptPlot from "../../PlotEnquiry/PricingDepartmentPlot/PricingDepComponentPlot/WholePricingDptPlot";
import PlotMediaDepartment from "../../PlotEnquiry/MediaDepartmentPlot/MediaDepartmentComponentPlot/PlotMediaDepartment";
import WholeContentWritingComponentPlot from "../../PlotEnquiry/ContentWritingPlot/ContentPlotComponent/WholeContentWritingComponentPlot";
import WholeContentWritingHouse from "../../HouseEnquiry/ContentWritingHouse/ContentWritingComponentsHouse/WholeContentWritingHouse";
import WholeMediaDptHouse from "../../HouseEnquiry/MediaDptHouse/MediaComponentsHouse/WholeMediaDptHouse";
import WholePricingDptHouse from "../../HouseEnquiry/PricingDptHouse/PricingDptHouseComponents/WholePricingDptHouse";
import WholeLandOwnerAgreeHouse from "../../HouseEnquiry/LandOwnerHouse/LandOwnerComponentsHouse/WholeLandOwnerAgreeHouse";
import { WholeFieldSurveyHouse } from "../../HouseEnquiry/FeildSurveyHouse/FieldSurveyHouseComponents/WholeFieldSurveyHouse";
import { WholeLawyerDocumentsHouse } from "../../HouseEnquiry/LawyerDocumentsHouse/LawyerDocumentsComponentsHouse/WholeLawyerDocumentsHouse";
import { WholePaymentLegalHouse } from "../../HouseEnquiry/PaymentLegalOpinionHouse/PaymentLegalHouseComponents/WholePaymentLegalHouse";
import { WholeProposalHouse } from "../../HouseEnquiry/PriceProposalHouse/ProposalHouseComponents/WholeProposalHouse";
import { WholeMarketResearchHouse } from "../../HouseEnquiry/MarketResearchHouse/MarketResearchHouseComponents/WholeMarketResearchHouse";
import WholeLocationHouse from "../../HouseEnquiry/LocationVertificationHouse/LocationHouseComponents/WholeLocationHouse";
import { WholeInvoiceHouse } from "../../HouseEnquiry/InvoiceVerificationHouse/InvoiceHouseComponent/WholeInvoiceHouse";
import WholeDocHouse from "../../HouseEnquiry/DocumentVerificationHouse/HouseDocComponents/WholeDocHouse";
import WholeContentDptLayout from "../../LayoutEnquiry/ContentWritingLayout/ContentDptComponetsLayout/WholeContentDptLayout";
import WholeMediaDptLayour from "../../LayoutEnquiry/MediaDepartmentLayout/MediaDptComponentsLayout/WholeMediaDptLayour";
import WholePricingDptLayout from "../../LayoutEnquiry/PricingDepartmentLayout/PricingComponentsLayout/WholePricingDptLayout";
import WholeLandOwnerAgreeLayout from "../../LayoutEnquiry/LandOwnerAgreementLayout/LandOwnerAgreeLayoutComponents/WholeLandOwnerAgreeLayout";
import { WholeFieldSurveyLayout } from "../../LayoutEnquiry/FieldSurveyLayout/FieldSurveyLayoutComponents/WholeFieldSurveyLayout";
import { WholeLawyerDocLayout } from "../../LayoutEnquiry/LawyerDocumentsLayout/LawyerDocumentComponentsLayout/WholeLawyerDocLayout";
import { WholeMarketResearchLayout } from "../../LayoutEnquiry/MarketResearchLayout/MarketResearchComponentsLayout/WholeMarketResearchLayout";
import WholeLocationLayout from "../../LayoutEnquiry/LocationVerifyLayout/LocationComponentsLayout/WholeLocationLayout";
import { WholeInvoiceLayout } from "../../LayoutEnquiry/InvoiceVerifyLayout/InvoiceLayoutComponents/WholeInvoiceLayout";
import WholeDocumentLayout from "../../LayoutEnquiry/DocumentVerifyLayout/DocumentLayoutComponents/WholeDocumentLayout";
import WholeContentWritingCommercial from "../../CommercialEnquiry/ContentDptCommercial/ContentComponentsCom/WholeContentWritingCommercial";
import WholeMediaDptCommercial from "../../CommercialEnquiry/MediaDptCommercial/MediaDptComponentsCom/WholeMediaDptCommercial";
import WholePricingDptCommercial from "../../CommercialEnquiry/PricingDptCommercial/PricingDptComponentsCom/WholePricingDptCommercial";
import WholeLandOwnerCommercial from "../../CommercialEnquiry/LandOwnerAgreeCommercial/LandOwnerDetailsComponentsCom/WholeLandOwnerCommercial";
import { WholeFieldSurveyCommercial } from "../../CommercialEnquiry/FieldSurveyCommercial/FieldSurveyComponents/WholeFieldSurveyCommercial";
import { WholeLawyerDocumentCommercial } from "../../CommercialEnquiry/LawyerDocumentsCommercial/LawyerComponentsCommercial/WholeLawyerDocumentCommercial";
import { WholePaymentLegalCommercial } from "../../CommercialEnquiry/PaymentForLegalCommercial/PaymentComponentCom/WholePaymentLegalCommercial";
import { WholePriceProposalCommercial } from "../../CommercialEnquiry/PriceProposalCommercial/PriceProposalComponentCommercial/WholePriceProposalCommercial";
import { WholeMarketResearchCommercial } from "../../CommercialEnquiry/MarketResearchCom/ComponentsMarketcommercial/WholeMarketResearchCommercial";
import WholeLocationComercial from "../../CommercialEnquiry/LocationCommercial/CommercialLocationComponents/WholeLocationComercial";
import { WholeInvoiceCommercial } from "../../CommercialEnquiry/InvoiceCommercial/InvoiceComComponents/WholeInvoiceCommercial";
import WholeDocCommercial from "../../CommercialEnquiry/DocumentCommercial/DocumentComponentsCom/WholeDocCommercial";
import WholeDocumentAP from "../../ApartmentProjectEnquiry/DocumentVerificationAP/DocumentComponetsAP/WholeDocumentAP";
import WholeLocationVerifyAP from "../../ApartmentProjectEnquiry/LocationVerifyAP/LocationComponentsAP/WholeLocationVerifyAP";
import { WholeMarketResearchAP } from "../../ApartmentProjectEnquiry/MarketResearchAP/MarketResearchComponentsAP/WholeMarketResearchAP";
import { WholeLawyerDocumentAP } from "../../ApartmentProjectEnquiry/LawyerDocumentsAP/LawyerDocumentsComponentsAP/WholeLawyerDocumentAP";
import WholeLandOwnerAgreeAP from "../../ApartmentProjectEnquiry/LandOwnerAgreeAP/LandOwnerComponentsAP/WholeLandOwnerAgreeAP";
import WholePricingDptAp from "../../ApartmentProjectEnquiry/PricingDptAP/PricingDptComponentsAP/WholePricingDptAp";
import WholeMediaDptAP from "../../ApartmentProjectEnquiry/MediaDptAP/MediaDptComponentsAp/WholeMediaDptAP";
import WholeContentDptAp from "../../ApartmentProjectEnquiry/ContentDptAp/ContentDptComponentsAP/WholeContentDptAp";

const ViewVerifyDetails = () => {
  const { eid, id, status, landtype, property } = useParams();
  const decryEid = decryptData(eid);
  const decryLandType = decryptData(landtype);
  const decryProperty = decryptData(property);

  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <Header eid={decryEid} />
            {decryProperty === "Land" ? (
              <>
                <DocumentVerification eid={decryEid} />
                <InvoiceDetails id={decryEid} status={"success"} />
                <LocationSelect eid={decryEid} status={"complete"} />
                <MarketResearch eid={decryEid} status={"complete"} />
                <Priceproposal eid={decryEid} status={"complete"} />
                <PaymentLegalOpinion eid={decryEid} status={"complete"} />
                <LawyerDocumentsUploadStages
                  eid={decryEid}
                  status={"complete"}
                />
                <MandatoryDocumentUpdateStages
                  eid={decryEid}
                  status={"complete"}
                  landtype={decryLandType}
                />
                <EnquirySurveyUpdateStages
                  eid={decryEid}
                  status={"complete"}
                  landtype={decryLandType}
                />
                <LandOwnerDetails
                  eid={decryEid}
                  id={id}
                  status={status}
                  landtype={decryLandType}
                />
                <LandOwnerAddedTable
                  eid={decryEid}
                  id={id}
                  status={status}
                  landtype={decryLandType}
                />
                <LandOwnerAgreement
                  eid={decryEid}
                  id={id}
                  status={status}
                  landtype={decryLandType}
                />
                <PriceDepartment
                  eid={decryEid}
                  status={status}
                  landtype={decryLandType}
                  discountPage = {"discount"}

                />
                <PaymentScheduleUpdateStage
                  eid={decryEid}
                  status={status}
                  landtype={decryLandType}
                />
                <PaymentScheduleStage
                  id={decryEid}
                  status={status}
                  landtype={decryLandType}
                />
                <MediaDeptUpdateStage
                  id={id}
                  eid={decryEid}
                  status={status}
                  landtype={decryLandType}
                />
                <ContentWritingUpdateStage
                  eid={decryEid}
                  status={status}
                  landtype={decryLandType}
                />
              </>
            ) : decryProperty === "Apartment" ? (
              <>
                <WholeComponentDocApart
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <InvoiceApart id={decryEid} status={"success"} />
                <LocationSelectApart
                  eid={decryEid}
                  status={"complete"}
                  id={id}
                  pagetype={"reminder"}
                />
                <ApartMarketResearch
                  eid={decryEid}
                  marketid={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <ApartmentProposal
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <ApartLegalOpinion
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeApartLawyerDocuments
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeFieldSurveyApart
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeLandOwnerApart
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholePricingDptApart
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  // pagetype={"reminder"}
                  discountPage = {"discount"}
                />
                <WholeMediaDptApart
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeContentWritingApart
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
              </>
            ) : decryProperty === "Plot" ? (
              <>
                <WholeDocPlot
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeInvoicePlot id={decryEid} status={"success"} />
                <LocationSelectPlot
                  eid={decryEid}
                  status={"complete"}
                  id={id}
                  pagetype={"reminder"}
                />
                <PlotMarketResearch
                  eid={decryEid}
                  marketid={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <PlotProposal
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <PlotLegalOpinion
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <PlotLawyerDocument
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <PlotFieldSurvey
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <PlotLandOwnerAgree
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                  sub_property={decryLandType}
                />
                <WholePricingDptPlot
                  id={id}
                  eid={decryEid}
                  status={"complete"}
                  // pagetype={"reminder"}
                  discountPage = {"discount"}
                  sub_property={decryLandType}
                />
                <PlotMediaDepartment
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  sub_property={decryLandType}
                  pagetype={"reminder"}
                />
                <WholeContentWritingComponentPlot
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  sub_property={decryLandType}
                />
              </>
            ) : decryProperty === "House" ? (
              <>
                <WholeDocHouse
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeInvoiceHouse id={decryEid} status={"success"} />
                <WholeLocationHouse
                  eid={decryEid}
                  status={"complete"}
                  id={id}
                  pagetype={"reminder"}
                />
                <WholeMarketResearchHouse
                  eid={decryEid}
                  marketid={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeProposalHouse
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholePaymentLegalHouse
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeLawyerDocumentsHouse
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  sub_property={decryLandType}
                  pagetype={"reminder"}
                />
                <WholeFieldSurveyHouse
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeLandOwnerAgreeHouse
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  sub_property={decryLandType}
                  pagetype={"reminder"}
                />
                <WholePricingDptHouse
                  id={id}
                  eid={decryEid}
                  status={"complete"}
                  sub_property={decryLandType}
                  // pagetype={"reminder"}
                  discountPage = {"discount"}
                />
                <WholeMediaDptHouse
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  sub_property={decryLandType}
                  pagetype={"reminder"}
                />
                <WholeContentWritingHouse
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  sub_property={decryLandType}
                  pagetype={"reminder"}
                />
              </>
            ) : decryProperty === "Layout" ? (
              <>
                <WholeDocumentLayout
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeInvoiceLayout id={decryEid} status={"success"} />
                <WholeLocationLayout
                  eid={decryEid}
                  status={"complete"}
                  id={id}
                  pagetype={"reminder"}
                />
                <WholeMarketResearchLayout
                  eid={decryEid}
                  marketid={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeLawyerDocLayout
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeFieldSurveyLayout
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeLandOwnerAgreeLayout
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholePricingDptLayout
                  id={id}
                  eid={decryEid}
                  status={"complete"}
                  // pagetype={"reminder"}
                  discountPage = {"discount"}
                />
                <WholeMediaDptLayour
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeContentDptLayout
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
              </>
            ) : decryProperty === "Commercial" ? (
              <>
                <WholeDocCommercial
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeInvoiceCommercial id={decryEid} status={"success"} />
                <WholeLocationComercial
                  eid={decryEid}
                  status={"complete"}
                  id={id}
                  pagetype={"reminder"}
                />
                <WholeMarketResearchCommercial
                  eid={decryEid}
                  marketid={id}
                  status={"complete"}
                  pagetype={"reminder"}
                  subtype={decryLandType}
                />
                <WholePriceProposalCommercial
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholePaymentLegalCommercial
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeLawyerDocumentCommercial
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  subtype={decryLandType}
                  pagetype={"reminder"}
                />
                <WholeFieldSurveyCommercial
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  subtype={decryLandType}
                  pagetype={"reminder"}
                />
                <WholeLandOwnerCommercial
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  subtype={decryLandType}
                  pagetype={"reminder"}
                />
                <WholePricingDptCommercial
                  id={id}
                  eid={decryEid}
                  status={"complete"}
                  subtype={decryLandType}
                  // pagetype={"reminder"}
                  discountPage = {"discount"}
                />
                <WholeMediaDptCommercial
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeContentWritingCommercial
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  subtype={decryLandType}
                  pagetype={"reminder"}
                />
              </>
            ) : decryProperty === "Apartment Project" ? (
              <>
                <WholeDocumentAP
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeLocationVerifyAP
                  eid={decryEid}
                  status={"complete"}
                  id={id}
                  pagetype={"reminder"}
                />
                <WholeMarketResearchAP
                  eid={decryEid}
                  marketid={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeLawyerDocumentAP
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeLandOwnerAgreeAP
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholePricingDptAp
                  id={id}
                  eid={decryEid}
                  status={"complete"}
                  // pagetype={"reminder"}
                  discountPage = {"discount"}
                />
                <WholeMediaDptAP
                  eid={decryEid}
                  id={id}
                  status={"complete"}
                  pagetype={"reminder"}
                />
                <WholeContentDptAp eid={decryEid} id={id} status={"complete"} />
              </>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewVerifyDetails;
