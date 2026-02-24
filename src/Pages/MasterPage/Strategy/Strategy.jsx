import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import customStyle from "../../../Utils/tableStyle";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  pricingDeleteThunk,
  pricingGetThunk,
  pricingPostThunk,
  pricingUpdateThunk,
} from "../../../Redux/Actions/MasterPage/PricingThunk";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { SearchData } from "../../../Utils/Search";
import {
  strategyDeleteThunk,
  strategyGetThunk,
  strategyPostThunk,
  strategyUpdateThunk,
} from "../../../Redux/Actions/MasterPage/StrategyThunk/StrategyThunk";
import * as FaIcons from "react-icons/fa";
import { InputPicker } from "rsuite";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import { Select } from "antd";
import Common from "../../../common/Common";

const Strategy = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [editing, setEditing] = useState(false);
  const [filterText, setFilterText] = useState("");
  const { cleanText } = Common();

  const allIcons = Object.keys(FaIcons).map((key) => ({
    value: key,
    label: key.replace("Fa", ""),
    icon: React.createElement(FaIcons[key]),
  }));

  const searchColumns = ["sno", "strategy", "status"];
  const isloading = useSelector((state) => state.srategyData.get.loading);
  const postLoading = useSelector((state) => state.srategyData.post.loading);
  const updateLoading = useSelector(
    (state) => state.srategyData.update.loading
  );
  const deleteLoading = useSelector(
    (state) => state.srategyData.delete.loading
  );

  useEffect(() => {
    dispatch(strategyGetThunk());
  }, []);

  const Getdata = useSelector((state) => state.srategyData.get.data);

  const filterdata = SearchData(Getdata, filterText, searchColumns);

  const onSubmit = async (values) => {
    if (editing) {
      const payload = {
        ...values,
        strategy: cleanText(values.strategy),
        id: values.id,
      };
      try {
        const response = await dispatch(strategyUpdateThunk(payload));

        if (strategyUpdateThunk.fulfilled.match(response)) {
          const message = response.payload.data;
          setEditDialog(false);
          formik.resetForm();
          dispatch(strategyGetThunk());
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Successfully Updated",
            life: 3000,
          });
        } else if (strategyUpdateThunk.rejected.match(response)) {
          // const errorPayload = response.payload.reason;
          formik.setFieldError(
            "strategy",
            response?.payload?.messages?.strategy
          );
          // toast.current.show({
          //   severity: "error",
          //   summary: "Success",
          //   detail: "rejected",
          //   life: 3000,
          // });
        }
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Success",
          detail: " Rejected",
          life: 3000,
        });
      }
    } else {
      const res = await dispatch(strategyPostThunk(values));
      if (strategyPostThunk.fulfilled.match(res)) {
        dispatch(strategyGetThunk());
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Successfully Added",
          life: 3000,
        });
        formik.resetForm();
      }
      if (strategyPostThunk.rejected.match(res)) {
        formik.setFieldError("strategy", res?.payload?.messages?.strategy);
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      strategy: "",
      icon: "",
      status: "enable",
    },
    validationSchema: yup.object().shape({
      strategy: yup.string().required(" strategy is required !!"),
      icon: yup.string().required(" icon is required !!"),
    }),
    onSubmit,
  });
  const handleEdit = (row) => {
    setEditDialog(true);
    formik.setFieldValue("strategy", row.strategy);
    formik.setFieldValue("status", row.status);
    formik.setFieldValue("id", row.id);
  };

  const handleDelete = (row) => {
    setDeleteDialog(true);
    setDeleteId(row.id);
  };
  const deletePricing = () => {
    dispatch(strategyDeleteThunk(deleteId)).then(() => {
      dispatch(strategyGetThunk());
    });
    setDeleteDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Successfully Deleted",
      life: 3000,
    });
  };

  const editCancel = () => {
    setEditDialog(false);
  };
  const editHide = () => {
    setEditDialog(false);
    formik.resetForm();
  };
  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Strategy Name",
      selector: (row) => row.strategy,
      sortable: true,
    },
    {
      name: "Strategy icon",
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
          {/* <button
            className="btn  btn-outline-info me-1 edit"
            data-tooltip-id="edit"
            onClick={() => {
              handleEdit(row);
            }}
          >
            <EditIcon />
          </button> */}
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
  const deleteUnitsDialogFooter = (
    <div className=" d-flex gap-3 justify-content-end">
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        style={{ borderRadius: "7px" }}
        onClick={() => setDeleteDialog(false)}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        style={{ borderRadius: "7px" }}
        onClick={deletePricing}
      />
    </div>
  );
  const hideDeleteProductsDialog = () => {
    setDeleteDialog(false);
  };
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  return (
    <>
      <Toast ref={toast} />
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="page_heading">Add Strategy </h4>
                </div>
                <div className="card-body">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                      <div className="col-md-12 mb-3 ">
                        <label htmlFor="strategy" className="form-label">
                          Strategy Name
                        </label>
                        <input
                          name="strategy"
                          className="form-control"
                          placeholder="Enter Strategy Name"
                          value={formik.values.strategy}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.strategy && formik.touched.strategy ? (
                          <p style={{ color: "red", fontSize: "14px" }}>
                            {formik.errors.strategy}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-12 mb-3 form-group d-block">
                      <label htmlFor="lastName" className="form-label">
                        Strategy icon
                      </label>
                      <InputPicker
                        name="icon"
                        data={allIcons}
                        value={formik.values.icon || null}
                        onChange={(value) =>
                          formik.setFieldValue("icon", value)
                        }
                        onBlur={() => formik.setFieldTouched("icon", true)}
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
                        renderValue={(value, item) =>
                          value && item ? (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              {item.icon} {item.label}
                            </div>
                          ) : null
                        }
                      />
                      {formik.errors.icon && formik.touched.icon ? (
                        <p style={{ color: "red", fontSize: "14px" }}>
                          {formik.errors.icon}
                        </p>
                      ) : null}
                    </div>
                    <div className="mb-3 col-md-12">
                      <label className="form-label" htmlFor="inputState">
                        Status
                      </label>
                      <select
                        name="status"
                        className="form-select"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="enable">Enable</option>
                        <option value="disable">Disable</option>
                      </select>
                    </div>

                    <div className="text-end py-3 px-3">
                      <button
                        type="button"
                        className="btn1 text-dark me-1"
                        onClick={() => {
                          formik.resetForm();
                        }}
                      >
                        Clear
                      </button>
                      <button
                        type="submit"
                        className="btn1"
                        onClick={() => setEditing(false)}
                        disabled={postLoading}
                      >
                        {postLoading ? "processing..." : "Add"}
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
                      progressPending={isloading}
                      progressComponent={<CustomLoder />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Delete modal */}
      <Dialog
        visible={deleteDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteUnitsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i class="fa-solid fa-circle-exclamation"></i>
          <span style={{ marginLeft: "10px" }}>
            Are you sure you want to delete the selected row?
          </span>
        </div>
      </Dialog>
      {/*Edit modal */}
      <Dialog
        visible={editDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit Strategy"
        modal
        className="p-fluid"
        onHide={editHide}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-12 mb-3 ">
              <label htmlFor="strategy" className="form-label">
                Strategy Name
              </label>
              <input
                name="strategy"
                className="form-control"
                placeholder="Enter Strategy Name"
                value={formik.values.strategy}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.strategy && formik.touched.strategy ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {formik.errors.strategy}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mb-3 col-md-12">
            <label className="form-label" htmlFor="inputState">
              Status
            </label>
            <select
              name="status"
              className="form-select"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="enable">Enable</option>
              <option value="disable">Disable</option>
            </select>
          </div>

          <div className="text-end py-3 px-3">
            <a
              href="javascript:void(0);"
              className="btn1 text-dark me-1"
              onClick={() => {
                formik.resetForm();
              }}
            >
              Clear
            </a>
            <button
              type="submit"
              className="btn1"
              onClick={() => setEditing(true)}
              disabled={updateLoading}
            >
              {updateLoading ? "updating..." : "Update"}
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default Strategy;
