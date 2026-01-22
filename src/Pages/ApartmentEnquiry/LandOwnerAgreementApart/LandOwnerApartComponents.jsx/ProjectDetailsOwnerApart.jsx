import { useEffect,useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup } from "rsuite";
import { ThreeDots } from "react-loader-spinner";
import { fetchState } from "../../../../Redux/Actions/MasterPage/StateAction";
import { fetchDistrict } from "../../../../Redux/Actions/MasterPage/DistrictAction";
import { fetchTaluk } from "../../../../Redux/Actions/MasterPage/TalukAction";
import { fetchPincode } from "../../../../Redux/Actions/MasterPage/PincodeAction";
import { fetchVillage } from "../../../../Redux/Actions/MasterPage/VillageAction";
import Toast from "../../../../Utils/Toast";
import customStyle from "../../../../Utils/tableStyle";
import GeneralDistrict from "../../../../Utils/Dropdown/GeneralDistrict";
import GeneralTalukDropdown from "../../../../Utils/Dropdown/GeneralTalukDropdown";
import GeneralVillageDropdown from "../../../../Utils/Dropdown/GeneralVillageDropdown";
import GeneralSroDropdown from "../../../../Utils/Dropdown/GeneralSroDropdown";
import GeneralPincodeDropdown from "../../../../Utils/Dropdown/GeneralPincodeDropdown";
import GeneralState from "../../../../Utils/Dropdown/GeneralState";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";



const ProjectDetailsOwnerApart = ({ eid, id, status, pagetype }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [newDialog, setNewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [prDetails, setPrDetails] = useState([]);
  const StateData = useSelector((state) => state.State.StateNameData);
  const DistrictData = useSelector((state) => state.District.districtData);
  const talukData = useSelector((state) => state.Taluk.TalukData);
  const VillageData = useSelector((state) => state.Village.villageData);
  const pincodeData = useSelector((state) => state.Pincode.PincodeData);
  const [loading, setLoading] = useState(false)
  const [sroData, setSroData] = useState([]);
  const [url, setUrl] = useState(null);
  const dispatch = useDispatch();

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
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  const column = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "PropertyId",
      selector: (row) => row.property_id,
      sortable: true,
    },
    {
      name: "State",
      selector: (row) => row.state_name,
      sortable: true,
    },
    {
      name: "District",
      selector: (row) => row.district_name,
      sortable: true,
    },
    {
      name: "Taluk",
      selector: (row) => row.taluk_name,
      sortable: true,
    },
    {
      name: "Village",
      selector: (row) => row.village_name,
      sortable: true,
    },
    {
      name: "Sro",
      selector: (row) => row.sro_title,
      sortable: true,
    },
    {
      name: "Pincode",
      selector: (row) => row.pincode_name,
      sortable: true,
    },
    {
      name: "ProjectName",
      selector: (row) => row.project_name,
      sortable: true,
    },
    {
      name: "DTCP/CMDA Approval No.",
      selector: (row) => row.approval_no,
      sortable: true,
      width: "230px",
    },
    {
      name: "RERA No",
      selector: (row) => row.rera_no,
      sortable: true,
      width: "150px",
    },
    {
      name: "Planning Permit No",
      selector: (row) => row.planning_permit,
      sortable: true,
      width: "190px",
    },
    {
      name: "Building Permit No",
      selector: (row) => row.building_permit,
      sortable: true,
      width: "190px",
    },
    {
      name: "Apartment No",
      selector: (row) => row.apartment_no,
      sortable: true,
      width: "170px",
    },
    {
      name: "Floor",
      selector: (row) => row.floor,
      sortable: true,
      width: "150px",
    },
    {
      name: "Car Parking",
      selector: (row) => row.car_parking,
      sortable: true,
      width: "150px",
    },
    {
      name: "Total Land Area (Units)",
      selector: (row) => row.land_area,
      sortable: true,
      width: "220px",
    },
    {
      name: "Built up area (Units)",
      selector: (row) => row.builtup_area,
      sortable: true,
      width: "220px",
    },
    {
      name: "Common Area (Units)",
      selector: (row) => row.common_area,
      sortable: true,
      width: "220px",
    },
    {
      name: "Super Built up area ",
      selector: (row) => row.saleable_area,
      sortable: true,
      width: "190px",
    },
    {
      name: "UDS (Units)",
      selector: (row) => row.uds,
      sortable: true,
      width: "150px",
    },
    {
      name: "No of BHK",
      selector: (row) => row.bhk_count,
      sortable: true,
      width: "150px",
    },
    {
      name: "Facing",
      selector: (row) => row.facing,
      sortable: true,
    },
    {
      name: "Price per Sq.Ft",
      selector: (row) => row.sqft_price,
      sortable: true,
      width: "170px",
    },
    {
      name: "Apartment Cost",
      selector: (row) => row.apartment_cost,
      sortable: true,
      width: "170px",
    },
    {
      name: "Car Parking Cost",
      selector: (row) => row.car_parking_cost,
      sortable: true,
      width: "170px",
    },
    {
      name: "Total aparment cost",
      selector: (row) => row.total_apartment_cost,
      sortable: true,
      width: "190px",
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
      staffid.Login == "staff" &&
      pagetype !== "reminder"
      && prDetails[0]?.status !== "signed" &&
      enquiryDoumentData?.status !== "booking" ?
      [
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
    formik.setFieldValue("projectname", row.project_name);
    formik.setFieldValue("aprovalno", row.approval_no);
    formik.setFieldValue("rerano", row.rera_no);
    formik.setFieldValue("planningno", row.planning_permit);
    formik.setFieldValue("buildingno", row.building_permit);
    formik.setFieldValue("aprtno", row.apartment_no);
    formik.setFieldValue("nobhk", row.bhk_count);
    formik.setFieldValue("facing", row.facing);
    formik.setFieldValue("floor", row.floor);
    formik.setFieldValue("landarea", row.land_area);
    formik.setFieldValue("builtarea", row.builtup_area);
    formik.setFieldValue("commonarea", row.common_area);
    formik.setFieldValue("superarea", row.saleable_area);
    formik.setFieldValue("uds", row.uds);
    formik.setFieldValue("carparking", row.car_parking);
    formik.setFieldValue("priceper", row.sqft_price);
    formik.setFieldValue("apartcost", row.apartment_cost);
    formik.setFieldValue("parkingcost", row.car_parking_cost);
    formik.setFieldValue("total_apart_cost", row.total_apartment_cost);
    formik.setFieldValue("file", row.document);
    formik.setFieldValue("oldfile", row.document);
    setUrl(row.document);

    formik.setFieldValue("id", row.id);
  };
  const viewDocument = () => {
    window.open(`${IMG_PATH}/enquiry/agreement/${url}`, "_blank");
  };

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/apartagreement/${eid}`,
        {}
      );
      setPrDetails(response.data);
    } catch (error) { }
  };

  useEffect(() => {
    fetchDetails();
  }, []);
  const [agreeData, setAgreedata] = useState([]);
  const fetchAgreeData = async () => {
    try {
      const response = await axios.put(`${API_BASE_URL}/apartagreement/${eid}`);
      setAgreedata(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAgreeData();
  }, []);
  const onSubmit = async (values) => {
    if (isEditing) {
      const payload = {
        ...values,
        enqid: eid,
        agreeid: id,
        status: null,
      };
      setLoading(true)
      try {
        await axios.post(`${API_BASE_URL}/apartagreement`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        formik.resetForm();
        Toast({ message: "Successfully Updated", type: "success" });
        // setNewDialog(false)
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
      };
      setLoading(true)
      try {
        await axios.post(`${API_BASE_URL}/apartagreement`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        formik.resetForm();
        Toast({ message: "Successfully Submited", type: "success" });
        setNewDialog(false);
        fetchDetails();
        setLoading(false)
      } catch (error) {
        alert(error);
        setLoading(false)
      }
    }
  };

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
      projectname: "",
      aprovalno: "",
      rerano: "",
      planningno: "",
      buildingno: "",
      aprtno: "",
      nobhk: "",
      facing: "",
      floor: "",
      landarea: "",
      builtarea: "",
      commonarea: "",
      superarea: "",
      uds: "",
      carparking: "",
      priceper: "",
      apartcost: "",
      parkingcost: "",
      total_apart_cost: "",
      file: "",
      oldfile: "",
      status: "pending",
    },
    validationSchema: yup.object().shape({
      type: yup.string().required("village type is required !!"),
      state: yup.string().required("state is required !!"),
      district: yup.string().required("district is required !!"),
      taluk: yup.string().required("taluk is required !!"),
      village: yup.string().required("village is required !!"),
      sro: yup.string().required("sro is required !!"),
      // pincode: yup.string().required("pincode is required !!"),
      projectname: yup.string().required("projectname is required !!"),
      aprovalno: yup.string().required("aprovalno is required !!"),
      rerano: yup.string().required("rerano is required !!"),
      planningno: yup.string().required("planning permit no is required !!"),
      buildingno: yup.string().required("building permit no is required !!"),
      aprtno: yup.string().required("aprtment no is required !!"),
      nobhk: yup.string().required("no of bhk is required !!"),
      facing: yup.string().required("facing is required !!"),
      floor: yup.string().required("floor is required !!"),
      landarea: yup.string().required("landarea units is required !!"),
      builtarea: yup.string().required("builtarea is required !!"),
      commonarea: yup.string().required("commonarea is required !!"),
      superarea: yup.string().required("super built up area is required !!"),
      uds: yup.string().required("uds is required !!"),
      priceper: yup.string().required("priceper is required !!"),
      apartcost: yup.string().required("apartcost is required !!"),
      total_apart_cost: yup
        .string()
        .required("total_apart_cost is required !!"),
      file: yup.mixed().required("File is required !!"),
    }),
    onSubmit,
  });
  useEffect(() => {
    const landarea = parseFloat(formik.values.landarea) || 0;
    const priceper = parseFloat(formik.values.priceper) || 0;
    const apartcost = landarea * priceper;
    formik.setFieldValue("apartcost", apartcost || "");
  }, [formik.values.landarea, formik.values.priceper]);

  useEffect(() => {
    const apartcost = parseFloat(formik.values.apartcost) || 0;
    const parkingcost = parseFloat(formik.values.parkingcost) || 0;
    const total = apartcost + parkingcost;
    formik.setFieldValue("total_apart_cost", total || "");
  }, [formik.values.apartcost, formik.values.parkingcost]);

  const handleCreate = () => {
    setNewDialog(true);
    formik.setFieldValue("type", agreeData[0]?.village_type);
    formik.setFieldValue("state", agreeData[0]?.state);
    formik.setFieldValue("district", agreeData[0]?.district);
    formik.setFieldValue("taluk", agreeData[0]?.taluk);
    formik.setFieldValue("village", agreeData[0]?.village);
    formik.setFieldValue("sro", agreeData[0]?.sro);
    formik.setFieldValue("pincode", agreeData[0]?.pincode);
    formik.setFieldValue("landarea", enquiryDoumentData?.land_extent_total);
    formik.setFieldValue("priceper", enquiryDoumentData?.price_per_unit);
    formik.setFieldValue("projectname", agreeData[0]?.project_name);
    formik.setFieldValue("aprovalno", agreeData[0]?.approval_no);
    formik.setFieldValue("rerano", agreeData[0]?.rera_no);
    formik.setFieldValue("planningno", agreeData[0]?.planing_permit_no);
    formik.setFieldValue("buildingno", agreeData[0]?.building_permit_no);
    formik.setFieldValue("aprtno", agreeData[0]?.apartment_no);
    formik.setFieldValue("nobhk", agreeData[0]?.rera_no);
    formik.setFieldValue("facing", agreeData[0]?.facing);
    formik.setFieldValue("floor", agreeData[0]?.floor);
    formik.setFieldValue("builtarea", agreeData[0]?.builtup_area);
    formik.setFieldValue("superarea", agreeData[0]?.super_area);
    formik.setFieldValue("commonarea", agreeData[0]?.common_area);
    formik.setFieldValue("uds", agreeData[0]?.uds_size);
    formik.setFieldValue("carparking", agreeData[0]?.car_parking);
  };

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
  return (
    <>
      <div className="col-12 mt-4">
        <div className="card shadow border-0 mb-3">
          <div className="card shadow border-0 p-4">
            <div className="  justify-content-between mb-3">
              <h6>Land Owner Agreement </h6>
              <hr />
            </div>
            {prDetails?.length === 0 ? (
              <div className="d-flex justify-content-center">
                <button className="btn1" onClick={handleCreate}>
                  +Create Agreement
                </button>
              </div>
            ) : (
              <DataTable
                persistTableHead={true}
                columns={column}
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
                    disabled={formik.values.type}
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
                  <GeneralState
                    value={formik.values.state}
                    onChange={(value) => {
                      formik.setFieldValue("state", value);
                      formik.setFieldValue("district", "");
                      formik.setFieldValue("taluk", "");
                      formik.setFieldValue("village", "");
                    }}
                    onBlur={() => formik.setFieldTouched("state", true)}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
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
                    Village
                  </label>
                </div>
                <div className="col-8 mb-3 ">
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
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    Project Name
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="projectname"
                    placeholder="enter project name..."
                    value={formik.values.projectname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.values.projectname}
                  />
                  {formik.errors.projectname && formik.touched.projectname ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.projectname}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    DTCP / CMDA Approval No.
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="aprovalno"
                    placeholder="enter aproval no..."
                    value={formik.values.aprovalno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.values.aprovalno}
                  />
                  {formik.errors.aprovalno && formik.touched.aprovalno ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.aprovalno}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    RERA No
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="rerano"
                    placeholder="enter rera no..."
                    value={formik.values.rerano}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.values.rerano}
                  />
                  {formik.errors.rerano && formik.touched.rerano ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.rerano}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Planning Permit No.
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="planningno"
                    placeholder="enter planing permit no..."
                    value={formik.values.planningno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.values.planningno}
                  />
                  {formik.errors.planningno && formik.touched.planningno ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.planningno}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Building Permit No.
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="buildingno"
                    placeholder="Enter building permit no ..."
                    value={formik.values.buildingno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.values.buildingno}
                  />
                  {formik.errors.buildingno && formik.touched.buildingno ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.buildingno}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Apartment No.
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="aprtno"
                    placeholder="Enter apartment no ..."
                    value={formik.values.aprtno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.values.aprtno}
                  />
                  {formik.errors.aprtno && formik.touched.aprtno ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.aprtno}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    No of BHK
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="nobhk"
                    id="nobhk"
                    className="form-control"
                    placeholder="Enter no of bhk ..."
                    type="text"
                    value={formik.values.nobhk}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.values.nobhk}
                  />

                  {formik.errors.nobhk && formik.touched.nobhk ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.nobhk}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Facing
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="facing"
                    id="facing"
                    className="form-control"
                    placeholder="Enter facing ..."
                    value={formik.values.facing}
                    onChange={(e) => {
                      const regex = /^[A-Za-z\s]*$/;
                      if (regex.test(e.target.value)) {
                        formik.handleChange(e);
                      } else {
                        alert("Please Enter Letters Only");
                      }
                    }}
                    onBlur={formik.handleBlur}
                    disabled={formik.values.facing}
                  />

                  {formik.errors.facing && formik.touched.facing ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.facing}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Floor
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="floor"
                    id="floor"
                    className="form-control"
                    placeholder="Enter floor ..."
                    value={formik.values.floor}
                    onChange={(e) => {
                      const regex = /^[0-9]*$/;
                      if (regex.test(e.target.value)) {
                        formik.handleChange(e);
                      } else {
                        alert("Please Enter Number Only");
                      }
                    }}
                    onBlur={formik.handleBlur}
                    disabled={formik.values.floor}
                  />

                  {formik.errors.floor && formik.touched.floor ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.floor}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="builtarea" className="form-label">
                    Built up area (units)
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="builtarea"
                    id="builtarea"
                    className="form-control"
                    placeholder="Enter built up area ..."
                    value={formik.values.builtarea}
                    onChange={(e) => {
                      const regex = /^[0-9]*$/;
                      if (regex.test(e.target.value)) {
                        formik.handleChange(e);
                      } else {
                        alert("Please Enter Number Only");
                      }
                    }}
                    onBlur={formik.handleBlur}
                    disabled={formik.values.builtarea}
                  />
                  {formik.errors.builtarea && formik.touched.builtarea ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.builtarea}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="builtarea" className="form-label">
                    Common Area (units)
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="commonarea"
                    id="commonarea"
                    className="form-control"
                    placeholder="Enter common area ..."
                    value={formik.values.commonarea}
                    onChange={(e) => {
                      const regex = /^[0-9]*$/;
                      if (regex.test(e.target.value)) {
                        formik.handleChange(e);
                      } else {
                        alert("Please Enter Number Only");
                      }
                    }}
                    onBlur={formik.handleBlur}
                    disabled={formik.values.commonarea}
                  />
                  {formik.errors.commonarea && formik.touched.commonarea ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.commonarea}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Super Built up area / Saleable Area (units)
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="superarea"
                    placeholder="Enter super built up area ..."
                    value={formik.values.superarea}
                    onChange={(e) => {
                      const regex = /^[0-9]*$/;
                      if (regex.test(e.target.value)) {
                        formik.handleChange(e);
                      } else {
                        alert("Please Enter Number Only");
                      }
                    }}
                    onBlur={formik.handleBlur}
                    disabled={formik.values.superarea}
                  />

                  {formik.errors.superarea && formik.touched.superarea ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.superarea}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    UDS
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="uds"
                    placeholder="Enter uds..."
                    value={formik.values.uds}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.values.uds}
                  />

                  {formik.errors.uds && formik.touched.uds ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.uds}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
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
                    placeholder="car parking ..."
                    value={formik.values.carparking}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.values.carparking}
                  />

                  {formik.errors.carparking && formik.touched.carparking ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.carparking}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="builtarea" className="form-label">
                    Total Land Area (Units)
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <InputGroup>
                    <input
                      name="landarea"
                      id="landarea"
                      className="form-control"
                      placeholder="Enter total land area ..."
                      value={formik.values.landarea}
                      onChange={(e) => {
                        const regex = /^[0-9]*$/;
                        if (regex.test(e.target.value)) {
                          formik.handleChange(e);
                        } else {
                          alert("Please Enter Number Only");
                        }
                      }}
                      onBlur={formik.handleBlur}
                      disabled
                    />
                    <InputGroup.Addon>
                      {enquiryDoumentData?.land_units}{" "}
                    </InputGroup.Addon>
                  </InputGroup>
                  {formik.errors.landarea && formik.touched.landarea ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.landarea}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="carparking" className="form-label">
                    Price per unit
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <InputGroup>
                    <input
                      type="text"
                      className="form-control"
                      name="priceper"
                      placeholder="Price per unit"
                      value={formik.values.priceper}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={enquiryDoumentData?.price_per_unit}
                    />
                    <InputGroup.Addon>
                      {enquiryDoumentData?.land_units}{" "}
                    </InputGroup.Addon>
                  </InputGroup>

                  {formik.errors.priceper && formik.touched.priceper ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.priceper}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="carparking" className="form-label">
                    Apartment Cost
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="apartcost"
                    placeholder=" Apartment Cost..,"
                    value={formik.values.apartcost}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled
                  />

                  {formik.errors.apartcost && formik.touched.apartcost ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.apartcost}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="carparking" className="form-label">
                    Car Parking Cost
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="parkingcost"
                    placeholder="Car Parking Cost."
                    value={formik.values.parkingcost}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.parkingcost && formik.touched.parkingcost ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.parkingcost}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="carparking" className="form-label">
                    Total aparment cost
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="total_apart_cost"
                    placeholder=" Total aparment cost ..."
                    value={formik.values.total_apart_cost}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled
                  />

                  {formik.errors.total_apart_cost &&
                    formik.touched.total_apart_cost ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.total_apart_cost}
                    </p>
                  ) : null}
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
    </>
  );
};

export default ProjectDetailsOwnerApart;
