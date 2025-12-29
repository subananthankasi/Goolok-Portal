import React, { useEffect, useState } from "react";
import "../mastercss.css";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupTypeEdit from "./groupTypeEdit";
import { SearchData } from "../../../Utils/Search";
import ExportButton from "../../../Utils/ExportButton";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Toast from "../../../Utils/Toast";
import customStyle from "../../../Utils/tableStyle";
import { validateFormData } from "./GroupTypeFormValidation";
import { TagPicker } from "rsuite";

////fetch data from redux/////
import { useDispatch, useSelector } from "react-redux";
import {
  addGroupType,
  deleteGroupType,
  fetchGroupType,
  updateGroupType,
} from "../../../Redux/Actions/MasterPage/GroupTypeAction";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import Common from "../../../common/Common";

function GroupType() {
  const GroupTypeData = useSelector((state) => state.GroupType.GroupTypeData);
  const isLoading = useSelector((state) => state.GroupType.isLoading);
  const addLoading = useSelector((state) => state.GroupType.addLoading);
  const updateLoading = useSelector((state) => state.GroupType.updateLoading);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    dispatch(fetchGroupType());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    group_name: " ",
    pagename: [],
    status: "Enable",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleTagChange = (value) => {
    setFormData({
      ...formData,
      pagename: value,
    });
  };
  const [errors, setErrors] = useState({});
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const validationResult = validateFormData(formData);
  //   if (validationResult.isValid) {
  //     Toast({ message: "Added successfully", type: "success" });
  //     setErrors({});
  //     setFormData({ group_name: "", status: "Enable" });
  //     await dispatch(addGroupType(formData));
  //   } else {
  //     setErrors(validationResult.errors);
  //   }
  // };
  const { cleanText } = Common()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = validateFormData(formData);
    const payload = {
      ...formData,
      group_name: cleanText(formData.group_name),
    }
    if (validationResult.isValid) {
      if (isEditing) {
        const res = await dispatch(updateGroupType(payload));
        if (res.success) {
          setIsEditing(false);
          setFormData({ group_name: "", status: "Enable", pagename: [] });
          Toast({ message: "Updated Successfully", type: "success" });
          setErrors({});
          closeModal();
        } else {
          setErrors(res?.error);
        }

      } else {

        const res = await dispatch(addGroupType(payload));
        if (res.success) {
          Toast({ message: "Added successfully", type: "success" });
          setErrors({});
          setFormData({ group_name: "", status: "Enable", pagename: [] });
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
      selector: (row) => row.createdat,
      sortable: true,
    },
    {
      name: "Group Type",
      selector: (row) => row.group_name,
      sortable: true,
    },
    // {
    //   name: "Allow pages",
    //   selector: (row) => row.pages?.join(", ") ?? "-",
    //   sortable: true,
    //   width: "200px",
    // },
    {
      name: "Allow pages",
      selector: (row) => row.pages?.join(", ") ?? "-",
      sortable: true,
      width: "170px",
      cell: (row) => (
        <span
          style={{
            display: "inline-block",
            maxWidth: "170px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={row.pages?.join(", ")}
        >
          {row.pages?.join(", ") ?? "-"}
        </span>
      ),
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
              // openModal();
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
  const searchColumns = ["sno", "status", "group_name", "createdat"];
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(GroupTypeData, filterText, searchColumns);

  /////////////////////////////////////

  const [editData, setEditData] = useState();
  const handleEdit = (row) => {
    // setEditData(row);
    setIsEditing(true);
    setFormData({
      group_name: row.group_name || "",
      pagename: row.pages || [],
      status: row.status || "Enable",
      id: row.id || "",
    });
  };

  const handleDelete = (row) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
      try {
        dispatch(deleteGroupType(row.id));
        Toast({ message: "Successfully Deleted", type: "error" });
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  // editing modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const data = [
    "Document verification",
    "Advance",
    "Location verification",
    "Market research",
    "Price proposal",
    "Payment for legal opinion",
    "Lawyer documents",
    "Mandatory document",
    "Field survey",
    "Landowner agreement",
    "Pricing department",
    "Media department",
    "Content writing",
    "After sales",
    "CMS",
    "Telecalling",
    "Get patta",
    "Find your property",
    "Legal opinion",
    "Land survey",
    "Property valuation",
    "Missing documents",
  ].map((item) => ({ label: item, value: item }));
  return (
    <>
      <GroupTypeEdit
        isOpen={isModalOpen}
        closeModal={closeModal}
        editData={editData}
      />
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="page_heading">Add Group Type</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-12 mb-3 ">
                        <label htmlFor="lastName" className="form-label">
                          Group Type
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="group_name"
                          autocomplete="off"
                          value={formData.group_name}
                          onChange={handleChange}
                        />
                        {errors.group_name && (
                          <div className="validation_msg">
                            {errors.group_name}
                          </div>
                        )}
                      </div>
                      <div className="col-md-12 mb-3 ">
                        <label htmlFor="lastName" className="form-label">
                          Allow Pages
                        </label>
                        <TagPicker
                          data={data}
                          style={{
                            width: "100%",
                            height: "100px",
                            overflowY: "scroll",
                          }}
                          menuStyle={{ width: 200, maxHeight: "150px" }}
                          value={formData.pagename}
                          onChange={handleTagChange}
                          name="pagename"
                        />
                        {errors.pagename && (
                          <div className="validation_msg">
                            {errors.pagename}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-3 col-md-12">
                      <label className="form-label" htmlFor="inputState">
                        Status
                      </label>
                      <select
                        name="status"
                        className="form-select"
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
                      <a
                        href="javascript:void(0);"
                        className="btn1 text-dark me-1"
                        onClick={() => {
                          setFormData({
                            group_name: "",
                            type: "",
                            status: "Enable",
                          });
                          setErrors({});
                          setIsEditing(false);
                        }}
                      >
                        {isEditing ? "Cancel" : "Clear"}
                      </a>

                      <button
                        type="submit"
                        className="btn1"
                        disabled={addLoading || updateLoading}
                      >
                        {/* Add */}
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
                      {" "}
                      <ExportButton
                        columns={columns}
                        data={GroupTypeData}
                        filename={"GroupType.csv"}
                      />{" "}
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
                      // selectableRows
                      fixedHeader
                      progressPending={isLoading}
                      progressComponent={<CustomLoder />}
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

export default GroupType;
