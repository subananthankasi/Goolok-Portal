
import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import { Toast } from "primereact/toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { InputNumber } from "primereact/inputnumber";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import { Dialog } from "primereact/dialog";
import { ThreeDots } from "react-loader-spinner";
import {
  pricingDptGetThunk,
  pricingDptPostThunk,
} from "../../../../Redux/Actions/Enquiry/PricingEnquiryThunk";
import { pricingGetThunk } from "../../../../Redux/Actions/MasterPage/PricingThunk";
import DiscountPage from "../../../../Utils/Offers/DiscountPage";
import { Input, InputGroup } from "rsuite";



const PricingDepartmentHouse = ({ eid, status, id, pagetype ,discountPage }) => {
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [unit, setUnit] = useState(false);
  const [getOption, setGetOption] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [combinedValue, setCombinedValue] = useState("");
  const [currentInvoiceId, setCurrentInvoiceId] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [newDialog, setNewDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [discountDialog, setDiscountDialog] = useState(false);
 
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );


  const toast = useRef(null);
  const dispatch = useDispatch();

  // const onSubmit = (values) => {
  //   const newChargeDetail = {
  //     id: Date.now(),
  //     charges: values.charges,
  //     unit: combinedValue,
  //     price: values.price,
  //   };

  //   setInvoiceData((prevData) => {
  //     if (!prevData || prevData.length === 0) {
  //       return [
  //         {
  //           id: currentInvoiceId,
  //           chargeDetails: [newChargeDetail],
  //         },
  //       ];
  //     }

  //     const updatedData = prevData.map((invoiceItem) => {
  //       if (invoiceItem.id === currentInvoiceId) {
  //         return {
  //           ...invoiceItem,
  //           chargeDetails: [
  //             ...(invoiceItem.chargeDetails || []),
  //             newChargeDetail,
  //           ],
  //         };
  //       }
  //       return invoiceItem;
  //     });

  //     if (!updatedData.find((item) => item.id === currentInvoiceId)) {
  //       updatedData.push({
  //         id: currentInvoiceId,
  //         chargeDetails: [newChargeDetail],
  //       });
  //     }

  //     return updatedData;
  //   });

  //   setUnit("");
  //   setCombinedValue("");
  //   formik.resetForm();
  // };
 const onSubmit = (values) => {
  const newChargeDetail = {
    id: Date.now(),
    charges: values.charges,
    unit: combinedValue || null,
    price: Number(values.price),
  };

  setInvoiceData((prevData) => {
    if (!prevData || prevData.length === 0) {
      return [
        {
          id: currentInvoiceId,
          chargeDetails: [newChargeDetail],
          subtotal: newChargeDetail.price.toFixed(2),
          total: newChargeDetail.price.toFixed(2),
          gst: "0.00",
        },
      ];
    }

    let invoiceExists = false;

    const updatedData = prevData.map((invoiceItem) => {
      if (invoiceItem.id === currentInvoiceId) {
        invoiceExists = true;

        const existingCharges = invoiceItem.chargeDetails || [];

        // check if same charge + unit exists
        const existingIndex = existingCharges.findIndex(
          (item) =>
            item.charges === newChargeDetail.charges &&
            item.unit === newChargeDetail.unit
        );

        let updatedChargeDetails;

        if (existingIndex !== -1) {
          // merge price
          updatedChargeDetails = [...existingCharges];
          updatedChargeDetails[existingIndex] = {
            ...updatedChargeDetails[existingIndex],
            price:
              Number(updatedChargeDetails[existingIndex].price) +
              Number(newChargeDetail.price),
          };
        } else {
          // add new charge
          updatedChargeDetails = [...existingCharges, newChargeDetail];
        }

        // recalc subtotal/total
        const subtotal = updatedChargeDetails
          .reduce((sum, item) => sum + Number(item.price), 0)
          .toFixed(2);

        return {
          ...invoiceItem,
          chargeDetails: updatedChargeDetails,
          subtotal,
          total: subtotal, // update total if same as subtotal
        };
      }

      return invoiceItem;
    });

    if (!invoiceExists) {
      updatedData.push({
        id: currentInvoiceId,
        chargeDetails: [newChargeDetail],
        subtotal: newChargeDetail.price.toFixed(2),
        total: newChargeDetail.price.toFixed(2),
        gst: "0.00",
      });
    }

    return updatedData;
  });

  // reset
  setUnit("");
  setCombinedValue("");
  formik.resetForm();
};
  useEffect(() => {
    dispatch(pricingDptGetThunk(eid));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(pricingGetThunk());
      dispatch(pricingDptGetThunk(eid));
    };
    fetchData();
  }, []);

  const options = useSelector((state) => state.pricing.get?.data);
  const showData = useSelector((state) => state.pricingDptData.get?.data);

  useEffect(() => {
    if (options.length > 0) {
      setGetOption(options);
    }
  }, [options]);

  const formik = useFormik({
    initialValues: {
      charges: "",
      unit: "cent",
      price: "",
    },
    validationSchema: yup.object().shape({
      charges: yup.string().required("pricing type is required!!"),
      price: yup.string().required("Price is required!!"),
    }),
    onSubmit,
  });

  const clear = () => {
    setInvoiceData([]);

    setNewDialog(false);
    setUnit("");
    setCombinedValue("");
    formik.resetForm();
    dispatch(pricingDptGetThunk(eid));
  };

  const handleCategoryChange = (event) => {
    const selectedName = event.target.value;
    const selectedOption = options.find(
      (item) => item.charges_name === selectedName
    );

    setUnit(selectedOption?.unit === "Yes");
    formik.handleChange(event);
  };

  const calculateTotals = () => {
    const subtotal = invoiceData?.reduce((acc, item) => {
      const chargesTotal = item.chargeDetails?.reduce(
        (chargeAcc, charge) => chargeAcc + parseFloat(charge.price || 0),
        0
      );
      return acc + (chargesTotal || 0);
    }, 0);

    // const gst = subtotal * 0.18;
    const gst = subtotal * 0;

    const total = subtotal + gst;

    const currencyFormatter = new Intl.NumberFormat("en-US", {
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return {
      subtotal: currencyFormatter.format(subtotal),
      gst: currencyFormatter.format(gst),
      total: currencyFormatter.format(total),
    };
  };

  useEffect(() => {
    if (showData && showData.length > 0) {
      const allFlattenedCharges = showData.flatMap((item) => {
        let chargesData;
        try {
          chargesData = JSON.parse(item.charges);
        } catch (error) {
          console.error("Error parsing charges data:", error);
          return [];
        }

        if (Array.isArray(chargesData)) {
          return chargesData.flatMap((charge) =>
            Array.isArray(charge) ? charge : [charge]
          );
        }

        return [];
      });

      setTableData(allFlattenedCharges);
    }
  }, [showData]);

  useEffect(() => {
    if (showData && showData.length > 0) {
      const mappedData = showData
        .map((item) => {
          try {
            const chargesData = JSON.parse(item.charges);
            const flattenedChargesData = chargesData.flatMap((charge) =>
              Array.isArray(charge) ? charge : [charge]
            );

            const chargeDetails = flattenedChargesData.map((charge) => ({
              id: charge.id || null,
              charges: charge.charges || null,
              unit: charge.unit || null,
              price: charge.price || null,
            }));

            return {
              id: item.id,
              chargeDetails,
              subtotal: item.subtotal,
              total: item.total,
              gst: item.gst,
            };
          } catch (error) {
            console.error(
              "Failed to parse or process charges data:",
              item.charges,
              error
            );
            return null;
          }
        })
        .filter((data) => data !== null);

      setInvoiceData(mappedData);
      setCurrentInvoiceId(mappedData[0]?.id || null);
    }
  }, [showData]);

  const handleFormSubmit = async () => {
    const { subtotal, gst, total } = calculateTotals();
    const newId =
      invoiceData.length > 0 ? invoiceData[0].id : showData.id || null;
    const charges = invoiceData.map((item) => item.chargeDetails);

    const payload = {
      chargesId: charges,
      subtotal: subtotal,
      gst: gst,
      total: total,
      enqid: eid,
      dptid: id,
      id: newId,
    };
    await dispatch(pricingDptPostThunk(payload)).then(() => {
      dispatch(pricingDptGetThunk(eid));
    });

    setNewDialog(false);
  };

  const handleUnitChange = (e) => {
    const selectedUnit = e.target.value;

    if (!selectedUnit) {
      formik.setFieldValue("unit", null);
    } else {
      formik.setFieldValue("unit", selectedUnit);
    }

    const updatedValue = `${formik.values.inputNumber}/${
      formik.values.unit || ""
    }`;
    setCombinedValue(updatedValue);
  };

  const handleInputNumberChange = (e) => {
    const inputNumberValue = e.value;
    formik.setFieldValue("inputNumber", inputNumberValue);
    const updatedValue = `${e.value}/${formik.values.unit} `;
    setCombinedValue(updatedValue);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteDialog(false);
  };
  const handleDelete = (id) => {
    setDeleteDialog(true);
    setDeleteId(id);
  };
  const confirmDelete = () => {
    setInvoiceData((prevData) =>
      prevData.map((invoiceItem) => ({
        ...invoiceItem,
        chargeDetails: invoiceItem.chargeDetails.filter(
          (charge) => charge.id !== deleteId
        ),
      }))
    );
    setDeleteDialog(false);
    setDeleteId(null);
  };

  const deleteUnitsDialogFooter = (
    <div className=" d-flex gap-3 justify-content-end">
      <Button
        variant="outlined"
        color="error"
        onClick={() => setDeleteDialog(false)}
      >
        No
      </Button>
      <Button variant="contained" onClick={confirmDelete}>
        Yes
      </Button>
    </div>
  );

  const postLoading = useSelector(
    (state) => state.pricingDptData?.post?.loading
  );

  const parsedCharges = (() => {
    try {
      return JSON.parse(showData[0]?.charges)?.[0] || [];
    } catch (error) {
      return [];
    }
  })();

  return (
    <>
      <Toast ref={toast} />
      <div className="card shadow border-0 mt-3">
        <div className="card shadow border-0 p-4">
          {parsedCharges.length > 0 ? (
            <div className="container mt-2">
              <div className="d-flex justify-content-between">
                <h6>Pricing Department</h6>
                {staffid.Login === "staff" &&
                  (status === "complete" || status === "pending") &&
                  pagetype !== "reminder" && enquiryDoumentData?.status !== "booking" &&(
                    <button
                      className="btn1"
                      onClick={() => {
                        setNewDialog(true);
                      }}
                    >
                      Edit Pricing
                    </button>
                  )}
                  {staffid.Login === "admin" &&
                  discountPage === "discount" &&
                  pagetype !== "reminder" && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setDiscountDialog(true);
                      }}
                    >
                      Discount
                    </Button>
                  )}
              </div>
              <hr />
              <div>
                <section className="line-items mt-5 mb-5">
                  <table className="table table-bordered items--table">
                    <thead style={{ backgroundColor: "green" }}>
                      <tr>
                        <th>S.NO</th>
                        <th>Pricing Type</th>
                        <th>Unit</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parsedCharges.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.charges}</td>
                          <td>{item.unit}</td>
                          <td>{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3" className="text-end">
                          <b>Total</b>
                        </td>
                        <td colSpan="2" className="text-start">
                          <b>₹ {calculateTotals().total}</b>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </section>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center mb-5 mt-5">
              {staffid.logintype === "staff" &&
                (status === "pending" || status === "complete") && (
                  <button
                    className="btn1"
                    onClick={() => {
                      setNewDialog(true);
                    }}
                  >
                    Create Pricing
                  </button>
                )}
            </div>
          )}
        </div>
      </div>

      <Dialog
        visible={newDialog}
        style={{ width: "70rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Add Payment"
        modal
        className="p-fluid"
        closable={false}
      >
        <div className=" container w-100">
          {/* <div > */}
          <section className="  mb-5 w-100">
            <table className="table  table-bordered items--table">
              <thead style={{ backgroundColor: "green" }}>
                <tr style={{ backgroundColor: "green" }}>
                  <th className="text-center">S.NO</th>
                  <th className="text-center">Pricing Type</th>
                  <th className="text-center">Unit</th>
                  <th className="text-center">price</th>
                  <th className="text-center">Action </th>
                </tr>
              </thead>
              <tbody>
                {invoiceData?.map((invoiceItem, index) =>
                  invoiceItem.chargeDetails?.map((item, subIndex) => (
                    <tr key={item.id}>
                      <td className="text-center">{subIndex + 1}</td>
                      <td className="text-center">{item.charges}</td>
                      <td className="text-center">{item.unit}</td>
                      <td className="text-center">{item.price}</td>
                      <td className="text-center">
                        <AutoDeleteIcon
                          onClick={() => handleDelete(item.id)}
                          style={{ cursor: "pointer", color: "red" }}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" className="text-end">
                    <b>Total </b>{" "}
                  </td>
                  <td colSpan="2" className="text-start">
                    ₹ <b> {calculateTotals().total}</b>{" "}
                  </td>
                </tr>
              </tfoot>
            </table>

            {/*Add from */}
            <div>
              <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div className="row">
                  <div className="col-3 mt-2" style={{ height: "40px" }}>
                    <label
                      htmlFor="unit"
                      className="font-bold"
                      style={{ fontSize: "13px" }}
                    >
                      Pricing Type <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      name="charges"
                      id="charges"
                      className="form-select mt-1 w-100"
                      value={formik.values.charges || " "}
                      onChange={handleCategoryChange}
                      onBlur={formik.handleBlur}
                      style={{ height: "40px" }}
                      autoFocus={false}
                    >
                      <option value={""}>Select Pricing Type</option>
                      {getOption?.map((item) => {
                        return (
                          <option value={item.charges_name} key={item.id}>
                            {item.charges_name}
                          </option>
                        );
                      })}
                    </select>
                    {formik.errors.charges && formik.touched.charges ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.charges}
                      </p>
                    ) : null}
                  </div>
                  {unit && (
                    // <div
                    //   className="p-inputgroup flex-1 col-3"
                    //   style={{ height: "40px", marginTop: "37px" }}
                    // >
                    //   <InputNumber
                    //     placeholder=""
                    //     className="w-80"
                    //     value={formik.values.inputNumber}
                    //     onValueChange={handleInputNumberChange}
                    //   />
                    //   <select
                    //     name="unit"
                    //     id="unit"
                    //     className=" p-inputgroup-addon "
                    //     value={formik.values.unit}
                    //     onChange={handleUnitChange}
                    //     onBlur={formik.handleBlur}
                    //     style={{ fontSize: "13px", width: "40%" }}
                    //   >
                    //     <option value="cent" style={{ fontSize: "12px" }}>
                    //       Cent
                    //     </option>
                    //     <option value="acre" style={{ fontSize: "12px" }}>
                    //       {" "}
                    //       Acre
                    //     </option>
                    //   </select>
                    // </div>
                     <div className="col-3" style={{marginTop: "37px"}}>
                        <InputGroup>
                          <input
                            placeholder=""
                            className="form-control"
                            value={formik.values.inputNumber}
                            onValueChange={handleInputNumberChange}
                          />

                          <InputGroup.Addon>
                            {enquiryDoumentData?.land_units}{" "}
                          </InputGroup.Addon>
                        </InputGroup>
                      </div>
                  )}

                  <div className="col-3 mt-2">
                    <label
                      htmlFor="unit"
                      className="font-bold"
                      style={{ fontSize: "13px" }}
                    >
                      Price <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      className="form-control mt-1"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter Price"
                      style={{ height: "40px" }}
                    />

                    {formik.errors.price && formik.touched.price ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.price}
                      </p>
                    ) : null}
                  </div>
                  <div className="col-3" style={{ marginTop: "43px" }}>
                    <button type="submit" className="btn1">
                      + Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>

          {/* </div> */}

          <div className="d-flex gap-3 justify-content-end mt-3">
            <button className="btn1" onClick={handleFormSubmit} disabled={postLoading}>
              {postLoading ? (
                <ThreeDots
                  visible={true}
                  height="10"
                  width="40"
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
                "Confirm "
              )}
            </button>
            <button className="btn1" onClick={clear}>
              Cancel
            </button>
          </div>
        </div>
      </Dialog>

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
            Are you sure you want to delete the selected records?
          </span>
        </div>
      </Dialog>

      <Dialog
        visible={discountDialog}
        style={{ width: "62rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Discount"
        modal
        onHide={() => setDiscountDialog(false)}
      >
        <div>
          <DiscountPage invoiceData = {invoiceData} setDiscountDialog = {setDiscountDialog} discountDialog = {discountDialog} />
        </div>
      </Dialog>
    </>
  );
};

export default PricingDepartmentHouse;
