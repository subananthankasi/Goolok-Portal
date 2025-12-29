import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Dashboard from "./Pages/Dashboard/dashboard";
import PropertyType from "./Pages/MasterPage/propertyType/propertType";
import PropertyDocument from "./Pages/MasterPage/PropertyDocument/propertyDocument";
import SRODetails from "./Pages/MasterPage/SRODetails/SRODetail";
import State from "./Pages/MasterPage/State/State";
import DistrictCity from "./Pages/MasterPage/District_City/DistrictCity";
import Area from "./Pages/MasterPage/Taluk/area";
import Pincode from "./Pages/MasterPage/Pincode/pincode";
import NewStaff from "./Pages/Staff/NewStaff/newstaff";
import StaffReport from "./Pages/Staff/StaffReport/staffReport";
import DisableStaff from "./Pages/Staff/DisableStaff/disableStaff";
import NewVendors from "./Pages/Vendors/NewVendors/newVendors";
import VendorReport from "./Pages/Vendors/vendorReport/vendorReport";
import DisableVendor from "./Pages/Vendors/DisableVendor/disableVendor";
import GroupType from "./Pages/MasterPage/GroupType/groupType";
import Branch from "./Pages/MasterPage/Branch/branch";
import Enquiry from "./Pages/CRM/Enquiry/enquiry";
import EnquiryFunnel from "./Pages/CRM/Funnel/funnel";
import Success from "./Pages/CRM/Success/success";
import Dropped from "./Pages/CRM/Dropped/dropped";
import Calendar from "./Pages/CRM/Calendar/calendar";
import SuccessPayment from "./Pages/Accounts/SuccessPayment/SuccessPayment";
import FailedPayments from "./Pages/Accounts/OnlinePayments/failedPayment";
import CancelPayments from "./Pages/Accounts/OnlinePayments/cancelPayments";
import Ledger from "./Pages/Accounts/Ledger/Ledger";
import ManualPayments from "./Pages/Accounts/manualPayments/manualPayments";
import Village from "./Pages/MasterPage/Village/village";
import TicketCreate from "./Pages/HelpDesk/ticketCreate";
import RecentTicket from "./Pages/HelpDesk/recentTicket";
import TotalTicket from "./Pages/HelpDesk/totalTickets";
import ActiveTickets from "./Pages/HelpDesk/ActiveTickets";
import ClosedTickets from "./Pages/HelpDesk/ClosedTickets";
import Hold from "./Pages/HelpDesk/Hold";
import OverDue from "./Pages/HelpDesk/overDue";
import AssignedTickets from "./Pages/HelpDesk/AssignedTickets";
import View from "./Pages/HelpDesk/View";
import BlockManagement from "./Pages/Plot/BlockManagement/BlockManagement";
import PlotCancellation from "./Pages/Plot/PlotCancellation/PlotCancellation";
import RefundAmountApprove from "./Pages/Plot/CancelPlotRefund/RefundAmountApprove";
import CancelPlotRefundApprovel from "./Pages/Plot/CancelPlotRefund/CancelPlotRefundApprovel";
import RefundCashIssue from "./Pages/Plot/CancelPlotRefund/RefundCashIssue";
import RefundChequeIssue from "./Pages/Plot/CancelPlotRefund/RefundChequeIssue";
import PlotReBooking from "./Pages/Plot/PlotRebooking/PlotRebooking";
import EditPlotSqFt from "./Pages/Plot/EditPlotSqFt/EditPlotSqFt";
import LiveProperty from "./Pages/Project/LiveProperty/LiveProperty";
import ClosedProperty from "./Pages/Project/ClosedProperty.jsx/ClosedProperty";
import CancelProperty from "./Pages/Project/CancelProperty/CancelProperty";
import ViewAllDetails from "./Pages/Project/LiveProperty/ViewAllDetails";
import Login from "./Components/login/Login";
import Testing1 from "./Testing1";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";
import CancelPlot from "./Pages/Plot/CancelPlot/CancelPlot";
import AreaManagement from "./Pages/Plot/AreaManagement/AreaMangement";
import Wallet from "./Pages/Plot/Wallet/Wallet";
import FailurePayment from "./Pages/Accounts/FailurePayment/FailurePayment";
import Receipt from "./Pages/Accounts/Receipt/Receipt";
import CreditNotes from "./Pages/Accounts/CreditNotes/CreditNotes";
import DebitNotes from "./Pages/Accounts/DebitNotes/DebitNotes";
import Payments from "./Pages/Accounts/Payments/Payments";
import PendingPayment from "./Pages/Payments/PendingPayment/PendingPayment";
import FullyPaid from "./Pages/Payments/FullyPaid/FullyPaid";
import CancelPayment from "./Pages/Payments/CancelPayment/CancelPayment";
import DayBook from "./Pages/Accounts/DayBook/DayBook";
import CashBook from "./Pages/Accounts/CashBook/CashBook";
import BankBook from "./Pages/Accounts/Bankbook/BankBook";
import ServiceInvoice from "./Pages/Billing/ServiceInvoice/ServiceInvoice";
import PendingInvoice from "./Pages/Billing/PendingInvoice/PendingInvoice";
import SuccessInvoice from "./Pages/Billing/SuccessInvoice/SuccessInvoice";
import SubCategory from "./Pages/MasterPage/SubCategory/SubCategory";
import Customer from "./Pages/Customer/Customer";
import CustomerReport from "./Pages/Customer/CustomerReport";
import Block from "./Pages/Plot/BlockManagement/Block";
import Unit from "./Pages/MasterPage/Units/unit";
import CustomerDataEditAndView from "./Pages/Customer/CustomerDataEditAndView";
import Topbar from "./Components/Sidebar/Topbar";
import Sidebars from "./Components/Sidebar/sidebar";
import Footerbar from "./Components/footer/footer";
import LandnewProperty from "./Pages/Property Management/Land/NewProperty/landnewProperty";
import LandPendingProperty from "./Pages/Property Management/Land/PendingProperty/landPendingProperty";
import LandFieldSurveyReport from "./Pages/Property Management/Land/FieldSurveyDepartment/FieldSurveyReport";
import LandFieldSurveyDepartment from "./Pages/Property Management/Land/FieldSurveyDepartment/LandFieldSurveyDepartment";
import LandOwnerReport from "./Pages/Property Management/Land/LandOwner/LandOwnerReport";
import LandOwner from "./Pages/Property Management/Land/LandOwner/LandOwner";
import LandAdminDepartment from "./Pages/Property Management/Land/AdminDepartment/landAdminDepartment";
import LandAdminDepartmentReport from "./Pages/Property Management/Land/AdminDepartmentReport/LandAdminDepartmentReport";
import LandMediaDepartment from "./Pages/Property Management/Land/MediaDepartment/LandMediaDepartment";
import LandMediaDepartmentReport from "./Pages/Property Management/Land/MediaDepartmentReport/LandMediaDepartmentReport";
import LandAwaitingConfirmation from "./Pages/Property Management/Land/AwaitingConfirmation/LandAwaitingConfirmation";
import LayoutNewProperty from "./Pages/Property Management/Layout/NewProperty/LayoutNewProperty";
import LayoutPendingProperty from "./Pages/Property Management/Layout/PendingProperty/LayoutPendingProperty";
import LayoutFieldSurveyDepartment from "./Pages/Property Management/Layout/FieldSurveyDepartment/LayoutFieldSurveyDepartment";
import LayoutFieldSurveyReport from "./Pages/Property Management/Layout/FieldSurveyDepartment/LayoutFieldSurveyReport";
import LayoutOwnerReport from "./Pages/Property Management/Layout/LandOwner/LayoutOwnerReport";
import LayoutOwner from "./Pages/Property Management/Layout/LandOwner/LayoutOwner";
import LayoutAdminDepartment from "./Pages/Property Management/Layout/AdminDepartment/LayoutAdminDepartment";
import LayoutAdminDepartmentReport from "./Pages/Property Management/Layout/AdminDepartmentReport/LayoutAdminDepartmentReport";
import LayoutMediaDepartment from "./Pages/Property Management/Layout/MediaDepartment/LayoutMediaDepartment";
import LayoutMediaDepartmentReport from "./Pages/Property Management/Layout/MediaDepartmentReport/LayoutMediaDepartmentReport";
import LayoutAwaitingConfirmation from "./Pages/Property Management/Layout/AwaitingConfirmation/LayoutAwaitingConfirmation";
import ApartmentNewProperty from "./Pages/Property Management/Apartment/NewProperty/ApartmentNewProperty";
import ApartmentPendingProperty from "./Pages/Property Management/Apartment/PendingProperty/ApartmentPendingProperty";
import ApartmentFieldSurveyReport from "./Pages/Property Management/Apartment/FieldSurveyDepartment/ApartmentFieldSurveyReport";
import ApartmentFieldSurveyDepartment from "./Pages/Property Management/Apartment/FieldSurveyDepartment/ApartmentFieldSurveyDepartment";
import ApartmentOwnerReport from "./Pages/Property Management/Apartment/LandOwner/ApartmentOwnerReport";
import ApartmentOwner from "./Pages/Property Management/Apartment/LandOwner/ApartmentOwner";
import ApartmentAdminDepartment from "./Pages/Property Management/Apartment/AdminDepartment/ApartmentAdminDepartment";
import ApartmentAdminDepartmentReport from "./Pages/Property Management/Apartment/AdminDepartmentReport/ApartmentAdminDepartmentReport";
import ApartmentMediaDepartment from "./Pages/Property Management/Apartment/MediaDepartment/ApartmentMediaDepartment";
import ApartmentMediaDepartmentReport from "./Pages/Property Management/Apartment/MediaDepartmentReport/ApartmentMediaDepartmentReport";
import ApartmentContentDepartmentReport from "./Pages/Property Management/Apartment/ContentDepartmentReport/ApartmentContentDepartmentReport";
import ApartmentContentWritingDepartment from "./Pages/Property Management/Apartment/ContentWritingDepartment/ApartmentContentWritingDepartment";
import ApartmentAwaitingConfirmation from "./Pages/Property Management/Apartment/AwaitingConfirmation/ApartmentAwaitingConfirmation";
import VillaNewProperty from "./Pages/Property Management/Villa/NewProperty/VillaNewProperty";
import VillaPendingProperty from "./Pages/Property Management/Villa/PendingProperty/VillaPendingProperty";
import VillaFieldSurveyReport from "./Pages/Property Management/Villa/FieldSurveyDepartment/VillaFieldSurveyReport";
import VillaFieldSurveyDepartment from "./Pages/Property Management/Villa/FieldSurveyDepartment/VillaFieldSurveyDepartment";
import VillaOwnerReport from "./Pages/Property Management/Villa/LandOwner/VillaOwnerReport";
import VillaOwner from "./Pages/Property Management/Villa/LandOwner/VillaOwner";
import VillaAdminDepartment from "./Pages/Property Management/Villa/AdminDepartment/VillaAdminDepartment";
import VillaAdminDepartmentReport from "./Pages/Property Management/Villa/AdminDepartmentReport/VillaAdminDepartmentReport";
import VillaMediaDepartment from "./Pages/Property Management/Villa/MediaDepartment/VillaMediaDepartment";
import VillaMediaDepartmentReport from "./Pages/Property Management/Villa/MediaDepartmentReport/VillaMediaDepartmentReport";
import VillaContentWritingDepartment from "./Pages/Property Management/Villa/ContentWritingDepartment/VillaContentWritingDepartment";
import VillaContentDepartmentReport from "./Pages/Property Management/Villa/ContentDepartmentReport/VillaContentDepartmentReport";
import VillaAwaitingConfirmation from "./Pages/Property Management/Villa/AwaitingConfirmation/VillaAwaitingConfirmation";
import HouseNewProperty from "./Pages/Property Management/House/NewProperty/HouseNewProperty";
import HousePendingProperty from "./Pages/Property Management/House/PendingProperty/HousePendingProperty";
import HouseFieldSurveyReport from "./Pages/Property Management/House/FieldSurveyDepartment/HouseFieldSurveyReport";
import HouseFieldSurveyDepartment from "./Pages/Property Management/House/FieldSurveyDepartment/HouseFieldSurveyDepartment";
import HouseOwnerReport from "./Pages/Property Management/House/LandOwner/HouseOwnerReport";
import HouseOwner from "./Pages/Property Management/House/LandOwner/HouseOwner";
import HouseAdminDepartment from "./Pages/Property Management/House/AdminDepartment/HouseAdminDepartment";
import HouseAdminDepartmentReport from "./Pages/Property Management/House/AdminDepartmentReport/HouseAdminDepartmentReport";
import HouseMediaDepartmentReport from "./Pages/Property Management/House/MediaDepartmentReport/HouseMediaDepartmentReport";
import HouseMediaDepartment from "./Pages/Property Management/House/MediaDepartment/HouseMediaDepartment";
import HouseContentDepartmentReport from "./Pages/Property Management/House/ContentDepartmentReport/HouseContentDepartmentReport";
import HouseContentWritingDepartment from "./Pages/Property Management/House/ContentWritingDepartment/HouseContentWritingDepartment";
import HouseAwaitingConfirmation from "./Pages/Property Management/House/AwaitingConfirmation/HouseAwaitingConfirmation";
import FarmHouseNewProperty from "./Pages/Property Management/FarmHouse/NewProperty/FarmHouseNewProperty";
import FarmHousePendingProperty from "./Pages/Property Management/FarmHouse/PendingProperty/FarmHousePendingProperty";
import FarmHouseFieldSurveyReport from "./Pages/Property Management/FarmHouse/FieldSurveyDepartment/FarmHouseFieldSurveyReport";
import FarmHouseFieldSurveyDepartment from "./Pages/Property Management/FarmHouse/FieldSurveyDepartment/FarmHouseFieldSurveyDepartment";
import FarmHouseOwner from "./Pages/Property Management/FarmHouse/LandOwner/FarmHouseOwner";
import FarmHouseOwnerReport from "./Pages/Property Management/FarmHouse/LandOwner/FarmHouseOwnerReport";
import FarmHouseAdminDepartmentReport from "./Pages/Property Management/FarmHouse/AdminDepartmentReport/FarmHouseAdminDepartmentReport";
import FarmHouseAdminDepartment from "./Pages/Property Management/FarmHouse/AdminDepartment/FarmHouseAdminDepartment";
import FarmHouseMediaDepartmentReport from "./Pages/Property Management/FarmHouse/MediaDepartmentReport/FarmHouseMediaDepartmentReport";
import FarmHouseMediaDepartment from "./Pages/Property Management/FarmHouse/MediaDepartment/FarmHouseMediaDepartment";
import FarmHouseContentDepartmentReport from "./Pages/Property Management/FarmHouse/ContentDepartmentReport/FarmHouseContentDepartmentReport";
import FarmHouseContentWritingDepartment from "./Pages/Property Management/FarmHouse/ContentWritingDepartment/FarmHouseContentWritingDepartment";
import FarmHouseAwaitingConfirmation from "./Pages/Property Management/FarmHouse/AwaitingConfirmation/FarmHouseAwaitingConfirmation";
import SubProperty from "./Pages/MasterPage/SubProperty/subProperty";
import LandNewPropertyView from "./Pages/Property Management/Land/PendingProperty/LandNewPropertyView";
import LandNewPropertyEdit from "./Pages/Property Management/Land/PendingProperty/LandNewPropertyEdit";
import CommonRoute from "./Routes/CommonRoute";
import subCategoryAmenities from "./Pages/MasterPage/Amenities/subCategoryAmenities";
import Amenities from "./Pages/MasterPage/Amenities/amenities";
import Notification from "./Pages/CRM/Notification/notification";
import LayoutPendingPropertyView from "./Pages/Property Management/Layout/PendingProperty/LayoutPendingPropertyView";
import LayoutPendingPropertyEdit from "./Pages/Property Management/Layout/PendingProperty/LayoutPendingPropertyEdit";
import FileView from "./Utils/FileView/FileView";
import DocumentVerification from "./Pages/Enquiry/DocumentVerification/DocumentVerification";
import DocumentFileUploads from "./Pages/Enquiry/DocumentVerification/DocumentFileUploads";
import InvoiceVerification from "./Pages/Enquiry/InvoiceVerification/InvoiceVerification";
import InvoiceReport from "./Pages/Enquiry/InvoiceVerification/InvoiceReport";
import LocationVerification from "./Pages/Enquiry/LocationMapping/LocationVerification";
import LocationMappingUpdate from "./Pages/Enquiry/LocationMapping/LocationMappingUpdate";
import MarketResearchVerification from "./Pages/Enquiry/MarketResearch/MarketResearchVerification";
import MarketResearchUpdate from "./Pages/Enquiry/MarketResearch/MarketResearchUpdate";
import PriceProposalAgreementReport from "./Pages/Enquiry/PriceProposalAgreement/PriceProposalAgreementReport";
import PriceProposalAgreementUpdate from "./Pages/Enquiry/PriceProposalAgreement/PriceProposalAgreementUpdate";
import EnquiryNotification from "./Pages/TeleCalling/enquiryNotification";
import DocumentNotification from "./Pages/TeleCalling/DocumentNotification";
import InvoiceNotification from "./Pages/TeleCalling/InvoiceNotification";
import LocationMappingNotification from "./Pages/TeleCalling/LocationMappingNotification";
import MarketResearchNotification from "./Pages/TeleCalling/MarketResearchNotification";
import TelleCallEnquiryReport from "./Pages/TeleCalling/TelleCallEnquiryReport";
import StaffOnlyRoute from "./Routes/StaffOnlyRoute";
import InternetError from "./Components/InternetError";
import PaymenLegalReport from "./Pages/Enquiry/PaymentLegalopinion/PaymenLegalReport";
import PaymenLegalReportUpdate from "./Pages/Enquiry/PaymentLegalopinion/PaymenLegalReportUpdate";
import LawyerDocumentsReport from "./Pages/Enquiry/LawyerDocuments/LawyerDocumentsReport";
import LawyerDocumentsUpdate from "./Pages/Enquiry/LawyerDocuments/LawyerDocumentsUpdate";
import MandatoryDocumentReport from "./Pages/Enquiry/MandatoryDocument/MandatoryDocumentReport";
import MandatoryDocumentUpdate from "./Pages/Enquiry/MandatoryDocument/MandatoryDocumentUpdate";
import DocumentVerificationCompleted from "./Pages/Enquiry/DocumentVerification/DocumentVerificationCompleted";
import Advance from "./Pages/MasterPage/Advance/advance";
import Category from "./Pages/MasterPage/Category/Category";
import LawyerDocument from "./Pages/MasterPage/LawyerDocument/LawyerDocument";
import LawyerDocInput from "./Pages/MasterPage/LawyerDocumentInput/LawyerDocInput";
import { ConfirmDialog } from "primereact/confirmdialog";
import FieldSurveyReport from "./Pages/Enquiry/Fieldsurvey/FieldSurveyReport";
import FieldSurveyUpdate from "./Pages/Enquiry/Fieldsurvey/FieldSurveyUpdate";
import LandOwnerAgreementReport from "./Pages/Enquiry/LandOwnerAgreement/LandOwnerAgreementReport";
import LandOwnerAgreementUpdate from "./Pages/Enquiry/LandOwnerAgreement/LandOwnerAgreementUpdate";
import Pricing from "./Pages/MasterPage/Pricing/Pricing";
import PricingDepartment from "./Pages/Enquiry/PricingDepartment/PricingDepartment";
import PricingDeptUpdate from "./Pages/Enquiry/PricingDepartment/PricingDeptUpdate";
import PaymentSchedule from "./Pages/MasterPage/PaymentSchedule/PaymentSchedule";
import MediaDepartment from "./Pages/Enquiry/Media Department/MediaDepartment";
import MediaDeptUpdate from "./Pages/Enquiry/Media Department/MediaDeptUpdate";
import ContentWriting from "./Pages/Enquiry/ContentWriting/ContentWriting";
import ContentWritingUpdate from "./Pages/Enquiry/ContentWriting/ContentWritingUpdate";
import FeaturesTag from "./Pages/MasterPage/Features/FeaturesTag";
import TagsMaster from "./Pages/MasterPage/Tags/TagsMaster";
import VerifyProperty from "./Pages/Project/VerifyProperty/VerifyProperty";
import ViewVerifyDetails from "./Pages/Project/VerifyProperty/ViewVerifyDetails";
import ApartDocumentVerification from "./Pages/Enquiry/AppartmentEnquiry/ApartDocumentVerification/ApartDocumentVerification";
// import ApartDocumentVerificationUpdate from "./Pages/Enquiry/AppartmentEnquiry/ApartDocumentVerification/ApartDocumentVerificationUpdate";
import InvoiceVerificationApart from "./Pages/Enquiry/AppartmentEnquiry/InvoiceVerifiCationApart/InvoiceVerificationApart";
import LocationVerificationAprt from "./Pages/Enquiry/AppartmentEnquiry/LocationVerificationApart/LocationVerificationAprt";
import MarketResearchVerificationApart from "./Pages/Enquiry/AppartmentEnquiry/MarketResearchApart/MarketResearchVerificationApart";
import PriceProposalApart from "./Pages/Enquiry/AppartmentEnquiry/PriceProposalAgreementApart/PriceProposalApart";
import PaymentLegalOpinionApart from "./Pages/Enquiry/AppartmentEnquiry/PaymentLegalOpinion/PaymentLegalOpinionApart";
import LawyerDocumentApart from "./Pages/Enquiry/AppartmentEnquiry/LawyerDocumentsApart/LawyerDocumentApart";
import MandadoryDocsApart from "./Pages/Enquiry/AppartmentEnquiry/MandadoryDocsApart/MandadoryDocsApart";
import FieldSurveyApart from "./Pages/Enquiry/AppartmentEnquiry/FieldSurveyApart/FieldSurveyApart";
import LandOwnerAgreementApart from "./Pages/Enquiry/AppartmentEnquiry/LandOwnerAgreementApart/LandOwnerAgreementApart";
import PricingDepartmentApart from "./Pages/Enquiry/AppartmentEnquiry/PricingDepartmentApart/PricingDepartmentApart";
import MediaDepartmentApart from "./Pages/Enquiry/AppartmentEnquiry/MediaDepartmentApart/MediaDepartmentApart";
import ContentWritingApart from "./Pages/Enquiry/AppartmentEnquiry/ContentWritingApart/ContentWritingApart";
import UpdateInvoiceVerificationApart from "./Pages/Enquiry/AppartmentEnquiry/InvoiceVerifiCationApart/UpdateInvoiceVerificationApart";
import UpdateLocationApart from "./Pages/Enquiry/AppartmentEnquiry/LocationVerificationApart/UpdateLocationApart";
import UpdateMarketResearchApart from "./Pages/Enquiry/AppartmentEnquiry/MarketResearchApart/UpdateMarketResearchApart";
import UpdateProposalApart from "./Pages/Enquiry/AppartmentEnquiry/PriceProposalAgreementApart/UpdateProposalApart";
import UpdateLegalApart from "./Pages/Enquiry/AppartmentEnquiry/PaymentLegalOpinion/UpdateLegalApart";
import UpdateLawyerApart from "./Pages/Enquiry/AppartmentEnquiry/LawyerDocumentsApart/UpdateLawyerApart";
import UpdateMandatoryApart from "./Pages/Enquiry/AppartmentEnquiry/MandadoryDocsApart/UpdateMandatoryApart";
import UpdateSurveyApart from "./Pages/Enquiry/AppartmentEnquiry/FieldSurveyApart/UpdateSurveyApart";
import UpdateLandOwnerApart from "./Pages/Enquiry/AppartmentEnquiry/LandOwnerAgreementApart/UpdateLandOwnerApart";
import UpdatePricingDptApart from "./Pages/Enquiry/AppartmentEnquiry/PricingDepartmentApart/UpdatePricingDptApart";
import UpdateMediaApart from "./Pages/Enquiry/AppartmentEnquiry/MediaDepartmentApart/UpdateMediaApart";
import UpdateContentWriting from "./Pages/Enquiry/AppartmentEnquiry/ContentWritingApart/UpdateContentWriting";
import Offer from "./Pages/MasterPage/Offer/Offer";
import Coupons from "./Pages/MasterPage/Coupons/Coupons";
import Strategy from "./Pages/MasterPage/Strategy/Strategy";
import DocumentService from "./Pages/Services/DocumentService/DocumentService";
import UpdateServiceDocument from "./Pages/Services/DocumentService/UpdateServiceDocument";
import LocationService from "./Pages/Services/LocationService/LocationService";
import UpdateLocationService from "./Pages/Services/LocationService/UpdateLocationService";
import ServiceConfirm from "./Pages/Services/ServiceConfirm/ServiceConfirm";
import UpdateConfirmService from "./Pages/Services/ServiceConfirm/UpdateConfirmService";
import InvoiceService from "./Pages/Services/InvoiceService/InvoiceService";
import UpdateInvoiceService from "./Pages/Services/InvoiceService/UpdateInvoiceService";
import PattaApplication from "./Pages/Services/PattaApplication/PattaApplication";
import UpdatepattaApplication from "./Pages/Services/PattaApplication/UpdatepattaApplication";
import DocumentSet from "./Pages/Services/DocumentService/DocumentSet";
import TalukOfficeDetails from "./Pages/MasterPage/TalukOfficeDetails/TalukOfficeDetails";
import TikcetHub from "./Pages/Services/TicketAssigningHub/TikcetHub";
import UpdateHub from "./Pages/Services/TicketAssigningHub/UpdateHub";
import ContactPersonDetails from "./Pages/MasterPage/ContactPersonDetails/ContactPersonDetails";
// import "@coreui/coreui-pro/dist/css/coreui.min.css";
import DocumentSetHub from "./Pages/Services/TicketAssigningHub/DocumentSetHub";
import VerifyService from "./Pages/ServiceProject/VerifyService/VerifyServiceProject";
import VerifyServiceProject from "./Pages/ServiceProject/VerifyService/VerifyServiceProject";
import CompleteServiceProject from "./Pages/ServiceProject/CompleteService/CompleteServiceProject";
import ClosedServiceProject from "./Pages/ServiceProject/ClosedService/ClosedServiceProject";
import ServiceProjectDetails from "./Pages/ServiceProject/ServiceProjectDetails";
import DocumentMap from "./Pages/Services/GoogleMapLocation/DocumentVerificationLoc/DocumentMap";
import LocationMap from "./Pages/Services/GoogleMapLocation/LocationVerification/LocationMap";
import UpdateLocationMap from "./Pages/Services/GoogleMapLocation/LocationVerification/UpdateLocationMap";
import DocumentSetGoogleMap from "./Pages/Services/GoogleMapLocation/DocumentVerificationLoc/DocumentSetGoogleMap";
import UpdateDocumentGoogleMap from "./Pages/Services/GoogleMapLocation/DocumentVerificationLoc/UpdateDocumentGoogleMap";
import DocumentLegalVerifcation from "./Pages/Services/LegalOpinion/DocumentLegalOpinion/DocumentLegalVerifcation";
import UpdateLegalDoc from "./Pages/Services/LegalOpinion/DocumentLegalOpinion/UpdateLegalDoc";
import DocumentSetLegal from "./Pages/Services/LegalOpinion/DocumentLegalOpinion/DocumentSetLegal";
import LocationVerificationLegal from "./Pages/Services/LegalOpinion/LocationLegalOpinion/LocationVerificationLegal";
import UpdateLocLegal from "./Pages/Services/LegalOpinion/LocationLegalOpinion/UpdateLocLegal";
import ServiceConfirmLegal from "./Pages/Services/LegalOpinion/ServiceConfirmation/ServiceConfirmLegal";
import UpdateConfirmServiceLegal from "./Pages/Services/LegalOpinion/ServiceConfirmation/UpdateConfirmServiceLegal";
import PaymentLegalOp from "./Pages/Services/LegalOpinion/PaymentForLegalOpinion/PaymentLegalOp";
import UpdateLegalOpinion from "./Pages/Services/LegalOpinion/PaymentForLegalOpinion/UpdateLegalOpinion";
import LegalOpinionByLawyer from "./Pages/Services/LegalOpinion/LegalOpinionByLawyer/LegalOpinionByLawyer";
import UpdateOpinionByLawyer from "./Pages/Services/LegalOpinion/LegalOpinionByLawyer/UpdateOpinionByLawyer";
import DocumentLandSurvey from "./Pages/Services/LandSurvey/DocumentLandSurvey/DocumentLandSurvey";
import UpdateDocumentSurvey from "./Pages/Services/LandSurvey/DocumentLandSurvey/UpdateDocumentSurvey";
import DocumentSetSurvey from "./Pages/Services/LandSurvey/DocumentLandSurvey/DocumentSetSurvey";
import LocationSurvey from "./Pages/Services/LandSurvey/LocationLandSurvey/LocationSurvey";
import UpdateLocSurvey from "./Pages/Services/LandSurvey/LocationLandSurvey/UpdateLocSurvey";
import ServiceConfirmSurvey from "./Pages/Services/LandSurvey/ServiceConfirmSurvey/ServiceConfirmSurvey";
import UpdateConfirmSurvey from "./Pages/Services/LandSurvey/ServiceConfirmSurvey/UpdateConfirmSurvey";
import InvoiceSurvey from "./Pages/Services/LandSurvey/InvoicePaymentSurvey/InvoiceSurvey";
import UpdateInvoiceSurvey from "./Pages/Services/LandSurvey/InvoicePaymentSurvey/UpdateInvoiceSurvey";
import ApplicationSurvey from "./Pages/Services/LandSurvey/PattaApplication/ApplicationSurvey";
import UpdateApplicationSurvey from "./Pages/Services/LandSurvey/PattaApplication/UpdateApplicationSurvey";
import MandadorySurvey from "./Pages/Services/LandSurvey/MandodaryDocsSurvey/MandadorySurvey";
import UpdateMandadorySurvey from "./Pages/Services/LandSurvey/MandodaryDocsSurvey/UpdateMandadorySurvey";
import TicketAssigningSurvey from "./Pages/Services/LandSurvey/TicketAssignSurvey/TicketAssigningSurvey";
import UpdateTicketSurvey from "./Pages/Services/LandSurvey/TicketAssignSurvey/UpdateTicketSurvey";
import DocumentValuation from "./Pages/Services/PropertyValuation/DocumentVerifyValuation/DocumentValuation";
import DocumentSetValuation from "./Pages/Services/PropertyValuation/DocumentVerifyValuation/DocumentSetValuation";
import UpdateDocValuation from "./Pages/Services/PropertyValuation/DocumentVerifyValuation/UpdateDocValuation";
import LocationValuation from "./Pages/Services/PropertyValuation/LocationVerifyValuation/LocationValuation";
import UpdateLocationValuation from "./Pages/Services/PropertyValuation/LocationVerifyValuation/UpdateLocationValuation";
import ServiceConfirmValuation from "./Pages/Services/PropertyValuation/ServiceConfirmationValuation/ServiceConfirmValuation";
import UpdateServiceConValuation from "./Pages/Services/PropertyValuation/ServiceConfirmationValuation/UpdateServiceConValuation";
import InvoiceVerifyValuation from "./Pages/Services/PropertyValuation/InvoiceVerificationValuation/InvoiceVerifyValuation";
import UpdateInvoiceVerifyValuation from "./Pages/Services/PropertyValuation/InvoiceVerificationValuation/UpdateInvoiceVerifyValuation";
import TicketAssignValuation from "./Pages/Services/PropertyValuation/TicketAssigningValuation/TicketAssignValuation";
import UpdateTicketHubValuation from "./Pages/Services/PropertyValuation/TicketAssigningValuation/UpdateTicketHubValuation";
import UpdateDocApart from "./Pages/Enquiry/AppartmentEnquiry/ApartDocumentVerification/UpdateDocApart";
import DocumentVerifyMissing from "./Pages/Services/MissingDocuments/DocumentVeirficationMissing/DocumentVerifyMissing";
import UpdateDocVerifyMissing from "./Pages/Services/MissingDocuments/DocumentVeirficationMissing/UpdateDocVerifyMissing";
import LocationVerifyMissing from "./Pages/Services/MissingDocuments/LocationVerifyMissing/LocationVerifyMissing";
import UpdateLocationMissing from "./Pages/Services/MissingDocuments/LocationVerifyMissing/UpdateLocationMissing";
import ServiceConfirmationMissing from "./Pages/Services/MissingDocuments/ServiceConfirmationMissing/ServiceConfirmationMissing";
import UpdateServiceMissing from "./Pages/Services/MissingDocuments/ServiceConfirmationMissing/UpdateServiceMissing";
import InvoicePaymentMissing from "./Pages/Services/MissingDocuments/InvoicePaymentMissing/InvoicePaymentMissing";
import UpdateInvoiceMissing from "./Pages/Services/MissingDocuments/InvoicePaymentMissing/UpdateInvoiceMissing";
import TicketAssigningMissing from "./Pages/Services/MissingDocuments/TicketAssigningHubMissing/TicketAssigningMissing";
import UpdateTicketHubMissing from "./Pages/Services/MissingDocuments/TicketAssigningHubMissing/UpdateTicketHubMissing";
import DocumentPlot from "./Pages/PlotEnquiry/DocumentPlot/DocumentPlot";
import UpdateDocPlot from "./Pages/PlotEnquiry/DocumentPlot/UpdateDocPlot";
import InvoicePlot from "./Pages/PlotEnquiry/InvoicePlot/InvoicePlot";
import UpdateInvoicePlot from "./Pages/PlotEnquiry/InvoicePlot/UpdateInvoicePlot";
import LocationPlot from "./Pages/PlotEnquiry/LocationPlot/LocationPlot";
import UpdateLocationPlot from "./Pages/PlotEnquiry/LocationPlot/UpdateLocationPlot";
import MarketPlot from "./Pages/PlotEnquiry/MarketResearchPlot/MarketPlot";
import UpdateMarketPlot from "./Pages/PlotEnquiry/MarketResearchPlot/UpdateMarketPlot";
import PriceProposalPlot from "./Pages/PlotEnquiry/PriceProposalagreePlot/PriceProposalPlot";
import UpdatePriceProposalPlot from "./Pages/PlotEnquiry/PriceProposalagreePlot/UpdatePriceProposalPlot";
import PaymentLegalPlot from "./Pages/PlotEnquiry/PaymentLegalOpinion/PaymentLegalPlot";
import UpdateLegalPlot from "./Pages/PlotEnquiry/PaymentLegalOpinion/UpdateLegalPlot";
import LawyerPlot from "./Pages/PlotEnquiry/LawyerDocumentPlot/LawyerPlot";
import UpdateLawyerPlot from "./Pages/PlotEnquiry/LawyerDocumentPlot/UpdateLawyerPlot";
import UpdateFieldSurveyPlot from "./Pages/PlotEnquiry/FieldSurveyPlot/UpdateFieldSurveyPlot";
import FieldSurveyPlot from "./Pages/PlotEnquiry/FieldSurveyPlot/FieldSurveyPlot";
import LandOwnerPlot from "./Pages/PlotEnquiry/LandOwnerAgreementPlot/LandOwnerPlot";
import UpdateLandOwnerPlot from "./Pages/PlotEnquiry/LandOwnerAgreementPlot/UpdateLandOwnerPlot";
import PricingDepplot from "./Pages/PlotEnquiry/PricingDepartmentPlot/PricingDepplot";
import UpdatePricingDepPlot from "./Pages/PlotEnquiry/PricingDepartmentPlot/UpdatePricingDepPlot";
import MediaDepartmentPlot from "./Pages/PlotEnquiry/MediaDepartmentPlot/MediaDepartmentPlot";
import UpdateMediaDepPlot from "./Pages/PlotEnquiry/MediaDepartmentPlot/UpdateMediaDepPlot";
import ContentWritingPlot from "./Pages/PlotEnquiry/ContentWritingPlot/ContentWritingPlot";
import UpdateContentWritingPlot from "./Pages/PlotEnquiry/ContentWritingPlot/UpdateContentWritingPlot";
import VacantReport from "./Pages/PropertyInventory/VacantReport/VacantReport";
import BlockingBookingLand from "./Pages/Enquiry/BlockingBookingLand/BlockingBookingLand";
import PaymentScheduleLand from "./Pages/Enquiry/PaymentScheduleLand/PaymentScheduleLand";
import UpdatePaymentScheduleLand from "./Pages/Enquiry/PaymentScheduleLand/UpdatePaymentScheduleLand";
import RegistrationTicketLand from "./Pages/Enquiry/RegistrationTicketLand/RegistrationTicketLand";
import UpdateRegistrationTicketLand from "./Pages/Enquiry/RegistrationTicketLand/UpdateRegistrationTicketLand";
import RegistrationLand from "./Pages/Enquiry/RegistrationLand/RegistrationLand";
import UpdateRegistrationLand from "./Pages/Enquiry/RegistrationLand/UpdateRegistrationLand";
import AfterSaleLand from "./Pages/Enquiry/AfterSaleLand/AfterSaleLand";
import UpdateAfterSaleLand from "./Pages/Enquiry/AfterSaleLand/UpdateAfterSaleLand";
import Bookingprocess from "./Pages/Booking/Bookingreport/Bookingprocess";
import Bookingcomplete from "./Pages/Booking/Bookingreport/Bookingcomplete";
import Bookingcanceled from "./Pages/Booking/Bookingreport/Bookingcanceled";
import Updatebookingdata from "./Pages/Booking/Bookingreport/Updatebookingdata";
import Blockreport from "./Pages/PropertyInventory/VacantReport/Blockreport";
import DocumentHouse from "./Pages/HouseEnquiry/DocumentVerificationHouse/DocumentHouse";
import UpdateDocumentHouse from "./Pages/HouseEnquiry/DocumentVerificationHouse/UpdateDocumentHouse";
import InvoiceHouse from "./Pages/HouseEnquiry/InvoiceVerificationHouse/InvoiceHouse";
import UpdateInvoiceHouse from "./Pages/HouseEnquiry/InvoiceVerificationHouse/UpdateInvoiceHouse";
import LocationVerifyHouse from "./Pages/HouseEnquiry/LocationVertificationHouse/LocationVerifyHouse";
import UpdateLocationHouse from "./Pages/HouseEnquiry/LocationVertificationHouse/UpdateLocationHouse";
import MarketResearchHouse from "./Pages/HouseEnquiry/MarketResearchHouse/MarketResearchHouse";
import UpdateMarketResearchHouse from "./Pages/HouseEnquiry/MarketResearchHouse/UpdateMarketResearchHouse";
import PriceProposalHouse from "./Pages/HouseEnquiry/PriceProposalHouse/PriceProposalHouse";
import UpdatePriceProposalHouse from "./Pages/HouseEnquiry/PriceProposalHouse/UpdatePriceProposalHouse";
import PaymentLegalOpinionHouse from "./Pages/HouseEnquiry/PaymentLegalOpinionHouse/PaymentLegalOpinionHouse";
import UpdatePaymentLegalHouse from "./Pages/HouseEnquiry/PaymentLegalOpinionHouse/UpdatePaymentLegalHouse";
import LawyerDocumentHouse from "./Pages/HouseEnquiry/LawyerDocumentsHouse/LawyerDocumentHouse";
import UpdateLawyerDocumentsHouse from "./Pages/HouseEnquiry/LawyerDocumentsHouse/UpdateLawyerDocumentsHouse";
import FieldSurveyHouse from "./Pages/HouseEnquiry/FeildSurveyHouse/FieldSurveyHouse";
import UpdateFieldSurveyHouse from "./Pages/HouseEnquiry/FeildSurveyHouse/UpdateFieldSurveyHouse";
import LandOwnerHouse from "./Pages/HouseEnquiry/LandOwnerHouse/LandOwnerHouse";
import UpdateLandOwnerHouse from "./Pages/HouseEnquiry/LandOwnerHouse/UpdateLandOwnerHouse";
import PricingDptHouse from "./Pages/HouseEnquiry/PricingDptHouse/PricingDptHouse";
import UpdatePricingDptHouse from "./Pages/HouseEnquiry/PricingDptHouse/UpdatePricingDptHouse";
import MediaDptHouse from "./Pages/HouseEnquiry/MediaDptHouse/MediaDptHouse";
import UpdateMediaDptHouse from "./Pages/HouseEnquiry/MediaDptHouse/UpdateMediaDptHouse";
import ContentWritingHouse from "./Pages/HouseEnquiry/ContentWritingHouse/ContentWritingHouse";
import UpdateContentWritingHouse from "./Pages/HouseEnquiry/ContentWritingHouse/UpdateContentWritingHouse";
import DocumentVerifyLayout from "./Pages/LayoutEnquiry/DocumentVerifyLayout/DocumentVerifyLayout";
import InvoiceVerifyLayout from "./Pages/LayoutEnquiry/InvoiceVerifyLayout/InvoiceVerifyLayout";
import UpdateInvoiceVerifyLayout from "./Pages/LayoutEnquiry/InvoiceVerifyLayout/UpdateInvoiceVerifyLayout";
import LocationVerifyLayout from "./Pages/LayoutEnquiry/LocationVerifyLayout/LocationVerifyLayout";
import UpdateLocationverifyLayout from "./Pages/LayoutEnquiry/LocationVerifyLayout/UpdateLocationverifyLayout";
import UpdateDocumentVerifyLayout from "./Pages/LayoutEnquiry/DocumentVerifyLayout/UpdateDocumentVerifyLayout";
import MarketResearchLayout from "./Pages/LayoutEnquiry/MarketResearchLayout/MarketResearchLayout";
import UpdateMarketResearchLayout from "./Pages/LayoutEnquiry/MarketResearchLayout/UpdateMarketResearchLayout";
import LawyerDocumentLayout from "./Pages/LayoutEnquiry/LawyerDocumentsLayout/LawyerDocumentLayout";
import UpdateLawyerDocumentLayout from "./Pages/LayoutEnquiry/LawyerDocumentsLayout/UpdateLawyerDocumentLayout";
import FieldSurveyLayout from "./Pages/LayoutEnquiry/FieldSurveyLayout/FieldSurveyLayout";
import UpdateFieldSurveylayout from "./Pages/LayoutEnquiry/FieldSurveyLayout/UpdateFieldSurveylayout";
import LandOwnerAgreementLayout from "./Pages/LayoutEnquiry/LandOwnerAgreementLayout/LandOwnerAgreementLayout";
import UpdateLandOwnerAgreementLayout from "./Pages/LayoutEnquiry/LandOwnerAgreementLayout/UpdateLandOwnerAgreementLayout";
import PricingDptLayout from "./Pages/LayoutEnquiry/PricingDepartmentLayout/PricingDptLayout";
import UpdatePricingDptLayout from "./Pages/LayoutEnquiry/PricingDepartmentLayout/UpdatePricingDptLayout";
import MediaDptLayout from "./Pages/LayoutEnquiry/MediaDepartmentLayout/MediaDptLayout";
import UpdateMediaDptLayout from "./Pages/LayoutEnquiry/MediaDepartmentLayout/UpdateMediaDptLayout";
import ContentDptLayout from "./Pages/LayoutEnquiry/ContentWritingLayout/ContentDptLayout";
import UpdateContentDptLayout from "./Pages/LayoutEnquiry/ContentWritingLayout/UpdateContentDptLayout";
import DocumentCom from "./Pages/CommercialEnquiry/DocumentCommercial/DocumentCom";
import UpdateDocumentCom from "./Pages/CommercialEnquiry/DocumentCommercial/UpdateDocumentCom";
import InvoiceCom from "./Pages/CommercialEnquiry/InvoiceCommercial/InvoiceCom";
import LocationCom from "./Pages/CommercialEnquiry/LocationCommercial/LocationCom";
import UpdateLocationCom from "./Pages/CommercialEnquiry/LocationCommercial/UpdateLocationCom";
import MarketResearchCom from "./Pages/CommercialEnquiry/MarketResearchCom/MarketResearchCom";
import UpdateMarketResearchCom from "./Pages/CommercialEnquiry/MarketResearchCom/UpdateMarketResearchCom";
import UpdateInvoiceCom from "./Pages/CommercialEnquiry/InvoiceCommercial/UpdateInvoiceCom";
import PriceProposalCommercial from "./Pages/CommercialEnquiry/PriceProposalCommercial/PriceProposalCommercial";
import UpdatePriceProposalCommercial from "./Pages/CommercialEnquiry/PriceProposalCommercial/UpdatePriceProposalCommercial";
import PaymentLegalCommercial from "./Pages/CommercialEnquiry/PaymentForLegalCommercial/PaymentLegalCommercial";
import UpdateLegalCommercial from "./Pages/CommercialEnquiry/PaymentForLegalCommercial/UpdateLegalCommercial";
import UpdateLawyerDocumentCom from "./Pages/CommercialEnquiry/LawyerDocumentsCommercial/UpdateLawyerDocumentCom";
import LawyerDocumentCom from "./Pages/CommercialEnquiry/LawyerDocumentsCommercial/LawyerDocumentCom";
import FieldSurveyCommercial from "./Pages/CommercialEnquiry/FieldSurveyCommercial/FieldSurveyCommercial";
import UpdateFieldSurveyCom from "./Pages/CommercialEnquiry/FieldSurveyCommercial/UpdateFieldSurveyCom";
import LandOwnerComercial from "./Pages/CommercialEnquiry/LandOwnerAgreeCommercial/LandOwnerComercial";
import UpdateLandOwnerCom from "./Pages/CommercialEnquiry/LandOwnerAgreeCommercial/UpdateLandOwnerCom";
import PricingDptCommercial from "./Pages/CommercialEnquiry/PricingDptCommercial/PricingDptCommercial";
import UpdatePricingDptCom from "./Pages/CommercialEnquiry/PricingDptCommercial/UpdatePricingDptCom";
import MediaDptCommercial from "./Pages/CommercialEnquiry/MediaDptCommercial/MediaDptCommercial";
import UpdateMediaDptCom from "./Pages/CommercialEnquiry/MediaDptCommercial/UpdateMediaDptCom";
import ContentDptCommercial from "./Pages/CommercialEnquiry/ContentDptCommercial/ContentDptCommercial";
import UpdateContentDptCom from "./Pages/CommercialEnquiry/ContentDptCommercial/UpdateContentDptCom";
import UpdateDocumentVerifyAP from "./Pages/ApartmentProjectEnquiry/DocumentVerificationAP/UpdateDocumentVerifyAP";
import DocumentVerifyAp from "./Pages/ApartmentProjectEnquiry/DocumentVerificationAP/DocumentVerifyAp";
import LocationVerifyAP from "./Pages/ApartmentProjectEnquiry/LocationVerifyAP/LocationVerifyAP";
import UpdateLocationVerifyAp from "./Pages/ApartmentProjectEnquiry/LocationVerifyAP/UpdateLocationVerifyAp";
import MarketResearchAP from "./Pages/ApartmentProjectEnquiry/MarketResearchAP/MarketResearchAP";
import UpdateMarketResearchAP from "./Pages/ApartmentProjectEnquiry/MarketResearchAP/UpdateMarketResearchAP";
import LawyerDocumentsAP from "./Pages/ApartmentProjectEnquiry/LawyerDocumentsAP/LawyerDocumentsAP";
import UpdateLawyerDocumentsAP from "./Pages/ApartmentProjectEnquiry/LawyerDocumentsAP/UpdateLawyerDocumentsAP";
import LandOwnerAgreeAP from "./Pages/ApartmentProjectEnquiry/LandOwnerAgreeAP/LandOwnerAgreeAP";
import UpdateLandOwnerAgreeAP from "./Pages/ApartmentProjectEnquiry/LandOwnerAgreeAP/UpdateLandOwnerAgreeAP";
import PricingDptAP from "./Pages/ApartmentProjectEnquiry/PricingDptAP/PricingDptAP";
import UpdatePricingDptAP from "./Pages/ApartmentProjectEnquiry/PricingDptAP/UpdatePricingDptAP";
import MediaDptAp from "./Pages/ApartmentProjectEnquiry/MediaDptAP/MediaDptAp";
import UpdateMediaDptAP from "./Pages/ApartmentProjectEnquiry/MediaDptAP/UpdateMediaDptAP";
import ContentDptAp from "./Pages/ApartmentProjectEnquiry/ContentDptAp/ContentDptAp";
import UpdateContentDptAP from "./Pages/ApartmentProjectEnquiry/ContentDptAp/UpdateContentDptAP";
import BlockingBookingApartments from "./Pages/Enquiry/AppartmentEnquiry/Blocking&BookingApartment/BlockingBookingApartments";
import PaymentScheduleApartment from "./Pages/Enquiry/AppartmentEnquiry/PaymentScheduleApartment/PaymentScheduleApartment";
import UpdatePaymentScheduleApartment from "./Pages/Enquiry/AppartmentEnquiry/PaymentScheduleApartment/UpdatePaymentScheduleApartment";
import RegistrationTicketApartment from "./Pages/Enquiry/AppartmentEnquiry/RegistrationTicketApartment/RegistrationTicketApartment";
import UpdateRegistrationTicketApartment from "./Pages/Enquiry/AppartmentEnquiry/RegistrationTicketApartment/UpdateRegistrationTicketApartment";
import RegistrationApartment from "./Pages/Enquiry/AppartmentEnquiry/RegistrationApartment/RegistrationApartment";
import UpdateRegistrationApartment from "./Pages/Enquiry/AppartmentEnquiry/RegistrationApartment/UpdateRegistrationApartment";
import AfterSaleApartment from "./Pages/Enquiry/AppartmentEnquiry/AfterSaleApartment/AfterSaleApartment";
import UpdateAfterSaleApartment from "./Pages/Enquiry/AppartmentEnquiry/AfterSaleApartment/UpdateAfterSaleApartment";
import PaymentScheduleAfterSale from "./Pages/AfterSale/PaymentSchedule/PaymentScheduleAfterSale";
import UpdatePaymentScheduleAsale from "./Pages/AfterSale/PaymentSchedule/UpdatePaymentScheduleAsale";
import RegistrationTicket from "./Pages/AfterSale/RegistrationTicket/RegistrationTicket";
import UpdateRegistrationTicket from "./Pages/AfterSale/RegistrationTicket/UpdateRegistrationTicket";
import RegistrationAsale from "./Pages/AfterSale/Registration/RegistrationAsale";
import UpdateRegistrationAsale from "./Pages/AfterSale/Registration/UpdateRegistrationAsale";
import AfterSale from "./Pages/AfterSale/AfterSale/AfterSale";
import UpdateAfterSale from "./Pages/AfterSale/AfterSale/UpdateAfterSale";
import ViewBookingData from "./Pages/Booking/Bookingreport/ViewBookingData";
import Gift from "./Pages/MasterPage/Gifts/Gift";
import BookingReportsAfterSale from "./Pages/AfterSale/BlockingBooking/BookingReportsAfterSale";
import BookingDetailsASale from "./Pages/AfterSale/BlockingBooking/BookingDetailsASale";
import TelecallingDocVerification from "./Pages/TeleCalling/Document Verification/TelecallingDocVerification";
import UploadDocumentsTele from "./Pages/TeleCalling/Document Verification/UploadDocumentsTele";
import WholeDocTelecalling from "./Pages/TeleCalling/Document Verification/WholeDocTelecalling";
import AdvancePaymentTele from "./Pages/TeleCalling/AdvancePaymentTele/AdvancePaymentTele";
import WholeAdvanceTele from "./Pages/TeleCalling/AdvancePaymentTele/WholeAdvanceTele";
import PriceProposalTele from "./Pages/TeleCalling/PriceProposalTele/PriceProposalTele";
import WholeProposalTele from "./Pages/TeleCalling/PriceProposalTele/WholeProposalTele";
import PaymentForLegalTele from "./Pages/TeleCalling/PaymentLegalTele/PaymentForLegalTele";
import WholePaymentForLegalTele from "./Pages/TeleCalling/PaymentLegalTele/WholePaymentForLegalTele";
import BookingTele from "./Pages/TeleCalling/Booking/BookingTele";
import WholeBookingTele from "./Pages/TeleCalling/Booking/WholeBookingTele";
import RegistrationTicketTele from "./Pages/TeleCalling/RegistrationTicketTele/RegistrationTicketTele";
import WholeRegistrationTele from "./Pages/TeleCalling/RegistrationTicketTele/WholeRegistrationTele";

// import AdBlock1 from "./Pages/CMS/Home/AdBlock1";
// import AdBlock2 from "./Pages/CMS/Home/AdBlog2";
// import AdBlock3 from "./Pages/CMS/Home/AdBlog3";
// import BannerImage from "./Pages/CMS/Home/BannerImage";
// import PromotionBanner from "./Pages/CMS/Home/PromotionBanner";
// import PromotionBanner2 from "./Pages/CMS/Home/PromotionBanner2";
// import PromotionBanner3 from "./Pages/CMS/Home/PromotionBanner3";
// import TodaysDeals from "./Pages/CMS/Home/TodaysDeals";
// import PremiumProperties from "./Pages/CMS/Home/PremiumProperties";
// import CouponCorner from "./Pages/CMS/Home/CouponCorner";
// import Footer from "./Pages/CMS/Home/Footer";
// import HighReturnsProperties from "./Pages/CMS/Home/HighReturnsProperties";
// import BannerImgService from "./Pages/CMS/Service/BannerImgService";
// import Block1 from "./Pages/CMS/Service/Block1";
// import Block2 from "./Pages/CMS/Service/Block2";
// import Block3 from "./Pages/CMS/Service/Block3";
import AdBlock1 from "./Pages/CMS/Home/AdBlock1";
import BannerImage from "./Pages/CMS/Home/BannerImage";
import AdBlock2 from "./Pages/CMS/Home/AdBlock2";
import PromotionBanner from "./Pages/CMS/Home/PromotionBanner";
import PromotionBanner2 from "./Pages/CMS/Home/PromotionBanner2";
import AdBlock3 from "./Pages/CMS/Home/AdBlock3";
import PromotionBanner3 from "./Pages/CMS/Home/PromotionBanner3";
import TodaysDeals from "./Pages/CMS/Home/TodaysDeals";
import PremiumProperties from "./Pages/CMS/Home/PremiumProperties";
import HighReturnsProperties from "./Pages/CMS/Home/HighReturnsProperties";
import CouponCorner from "./Pages/CMS/Home/CouponCorner";
import Footer from "./Pages/CMS/Home/Footer";
import BannerImgService from "./Pages/CMS/Service/ServiceHome/BannerImgService";
import Block1 from "./Pages/CMS/Service/ServiceHome/Block1";
import Block2 from "./Pages/CMS/Service/ServiceHome/Block2";
import Block3 from "./Pages/CMS/Service/ServiceHome/Block3";
import PromotionBlock from "./Pages/CMS/Service/ServiceHome/PromotionBlock";
import WhyBlock from "./Pages/CMS/Service/ServiceHome/WhyBlock";
import ServiceName from "./Pages/CMS/Service/ServiceHome/ServiceName";
import ServiceCreation from "./Pages/CMS/Service/ServiceHome/ServiceCreation";
import ServiceContent from "./Pages/CMS/Service/ServiceHome/ServiceContent";
import Faqblock from "./Pages/CMS/Service/ServiceHome/Faqblock";
import ServiceConfirmTele from "./Pages/TeleCalling/ServiceConfirmationTele/ServiceConfirmTele";
import WholeServiceConfirmTele from "./Pages/TeleCalling/ServiceConfirmationTele/WholeServiceConfirmTele";
import ServicePaymentTele from "./Pages/TeleCalling/ServicePaymentTele/ServicePaymentTele";
import WholeServicePaymentTele from "./Pages/TeleCalling/ServicePaymentTele/WholeServicePaymentTele";
import PrivacyPolicy from "./Pages/CMS/Service/ServiceSubpages/PrivacyPolicy";
import CustomerCareService from "./Pages/CMS/Service/ServiceSubpages/CustomerCareService";
import RefundPolicy from "./Pages/CMS/Service/ServiceSubpages/RefundPolicy";
import TermsCondition from "./Pages/CMS/Service/ServiceSubpages/TermsCondition";
import HowItsWork from "./Pages/CMS/Service/ServiceSubpages/HowItsWork";
import WhoWeAre from "./Pages/CMS/Service/ServiceSubpages/WhoWeAre";
import ServiceBlogs from "./Pages/CMS/Service/ServiceSubpages/ServiceBlogs";
import ContactUs from "./Pages/CMS/Home/ContactUs";
import AboutUS from "./Pages/CMS/Home/AboutUS";
import { extractMenuTree } from "./common/MenuReader";
import { BreadcrumbProvider } from "./common/BreadCrumpProvider";
import DocumentLand from "./Pages/Enquiry/DocumentVerificationLand/DocumentLand";
import WholeDocumentLand from "./Pages/Enquiry/DocumentVerificationLand/LandDocumentComponents/WholeDocumentLand";
import UpdateDocLand from "./Pages/Enquiry/DocumentVerificationLand/UpdateDocLand";

function App() {
  
  return (
    <div>
      <BreadcrumbProvider>
        <BrowserRouter basename="/goolokadmindemo">
          <Routes>
            <Route path="/" element={<PublicRoute element={Login} />} />
            <Route
              path="/*"
              element={
                <div className="app">
                  <Sidebars />
                  <main className="content">
                    <Topbar />
                    <Routes>
                      <Route
                        exact
                        path="/"
                        element={<PublicRoute element={Login} />}
                      />
                      <Route
                        path="/dashboard"
                        element={<CommonRoute element={Dashboard} />}
                      />
                      <Route
                        path="/property_type"
                        element={<PrivateRoute element={PropertyType} />}
                      />
                      <Route
                        path="/sub_property_type"
                        element={<PrivateRoute element={SubProperty} />}
                      />
                      <Route
                        path="/lawyer_docment"
                        element={<PrivateRoute element={LawyerDocument} />}
                      />
                      <Route
                        path="/lawyer_docment_input"
                        element={<PrivateRoute element={LawyerDocInput} />}
                      />
                      <Route
                        path="/property_documnent"
                        element={<PrivateRoute element={PropertyDocument} />}
                      />
                      <Route
                        path="/SRO_Details"
                        element={<PrivateRoute element={SRODetails} />}
                      />
                      <Route
                        path="/state"
                        element={<PrivateRoute element={State} />}
                      />
                      <Route
                        path="/district_city"
                        element={<PrivateRoute element={DistrictCity} />}
                      />
                      <Route
                        path="/taluk"
                        element={<PrivateRoute element={Area} />}
                      />
                      <Route
                        path="/village"
                        element={<PrivateRoute element={Village} />}
                      />
                      <Route
                        path="/pincode"
                        element={<PrivateRoute element={Pincode} />}
                      />
                      <Route
                        path="/branch"
                        element={<PrivateRoute element={Branch} />}
                      />
                      <Route
                        path="/group_type"
                        element={<PrivateRoute element={GroupType} />}
                      />
                      <Route
                        path="/unit"
                        element={<PrivateRoute element={Unit} />}
                      />
                      <Route
                        path="/advance"
                        element={<PrivateRoute element={Advance} />}
                      />
                      <Route
                        path="/pricing"
                        element={<PrivateRoute element={Pricing} />}
                      />
                      <Route
                        path="/paymentSchedule"
                        element={<PrivateRoute element={PaymentSchedule} />}
                      />
                      {/* <Route path='/features' element = {<PrivateRoute element={Features}/>} /> */}
                      <Route
                        path="/features"
                        element={<PrivateRoute element={FeaturesTag} />}
                      />
                      <Route
                        path="/tags"
                        element={<PrivateRoute element={TagsMaster} />}
                      />
                      <Route
                        path="/gift"
                        element={<PrivateRoute element={Gift} />}
                      />
                      <Route
                        path="/talukdetails"
                        element={<PrivateRoute element={TalukOfficeDetails} />}
                      />
                      <Route
                        path="/contact_person_details"
                        element={<PrivateRoute element={ContactPersonDetails} />}
                      />
                      <Route
                        path="/coupons"
                        element={<PrivateRoute element={Coupons} />}
                      />
                      <Route
                        path="/strategy"
                        element={<PrivateRoute element={Strategy} />}
                      />
                      {/* staff */}
                      <Route
                        path="/new_staff"
                        element={<PrivateRoute element={NewStaff} />}
                      />
                      <Route
                        path="/staff_report"
                        element={<PrivateRoute element={StaffReport} />}
                      />
                      <Route
                        path="/disable_staff"
                        element={<PrivateRoute element={DisableStaff} />}
                      />
                      {/* vendors */}
                      <Route
                        path="/new_vendors"
                        element={<PrivateRoute element={NewVendors} />}
                      />
                      <Route
                        path="/vendor_report"
                        element={<PrivateRoute element={VendorReport} />}
                      />
                      <Route
                        path="/disable_vendor_report"
                        element={<PrivateRoute element={DisableVendor} />}
                      />
                      {/* project */}
                      <Route
                        path="/live_property"
                        element={<PrivateRoute element={LiveProperty} />}
                      />
                      <Route
                        path="/closed_property"
                        element={<PrivateRoute element={ClosedProperty} />}
                      />
                      <Route
                        path="/cancel_property"
                        element={<PrivateRoute element={CancelProperty} />}
                      />
                      <Route
                        path="/view_all_details"
                        element={<PrivateRoute element={ViewAllDetails} />}
                      />
                      <Route
                        path="/verifyProperty/"
                        element={<PrivateRoute element={VerifyProperty} />}
                      />
                      <Route
                        path="/view_details/:eid/:landtype/:property"
                        element={<PrivateRoute element={ViewVerifyDetails} />}
                      />
                      {/* Service Project*/}
                      <Route
                        path="/verify_service_project"
                        element={<PrivateRoute element={VerifyServiceProject} />}
                      />
                      <Route
                        path="/complete_service_project"
                        element={
                          <PrivateRoute element={CompleteServiceProject} />
                        }
                      />
                      <Route
                        path="/closed_service_project"
                        element={<PrivateRoute element={ClosedServiceProject} />}
                      />
                      <Route
                        path="/service_project_details/:eid/:id/:status/:category"
                        element={<PrivateRoute element={ServiceProjectDetails} />}
                      />
                      {/* Plot */}
                      <Route
                        path="/block_management"
                        element={<PrivateRoute element={BlockManagement} />}
                      />
                      <Route
                        path="/Block"
                        element={<PrivateRoute element={Block} />}
                      />
                      <Route
                        path="/area_managements"
                        element={<PrivateRoute element={AreaManagement} />}
                      />
                      <Route
                        path="/cancel_plot"
                        element={<PrivateRoute element={CancelPlot} />}
                      />
                      <Route
                        path="/wallet"
                        element={<PrivateRoute element={Wallet} />}
                      />
                      {/* ///  */}
                      <Route
                        path="/plot_cancellation"
                        element={<PrivateRoute element={PlotCancellation} />}
                      />
                      <Route
                        path="/refund_amount_approve"
                        element={<PrivateRoute element={RefundAmountApprove} />}
                      />
                      <Route
                        path="/cancel_plot_refund_approval"
                        element={
                          <PrivateRoute element={CancelPlotRefundApprovel} />
                        }
                      />
                      <Route
                        path="/refund_cash_issue"
                        element={<PrivateRoute element={RefundCashIssue} />}
                      />
                      <Route
                        path="/refund_cheque_issue"
                        element={<PrivateRoute element={RefundChequeIssue} />}
                      />
                      <Route
                        path="/plot_rebooking"
                        element={<PrivateRoute element={PlotReBooking} />}
                      />
                      <Route
                        path="/edit_plot"
                        element={<PrivateRoute element={EditPlotSqFt} />}
                      />
                      {/* Property Management */}
                      {/* land */}
                      <Route
                        path="/land_new_property"
                        element={<PrivateRoute element={LandnewProperty} />}
                      />
                      <Route
                        path="/land_pending_property"
                        element={<PrivateRoute element={LandPendingProperty} />}
                      />
                      <Route
                        path="/land_pending_property_view"
                        element={<PrivateRoute element={LandNewPropertyView} />}
                      />
                      <Route
                        path="/land_pending_property_edit"
                        element={<PrivateRoute element={LandNewPropertyEdit} />}
                      />
                      <Route
                        path="/land_field_survey_report"
                        element={<CommonRoute element={LandFieldSurveyReport} />}
                      />
                      <Route
                        path="/land_field_survey_department"
                        element={
                          <CommonRoute element={LandFieldSurveyDepartment} />
                        }
                      />
                      <Route
                        path="/Land_owner_Agreement_Report"
                        element={<CommonRoute element={LandOwnerReport} />}
                      />
                      <Route
                        path="/Land_owner_Agreement"
                        element={<CommonRoute element={LandOwner} />}
                      />
                      <Route
                        path="/land_admin_department"
                        element={<CommonRoute element={LandAdminDepartment} />}
                      />
                      <Route
                        path="/land_admin_department_report"
                        element={
                          <CommonRoute element={LandAdminDepartmentReport} />
                        }
                      />
                      <Route
                        path="/land_media_department"
                        element={<CommonRoute element={LandMediaDepartment} />}
                      />
                      <Route
                        path="/land_media_department_report"
                        element={
                          <CommonRoute element={LandMediaDepartmentReport} />
                        }
                      />
                      <Route
                        path="/land_Awaiting_Confirmation"
                        element={
                          <PrivateRoute element={LandAwaitingConfirmation} />
                        }
                      />
                      {/* layout  */}
                      <Route
                        path="/layout_new_property"
                        element={<PrivateRoute element={LayoutNewProperty} />}
                      />
                      <Route
                        path="/layout_pending_property"
                        element={<PrivateRoute element={LayoutPendingProperty} />}
                      />
                      <Route
                        path="/layout_pending_property_view"
                        element={
                          <PrivateRoute element={LayoutPendingPropertyView} />
                        }
                      />
                      <Route
                        path="/layout_pending_property_edit"
                        element={
                          <PrivateRoute element={LayoutPendingPropertyEdit} />
                        }
                      />
                      <Route
                        path="/layout_field_survey_report"
                        element={
                          <CommonRoute element={LayoutFieldSurveyReport} />
                        }
                      />
                      <Route
                        path="/layout_field_survey_department"
                        element={
                          <CommonRoute element={LayoutFieldSurveyDepartment} />
                        }
                      />
                      <Route
                        path="/layout_owner_Agreement_Report"
                        element={<CommonRoute element={LayoutOwnerReport} />}
                      />
                      <Route
                        path="/layout_owner_Agreement"
                        element={<CommonRoute element={LayoutOwner} />}
                      />
                      <Route
                        path="/layout_admin_department"
                        element={<CommonRoute element={LayoutAdminDepartment} />}
                      />
                      <Route
                        path="/layout_admin_department_report"
                        element={
                          <CommonRoute element={LayoutAdminDepartmentReport} />
                        }
                      />
                      <Route
                        path="/layout_media_department"
                        element={<CommonRoute element={LayoutMediaDepartment} />}
                      />
                      <Route
                        path="/layout_media_department_report"
                        element={
                          <CommonRoute element={LayoutMediaDepartmentReport} />
                        }
                      />
                      <Route
                        path="/layout_Awaiting_Confirmation"
                        element={
                          <PrivateRoute element={LayoutAwaitingConfirmation} />
                        }
                      />
                      {/* Apartment  */}
                      <Route
                        path="/apartment_new_property"
                        element={<PrivateRoute element={ApartmentNewProperty} />}
                      />
                      <Route
                        path="/apartment_pending_property"
                        element={
                          <PrivateRoute element={ApartmentPendingProperty} />
                        }
                      />
                      <Route
                        path="/apartment_field_survey_report"
                        element={
                          <PrivateRoute element={ApartmentFieldSurveyReport} />
                        }
                      />
                      <Route
                        path="/apartment_field_survey_department"
                        element={
                          <PrivateRoute
                            element={ApartmentFieldSurveyDepartment}
                          />
                        }
                      />
                      <Route
                        path="/apartment_owner_Agreement_Report"
                        element={<PrivateRoute element={ApartmentOwnerReport} />}
                      />
                      <Route
                        path="/apartment_owner_Agreement"
                        element={<PrivateRoute element={ApartmentOwner} />}
                      />
                      <Route
                        path="/apartment_admin_department"
                        element={
                          <PrivateRoute element={ApartmentAdminDepartment} />
                        }
                      />
                      <Route
                        path="/apartment_admin_department_report"
                        element={
                          <PrivateRoute
                            element={ApartmentAdminDepartmentReport}
                          />
                        }
                      />
                      <Route
                        path="/apartment_media_department"
                        element={
                          <PrivateRoute element={ApartmentMediaDepartment} />
                        }
                      />
                      <Route
                        path="/apartment_media_department_report"
                        element={
                          <PrivateRoute
                            element={ApartmentMediaDepartmentReport}
                          />
                        }
                      />
                      <Route
                        path="/apartment_Content_writing_department"
                        element={
                          <PrivateRoute
                            element={ApartmentContentWritingDepartment}
                          />
                        }
                      />
                      <Route
                        path="/apartment_Content_writing_report"
                        element={
                          <PrivateRoute
                            element={ApartmentContentDepartmentReport}
                          />
                        }
                      />
                      <Route
                        path="/apartment_Awaiting_Confirmation"
                        element={
                          <PrivateRoute element={ApartmentAwaitingConfirmation} />
                        }
                      />
                      {/* villa  */}
                      <Route
                        path="/villa_new_property"
                        element={<PrivateRoute element={VillaNewProperty} />}
                      />
                      <Route
                        path="/villa_pending_property"
                        element={<PrivateRoute element={VillaPendingProperty} />}
                      />
                      <Route
                        path="/villa_field_survey_report"
                        element={
                          <PrivateRoute element={VillaFieldSurveyReport} />
                        }
                      />
                      <Route
                        path="/villa_field_survey_department"
                        element={
                          <PrivateRoute element={VillaFieldSurveyDepartment} />
                        }
                      />
                      <Route
                        path="/villa_owner_Agreement_Report"
                        element={<PrivateRoute element={VillaOwnerReport} />}
                      />
                      <Route
                        path="/villa_owner_Agreement"
                        element={<PrivateRoute element={VillaOwner} />}
                      />
                      <Route
                        path="/villa_admin_department"
                        element={<PrivateRoute element={VillaAdminDepartment} />}
                      />
                      <Route
                        path="/villa_admin_department_report"
                        element={
                          <PrivateRoute element={VillaAdminDepartmentReport} />
                        }
                      />
                      <Route
                        path="/villa_media_department"
                        element={<PrivateRoute element={VillaMediaDepartment} />}
                      />
                      <Route
                        path="/villa_media_department_report"
                        element={
                          <PrivateRoute element={VillaMediaDepartmentReport} />
                        }
                      />
                      <Route
                        path="/villa_Content_writing_department"
                        element={
                          <PrivateRoute element={VillaContentWritingDepartment} />
                        }
                      />
                      <Route
                        path="/villa_Content_writing_report"
                        element={
                          <PrivateRoute element={VillaContentDepartmentReport} />
                        }
                      />
                      <Route
                        path="/villa_Awaiting_Confirmation"
                        element={
                          <PrivateRoute element={VillaAwaitingConfirmation} />
                        }
                      />
                      {/* house */}
                      <Route
                        path="/house_new_property"
                        element={<PrivateRoute element={HouseNewProperty} />}
                      />
                      <Route
                        path="/house_pending_property"
                        element={<PrivateRoute element={HousePendingProperty} />}
                      />
                      <Route
                        path="/house_field_survey_report"
                        element={
                          <PrivateRoute element={HouseFieldSurveyReport} />
                        }
                      />
                      <Route
                        path="/house_field_survey_department"
                        element={
                          <PrivateRoute element={HouseFieldSurveyDepartment} />
                        }
                      />
                      <Route
                        path="/house_owner_Agreement_Report"
                        element={<PrivateRoute element={HouseOwnerReport} />}
                      />
                      <Route
                        path="/house_owner_Agreement"
                        element={<PrivateRoute element={HouseOwner} />}
                      />
                      <Route
                        path="/house_admin_department"
                        element={<PrivateRoute element={HouseAdminDepartment} />}
                      />
                      <Route
                        path="/house_admin_department_report"
                        element={
                          <PrivateRoute element={HouseAdminDepartmentReport} />
                        }
                      />
                      <Route
                        path="/house_media_department"
                        element={<PrivateRoute element={HouseMediaDepartment} />}
                      />
                      <Route
                        path="/house_media_department_report"
                        element={
                          <PrivateRoute element={HouseMediaDepartmentReport} />
                        }
                      />
                      <Route
                        path="/house_Content_writing_department"
                        element={
                          <PrivateRoute element={HouseContentWritingDepartment} />
                        }
                      />
                      <Route
                        path="/house_Content_writing_report"
                        element={
                          <PrivateRoute element={HouseContentDepartmentReport} />
                        }
                      />
                      <Route
                        path="/house_Awaiting_Confirmation"
                        element={
                          <PrivateRoute element={HouseAwaitingConfirmation} />
                        }
                      />
                      {/* Farm House  */}
                      <Route
                        path="/farm_house_new_property"
                        element={<PrivateRoute element={FarmHouseNewProperty} />}
                      />
                      <Route
                        path="/farm_house_pending_property"
                        element={
                          <PrivateRoute element={FarmHousePendingProperty} />
                        }
                      />
                      <Route
                        path="/farm_field_survey_report"
                        element={
                          <PrivateRoute element={FarmHouseFieldSurveyReport} />
                        }
                      />
                      <Route
                        path="/farm_field_survey_department"
                        element={
                          <PrivateRoute
                            element={FarmHouseFieldSurveyDepartment}
                          />
                        }
                      />
                      <Route
                        path="/farm_house_owner_Agreement_Report"
                        element={<PrivateRoute element={FarmHouseOwnerReport} />}
                      />
                      <Route
                        path="/farm_house_owner_Agreement"
                        element={<PrivateRoute element={FarmHouseOwner} />}
                      />
                      <Route
                        path="/farm_house_admin_department"
                        element={
                          <PrivateRoute element={FarmHouseAdminDepartment} />
                        }
                      />
                      <Route
                        path="/farm_house_admin_department_report"
                        element={
                          <PrivateRoute
                            element={FarmHouseAdminDepartmentReport}
                          />
                        }
                      />
                      <Route
                        path="/farm_house_media_department"
                        element={
                          <PrivateRoute element={FarmHouseMediaDepartment} />
                        }
                      />
                      <Route
                        path="/farm_house_media_department_report"
                        element={
                          <PrivateRoute
                            element={FarmHouseMediaDepartmentReport}
                          />
                        }
                      />
                      <Route
                        path="/farm_house_Content_writing_department"
                        element={
                          <PrivateRoute
                            element={FarmHouseContentWritingDepartment}
                          />
                        }
                      />
                      <Route
                        path="/farm_house_Content_writing_report"
                        element={
                          <PrivateRoute
                            element={FarmHouseContentDepartmentReport}
                          />
                        }
                      />
                      <Route
                        path="/farm_house_Awaiting_Confirmation"
                        element={
                          <PrivateRoute element={FarmHouseAwaitingConfirmation} />
                        }
                      />
                      {/* <Route path="/View_Pending_Property" element={<PrivateRoute element={ViewPendingProperty} />} /> */}
                      {/* Enquiry  */}
                      {/*Land Enquiry */}
                      {/* <Route path="/new_enquiry" element={<CommonRoute element={NewEnquiry} />} /> */}
                      {/* <Route
                        path="/document_verification"
                        element={<CommonRoute element={DocumentVerification} />}
                      />
                      <Route
                        path="/file_uploads/:eid/:id/:status"
                        element={<CommonRoute element={DocumentFileUploads} />}
                      />
                      <Route
                        path="/document_verification_completed/:eid/:id/:status"
                        element={
                          <CommonRoute element={DocumentVerificationCompleted} />
                        }
                      /> */}
                        <Route
                        path="/document_verification"
                        element={<CommonRoute element={DocumentLand} />}
                      />
                      <Route
                        path="/document_verification/:eid/:id/:status"
                        element={<CommonRoute element={UpdateDocLand} />}
                      />
                      {/* invoice  */}
                      <Route
                        path="/invoice_verification"
                        element={<CommonRoute element={InvoiceVerification} />}
                      />
                      <Route
                        path="/invoice_report/:eid/:status"
                        element={<CommonRoute element={InvoiceReport} />}
                      />
                      {/* location mapping */}
                      <Route
                        path="/location_verification"
                        element={<CommonRoute element={LocationVerification} />}
                      />
                      <Route
                        path="/location_mapping/:eid/:locationid/:status"
                        element={<CommonRoute element={LocationMappingUpdate} />}
                      />
                      {/* MarketResearch */}
                      <Route
                        path="/market_research_verification"
                        element={
                          <CommonRoute element={MarketResearchVerification} />
                        }
                      />
                      <Route
                        path="/market_research_add/:eid/:marketid/:status"
                        element={<CommonRoute element={MarketResearchUpdate} />}
                      />
                      {/* Price proposal agreement */}
                      <Route
                        path="/price_proposal_agreement_report"
                        element={
                          <CommonRoute element={PriceProposalAgreementReport} />
                        }
                      />
                      <Route
                        path="/price_proposal_agreement/:eid/:id/:status"
                        element={
                          <CommonRoute element={PriceProposalAgreementUpdate} />
                        }
                      />
                      {/* Payment for Legal opinion and Field survey */}
                      <Route
                        path="/payment_legal_opinion_report"
                        element={<CommonRoute element={PaymenLegalReport} />}
                      />
                      <Route
                        path="/payment_legal_opinion/:eid/:id/:status"
                        element={
                          <CommonRoute element={PaymenLegalReportUpdate} />
                        }
                      />
                      {/* Lawyer Documents */}
                      <Route
                        path="/lawyer_documents"
                        element={<CommonRoute element={LawyerDocumentsReport} />}
                      />
                      <Route
                        path="/lawyer_documents_upload/:eid/:id/:status"
                        element={<CommonRoute element={LawyerDocumentsUpdate} />}
                      />
                      {/* Mandatory Document */}
                      <Route
                        path="/mandatory_docs"
                        element={
                          <CommonRoute element={MandatoryDocumentReport} />
                        }
                      />
                      <Route
                        path="/mandatory_docs_update/:eid/:sid/:status/:landtype"
                        element={
                          <CommonRoute element={MandatoryDocumentUpdate} />
                        }
                      />
                      {/* field survey  */}
                      <Route
                        path="/enq_fieldsurvey"
                        element={<CommonRoute element={FieldSurveyReport} />}
                      />
                      <Route
                        path="/enq_fieldsurvey/:eid/:sid/:status/:landtype"
                        element={<CommonRoute element={FieldSurveyUpdate} />}
                      />
                      {/* Land Owner Agreement */}
                      <Route
                        path="/land_owner_report"
                        element={
                          <CommonRoute element={LandOwnerAgreementReport} />
                        }
                      />
                      <Route
                        path="/land_owner_update/:eid/:sid/:status/:landtype"
                        element={
                          <CommonRoute element={LandOwnerAgreementUpdate} />
                        }
                      />
                      {/*Pricing Department */}
                      <Route
                        path="/PricingDepartment"
                        element={<CommonRoute element={PricingDepartment} />}
                      />
                      <Route
                        path="/PricingDepartment/:eid/:id/:status/:landtype"
                        element={<CommonRoute element={PricingDeptUpdate} />}
                      />
                      {/*Media Department */}
                      <Route
                        path="/mediaDepartment"
                        element={<CommonRoute element={MediaDepartment} />}
                      />
                      <Route
                        path="/mediaDepartment/:eid/:id/:status/:landtype"
                        element={<CommonRoute element={MediaDeptUpdate} />}
                      />
                      {/*contentWriting */}
                      <Route
                        path="/contentWriting"
                        element={<CommonRoute element={ContentWriting} />}
                      />
                      <Route
                        path="/contentWriting/:eid/:id/:status/:landtype"
                        element={<CommonRoute element={ContentWritingUpdate} />}
                      />
                      {/*Blocking and booking */}
                      <Route
                        path="/blocking"
                        element={<CommonRoute element={BlockingBookingLand} />}
                      />
                      {/*Payment Schedule   */}
                      <Route
                        path="/payment_schedule"
                        element={<CommonRoute element={PaymentScheduleLand} />}
                      />
                      <Route
                        path="/payment_schedule/:eid/:id/:status/:booking_id/:booking_no"
                        element={
                          <CommonRoute element={UpdatePaymentScheduleLand} />
                        }
                      />
                      {/*Registration Ticket    */}
                      <Route
                        path="/registeration_ticket"
                        element={<CommonRoute element={RegistrationTicketLand} />}
                      />
                      <Route
                        path="/registeration_ticket/:eid/:id/:status/:booking_id/:shortform/:booking_no"
                        element={
                          <CommonRoute element={UpdateRegistrationTicketLand} />
                        }
                      />
                      {/*Registration     */}
                      <Route
                        path="/registeration"
                        element={<CommonRoute element={RegistrationLand} />}
                      />
                      <Route
                        path="/registeration/:eid/:id/:status/:booking_id/:booking_no/:pagetype"
                        element={<CommonRoute element={UpdateRegistrationLand} />}
                      />
                      {/* After Sale */}
                      <Route
                        path="/after_sale_land"
                        element={<CommonRoute element={AfterSaleLand} />}
                      />
                      <Route
                        path="/after_sale_land/:eid/:id/:status/:booking_id/:booking_no"
                        element={<CommonRoute element={UpdateAfterSaleLand} />}
                      />
                      {/*Apartment Enquiry */}
                      {/*Apart Document Verification */}
                      <Route
                        path="/apart_document_verification"
                        element={
                          <CommonRoute element={ApartDocumentVerification} />
                        }
                      />
                      {/* <Route
                      path="/apart_document_verification/:eid/:id/:status"
                      element={
                        <CommonRoute
                          element={ApartDocumentVerificationUpdate}
                        />
                      }
                    /> */}
                      <Route
                        path="/updateDocApart/:eid/:id/:status"
                        element={<CommonRoute element={UpdateDocApart} />}
                      />
                      {/*Apart invoice Verification */}
                      <Route
                        path="/apart_invoice_verification"
                        element={
                          <CommonRoute element={InvoiceVerificationApart} />
                        }
                      />
                      <Route
                        path="/apart_invoice_verification/:eid/:id/:status"
                        element={
                          <CommonRoute element={UpdateInvoiceVerificationApart} />
                        }
                      />
                      {/*Apart Location Verification */}
                      <Route
                        path="/apart_location_verification"
                        element={
                          <CommonRoute element={LocationVerificationAprt} />
                        }
                      />
                      <Route
                        path="/apart_location_verification/:eid/:id/:status"
                        element={<CommonRoute element={UpdateLocationApart} />}
                      />
                      {/*Apart Market Research Verification */}
                      <Route
                        path="/apart_MarketResearch_verification"
                        element={
                          <CommonRoute
                            element={MarketResearchVerificationApart}
                          />
                        }
                      />
                      <Route
                        path="/apart_MarketResearch_verification/:eid/:id/:status"
                        element={
                          <CommonRoute element={UpdateMarketResearchApart} />
                        }
                      />
                      {/*Apart Price Proposal */}
                      <Route
                        path="/apart_price_proposal"
                        element={<CommonRoute element={PriceProposalApart} />}
                      />
                      <Route
                        path="/apart_price_proposal/:eid/:id/:status"
                        element={<CommonRoute element={UpdateProposalApart} />}
                      />
                      {/*Apart Payment Legal Opinion */}
                      <Route
                        path="/apart_payment_legal_opinion"
                        element={
                          <CommonRoute element={PaymentLegalOpinionApart} />
                        }
                      />
                      <Route
                        path="/apart_payment_legal_opinion/:eid/:id/:status"
                        element={<CommonRoute element={UpdateLegalApart} />}
                      />
                      {/*Apart Lawyer Documents */}
                      <Route
                        path="/apart_lawyer_documents"
                        element={<CommonRoute element={LawyerDocumentApart} />}
                      />
                      <Route
                        path="/apart_lawyer_documents/:eid/:id/:status"
                        element={<CommonRoute element={UpdateLawyerApart} />}
                      />
                      {/*Apart Mandadory Docs */}
                      <Route
                        path="/apart_mandatory_docs"
                        element={<CommonRoute element={MandadoryDocsApart} />}
                      />
                      <Route
                        path="/apart_mandatory_docs/:eid/:id/:status"
                        element={<CommonRoute element={UpdateMandatoryApart} />}
                      />
                      {/*Apart Field Survey */}
                      <Route
                        path="/apart_field_survey"
                        element={<CommonRoute element={FieldSurveyApart} />}
                      />
                      <Route
                        path="/apart_field_survey/:eid/:id/:status"
                        element={<CommonRoute element={UpdateSurveyApart} />}
                      />
                      {/*Apart Land owner Agreement */}
                      <Route
                        path="/apart_land_owner_agreement"
                        element={
                          <CommonRoute element={LandOwnerAgreementApart} />
                        }
                      />
                      <Route
                        path="/apart_land_owner_agreement/:eid/:id/:status"
                        element={<CommonRoute element={UpdateLandOwnerApart} />}
                      />
                      {/*Apart pricing Department */}
                      <Route
                        path="/apart_pricing_department"
                        element={<CommonRoute element={PricingDepartmentApart} />}
                      />
                      <Route
                        path="/apart_pricing_department/:eid/:id/:status"
                        element={<CommonRoute element={UpdatePricingDptApart} />}
                      />
                      {/*Apart Media Department */}
                      <Route
                        path="/apart_media_department"
                        element={<CommonRoute element={MediaDepartmentApart} />}
                      />
                      <Route
                        path="/apart_media_department/:eid/:id/:status"
                        element={<CommonRoute element={UpdateMediaApart} />}
                      />
                      {/*Apart Content Writing */}
                      <Route
                        path="/apart_content_Writing"
                        element={<CommonRoute element={ContentWritingApart} />}
                      />
                      <Route
                        path="/apart_content_Writing/:eid/:id/:status"
                        element={<CommonRoute element={UpdateContentWriting} />}
                      />
                      {/* Apart  Blocking and booking */}
                      <Route
                        path="/blockingApartment"
                        element={
                          <CommonRoute element={BlockingBookingApartments} />
                        }
                      />
                      {/*Apart  Payment Schedule   */}
                      <Route
                        path="/paymentschedule_apartment"
                        element={
                          <CommonRoute element={PaymentScheduleApartment} />
                        }
                      />
                      <Route
                        path="/paymentschedule_apartment/:eid/:id/:status/:booking_id/:booking_no"
                        element={
                          <CommonRoute element={UpdatePaymentScheduleApartment} />
                        }
                      />
                      {/* Apart Registration Ticket    */}
                      <Route
                        path="/registerationticket_apartment"
                        element={
                          <CommonRoute element={RegistrationTicketApartment} />
                        }
                      />
                      <Route
                        path="/registerationticket_apartment/:eid/:id/:status/:booking_id/:shortform/:booking_no"
                        element={
                          <CommonRoute
                            element={UpdateRegistrationTicketApartment}
                          />
                        }
                      />
                      {/* Apart Registration     */}
                      <Route
                        path="/registeration_apartment"
                        element={<CommonRoute element={RegistrationApartment} />}
                      />
                      <Route
                        path="/registeration_apartment/:eid/:id/:status/:booking_id/:booking_no/:pagetype"
                        element={
                          <CommonRoute element={UpdateRegistrationApartment} />
                        }
                      />
                      {/*Apart After Sale */}
                      <Route
                        path="/aftersale_apartment"
                        element={<CommonRoute element={AfterSaleApartment} />}
                      />
                      <Route
                        path="/aftersale_apartment/:eid/:id/:status/:booking_id/:booking_no"
                        element={
                          <CommonRoute element={UpdateAfterSaleApartment} />
                        }
                      />
                      {/* TeleCalling  */}
                      <Route
                        path="/tel_call_enquiry_report"
                        element={
                          <StaffOnlyRoute element={TelleCallEnquiryReport} />
                        }
                      />
                      <Route
                        path="/enquiry_notifications/:eid"
                        element={<StaffOnlyRoute element={EnquiryNotification} />}
                      />
                      <Route
                        path="/document_notification/:eid"
                        element={
                          <StaffOnlyRoute element={DocumentNotification} />
                        }
                      />
                      <Route
                        path="/invoice_notification"
                        element={<StaffOnlyRoute element={InvoiceNotification} />}
                      />
                      <Route
                        path="/location_mapping_notification"
                        element={
                          <StaffOnlyRoute element={LocationMappingNotification} />
                        }
                      />
                      <Route
                        path="/market_research_notification"
                        element={
                          <StaffOnlyRoute element={MarketResearchNotification} />
                        }
                      />
                      {/* CRM */}
                      <Route
                        path="/enquiry"
                        element={<PrivateRoute element={Enquiry} />}
                      />
                      <Route
                        path="/enquiry_funnel"
                        element={<PrivateRoute element={EnquiryFunnel} />}
                      />
                      <Route
                        path="/calendar"
                        element={<PrivateRoute element={Calendar} />}
                      />
                      <Route
                        path="/success"
                        element={<PrivateRoute element={Success} />}
                      />
                      <Route
                        path="/dropped"
                        element={<PrivateRoute element={Dropped} />}
                      />
                      {/* Customer */}
                      <Route
                        path="/Customer"
                        element={<PrivateRoute element={Customer} />}
                      />
                      <Route
                        path="/Customer_data_edit&view/:id"
                        element={
                          <PrivateRoute element={CustomerDataEditAndView} />
                        }
                      />
                      <Route
                        path="/CustomerReport"
                        element={<PrivateRoute element={CustomerReport} />}
                      />
                      {/* Account */}
                      <Route
                        path="/success_payment"
                        element={<PrivateRoute element={SuccessPayment} />}
                      />
                      <Route
                        path="/failure_payment"
                        element={<PrivateRoute element={FailurePayment} />}
                      />
                      <Route
                        path="/receipt"
                        element={<PrivateRoute element={Receipt} />}
                      />
                      <Route
                        path="/credit_notes"
                        element={<PrivateRoute element={CreditNotes} />}
                      />
                      <Route
                        path="/debit_notes"
                        element={<PrivateRoute element={DebitNotes} />}
                      />
                      <Route
                        path="/payments"
                        element={<PrivateRoute element={Payments} />}
                      />
                      {/* Payments */}
                      <Route
                        path="/pending_payment"
                        element={<PrivateRoute element={PendingPayment} />}
                      />
                      <Route
                        path="/fully_paid"
                        element={<PrivateRoute element={FullyPaid} />}
                      />
                      <Route
                        path="/cancel_payment"
                        element={<PrivateRoute element={CancelPayment} />}
                      />
                      {/* /// */}
                      <Route
                        path="/failed_payments"
                        element={<PrivateRoute element={FailedPayments} />}
                      />
                      <Route
                        path="/cancel_payments"
                        element={<PrivateRoute element={CancelPayments} />}
                      />
                      <Route
                        path="/ledger"
                        element={<PrivateRoute element={Ledger} />}
                      />
                      <Route
                        path="/daybook"
                        element={<PrivateRoute element={DayBook} />}
                      />
                      <Route
                        path="/cashbook"
                        element={<PrivateRoute element={CashBook} />}
                      />
                      <Route
                        path="/bankbook"
                        element={<PrivateRoute element={BankBook} />}
                      />
                      <Route
                        path="/manual_payments"
                        element={<PrivateRoute element={ManualPayments} />}
                      />
                      {/* Billing */}
                      <Route
                        path="/ServiceInvoice"
                        element={<PrivateRoute element={ServiceInvoice} />}
                      />
                      <Route
                        path="/PendingInvoice"
                        element={<PrivateRoute element={PendingInvoice} />}
                      />
                      <Route
                        path="/SuccessInvoice"
                        element={<PrivateRoute element={SuccessInvoice} />}
                      />
                      <Route
                        path="/Category"
                        element={<PrivateRoute element={Category} />}
                      />
                      <Route
                        path="/SubCategory"
                        element={<PrivateRoute element={SubCategory} />}
                      />
                      {/* Help Desk */}
                      <Route
                        path="/create_ticket"
                        element={<PrivateRoute element={TicketCreate} />}
                      />
                      <Route
                        path="/recent_ticket"
                        element={<PrivateRoute element={RecentTicket} />}
                      />
                      <Route
                        path="/total_ticket"
                        element={<PrivateRoute element={TotalTicket} />}
                      />
                      <Route
                        path="/active_ticket"
                        element={<PrivateRoute element={ActiveTickets} />}
                      />
                      <Route
                        path="/closed_ticket"
                        element={<PrivateRoute element={ClosedTickets} />}
                      />
                      <Route
                        path="/hold_ticket"
                        element={<PrivateRoute element={Hold} />}
                      />
                      <Route
                        path="/overdue_ticket"
                        element={<PrivateRoute element={OverDue} />}
                      />
                      <Route
                        path="/assigned_ticket"
                        element={<PrivateRoute element={AssignedTickets} />}
                      />
                      <Route
                        path="/View_tickets"
                        element={<PrivateRoute element={View} />}
                      />
                      {/* Amenities */}
                      <Route
                        path="/sub_amenitiescreate"
                        element={<PrivateRoute element={subCategoryAmenities} />}
                      />
                      <Route
                        path="/amenities_creation"
                        element={<PrivateRoute element={Amenities} />}
                      />
                      <Route
                        path="/notification"
                        element={<PrivateRoute element={Notification} />}
                      />
                      <Route
                        path="/file_view"
                        element={<PrivateRoute element={FileView} />}
                      />
                      {/* internet Error  */}
                      <Route
                        path="/internet_issue"
                        element={<PrivateRoute element={InternetError} />}
                      />
                      <Route
                        path="/Testing1"
                        element={<PrivateRoute element={Testing1} />}
                      />
                      {/*Service land */}
                      {/*Document */}
                      <Route
                        path="/service_document"
                        element={<CommonRoute element={DocumentService} />}
                      />
                      <Route
                        path="/document_set/:eid/:id/:status"
                        element={<CommonRoute element={DocumentSet} />}
                      />
                      <Route
                        path="/update_document/:eid/:id/:status"
                        element={<CommonRoute element={UpdateServiceDocument} />}
                      />
                      {/*Location */}
                      <Route
                        path="/location_service"
                        element={<CommonRoute element={LocationService} />}
                      />
                      <Route
                        path="/update_location/:eid/:locationid/:status"
                        element={<CommonRoute element={UpdateLocationService} />}
                      />
                      {/*Confirm Service */}
                      <Route
                        path="/cofirm_service"
                        element={<CommonRoute element={ServiceConfirm} />}
                      />
                      <Route
                        path="/update_confirm/:eid/:id/:status"
                        element={<CommonRoute element={UpdateConfirmService} />}
                      />
                      {/*invoice Service */}
                      <Route
                        path="/invoice_service"
                        element={<CommonRoute element={InvoiceService} />}
                      />
                      <Route
                        path="/update_invoice/:eid/:id/:status"
                        element={<CommonRoute element={UpdateInvoiceService} />}
                      />
                      {/*Patta Application */}
                      <Route
                        path="/patta_appalication"
                        element={<CommonRoute element={PattaApplication} />}
                      />
                      <Route
                        path="/update_application/:eid/:id/:status"
                        element={<CommonRoute element={UpdatepattaApplication} />}
                      />
                      {/*Ticket Assigning Hub */}
                      <Route
                        path="/tickethub"
                        element={<CommonRoute element={TikcetHub} />}
                      />
                      <Route
                        path="/document_set_hub/:eid/:id/:status"
                        element={<CommonRoute element={DocumentSetHub} />}
                      />
                      <Route
                        path="/updatehub/:eid/:id/:status"
                        element={<CommonRoute element={UpdateHub} />}
                      />
                      {/**find your property Google map location */}
                      {/*Document */}
                      <Route
                        path="/documentmap"
                        element={<CommonRoute element={DocumentMap} />}
                      />
                      <Route
                        path="/Documentsetgooglemap/:eid/:id/:status"
                        element={<CommonRoute element={DocumentSetGoogleMap} />}
                      />
                      <Route
                        path="/update_document_google/:eid/:id/:status"
                        element={
                          <CommonRoute element={UpdateDocumentGoogleMap} />
                        }
                      />
                      {/*Location google maping */}
                      <Route
                        path="/locationmap"
                        element={<CommonRoute element={LocationMap} />}
                      />
                      <Route
                        path="/update_location_map/:eid/:locationid/:status"
                        element={<CommonRoute element={UpdateLocationMap} />}
                      />
                      {/**find your property Google map location */}
                      {/*Document */}
                      <Route
                        path="/documentlegalopinion"
                        element={
                          <CommonRoute element={DocumentLegalVerifcation} />
                        }
                      />
                      <Route
                        path="/documentsetlegal/:eid/:id/:status"
                        element={<CommonRoute element={DocumentSetLegal} />}
                      />
                      <Route
                        path="/updatelegaldoc/:eid/:id/:status"
                        element={<CommonRoute element={UpdateLegalDoc} />}
                      />
                      {/*Location Legal*/}
                      <Route
                        path="/location_legal"
                        element={
                          <CommonRoute element={LocationVerificationLegal} />
                        }
                      />
                      <Route
                        path="/update_location_legal/:eid/:locationid/:status"
                        element={<CommonRoute element={UpdateLocLegal} />}
                      />
                      {/* Service Confirm legal*/}
                      <Route
                        path="/cofirm_service_legal"
                        element={<CommonRoute element={ServiceConfirmLegal} />}
                      />
                      <Route
                        path="/update_confirm_legal/:eid/:id/:status"
                        element={
                          <CommonRoute element={UpdateConfirmServiceLegal} />
                        }
                      />
                      {/*paymentlegal  */}
                      <Route
                        path="/payment_legal_opinion"
                        element={<CommonRoute element={PaymentLegalOp} />}
                      />
                      <Route
                        path="/update_payment_legal/:eid/:id/:status"
                        element={<CommonRoute element={UpdateLegalOpinion} />}
                      />
                      {/*legal lawyer  */}
                      <Route
                        path="/legalopinionlawyer"
                        element={<CommonRoute element={LegalOpinionByLawyer} />}
                      />
                      <Route
                        path="/legal_opinion_lawyer_update/:eid/:id/:status"
                        element={<CommonRoute element={UpdateOpinionByLawyer} />}
                      />
                      {/*Land Survey */}
                      {/*Document */}
                      <Route
                        path="/documentlandsurvey"
                        element={<CommonRoute element={DocumentLandSurvey} />}
                      />
                      <Route
                        path="/updatedocsurvey/:eid/:id/:status"
                        element={<CommonRoute element={UpdateDocumentSurvey} />}
                      />
                      <Route
                        path="/documentsetsurvey/:eid/:id/:status"
                        element={<CommonRoute element={DocumentSetSurvey} />}
                      />
                      {/*Location Survey */}
                      <Route
                        path="/location_survey"
                        element={<CommonRoute element={LocationSurvey} />}
                      />
                      <Route
                        path="/update_location_survey/:eid/:locationid/:status"
                        element={<CommonRoute element={UpdateLocSurvey} />}
                      />
                      {/*Confirm Service */}
                      <Route
                        path="/service_confirm_survey"
                        element={<CommonRoute element={ServiceConfirmSurvey} />}
                      />
                      <Route
                        path="/update_confirm_survey/:eid/:id/:status"
                        element={<CommonRoute element={UpdateConfirmSurvey} />}
                      />
                      {/*invoice Service */}
                      <Route
                        path="/invoice_survey"
                        element={<CommonRoute element={InvoiceSurvey} />}
                      />
                      <Route
                        path="/update_invoice_survey/:eid/:id/:status"
                        element={<CommonRoute element={UpdateInvoiceSurvey} />}
                      />
                      {/* Application */}
                      <Route
                        path="/application_survey"
                        element={<CommonRoute element={ApplicationSurvey} />}
                      />
                      <Route
                        path="/update_application_survey/:eid/:id/:status"
                        element={
                          <CommonRoute element={UpdateApplicationSurvey} />
                        }
                      />
                      {/* Application */}
                      <Route
                        path="/mandadory_survey"
                        element={<CommonRoute element={MandadorySurvey} />}
                      />
                      <Route
                        path="/update_mandadory_survey/:eid/:id/:status"
                        element={<CommonRoute element={UpdateMandadorySurvey} />}
                      />
                      {/*Ticket Assigning Hub */}
                      <Route
                        path="/ticket_assigning_hub"
                        element={<CommonRoute element={TicketAssigningSurvey} />}
                      />
                      <Route
                        path="/update_ticket_assigning_hub/:eid/:id/:status"
                        element={<CommonRoute element={UpdateTicketSurvey} />}
                      />
                      {/*Property Valuation */}
                      {/*Document */}
                      <Route
                        path="/docvaluation"
                        element={<CommonRoute element={DocumentValuation} />}
                      />
                      <Route
                        path="/document_set_valuation/:eid/:id/:status"
                        element={<CommonRoute element={DocumentSetValuation} />}
                      />
                      <Route
                        path="/update_document_valuation/:eid/:id/:status"
                        element={<CommonRoute element={UpdateDocValuation} />}
                      />
                      {/*Location Valuation */}
                      <Route
                        path="/location_valuation"
                        element={<CommonRoute element={LocationValuation} />}
                      />
                      <Route
                        path="/update_location_valuation/:eid/:locationid/:status"
                        element={
                          <CommonRoute element={UpdateLocationValuation} />
                        }
                      />
                      {/*Confirm Service */}
                      <Route
                        path="/service_confirm_valuation"
                        element={
                          <CommonRoute element={ServiceConfirmValuation} />
                        }
                      />
                      <Route
                        path="/update_confirm_valuation/:eid/:id/:status"
                        element={
                          <CommonRoute element={UpdateServiceConValuation} />
                        }
                      />
                      {/*invoice Verify Valuation */}
                      <Route
                        path="/invoice_valuation"
                        element={<CommonRoute element={InvoiceVerifyValuation} />}
                      />
                      <Route
                        path="/update_invoice_valuation/:eid/:id/:status"
                        element={
                          <CommonRoute element={UpdateInvoiceVerifyValuation} />
                        }
                      />
                      {/*Ticket Assigning Hub */}
                      <Route
                        path="/ticket_hub_valuation"
                        element={<CommonRoute element={TicketAssignValuation} />}
                      />
                      <Route
                        path="/update_ticket_hub_valuation/:eid/:id/:status"
                        element={
                          <CommonRoute element={UpdateTicketHubValuation} />
                        }
                      />
                      {/*Missing Documents */}
                      {/* Document verification */}
                      <Route
                        path="/doc_verif_missing"
                        element={<CommonRoute element={DocumentVerifyMissing} />}
                      />
                      <Route
                        path="/updatedoc_verif_missing/:eid/:id/:status"
                        element={<CommonRoute element={UpdateDocVerifyMissing} />}
                      />
                      {/*Location Missing */}
                      <Route
                        path="/location_missing"
                        element={<CommonRoute element={LocationVerifyMissing} />}
                      />
                      <Route
                        path="/update_location_missing/:eid/:locationid/:status"
                        element={<CommonRoute element={UpdateLocationMissing} />}
                      />
                      {/* Service Confirmation */}
                      <Route
                        path="/service_confirm_missing"
                        element={
                          <CommonRoute element={ServiceConfirmationMissing} />
                        }
                      />
                      <Route
                        path="/update_service_confirm_missing/:eid/:id/:status"
                        element={<CommonRoute element={UpdateServiceMissing} />}
                      />
                      {/* Invoice Payment Missing */}
                      <Route
                        path="/invoice_payment_missing"
                        element={<CommonRoute element={InvoicePaymentMissing} />}
                      />
                      <Route
                        path="/update_invoice_missing/:eid/:id/:status"
                        element={<CommonRoute element={UpdateInvoiceMissing} />}
                      />
                      <Route
                        path="/ticket_hub_missing"
                        element={<CommonRoute element={TicketAssigningMissing} />}
                      />
                      <Route
                        path="/update_ticket_missing/:eid/:id/:status"
                        element={<CommonRoute element={UpdateTicketHubMissing} />}
                      />
                      {/* Plot Enquiry  */}
                      {/* Document plot  */}
                      <Route
                        path="/plot_document"
                        element={<CommonRoute element={DocumentPlot} />}
                      />
                      <Route
                        path="/plot_document/:eid/:id/:status"
                        element={<CommonRoute element={UpdateDocPlot} />}
                      />
                      {/* Invoice Plot  */}
                      <Route
                        path="/plot_invoice"
                        element={<CommonRoute element={InvoicePlot} />}
                      />
                      <Route
                        path="/plot_invoice/:eid/:id/:status"
                        element={<CommonRoute element={UpdateInvoicePlot} />}
                      />
                      {/* Location Plot  */}
                      <Route
                        path="/plot_location"
                        element={<CommonRoute element={LocationPlot} />}
                      />
                      <Route
                        path="/plot_location/:eid/:id/:status"
                        element={<CommonRoute element={UpdateLocationPlot} />}
                      />
                      {/* MarketResearch Plot  */}
                      <Route
                        path="/plot_market_research"
                        element={<CommonRoute element={MarketPlot} />}
                      />
                      <Route
                        path="/plot_market_research/:eid/:id/:status"
                        element={<CommonRoute element={UpdateMarketPlot} />}
                      />
                      {/* PriceProposal Plot  */}
                      <Route
                        path="/plot_price_proposal"
                        element={<CommonRoute element={PriceProposalPlot} />}
                      />
                      <Route
                        path="/plot_price_proposal/:eid/:id/:status"
                        element={
                          <CommonRoute element={UpdatePriceProposalPlot} />
                        }
                      />
                      {/* PaymentLegalOpinion Plot  */}
                      <Route
                        path="/plot_payment_legal_opinion"
                        element={<CommonRoute element={PaymentLegalPlot} />}
                      />
                      <Route
                        path="/plot_payment_legal_opinion/:eid/:id/:status"
                        element={<CommonRoute element={UpdateLegalPlot} />}
                      />
                      {/* LawyerDocument Plot  */}
                      <Route
                        path="/plot_lawyer_document"
                        element={<CommonRoute element={LawyerPlot} />}
                      />
                      <Route
                        path="/plot_lawyer_document/:eid/:id/:status"
                        element={<CommonRoute element={UpdateLawyerPlot} />}
                      />
                      {/* FieldSurvey Plot  */}
                      <Route
                        path="/plot_field_survey"
                        element={<CommonRoute element={FieldSurveyPlot} />}
                      />
                      <Route
                        path="/plot_field_survey/:eid/:id/:status"
                        element={<CommonRoute element={UpdateFieldSurveyPlot} />}
                      />
                      {/* LandOwnerAgreement Plot  */}
                      <Route
                        path="/plot_landowner_agreement"
                        element={<CommonRoute element={LandOwnerPlot} />}
                      />
                      <Route
                        path="/plot_landowner_agreement/:eid/:id/:status/:sub_property"
                        element={<CommonRoute element={UpdateLandOwnerPlot} />}
                      />
                      {/* pricingDepartment Plot  */}
                      <Route
                        path="/plot_pricing_department"
                        element={<CommonRoute element={PricingDepplot} />}
                      />
                      <Route
                        path="/plot_pricing_department/:eid/:id/:status/:landtype"
                        element={<CommonRoute element={UpdatePricingDepPlot} />}
                      />
                      {/* MediaDepartment Plot  */}
                      <Route
                        path="/plot_media_department"
                        element={<CommonRoute element={MediaDepartmentPlot} />}
                      />
                      <Route
                        path="/plot_media_department/:eid/:id/:status/:landtype"
                        element={<CommonRoute element={UpdateMediaDepPlot} />}
                      />
                      {/* ContentWriting Plot  */}
                      <Route
                        path="/plot_content_writing"
                        element={<CommonRoute element={ContentWritingPlot} />}
                      />
                      <Route
                        path="/plot_content_writing/:eid/:id/:status/:landtype"
                        element={
                          <CommonRoute element={UpdateContentWritingPlot} />
                        }
                      />
                      {/*Property Inventory */}
                      <Route
                        path="/VacantReport"
                        element={<PrivateRoute element={VacantReport} />}
                      />
                      <Route
                        path="/BlockReport"
                        element={<PrivateRoute element={Blockreport} />}
                      />
                      {/*Booking */}
                      <Route
                        path="/bookingprocess"
                        element={<PrivateRoute element={Bookingprocess} />}
                      />
                      <Route
                        path="/bookingcomplete"
                        element={<CommonRoute element={Bookingcomplete} />}
                      />
                      <Route
                        path="/bookingcanceled"
                        element={<CommonRoute element={Bookingcanceled} />}
                      />
                      <Route
                        path="/bookingcanceled"
                        element={<CommonRoute element={Bookingcanceled} />}
                      />
                      <Route
                        path="/bookingreport/:eid/:id/:status/:booking_id/:booking_no"
                        // element={<CommonRoute element={Updatebookingdata} />}
                        element={<CommonRoute element={ViewBookingData} />}
                      />
                      {/** House Enquiry Pages */}
                      {/** Document*/}
                      <Route
                        path="/house_document"
                        element={<CommonRoute element={DocumentHouse} />}
                      />
                      <Route
                        path="/house_document/:eid/:id/:status"
                        element={<CommonRoute element={UpdateDocumentHouse} />}
                      />
                      {/** Invoice */}
                      <Route
                        path="/invoice_house"
                        element={<CommonRoute element={InvoiceHouse} />}
                      />
                      <Route
                        path="/invoice_house/:eid/:id/:status"
                        element={<CommonRoute element={UpdateInvoiceHouse} />}
                      />
                      {/* Location House */}
                      <Route
                        path="/house_location"
                        element={<CommonRoute element={LocationVerifyHouse} />}
                      />
                      <Route
                        path="/house_location/:eid/:id/:status"
                        element={<CommonRoute element={UpdateLocationHouse} />}
                      />
                      {/* MarketResearch House  */}
                      <Route
                        path="/house_marketresearch"
                        element={<CommonRoute element={MarketResearchHouse} />}
                      />
                      <Route
                        path="/house_marketresearch/:eid/:id/:status"
                        element={
                          <CommonRoute element={UpdateMarketResearchHouse} />
                        }
                      />
                      {/* PriceProposal House  */}
                      <Route
                        path="/house_priceproposal"
                        element={<CommonRoute element={PriceProposalHouse} />}
                      />
                      <Route
                        path="/house_priceproposal/:eid/:id/:status"
                        element={
                          <CommonRoute element={UpdatePriceProposalHouse} />
                        }
                      />
                      {/* PaymentLegalOpinion House  */}
                      <Route
                        path="/house_paymentlegalopinion"
                        element={
                          <CommonRoute element={PaymentLegalOpinionHouse} />
                        }
                      />
                      <Route
                        path="/house_paymentlegalopinion/:eid/:id/:status"
                        element={
                          <CommonRoute element={UpdatePaymentLegalHouse} />
                        }
                      />
                      {/* LawyerDocument Plot  */}
                      <Route
                        path="/house_lawyerdocument"
                        element={<CommonRoute element={LawyerDocumentHouse} />}
                      />
                      <Route
                        path="/house_lawyerdocument/:eid/:id/:status/:sub_property"
                        element={
                          <CommonRoute element={UpdateLawyerDocumentsHouse} />
                        }
                      />
                      {/* FieldSurvey House  */}
                      <Route
                        path="/house_fieldsurvey"
                        element={<CommonRoute element={FieldSurveyHouse} />}
                      />
                      <Route
                        path="/house_fieldsurvey/:eid/:id/:status/:sub_property"
                        element={<CommonRoute element={UpdateFieldSurveyHouse} />}
                      />
                      {/* LandOwnerAgreement House  */}
                      <Route
                        path="/house_landowneragreement"
                        element={<CommonRoute element={LandOwnerHouse} />}
                      />
                      <Route
                        path="/house_landowneragreement/:eid/:id/:status/:sub_property"
                        element={<CommonRoute element={UpdateLandOwnerHouse} />}
                      />
                      {/* pricingDepartment House  */}
                      <Route
                        path="/house_pricing"
                        element={<CommonRoute element={PricingDptHouse} />}
                      />
                      <Route
                        path="/house_pricing/:eid/:id/:status/:sub_property"
                        element={<CommonRoute element={UpdatePricingDptHouse} />}
                      />
                      {/* MediaDepartment Plot  */}
                      <Route
                        path="/house_media"
                        element={<CommonRoute element={MediaDptHouse} />}
                      />
                      <Route
                        path="/house_media/:eid/:id/:status/:sub_property"
                        element={<CommonRoute element={UpdateMediaDptHouse} />}
                      />
                      {/* ContentWriting Plot  */}
                      <Route
                        path="/house_contentwriting"
                        element={<CommonRoute element={ContentWritingHouse} />}
                      />
                      <Route
                        path="/house_contentwriting/:eid/:id/:status/:sub_property"
                        element={
                          <CommonRoute element={UpdateContentWritingHouse} />
                        }
                      />
                      {/** Layout Enquiry Pages */}
                      {/** Document*/}
                      <Route
                        path="/layout_document"
                        element={<CommonRoute element={DocumentVerifyLayout} />}
                      />
                      <Route
                        path="/layout_document/:eid/:id/:status"
                        element={
                          <CommonRoute element={UpdateDocumentVerifyLayout} />
                        }
                      />
                      {/** Invoice */}
                      <Route
                        path="/invoice_layout"
                        element={<CommonRoute element={InvoiceVerifyLayout} />}
                      />
                      <Route
                        path="/invoice_layout/:eid/:id/:status"
                        element={
                          <CommonRoute element={UpdateInvoiceVerifyLayout} />
                        }
                      />
                      {/* Location layout */}
                      <Route
                        path="/layout_location"
                        element={<CommonRoute element={LocationVerifyLayout} />}
                      />
                      <Route
                        path="/layout_location/:eid/:id/:status"
                        element={
                          <CommonRoute element={UpdateLocationverifyLayout} />
                        }
                      />
                      {/* MarketResearch layout  */}
                      <Route
                        path="/layout_marketresearch"
                        element={<CommonRoute element={MarketResearchLayout} />}
                      />
                      <Route
                        path="/layout_marketresearch/:eid/:id/:status"
                        element={
                          <CommonRoute element={UpdateMarketResearchLayout} />
                        }
                      />
                      {/* LawyerDocument layout  */}
                      <Route
                        path="/layout_lawyerdocument"
                        element={<CommonRoute element={LawyerDocumentLayout} />}
                      />
                      <Route
                        path="/layout_lawyerdocument/:eid/:id/:status/:sub_property"
                        element={
                          <CommonRoute element={UpdateLawyerDocumentLayout} />
                        }
                      />
                      {/* FieldSurvey layout  */}
                      <Route
                        path="/layout_fieldsurvey"
                        element={<CommonRoute element={FieldSurveyLayout} />}
                      />
                      <Route
                        path="/layout_fieldsurvey/:eid/:id/:status"
                        element={
                          <CommonRoute element={UpdateFieldSurveylayout} />
                        }
                      />
                      {/* LandOwnerAgreement layout  */}
                      <Route
                        path="/layout_landowneragreement"
                        element={
                          <CommonRoute element={LandOwnerAgreementLayout} />
                        }
                      />
                      <Route
                        path="/layout_landowneragreement/:eid/:id/:status"
                        element={
                          <CommonRoute element={UpdateLandOwnerAgreementLayout} />
                        }
                      />
                      {/* pricingDepartment layout  */}
                      <Route
                        path="/layout_pricing"
                        element={<CommonRoute element={PricingDptLayout} />}
                      />
                      <Route
                        path="/layout_pricing/:eid/:id/:status"
                        element={<CommonRoute element={UpdatePricingDptLayout} />}
                      />
                      {/* MediaDepartment layout  */}
                      <Route
                        path="/layout_media"
                        element={<CommonRoute element={MediaDptLayout} />}
                      />
                      <Route
                        path="/layout_media/:eid/:id/:status"
                        element={<CommonRoute element={UpdateMediaDptLayout} />}
                      />
                      {/* ContentWriting layout  */}
                      <Route
                        path="/layout_contentwriting"
                        element={<CommonRoute element={ContentDptLayout} />}
                      />
                      <Route
                        path="/layout_contentwriting/:eid/:id/:status"
                        element={<CommonRoute element={UpdateContentDptLayout} />}
                      />
                      {/** Commercial Enquiry Pages */}
                      {/** Document*/}
                      <Route
                        path="/commercial_document"
                        element={<CommonRoute element={DocumentCom} />}
                      />
                      <Route
                        path="/commercial_document/:eid/:id/:status"
                        element={<CommonRoute element={UpdateDocumentCom} />}
                      />
                      {/** Invoice */}
                      <Route
                        path="/commercial_invoice"
                        element={<CommonRoute element={InvoiceCom} />}
                      />
                      <Route
                        path="/commercial_invoice/:eid/:id/:status"
                        element={<CommonRoute element={UpdateInvoiceCom} />}
                      />
                      {/* Location layout */}
                      <Route
                        path="/commercial_location"
                        element={<CommonRoute element={LocationCom} />}
                      />
                      <Route
                        path="/commercial_location/:eid/:id/:status"
                        element={<CommonRoute element={UpdateLocationCom} />}
                      />
                      {/* MarketResearch layout  */}
                      <Route
                        path="/commercial_marketresearch"
                        element={<CommonRoute element={MarketResearchCom} />}
                      />
                      <Route
                        path="/commercial_marketresearch/:eid/:id/:status/:subtype"
                        element={
                          <CommonRoute element={UpdateMarketResearchCom} />
                        }
                      />
                      {/* PriceProposal Commercial  */}
                      <Route
                        path="/commercial_priceproposal"
                        element={
                          <CommonRoute element={PriceProposalCommercial} />
                        }
                      />
                      <Route
                        path="/commercial_priceproposal/:eid/:id/:status/:subtype"
                        element={
                          <CommonRoute element={UpdatePriceProposalCommercial} />
                        }
                      />
                      {/* PaymentLegalOpinion commercial  */}
                      <Route
                        path="/commercial_paymentlegalopinion"
                        element={<CommonRoute element={PaymentLegalCommercial} />}
                      />
                      <Route
                        path="/commercial_paymentlegalopinion/:eid/:id/:status/:subtype"
                        element={<CommonRoute element={UpdateLegalCommercial} />}
                      />
                      {/* LawyerDocument Plot  */}
                      <Route
                        path="/commercial_lawyerdocument"
                        element={<CommonRoute element={LawyerDocumentCom} />}
                      />
                      <Route
                        path="/commercial_lawyerdocument/:eid/:id/:status/:subtype"
                        element={
                          <CommonRoute element={UpdateLawyerDocumentCom} />
                        }
                      />
                      {/* FieldSurvey House  */}
                      <Route
                        path="/commercial_fieldsurvey"
                        element={<CommonRoute element={FieldSurveyCommercial} />}
                      />
                      <Route
                        path="/commercial_fieldsurvey/:eid/:id/:status/:subtype"
                        element={<CommonRoute element={UpdateFieldSurveyCom} />}
                      />
                      {/* LandOwnerAgreement House  */}
                      <Route
                        path="/commercial_landowneragreement"
                        element={<CommonRoute element={LandOwnerComercial} />}
                      />
                      <Route
                        path="/commercial_landowneragreement/:eid/:id/:status/:subtype"
                        element={<CommonRoute element={UpdateLandOwnerCom} />}
                      />
                      {/* pricingDepartment commercial  */}
                      <Route
                        path="/commercial_pricing"
                        element={<CommonRoute element={PricingDptCommercial} />}
                      />
                      <Route
                        path="/commercial_pricing/:eid/:id/:status/:subtype"
                        element={<CommonRoute element={UpdatePricingDptCom} />}
                      />
                      {/* MediaDepartment commercial  */}
                      <Route
                        path="/commercial_media"
                        element={<CommonRoute element={MediaDptCommercial} />}
                      />
                      <Route
                        path="/commercial_media/:eid/:id/:status/:subtype"
                        element={<CommonRoute element={UpdateMediaDptCom} />}
                      />
                      {/* ContentWriting commercial  */}
                      <Route
                        path="/commercial_contentwriting"
                        element={<CommonRoute element={ContentDptCommercial} />}
                      />
                      <Route
                        path="/commercial_contentwriting/:eid/:id/:status/:subtype"
                        element={<CommonRoute element={UpdateContentDptCom} />}
                      />
                      {/** Apartment Project Enquiry Pages */}
                      {/** Document*/}
                      <Route
                        path="/aproject_document"
                        element={<CommonRoute element={DocumentVerifyAp} />}
                      />
                      <Route
                        path="/aproject_document/:eid/:id/:status"
                        element={<CommonRoute element={UpdateDocumentVerifyAP} />}
                      />
                      {/* Location Apartment Project */}
                      <Route
                        path="/aproject_location"
                        element={<CommonRoute element={LocationVerifyAP} />}
                      />
                      <Route
                        path="/aproject_location/:eid/:id/:status"
                        element={<CommonRoute element={UpdateLocationVerifyAp} />}
                      />
                      {/* MarketResearch Apartment Project  */}
                      <Route
                        path="/aproject_marketresearch"
                        element={<CommonRoute element={MarketResearchAP} />}
                      />
                      <Route
                        path="/aproject_marketresearch/:eid/:id/:status"
                        element={<CommonRoute element={UpdateMarketResearchAP} />}
                      />
                      {/* LawyerDocument Apartment Project  */}
                      <Route
                        path="/aproject_lawyerdocument"
                        element={<CommonRoute element={LawyerDocumentsAP} />}
                      />
                      <Route
                        path="/aproject_lawyerdocument/:eid/:id/:status"
                        element={
                          <CommonRoute element={UpdateLawyerDocumentsAP} />
                        }
                      />
                      {/* LandOwnerAgreement Apartment Project  */}
                      <Route
                        path="/aproject_landowneragreement"
                        element={<CommonRoute element={LandOwnerAgreeAP} />}
                      />
                      <Route
                        path="/aproject_landowneragreement/:eid/:id/:status"
                        element={<CommonRoute element={UpdateLandOwnerAgreeAP} />}
                      />
                      {/* pricingDepartment Apartment Project  */}
                      <Route
                        path="/aproject_pricing"
                        element={<CommonRoute element={PricingDptAP} />}
                      />
                      <Route
                        path="/aproject_pricing/:eid/:id/:status"
                        element={<CommonRoute element={UpdatePricingDptAP} />}
                      />
                      {/* MediaDepartment Apartment Project  */}
                      <Route
                        path="/aproject_media"
                        element={<CommonRoute element={MediaDptAp} />}
                      />
                      <Route
                        path="/aproject_media/:eid/:id/:status"
                        element={<CommonRoute element={UpdateMediaDptAP} />}
                      />
                      {/* ContentWriting Apartment Project  */}
                      <Route
                        path="/aproject_contentwriting"
                        element={<CommonRoute element={ContentDptAp} />}
                      />
                      <Route
                        path="/aproject_contentwriting/:eid/:id/:status"
                        element={<CommonRoute element={UpdateContentDptAP} />}
                      />
                      {/* Whole After Sale  */}
                      {/*Blocking and booking */}
                      <Route
                        path="/blockingbooking"
                        element={
                          <CommonRoute element={BookingReportsAfterSale} />
                        }
                      />
                      <Route
                        path="/bookingreports/:id"
                        element={<CommonRoute element={BookingDetailsASale} />}
                      />
                      {/*Payment Schedule   */}
                      <Route
                        path="/paymentschedule_AfterSale"
                        element={
                          <CommonRoute element={PaymentScheduleAfterSale} />
                        }
                      />
                      <Route
                        path="/paymentschedule_AfterSale/:eid/:id/:status/:booking_id/:booking_no"
                        element={
                          <CommonRoute element={UpdatePaymentScheduleAsale} />
                        }
                      />
                      {/*Registration Ticket    */}
                      <Route
                        path="/registrationticket"
                        element={<CommonRoute element={RegistrationTicket} />}
                      />
                      <Route
                        path="/registrationticket/:eid/:id/:status/:booking_id/:shortform/:booking_no/:block_id"
                        element={
                          <CommonRoute element={UpdateRegistrationTicket} />
                        }
                      />
                      {/*Registration     */}
                      <Route
                        path="/registration"
                        element={<CommonRoute element={RegistrationAsale} />}
                      />
                      <Route
                        path="/registration/:eid/:id/:status/:booking_id/:booking_no/:pagetype/:block_id"
                        element={
                          <CommonRoute element={UpdateRegistrationAsale} />
                        }
                      />
                      {/* After Sale */}
                      <Route
                        path="/aftersale"
                        element={<CommonRoute element={AfterSale} />}
                      />
                      <Route
                        path="/aftersale/:eid/:id/:status/:booking_id/:booking_no/:block_id"
                        element={<CommonRoute element={UpdateAfterSale} />}
                      />
                      {/* Telecalling Document Verification */}
                      <Route
                        path="/telecalling_documentverification"
                        element={
                          <CommonRoute element={TelecallingDocVerification} />
                        }
                      />
                      <Route
                        path="/telecalling_fileupload/:eid/:id/:status"
                        element={<CommonRoute element={WholeDocTelecalling} />}
                      />
                      {/* Telecalling Advance */}
                      <Route
                        path="/telecalling_advance"
                        element={<CommonRoute element={AdvancePaymentTele} />}
                      />
                      <Route
                        path="/telecalling_advance/:eid/:id/:status"
                        element={<CommonRoute element={WholeAdvanceTele} />}
                      />
                      {/*Price proposal */}
                      <Route
                        path="/telecalling_proposal"
                        element={<CommonRoute element={PriceProposalTele} />}
                      />
                      <Route
                        path="/telecalling_proposal/:eid/:id/:status"
                        element={<CommonRoute element={WholeProposalTele} />}
                      />
                      {/*Payment Legal Opinion */}
                      <Route
                        path="/telecalling_paymentlegal"
                        element={<CommonRoute element={PaymentForLegalTele} />}
                      />
                      <Route
                        path="/telecalling_paymentlegal/:eid/:id/:status"
                        element={
                          <CommonRoute element={WholePaymentForLegalTele} />
                        }
                      />
                      {/*Booking */}
                      <Route
                        path="/telecalling_booking"
                        element={<CommonRoute element={BookingTele} />}
                      />
                      <Route
                        path="/telecalling_booking/:eid/:id/:status"
                        element={<CommonRoute element={WholeBookingTele} />}
                      />
                      {/*Payment Legal Opinion */}
                      <Route
                        path="/telecalling_registrationticket"
                        element={<CommonRoute element={RegistrationTicketTele} />}
                      />
                      <Route
                        path="/telecalling_registrationticket/:eid/:id/:status/:booking_id/:shortform/:booking_no"
                        element={<CommonRoute element={WholeRegistrationTele} />}
                      />
                      {/*Service Confirmation */}
                      <Route
                        path="/serviceconfirm"
                        element={<CommonRoute element={ServiceConfirmTele} />}
                      />
                      <Route
                        path="/serviceconfirm/:eid/:id/:status"
                        element={
                          <CommonRoute element={WholeServiceConfirmTele} />
                        }
                      />
                      {/*Service Payment */}
                      <Route
                        path="/servicepayment"
                        element={<CommonRoute element={ServicePaymentTele} />}
                      />
                      <Route
                        path="/servicepayment/:eid/:id/:status"
                        element={
                          <CommonRoute element={WholeServicePaymentTele} />
                        }
                      />
                      {/* CMS */}
                      {/* Home */}
                      <Route
                        path="/bannerimage"
                        element={<CommonRoute element={BannerImage} />}
                      />
                      <Route
                        path="/adblock1"
                        element={<CommonRoute element={AdBlock1} />}
                      />{" "}
                      <Route
                        path="/promotionBner"
                        element={<CommonRoute element={PromotionBanner} />}
                      />{" "}
                      <Route
                        path="/adblock2"
                        element={<CommonRoute element={AdBlock2} />}
                      />{" "}
                      <Route
                        path="/promotionBner2"
                        element={<CommonRoute element={PromotionBanner2} />}
                      />{" "}
                      <Route
                        path="/adblock3"
                        element={<CommonRoute element={AdBlock3} />}
                      />{" "}
                      <Route
                        path="/promotionBner3"
                        element={<CommonRoute element={PromotionBanner3} />}
                      />
                      <Route
                        path="/todaysdeals"
                        element={<CommonRoute element={TodaysDeals} />}
                      />
                      <Route
                        path="/premiumproperties"
                        element={<CommonRoute element={PremiumProperties} />}
                      />
                      <Route
                        path="/highreturnsproperties"
                        element={<CommonRoute element={HighReturnsProperties} />}
                      />
                      <Route
                        path="/couponcorner"
                        element={<CommonRoute element={CouponCorner} />}
                      />
                      <Route
                        path="/footer"
                        element={<CommonRoute element={Footer} />}
                      />
                      <Route
                        path="/contactus"
                        element={<CommonRoute element={ContactUs} />}
                      />
                      <Route
                        path="/aboutUs"
                        element={<CommonRoute element={AboutUS} />}
                      />
                      {/* Service */}
                      {/* Service */}
                      <Route
                        path="/bannerimageService"
                        element={<CommonRoute element={BannerImgService} />}
                      />
                      <Route
                        path="/block1"
                        element={<CommonRoute element={Block1} />}
                      />
                      <Route
                        path="/block2"
                        element={<CommonRoute element={Block2} />}
                      />
                      <Route
                        path="/block3"
                        element={<CommonRoute element={Block3} />}
                      />
                      <Route
                        path="/promotionblock"
                        element={<CommonRoute element={PromotionBlock} />}
                      />
                      <Route
                        path="/whyblock"
                        element={<CommonRoute element={WhyBlock} />}
                      />
                      <Route
                        path="/servicename"
                        element={<CommonRoute element={ServiceName} />}
                      />
                      <Route
                        path="/servicecreation"
                        element={<CommonRoute element={ServiceCreation} />}
                      />
                      <Route
                        path="/servicecontent"
                        element={<CommonRoute element={ServiceContent} />}
                      />
                      <Route
                        path="/faqblock"
                        element={<CommonRoute element={Faqblock} />}
                      />
                      <Route
                        path="/privacypolicy"
                        element={<CommonRoute element={PrivacyPolicy} />}
                      />
                      <Route
                        path="/customercare"
                        element={<CommonRoute element={CustomerCareService} />}
                      />
                      <Route
                        path="/refundpolicy"
                        element={<CommonRoute element={RefundPolicy} />}
                      />
                      <Route
                        path="/termscondition"
                        element={<CommonRoute element={TermsCondition} />}
                      />
                      <Route
                        path="/howitwork"
                        element={<CommonRoute element={HowItsWork} />}
                      />
                      <Route
                        path="/whoweare"
                        element={<CommonRoute element={WhoWeAre} />}
                      />
                      <Route
                        path="/serviceblogs"
                        element={<CommonRoute element={ServiceBlogs} />}
                      />
                    </Routes>

                    <Footerbar />
                  </main>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </BreadcrumbProvider>
      <ToastContainer position="top-center" autoClose={1000} />
      <ConfirmDialog />
    </div>
  );
}

export default App;
