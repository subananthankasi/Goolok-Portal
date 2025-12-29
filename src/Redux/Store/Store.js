// src/redux/store.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import StaffReducer from "../Reducers/MasterPage/StaffReducer";
import PropertyTypeReducer from "../Reducers/MasterPage/PropertyTypeReducer";
import { thunk } from "redux-thunk";
import PropertyDocumentReducer from "../Reducers/MasterPage/PropertyDocumentReducer";
import districtReducer from "../Reducers/MasterPage/DistrictReducer";
import talukReducer from "../Reducers/MasterPage/TalukReducer";
import StateReducer from "../Reducers/MasterPage/StateReducer";
import villageReducer from "../Reducers/MasterPage/VillageReducer";
import PincodeReducer from "../Reducers/MasterPage/PincodeReducer";
import GroupTypeReducer from "../Reducers/MasterPage/GroupTypeReducer";
import BranchReducer from "../Reducers/MasterPage/BranchReducer";
import VendorReducer from "../Reducers/MasterPage/VendorReducer";
import SRODetailsReducer from "../Reducers/MasterPage/SRODetailsReducer";
import CustomerReducer from "../Reducers/Customer/CustomerReducer";
import SubPropertyReducer from "../Reducers/MasterPage/SubPropertyReducer";
import LandReducer from "../Reducers/PropertyManagement/LandReducer";
import AmenitiesHeadingReducer from "../Reducers/Amenities/AmenitiesHeadingReducer";
import AmenitiesReducer from "../Reducers/Amenities/AmenitiesReducer";
import UnitReducer from "../Reducers/MasterPage/UnitReducer";
import EnquiryReducer from "../Reducers/Enquiry/enquiryReducer";
import CategoryReducer from "../Reducers/MasterPage/CategoryReducer";
import SubCategoryReducer from "../Reducers/MasterPage/SubCategoryReducer";
import LawyerDocumentReducer from "../Reducers/MasterPage/LawyerDocumentReducer";
import LawyerDocumentInputReducer from "../Reducers/MasterPage/LawyerDocumentInputReducer";
import { pricingReducer } from "../Reducers/MasterPage/PricingReducer";
import {
  completedPricingReducer,
  pendingPricingReducer,
  pricingDptReducer,
  waitingPricingReducer,
} from "../Reducers/Enquiry/PricingEnquiryReducer";
import { paymentScheduleReducer } from "../Reducers/MasterPage/PaymentScheduleSlice";
import { paymentScheduleEnqReducer } from "../Reducers/Enquiry/PaymentScheduleEnqSlice";
import {
  paymentScheduleStageEnqGetReducer,
  paymentScheduleStagePostReducer,
} from "../Reducers/Enquiry/PaymentScheduleStageEnqSlice";
import { pricingConfirmReducer } from "../Reducers/Enquiry/PricingConfirmReducer";
import {
  mediaCompleteReducer,
  mediaPendingReducer,
  mediaWaitingReducer,
} from "../Reducers/Enquiry/MediaDptReducers/MediaDptReducer";
import { mediaDptPostReducer } from "../Reducers/Enquiry/MediaDptReducers/MediaVideoReducer";
import { mediaDptPhotoReducer } from "../Reducers/Enquiry/MediaDptReducers/MediaPhotoReducer";
import { mediaDptAttachmentReducer } from "../Reducers/Enquiry/MediaDptReducers/MediaDptAttachmentReducer";
import { mediaConfirmReducer } from "../Reducers/Enquiry/MediaDptReducers/MediaDptConfirmReducer";
import {
  contentWritingCompleteReducer,
  contentWritingPendingReducer,
  contentWritingWaitingReducer,
} from "../Reducers/Enquiry/ContentWritingReducer/ContentWritngWaitingReducer";
import { interiorFeatureReducer } from "../Reducers/MasterPage/FeatureReducer/InteriorFeatureReducer";
import { exteriorFeatureReducer } from "../Reducers/MasterPage/FeatureReducer/ExteriorfeatureReducer";
import { generalFeatureReducer } from "../Reducers/MasterPage/FeatureReducer/GeneralFeatureReducer";
import { suitableReducer } from "../Reducers/MasterPage/TagsReducer/SuitableReducer";
import { propertyReducer } from "../Reducers/MasterPage/TagsReducer/PropertyReducer";
import {
  CWdescAndFetureReducer,
  eEnqfuturesReducer,
  GEnqfuturesReducer,
  IEnqfuturesReducer,
} from "../Reducers/Enquiry/ContentWritingReducer/CWDescandFeatureReducer";
import { localitiesReducer } from "../Reducers/Enquiry/ContentWritingReducer/LocalitiesReducer";
import { nearByReducer } from "../Reducers/Enquiry/ContentWritingReducer/NearByReducer";
import { tagReducer } from "../Reducers/Enquiry/ContentWritingReducer/TagsReducer";
import { contentDptConfirmReducer } from "../Reducers/Enquiry/ContentWritingReducer/ContentDptConfirmReducer";
import { offerReducer } from "../Reducers/MasterPage/OfferReducer/OfferReducer";
import { couponsReducer } from "../Reducers/MasterPage/CouponsReducer/CouponsReducer";
import { StrategyReducer } from "../Reducers/MasterPage/StrategyReducer/StrategyReducer";
import {
  ApartmentGetReducer,
  ApartmentReducer,
} from "../Reducers/ApartmentReducer/ApartmentReduce";
import {
  ApartmentAddGetReducer,
  ApartmentAddReducer,
} from "../Reducers/ApartmentReducer/AddDocumentReducer";
import { closedPropertyReducer } from "../Reducers/Enquiry/ClosedPropertyReducer";
import { projectStatusReducer, ServiceProjectReducer } from "../Reducers/ProjectReducer/ProjectStatusReducer";
import {
  contactPersonReducer,
  contactPersonSroReducer,
} from "../Reducers/MasterPage/ContactPersonSroReducer";
import { talukDetailsReducer } from "../Reducers/MasterPage/TalukDetailsReducer";
import { contactTalukReducer } from "../Reducers/MasterPage/ContactPersonTalukReducer";
import { projectServiceVerifyService } from "../Reducers/ProjectReducer/ProjectReducer";
import { generalAddressReducer } from "../Reducers/MasterPage/GeneralAddressReducer";

const rootReducer = combineReducers({
  // master page data
  PropertyType: PropertyTypeReducer,
  SubPropertyType: SubPropertyReducer,
  PropertyDocument: PropertyDocumentReducer,
  LawyerDocument: LawyerDocumentReducer,
  LawyerDocumentInput: LawyerDocumentInputReducer,
  State: StateReducer,
  District: districtReducer,
  Taluk: talukReducer,
  Village: villageReducer,
  Pincode: PincodeReducer,
  Branch: BranchReducer,
  GroupType: GroupTypeReducer,
  staff: StaffReducer,
  vendor: VendorReducer,
  SRODetails: SRODetailsReducer,
  Unit: UnitReducer,
  Category: CategoryReducer,
  SubCategory: SubCategoryReducer,
  projectStatus: projectStatusReducer,
  serviceProjectCount:ServiceProjectReducer,
  //Feature
  interiorFeatureData: interiorFeatureReducer,
  exteriorFeatureData: exteriorFeatureReducer,
  generalFeatureData: generalFeatureReducer,
  //tags
  suitableData: suitableReducer,
  propertyData: propertyReducer,
  //offer
  offerData: offerReducer,
  couponsData: couponsReducer,
  srategyData: StrategyReducer,
  contactPersonSroData: contactPersonSroReducer,
  contactPersonTalukData: contactTalukReducer,
  projectVerifyService :projectServiceVerifyService,

  talukDetailsData: talukDetailsReducer,
  //suba...................
  pricing: pricingReducer,
  generalAddress:generalAddressReducer,

  //pricing enquiry
  pricingEnqData: waitingPricingReducer,
  pendingdata: pendingPricingReducer,
  completeData: completedPricingReducer,

  pricingDptData: pricingDptReducer,

  //paymentSchdule master
  paymentSchedule: paymentScheduleReducer,

  // paymentSchedule Enquiry
  paymentScheduleEnqData: paymentScheduleEnqReducer,
  paymentStagePost: paymentScheduleStagePostReducer,
  paymentStageEnqGet: paymentScheduleStageEnqGetReducer,
  pricingConfirm: pricingConfirmReducer,

  //Media Enq
  mediaWaitingData: mediaWaitingReducer,
  mediaPendingData: mediaPendingReducer,
  mediaCompleteData: mediaCompleteReducer,

  //vidio
  mediaVideodata: mediaDptPostReducer,
  //Photo
  mediaPhotodata: mediaDptPhotoReducer,
  //Attachment
  mediaAttachmentData: mediaDptAttachmentReducer,
  mediaDptConfirm: mediaConfirmReducer,

  //content enq stage]

  waitingContentData: contentWritingWaitingReducer,
  pendingContentData: contentWritingPendingReducer,
  completeContentData: contentWritingCompleteReducer,
  CWDescFeatureData: CWdescAndFetureReducer,
  localitiesData: localitiesReducer,
  nearByData: nearByReducer,
  tagData: tagReducer,
  contentDptConfirmData: contentDptConfirmReducer,

  GEnqData: GEnqfuturesReducer,
  IEnqData: IEnqfuturesReducer,
  eEnqData: eEnqfuturesReducer,

  //..........
  //  PropertyManagement
  Land: LandReducer,

  //Customer
  Customer: CustomerReducer,

  //Amenities
  AmenitiesHeading: AmenitiesHeadingReducer,
  Amenities: AmenitiesReducer,

  //enquiry
  Enquiry: EnquiryReducer,
  closedProperty: closedPropertyReducer,
  // AparmentDocumentPending  ru.................
  ApartmentReducers: ApartmentReducer,
  ApartmentGetReducer: ApartmentGetReducer,
  AddDoc: ApartmentAddReducer,
  AddDocGet: ApartmentAddGetReducer,

  // source book
  // other reducers
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
