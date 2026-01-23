import { useEffect, useState } from "react";
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
import { validateFormData } from "./LawyerDocumentValidation";
import customStyle from "../../../Utils/tableStyle";
import {
  addlawDoc,
  deleteLawDoc,
  fetchDoc,
  updateLawDoc,
} from "../../../Redux/Actions/MasterPage/LawyerDocumentAction";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import Common from "../../../common/Common";
import { Dialog } from "primereact/dialog";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function LawyerDocument() {
  const LawyerDocument = useSelector((state) => state.LawyerDocument.lawyerDoc);
  const isLoading = useSelector((state) => state.LawyerDocument.isLoading);
  const addLoading = useSelector((state) => state.LawyerDocument.addLoading);
  const updateLoading = useSelector(
    (state) => state.LawyerDocument.updateLoading
  );
  const [visible, setVisible] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const dispatch = useDispatch();
  const { cleanText } = Common();

  useEffect(() => {
    dispatch(fetchDoc());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    document: " ",
    status: "Enable",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((pre) => ({
      ...pre,
      [name]: "",
    }));
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = validateFormData(formData);

    if (validationResult.isValid) {
      const newData = {
        ...formData,
        document: cleanText(formData?.document),
      };
      const res = await dispatch(addlawDoc(newData));
      if (res?.success) {
        Toast({ message: "Added successfully", type: "success" });
        setErrors("");
        setFormData({ document: "", status: "Enable" });
        setVisible(false)
      } else {
        setErrors(res?.error);
      }
    } else {
      setErrors(validationResult.errors);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const validationResult = validateFormData(formData);
    if (validationResult.isValid) {
      const newData = {
        ...formData,
        document: cleanText(formData?.document),
      };
      const res = await dispatch(updateLawDoc(newData));
      if (res?.success) {
        setVisible(false)
        setErrors("");
        Toast({ message: "Updated Successfully", type: "success" });
      } else {
        setErrors(res?.error);
      }
    } else {
      setErrors(validationResult.errors);
    }
  };
  const [deleteId, setDeleteId] = useState(null)
  const columns = [
    {
      name: "S.no",
      selector: (row) => row.sno,
      sortable: true,
    },
    {
      name: "date",
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: "Lawyer Document",
      selector: (row) => row.document,
      sortable: true,
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
              setVisible(true)
            }}
          >
            <EditIcon />
          </button>
          <button
            className="btn btn-outline-danger delete"
            data-tooltip-id="delete"
            onClick={() => { setDeleteId(row); setDeleteModal(true) }}
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  // search function
  const [filterText, setFilterText] = useState("");
  const searchColumns = ["sno", "status", "document", "created_at"];
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(LawyerDocument, filterText, searchColumns);
  /////////////////////////////////////



  const handleEdit = (row) => {
    setFormData(row);
  };

  const handleDelete = () => {
    try {
      dispatch(deleteLawDoc(deleteId.id));
      Toast({ message: "Successfully Deleted", type: "success" });
      setDeleteModal(false)
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };


  return (
    <>
    
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="page_heading">Add Lawyer Document</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-12 mb-3 ">
                        <label htmlFor="lastName" className="form-label">
                          Document
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="document"
                          autocomplete="off"
                          value={formData.document}
                          onChange={handleChange}
                        />
                        {errors.document && (
                          <div className="validation_msg">
                            {errors.document}
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
                      <button
                        className="btn1 text-dark me-1"
                        onClick={() => {
                          setFormData({ document: "", status: "Enable" });
                          setErrors("");
                        }}
                      >
                        Clear
                      </button>
                      <button type="submit" className="btn1">
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
                        data={LawyerDocument}
                        filename={"lawyerDocument.csv"}
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
                      // selectableRows
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

      <Dialog
        visible={visible}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit Lawyer Document"
        modal
        onHide={() => setVisible(false)}
      >
        <form onSubmit={handleUpdateSubmit}>
          <div className="row">
            <div className="col-md-12 mb-3 ">
              <label htmlFor="lastName" className="form-label">
                Document
              </label>
              <input
                type="text"
                className="form-control"
                name="document"
                value={formData.document}
                onChange={handleChange}
              />
              {errors.document && (
                <div className="validation_msg">{errors.document}</div>
              )}
            </div>
          </div>

          <div className="mb-3 col-md-12">
            <label className="form-label" htmlFor="inputState">
              Status
            </label>
            <select
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
              className="btn1 me-1"
              onClick={() => setVisible(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn1">
              {updateLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </Dialog>
      <Dialog
        visible={deleteModal}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        onHide={() => setDeleteModal(false)}
      >
        <p >Are you sure you want to delete? <ErrorOutlineIcon sx={{ fontSize: 23 }} /> </p>
        <div className="text-end py-3 px-3">
          <button
            type="button"
            className="btn1 me-1"
            onClick={() => setDeleteModal(false)}
          >
            No
          </button>
          <button type="button" className="btn1" onClick={handleDelete}>
            Yes
          </button>
        </div>
      </Dialog>
    </>
  );
}

export default LawyerDocument;
