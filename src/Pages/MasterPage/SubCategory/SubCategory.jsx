import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import DeleteIcon from "@mui/icons-material/Delete";
import { SearchData } from "../../../Utils/Search";
import EditIcon from "@mui/icons-material/Edit";
import Toast from "../../../Utils/Toast";
import Select from "react-select";
import ExportButton from "../../../Utils/ExportButton";
import { validateFormData } from "./CategoryValidationFormData";
import { useDispatch, useSelector } from "react-redux";
import { DeleteById } from "../../../Utils/DeleteById";
import { fetchCategory } from "../../../Redux/Actions/MasterPage/CategoryAction";
import EditSubCategory from "./EditSubcategory";
import customStyle from "../../../Utils/tableStyle";
import {
  addSubCategory,
  deleteSubCategory,
  fetchSubCategory,
} from "../../../Redux/Actions/MasterPage/SubCategoryAction";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import Common from "../../../common/Common";

function SubCategory() {
  const CategoryData = useSelector((state) => state.Category.CategoryData);
  const cdispatch = useDispatch();
  useEffect(() => {
    cdispatch(fetchCategory());
  }, [cdispatch]);

  const SubCategoryData = useSelector(
    (state) => state.SubCategory.SubCategoryData
  );
  const isLoading = useSelector((state) => state.SubCategory.isLoading);
  const addLoading = useSelector((state) => state.SubCategory.addLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSubCategory());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    status: "Enable",
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const options = CategoryData.map((data) => ({
    value: data.id,
    label: data.category,
  }));

  const handleChangeSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
    setFormData({
      ...formData,
      category: selectedOption.value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [errors, seterrors] = useState("");
  const { cleanText } = Common()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = validateFormData(formData);
    const payload = {
      ...formData,
      subcategory: cleanText(formData.subcategory),
    }
    if (validationResult.isValid) {
      const res = await dispatch(addSubCategory(payload));
      if (res.success) {
        setSelectedOption(null);
        seterrors("");
        setFormData({ category: "", subcategory: "", status: "Enable" });
        Toast({ message: "Added successfully", type: "success" });
      } else {
        seterrors(res?.error);
      }
    } else {
      seterrors(validationResult.errors);
    }
  };

  const handleDelete = (row) => {
    DeleteById(row.id, deleteSubCategory, dispatch);
  };

  const [editData, setEditData] = useState();
  const handleEdit = (row) => {
    setEditData(row);
    openModal();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      name: "S.no",
      selector: (row) => row.sno,
      sortable: true,
      wrap: true,
    },
    {
      name: "Date ",
      selector: (row) => row.createdat,
      wrap: true,
      sortable: true,
    },
    {
      name: "Category Name",
      selector: (row) => row.category,
      wrap: true,
      width: "180px",
      sortable: true,
    },
    {
      name: "SubCategory Name",
      selector: (row) => row.subcategory,
      wrap: true,
      width: "180px",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      wrap: true,
      width: "180px",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <button
            className="btn  btn-outline-info me-1 edit"
            data-tooltip-id="edit"
            onClick={() => handleEdit(row)}
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

  const [filterText, setFilterText] = useState("");
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(SubCategoryData, filterText, [
    "sno",
    "status",
    "category",
    "subcategory",
    "createdat",
  ]);

  return (
    <>
      <EditSubCategory
        isOpen={isModalOpen}
        closeModal={closeModal}
        editData={editData}
        dropdown={options}
      />
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="page_heading">SubCategory</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-12 mb-3 ">
                        <label htmlFor="category" className="form-label">
                          Category Name
                        </label>
                        <Select
                          options={options}
                          value={selectedOption}
                          onChange={handleChangeSelect}
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
                        {errors.category && (
                          <div className="validation_msg">
                            {errors.category}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label htmlFor="subcategory" className="form-label">
                          SubCategory Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="subcategory"
                          value={formData.subcategory}
                          onChange={handleChange}
                        />
                        {errors.subcategory && (
                          <div className="validation_msg">
                            {errors.subcategory}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-3 col-md-12">
                      <label className="form-label" htmlFor="status">
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
                          setFormData({ subcategory: "", status: "Enable" });
                          seterrors("");
                          setSelectedOption(null);
                        }}
                      >
                        Clear
                      </a>
                      <button
                        type="submit"
                        className="btn1"
                        disabled={addLoading}
                      >
                        {addLoading ? "Processing..." : "Add"}
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
                        data={SubCategoryData}
                        filename={"Subcategory.csv"}
                      />
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="col-lg-12 mb-4">
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
    </>
  );
}

export default SubCategory;
