import { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { InputGroup } from "rsuite";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import { ThreeDots } from "react-loader-spinner";
import Button from "@mui/material/Button";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import { DateFormatcustom } from "../../../../Utils/DateFormatcustom";
import { AgeCalculate } from "../../../../Utils/AgeCalculate";
import Toast from "../../../../Utils/Toast";
import customStyle from "../../../../Utils/tableStyle";
import GeneralState from "../../../../Utils/Dropdown/GeneralState";
import GeneralDistrict from "../../../../Utils/Dropdown/GeneralDistrict";
import GeneralTalukDropdown from "../../../../Utils/Dropdown/GeneralTalukDropdown";
import GeneralVillageDropdown from "../../../../Utils/Dropdown/GeneralVillageDropdown";
import GeneralSroDropdown from "../../../../Utils/Dropdown/GeneralSroDropdown";
import GeneralPincodeDropdown from "../../../../Utils/Dropdown/GeneralPincodeDropdown";

export const LandOwnerAgreement = ({ eid, id, status, pagetype }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [newDialog, setNewDialog] = useState(false);

  // fetch data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProposalData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/enquirylandowner/${eid}`
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [eid]);

  useEffect(() => {
    fetchProposalData();
  }, [fetchProposalData]);

  const [agreeData, setAgreeData] = useState([]);
  useEffect(() => {
    const fetchAgreeData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/agreedata/${eid}`, {
          headers: {
            "Gl-Status": "customer",
          },
        });
        setAgreeData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAgreeData();
  }, [eid]);


  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  const columns = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => DateFormatcustom(row.created_at),
      sortable: true,
    },
    {
      name: "Property ID",
      selector: (row) => row.property_id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Age",
      selector: (row) => AgeCalculate(row.created_at),
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
      name: "Pincode",
      selector: (row) => row.pincode_name,
      sortable: true,
    },
    ...(data[0]?.patta_type === "Town_patta" &&
      data[0]?.subpro_name !== "Agricultural Land"
      ? [
        {
          name: "Ward",
          selector: (row) => row.ward,
          sortable: true,
        },
        {
          name: "Block",
          selector: (row) => row.block,
          sortable: true,
        },
      ]
      : []),
    {
      name: "SRO",
      selector: (row) => row.sro_title,
      sortable: true,
    },
    {
      name: "Land classification",
      selector: (row) => row.classification,
      sortable: true,
      width: "150px",
    },
    {
      name: "Total Extent in units",
      selector: (row) => `${row.units} / ${enquiryDoumentData?.land_units} `,
      sortable: true,
      width: "150px",
    },
    {
      name: "Per unit price ",
      selector: (row) => row.price,
      sortable: true,
      width: "150px",
    },
    {
      name: "Total land cost",
      selector: (row) => row.total_cost,
      sortable: true,
      width: "150px",
    },
    {
      name: "Road frontage",
      selector: (row) => row.road_frontage,
      sortable: true,
      width: "150px",
    },
    {
      name: "Road facing",
      selector: (row) => row.road_facing,
      sortable: true,
      width: "150px",
    },
    {
      name: "Road width",
      selector: (row) => row.road_width,
      sortable: true,
      width: "150px",
    },
    {
      name: "Boundary wall",
      selector: (row) => row.boundary_wall,
      sortable: true,
      width: "150px",
    },

    {
      name: "Agreement draft",
      cell: (row) => (
        <>
          <a
            href={`${IMG_PATH}/enquiry/agreement/${row.agreement_file}`}
            class="btn btn-warning ms-2"
            download="download"
            target="_blank"
            rel="noopener noreferrer"
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
      width: "170px",
      cell: (row) => (
        <>
          <button
            type="button"
            className={`badge rounded-pill btnhover btn p-2 ${row.status === "pending" ? "bg-danger" : "bg-success"
              }`}
            style={{ width: "60px" }}
          >
            {row.status}
          </button>
        </>
      ),
      sortable: true,
    },
    {
      name: "Signed date",
      width: "170px",
      selector: (row) => row.signed_date,
      sortable: true,
    },

    ...(staffid.logintype === "staff" &&
      (status === "pending" || status === "complete") &&
      pagetype !== "reminder" && data[0]?.status !== "signed"
      ? [
        {
          name: "Edit",
          cell: (row) => (
            <div className="d-flex">
              <button
                className="btn btn-outline-info me-1 edit"
                data-tooltip-id="delete"
                onClick={() => {
                  // setIsModalEdit(true);
                  // setEditData(row);
                  handleEdit(row)
                }}
              >
                <EditIcon />
              </button>
            </div>
          ),
          sortable: true,
        },
      ]
      : []),
  ];

  const [url, setUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = (row) => {
    setNewDialog(true)
    setIsEditing(true);
    formik.setFieldValue("state", row.state);
    formik.setFieldValue("district", row.district);
    formik.setFieldValue("taluk", row.taluk);
    formik.setFieldValue("village", row.village);
    formik.setFieldValue("pincode", row.pincode);
    formik.setFieldValue("sro", row.sro);
    formik.setFieldValue("ward", row.ward);
    formik.setFieldValue("block", row.block);
    formik.setFieldValue("property_id", row.property_id);
    formik.setFieldValue("road_frontage", row.road_frontage);
    formik.setFieldValue("road_facing", row.road_facing);
    formik.setFieldValue("road_width", row.road_width);
    formik.setFieldValue("boundary_wall", row.boundary_wall);
    formik.setFieldValue("classification", row.classification);
    formik.setFieldValue("total_units", row.units);
    formik.setFieldValue("price_acre", row.price);
    formik.setFieldValue("total_cost", row.total_cost);
    formik.setFieldValue("file", row.agreement_file);
    formik.setFieldValue("oldfile", row.agreement_file);
    formik.setFieldValue("id", row.id);
    setUrl(row.agreement_file);
  };


  const [postLoading, setPostLoading] = useState(false);

  const onSubmit = async (values) => {
    setPostLoading(true);
    const payload = {
      ...values,
      enqid: eid,
      agreeid: id,
      project_id: `PROP${1000 + eid}`,
    };
    try {
      await axios.post(
        `${API_BASE_URL}/enquirylandowner`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      Toast({ message: "Added successfully", type: "success" });
      formik.resetForm();
      setPostLoading(false);
      setNewDialog(false)
      setIsEditing(false);
    } catch (error) {
      Toast({ message: "Error to add...Try again!", type: "error" });
      setPostLoading(false);
    } finally {
      setPostLoading(false);
      fetchProposalData()
    }
  };

  const formik = useFormik({
    initialValues: {
      property_id: `PROP${1000 + eid}`,
      state: "",
      district: "",
      taluk: "",
      village: "",
      pincode: "",
      classification: "",
      total_units: "",
      price_acre: "",
      total_cost: "",
      road_frontage: "",
      road_facing: "",
      road_width: "",
      boundary_wall: "",
      sro: "",
      file: "",
      ward: "",
      block: "",
    },
    validationSchema: yup.object().shape({
      property_id: yup.string().required("Property ID is required"),
      state: yup.string().trim().required("State is required"),
      district: yup.string().trim().required("District is required"),
      taluk: yup.string().trim().required("Taluk is required"),
      village: yup.string().trim().required("Village is required"),
      pincode: yup
        .string()
        .required("Pincode is required"),
      classification: yup.string().required("Classification is required"),
      total_units: yup
        .number()
        .typeError("Total units must be a number")
        .positive("Units must be positive")
        .required("Total units is required"),
      price_acre: yup
        .number()
        .typeError("Price per acre must be a number")
        .positive("Price must be positive")
        .required("Price per acre is required"),
      total_cost: yup
        .number()
        .typeError("Total cost must be a number")
        .positive("Cost must be positive")
        .required("Total cost is required"),
      road_frontage: yup.string().required("Road frontage is required"),
      road_facing: yup.string().required("Road facing is required"),
      road_width: yup
        .string()
        .required("Road width is required"),
      boundary_wall: yup.string().required("Boundary wall information required"),
      sro: yup.string().required("SRO is required"),
      file: yup
        .mixed()
        .required("File is required")
    }),
    onSubmit,
  });


  const inputFields = [
    { name: "classification", label: "Classification" },
    { name: "total_units", label: "Total Units" },
    { name: "price_acre", label: "Price Per Acre" },
    { name: "total_cost", label: "Total Cost" },
    { name: "road_frontage", label: "Road Frontage" },
    { name: "road_facing", label: "Road Facing" },
    { name: "road_width", label: "Road Width" },
    { name: "boundary_wall", label: "Boundary Wall" },
  ];
  const handleCreate = () => {
    setNewDialog(true);
    formik.setFieldValue("state", agreeData[0]?.state);
    formik.setFieldValue("district", agreeData[0]?.district);
    formik.setFieldValue("taluk", agreeData[0]?.taluk);
    formik.setFieldValue("village", agreeData[0]?.village);
    formik.setFieldValue("sro", agreeData[0]?.sro);
    formik.setFieldValue("pincode", agreeData[0]?.pincode);
    formik.setFieldValue("ward", agreeData[0]?.ward);
    formik.setFieldValue("block", agreeData[0]?.block);
    formik.setFieldValue("property_id", `PROP${1000 + eid}`);
    formik.setFieldValue("road_frontage", agreeData[0]?.road_frontage);
    formik.setFieldValue("road_facing", agreeData[0]?.facing_width);
    formik.setFieldValue("road_width", agreeData[0]?.road_width);
    formik.setFieldValue("boundary_wall", agreeData[0]?.boundary);
    formik.setFieldValue("classification", agreeData[0]?.classification);
    formik.setFieldValue("total_units", agreeData[0]?.extent);
    formik.setFieldValue("price_acre", agreeData[0]?.priceUnit);
  };

  const isDisabled = (name) => {
    return Boolean(agreeData?.[0]?.[name]) && !isEditing;
  };
  const { total_units, price_acre } = formik.values;
  const { setFieldValue } = formik;

  useEffect(() => {
    const total = parseFloat(total_units) || 0;
    const price = parseFloat(price_acre) || 0;
    const apartcost = total * price;
    setFieldValue("total_cost", apartcost || "");
  }, [total_units, price_acre, setFieldValue]);


  const viewDocument = () => {
    window.open(`${IMG_PATH}/enquiry/agreement/${url}`, "_blank");
  };

  return (
    <>

      {loading ? (
        ""
      ) : (
        <div className="col-12 mt-4">
          <div className="card shadow border-0 mb-4">
            <div className="card shadow border-0 p-4">
              <div className="d-flex justify-content-between">
                <h6>Land Owner Agreement</h6>
              </div>

              <hr />

              {data.length === "0" && staffid.logintype === "staff" ? (
                <div className="container" style={{ maxWidth: "350px" }}>
                  <div className="p-4 text-center">
                    <a
                      href="#0"
                      // onClick={() => setIsModal(true)}
                      onClick={() => handleCreate()}
                      className="btn1"
                    >
                      + Create agreement
                    </a>
                  </div>
                </div>
              ) : (
                <DataTable
                  persistTableHead={true}
                  columns={columns}
                  data={data}
                  customStyles={customStyle}
                  // pagination
                  // selectableRows
                  fixedHeader
                />
              )}
            </div>
          </div>
        </div>
      )}

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
            {inputFields.map(({ name, label }) => (
              <div className="col-md-6 mb-3" key={name}>
                <div className="row">
                  <div className="col-4 mb-3">
                    <label htmlFor={name} className="form-label">
                      {label}
                    </label>
                  </div>
                  <div className="col-8 mb-3">
                    {name === "total_units" ? (
                      <InputGroup>
                        <input
                          type="text"
                          className="form-control"
                          name="total_units"
                          value={formik.values[name]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder={`Enter ${label}...`}
                          disabled={isDisabled(name)}
                        />
                        <InputGroup.Addon>
                          {enquiryDoumentData?.land_units}{" "}
                        </InputGroup.Addon>
                      </InputGroup>
                    ) : name === "price_acre" ? (
                      <InputGroup>
                        <input
                          type="text"
                          className="form-control"
                          name="price_acre"
                          value={formik.values[name]}
                          onChange={formik.handleChange}
                          onKeyPress={(event) => {
                            const regex = /^[0-9]*$/;
                            if (!regex.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          disabled={agreeData[0]?.priceUnit && !isEditing ? true : false}
                        />
                        <InputGroup.Addon>
                          {enquiryDoumentData?.land_units}
                        </InputGroup.Addon>
                      </InputGroup>
                    ) : (
                      <input
                        id={name}
                        name={name}
                        className="form-control"
                        value={formik.values[name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={`Enter ${label}...`}
                        disabled={isDisabled(name)}
                      />
                    )}



                    {formik.errors[name] && formik.touched[name] && (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors[name]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

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
                      disabled={postLoading}
                    >
                      {postLoading ? (
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

