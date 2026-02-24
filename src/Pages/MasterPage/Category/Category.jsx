import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import DeleteIcon from "@mui/icons-material/Delete";
import { SearchData } from "../../../Utils/Search";
import EditIcon from "@mui/icons-material/Edit";
import Toast from "../../../Utils/Toast";
import ExportButton from "../../../Utils/ExportButton";
import { validateFormData } from "./CategoryValidationFormData";
import { useDispatch, useSelector } from "react-redux";
import { DeleteById } from "../../../Utils/DeleteById";
import {
  addCategory,
  deleteCategory,
  fetchCategory,
} from "../../../Redux/Actions/MasterPage/CategoryAction";
import EditCategory from "./EditCategory";
import customStyle from "../../../Utils/tableStyle";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import Common from "../../../common/Common";

function Category() {
  const CategoryData = useSelector((state) => state.Category.CategoryData);
  const isLoading = useSelector((state) => state.Category.isLoading);
  const addLoading = useSelector((state) => state.Category.addLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    category: "",
    status: "Enable",
  });

  const [editData, setEditData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterText, setFilterText] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  ///Validation/////
  const [errors, seterrors] = useState("");
  const { cleanText } = Common()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = validateFormData(formData);
    const payload = {
      ...formData,
      category: cleanText(formData.category),
    }
    if (validationResult.isValid) {
      const res = await dispatch(addCategory(payload));
      if (res.success) {
        Toast({ message: "Added successfully", type: "success" });
        seterrors("");
        setFormData({ category: "", status: "Enable" });
      } else {
        seterrors(res?.error);
      }
    } else {
      seterrors(validationResult.errors);
    }
  };
  ////DELETE////
  const handleDelete = (row) => {
    DeleteById(row.id, deleteCategory, dispatch);
  };

  const handleEdit = (row) => {
    setEditData(row);
    openModal();
  };

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

  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };

  const filterdata = SearchData(CategoryData, filterText, [
    "status",
    "category",
    "createdat",
  ]);

  return (
    <>
      <EditCategory
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
                  <h4 className="page_heading">Category</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-12 mb-3 ">
                        <label htmlFor="category" className="form-label">
                          Category Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                        />
                        {errors.category && (
                          <div className="validation_msg">
                            {errors.category}
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
                          setFormData({ category: "", status: "Enable" });
                          seterrors("");
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
                        data={CategoryData}
                        filename={"category.csv"}
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

export default Category;
