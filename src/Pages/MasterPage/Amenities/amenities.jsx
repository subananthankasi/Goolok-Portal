import React, { useEffect, useState } from "react";
import "../mastercss.css";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExportButton from "../../../Utils/ExportButton";
import { SearchData } from "../../../Utils/Search";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../Utils/Toast";
import { DeleteById } from "../../../Utils/DeleteById";
import customStyle from "../../../Utils/tableStyle";
import PropertyTypeDropDown, { usePropertyOptions } from "../../../Utils/SelectDropDown/PropertyTypeDropDown";
import { fetchAmenitiesHeading } from "../../../Redux/Actions/Amenities/AmenitieSubHeadingAction";
import Select from "react-select";
import { validateFormDataAmenities } from "./validationAmenities";
import {
  addAmenities,
  deleteAmenities,
  fetchAmenities,
  updateAmenities,
} from "../../../Redux/Actions/Amenities/AmenitiesAction";
import * as FaIcons from "react-icons/fa";
import { InputPicker } from "rsuite";
import Common from "../../../common/Common";

function Amenities() {
  const allIcons = Object.keys(FaIcons).map((key) => ({
    value: key,
    label: key.replace("Fa", ""),
    icon: React.createElement(FaIcons[key]),
  }));;
  const [selected, setSelected] = useState(null);
  const typeDropDown = usePropertyOptions();
  const AmnenitiestData = useSelector((state) => state.Amenities.Amenities);
  const isLoading = useSelector((state) => state.Amenities.isLoading);
  const addLoading = useSelector((state) => state.Amenities.addLoading);
  const updateLoading = useSelector((state) => state.Amenities.updateLoading);
  const PropertyTypeData = useSelector((state) => state.PropertyType.PropertyTypeData);


  const AmenitiesSubTitle = useSelector(
    (state) => state.AmenitiesHeading.AmenitiesHeading
  );

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedHeading, setSelectedHeading] = useState(null);

  const handlePropertySelect = (data) => {
    setSelectedProperty(data);
  };
  const handleHeading = (data) => {
    setSelectedHeading(data);
  };

  const enableSubHeading = AmenitiesSubTitle.filter(
    (data) => data.status === "Enable"
  );
  const filterData =
    selectedProperty && selectedProperty.value
      ? enableSubHeading.filter(
        (data) => data.property === selectedProperty.value
      )
      : [];
  const subHeadingOptions = filterData.map((data) => ({
    value: data.id,
    label: data.subamenities,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAmenitiesHeading());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAmenities());
  }, [dispatch]);


  const [formData, setFormData] = useState({
    propertyid: "",
    // subid: " ",
    amenities: "",
    icon: null,
    status: "Enable",
  });

  // dropdown set
  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      propertyid: selectedProperty ? selectedProperty.value : "",
      // subid: selectedHeading ? selectedHeading.value : "",
    }));
  }, [selectedProperty, selectedHeading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // add

  const [errors, setErrors] = useState({});
  const { cleanText } = Common()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = validateFormDataAmenities(formData);
    const payload = {
      ...formData,
      amenities: cleanText(formData.amenities),
    }
    if (validationResult.isValid) {
      if (isEditing) {
        const res = await dispatch(updateAmenities(payload));
        if (res.success) {
          Toast({ message: "Updated successfully", type: "success" });
          setErrors({});
          setFormData({ amenities: "", status: "Enable", icon: null });
          setSelectedProperty(null);
          setSelectedHeading(null);
          setIsEditing(false)
        } else {
          setErrors(res?.error);
        }
      } else {
        const res = await dispatch(addAmenities(payload));
        if (res.success) {
          Toast({ message: "Added successfully", type: "success" });
          setErrors({});
          setFormData({ amenities: "", status: "Enable", icon: null });
          setSelectedProperty(null);
          setSelectedHeading(null);
        } else {
          setErrors(res?.error);
        }
      }

    } else {
      setErrors(validationResult.errors);
    }
  };

  const columns = [
    {
      name: "S.no",
      selector: (row) => row.sno,
      sortable: true,
    },
    {
      name: "Date",
      // selector: (row) => row.created_at,
      selector: (row) =>  String(row.created_at).split(" ")[0].split('-').reverse().join('/'),
      sortable: true,
      wrap: true,
      width: "150px",
    },
    {
      name: "Property Type",
      selector: (row) => row.property_type,
      sortable: true,
      width: "150px",
    },
    // {
    //   name: "Amenities SubHeading",
    //   selector: (row) => row.subamenities,
    //   sortable: true,
    //   width: "150px",
    // },
    {
      name: "Amenities",
      selector: (row) => row.amenities,
      sortable: true,
      width: "150px",
    },
    {
      name: "Amenities icon",
      selector: (row) => row.icon,
      cell: (row) => {
        const IconComponent = FaIcons[row.icon];
        return IconComponent ? <IconComponent size={20} /> : row.icon;
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <button
            className="btn  btn-outline-info me-1 edit"
            data-tooltip-id="edit"
            onClick={() => {
              handleEdit(row);
            }}
          >
            <EditIcon />
          </button>
          <button
            className="btn btn-outline-danger delete"
            data-tooltip-id="delete"
            onClick={() => handleDelete(row)}
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  // search function
  const [filterText, setFilterText] = useState("");
  const searchColumns = [
    "sno",
    "createdat",
    "subpro_name",
    "document",
    "prop_status",
    "property_type",
  ];

  // filter
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(AmnenitiestData, filterText, searchColumns);
  const [isEditing, setIsEditing] = useState(false);
  /////////////////////////////////////
  const [editData, setEditData] = useState();

  const handleEdit = (row) => {
    setIsEditing(true);
    const defaultOptionsType = typeDropDown.find(
      (option) => option.value === row.propertyid
    );
    setSelectedProperty(defaultOptionsType);
    setSelectedProperty(defaultOptionsType);
    setFormData({
      propertyid: row.propertyid || "",
      amenities: row.amenities || [],
      icon: row.icon || [],
      status: row.status || "Enable",
      id: row.id || "",
    });
  };

  // delete
  const handleDelete = (row) => {
    DeleteById(row.id, deleteAmenities, dispatch);
  };
  // editing modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="page_heading">Add Amenities</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-12 mb-3 ">
                        <label className="form-label" htmlFor="inputState">
                          Propert Type
                        </label>
                        <PropertyTypeDropDown
                          onSelect={handlePropertySelect}
                          selectedProperty={selectedProperty}
                        />
                        {errors.propertyid && (
                          <div className="validation_msg">
                            {errors.propertyid}
                          </div>
                        )}
                      </div>

                      {/* <div className="col-md-12 mb-3 ">
                        <label className="form-label" htmlFor="inputState">
                          Amenities Sub Heading
                        </label>
                        <Select
                          options={subHeadingOptions}
                          onChange={handleHeading}
                          value={selectedHeading}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderColor: state.isFocused
                                ? "#e7e7e7"
                                : "#e7e7e7",
                              fontSize: "13px",
                            }),
                            option: (baseStyles, state) => ({
                              ...baseStyles,
                              fontSize: "12px",
                              color: "black",
                            }),
                          }}
                        />
                        {errors.subid && (
                          <div className="validation_msg">{errors.subid}</div>
                        )}
                      </div> */}

                      <div className="col-md-12 mb-3 ">
                        <label htmlFor="lastName" className="form-label">
                          Amenities
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="amenities"
                          value={formData.amenities}
                          onChange={handleChange}
                        />
                        {errors.amenities && (
                          <div className="validation_msg">
                            {errors.amenities}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12 mb-3 form-group d-block">
                      <label htmlFor="lastName" className="form-label">
                        Amenities icon
                      </label>
                      <InputPicker
                        name="icon"
                        data={allIcons}
                        // value={selected}
                        value={formData.icon}
                        // onChange={setSelected}
                        onChange={(value) => {
                          setFormData({
                            ...formData,
                            icon: value,
                          });
                        }}
                        style={{ width: "100%" }}
                        placeholder="Select an icon"
                        renderMenuItem={(label, item) => (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            {item.icon} {label}
                          </div>
                        )}
                        renderValue={(value, item) => (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            {item?.icon} {item?.label}
                          </div>
                        )}
                      />
                      {errors.icon && (
                        <div className="validation_msg">{errors.icon}</div>
                      )}
                    </div>

                    <div className="mb-3 col-md-12">
                      <label className="form-label" htmlFor="inputState">
                        Status
                      </label>
                      <select
                        id="inputState"
                        className="form-select"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="Enable">Enable</option>
                        <option value="Disable">Disable</option>
                      </select>
                      {errors.status && (
                        <div className="validation_msg">{errors.status}</div>
                      )}
                    </div>

                    <div className="text-end py-3 px-3">
                      <button
                        type="button"
                        className="btn1 text-dark me-1"
                        onClick={() => {
                          setErrors({});
                          setFormData({ amenities: "", status: "Enable", icon: null });
                          setSelectedProperty(null);
                          setSelectedHeading(null);
                          setIsEditing(false)
                        }}
                      >
                        {isEditing ? "Cancel" : "Clear"}
                      </button>
                      <button type="submit" className="btn1" disabled={addLoading || updateLoading}>
                        {isEditing
                          ? updateLoading
                            ? "Updating..."
                            : "Update"
                          : addLoading
                            ? "Processing..."
                            : "Add"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-sm-6">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex">
                    <h4 className="page_heading">Report</h4>
                    <div style={{ marginLeft: "auto" }}>
                      <ExportButton
                        columns={columns}
                        data={AmnenitiestData}
                        filename={"property_document.csv"}
                      />
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="col-lg-12  mb-4">
                    <div className="searchbar">
                      <input
                        type="text"
                        className="search"
                        onChange={handleFilter}
                        placeholder="..Search"
                      ></input>
                    </div>
                    <DataTable
                      columns={columns}
                      data={filterdata}
                      customStyles={customStyle}
                      pagination
                      persistTableHead={true}
                      fixedHeader
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ReactTooltip
        id="edit"
        place="bottom"
        content="Edit"
        style={{ fontSize: "10px" }}
      />
      <ReactTooltip
        id="delete"
        place="bottom"
        content="Delete"
        style={{ fontSize: "10px" }}
      />
    </>
  );
}

export default Amenities;
