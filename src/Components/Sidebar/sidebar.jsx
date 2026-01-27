import { useEffect, useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem as ProMenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import logo1 from "../../Assets/images/Goolok Final Logo.png";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ApartmentIcon from "@mui/icons-material/Apartment";
import "./sidebarcss.css";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ReceiptIcon from "@mui/icons-material/Receipt";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import PolicyIcon from "@mui/icons-material/Policy";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import PollIcon from "@mui/icons-material/Poll";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Badge } from "primereact/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  projectStatusThunk,
  ServiceProjectStatusThunk,
} from "../../Redux/Actions/ProjectThunk/ProjectStatusThunk";
import EngineeringIcon from "@mui/icons-material/Engineering";
import SearchIcon from "@mui/icons-material/Search";
import ArticleIcon from "@mui/icons-material/Article";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HouseIcon from "@mui/icons-material/House";
import PictureInPictureIcon from "@mui/icons-material/PictureInPicture";
import SpaIcon from "@mui/icons-material/Spa";
import FormatShapesIcon from "@mui/icons-material/FormatShapes";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { useBreadcrumb } from "../../common/BreadCrumpProvider";

const Item = ({
  title,
  parent,
  biggestparent,
  bigparent,
  to,
  icon,
  selected,
  setSelected,
}) => {
  const { setBreadcrumb } = useBreadcrumb();

  // Auto extract label
  const extractLabel = (title) => {
    if (typeof title === "string") return title;

    if (title?.props?.children) {
      const children = title.props.children;
      const spanChild =
        Array.isArray(children)
          ? children.find((child) => child?.type === "span")?.props?.children
          : children?.props?.children;

      return spanChild || "Unknown";
    }

    return "Unknown";
  };

  const label = extractLabel(title);

  const handleClick = () => {
    setSelected(to);

    const data = { title: label, parent, bigparent, biggestparent };
    localStorage.setItem("breadcrumb", JSON.stringify(data));
    setBreadcrumb(data);
  };

  return (
    <ProMenuItem
      className={`sidenav ${selected === to ? "active-menu-item" : ""}`}
      // onClick={() => {setSelected(to);setBreadcrumb({ title, parent,biggestparent,bigparent });}}
      onClick={handleClick}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </ProMenuItem>
  );
};

const Sidebars = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  // const [selected, setSelected] = useState("")
  const [selected, setSelected] = useState(() => {
    return localStorage.getItem("selectedRoute") || "";
  });
  const [openSubMenus, setOpenSubMenus] = useState(() => {
    return JSON.parse(localStorage.getItem("openSubMenus")) || {};
  });

  const toggleSubMenu = (menu) => {
    setOpenSubMenus((prev) => {
      const updated = { ...prev, [menu]: !prev[menu] };
      localStorage.setItem("openSubMenus", JSON.stringify(updated));
      return updated;
    });
  };

  const location = useLocation();

  const getBasePath = (path) => {
    const pathArray = path.split("/");
    return pathArray[1];
  };

  //.......
  const baseRoutes = [
    "contentWriting",
    "document_verification",
    "invoice_verification",
    "location_verification",
    "market_research_verification",
    "price_proposal_agreement_report",
    "payment_legal_opinion",
    "payment_legal_opinion_report",
    "lawyer_documents",
    "mandatory_docs",
    "enq_fieldsurvey",
    "land_owner_report",
    "PricingDepartment",
    "mediaDepartment",
    "contentWriting",
    "blocking",
    "payment_schedule",
    "registeration_ticket",
    "registeration",
    "service_document",
    "location_service",
    "cofirm_service",
    "invoice_service",
    "patta_appalication",
    "tickethub",
    "verifyProperty",
    "live_property",
    "closed_property",
    "cancel_property",
    "verify_service_project",
    "complete_service_project",
    "documentmap",
    "locationmap",
    "documentlegalopinion",
    "location_legal",
    "cofirm_service_legal",
    "payment_legal_opinion",
    "legalopinionlawyer",
    "documentlandsurvey",
    "ticket_assigning_hub",
    "mandadory_survey",
    "application_survey",
    "invoice_survey",
    "service_confirm_survey",
    "location_survey",
    "docvaluation",
    "location_valuation",
    "service_confirm_valuation",
    "invoice_valuation",
    "ticket_hub_valuation",
    "doc_verif_missing",
    "location_missing",
    "service_confirm_missing",
    "invoice_payment_missing",
    "ticket_hub_missing",
    //plot
    "plot_content_writing",
    "plot_media_department",
    "plot_pricing_department",
    "plot_landowner_agreement",
    "plot_field_survey",
    "plot_lawyer_document",
    "plot_payment_legal_opinion",
    "plot_price_proposal",
    "plot_market_research",
    "plot_location",
    "plot_invoice",
    "plot_document",
    //Apartment
    "apart_content_Writing",
    "apart_media_department",
    "apart_pricing_department",
    "apart_land_owner_agreement",
    "apart_field_survey",
    "apart_mandatory_docs",
    "apart_lawyer_documents",
    "apart_payment_legal_opinion",
    "apart_price_proposal",
    "apart_MarketResearch_verification",
    "apart_location_verification",
    "apart_invoice_verification",
    "apart_document_verification",
    //Property Inventory
    "VacantReport",
    //house Enquiry
    "house_document",
    "invoice_house",
    "house_location",
    "house_marketresearch",
    "house_priceproposal",
    "house_paymentlegalopinion",
    "house_lawyerdocument",
    "house_fieldsurvey",
    "house_landowneragreement",
    "house_pricing",
    "house_media",
    "house_contentwriting",
    //Layout Enquiry
    "layout_document",
    "invoice_layout",
    "layout_location",
    "layout_marketresearch",
    "layout_lawyerdocument",
    "layout_fieldsurvey",
    "layout_landowneragreement",
    "layout_pricing",
    "layout_media",
    "layout_contentwriting",
    //Commercial Enquiry
    "commercial_document",
    "commercial_invoice",
    "commercial_location",
    "commercial_marketresearch",
    "commercial_priceproposal",
    "commercial_paymentlegalopinion",
    "commercial_lawyerdocument",
    "commercial_fieldsurvey",
    "commercial_landowneragreement",
    "commercial_pricing",
    "commercial_media",
    "commercial_contentwriting",
    //Apartment Project Enquiry
    "aproject_document",
    "aproject_location",
    "aproject_marketresearch",
    "aproject_lawyerdocument",
    "aproject_landowneragreement",
    "aproject_pricing",
    "aproject_media",
    "aproject_contentwriting",
    // Telecalling
    "telecalling_documentverification",
    "telecalling_fileupload",
    "telecalling_advance",
  ];
  useEffect(() => {
    const basePath = getBasePath(location.pathname);
    if (baseRoutes.includes(basePath)) {
      setSelected(`/${basePath}`);
      localStorage.setItem("selectedRoute", `/${basePath}`);
    }
  }, [location.pathname]);
  //........................

  const loginType = localStorage.getItem("logintype");
  const token = localStorage.getItem("token");
  const pages = JSON.parse(token)?.pages;

  // no internet
  const navigate = useNavigate();

  useEffect(() => {
    const handleOnlineStatus = () => {
      if (!navigator.onLine) {
        navigate("/internet_issue");
      } else {
        navigate("/");
      }
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    // Check the initial status
    if (!navigator.onLine) {
      navigate("/internet_issue");
    }

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, [navigate]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(projectStatusThunk());
    dispatch(ServiceProjectStatusThunk());
  }, []);
  const projectCount = useSelector((state) => state.projectStatus.data);
  const serviceProjectCount = useSelector(
    (state) => state.serviceProjectCount.data
  );

  return (
    <Box>
      <Sidebar collapsed={isCollapsed}>
        <Menu
          iconShape="square"

        >
          <ProMenuItem
            className="no-hover"
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", backgroundColor: "white" }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <img
                  src={logo1}
                  style={{ width: "150px", height: "55px" }}
                  alt="logo"
                  className="p-2"
                />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon className="" style={{ color: "#2f4f4f" }} />
                </IconButton>
              </Box>
            )}
          </ProMenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {loginType === "admin" && (
              <>
                <SubMenu
                  label="Master Page"
                  icon={<ReceiptOutlinedIcon />}
                  style={{ color: "White" }}
                  open={openSubMenus["MasterPage"]}
                  onClick={() => toggleSubMenu("MasterPage")}
                >
                  {/* <Item
                    title="Property Type"
                    to="/property_type"
                    selected={selected}
                    setSelected={setSelected}
                  /> */}
                  <Item
                    title="Sub Property Type"
                    to="/sub_property_type"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Property Document"
                    to="/property_documnent"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Lawyer Document"
                    to="/lawyer_docment"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Lawyer Document Input"
                    to="/lawyer_docment_input"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Pricing "
                    to="/pricing"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Payment Schedule "
                    to="/paymentSchedule"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Taluk Office Details "
                    to="/talukdetails"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Contact Person Details "
                    to="/contact_person_details"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Features "
                    to="/features"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Tags "
                    to="/tags"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Gifts "
                    to="/gift"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Coupons "
                    to="/Coupons"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Strategy "
                    to="/strategy"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="SRO Details"
                    to="/SRO_Details"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="State"
                    to="/state"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="District"
                    to="/district_city"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Taluk"
                    to="/taluk"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Village"
                    to="/village"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Pincode"
                    to="/pincode"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Branch "
                    to="/branch"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Group Type"
                    to="/group_type"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  {/* <Item
                title="Staff Credentials"
                to="" 
                selected={selected}
                setSelected={setSelected}
              /> */}
                  <Item
                    title="Category"
                    to="/Category"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Sub Category"
                    to="/SubCategory"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Unit"
                    to="/unit"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Advance"
                    to="/advance"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                  <Item
                    title="Amenities Creation"
                    to="/amenities_creation"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Master Page"
                  />
                </SubMenu>
                <SubMenu
                  label="Staff"
                  icon={<PeopleOutlinedIcon />}
                  style={{ color: "White" }}
                  open={openSubMenus["Staff"]}
                  onClick={() => toggleSubMenu("Staff")}
                >
                  <Item
                    title="New Staff"
                    to="/new_staff"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Staff"
                  />
                  <Item
                    title="Staff Report"
                    to="/staff_report"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Staff"
                  />
                  <Item
                    title="Disable Staff"
                    to="/disable_staff"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Staff"
                  />
                </SubMenu>
                <SubMenu
                  label="TeleCall"
                  icon={<AddIcCallIcon />}
                  style={{ color: "White" }}
                  open={openSubMenus["Enquiry"]}
                  onClick={() => toggleSubMenu("Enquiry")}
                >
                  <Item
                    title="Document verification"
                    to="/telecalling_documentverification"
                    selected={selected}
                    setSelected={setSelected}
                    parent="TeleCall"
                  />
                  <Item
                    title="Invoice Verification"
                    to="/telecalling_advance"
                    selected={selected}
                    setSelected={setSelected}
                    parent="TeleCall"
                  />
                  <Item
                    title="Price proposal"
                    to="/telecalling_proposal"
                    selected={selected}
                    setSelected={setSelected}
                    parent="TeleCall"
                  />
                  <Item
                    title="Payment for legal opinion"
                    to="/telecalling_paymentlegal"
                    selected={selected}
                    setSelected={setSelected}
                    parent="TeleCall"
                  />
                  <Item
                    title="Booking"
                    to="/telecalling_booking"
                    selected={selected}
                    setSelected={setSelected}
                    parent="TeleCall"
                  />
                  <Item
                    title="Registration Ticket"
                    to="/telecalling_registrationticket"
                    selected={selected}
                    setSelected={setSelected}
                    parent="TeleCall"
                  />
                  <Item
                    title="Service Confirmation"
                    to="/serviceconfirm"
                    selected={selected}
                    setSelected={setSelected}
                    parent="TeleCall"
                  />
                  <Item
                    title="Service Payment"
                    to="/servicepayment"
                    selected={selected}
                    setSelected={setSelected}
                    parent="TeleCall"
                  />
                </SubMenu>

                <SubMenu
                  label="CMS"
                  icon={<PeopleOutlinedIcon />}
                  style={{ color: "White" }}
                  open={openSubMenus["CMS"]}
                  onClick={() => toggleSubMenu("CMS")}
                >
                  <SubMenu
                    label="Home"
                    icon={<PeopleOutlinedIcon />}
                    style={{ color: "White" }}
                    open={openSubMenus["Home"]}
                    onClick={() => toggleSubMenu("Home")}
                  >
                    <Item
                      title="BannerImage"
                      to="/bannerimage"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="CMS"
                      parent="Home"
                    />
                    <Item
                      title="Ad Block1"
                      to="/adblock1"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="CMS"
                      parent="Home"
                    />
                    <Item
                      title="Todays Deals"
                      to="/todaysdeals"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="CMS"
                      parent="Home"
                    />
                    <Item
                      title="Promotion Banner"
                      to="/promotionBner"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="CMS"
                      parent="Home"
                    />

                    <Item
                      title="PremiumProperties"
                      to="/premiumproperties"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="CMS"
                      parent="Home"
                    />
                    <Item
                      title="Ad Block2"
                      to="/adblock2"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="CMS"
                      parent="Home"
                    />

                    <Item
                      title="CouponCorner"
                      to="/couponcorner"
                      selected={selected}
                      setSelected={setSelected}
                      parent="Home"
                      bigparent="CMS"
                    />
                    <Item
                      title="Promotion Banner2"
                      to="/promotionBner2"
                      selected={selected}
                      setSelected={setSelected}
                      parent="Home"
                      bigparent="CMS"
                    />

                    <Item
                      title="HighReturnsProperties"
                      to="/highreturnsproperties"
                      selected={selected}
                      setSelected={setSelected}
                      parent="Home"
                      bigparent="CMS"
                    />

                    <Item
                      title="Ad Block3"
                      to="/adblock3"
                      selected={selected}
                      setSelected={setSelected}
                      parent="Home"
                      bigparent="CMS"
                    />

                    <Item
                      title="Promotion Banner3"
                      to="/promotionBner3"
                      selected={selected}
                      setSelected={setSelected}
                      parent="Home"
                      bigparent="CMS"
                    />
                    <Item
                      title="Footer"
                      to="/footer"
                      selected={selected}
                      setSelected={setSelected}
                      parent="Home"
                      bigparent="CMS"
                    />
                    <Item
                      title="ContactUs"
                      to="/contactus"
                      selected={selected}
                      setSelected={setSelected}
                      parent="Home"
                      bigparent="CMS"
                    />
                    <Item
                      title="AboutUs"
                      to="/aboutUs"
                      selected={selected}
                      setSelected={setSelected}
                      parent="Home"
                      bigparent="CMS"
                    />
                  </SubMenu>
                  <SubMenu
                    label="Service"
                    icon={<PeopleOutlinedIcon />}
                    style={{ color: "White" }}
                    open={openSubMenus["Service"]}
                    onClick={() => toggleSubMenu("Service")}
                  >
                    <SubMenu
                      label="Home"
                      icon={<PeopleOutlinedIcon />}
                      style={{ color: "White" }}
                      open={openSubMenus["HomeService"]}
                      onClick={() => toggleSubMenu("HomeService")}
                    >
                      <Item
                        title="BannerImage"
                        to="/bannerimageService"
                        selected={selected}
                        setSelected={setSelected}
                        biggestparent="CMS"
                        bigparent="Service"
                        parent="Home"
                      />

                      <Item
                        title="Block1"
                        to="/block1"
                        selected={selected}
                        setSelected={setSelected}
                        biggestparent="CMS"
                        bigparent="Service"
                        parent="Home"
                      />
                      <Item
                        title="Block2"
                        to="/block2"
                        selected={selected}
                        setSelected={setSelected}
                        biggestparent="CMS"
                        bigparent="Service"
                        parent="Home"
                      />
                      <Item
                        title="Block3"
                        to="/block3"
                        selected={selected}
                        setSelected={setSelected}
                        biggestparent="CMS"
                        bigparent="Service"
                        parent="Home"
                      />
                      <Item
                        title="PromotionBlock"
                        to="/promotionblock"
                        selected={selected}
                        setSelected={setSelected}
                        biggestparent="CMS"
                        bigparent="Service"
                        parent="Home"
                      />
                      <Item
                        title="WhyBlock"
                        to="/whyblock"
                        selected={selected}
                        setSelected={setSelected}
                        biggestparent="CMS"
                        bigparent="Service"
                        parent="Home"
                      />
                      <Item
                        title="FaqBlock"
                        to="/faqblock"
                        selected={selected}
                        setSelected={setSelected}
                        biggestparent="CMS"
                        bigparent="Service"
                        parent="Home"
                      />
                      {/* <Item
                    title="ServiceName"
                    to="/servicename"
                    selected={selected}
                    setSelected={setSelected}
                  /> */}
                      <Item
                        title="ServiceCreation"
                        to="/servicecreation"
                        selected={selected}
                        setSelected={setSelected}
                        biggestparent="CMS"
                        bigparent="Service"
                        parent="Home"
                      />
                      <Item
                        title="ServiceContent"
                        to="/servicecontent"
                        selected={selected}
                        setSelected={setSelected}
                        biggestparent="CMS"
                        bigparent="Service"
                        parent="Home"
                      />
                    </SubMenu>
                    <SubMenu
                      label="Sub Pages"
                      icon={<PeopleOutlinedIcon />}
                      style={{ color: "white" }}
                      open={openSubMenus["servicesubpages"]}
                      onClick={() => toggleSubMenu("servicesubpages")}
                    >
                      <Item
                        title="CustomerCare"
                        to="/customercare"
                        selected={selected}
                        setSelected={setSelected}
                        biggestparent="CMS"
                        bigparent="Service"
                        parent="Sub Pages"
                      />
                      <Item
                        title="HowItWork"
                        to="/howitwork"
                        selected={selected}
                        setSelected={setSelected}
                        biggestparent="CMS"
                        bigparent="Service"
                        parent="Sub Pages"
                      />

                      <Item
                        title="Who We Are"
                        to="/whoweare"
                        selected={selected}
                        setSelected={setSelected}
                        biggestparent="CMS"
                        bigparent="Service"
                        parent="Sub Pages"
                      />
                      <Item
                        title="PrivacyPolicy"
                        to="/privacypolicy"
                        selected={selected}
                        setSelected={setSelected}
                        biggestparent="CMS"
                        bigparent="Service"
                        parent="Sub Pages"
                      />
                      <Item
                        title="TermsCondition"
                        to="/termscondition"
                        selected={selected}
                        setSelected={setSelected}
                        biggestparent="CMS"
                        bigparent="Service"
                        parent="Sub Pages"
                      />
                      <Item
                        title="RefundPolicy"
                        to="/refundpolicy"
                        selected={selected}
                        setSelected={setSelected}
                        biggestparent="CMS"
                        bigparent="Service"
                        parent="Sub Pages"
                      />
                      <Item
                        title="ServiceBlogs"
                        to="/serviceblogs"
                        selected={selected}
                        setSelected={setSelected}
                        biggestparent="CMS"
                        bigparent="Service"
                        parent="Sub Pages"
                      />
                    </SubMenu>
                  </SubMenu>
                </SubMenu>
                {/* <SubMenu
                  label="Vendor"
                  icon={<CalendarTodayOutlinedIcon />}
                  style={{ color: "red" }}
                  open={openSubMenus["Vendor"]}
                  onClick={() => toggleSubMenu("Vendor")}
                >
                  <Item
                    title="New Vendor"
                    to="/new_vendors"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Vendor Report"
                    to="/vendor_report"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Disable Vendor"
                    to="/disable_vendor_report"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SubMenu> */}
                <SubMenu
                  label="Property"
                  icon={<AccountTreeIcon />}
                  style={{ color: "White" }}
                  open={openSubMenus["Project"]}
                  onClick={() => toggleSubMenu("Project")}
                >
                  <Item
                    title={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <span>Verify Property</span>
                        <Badge
                          value={projectCount?.pending || 0}
                          severity="danger"
                        />
                      </div>
                    }
                    to="/verifyProperty"
                    selected={selected}
                    // selected={selected === '/verifyProperty'}
                    setSelected={setSelected}
                    parent="Property"
                  />
                  <Item
                    title={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <span>Live Property</span>
                        <Badge
                          value={projectCount?.live || 0}
                          severity="danger"
                        />
                      </div>
                    }
                    to="/live_property"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Property"
                  />
                  <Item
                    title={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <span>Closed Property</span>
                        <Badge
                          value={projectCount?.close || 0}
                          severity="danger"
                        />
                      </div>
                    }
                    to="/closed_property"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Property"
                  />
                  <Item
                    // title="Cancel Property"
                    title={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <span>Cancel Property</span>
                        <Badge
                          value={projectCount?.cancel || 0}
                          severity="danger"
                        />
                      </div>
                    }
                    to="/cancel_property"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Property"
                  />
                </SubMenu>
                <SubMenu
                  label="Property Inventory"
                  icon={<Inventory2OutlinedIcon />}
                  style={{ color: "White" }}
                  open={openSubMenus["propertyinventory"]}
                  onClick={() => toggleSubMenu("propertyinventory")}
                >
                  <Item
                    title="Vacant Report"
                    to="/VacantReport"
                    icon={<SummarizeIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Property Inventory"
                  />
                  <Item
                    title="Block Report"
                    to="/BlockReport"
                    icon={<SummarizeIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Property Inventory"
                  />
                </SubMenu>
                <SubMenu
                  label="Booking"
                  icon={<BookmarkIcon />}
                  style={{ color: "White" }}
                  open={openSubMenus["booking"]}
                  onClick={() => toggleSubMenu("booking")}
                >
                  <Item
                    title="Booking Process"
                    to="/bookingprocess"
                    icon={<TimelapseIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Booking"
                  />
                  <Item
                    title="Booking Complete"
                    to="/bookingcomplete"
                    icon={<TaskAltIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Booking"
                  />
                  <Item
                    title="Booking Canceled"
                    to="/bookingcanceled"
                    icon={<CancelPresentationIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Booking"
                  />
                </SubMenu>
                <SubMenu
                  label="Service Report"
                  icon={<EngineeringIcon />}
                  style={{ color: "White" }}
                  open={openSubMenus["Service"]}
                  onClick={() => toggleSubMenu("Service")}
                >
                  <Item
                    title={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <span>Verify Service</span>
                        <Badge
                          value={serviceProjectCount?.pending || 0}
                          severity="danger"
                        />
                      </div>
                    }
                    to="/verify_service_project"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Service Report"
                  />
                  <Item
                    title={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <span>Complete Service</span>
                        <Badge
                          value={serviceProjectCount?.live || 0}
                          severity="danger"
                        />
                      </div>
                    }
                    to="/complete_service_project"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Service Report"
                  />
                  <Item
                    title={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <span>Closed Service</span>
                        <Badge
                          value={serviceProjectCount?.close || 0}
                          severity="danger"
                        />
                      </div>
                    }
                    to="/closed_service_project"
                    selected={selected}
                    setSelected={setSelected}
                    parent="Service Report"
                  />
                </SubMenu>
                <SubMenu
                  label="Service"
                  icon={<ManageAccountsIcon />}
                  style={{ color: "White" }}
                  open={openSubMenus["LandService"]}
                  onClick={() => toggleSubMenu("LandService")}
                >
                  <SubMenu
                    label="Get Patta"
                    icon={<ArticleIcon />}
                    style={{ color: "White" }}
                    open={openSubMenus["GetPatta"]}
                    onClick={() => toggleSubMenu("GetPatta")}
                  >
                    <Item
                      title="Document Verification"
                      to="/service_document"
                      icon={<SummarizeIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Get Patta"
                    />

                    <Item
                      title="Location Verification"
                      to="/location_service"
                      icon={<GpsFixedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Get Patta"
                    />

                    <Item
                      title=" Service Confirmation"
                      to="/cofirm_service"
                      icon={<SettingsSuggestIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Get Patta"
                    />

                    <Item
                      title="Invoice & Payment"
                      to="/invoice_service"
                      icon={<RequestPageIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Get Patta"
                    />
                    <Item
                      title="Patta Application"
                      to="/patta_appalication"
                      icon={<AssignmentIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Get Patta"
                    />
                    <Item
                      title="Ticket Assigning Hub"
                      to="/tickethub"
                      icon={<AssignmentIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Get Patta"
                    />
                  </SubMenu>
                  <SubMenu
                    label="Find Your Property"
                    icon={<SearchIcon />}
                    style={{ color: "White" }}
                    open={openSubMenus["FindProperty"]}
                    onClick={() => toggleSubMenu("FindProperty")}
                  >
                    <Item
                      title="Document Verification"
                      to="/documentmap"
                      // icon={<SummarizeIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Find Your Property"
                    />

                    <Item
                      title="Location Verification"
                      to="/location_service"
                      // icon={<GpsFixedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Find Your Property"
                    />
                  </SubMenu>
                  <SubMenu
                    label="Legal Opinion"
                    icon={<PolicyIcon />}
                    style={{ color: "White" }}
                    open={openSubMenus["LegalOpinion"]}
                    onClick={() => toggleSubMenu("LegalOpinion")}
                  >
                    <Item
                      title="Document Verification"
                      to="/documentlegalopinion"
                      // icon={<SummarizeIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Legal Opinion"
                    />

                    <Item
                      title="Location Verification"
                      to="/location_legal"
                      // icon={<GpsFixedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Legal Opinion"
                    />
                    <Item
                      title="Service Confirmation "
                      to="/cofirm_service_legal"
                      // icon={<GpsFixedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Legal Opinion"
                    />
                    <Item
                      title="Payment For Legal Opinion "
                      to="/payment_legal_opinion"
                      // icon={<GpsFixedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Legal Opinion"
                    />

                    <Item
                      title="Legal Opinion By Lawyer "
                      to="/legalopinionlawyer"
                      // icon={<GpsFixedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Legal Opinion"
                    />
                  </SubMenu>
                  <SubMenu
                    label="Land Survey"
                    icon={<DomainAddIcon />}
                    style={{ color: "White" }}
                    open={openSubMenus["LandSurvey"]}
                    onClick={() => toggleSubMenu("LandSurvey")}
                  >
                    <Item
                      title="Document Verification"
                      to="/documentlandsurvey"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Land Survey"
                    />
                    <Item
                      title="Location Verification"
                      to="/location_survey"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Land Survey"
                    />

                    <Item
                      title=" Service Confirmation"
                      to="/service_confirm_survey"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Land Survey"
                    />

                    <Item
                      title="Invoice & Payment"
                      to="/invoice_survey"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Land Survey"
                    />
                    <Item
                      title="Application"
                      to="/application_survey"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Land Survey"
                    />
                    <Item
                      title="Mandadory Docs"
                      to="/mandadory_survey"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Land Survey"
                    />
                    <Item
                      title="Ticket Assigning Hub"
                      to="/ticket_assigning_hub"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Land Survey"
                    />
                  </SubMenu>
                  <SubMenu
                    label="Property Valuation"
                    icon={<NaturePeopleIcon />}
                    style={{ color: "White" }}
                    open={openSubMenus["PropertyValuation"]}
                    onClick={() => toggleSubMenu("PropertyValuation")}
                  >
                    <Item
                      title="Document Verification"
                      to="/docvaluation"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Property Valuation"
                    />
                    <Item
                      title="Location Verification"
                      to="/location_valuation"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Property Valuation"
                    />

                    <Item
                      title=" Service Confirmation"
                      to="/service_confirm_valuation"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Property Valuation"
                    />
                    <Item
                      title="Invoice & Payment"
                      to="/invoice_valuation"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Property Valuation"
                    />

                    <Item
                      title="Ticket Assigning Hub"
                      to="/ticket_hub_valuation"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Property Valuation"
                    />
                  </SubMenu>
                  <SubMenu
                    label="Missing Documents"
                    icon={<DynamicFeedIcon />}
                    style={{ color: "White" }}
                    open={openSubMenus["MissingDocuments"]}
                    onClick={() => toggleSubMenu("MissingDocuments")}
                  >
                    <Item
                      title="Document Verification"
                      to="/doc_verif_missing"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Missing Documents"
                    />
                    <Item
                      title="Location Verification"
                      to="/location_missing"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Missing Documents"
                    />

                    <Item
                      title="Service Confirmation"
                      to="/service_confirm_missing"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Missing Documents"
                    />
                    <Item
                      title="Invoice & Payment"
                      to="/invoice_payment_missing"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Missing Documents"
                    />

                    <Item
                      title="Ticket Assigning Hub"
                      to="/ticket_hub_missing"
                      selected={selected}
                      setSelected={setSelected}
                      bigparent="Service"
                      parent="Missing Documents"
                    />
                  </SubMenu>
                </SubMenu>
                <SubMenu
                  label="Land Enquiry"
                  icon={<NotificationsActiveIcon />}
                  style={{ color: "White" }}
                  open={openSubMenus["Enquiry"]}
                  onClick={() => toggleSubMenu("Enquiry")}
                >
                  <Item
                    title="Document Verification"
                    to="/document_verification"
                    icon={<SummarizeIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Land Enquiry"
                  />
                  <Item
                    title="Invoice Verification"
                    to="/invoice_verification"
                    icon={<ReceiptIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Land Enquiry"
                  />
                  <Item
                    title="Location Verification"
                    to="/location_verification"
                    icon={<GpsFixedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Land Enquiry"
                  />
                  <Item
                    title="Market Research Verification"
                    to="/market_research_verification"
                    icon={<AddBusinessIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Land Enquiry"
                  />
                  <Item
                    title="Price proposal agreement"
                    to="/price_proposal_agreement_report"
                    icon={<AttachMoneyIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Land Enquiry"
                  />
                  <Item
                    title="Payment for Legal opinion and Field survey"
                    to="/payment_legal_opinion_report"
                    icon={<PolicyIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Land Enquiry"
                  />
                  <Item
                    title="Lawyer Documents"
                    to="/lawyer_documents"
                    icon={<LocalPoliceIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Land Enquiry"
                  />
                  <Item
                    title="Mandatory docs"
                    to="/mandatory_docs"
                    icon={<PriorityHighIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Land Enquiry"
                  />
                  <Item
                    title="Field survey"
                    to="/enq_fieldsurvey"
                    icon={<PollIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Land Enquiry"
                  />
                  <Item
                    title="Land Owner Agreement"
                    to="/land_owner_report"
                    icon={<HandshakeIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Land Enquiry"
                  />
                  <Item
                    title="Pricing Department"
                    to="/pricingDepartment"
                    icon={<AssuredWorkloadIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Land Enquiry"
                  />
                  <Item
                    title="Media Department"
                    to="/mediaDepartment"
                    icon={<PermMediaIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Land Enquiry"
                  />
                  <Item
                    title="Content Writing"
                    to="/contentWriting"
                    icon={<PostAddIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Land Enquiry"
                  />
                </SubMenu>
                <SubMenu
                  label="Apartment Enquiry"
                  icon={<ApartmentIcon />}
                  style={{ color: "White" }}
                  open={openSubMenus["Apart Enquiry"]}
                  onClick={() => toggleSubMenu("Apart Enquiry")}
                >
                  <Item
                    title="Document Verification"
                    to="/apart_document_verification"
                    icon={<SummarizeIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Apartment Enquiry"
                  />
                  <Item
                    title="Invoice Verification"
                    to="/apart_invoice_verification"
                    icon={<ReceiptIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Apartment Enquiry"
                  />
                  <Item
                    title="Location Verification"
                    to="/apart_location_verification"
                    icon={<GpsFixedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Apartment Enquiry"
                  />
                  <Item
                    title="Market Research Verification"
                    to="/apart_marketResearch_verification"
                    icon={<AddBusinessIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Apartment Enquiry"
                  />
                  <Item
                    title="Price proposal agreement"
                    to="/apart_price_proposal"
                    icon={<AttachMoneyIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Apartment Enquiry"
                  />
                  <Item
                    title="Payment for Legal opinion and Field survey"
                    to="/apart_payment_legal_opinion"
                    icon={<PolicyIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Apartment Enquiry"
                  />
                  <Item
                    title="Lawyer Documents"
                    to="/apart_lawyer_documents"
                    icon={<LocalPoliceIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Apartment Enquiry"
                  />
                  <Item
                    title="Field survey"
                    to="/apart_field_survey"
                    icon={<PollIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Apartment Enquiry"
                  />
                  <Item
                    title="Land Owner Agreement"
                    to="/apart_land_owner_agreement"
                    icon={<HandshakeIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Apartment Enquiry"
                  />
                  <Item
                    title="Pricing Department"
                    to="/apart_pricing_department"
                    icon={<AssuredWorkloadIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Apartment Enquiry"
                  />
                  <Item
                    title="Media Department"
                    to="/apart_media_department"
                    icon={<PermMediaIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Apartment Enquiry"
                  />
                  <Item
                    title="Content Writing"
                    to="/apart_content_Writing"
                    icon={<PostAddIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Apartment Enquiry"
                  />
                </SubMenu>
                <SubMenu
                  label="Plot Enquiry"
                  icon={<LocationCityIcon />}
                  style={{ color: "White" }}
                  open={openSubMenus["PlotEnquiry"]}
                  onClick={() => toggleSubMenu("PlotEnquiry")}
                >
                  <Item
                    title="Document Verification"
                    to="/plot_document"
                    icon={<SummarizeIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Plot Enquiry"
                  />
                  <Item
                    title="Invoice Verification"
                    to="/plot_invoice"
                    icon={<ReceiptIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Plot Enquiry"
                  />
                  <Item
                    title="Location Verification"
                    to="/plot_location"
                    icon={<GpsFixedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Plot Enquiry"
                  />
                  <Item
                    title="MarketResearch Verification"
                    to="/plot_market_research"
                    icon={<AddBusinessIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Plot Enquiry"
                  />
                  <Item
                    title="Price proposal agreement"
                    to="/plot_price_proposal"
                    icon={<AttachMoneyIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Plot Enquiry"
                  />
                  <Item
                    title="Payment for Legal opinion"
                    to="/plot_payment_legal_opinion"
                    icon={<PolicyIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Plot Enquiry"
                  />
                  <Item
                    title="Lawyer Documents"
                    to="/plot_lawyer_document"
                    icon={<LocalPoliceIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Plot Enquiry"
                  />
                  <Item
                    title="Field Survey"
                    to="/plot_field_survey"
                    icon={<PollIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Plot Enquiry"
                  />
                  <Item
                    title="LandOwnerAgreement"
                    to="/plot_landowner_agreement"
                    icon={<HandshakeIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Plot Enquiry"
                  />
                  <Item
                    title="PricingDepartment"
                    to="/plot_pricing_department"
                    icon={<AssuredWorkloadIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Plot Enquiry"
                  />
                  <Item
                    title="MediaDepartment"
                    to="/plot_media_department"
                    icon={<PermMediaIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Plot Enquiry"
                  />
                  <Item
                    title="ContentWriting"
                    to="/plot_content_writing"
                    icon={<PostAddIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Plot Enquiry"
                  />
                </SubMenu>
                <SubMenu
                  label="House Enquiry"
                  icon={<HouseIcon />}
                  style={{ color: "White" }}
                  open={openSubMenus["HouseEnquiry"]}
                  onClick={() => toggleSubMenu("HouseEnquiry")}
                >
                  <Item
                    title="Document Verification"
                    to="/house_document"
                    icon={<SummarizeIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="House Enquiry"
                  />
                  <Item
                    title="Invoice Verification"
                    to="/invoice_house"
                    icon={<ReceiptIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="House Enquiry"
                  />
                  <Item
                    title="Location Verification"
                    to="/house_location"
                    icon={<GpsFixedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="House Enquiry"
                  />
                  <Item
                    title="MarketResearch Verification"
                    to="/house_marketresearch"
                    icon={<AddBusinessIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="House Enquiry"
                  />
                  <Item
                    title="Price proposal agreement"
                    to="/house_priceproposal"
                    icon={<AttachMoneyIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="House Enquiry"
                  />
                  <Item
                    title="Payment for Legal opinion"
                    to="/house_paymentlegalopinion"
                    icon={<PolicyIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="House Enquiry"
                  />
                  <Item
                    title="Lawyer Documents"
                    to="/house_lawyerdocument"
                    icon={<LocalPoliceIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="House Enquiry"
                  />
                  <Item
                    title="Field Survey"
                    to="/house_fieldsurvey"
                    icon={<PollIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="House Enquiry"
                  />
                  <Item
                    title="LandOwnerAgreement"
                    to="/house_landowneragreement"
                    icon={<HandshakeIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="House Enquiry"
                  />
                  <Item
                    title="PricingDepartment"
                    to="/house_pricing"
                    icon={<AssuredWorkloadIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="House Enquiry"
                  />
                  <Item
                    title="MediaDepartment"
                    to="/house_media"
                    icon={<PermMediaIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="House Enquiry"
                  />
                  <Item
                    title="ContentWriting"
                    to="/house_contentwriting"
                    icon={<PostAddIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="House Enquiry"
                  />
                </SubMenu>
                <SubMenu
                  label="Layout Enquiry"
                  icon={<PictureInPictureIcon />}
                  style={{ color: "White" }}
                  open={openSubMenus["LayoutEnquiry"]}
                  onClick={() => toggleSubMenu("LayoutEnquiry")}
                >
                  <Item
                    title="Document Verification"
                    to="/layout_document"
                    icon={<SummarizeIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Layout Enquiry"
                  />
                  <Item
                    title="Invoice Verification"
                    to="/invoice_layout"
                    icon={<ReceiptIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Layout Enquiry"
                  />
                  <Item
                    title="Location Verification"
                    to="/layout_location"
                    icon={<GpsFixedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Layout Enquiry"
                  />
                  <Item
                    title="MarketResearch Verification"
                    to="/layout_marketresearch"
                    icon={<AddBusinessIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Layout Enquiry"
                  />

                  <Item
                    title="Lawyer Documents"
                    to="/layout_lawyerdocument"
                    icon={<LocalPoliceIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Layout Enquiry"
                  />
                  <Item
                    title="Field Survey"
                    to="/layout_fieldsurvey"
                    icon={<PollIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Layout Enquiry"
                  />
                  <Item
                    title="LandOwnerAgreement"
                    to="/layout_landowneragreement"
                    icon={<HandshakeIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Layout Enquiry"
                  />
                  <Item
                    title="PricingDepartment"
                    to="/layout_pricing"
                    icon={<AssuredWorkloadIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Layout Enquiry"
                  />
                  <Item
                    title="MediaDepartment"
                    to="/layout_media"
                    icon={<PermMediaIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Layout Enquiry"
                  />
                  <Item
                    title="ContentWriting"
                    to="/layout_contentwriting"
                    icon={<PostAddIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Layout Enquiry"
                  />
                </SubMenu>
                <SubMenu
                  label="Commercial Enquiry"
                  icon={<SpaIcon />}
                  style={{ color: "White" }}
                  open={openSubMenus["CommercialEnquiry"]}
                  onClick={() => toggleSubMenu("CommercialEnquiry")}
                >
                  <Item
                    title="Document Verification"
                    to="/commercial_document"
                    icon={<SummarizeIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Commercial Enquiry"
                  />
                  <Item
                    title="Invoice Verification"
                    to="/commercial_invoice"
                    icon={<ReceiptIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Commercial Enquiry"
                  />
                  <Item
                    title="Location Verification"
                    to="/commercial_location"
                    icon={<GpsFixedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Commercial Enquiry"
                  />
                  <Item
                    title="MarketResearch Verification"
                    to="/commercial_marketresearch"
                    icon={<AddBusinessIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Commercial Enquiry"
                  />
                  <Item
                    title="Price proposal agreement"
                    to="/commercial_priceproposal"
                    icon={<AttachMoneyIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Commercial Enquiry"
                  />
                  <Item
                    title="Payment for Legal opinion"
                    to="/commercial_paymentlegalopinion"
                    icon={<PolicyIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Commercial Enquiry"
                  />
                  <Item
                    title="Lawyer Documents"
                    to="/commercial_lawyerdocument"
                    icon={<LocalPoliceIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Commercial Enquiry"
                  />
                  <Item
                    title="Field Survey"
                    to="/commercial_fieldsurvey"
                    icon={<PollIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Commercial Enquiry"
                  />
                  <Item
                    title="LandOwnerAgreement"
                    to="/commercial_landowneragreement"
                    icon={<HandshakeIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Commercial Enquiry"
                  />
                  <Item
                    title="PricingDepartment"
                    to="/commercial_pricing"
                    icon={<AssuredWorkloadIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Commercial Enquiry"
                  />
                  <Item
                    title="MediaDepartment"
                    to="/commercial_media"
                    icon={<PermMediaIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Commercial Enquiry"
                  />
                  <Item
                    title="ContentWriting"
                    to="/commercial_contentwriting"
                    icon={<PostAddIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Commercial Enquiry"
                  />
                </SubMenu>
                <SubMenu
                  label="Apartment Project Enquiry"
                  icon={<FormatShapesIcon />}
                  style={{ color: "White" }}
                  open={openSubMenus["ApartmentProjectEnquiry"]}
                  onClick={() => toggleSubMenu("ApartmentProjectEnquiry")}
                >
                  <Item
                    title="Document Verification"
                    to="/aproject_document"
                    icon={<SummarizeIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Apartment Project Enquiry"
                  />
                  <Item
                    title="Location Verification"
                    to="/aproject_location"
                    icon={<GpsFixedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Apartment Project Enquiry"
                  />
                  <Item
                    title="MarketResearch Verification"
                    to="/aproject_marketresearch"
                    icon={<AddBusinessIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Apartment Project Enquiry"
                  />

                  <Item
                    title="Lawyer Documents"
                    to="/aproject_lawyerdocument"
                    icon={<LocalPoliceIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Apartment Project Enquiry"
                  />

                  <Item
                    title="LandOwnerAgreement"
                    to="/aproject_landowneragreement"
                    icon={<HandshakeIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Apartment Project Enquiry"
                  />
                  <Item
                    title="PricingDepartment"
                    to="/aproject_pricing"
                    icon={<AssuredWorkloadIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Apartment Project Enquiry"
                  />
                  <Item
                    title="MediaDepartment"
                    to="/aproject_media"
                    icon={<PermMediaIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Apartment Project Enquiry"
                  />
                  <Item
                    title="ContentWriting"
                    to="/aproject_contentwriting"
                    icon={<PostAddIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="Apartment Project Enquiry"
                  />
                </SubMenu>
                <SubMenu
                  label="After Sale"
                  icon={<LoyaltyIcon />}
                  style={{ color: "White" }}
                  open={openSubMenus["AfterSale"]}
                  onClick={() => toggleSubMenu("AfterSale")}
                >
                  <Item
                    title="Booking"
                    to="/blockingbooking"
                    icon={<BookmarkIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="After Sale"
                  />
                  {/* <Item
                    title="Payment Schedule"
                    to="/paymentschedule_AfterSale"
                    icon={<PaidIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  /> */}
                  <Item
                    title="Registration Ticket"
                    to="/registrationticket"
                    icon={<DriveFileRenameOutlineIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="After Sale"
                  />
                  <Item
                    title="Registration"
                    to="/registration"
                    icon={<DesignServicesIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="After Sale"
                  />
                  <Item
                    title="After Sale"
                    to="/aftersale"
                    icon={<LoyaltyIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    parent="After Sale"
                  />
                </SubMenu>
                {/* <SubMenu label="Property Management" icon={<LandslideIcon />} style={{ color: "red" }} open={openSubMenus['PropertyManagement']} onClick={() => toggleSubMenu('PropertyManagement')}> */}
                {/* <SubMenu label="Land" icon={<CropLandscapeIcon />} style={{ color: "red" }} open={openSubMenus['Land']} onClick={() => toggleSubMenu('Land')}>
                    <Item
                      title="New Property"
                      to="/land_new_property"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Pending Property "
                      to="/land_pending_property"
                      selected={selected}
                      setSelected={setSelected}
                    />

                    <SubMenu label="Field Survey Department" style={{ color: "red" }} open={openSubMenus['land_field_survey_report']} onClick={() => toggleSubMenu('land_field_survey_report')}>
                      <Item
                        title="Process"
                        to="/land_field_survey_report?status=new"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Pending"
                        to="/land_field_survey_report?status=pending"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Approved"
                        to="/land_field_survey_report?status=complete"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Rework"
                        to="/land_field_survey_report?status=rework"
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </SubMenu>

                    <SubMenu label="Owner Agreement" style={{ color: "red" }} open={openSubMenus['Land_owner_Agreement_Report']} onClick={() => toggleSubMenu('Land_owner_Agreement_Report')}>
                      <Item
                        title="Process"
                        to="/Land_owner_Agreement_Report?status=new"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Pending"
                        to="/Land_owner_Agreement_Report?status=pending"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Approved"
                        to="/Land_owner_Agreement_Report?status=complete"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Rework"
                        to="/Land_owner_Agreement_Report?status=rework"
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </SubMenu>

                    <SubMenu label="Admin Department" style={{ color: "red" }} open={openSubMenus['land_admin_department_report']} onClick={() => toggleSubMenu('land_admin_department_report')}>
                      <Item
                        title="Process"
                        to="/land_admin_department_report?status=new"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Pending"
                        to="/land_admin_department_report?status=pending"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Approved"
                        to="/land_admin_department_report?status=complete"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Rework"
                        to="/land_admin_department_report?status=rework"
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </SubMenu>

                    <SubMenu label="Media Department" style={{ color: "red" }} open={openSubMenus['land_media_department_report']} onClick={() => toggleSubMenu('land_media_department_report')}>
                      <Item
                        title="Process"
                        to="/land_media_department_report?status=new"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Pending"
                        to="/land_media_department_report?status=pending"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Approved"
                        to="/land_media_department_report?status=complete"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Rework"
                        to="/land_media_department_report?status=rework"
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </SubMenu>




                    <Item
                      title="Awaiting Confirmation"
                      to="/land_Awaiting_Confirmation"
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </SubMenu>  */}
                {/* <SubMenu label="Layout" icon={<AlignHorizontalCenterIcon />} style={{ color: "red" }} open={openSubMenus['Layout']} onClick={() => toggleSubMenu('Layout')}>
                    <Item
                      title="New Property"
                      to="/layout_new_property"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Pending Property "
                      to="/layout_pending_property"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <SubMenu label="Field Survey Department" style={{ color: "red" }} open={openSubMenus['land_field_survey_report_LAYOUT']} onClick={() => toggleSubMenu('land_field_survey_report_LAYOUT')}>
                      <Item
                        title="Process"
                        to="/layout_field_survey_report?status=new"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Pending"
                        to="/layout_field_survey_report?status=pending"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Approved"
                        to="/layout_field_survey_report?status=complete"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Rework"
                        to="/layout_field_survey_report?status=rework"
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </SubMenu>


                    <SubMenu label="Owner Agreement" style={{ color: "red" }} open={openSubMenus['Land_owner_Agreement_Report_layout']} onClick={() => toggleSubMenu('Land_owner_Agreement_Report_layout')}>
                      <Item
                        title="Process"
                        to="/layout_owner_Agreement_Report?status=new"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Pending"
                        to="/layout_owner_Agreement_Report?status=pending"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Approved"
                        to="/layout_owner_Agreement_Report?status=complete"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Rework"
                        to="/layout_owner_Agreement_Report?status=rework"
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </SubMenu>

                    <SubMenu label="Admin Department" style={{ color: "red" }} open={openSubMenus['land_admin_department_report_layout']} onClick={() => toggleSubMenu('land_admin_department_report_layout')}>
                      <Item
                        title="Process"
                        to="/layout_admin_department_report?status=new"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Pending"
                        to="/layout_admin_department_report?status=pending"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Approved"
                        to="/layout_admin_department_report?status=complete"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Rework"
                        to="/layout_admin_department_report?status=rework"
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </SubMenu>

                    <SubMenu label="Media Department" style={{ color: "red" }} open={openSubMenus['land_media_department_report_layout']} onClick={() => toggleSubMenu('land_media_department_report_layout')}>
                      <Item
                        title="Process"
                        to="/layout_media_department_report?status=new"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Pending"
                        to="/layout_media_department_report?status=pending"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Approved"
                        to="/layout_media_department_report?status=complete"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Rework"
                        to="/layout_media_department_report?status=rework"
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </SubMenu>


                    <Item
                      title="Awaiting Confirmation"
                      to="/layout_Awaiting_Confirmation"
                      selected={selected}
                      setSelected={setSelected}
                    />

                  </SubMenu>  */}
                {/* <SubMenu label="Apartment" icon={<ApartmentIcon />} style={{ color: "red" }} open={openSubMenus['Apartment']} onClick={() => toggleSubMenu('Apartment')}>
                <Item
                  title="New Property"
                  to="/apartment_new_property"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Pending Property "
                  to="/apartment_pending_property"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Field Survey Department"
                  to="/apartment_field_survey_report"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Owner Agreement"
                  to="/apartment_owner_Agreement_Report"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Admin Department"
                  to="/apartment_admin_department_report"  
                  selected={selected}
                  setSelected={setSelected}
                /> 
                <Item
                  title="Media Department"
                  to="/apartment_media_department_report"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Content writing Department"
                  to="/apartment_Content_writing_report"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Awaiting Confirmation"
                  to="/apartment_Awaiting_Confirmation"  
                  selected={selected}
                  setSelected={setSelected}
                />
                </SubMenu> */}
                {/* <SubMenu label="Villa" icon={<HolidayVillageIcon />} style={{ color: "red" }} open={openSubMenus['Villa']} onClick={() => toggleSubMenu('Villa')}>
                <Item
                  title="New Property"
                  to="/villa_new_property"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Pending Property "
                  to="/villa_pending_property"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Field Survey Department"
                  to="/villa_field_survey_report"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Owner Agreement"
                  to="/villa_owner_Agreement_Report"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Admin Department"
                  to="/villa_admin_department_report"  
                  selected={selected}
                  setSelected={setSelected}
                /> 
                <Item
                  title="Media Department"
                  to="/villa_media_department_report"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Content writing Department"
                  to="/villa_Content_writing_report"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Awaiting Confirmation"
                  to="/villa_Awaiting_Confirmation"  
                  selected={selected}
                  setSelected={setSelected}
                />
                </SubMenu>  */}
                {/* <SubMenu label="House" icon={<HouseSidingIcon />} style={{ color: "red" }} open={openSubMenus['House']} onClick={() => toggleSubMenu('House')}>
                <Item
                  title="New Property"
                  to="/house_new_property"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Pending Property "
                  to="/house_pending_property"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Field Survey Department"
                  to="/house_field_survey_report"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Owner Agreement"
                  to="/house_owner_Agreement_Report"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Admin Department"
                  to="/house_admin_department_report"  
                  selected={selected}
                  setSelected={setSelected}
                /> 
                <Item
                  title="Media Department"
                  to="/house_media_department_report"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Content writing Department"
                  to="/house_Content_writing_report"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Awaiting Confirmation"
                  to="/house_Awaiting_Confirmation"  
                  selected={selected}
                  setSelected={setSelected}
                />
                </SubMenu>  */}
                {/* <SubMenu label="Farm House" icon={<MapsHomeWorkIcon />} style={{ color: "red" }} open={openSubMenus['FarmHouse']} onClick={() => toggleSubMenu('FarmHouse')}>
                <Item
                  title="New Property"
                  to="/farm_house_new_property"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Pending Property "
                  to="/farm_house_pending_property"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Field Survey Department"
                  to="/farm_field_survey_report"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Owner Agreement"
                  to="/farm_house_owner_Agreement_Report"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Admin Department"
                  to="/farm_house_admin_department_report"  
                  selected={selected}
                  setSelected={setSelected}
                /> 
                <Item
                  title="Media Department"
                  to="/farm_house_media_department_report"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Content writing Department"
                  to="/farm_house_Content_writing_report"  
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Awaiting Confirmation"
                  to="/farm_house_Awaiting_Confirmation"  
                  selected={selected}
                  setSelected={setSelected}
                />
                </SubMenu>  */}
                {/* </SubMenu> */}
                {/* <SubMenu label="Plot" icon={<CabinIcon />} style={{ color: "red" }} open={openSubMenus['Plot']} onClick={() => toggleSubMenu('Plot')}>
              <Item
                title="Block Management"
                to="/block_management"  
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Area Management"
                to="/area_managements"  
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Cancel Plot"
                to="/cancel_plot"  
                selected={selected}
                setSelected={setSelected}
              />
               <Item
                title="Wallet"
                to="/wallet"  
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>  */}
                {/* <SubMenu label="Customer" icon={<SupportAgentIcon />} style={{ color: "red" }} open={openSubMenus['Customer']} onClick={() => toggleSubMenu('Customer')}>
              <Item
                title="Customer"
                to="/Customer"  
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Customer Report"
                to="/CustomerReport"  
                selected={selected}
                setSelected={setSelected}
              />
              
             </SubMenu> */}
                {/* <SubMenu label="Accounts" icon={<PaymentsIcon />} style={{ color: "red" }} open={openSubMenus['Accounts']} onClick={() => toggleSubMenu('Accounts')}>
              <Item
                title="Success Payment"
                to="/success_payment"  
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Failure Payment"
                to="/failure_payment"  
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Receipt Details"
                to="/receipt"  
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Credit Notes"
                to="/credit_notes"  
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Debit Notes"
                to="/debit_notes"  
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Payments Details"
                to="/payments"  
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Ledger"
                to="/ledger"  
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Day Book"
                to="/daybook"  
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Cash Book"
                to="/cashbook"  
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Bank Book"
                to="/bankbook"  
                selected={selected}
                setSelected={setSelected}
              /> 
          </SubMenu>  */}
                {/* <SubMenu label="Payments" icon={<PaidIcon/>} style={{ color: "red" }} open={openSubMenus['Payments']} onClick={() => toggleSubMenu('Payments')}>
              <Item
                title="Pending Payment"
                to="/pending_payment"  
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Fully Paid "
                to="/fully_paid"  
                selected={selected}
                setSelected={setSelected}
              /> 
              <Item
                title="Cancel Payment"
                to="/cancel_payment"  
                selected={selected}
                setSelected={setSelected}
              /> 
          </SubMenu>  */}
                {/* <SubMenu label="Billing" icon={<AddCardIcon/>} style={{ color: "red" }} open={openSubMenus['Billing']} onClick={() => toggleSubMenu('Billing')}>
              <Item
                title="Service Invoice"
                to="/ServiceInvoice"  
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Pending Invoice "
                to="/PendingInvoice"  
                selected={selected}
                setSelected={setSelected}
              /> 
              <Item
                title="Success Invoice "
                to="/SuccessInvoice"  
                selected={selected}
                setSelected={setSelected}
              />  
             </SubMenu> */}
                {/* <SubMenu label="Help Desk" icon={<AddCardIcon/>} style={{ color: "red" }} open={openSubMenus['HelpDesk']} onClick={() => toggleSubMenu('HelpDesk')}>
              <Item
                title="Create Ticket"
                to="/create_ticket"  
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Recent Tickets"
                to="/recent_ticket"  
                selected={selected}
                setSelected={setSelected}
              /> 
              <Item
                title="Total Tickets"
                to="/total_ticket"  
                selected={selected}
                setSelected={setSelected}
              />  
              <Item
                title="Active Tickets"
                to="/active_ticket"  
                selected={selected}
                setSelected={setSelected}
              />  
              <Item
                title="Closed Tickets"
                to="/closed_ticket"  
                selected={selected}
                setSelected={setSelected}
              />  
              <Item
                title="On-Hold Tickets"
                to="/hold_ticket"  
                selected={selected}
                setSelected={setSelected}
              />  
              <Item
                title="Over Due Tickets"
                to="/overdue_ticket"  
                selected={selected}
                setSelected={setSelected}
              />  
              <Item
                title="Assigned Tickets"
                to="/assigned_ticket"  
                selected={selected}
                setSelected={setSelected}
              />  
            </SubMenu>  */}
                {/* <SubMenu
                  label="Amenities"
                  icon={<AddCardIcon />}
                  style={{ color: "red" }}
                  open={openSubMenus["Amenities"]}
                  onClick={() => toggleSubMenu("Amenities")}
                >
                  <Item
                    title="Sub Heading Amenities"
                    to="/sub_amenitiescreate"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Amenities Creation"
                    to="/amenities_creation"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SubMenu>  */}
              </>
            )}

            {loginType === "staff" && (
              <>
                {/* <SubMenu label="Land" icon={<CropLandscapeIcon />} style={{ color: "red" }} open={openSubMenus['Land']} onClick={() => toggleSubMenu('Land')}>

                  <SubMenu label="Field Survey Department" style={{ color: "red" }} open={openSubMenus['land_field_survey_report']} onClick={() => toggleSubMenu('land_field_survey_report')}>
                    <Item
                      title="Process"
                      to="/land_field_survey_report?status=new"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Pending"
                      to="/land_field_survey_report?status=pending"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Approved"
                      to="/land_field_survey_report?status=complete"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Rework"
                      to="/land_field_survey_report?status=rework"
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </SubMenu>
                  <SubMenu label="Owner Agreement" style={{ color: "red" }} open={openSubMenus['Land_owner_Agreement_Report']} onClick={() => toggleSubMenu('Land_owner_Agreement_Report')}>
                    <Item
                      title="Process"
                      to="/Land_owner_Agreement_Report?status=new"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Pending"
                      to="/Land_owner_Agreement_Report?status=pending"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Approved"
                      to="/Land_owner_Agreement_Report?status=complete"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Rework"
                      to="/Land_owner_Agreement_Report?status=rework"
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </SubMenu>
                  <SubMenu label="Admin Department" style={{ color: "red" }} open={openSubMenus['land_admin_department_report']} onClick={() => toggleSubMenu('land_admin_department_report')}>
                    <Item
                      title="Process"
                      to="/land_admin_department_report?status=new"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Pending"
                      to="/land_admin_department_report?status=pending"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Approved"
                      to="/land_admin_department_report?status=complete"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Rework"
                      to="/land_admin_department_report?status=rework"
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </SubMenu>
                  <SubMenu label="Media Department" style={{ color: "red" }} open={openSubMenus['land_media_department_report']} onClick={() => toggleSubMenu('land_media_department_report')}>
                    <Item
                      title="Process"
                      to="/land_media_department_report?status=new"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Pending"
                      to="/land_media_department_report?status=pending"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Approved"
                      to="/land_media_department_report?status=complete"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Rework"
                      to="/land_media_department_report?status=rework"
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </SubMenu>
                </SubMenu>  */}

                {/* <SubMenu label="Layout" icon={<AlignHorizontalCenterIcon />} style={{ color: "red" }} open={openSubMenus['Layout']} onClick={() => toggleSubMenu('Layout')}>
                  <SubMenu label="Field Survey Department" style={{ color: "red" }} open={openSubMenus['land_field_survey_report_LAYOUT']} onClick={() => toggleSubMenu('land_field_survey_report_LAYOUT')}>
                    <Item
                      title="Process"
                      to="/layout_field_survey_report?status=new"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Pending"
                      to="/layout_field_survey_report?status=pending"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Approved"
                      to="/layout_field_survey_report?status=complete"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Rework"
                      to="/layout_field_survey_report?status=rework"
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </SubMenu>
                  <SubMenu label="Owner Agreement" style={{ color: "red" }} open={openSubMenus['Land_owner_Agreement_Report_layout']} onClick={() => toggleSubMenu('Land_owner_Agreement_Report_layout')}>
                    <Item
                      title="Process"
                      to="/layout_owner_Agreement_Report?status=new"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Pending"
                      to="/layout_owner_Agreement_Report?status=pending"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Approved"
                      to="/layout_owner_Agreement_Report?status=complete"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Rework"
                      to="/layout_owner_Agreement_Report?status=rework"
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </SubMenu>

                  <SubMenu label="Admin Department" style={{ color: "red" }} open={openSubMenus['land_admin_department_report_layout']} onClick={() => toggleSubMenu('land_admin_department_report_layout')}>
                    <Item
                      title="Process"
                      to="/layout_admin_department_report?status=new"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Pending"
                      to="/layout_admin_department_report?status=pending"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Approved"
                      to="/layout_admin_department_report?status=complete"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Rework"
                      to="/layout_admin_department_report?status=rework"
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </SubMenu>
                  <SubMenu label="Media Department" style={{ color: "red" }} open={openSubMenus['land_media_department_report_layout']} onClick={() => toggleSubMenu('land_media_department_report_layout')}>
                    <Item
                      title="Process"
                      to="/layout_media_department_report?status=new"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Pending"
                      to="/layout_media_department_report?status=pending"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Approved"
                      to="/layout_media_department_report?status=complete"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Rework"
                      to="/layout_media_department_report?status=rework"
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </SubMenu>
                </SubMenu>  */}

                {/* <SubMenu
                  label="TeleCall"
                  icon={<AddIcCallIcon />}
                  style={{ color: "red" }}
                  open={openSubMenus["Enquiry"]}
                  onClick={() => toggleSubMenu("Enquiry")}
                >
                  <Item
                    title="Customer Support"
                    to="/tel_call_enquiry_report?customer"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Technical Support"
                    to="/tel_call_enquiry_report?technical"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Sales Department"
                    to="/tel_call_enquiry_report?sales"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Billing Department"
                    to="/tel_call_enquiry_report?billing"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                      title="Process enquiry"
                      to="/pending_enquiry"  
                      selected={selected}
                      setSelected={setSelected}
                    />
                </SubMenu> */}
                {pages?.includes(
                  "Get patta" ||
                  "Find your property" ||
                  "Legal opinion" ||
                  "Land survey" ||
                  "Property valuation" ||
                  "Missing documents"
                ) && (
                    <SubMenu
                      label="Service"
                      icon={<ManageAccountsIcon />}
                      style={{ color: "White" }}
                      open={openSubMenus["LandService"]}
                      onClick={() => toggleSubMenu("LandService")}
                    >
                      {pages?.includes("Get patta") && (
                        <SubMenu
                          label="Get Patta"
                          icon={<ArticleIcon />}
                          style={{ color: "White" }}
                          open={openSubMenus["GetPatta"]}
                          onClick={() => toggleSubMenu("GetPatta")}
                        >
                          <Item
                            title="Document Verification"
                            to="/service_document"
                            // icon={<SummarizeIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Get Patta"
                          />

                          <Item
                            title="Location Verification"
                            to="/location_service"
                            // icon={<GpsFixedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Get Patta"
                          />

                          <Item
                            title=" Service Confirmation"
                            to="/cofirm_service"
                            // icon={<SettingsSuggestIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Get Patta"
                          />

                          <Item
                            title="Invoice & Payment"
                            to="/invoice_service"
                            // icon={<RequestPageIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Get Patta"
                          />
                          <Item
                            title="Patta Application"
                            to="/patta_appalication"
                            // icon={<AssignmentIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Get Patta"
                          />
                          <Item
                            title="Ticket Assigning Hub"
                            to="/tickethub"
                            // icon={<AssignmentIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Get Patta"
                          />
                        </SubMenu>
                      )}
                      {pages?.includes("Find your property") && (
                        <SubMenu
                          label="Find Your Property"
                          icon={<SearchIcon />}
                          style={{ color: "White" }}
                          open={openSubMenus["FindProperty"]}
                          onClick={() => toggleSubMenu("FindProperty")}
                        >
                          <Item
                            title="Document Verification"
                            to="/documentmap"
                            // icon={<SummarizeIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Find Your Property"
                          />

                          <Item
                            title="Location Verification"
                            to="/locationmap"
                            // icon={<GpsFixedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Find Your Property"
                          />
                        </SubMenu>
                      )}
                      {pages?.includes("Legal opinion") && (
                        <SubMenu
                          label="Legal Opinion"
                          icon={<PolicyIcon />}
                          style={{ color: "White" }}
                          open={openSubMenus["LegalOpinion"]}
                          onClick={() => toggleSubMenu("LegalOpinion")}
                        >
                          <Item
                            title="Document Verification"
                            to="/documentlegalopinion"
                            // icon={<SummarizeIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Legal Opinion"
                          />

                          <Item
                            title="Location Verification"
                            to="/location_legal"
                            // icon={<GpsFixedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Legal Opinion"
                          />
                          <Item
                            title="Service Confirmation "
                            to="/cofirm_service_legal"
                            // icon={<GpsFixedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Legal Opinion"
                          />
                          <Item
                            title="Payment For Legal Opinion "
                            to="/payment_legal_opinion"
                            // icon={<GpsFixedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Legal Opinion"
                          />

                          <Item
                            title="Legal Opinion By Lawyer "
                            to="/legalopinionlawyer"
                            // icon={<GpsFixedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Legal Opinion"
                          />
                        </SubMenu>
                      )}

                      {pages?.includes("Land survey") && (
                        <SubMenu
                          label="Land Survey"
                          icon={<DomainAddIcon />}
                          style={{ color: "White" }}
                          open={openSubMenus["LandSurvey"]}
                          onClick={() => toggleSubMenu("LandSurvey")}
                        >
                          <Item
                            title="Document Verification"
                            to="/documentlandsurvey"
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Land Survey"
                          />
                          <Item
                            title="Location Verification"
                            to="/location_survey"
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Land Survey"
                          />

                          <Item
                            title=" Service Confirmation"
                            to="/service_confirm_survey"
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Land Survey"
                          />

                          <Item
                            title="Invoice & Payment"
                            to="/invoice_survey"
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Land Survey"
                          />
                          <Item
                            title="Application"
                            to="/application_survey"
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Land Survey"
                          />
                          <Item
                            title="Mandadory Docs"
                            to="/mandadory_survey"
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Land Survey"
                          />
                          <Item
                            title="Ticket Assigning Hub"
                            to="/ticket_assigning_hub"
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Land Survey"
                          />
                        </SubMenu>
                      )}

                      {pages?.includes("Property valuation") && (
                        <SubMenu
                          label="Property Valuation"
                          icon={<NaturePeopleIcon />}
                          style={{ color: "White" }}
                          open={openSubMenus["PropertyValuation"]}
                          onClick={() => toggleSubMenu("PropertyValuation")}
                        >
                          <Item
                            title="Document Verification"
                            to="/docvaluation"
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Property Valuation"
                          />
                          <Item
                            title="Location Verification"
                            to="/location_valuation"
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Property Valuation"
                          />

                          <Item
                            title=" Service Confirmation"
                            to="/service_confirm_valuation"
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Property Valuation"
                          />
                          <Item
                            title="Invoice & Payment"
                            to="/invoice_valuation"
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Property Valuation"
                          />

                          <Item
                            title="Ticket Assigning Hub"
                            to="/ticket_hub_valuation"
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Property Valuation"
                          />
                        </SubMenu>
                      )}
                      {pages.includes("Missing documents") && (
                        <SubMenu
                          label="Missing Documents"
                          icon={<DynamicFeedIcon />}
                          style={{ color: "White" }}
                          open={openSubMenus["MissingDocuments"]}
                          onClick={() => toggleSubMenu("MissingDocuments")}
                        >
                          <Item
                            title="Document Verification"
                            to="/doc_verif_missing"
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Missing Documents"
                          />
                          <Item
                            title="Location Verification"
                            to="/location_missing"
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Missing Documents"
                          />

                          <Item
                            title="Service Confirmation"
                            to="/service_confirm_missing"
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Missing Documents"
                          />
                          <Item
                            title="Invoice & Payment"
                            to="/invoice_payment_missing"
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Missing Documents"
                          />

                          <Item
                            title="Ticket Assigning Hub"
                            to="/ticket_hub_missing"
                            selected={selected}
                            setSelected={setSelected}
                            bigparent="Service"
                            parent="Missing Documents"
                          />
                        </SubMenu>
                      )}
                    </SubMenu>
                  )}
                {pages?.includes(
                  "Document verification" ||
                  "Advance" ||
                  "Location verification" ||
                  "Market research" ||
                  "Price proposal" ||
                  "Payment for legal opinion" ||
                  "Lawyer documents" ||
                  "Mandatory document" ||
                  "Field survey" ||
                  "Landowner agreement" ||
                  "Pricing department" ||
                  "Media department" ||
                  "Content writing"
                ) && (
                    <SubMenu
                      label="Land Enquiry"
                      icon={<NotificationsActiveIcon />}
                      style={{ color: "White" }}
                      open={openSubMenus["LandEnquiry"]}
                      onClick={() => toggleSubMenu("LandEnquiry")}
                    >
                      {pages?.includes("Document verification") && (
                        <Item
                          title="Document Verification"
                          to="/document_verification"
                          icon={<SummarizeIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Land Enquiry"
                        />
                      )}
                      {pages?.includes("Advance") && (
                        <Item
                          title="Invoice Verification"
                          to="/invoice_verification"
                          icon={<ReceiptIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Land Enquiry"
                        />
                      )}
                      {pages?.includes("Location verification") && (
                        <Item
                          title="Location Verification"
                          to="/location_verification"
                          icon={<GpsFixedIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Land Enquiry"
                        />
                      )}
                      {pages?.includes("Market research") && (
                        <Item
                          title="Market Research Verification"
                          to="/market_research_verification"
                          icon={<AddBusinessIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Land Enquiry"
                        />
                      )}
                      {pages?.includes("Price proposal") && (
                        <Item
                          title="Price proposal agreement"
                          to="/price_proposal_agreement_report"
                          icon={<AttachMoneyIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Land Enquiry"
                        />
                      )}
                      {pages?.includes("Payment for legal opinion") && (
                        <Item
                          title="Payment for Legal opinion and Field survey"
                          to="/payment_legal_opinion_report"
                          icon={<PolicyIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Land Enquiry"
                        />
                      )}
                      {pages?.includes("Lawyer documents") && (
                        <Item
                          title="Lawyer Documents"
                          to="/lawyer_documents"
                          icon={<LocalPoliceIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Land Enquiry"
                        />
                      )}
                      {pages?.includes("Mandatory document") && (
                        <Item
                          title="Mandatory docs"
                          to="/mandatory_docs"
                          icon={<PriorityHighIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Land Enquiry"
                        />
                      )}
                      {pages?.includes("Field survey") && (
                        <Item
                          title="Field survey"
                          to="/enq_fieldsurvey"
                          icon={<PollIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Land Enquiry"
                        />
                      )}
                      {pages?.includes("Landowner agreement") && (
                        <Item
                          title="Land Owner Agreement"
                          to="/land_owner_report"
                          icon={<HandshakeIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Land Enquiry"
                        />
                      )}
                      {pages?.includes("Pricing department") && (
                        <Item
                          title="Pricing Department"
                          to="/pricingDepartment"
                          icon={<AssuredWorkloadIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Land Enquiry"
                        />
                      )}
                      {pages?.includes("Media department") && (
                        <Item
                          title="Media Department"
                          to="/mediaDepartment"
                          icon={<PermMediaIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Land Enquiry"
                        />
                      )}
                      {pages?.includes("Content writing") && (
                        <Item
                          title="Content Writing"
                          to="/contentWriting"
                          icon={<PostAddIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Land Enquiry"
                        />
                      )}
                    </SubMenu>
                  )}
                {pages?.includes(
                  "Document verification" ||
                  "Advance" ||
                  "Location verification" ||
                  "Market research" ||
                  "Price proposal" ||
                  "Payment for legal opinion" ||
                  "Lawyer documents" ||
                  "Mandatory document" ||
                  "Field survey" ||
                  "Landowner agreement" ||
                  "Pricing department" ||
                  "Media department" ||
                  "Content writing"
                ) && (
                    <SubMenu
                      label="Apartment Enquiry"
                      icon={<ApartmentIcon />}
                      style={{ color: "White" }}
                      open={openSubMenus["ApartEnquiry"]}
                      onClick={() => toggleSubMenu("ApartEnquiry")}
                    >
                      {pages?.includes("Document verification") && (
                        <Item
                          title="Document Verification"
                          to="/apart_document_verification"
                          icon={<SummarizeIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Apartment Enquiry"
                        />
                      )}
                      {pages?.includes("Advance") && (
                        <Item
                          title="Invoice Verification"
                          to="/apart_invoice_verification"
                          icon={<ReceiptIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Apartment Enquiry"
                        />
                      )}
                      {pages?.includes("Location verification") && (
                        <Item
                          title="Location Verification"
                          to="/apart_location_verification"
                          icon={<GpsFixedIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Apartment Enquiry"
                        />
                      )}
                      {pages?.includes("Market research") && (
                        <Item
                          title="Market Research Verification"
                          to="/apart_marketResearch_verification"
                          icon={<AddBusinessIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Apartment Enquiry"
                        />
                      )}
                      {pages?.includes("Price proposal") && (
                        <Item
                          title="Price proposal agreement"
                          to="/apart_price_proposal"
                          icon={<AttachMoneyIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Apartment Enquiry"
                        />
                      )}
                      {pages?.includes("Payment for legal opinion") && (
                        <Item
                          title="Payment for Legal opinion and Field survey"
                          to="/apart_payment_legal_opinion"
                          icon={<PolicyIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Apartment Enquiry"
                        />
                      )}
                      {pages?.includes("Lawyer documents") && (
                        <Item
                          title="Lawyer Documents"
                          to="/apart_lawyer_documents"
                          icon={<LocalPoliceIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Apartment Enquiry"
                        />
                      )}
                      {pages?.includes("Mandatory document") && (
                        <Item
                          title="Field survey"
                          to="/apart_field_survey"
                          icon={<PollIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Apartment Enquiry"
                        />
                      )}
                      {pages?.includes("Landowner agreement") && (
                        <Item
                          title="Land Owner Agreement"
                          to="/apart_land_owner_agreement"
                          icon={<HandshakeIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Apartment Enquiry"
                        />
                      )}
                      {pages?.includes("Pricing department") && (
                        <Item
                          title="Pricing Department"
                          to="/apart_pricing_department"
                          icon={<AssuredWorkloadIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Apartment Enquiry"
                        />
                      )}
                      {pages?.includes("Media department") && (
                        <Item
                          title="Media Department"
                          to="/apart_media_department"
                          icon={<PermMediaIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Apartment Enquiry"
                        />
                      )}
                      {pages?.includes("Content writing") && (
                        <Item
                          title="Content Writing"
                          to="/apart_content_Writing"
                          icon={<PostAddIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Apartment Enquiry"
                        />
                      )}
                    </SubMenu>
                  )}

                {pages?.includes(
                  "Document verification" ||
                  "Advance" ||
                  "Location verification" ||
                  "Market research" ||
                  "Price proposal" ||
                  "Payment for legal opinion" ||
                  "Lawyer documents" ||
                  "Mandatory document" ||
                  "Field survey" ||
                  "Landowner agreement" ||
                  "Pricing department" ||
                  "Media department" ||
                  "Content writing"
                ) && (
                    <SubMenu
                      label="Plot Enquiry"
                      icon={<LocationCityIcon />}
                      style={{ color: "White" }}
                      open={openSubMenus["PlotEnquiry"]}
                      onClick={() => toggleSubMenu("PlotEnquiry")}
                    >
                      {pages?.includes("Document verification") && (
                        <Item
                          title="Document Verification"
                          to="/plot_document"
                          icon={<SummarizeIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Plot Enquiry"
                        />
                      )}
                      {pages?.includes("Advance") && (
                        <Item
                          title="Invoice Verification"
                          to="/plot_invoice"
                          icon={<ReceiptIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Plot Enquiry"
                        />
                      )}
                      {pages?.includes("Location verification") && (
                        <Item
                          title="Location Verification"
                          to="/plot_location"
                          icon={<GpsFixedIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Plot Enquiry"
                        />
                      )}
                      {pages?.includes("Market research") && (
                        <Item
                          title="MarketResearch Verification"
                          to="/plot_market_research"
                          icon={<AddBusinessIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Plot Enquiry"
                        />
                      )}
                      {pages?.includes("Price proposal") && (
                        <Item
                          title="Price proposal agreement"
                          to="/plot_price_proposal"
                          icon={<AttachMoneyIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Plot Enquiry"
                        />
                      )}
                      {pages?.includes("Payment for legal opinion") && (
                        <Item
                          title="Payment for Legal opinion"
                          to="/plot_payment_legal_opinion"
                          icon={<PolicyIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Plot Enquiry"
                        />
                      )}

                      {pages?.includes("Lawyer documents") && (
                        <Item
                          title="Lawyer Documents"
                          to="/plot_lawyer_document"
                          icon={<LocalPoliceIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Plot Enquiry"
                        />
                      )}
                      {pages?.includes("Field survey") && (
                        <Item
                          title="Field Survey"
                          to="/plot_field_survey"
                          icon={<PollIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Plot Enquiry"
                        />
                      )}
                      {pages?.includes("Landowner agreement") && (
                        <Item
                          title="LandOwnerAgreement"
                          to="/plot_landowner_agreement"
                          icon={<HandshakeIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Plot Enquiry"
                        />
                      )}
                      {pages?.includes("Pricing department") && (
                        <Item
                          title="PricingDepartment"
                          to="/plot_pricing_department"
                          icon={<AssuredWorkloadIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Plot Enquiry"
                        />
                      )}
                      {pages?.includes("Media department") && (
                        <Item
                          title="MediaDepartment"
                          to="/plot_media_department"
                          icon={<PermMediaIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Plot Enquiry"
                        />
                      )}
                      {pages?.includes("Content writing") && (
                        <Item
                          title="ContentWriting"
                          to="/plot_content_writing"
                          icon={<PostAddIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Plot Enquiry"
                        />
                      )}
                    </SubMenu>
                  )}

                {pages?.includes(
                  "Document verification" ||
                  "Advance" ||
                  "Location verification" ||
                  "Market research" ||
                  "Price proposal" ||
                  "Payment for legal opinion" ||
                  "Lawyer documents" ||
                  "Mandatory document" ||
                  "Field survey" ||
                  "Landowner agreement" ||
                  "Pricing department" ||
                  "Media department" ||
                  "Content writing"
                ) && (
                    <SubMenu
                      label="House Enquiry"
                      icon={<HouseIcon />}
                      style={{ color: "White" }}
                      open={openSubMenus["HouseEnquiry"]}
                      onClick={() => toggleSubMenu("HouseEnquiry")}
                    >
                      {pages?.includes("Document verification") && (
                        <Item
                          title="Document Verification"
                          to="/house_document"
                          icon={<SummarizeIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="House Enquiry"
                        />
                      )}
                      {pages?.includes("Advance") && (
                        <Item
                          title="Invoice Verification"
                          to="/invoice_house"
                          icon={<ReceiptIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="House Enquiry"
                        />
                      )}
                      {pages?.includes("Location verification") && (
                        <Item
                          title="Location Verification"
                          to="/house_location"
                          icon={<GpsFixedIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="House Enquiry"
                        />
                      )}
                      {pages?.includes("Market research") && (
                        <Item
                          title="MarketResearch Verification"
                          to="/house_marketresearch"
                          icon={<AddBusinessIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="House Enquiry"
                        />
                      )}
                      {pages?.includes("Price proposal") && (
                        <Item
                          title="Price proposal agreement"
                          to="/house_priceproposal"
                          icon={<AttachMoneyIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="House Enquiry"
                        />
                      )}
                      {pages?.includes("Payment for legal opinion") && (
                        <Item
                          title="Payment for Legal opinion"
                          to="/house_paymentlegalopinion"
                          icon={<PolicyIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="House Enquiry"
                        />
                      )}

                      {pages?.includes("Lawyer documents") && (
                        <Item
                          title="Lawyer Documents"
                          to="/house_lawyerdocument"
                          icon={<LocalPoliceIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="House Enquiry"
                        />
                      )}
                      {pages?.includes("Field survey") && (
                        <Item
                          title="Field Survey"
                          to="/house_fieldsurvey"
                          icon={<PollIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="House Enquiry"
                        />
                      )}
                      {pages?.includes("Landowner agreement") && (
                        <Item
                          title="LandOwnerAgreement"
                          to="/house_landowneragreement"
                          icon={<HandshakeIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="House Enquiry"
                        />
                      )}
                      {pages?.includes("Pricing department") && (
                        <Item
                          title="PricingDepartment"
                          to="/house_pricing"
                          icon={<AssuredWorkloadIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="House Enquiry"
                        />
                      )}
                      {pages?.includes("Media department") && (
                        <Item
                          title="MediaDepartment"
                          to="/house_media"
                          icon={<PermMediaIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="House Enquiry"
                        />
                      )}
                      {pages?.includes("Content writing") && (
                        <Item
                          title="ContentWriting"
                          to="/house_contentwriting"
                          icon={<PostAddIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="House Enquiry"
                        />
                      )}
                    </SubMenu>
                  )}

                {pages?.includes(
                  "Document verification" ||
                  "Advance" ||
                  "Location verification" ||
                  "Market research" ||
                  "Price proposal" ||
                  "Payment for legal opinion" ||
                  "Lawyer documents" ||
                  "Mandatory document" ||
                  "Field survey" ||
                  "Landowner agreement" ||
                  "Pricing department" ||
                  "Media department" ||
                  "Content writing"
                ) && (
                    <SubMenu
                      label="Layout Enquiry"
                      icon={<PictureInPictureIcon />}
                      style={{ color: "White" }}
                      open={openSubMenus["LayoutEnquiry"]}
                      onClick={() => toggleSubMenu("LayoutEnquiry")}
                    >
                      {pages?.includes("Document verification") && (
                        <Item
                          title="Document Verification"
                          to="/layout_document"
                          icon={<SummarizeIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Layout Enquiry"
                        />
                      )}
                      {pages?.includes("Advance") && (
                        <Item
                          title="Invoice Verification"
                          to="/invoice_layout"
                          icon={<ReceiptIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Layout Enquiry"
                        />
                      )}
                      {pages?.includes("Location verification") && (
                        <Item
                          title="Location Verification"
                          to="/layout_location"
                          icon={<GpsFixedIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Layout Enquiry"
                        />
                      )}
                      {pages?.includes("Market research") && (
                        <Item
                          title="MarketResearch Verification"
                          to="/layout_marketresearch"
                          icon={<AddBusinessIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Layout Enquiry"
                        />
                      )}
                      {pages?.includes("Lawyer documents") && (
                        <Item
                          title="Lawyer Documents"
                          to="/layout_lawyerdocument"
                          icon={<LocalPoliceIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Layout Enquiry"
                        />
                      )}
                      {pages?.includes("Field survey") && (
                        <Item
                          title="Field Survey"
                          to="/layout_fieldsurvey"
                          icon={<PollIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Layout Enquiry"
                        />
                      )}
                      {pages?.includes("Landowner agreement") && (
                        <Item
                          title="LandOwnerAgreement"
                          to="/layout_landowneragreement"
                          icon={<HandshakeIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Layout Enquiry"
                        />
                      )}
                      {pages?.includes("Pricing department") && (
                        <Item
                          title="PricingDepartment"
                          to="/layout_pricing"
                          icon={<AssuredWorkloadIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Layout Enquiry"
                        />
                      )}
                      {pages?.includes("Media department") && (
                        <Item
                          title="MediaDepartment"
                          to="/layout_media"
                          icon={<PermMediaIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Layout Enquiry"
                        />
                      )}
                      {pages?.includes("Content writing") && (
                        <Item
                          title="ContentWriting"
                          to="/layout_contentwriting"
                          icon={<PostAddIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Layout Enquiry"
                        />
                      )}
                    </SubMenu>
                  )}
                {pages?.includes(
                  "Document verification" ||
                  "Advance" ||
                  "Location verification" ||
                  "Market research" ||
                  "Price proposal" ||
                  "Payment for legal opinion" ||
                  "Lawyer documents" ||
                  "Mandatory document" ||
                  "Field survey" ||
                  "Landowner agreement" ||
                  "Pricing department" ||
                  "Media department" ||
                  "Content writing"
                ) && (
                    <SubMenu
                      label="Commercial Enquiry"
                      icon={<SpaIcon />}
                      style={{ color: "White" }}
                      open={openSubMenus["CommercialEnquiry"]}
                      onClick={() => toggleSubMenu("CommercialEnquiry")}
                    >
                      {pages?.includes("Document verification") && (
                        <Item
                          title="Document Verification"
                          to="/commercial_document"
                          icon={<SummarizeIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Commercial Enquiry"
                        />
                      )}
                      {pages?.includes("Advance") && (
                        <Item
                          title="Invoice Verification"
                          to="/commercial_invoice"
                          icon={<ReceiptIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Commercial Enquiry"
                        />
                      )}

                      {pages?.includes("Location verification") && (
                        <Item
                          title="Location Verification"
                          to="/commercial_location"
                          icon={<GpsFixedIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Commercial Enquiry"
                        />
                      )}
                      {pages?.includes("Market research") && (
                        <Item
                          title="MarketResearch Verification"
                          to="/commercial_marketresearch"
                          icon={<AddBusinessIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Commercial Enquiry"
                        />
                      )}

                      {pages?.includes("Price proposal") && (
                        <Item
                          title="Price proposal agreement"
                          to="/commercial_priceproposal"
                          icon={<AttachMoneyIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Commercial Enquiry"
                        />
                      )}
                      {pages?.includes("Payment for legal opinion") && (
                        <Item
                          title="Payment for Legal opinion"
                          to="/commercial_paymentlegalopinion"
                          icon={<PolicyIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Commercial Enquiry"
                        />
                      )}

                      {pages?.includes("Lawyer documents") && (
                        <Item
                          title="Lawyer Documents"
                          to="/commercial_lawyerdocument"
                          icon={<LocalPoliceIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Commercial Enquiry"
                        />
                      )}
                      {pages?.includes("Field survey") && (
                        <Item
                          title="Field Survey"
                          to="/commercial_fieldsurvey"
                          icon={<PollIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Commercial Enquiry"
                        />
                      )}

                      {pages?.includes("Landowner agreement") && (
                        <Item
                          title="LandOwnerAgreement"
                          to="/commercial_landowneragreement"
                          icon={<HandshakeIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Commercial Enquiry"
                        />
                      )}

                      {pages?.includes("Pricing department") && (
                        <Item
                          title="PricingDepartment"
                          to="/commercial_pricing"
                          icon={<AssuredWorkloadIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Commercial Enquiry"
                        />
                      )}

                      {pages?.includes("Media department") && (
                        <Item
                          title="MediaDepartment"
                          to="/commercial_media"
                          icon={<PermMediaIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Commercial Enquiry"
                        />
                      )}

                      {pages?.includes("Content writing") && (
                        <Item
                          title="ContentWriting"
                          to="/commercial_contentwriting"
                          icon={<PostAddIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Commercial Enquiry"
                        />
                      )}
                    </SubMenu>
                  )}

                {pages?.includes(
                  "Document verification" ||
                  "Advance" ||
                  "Location verification" ||
                  "Market research" ||
                  "Price proposal" ||
                  "Payment for legal opinion" ||
                  "Lawyer documents" ||
                  "Mandatory document" ||
                  "Field survey" ||
                  "Landowner agreement" ||
                  "Pricing department" ||
                  "Media department" ||
                  "Content writing"
                ) && (
                    <SubMenu
                      label="Apartment Project Enquiry"
                      icon={<FormatShapesIcon />}
                      style={{ color: "White" }}
                      open={openSubMenus["ApartmentProjectEnquiry"]}
                      onClick={() => toggleSubMenu("ApartmentProjectEnquiry")}
                    >
                      {pages?.includes("Document verification") && (
                        <Item
                          title="Document Verification"
                          to="/aproject_document"
                          icon={<SummarizeIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Apartment Project Enquiry"
                        />
                      )}
                      {pages?.includes("Location verification") && (
                        <Item
                          title="Location Verification"
                          to="/aproject_location"
                          icon={<GpsFixedIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Apartment Project Enquiry"
                        />
                      )}
                      {pages?.includes("Market research") && (
                        <Item
                          title="MarketResearch Verification"
                          to="/aproject_marketresearch"
                          icon={<AddBusinessIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Apartment Project Enquiry"
                        />
                      )}

                      {pages?.includes("Lawyer documents") && (
                        <Item
                          title="Lawyer Documents"
                          to="/aproject_lawyerdocument"
                          icon={<LocalPoliceIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Apartment Project Enquiry"
                        />
                      )}
                      {pages?.includes("Landowner agreement") && (
                        <Item
                          title="LandOwnerAgreement"
                          to="/aproject_landowneragreement"
                          icon={<HandshakeIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Apartment Project Enquiry"
                        />
                      )}

                      {pages?.includes("Pricing department") && (
                        <Item
                          title="PricingDepartment"
                          to="/aproject_pricing"
                          icon={<AssuredWorkloadIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Apartment Project Enquiry"
                        />
                      )}

                      {pages?.includes("Media department") && (
                        <Item
                          title="MediaDepartment"
                          to="/aproject_media"
                          icon={<PermMediaIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Apartment Project Enquiry"
                        />
                      )}
                      {pages?.includes("Content writing") && (
                        <Item
                          title="ContentWriting"
                          to="/aproject_contentwriting"
                          icon={<PostAddIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          parent="Apartment Project Enquiry"
                        />
                      )}
                    </SubMenu>
                  )}

                {pages?.includes("After sales") && (
                  <SubMenu
                    label="After Sale"
                    icon={<LoyaltyIcon />}
                    style={{ color: "White" }}
                    open={openSubMenus["AfterSale"]}
                    onClick={() => toggleSubMenu("AfterSale")}
                  >
                    <Item
                      title="Booking"
                      to="/blockingbooking"
                      icon={<BookmarkIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      parent="After Sale"
                    />
                    {/* <Item
                      title="Payment Schedule"
                      to="/paymentschedule_AfterSale"
                      icon={<PaidIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    /> */}
                    <Item
                      title="Registration Ticket"
                      to="/registrationticket"
                      icon={<DriveFileRenameOutlineIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      parent="After Sale"
                    />
                    <Item
                      title="Registration"
                      to="/registration"
                      icon={<DesignServicesIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      parent="After Sale"
                    />
                    <Item
                      title="After Sale"
                      to="/aftersale"
                      icon={<LoyaltyIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      parent="After Sale"
                    />
                  </SubMenu>
                )}

                {pages?.includes("Telecalling") && (
                  <>
                    <SubMenu
                      label="TeleCall"
                      icon={<AddIcCallIcon />}
                      style={{ color: "White" }}
                      open={openSubMenus["Enquiry"]}
                      onClick={() => toggleSubMenu("Enquiry")}
                    >
                      <Item
                        title="Document verification"
                        to="/telecalling_documentverification"
                        selected={selected}
                        setSelected={setSelected}
                        parent="TeleCall"
                      />
                      <Item
                        title="Invoice Verification"
                        to="/telecalling_advance"
                        selected={selected}
                        setSelected={setSelected}
                        parent="TeleCall"
                      />
                      <Item
                        title="Price proposal"
                        to="/telecalling_proposal"
                        selected={selected}
                        setSelected={setSelected}
                        parent="TeleCall"
                      />
                      <Item
                        title="Payment for legal opinion"
                        to="/telecalling_paymentlegal"
                        selected={selected}
                        setSelected={setSelected}
                        parent="TeleCall"
                      />
                      <Item
                        title="Booking"
                        to="/telecalling_booking"
                        selected={selected}
                        setSelected={setSelected}
                        parent="TeleCall"
                      />
                      <Item
                        title="Registration Ticket"
                        to="/telecalling_registrationticket"
                        selected={selected}
                        setSelected={setSelected}
                        parent="TeleCall"
                      />
                      <Item
                        title="Service Confirmation"
                        to="/serviceconfirm"
                        selected={selected}
                        setSelected={setSelected}
                        parent="TeleCall"
                      />
                      <Item
                        title="Service Payment"
                        to="/servicepayment"
                        selected={selected}
                        setSelected={setSelected}
                        parent="TeleCall"
                      />
                    </SubMenu>
                  </>
                )}

                {pages?.includes("CMS") && (
                  <SubMenu
                    label="CMS"
                    icon={<PeopleOutlinedIcon />}
                    style={{ color: "White" }}
                    open={openSubMenus["CMS"]}
                    onClick={() => toggleSubMenu("CMS")}
                  >
                    <SubMenu
                      label="Home"
                      icon={<PeopleOutlinedIcon />}
                      style={{ color: "red" }}
                      open={openSubMenus["Home"]}
                      onClick={() => toggleSubMenu("Home")}
                    >
                      <Item
                        title="BannerImage"
                        to="/bannerimage"
                        selected={selected}
                        setSelected={setSelected}
                        bigparent="CMS"
                        parent="Home"
                      />
                      <Item
                        title="Ad Block1"
                        to="/adblock1"
                        selected={selected}
                        setSelected={setSelected}
                        bigparent="CMS"
                        parent="Home"
                      />
                      <Item
                        title="Todays Deals"
                        to="/todaysdeals"
                        selected={selected}
                        setSelected={setSelected}
                        bigparent="CMS"
                        parent="Home"
                      />
                      <Item
                        title="Promotion Banner"
                        to="/promotionBner"
                        selected={selected}
                        setSelected={setSelected}
                        bigparent="CMS"
                        parent="Home"
                      />

                      <Item
                        title="PremiumProperties"
                        to="/premiumproperties"
                        selected={selected}
                        setSelected={setSelected}
                        bigparent="CMS"
                        parent="Home"
                      />
                      <Item
                        title="Ad Block2"
                        to="/adblock2"
                        selected={selected}
                        setSelected={setSelected}
                        bigparent="CMS"
                        parent="Home"
                      />

                      <Item
                        title="CouponCorner"
                        to="/couponcorner"
                        selected={selected}
                        setSelected={setSelected}
                        bigparent="CMS"
                        parent="Home"
                      />
                      <Item
                        title="Promotion Banner2"
                        to="/promotionBner2"
                        selected={selected}
                        setSelected={setSelected}
                        bigparent="CMS"
                        parent="Home"
                      />

                      <Item
                        title="HighReturnsProperties"
                        to="/highreturnsproperties"
                        selected={selected}
                        setSelected={setSelected}
                        bigparent="CMS"
                        parent="Home"
                      />

                      <Item
                        title="Ad Block3"
                        to="/adblock3"
                        selected={selected}
                        setSelected={setSelected}
                        bigparent="CMS"
                        parent="Home"
                      />

                      <Item
                        title="Promotion Banner3"
                        to="/promotionBner3"
                        selected={selected}
                        setSelected={setSelected}
                        bigparent="CMS"
                        parent="Home"
                      />
                      <Item
                        title="Footer"
                        to="/footer"
                        selected={selected}
                        setSelected={setSelected}
                        bigparent="CMS"
                        parent="Home"
                      />
                      <Item
                        title="ContactUs"
                        to="/contactus"
                        selected={selected}
                        setSelected={setSelected}
                        bigparent="CMS"
                        parent="Home"
                      />
                      <Item
                        title="AboutUs"
                        to="/aboutUs"
                        selected={selected}
                        setSelected={setSelected}
                        bigparent="CMS"
                        parent="Home"
                      />
                    </SubMenu>
                    <SubMenu
                      label="Service"
                      icon={<PeopleOutlinedIcon />}
                      style={{ color: "red" }}
                      open={openSubMenus["Service"]}
                      onClick={() => toggleSubMenu("Service")}
                    >
                      <SubMenu
                        label="Home"
                        icon={<PeopleOutlinedIcon />}
                        style={{ color: "red" }}
                        open={openSubMenus["HomeService"]}
                        onClick={() => toggleSubMenu("HomeService")}
                      >
                        <Item
                          title="BannerImage"
                          to="/bannerimageService"
                          selected={selected}
                          setSelected={setSelected}
                          biggestparent="CMS"
                          bigparent="Service"
                          parent="Home"
                        />

                        <Item
                          title="Block1"
                          to="/block1"
                          selected={selected}
                          setSelected={setSelected}
                          biggestparent="CMS"
                          bigparent="Service"
                          parent="Home"
                        />
                        <Item
                          title="Block2"
                          to="/block2"
                          selected={selected}
                          setSelected={setSelected}
                          biggestparent="CMS"
                          bigparent="Service"
                          parent="Home"
                        />
                        <Item
                          title="Block3"
                          to="/block3"
                          selected={selected}
                          setSelected={setSelected}
                          biggestparent="CMS"
                          bigparent="Service"
                          parent="Home"
                        />
                        <Item
                          title="PromotionBlock"
                          to="/promotionblock"
                          selected={selected}
                          setSelected={setSelected}
                          biggestparent="CMS"
                          bigparent="Service"
                          parent="Home"
                        />
                        <Item
                          title="WhyBlock"
                          to="/whyblock"
                          selected={selected}
                          setSelected={setSelected}
                          biggestparent="CMS"
                          bigparent="Service"
                          parent="Home"
                        />
                        <Item
                          title="FaqBlock"
                          to="/faqblock"
                          selected={selected}
                          setSelected={setSelected}
                          biggestparent="CMS"
                          bigparent="Service"
                          parent="Home"
                        />
                        {/* <Item
                    title="ServiceName"
                    to="/servicename"
                    selected={selected}
                    setSelected={setSelected}
                  /> */}
                        <Item
                          title="ServiceCreation"
                          to="/servicecreation"
                          selected={selected}
                          setSelected={setSelected}
                          biggestparent="CMS"
                          bigparent="Service"
                          parent="Home"
                        />
                        <Item
                          title="ServiceContent"
                          to="/servicecontent"
                          selected={selected}
                          setSelected={setSelected}
                          biggestparent="CMS"
                          bigparent="Service"
                          parent="Home"
                        />
                      </SubMenu>
                      <SubMenu
                        label="Sub Pages"
                        icon={<PeopleOutlinedIcon />}
                        style={{ color: "red" }}
                        open={openSubMenus["servicesubpages"]}
                        onClick={() => toggleSubMenu("servicesubpages")}
                      >
                        <Item
                          title="CustomerCare"
                          to="/customercare"
                          selected={selected}
                          setSelected={setSelected}
                          biggestparent="CMS"
                          bigparent="Service"
                          parent="Sub Pages"
                        />
                        <Item
                          title="HowItWork"
                          to="/howitwork"
                          selected={selected}
                          setSelected={setSelected}
                          biggestparent="CMS"
                          bigparent="Service"
                          parent="Sub Pages"
                        />

                        <Item
                          title="Who We Are"
                          to="/whoweare"
                          selected={selected}
                          setSelected={setSelected}
                          biggestparent="CMS"
                          bigparent="Service"
                          parent="Sub Pages"
                        />
                        <Item
                          title="PrivacyPolicy"
                          to="/privacypolicy"
                          selected={selected}
                          setSelected={setSelected}
                          biggestparent="CMS"
                          bigparent="Service"
                          parent="Sub Pages"
                        />
                        <Item
                          title="TermsCondition"
                          to="/termscondition"
                          selected={selected}
                          setSelected={setSelected}
                          biggestparent="CMS"
                          bigparent="Service"
                          parent="Sub Pages"
                        />
                        <Item
                          title="RefundPolicy"
                          to="/refundpolicy"
                          selected={selected}
                          setSelected={setSelected}
                          biggestparent="CMS"
                          bigparent="Service"
                          parent="Sub Pages"
                        />
                        <Item
                          title="ServiceBlogs"
                          to="/serviceblogs"
                          selected={selected}
                          setSelected={setSelected}
                          biggestparent="CMS"
                          bigparent="Service"
                          parent="Sub Pages"
                        />
                      </SubMenu>
                    </SubMenu>
                  </SubMenu>
                )}
              </>
            )}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default Sidebars;
