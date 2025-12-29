import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchPincode } from "../../../../Redux/Actions/MasterPage/PincodeAction";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import { fetchState } from "../../../../Redux/Actions/MasterPage/StateAction";
import { fetchDistrict } from "../../../../Redux/Actions/MasterPage/DistrictAction";
import { fetchTaluk } from "../../../../Redux/Actions/MasterPage/TalukAction";
import { fetchVillage } from "../../../../Redux/Actions/MasterPage/VillageAction";
import Toast from "../../../../Utils/Toast";
import customStyle from "../../../../Utils/tableStyle";
import Spinner from "react-bootstrap/Spinner";
import { InputGroup } from "rsuite";
import { ThreeDots } from "react-loader-spinner";
import GeneralState from "../../../../Utils/Dropdown/GeneralState";
import GeneralDistrict from "../../../../Utils/Dropdown/GeneralDistrict";
import GeneralTalukDropdown from "../../../../Utils/Dropdown/GeneralTalukDropdown";
import GeneralVillageDropdown from "../../../../Utils/Dropdown/GeneralVillageDropdown";
import GeneralPincodeDropdown from "../../../../Utils/Dropdown/GeneralPincodeDropdown";
import GeneralSroDropdown from "../../../../Utils/Dropdown/GeneralSroDropdown";


const LandOwnerDraftCom = ({ eid, id, status, subtype, pagetype }) => {
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [newDialog, setNewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [prDetails, setPrDetails] = useState([]);
  const [loading, setLoading] = useState(false)
  const StateData = useSelector((state) => state.State.StateNameData);
  const DistrictData = useSelector((state) => state.District.districtData);
  const talukData = useSelector((state) => state.Taluk.TalukData);
  const VillageData = useSelector((state) => state.Village.villageData);
  const pincodeData = useSelector((state) => state.Pincode.PincodeData);
  const [sroData, setSroData] = useState([]);
  const [url, setUrl] = useState(null);
  const dispatch = useDispatch();
  const [getLoading, setGetLoading] = useState(false);


  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  const fetchSro = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/srodetails`);
      setSroData(response?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchState());
    dispatch(fetchDistrict());
    dispatch(fetchTaluk());
    dispatch(fetchPincode());
    dispatch(fetchVillage());

    fetchSro();
  }, [dispatch]);

  const columns = [
    {
      name: "S.No",
      cell: (row, index) => index + 1,
      sortable: true,
    },

    {
      name: "Property ID",
      selector: (row) => row.property_id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Village Type",
      cell: (row) => row.village_type,
      sortable: true,
      width: "150px",
    },
    {
      name: "State",
      cell: (row) => row.state_name,
      sortable: true,
    },
    { name: "District", selector: (row) => row.district_name, sortable: true },
    { name: "Taluk", selector: (row) => row.taluk_name, sortable: true },
    { name: "Village", selector: (row) => row.village_name, sortable: true },
    { name: "SRO", selector: (row) => row.sro_title, sortable: true },
    { name: "Pincode", selector: (row) => row.pincode_name, sortable: true },
    {
      name: "Approval Type",
      selector: (row) => row.approvaltype,
      sortable: true,
      width: "150px",
    },
    {
      name: "Approval No",
      selector: (row) => row.aprovalno,
      sortable: true,
      width: "150px",
    },
    {
      name: "RERA No.",
      selector: (row) => row.rerano,
      sortable: true,
      width: "150px",
    },
    ...(subtype === "Land"
      ? [
        {
          name: "Project Name",
          selector: (row) => row.projectname,
          sortable: true,
          width: "150px",
        },
        {
          name: " Extent in units",
          selector: (row) => row.extent_in_units,
          sortable: true,
          width: "150px",
        },
      ]
      : []),

    {
      name: " Plot No.",
      selector: (row) => row.plotno,
      sortable: true,
      width: "150px",
    },
    ...(subtype === "Building" || subtype === "Complex"
      ? [
        {
          name: " Planning Permit No",
          selector: (row) => row.planning_permit_no,
          sortable: true,
          width: "180px",
        },
        {
          name: " Building Permit No.",
          selector: (row) => row.building_permit_no,
          sortable: true,
          width: "180px",
        },
        {
          name: " Built up area (Units)",
          selector: (row) => row.built_up_area,
          sortable: true,
          width: "190px",
        },
        {
          name: " Common Area(Units)",
          selector: (row) => row.common_area,
          sortable: true,
          width: "190px",
        },
        {
          name: " Super Built up area (Saleable Area)",
          selector: (row) => row.supper_built_up_area,
          sortable: true,
          width: "220px",
        },
        {
          name: " UDS (Units)",
          selector: (row) => row.uds,
          sortable: true,
          width: "150px",
        },
        {
          name: "Land Area",
          selector: (row) => row.land_area,
          sortable: true,
          width: "150px",
        },
        {
          name: "Door facing",
          selector: (row) => row.door_facing,
          sortable: true,
          width: "150px",
        },
        {
          name: "Building type",
          selector: (row) => row.building_type,
          sortable: true,
          width: "150px",
        },
        {
          name: "No. of Floors",
          selector: (row) => row.no_floors,
          sortable: true,
          width: "150px",
        },
        {
          name: "No. of Shops",
          selector: (row) => row.no_shops,
          sortable: true,
          width: "150px",
        },
        {
          name: "Car Parking",
          selector: (row) => row.carparking,
          sortable: true,
          width: "150px",
        },
        {
          name: "Shop Cost",
          selector: (row) => row.shop_cost,
          sortable: true,
          width: "150px",
        },
        {
          name: "Car Parking Cost",
          selector: (row) => row.car_parking_cost,
          sortable: true,
          width: "180px",
        },
      ]
      : []),
    ...(subtype === "Complex"
      ? [
        {
          name: "No. of Car Parking",
          selector: (row) => row.no_of_car_parking,
          sortable: true,
          width: "180px",
        },
        {
          name: "No of Two Wheeler Parking",
          selector: (row) => row.no_of_two_wheeler_parking,
          sortable: true,
          width: "200px",
        },
      ]
      : []),
    {
      name: "Price per Sq.Ft.,",
      selector: (row) => row.price_per_sqft,
      sortable: true,
      width: "170px",
    },
    {
      name: "Total cost",
      selector: (row) => row.total_cost,
      sortable: true,
      width: "200px",
    },
    {
      name: "Agreement draft",
      cell: (row) => (
        <>
          <a
            href={`${IMG_PATH}/enquiry/agreement/${row.document}`}
            class="btn btn-warning ms-2"
            download="download"
            target="_blank"
          >
            <RemoveRedEyeIcon />
          </a>
        </>
      ),
      sortable: true,
      width: "180px",
    },
    {
      name: "Digital sign status",
      cell: (row) => (
        <>
          <button
            type="button"
            className={`badge btn rounded-pill btnhover btn p-2 ${row.status == "pending" ? "bg-danger" : "bg-success"
              }`}
            style={{ width: "60px" }}
          >
            {row.status}
          </button>
        </>
      ),
      sortable: true,
      width: "180px",
    },
    {
      name: "Signed date",
      selector: (row) => row.signed_date,
      sortable: true,
      width: "190px",
    },

    ...((status === "pending" || status === "complete") &&
      staffid.Login === "staff" &&
      pagetype !== "reminder" &&
      prDetails[0]?.status !== "signed" &&
      enquiryDoumentData?.status !== "booking"
      ? [
        {
          name: "Actions",
          cell: (row) => (
            <div className="d-flex">
              <button
                className="btn btn-outline-info me-1 edit"
                data-tooltip-id="edit"
                onClick={() => handleEdit(row)}
              >
                <EditIcon />
              </button>
            </div>
          ),
        },
      ]
      : []),
  ];

  const handleEdit = (row) => {
    setNewDialog(true);
    // setEditDialog(true);
    formik.setFieldValue("property_id", row.property_id);
    formik.setFieldValue("type", row.village_type);
    formik.setFieldValue("state", row.state);
    formik.setFieldValue("district", row.district);
    formik.setFieldValue("village", row.village);
    formik.setFieldValue("taluk", row.taluk);
    formik.setFieldValue("pincode", row.pincode);
    formik.setFieldValue("sro", row.sro);
    formik.setFieldValue("ward", row.ward);
    formik.setFieldValue("block", row.block);
    formik.setFieldValue("sro", row.sro);
    formik.setFieldValue("projectname", row.projectname || "");
    formik.setFieldValue("plotno", row.plotno || "");
    formik.setFieldValue("approvaltype", row.approvaltype || "");
    formik.setFieldValue("aprovalno", row.aprovalno || "");
    formik.setFieldValue("rerano", row.rerano || "");
    formik.setFieldValue("extent_in_units", row.extent_in_units || "");
    formik.setFieldValue("planning_permit_no", row.planning_permit_no || "");
    formik.setFieldValue("building_permit_no", row.building_permit_no || "");
    formik.setFieldValue("built_up_area", row.built_up_area || "");
    formik.setFieldValue("common_area", row.common_area || "");
    formik.setFieldValue(
      "supper_built_up_area",
      row.supper_built_up_area || ""
    );
    formik.setFieldValue("uds", row.uds || "");
    formik.setFieldValue("no_floors", row.no_floors || "");
    formik.setFieldValue("no_shops", row.no_shops || "");
    formik.setFieldValue("door_facing", row.door_facing || "");
    formik.setFieldValue("land_area", row.land_area || "");
    formik.setFieldValue("building_type", row.building_type || "");
    formik.setFieldValue("shop_cost", row.shop_cost || "");
    formik.setFieldValue("no_of_car_parking", row.no_of_car_parking || "");
    formik.setFieldValue(
      "no_of_two_wheeler_parking",
      row.no_of_two_wheeler_parking || ""
    );
    formik.setFieldValue("carparking", row.carparking || "");
    formik.setFieldValue("price_per_sqft", row.price_per_sqft || "");
    formik.setFieldValue("villa_cost", row.villa_cost || "");
    formik.setFieldValue("car_parking_cost", row.car_parking_cost || "");
    formik.setFieldValue("total_cost", row.total_cost || "");
    formik.setFieldValue("file", row.document);
    formik.setFieldValue("oldfile", row.document);
    setUrl(row.document);

    formik.setFieldValue("id", row.id);
  };
  const viewDocument = () => {
    window.open(`${IMG_PATH}/enquiry/agreement/${url}`, "_blank");
  };

  const fetchDetails = async () => {
    setGetLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/commercialagreement/${eid}`,
        {}
      );
      setPrDetails(response.data);
      setGetLoading(false);
    } catch (error) {
      setGetLoading(false);
    }
  };

  const [createFetchData, setCreateFetchData] = useState([]);

  const createFetch = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/plotagreement/${eid}`,
        {}
      );
      setCreateFetchData(response.data);
    } catch (error) { }
  };
  useEffect(() => {
    fetchDetails();
    createFetch();
  }, []);
  const onSubmit = async (values) => {
    if (isEditing) {
      const payload = {
        ...values,
        enqid: eid,
        agreeid: id,
        // status: null,
        status: "pending",
      };
      setLoading(true)
      try {
        await axios.post(`${API_BASE_URL}/commercialagreement`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        formik.resetForm();
        Toast({ message: "Successfully Updated", type: "success" });
        setEditDialog(false);
        fetchDetails();
        setLoading(false)
      } catch (error) {
        alert(error);
        setLoading(false)
      }
    } else {
      const payload = {
        ...values,
        enqid: eid,
        agreeid: id,
        status: "pending",
      };
      setLoading(true)
      try {
        await axios.post(`${API_BASE_URL}/commercialagreement`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        formik.resetForm();
        Toast({ message: "Successfully Submited", type: "success" });
        setNewDialog(false);
        setEditDialog(false);
        fetchDetails();
        setLoading(false)
      } catch (error) {
        alert(error);
        setLoading(false)
      }
    }
  };

  const validationSchema = yup.object().shape({
    //same fields all subtypes
    property_id: yup.string().required("Property ID is required"),
    type: yup.string().required("Property type is required"),
    state: yup.string().required("State is required"),
    district: yup.string().required("District is required"),
    taluk: yup.string().required("Taluk is required"),
    village: yup.string().required("Village is required"),

    sro: yup.string().required("SRO is required"),
    plotno: yup.string().required("Plot number is required"),
    approvaltype: yup.string().required("Approval type is required"),
    aprovalno: yup.string().required("Approval number is required"),
    rerano: yup.string().required("RERA number is required"),
    price_per_sqft: yup
      .number()
      .typeError("Price per sqft must be a number")
      .positive("Price per sqft must be positive")
      .required("Price per sqft is required"),
    total_cost: yup
      .number()
      .typeError("Total shop cost must be a number")
      .positive("Total shop cost must be positive")
      .required("Total shop cost is required"),
    /////..................
    //Land
    extent_in_units:
      subtype === "Land"
        ? yup.string().required("extent in units is required !!")
        : yup.string().notRequired(),
    projectname:
      subtype === "Land"
        ? yup.string().required("projectname is required !!")
        : yup.string().notRequired(),
    //..........
    //building
    planning_permit_no:
      subtype === "Building" || subtype === "Complex"
        ? yup.string().required("Planning permit number is required")
        : yup.string().notRequired(),
    building_permit_no:
      subtype === "Building" || subtype === "Complex"
        ? yup.string().required("Building permit number is required")
        : yup.string().notRequired(),

    built_up_area:
      subtype === "Building" || subtype === "Complex"
        ? yup
          .number()
          .typeError("Built‑up area must be a number")
          .positive("Built‑up area must be positive")
          .required("Built‑up area is required")
        : yup.string().notRequired(),
    common_area:
      subtype === "Building" || subtype === "Complex"
        ? yup
          .number()
          .typeError("Common area must be a number")
          .min(0, "Common area cannot be negative")
          .required("Common area is required")
        : yup.string().notRequired(),
    supper_built_up_area:
      subtype === "Building" || subtype === "Complex"
        ? yup
          .number()
          .typeError("Super built‑up area must be a number")
          .min(0, "Super built‑up area cannot be negative")
          .required("Super built‑up area is required")
        : yup.string().notRequired(),
    uds:
      subtype === "Building" || subtype === "Complex"
        ? yup
          .number()
          .typeError("UDS must be a number")
          .positive("UDS must be positive")
          .required("UDS is required")
        : yup.string().notRequired(),
    // land_area:
    //   subtype === "Building" || subtype === "Complex"
    //     ? yup
    //         .number()
    //         .typeError("Land area must be a number")
    //         .positive("Land area must be positive")
    //         .required("Land area is required")
    //     : yup.string().notRequired(),

    // Property attributes
    door_facing:
      subtype === "Building" || subtype === "Complex"
        ? yup.string().required("Door facing is required")
        : yup.string().notRequired(),
    building_type:
      subtype === "Building" || subtype === "Complex"
        ? yup.string().required("Building type is required")
        : yup.string().notRequired(),
    no_floors:
      subtype === "Building" || subtype === "Complex"
        ? yup
          .number()
          .typeError("No. of floors must be a number")
          .integer("No. of floors must be an integer")
          .min(0, "No. of floors cannot be negative")
          .required("No. of floors is required")
        : yup.string().notRequired(),
    no_shops:
      subtype === "Building" || subtype === "Complex"
        ? yup
          .number()
          .typeError("No. of shops must be a number")
          .integer("No. of shops must be an integer")
          .min(0, "No. of shops cannot be negative")
          .required("No. of shops is required")
        : yup.string().notRequired(),
    carparking:
      subtype === "Building"
        ? yup.string().required("Car parking is required")
        : yup.string().notRequired(),

    // Costing

    shop_cost:
      subtype === "Building" || subtype === "Complex"
        ? yup
          .number()
          .typeError("Shop cost must be a number")
          .positive("Shop cost must be positive")
          .required("Shop cost is required")
        : yup.string().notRequired(),
    // car_parking_cost:
    //   subtype === "Building" || subtype === "Complex"
    //     ? yup
    //         .number()
    //         .typeError("Car parking cost must be a number")
    //         .min(0, "Car parking cost cannot be negative")
    //         .required("Car parking cost is required")
    //     : yup.string().notRequired(),
    no_of_car_parking:
      subtype === "Complex"
        ? yup
          .number()
          .typeError("Car parking cost must be a number")
          .required("no_of_car_parking is required")
        : yup.string().notRequired(),
    no_of_two_wheeler_parking:
      subtype === "Complex"
        ? yup
          .number()
          .typeError("Car parking cost must be a number")
          .required("no of two wheeler parking is required")
        : yup.string().notRequired(),

    // Uploads
    file: yup.mixed().required("Document upload is required"),
  });
  const formik = useFormik({
    initialValues: {
      property_id: `PROP${1000 + eid}`,
      type: "",
      state: "",
      district: "",
      taluk: "",
      village: "",
      pincode: "",
      ward: "",
      block: "",
      sro: "",
      plotno: "",
      approvaltype: "",
      aprovalno: "",
      rerano: "",
      projectname: "",
      extent_in_units: "",
      planning_permit_no: "",
      building_permit_no: "",
      built_up_area: "",
      common_area: "",
      supper_built_up_area: "",
      uds: "",
      // land_area: "",
      door_facing: "",
      building_type: "",
      no_floors: "",
      no_shops: "",
      carparking: "",
      price_per_sqft: "",
      shop_cost: "",
      car_parking_cost: "",
      total_cost: "",
      file: "",
      no_of_car_parking: "",
      status: "pending",
    },
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    const landarea = parseFloat(formik.values.extent_in_units) || 0;
    const priceper = parseFloat(formik.values.price_per_sqft) || 0;
    const villa_cost = landarea * priceper;
    formik.setFieldValue("shop_cost", villa_cost || "");
  }, [formik.values.extent_in_units, formik.values.price_per_sqft]);

  useEffect(() => {
    const housecost = parseFloat(formik.values.shop_cost) || 0;
    const parkingcost = parseFloat(formik.values.car_parking_cost) || 0;
    const total = housecost + parkingcost;
    formik.setFieldValue("total_cost", total || "");
  }, [formik.values.shop_cost, formik.values.car_parking_cost]);

  useEffect(() => {
    if (formik.values.village) {
      const matchedPin = pincodeData?.find(
        (pin) => pin.pin_village === formik.values.village
      );
      if (matchedPin && formik.values.pincode !== matchedPin.id) {
        formik.setFieldValue("pincode", matchedPin.id);
      }
    }
  }, [formik.values.village, pincodeData]);

  const createAgreement = () => {
    setNewDialog(true);
    formik.setFieldValue(
      "extent_in_units",
      enquiryDoumentData?.land_extent_total
    );
    formik.setFieldValue("price_per_sqft", enquiryDoumentData?.price_per_unit);

    formik.setFieldValue("type", createFetchData[0]?.village_type);
    formik.setFieldValue("state", createFetchData[0]?.state);
    formik.setFieldValue("district", createFetchData[0]?.district);
    formik.setFieldValue("village", createFetchData[0]?.village);
    formik.setFieldValue("taluk", createFetchData[0]?.taluk);
    formik.setFieldValue("pincode", createFetchData[0]?.pincode);
    formik.setFieldValue("sro", createFetchData[0]?.sro);
    formik.setFieldValue("ward", createFetchData[0]?.ward);
    formik.setFieldValue("block", createFetchData[0]?.block);
    formik.setFieldValue("sro", createFetchData[0]?.sro);
    formik.setFieldValue("projectname", createFetchData[0]?.project_name || "");
    formik.setFieldValue("plotno", createFetchData[0]?.plot_no || "");
    formik.setFieldValue(
      "approvaltype",
      createFetchData[0]?.approval_type || ""
    );
    formik.setFieldValue("aprovalno", createFetchData[0]?.approval_no || "");
    formik.setFieldValue("rerano", createFetchData[0]?.rera_no || "");
    formik.setFieldValue(
      "planning_permit_no",
      createFetchData[0]?.planing_permit_no || ""
    );
    formik.setFieldValue(
      "building_permit_no",
      createFetchData[0]?.building_permit_no || ""
    );
    formik.setFieldValue(
      "built_up_area",
      createFetchData[0]?.builtup_area || ""
    );
    formik.setFieldValue("common_area", createFetchData[0]?.common_area || "");
    formik.setFieldValue(
      "building_type",
      createFetchData[0]?.building_type || ""
    );
    formik.setFieldValue(
      "supper_built_up_area",
      createFetchData[0]?.super_area || ""
    );
    formik.setFieldValue("uds", createFetchData[0]?.uds_size || "");
    formik.setFieldValue("no_floors", createFetchData[0]?.no_floors || "");
    formik.setFieldValue("no_shops", createFetchData[0]?.no_shops || "");
    formik.setFieldValue("door_facing", createFetchData[0]?.door_facing || "");
    formik.setFieldValue("carparking", createFetchData[0]?.carparking || "");
    formik.setFieldValue(
      "no_of_car_parking",
      createFetchData[0]?.no_carparking || ""
    );
    formik.setFieldValue(
      "no_of_two_wheeler_parking",
      createFetchData[0]?.no_twowheel || ""
    );
  };

  return (
    <>
      <div className="col-12 mt-4">
        <div className="card shadow border-0 mb-3">
          <div className="card shadow border-0 p-4">
            <div className="  justify-content-between mb-3">
              <h6>Land Owner Agreement </h6>

              <hr />
            </div>
            {getLoading ? (
              <div className="d-flex justify-content-center">
                <Spinner className="mt-auto" />
              </div>
            ) : prDetails?.length === 0 ? (
              <div className="d-flex justify-content-center">
                <button className="btn1" onClick={() => createAgreement()}>
                  +Create Agreement
                </button>
              </div>
            ) : (
              <DataTable
                persistTableHead={true}
                columns={columns}
                data={prDetails}
                customStyles={customStyle}
                fixedHeader
              />
            )}
          </div>
        </div>
      </div>
      <Dialog
        visible={newDialog}
        style={{ width: "62rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Project Details "
        modal
        className="p-fluid"
        onHide={() => {
          setNewDialog(false);
          formik.resetForm();
        }}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row mt-4">
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    PropertyId
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="property_id"
                    id="property_id"
                    className="form-control"
                    value={formik.values.property_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled
                  />

                  {formik.errors.property_id && formik.touched.property_id ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.property_id}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    Village Type
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <select
                    name="type"
                    id="type"
                    className="form-select"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={createFetchData[0]?.village_type}
                  >
                    <option>Select Village Type </option>
                    <option value="Natham_patta">Natham Village</option>
                    <option value="Rural_patta">Rural Village</option>
                    <option value="Town_patta">Town Village</option>
                  </select>

                  {formik.errors.type && formik.touched.type ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.type}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    State
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  {/* <select
                    name="state"
                    id="state"
                    className="form-select"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={createFetchData[0]?.state}
                  >
                    <option value="">Select State</option>
                    {StateData?.map((item) => (
                      <option value={item.id}>{item.state_name} </option>
                    ))}
                  </select> */}
                  <GeneralState
                    value={formik.values.state}
                    onChange={(value) => {
                      formik.setFieldValue("state", value);
                      formik.setFieldValue("district", "");
                      formik.setFieldValue("taluk", "");
                      formik.setFieldValue("village", "");
                    }}
                    onBlur={() => formik.setFieldTouched("state", true)}
                  />
                  {formik.errors.state && formik.touched.state ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.state}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    District
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  {/* <select
                    name="district"
                    id="district"
                    className="form-select"
                    value={formik.values.district}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={createFetchData[0]?.district}
                  >
                    <option value="">Select district</option>
                    {DistrictData?.filter(
                      (district) => district.state_type === formik.values.state
                    ).map((item) => (
                      <option key={item.id} value={item.id}>
                        {" "}
                        {item.district}{" "}
                      </option>
                    ))}
                  </select> */}
                  <GeneralDistrict
                    stateId={formik.values.state}
                    value={formik.values.district}
                    onChange={(value) => {
                      formik.setFieldValue("district", value);
                      formik.setFieldValue("taluk", "");
                      formik.setFieldValue("village", "");
                    }}
                    onBlur={() => formik.setFieldTouched("district", true)}
                  />
                  {formik.errors.district && formik.touched.district ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.district}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    Taluk
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  {/* <select
                    name="taluk"
                    id="taluk"
                    className="form-select"
                    value={formik.values.taluk}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={createFetchData[0]?.taluk}
                  >
                    <option value="">Select Taluk</option>
                    {talukData
                      ?.filter(
                        (taluk) =>
                          taluk.taluk_district === formik.values.district
                      )
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {" "}
                          {item.taluk_name}{" "}
                        </option>
                      ))}
                  </select> */}
                  <GeneralTalukDropdown
                    districtId={formik.values.district}
                    value={formik.values.taluk}
                    onChange={(value) => {
                      formik.setFieldValue("taluk", value);
                      formik.setFieldValue("village", "");
                    }}
                    onBlur={() => formik.setFieldTouched("taluk", true)}
                  />
                  {formik.errors.taluk && formik.touched.taluk ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.taluk}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    {formik.values.type === "Town village" ? "Town" : "Village"}
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  {/* <select
                    name="village"
                    id="village"
                    className="form-select"
                    value={formik.values.village}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={createFetchData[0]?.village}
                  >
                    <option value="">Select Village</option>
                    {VillageData?.filter(
                      (vill) => vill.village_taluk === formik.values.taluk
                    ).map((item) => (
                      <option key={item.id} value={item.id}>
                        {" "}
                        {item.village_name}{" "}
                      </option>
                    ))}
                  </select> */}
                  <GeneralVillageDropdown
                    talukId={formik.values.taluk}
                    value={formik.values.village}
                    onChange={(value) => formik.setFieldValue("village", value)}
                    onBlur={() => formik.setFieldTouched("village", true)}
                  />
                  {formik.errors.village && formik.touched.village ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.village}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            {formik.values.type === "Town village" && (
              <>
                <div className="col-md-6 mb-3 ">
                  <div className="row">
                    <div className="col-4 mb-3 ">
                      <label htmlFor="projectname" className="form-label">
                        Ward
                      </label>
                    </div>
                    <div className="col-8 mb-3 ">
                      <input
                        name="ward"
                        id="ward"
                        className="form-control"
                        placeholder="Enter ward...."
                        value={formik.values.ward}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3 ">
                  <div className="row">
                    <div className="col-4 mb-3 ">
                      <label htmlFor="projectname" className="form-label">
                        Block
                      </label>
                    </div>
                    <div className="col-8 mb-3 ">
                      <input
                        name="block"
                        id="block"
                        className="form-control"
                        placeholder="Enter block...."
                        value={formik.values.block}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    Sro
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  {/* <select
                    type="text"
                    className="form-select"
                    name="sro"
                    value={formik.values.sro}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={createFetchData[0]?.sro}
                  >
                    <option value="">Select SRO</option>
                    {sroData?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.sro_title}{" "}
                      </option>
                    ))}
                  </select> */}
                  <GeneralSroDropdown
                    value={formik.values.sro}
                    onChange={(value) => {
                      formik.setFieldValue("sro", value);
                    }}
                    onBlur={() => formik.setFieldTouched("sro", true)}
                  />
                  {formik.errors.sro && formik.touched.sro ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.sro}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    Pincode
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  {/* <select
                    name="pincode"
                    id="pincode"
                    className="form-select"
                    value={formik.values.pincode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled
                  >
                    <option value="">Select Pincode</option>
                    {pincodeData
                      ?.filter(
                        (pin) => pin.pin_village === formik.values.village
                      )
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {" "}
                          {item.pincode}{" "}
                        </option>
                      ))}
                  </select> */}
                  <GeneralPincodeDropdown
                    villageId={formik.values.village}
                    value={formik.values.pincode}
                    onChange={(value) => formik.setFieldValue("pincode", value)}
                    onBlur={() => formik.setFieldTouched("pincode", true)}
                  />
                  {formik.errors.pincode && formik.touched.pincode ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.pincode}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/** plotno */}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="plotno" className="form-label">
                    Plot Number
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="plotno"
                    placeholder="Enter plot number..."
                    value={formik.values.plotno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={createFetchData[0]?.plot_no}
                  />
                  {formik.errors.plotno && formik.touched.plotno && (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.plotno}
                    </h6>
                  )}
                </div>
              </div>
            </div>

            {/** approvaltype */}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="approvaltype" className="form-label">
                    Approval Type
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="approvaltype"
                    placeholder="Enter approval type..."
                    value={formik.values.approvaltype}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={createFetchData[0]?.approval_type}
                  />
                  {formik.errors.approvaltype &&
                    formik.touched.approvaltype && (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.approvaltype}
                      </h6>
                    )}
                </div>
              </div>
            </div>

            {/** aprovalno */}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="aprovalno" className="form-label">
                    Approval Number
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="aprovalno"
                    placeholder="Enter approval number..."
                    value={formik.values.aprovalno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={createFetchData[0]?.approval_no}
                  />
                  {formik.errors.aprovalno && formik.touched.aprovalno && (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.aprovalno}
                    </h6>
                  )}
                </div>
              </div>
            </div>
            {/** Project Name */}
            {subtype === "Land" && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="aprovalno" className="form-label">
                      Project Name
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="projectname"
                      placeholder="Enter project name..."
                      value={formik.values.projectname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={createFetchData[0]?.project_name}
                    />
                    {formik.errors.projectname &&
                      formik.touched.projectname && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.projectname}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** rerano */}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="rerano" className="form-label">
                    RERA Number
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="rerano"
                    placeholder="Enter RERA number..."
                    value={formik.values.rerano}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={createFetchData[0]?.rera_no}
                  />
                  {formik.errors.rerano && formik.touched.rerano && (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.rerano}
                    </h6>
                  )}
                </div>
              </div>
            </div>

            {/** planning_permit_no */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="planning_permit_no" className="form-label">
                      Planning Permit No
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="planning_permit_no"
                      placeholder="Enter planning permit number..."
                      value={formik.values.planning_permit_no}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={createFetchData[0]?.rera_no}
                    />
                    {formik.errors.planning_permit_no &&
                      formik.touched.planning_permit_no && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.planning_permit_no}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** building_permit_no */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="building_permit_no" className="form-label">
                      Building Permit No
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="building_permit_no"
                      placeholder="Enter building permit number..."
                      value={formik.values.building_permit_no}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={createFetchData[0]?.building_permit_no}
                    />
                    {formik.errors.building_permit_no &&
                      formik.touched.building_permit_no && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.building_permit_no}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** built_up_area */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="built_up_area" className="form-label">
                      Built-up Area
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="number"
                      className="form-control"
                      name="built_up_area"
                      placeholder="Enter built-up area..."
                      value={formik.values.built_up_area}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={createFetchData[0]?.builtup_area}
                    />
                    {formik.errors.built_up_area &&
                      formik.touched.built_up_area && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.built_up_area}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** common_area */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="common_area" className="form-label">
                      Common Area
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="number"
                      className="form-control"
                      name="common_area"
                      placeholder="Enter common area..."
                      value={formik.values.common_area}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={createFetchData[0]?.common_area}
                    />
                    {formik.errors.common_area &&
                      formik.touched.common_area && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.common_area}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** supper_built_up_area */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label
                      htmlFor="supper_built_up_area"
                      className="form-label"
                    >
                      Super Built-up Area
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="number"
                      className="form-control"
                      name="supper_built_up_area"
                      placeholder="Enter super built-up area..."
                      value={formik.values.supper_built_up_area}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={createFetchData[0]?.super_area}
                    />
                    {formik.errors.supper_built_up_area &&
                      formik.touched.supper_built_up_area && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.supper_built_up_area}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** uds */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="uds" className="form-label">
                      UDS
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="uds"
                      placeholder="Enter UDS..."
                      value={formik.values.uds}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={createFetchData[0]?.uds_size}
                    />
                    {formik.errors.uds && formik.touched.uds && (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.uds}
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            )}
            {/** land_area */}
            {/* {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="land_area" className="form-label">
                      Land Area
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="number"
                      className="form-control"
                      name="land_area"
                      placeholder="Enter land area..."
                      value={formik.values.land_area}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.land_area && formik.touched.land_area && (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.land_area}
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            )} */}

            {/** door_facing */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="door_facing" className="form-label">
                      Door Facing
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="door_facing"
                      placeholder="Enter door facing..."
                      value={formik.values.door_facing}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={createFetchData[0]?.door_facing}
                    />
                    {formik.errors.door_facing &&
                      formik.touched.door_facing && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.door_facing}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** building_type */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="building_type" className="form-label">
                      Building Type
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="building_type"
                      placeholder="Enter building type..."
                      value={formik.values.building_type}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={createFetchData[0]?.building_type}
                    />
                    {formik.errors.building_type &&
                      formik.touched.building_type && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.building_type}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** no_floors */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="no_floors" className="form-label">
                      No. of Floors
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="number"
                      className="form-control"
                      name="no_floors"
                      placeholder="Enter no. of floors..."
                      value={formik.values.no_floors}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={createFetchData[0]?.no_floors}
                    />
                    {formik.errors.no_floors && formik.touched.no_floors && (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.no_floors}
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/** no_shops */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="no_shops" className="form-label">
                      No. of Shops
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="number"
                      className="form-control"
                      name="no_shops"
                      placeholder="Enter no. of shops..."
                      value={formik.values.no_shops}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={createFetchData[0]?.no_shops}
                    />
                    {formik.errors.no_shops && formik.touched.no_shops && (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.no_shops}
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/** carparking */}
            {subtype === "Building" && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="carparking" className="form-label">
                      Car Parking
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="carparking"
                      placeholder="Enter car parking..."
                      value={formik.values.carparking}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={createFetchData[0]?.carparking}
                    />
                    {formik.errors.carparking && formik.touched.carparking && (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.carparking}
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            )}
            {/** no of car parking */}
            {subtype === "Complex" && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="car_parking_cost" className="form-label">
                      No. of Car Parking
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="number"
                      className="form-control"
                      name="no_of_car_parking"
                      placeholder="Enter no of car parking..."
                      value={formik.values.no_of_car_parking}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={createFetchData[0]?.no_carparking}
                    />
                    {formik.errors.no_of_car_parking &&
                      formik.touched.no_of_car_parking && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.no_of_car_parking}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** No. of Two Wheeler Parking */}
            {subtype === "Complex" && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="car_parking_cost" className="form-label">
                      No. of Two Wheeler Parking
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="number"
                      className="form-control"
                      name="no_of_two_wheeler_parking"
                      placeholder="Enter no of two wheeler parking..."
                      value={formik.values.no_of_two_wheeler_parking}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={createFetchData[0]?.no_twowheel}
                    />
                    {formik.errors.no_of_two_wheeler_parking &&
                      formik.touched.no_of_two_wheeler_parking && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.no_of_two_wheeler_parking}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** Extent in units */}
            {/* {subtype === "Land" && ( */}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="rerano" className="form-label">
                    {subtype === "Building" || subtype === "Complex"
                      ? "Land Area"
                      : "Extent in units"}
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  {/* <input
                    type="text"
                    className="form-control"
                    name="extent_in_units"
                    placeholder="Enter extent in units..."
                    value={formik.values.extent_in_units}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  /> */}
                  <InputGroup>
                    <input
                      type="text"
                      className="form-control"
                      name="extent_in_units"
                      placeholder="Enter extent in units..."
                      value={formik.values.extent_in_units}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                    />
                    <InputGroup.Addon>
                      {enquiryDoumentData?.land_units}{" "}
                    </InputGroup.Addon>
                  </InputGroup>
                  {formik.errors.extent_in_units &&
                    formik.touched.extent_in_units && (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.extent_in_units}
                      </h6>
                    )}
                </div>
              </div>
            </div>
            {/* )} */}
            {/** price_per_sqft */}

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="price_per_sqft" className="form-label">
                    Price per Sqft
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  {/* <input
                    type="number"
                    className="form-control"
                    name="price_per_sqft"
                    placeholder="Enter price per sqft..."
                    value={formik.values.price_per_sqft}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  /> */}
                  <InputGroup>
                    <input
                      type="number"
                      className="form-control"
                      name="price_per_sqft"
                      placeholder="Enter price per sqft..."
                      value={formik.values.price_per_sqft}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                    />
                    <InputGroup.Addon>
                      {enquiryDoumentData?.land_units}{" "}
                    </InputGroup.Addon>
                  </InputGroup>
                  {formik.errors.price_per_sqft &&
                    formik.touched.price_per_sqft && (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.price_per_sqft}
                      </h6>
                    )}
                </div>
              </div>
            </div>

            {/** shop_cost */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="shop_cost" className="form-label">
                      Shop Cost
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="number"
                      className="form-control"
                      name="shop_cost"
                      placeholder="Enter shop cost..."
                      value={formik.values.shop_cost}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                    />
                    {formik.errors.shop_cost && formik.touched.shop_cost && (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.shop_cost}
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/** car_parking_cost */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="car_parking_cost" className="form-label">
                      Car Parking Cost
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="number"
                      className="form-control"
                      name="car_parking_cost"
                      placeholder="Enter car parking cost..."
                      value={formik.values.car_parking_cost}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.car_parking_cost &&
                      formik.touched.car_parking_cost && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.car_parking_cost}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** total_shop_cost */}

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="total_shop_cost" className="form-label">
                    {/* Total Cost */}
                    {subtype === "Building" || subtype === "Complex"
                      ? "Total Shop cost (Exclusive of documentation & registration cost)"
                      : "Total saleable plots cost"}
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="number"
                    className="form-control"
                    name="total_cost"
                    placeholder="Enter total  cost..."
                    value={formik.values.total_cost}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled
                  />
                  {formik.errors.total_cost && formik.touched.total_cost && (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.total_cost}
                    </h6>
                  )}
                </div>
              </div>
            </div>

            <hr />
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="carparking" className="form-label">
                    File
                  </label>
                </div>
                <div className="col-7 mb-3 ">
                  <input
                    type="file"
                    className="form-control"
                    name="file"
                    onChange={(event) => {
                      formik.setFieldValue(
                        "file",
                        event.currentTarget.files[0]
                      );
                    }}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.file && formik.touched.file ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.file}
                    </p>
                  ) : null}
                </div>
                {url && (
                  <div className="col-1">
                    <button className="btn1" type="button" onClick={viewDocument}>
                      <RemoveRedEyeIcon />{" "}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="text-end gap-3">
              {staffid.Login === "staff" &&
                (status === "pending" || status === "complete") && (
                  <>
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={() => setIsEditing(false)}
                      disabled={loading}
                    >
                      {loading ? (
                        <ThreeDots
                          visible={true}
                          height="25"
                          width="55"
                          color="#ffffff"
                          radius="18"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{
                            justifyContent: "center",
                            fontSize: "12px",
                          }}
                          wrapperClass=""
                        />
                      ) : (
                        "Save "
                      )}
                    </Button>
                  </>
                )}
            </div>
          </div>
        </form>
      </Dialog>
      <Dialog
        visible={editDialog}
        style={{ width: "62rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Project Details "
        modal
        className="p-fluid"
        onHide={() => {
          setEditDialog(false);
          formik.resetForm();
        }}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row mt-4">
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    PropertyId
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="property_id"
                    id="property_id"
                    className="form-control"
                    value={formik.values.property_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled
                  />

                  {formik.errors.property_id && formik.touched.property_id ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.property_id}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    Village Type
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <select
                    name="type"
                    id="type"
                    className="form-select"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option>Select Village Type </option>
                    <option value="Natham_patta">Natham Village</option>
                    <option value="Rural_patta">Rural Village</option>
                    <option value="Town_patta">Town Village</option>
                  </select>

                  {formik.errors.type && formik.touched.type ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.type}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    State
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <select
                    name="state"
                    id="state"
                    className="form-select"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select State</option>
                    {StateData?.map((item) => (
                      <option value={item.id}>{item.state_name} </option>
                    ))}
                  </select>
                  {formik.errors.state && formik.touched.state ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.state}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    District
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <select
                    name="district"
                    id="district"
                    className="form-select"
                    value={formik.values.district}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select district</option>
                    {DistrictData?.filter(
                      (district) => district.state_type === formik.values.state
                    ).map((item) => (
                      <option key={item.id} value={item.id}>
                        {" "}
                        {item.district}{" "}
                      </option>
                    ))}
                  </select>
                  {formik.errors.district && formik.touched.district ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.district}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    Taluk
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <select
                    name="taluk"
                    id="taluk"
                    className="form-select"
                    value={formik.values.taluk}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Taluk</option>
                    {talukData
                      ?.filter(
                        (taluk) =>
                          taluk.taluk_district === formik.values.district
                      )
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {" "}
                          {item.taluk_name}{" "}
                        </option>
                      ))}
                  </select>
                  {formik.errors.taluk && formik.touched.taluk ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.taluk}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    {formik.values.type === "Town village" ? "Town" : "Village"}
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <select
                    name="village"
                    id="village"
                    className="form-select"
                    value={formik.values.village}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Village</option>
                    {VillageData?.filter(
                      (vill) => vill.village_taluk === formik.values.taluk
                    ).map((item) => (
                      <option key={item.id} value={item.id}>
                        {" "}
                        {item.village_name}{" "}
                      </option>
                    ))}
                  </select>
                  {formik.errors.village && formik.touched.village ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.village}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            {formik.values.type === "Town village" && (
              <>
                <div className="col-md-6 mb-3 ">
                  <div className="row">
                    <div className="col-4 mb-3 ">
                      <label htmlFor="projectname" className="form-label">
                        Ward
                      </label>
                    </div>
                    <div className="col-8 mb-3 ">
                      <input
                        name="ward"
                        id="ward"
                        className="form-control"
                        placeholder="Enter ward...."
                        value={formik.values.ward}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3 ">
                  <div className="row">
                    <div className="col-4 mb-3 ">
                      <label htmlFor="projectname" className="form-label">
                        Block
                      </label>
                    </div>
                    <div className="col-8 mb-3 ">
                      <input
                        name="block"
                        id="block"
                        className="form-control"
                        placeholder="Enter block...."
                        value={formik.values.block}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    Sro
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <select
                    type="text"
                    className="form-select"
                    name="sro"
                    value={formik.values.sro}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select SRO</option>
                    {sroData?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.sro_title}{" "}
                      </option>
                    ))}
                  </select>
                  {formik.errors.sro && formik.touched.sro ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.sro}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    Pincode
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <select
                    name="pincode"
                    id="pincode"
                    className="form-select"
                    value={formik.values.pincode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Pincode</option>
                    {pincodeData
                      ?.filter(
                        (pin) => pin.pin_village === formik.values.village
                      )
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {" "}
                          {item.pincode}{" "}
                        </option>
                      ))}
                  </select>
                  {formik.errors.pincode && formik.touched.pincode ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.pincode}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/** plotno */}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="plotno" className="form-label">
                    Plot Number
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="plotno"
                    placeholder="Enter plot number..."
                    value={formik.values.plotno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.plotno && formik.touched.plotno && (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.plotno}
                    </h6>
                  )}
                </div>
              </div>
            </div>

            {/** approvaltype */}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="approvaltype" className="form-label">
                    Approval Type
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="approvaltype"
                    placeholder="Enter approval type..."
                    value={formik.values.approvaltype}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.approvaltype &&
                    formik.touched.approvaltype && (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.approvaltype}
                      </h6>
                    )}
                </div>
              </div>
            </div>

            {/** aprovalno */}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="aprovalno" className="form-label">
                    Approval Number
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="aprovalno"
                    placeholder="Enter approval number..."
                    value={formik.values.aprovalno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.aprovalno && formik.touched.aprovalno && (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.aprovalno}
                    </h6>
                  )}
                </div>
              </div>
            </div>
            {/** Project Name */}
            {subtype === "Land" && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="aprovalno" className="form-label">
                      Project Name
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="projectname"
                      placeholder="Enter project name..."
                      value={formik.values.projectname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.projectname &&
                      formik.touched.projectname && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.projectname}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** rerano */}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="rerano" className="form-label">
                    RERA Number
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="rerano"
                    placeholder="Enter RERA number..."
                    value={formik.values.rerano}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.rerano && formik.touched.rerano && (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.rerano}
                    </h6>
                  )}
                </div>
              </div>
            </div>

            {/** planning_permit_no */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="planning_permit_no" className="form-label">
                      Planning Permit No
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="planning_permit_no"
                      placeholder="Enter planning permit number..."
                      value={formik.values.planning_permit_no}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.planning_permit_no &&
                      formik.touched.planning_permit_no && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.planning_permit_no}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** building_permit_no */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="building_permit_no" className="form-label">
                      Building Permit No
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="building_permit_no"
                      placeholder="Enter building permit number..."
                      value={formik.values.building_permit_no}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.building_permit_no &&
                      formik.touched.building_permit_no && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.building_permit_no}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** built_up_area */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="built_up_area" className="form-label">
                      Built-up Area
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="number"
                      className="form-control"
                      name="built_up_area"
                      placeholder="Enter built-up area..."
                      value={formik.values.built_up_area}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.built_up_area &&
                      formik.touched.built_up_area && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.built_up_area}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** common_area */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="common_area" className="form-label">
                      Common Area
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="number"
                      className="form-control"
                      name="common_area"
                      placeholder="Enter common area..."
                      value={formik.values.common_area}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.common_area &&
                      formik.touched.common_area && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.common_area}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** supper_built_up_area */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label
                      htmlFor="supper_built_up_area"
                      className="form-label"
                    >
                      Super Built-up Area
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="number"
                      className="form-control"
                      name="supper_built_up_area"
                      placeholder="Enter super built-up area..."
                      value={formik.values.supper_built_up_area}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.supper_built_up_area &&
                      formik.touched.supper_built_up_area && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.supper_built_up_area}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** uds */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="uds" className="form-label">
                      UDS
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="uds"
                      placeholder="Enter UDS..."
                      value={formik.values.uds}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.uds && formik.touched.uds && (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.uds}
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            )}
            {/** land_area */}
            {/* {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="land_area" className="form-label">
                      Land Area
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="number"
                      className="form-control"
                      name="land_area"
                      placeholder="Enter land area..."
                      value={formik.values.land_area}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.land_area && formik.touched.land_area && (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.land_area}
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            )} */}

            {/** door_facing */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="door_facing" className="form-label">
                      Door Facing
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="door_facing"
                      placeholder="Enter door facing..."
                      value={formik.values.door_facing}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.door_facing &&
                      formik.touched.door_facing && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.door_facing}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** building_type */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="building_type" className="form-label">
                      Building Type
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="building_type"
                      placeholder="Enter building type..."
                      value={formik.values.building_type}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.building_type &&
                      formik.touched.building_type && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.building_type}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** no_floors */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="no_floors" className="form-label">
                      No. of Floors
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="number"
                      className="form-control"
                      name="no_floors"
                      placeholder="Enter no. of floors..."
                      value={formik.values.no_floors}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.no_floors && formik.touched.no_floors && (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.no_floors}
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/** no_shops */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="no_shops" className="form-label">
                      No. of Shops
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="number"
                      className="form-control"
                      name="no_shops"
                      placeholder="Enter no. of shops..."
                      value={formik.values.no_shops}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.no_shops && formik.touched.no_shops && (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.no_shops}
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/** carparking */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="carparking" className="form-label">
                      Car Parking
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="carparking"
                      placeholder="Enter car parking..."
                      value={formik.values.carparking}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.carparking && formik.touched.carparking && (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.carparking}
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            )}
            {/** no of car parking */}
            {subtype === "Complex" && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="car_parking_cost" className="form-label">
                      No. of Car Parking
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="number"
                      className="form-control"
                      name="no_of_car_parking"
                      placeholder="Enter no of car parking..."
                      value={formik.values.no_of_car_parking}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.no_of_car_parking &&
                      formik.touched.no_of_car_parking && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.no_of_car_parking}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** No. of Two Wheeler Parking */}
            {subtype === "Complex" && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="car_parking_cost" className="form-label">
                      No. of Two Wheeler Parking
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="number"
                      className="form-control"
                      name="no_of_two_wheeler_parking"
                      placeholder="Enter no of two wheeler parking..."
                      value={formik.values.no_of_two_wheeler_parking}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.no_of_two_wheeler_parking &&
                      formik.touched.no_of_two_wheeler_parking && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.no_of_two_wheeler_parking}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}
            {/* * Extent in units */}
            {/* {subtype === "Land" && ( */}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="rerano" className="form-label">
                    {/* Extent in units */}
                    {subtype === "Building" || subtype === "Complex"
                      ? "Land Area"
                      : "Extent in units"}
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  {/* <input
                    type="text"
                    className="form-control"
                    name="extent_in_units"
                    placeholder="Enter extent in units..."
                    value={formik.values.extent_in_units}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  /> */}
                  <InputGroup>
                    <input
                      type="text"
                      className="form-control"
                      name="extent_in_units"
                      placeholder="Enter extent in units..."
                      value={formik.values.extent_in_units}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <InputGroup.Addon>
                      {enquiryDoumentData?.land_units}{" "}
                    </InputGroup.Addon>
                  </InputGroup>
                  {formik.errors.extent_in_units &&
                    formik.touched.extent_in_units && (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.extent_in_units}
                      </h6>
                    )}
                </div>
              </div>
            </div>
            {/* )} */}
            {/** price_per_sqft */}

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="price_per_sqft" className="form-label">
                    Price per unit
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  {/* <input
                    type="number"
                    className="form-control"
                    name="price_per_sqft"
                    placeholder="Enter price per sqft..."
                    value={formik.values.price_per_sqft}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  /> */}
                  <InputGroup>
                    <input
                      type="number"
                      className="form-control"
                      name="price_per_sqft"
                      placeholder="Enter price per sqft..."
                      value={formik.values.price_per_sqft}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <InputGroup.Addon>
                      {enquiryDoumentData?.land_units}{" "}
                    </InputGroup.Addon>
                  </InputGroup>
                  {formik.errors.price_per_sqft &&
                    formik.touched.price_per_sqft && (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.price_per_sqft}
                      </h6>
                    )}
                </div>
              </div>
            </div>

            {/** shop_cost */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="shop_cost" className="form-label">
                      Shop Cost
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="number"
                      className="form-control"
                      name="shop_cost"
                      placeholder="Enter shop cost..."
                      value={formik.values.shop_cost}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                    />
                    {formik.errors.shop_cost && formik.touched.shop_cost && (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.shop_cost}
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/** car_parking_cost */}
            {(subtype === "Building" || subtype === "Complex") && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="car_parking_cost" className="form-label">
                      Car Parking Cost
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="number"
                      className="form-control"
                      name="car_parking_cost"
                      placeholder="Enter car parking cost..."
                      value={formik.values.car_parking_cost}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.car_parking_cost &&
                      formik.touched.car_parking_cost && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.car_parking_cost}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/** total_shop_cost */}

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="total_shop_cost" className="form-label">
                    {subtype === "Building" || subtype === "Complex"
                      ? "Total Shop cost (Exclusive of documentation & registration cost)"
                      : "Total saleable plots cost"}
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="number"
                    className="form-control"
                    name="total_cost"
                    placeholder="Enter total  cost..."
                    value={formik.values.total_cost}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled
                  />
                  {formik.errors.total_cost && formik.touched.total_cost && (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.total_cost}
                    </h6>
                  )}
                </div>
              </div>
            </div>

            <hr />
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="carparking" className="form-label">
                    File
                  </label>
                </div>
                <div className="col-7 mb-3 ">
                  <input
                    type="file"
                    className="form-control"
                    name="file"
                    // value={formik.values.file}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "file",
                        event.currentTarget.files[0]
                      );
                    }}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.file && formik.touched.file ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.file}
                    </p>
                  ) : null}
                </div>
                {url && (
                  <div className="col-1">
                    <button
                      type="button"
                      className="btn1"
                      onClick={viewDocument}
                    >
                      <RemoveRedEyeIcon />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="text-end gap-3">
              {staffid.Login === "staff" &&
                (status === "pending" || status === "complete") && (
                  <>
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={() => setIsEditing(false)}
                      disabled={loading}
                    >
                      {loading ? (
                        <ThreeDots
                          visible={true}
                          height="25"
                          width="55"
                          color="#ffffff"
                          radius="18"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{
                            justifyContent: "center",
                            fontSize: "12px",
                          }}
                          wrapperClass=""
                        />
                      ) : (
                        "Update "
                      )}
                    </Button>
                  </>
                )}
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default LandOwnerDraftCom;
