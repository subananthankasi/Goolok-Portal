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
// import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { SearchData } from "../../../Utils/Search";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import Common from "../../../common/Common";
import Toast from "../../../Utils/Toast";

const Pricing = () => {
  const dispatch = useDispatch();
  // const toast = useRef(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [editing, setEditing] = useState(false);
  const [filterText, setFilterText] = useState("");
  const { cleanText } = Common();
  const searchColumns = ["sno", "charges_name", "unit", "status", "created_at"];

  useEffect(() => {
    dispatch(pricingGetThunk());
  }, []);

  const Getdata = useSelector((state) => state.pricing.get.data);

  const getLoading = useSelector((state) => state.pricing.get.loading);
  const postLoading = useSelector((state) => state.pricing.post.loading);
  const updateLoading = useSelector((state) => state.pricing.update.loading);

  const filterdata = SearchData(Getdata, filterText, searchColumns);


  const onSubmit = async (values) => {
    const payload = {
      ...values,
      charges: cleanText(values.charges),
      id: values?.id,
    };
    if (editing && values?.id) {
      const response = await dispatch(pricingUpdateThunk(payload));

      // SUCCESS
      if (pricingUpdateThunk.fulfilled.match(response)) {
        // toast.current.show({
        //   severity: "success",
        //   summary: "Success",
        //   detail: "Successfully Updated",
        //   life: 3000,
        // });
        Toast({ message: "Successfully Updated", type: "success" });

        setEditDialog(false);
        formik.resetForm();
        dispatch(pricingGetThunk());
      }

      // ERROR
      if (pricingUpdateThunk.rejected.match(response)) {
        formik.setFieldError("charges", response.payload?.messages?.charges);
      }

      return;
    }

    const newData = {
      ...values,
      charges: cleanText(values.charges),
    };

    const response = await dispatch(pricingPostThunk(newData));

    // SUCCESS
    if (pricingPostThunk.fulfilled.match(response)) {
      Toast({ message: "Successfully Added", type: "success" });

      formik.resetForm();
      dispatch(pricingGetThunk());
    }

    // ERROR
    if (pricingPostThunk.rejected.match(response)) {
      formik.setFieldError("charges", response.payload?.messages?.charges);
    }
  };

  // const onSubmit = async (values) => {
  //   if (editing) {
  //     // const payload = { ...values, id: values.id };
  //     const payload = {
  //       ...values,
  //       charges_name: cleanText(values.charges_name),
  //       id: values.id,
  //     };
  //     try {
  //       const response = await dispatch(pricingUpdateThunk(payload));
  //       if (pricingUpdateThunk.fulfilled.match(response)) {
  //         const message = response.payload.data;
  //         setEditDialog(false);
  //         formik.resetForm();
  //         dispatch(pricingGetThunk());
  //         toast.current.show({
  //           severity: "success",
  //           summary: "Success",
  //           detail: "Successfully Updated",
  //           life: 3000,
  //         });
  //       } else if (pricingUpdateThunk.rejected.match(response)) {
  //         formik.errors.charges = response.payload.messages.charges;
  //       }
  //     } catch (error) {
  //       toast.current.show({
  //         severity: "error",
  //         summary: "Success",
  //         detail: " Rejected",
  //         life: 3000,
  //       });
  //     }
  //   } else {
  //     const response = await dispatch(pricingPostThunk(values));

  //     if (pricingPostThunk.fulfilled.match(response)) {
  //       toast.current.show({
  //         severity: "success",
  //         summary: "Success",
  //         detail: "Successfully Added",
  //         life: 3000,
  //       });
  //       formik.resetForm();
  //       dispatch(pricingGetThunk());
  //     }

  //     if (pricingPostThunk.rejected.match(response)) {
  //       formik.errors.charges = response.payload.messages.charges;
  //     }
  //   }
  //   // dispatch(pricingPostThunk(values)).then(() => {
  //   //   dispatch(pricingGetThunk());
  //   // });

  //   // toast.current.show({
  //   //   severity: "success",
  //   //   summary: "Success",
  //   //   detail: "Successfully Added",
  //   //   life: 3000,
  //   // });
  //   // formik.resetForm();
  // };

  const formik = useFormik({
    initialValues: {
      charges: "",
      unit: "",
      status: "enable",
    },
    validationSchema: yup.object().shape({
      charges: yup.string().required(" pricing name is required !!"),
      unit: yup.string().required("unit is required !!"),
    }),
    onSubmit,
  });
  const handleEdit = (row) => {
    setEditDialog(true);
    formik.setFieldValue("charges", row.charges_name);
    formik.setFieldValue("unit", row.unit);
    formik.setFieldValue("status", row.status);
    formik.setFieldValue("id", row.id);
  };

  const handleDelete = (row) => {
    setDeleteDialog(true);
    setDeleteId(row.id);
  };
  const deletePricing = () => {
    dispatch(pricingDeleteThunk(deleteId)).then(() => {
      dispatch(pricingGetThunk());
    });
    setDeleteDialog(false);
    // toast.current.show({
    //   severity: "success",
    //   summary: "Success",
    //   detail: "Successfully Deleted",
    //   life: 3000,
    // });
    Toast({ message: "Successfully Deleted", type: "success" });
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
      name: "Pricing Name",
      selector: (row) => row.charges_name,
      sortable: true,
    },
    {
      name: "Unit",
      selector: (row) => row.unit,
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
  const deleteUnitsDialogFooter = (
    <div className=" d-flex gap-1 justify-content-end">
      {/* <Button
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
      /> */}
      <button type="button" className="btn1" onClick={() => setDeleteDialog(false)}>
        No
      </button>
      <button type="button" className="btn1" onClick={deletePricing} >
        Yes
      </button>
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
      {/* <Toast ref={toast} /> */}
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="page_heading">Add Pricing </h4>
                </div>
                <div className="card-body">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                      <div className="col-md-12 mb-3 ">
                        <label htmlFor="lastName" className="form-label">
                          Pricing Name
                        </label>
                        <input
                          name="charges"
                          className="form-control"
                          placeholder="Enter Pricing Name"
                          value={formik.values.charges}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.charges && formik.touched.charges ? (
                          <p style={{ color: "red", fontSize: "14px" }}>
                            {formik.errors.charges}
                          </p>
                        ) : null}
                      </div>
                      <div className="col-md-12 mb-3 ">
                        <label htmlFor="lastName" className="form-label">
                          Unit
                        </label>
                        <select
                          name="unit"
                          className="form-select"
                          value={formik.values.unit}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">Select Unit</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {formik.errors.unit && formik.touched.unit ? (
                          <p style={{ color: "red", fontSize: "14px" }}>
                            {formik.errors.unit}
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
                        disabled={postLoading}
                        onClick={() => setEditing(false)}
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
                    <div style={{ marginLeft: "auto" }}>
                      {/* <ExportButton
                                                columns={columns}
                                                data={getDate}
                                                filename={"PricingDocument.csv"}
                                            /> */}
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
                      progressPending={getLoading}
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
            Are you sure you want to delete the selected Pricing?
          </span>
        </div>
      </Dialog>
      {/*Edit modal */}
      <Dialog
        visible={editDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit Payment"
        modal
        className="p-fluid"
        onHide={editHide}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className=" flex justify-content-center mt-2">
            <label htmlFor="lastName" className="form-label">
              Pricing Name
            </label>
            <input
              name="charges"
              className="form-control"
              placeholder="Enter Pricing Name"
              value={formik.values.charges}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.charges && formik.touched.charges ? (
              <p style={{ color: "red", fontSize: "14px" }}>
                {formik.errors.charges}
              </p>
            ) : null}
          </div>

          <div className="field mt-2">
            <label htmlFor="lastName" className="form-label">
              Unit
            </label>
            <select
              name="unit"
              className="form-select"
              value={formik.values.unit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select Unit</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {formik.errors.unit && formik.touched.unit ? (
              <p style={{ color: "red", fontSize: "14px" }}>
                {formik.errors.unit}
              </p>
            ) : null}
          </div>
          <div className="field mt-2">
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

          <div className="d-flex justify-content-end gap-2 mt-4">
            {/* <Button
              label="Cancel"
              icon="pi pi-times"
              type="button"
              outlined
              onClick={editCancel}
              style={{ borderRadius: "7px" }}
            /> */}
            <button type="button" className="btn1" onClick={editCancel} disabled={updateLoading}>
              Cancel
            </button>
            <button type="submit" className="btn1" onClick={() => setEditing(true)} disabled={updateLoading}>
              {updateLoading ? "Processing..." : "Update"}
            </button>
            {/* <Button
              disabled={updateLoading}
              loading={updateLoading}
              label={updateLoading ? "Processing..." : "Update"}
              icon="pi pi-check"
              type="submit"
              style={{ borderRadius: "7px" }}
              onClick={() => setEditing(true)}
            /> */}
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default Pricing;
