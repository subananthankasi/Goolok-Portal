import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { InputSwitch } from "primereact/inputswitch";
import { Badge } from "primereact/badge";
import API_BASE_URL from "../../Api/api";
import axios from "axios";
import Toast from "../Toast";
import dayjs from "dayjs";

const DiscountPage = ({ invoiceData, setDiscountDialog, discountDialog }) => {

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

  const [getData, setGetData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/discountdeals/${invoiceData[0]?.id}`
      );
      setGetData(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (discountDialog && getData) {
      formik.setFieldValue("discount_type", getData?.disc_type);
      formik.setFieldValue("discount_value", getData?.disc_value);
      formik.setFieldValue("after_discount_amount", getData?.total_aft_disc);
      formik.setFieldValue("from_date", getData?.from_date);
      formik.setFieldValue("to_date", getData?.to_date);
      formik.setFieldValue("discount_status", getData?.disc_status);
      formik.setFieldValue("discount_percentage", getData?.disc_percentage);
      formik.setFieldValue("days", getData?.disc_days);
      formik.setFieldValue("id", getData?.id);
    }
  }, [discountDialog, getData]);

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      id: invoiceData[0]?.id,
    };
    try {
      const response = await axios.post(
        `${API_BASE_URL}/discountdeals`,
        payload
      );
      Toast({ message: "Successfully added", type: "success" });
      setDiscountDialog(false);
      formik.resetForm();
    } catch (error) {
      Toast({ message: "Error to add! Try again", type: "error" });
    }
  };
  const formik = useFormik({
    initialValues: {
      discount_type: "",
      discount_value: "",
      after_discount_amount: "",
      from_date: "",
      to_date: "",
      discount_status: false,
      discount_percentage: "",
      days: "",
    },
    validationSchema: yup.object().shape({
      discount_type: yup.string().required("discount type is required"),
      // discount_value: yup
      //   .number()
      //   .typeError("must be a number")
      //   .when("discount type", {
      //     is: (val) => val === "flat" || val === "percentage",
      //     then: yup.number().required("discount value is required"),
      //   }),
      discount_value: yup
        .number()
        .typeError("must be a number")
        .when("discount_type", {
          is: (val) => val === "flat",
          then: (schema) => {
            return schema.required("discount value is required").test(
              "max-flat",
              ({ value }) => {
                const total = invoiceData?.[0]?.total
                  ? parseFloat(invoiceData[0].total.replace(/,/g, ""))
                  : 0;
                return `Discount cannot exceed total amount (${total})`;
              },
              function (value) {
                const total = invoiceData?.[0]?.total
                  ? parseFloat(invoiceData[0].total.replace(/,/g, ""))
                  : 0;
                return value <= total;
              }
            );
          },
          otherwise: (schema) =>
            schema
              .required("discount value is required")
              .test(
                "max-percentage",
                "Percentage discount cannot exceed 100%",
                (value) => value <= 100
              ),
        }),
      from_date: yup
        .date()
        .transform((value, originalValue) => new Date(originalValue))
        .required("From Date is required"),

      to_date: yup
        .date()
        .transform((value, originalValue) => new Date(originalValue))
        .required("To Date is required")
        .min(yup.ref("from_date"), "To Date cannot be before From Date"),
    }),
    // validationSchema: yup.object().shape({
    //   discount_type: yup.string().required("discount type is required"),
    //   discount_value: yup
    //     .number()
    //     .typeError("must be a number")
    //     .when("discount type", {
    //       is: (val) => val === "flat" || val === "percentage",
    //       then: yup.number().required("discount value is required"),
    //     }),
    //   from_date: yup.date().required("From Date is required"),
    //   to_date: yup
    //     .date()
    //     .required("To Date is required")
    //     .min(yup.ref("from_date"), "To Date cannot be before From Date"),
    // }),
    // validate: (values) => {
    //   if (values.from_date && values.to_date) {
    //     const start = new Date(values.from_date);
    //     const end = new Date(values.to_date);
    //     if (!isNaN(start) && !isNaN(end)) {
    //       const diff =
    //         Math.ceil(
    //           (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    //         ) + 1;
    //       values.days = diff > 0 ? `${diff} days` : "0 day";
    //     }
    //   } else {
    //     values.days = "";
    //   }
    // },
    onSubmit,
  });

  useEffect(() => {
    const { discount_type, discount_value } = formik.values;

    if (!discount_type || isNaN(discount_value) || discount_value === "") {
      formik.setFieldValue("after_discount_amount", "");
      formik.setFieldValue("discount_percentage", "");
      return;
    }

    const total = parseFloat(invoiceData[0].total.replace(/,/g, ""));
    const discountVal = Number(discount_value);

    let discountedTotal = total;

    if (discount_type === "flat") {
      discountedTotal = total - discountVal;
      const percentage = (discountVal / total) * 100;
      const discountPercentage = Math.round(percentage);
      formik.setFieldValue("discount_percentage", discountPercentage);
    } else if (discount_type === "percentage") {
      discountedTotal = total - (total * discountVal) / 100;

      formik.setFieldValue("discount_percentage", discountVal.toFixed(2));
    }

    formik.setFieldValue(
      "after_discount_amount",
      discountedTotal > 0 ? discountedTotal.toFixed(2) : "0.00"
    );
  }, [invoiceData, formik.values.discount_type, formik.values.discount_value]);

  useEffect(() => {
    const { from_date, to_date } = formik.values;

    if (from_date && to_date) {
      const start = new Date(from_date);
      const end = new Date(to_date);

      if (!isNaN(start) && !isNaN(end)) {
        const timeDiff = end.getTime() - start.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;

        const label = daysDiff === 1 ? "1 day" : `${daysDiff} days`;
        formik.setFieldValue("days", daysDiff > 0 ? label : "0 day");
      } else {
        formik.setFieldValue("days", "");
      }
    } else {
      formik.setFieldValue("days", "");
    }
  }, [formik.values.from_date, formik.values.to_date]);

  const today = dayjs().startOf("day");

  useEffect(() => {
    if (formik.values.to_date) {
      const toDate = dayjs(formik.values.to_date).startOf("day");
      if (toDate.isBefore(today)) {
        const expiredPayload = {
          ...formik.values,
          id: invoiceData[0]?.id,
          discount_status: false,
        };
        axios
          .post(`${API_BASE_URL}/discountdeals`, expiredPayload)
          .then(() => {
            Toast({
              message: "Discount expired. Status set to false.",
              type: "info",
            });
          })
          .catch(() => {
            Toast({
              message: "Failed to update expired discount.",
              type: "error",
            });
          });
      }
    }
  }, [formik.values, invoiceData, today]);

  return (
    <div className=" container w-100">
      <section className="  mb-5 w-100">
        <table className="table  table-bordered items--table">
          <thead style={{ backgroundColor: "green" }}>
            <tr style={{ backgroundColor: "green" }}>
              <th className="text-center">S.NO</th>
              <th className="text-center">Pricing Type</th>
              <th className="text-center">Unit</th>
              <th className="text-center">price</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData?.map((invoiceItem, index) =>
              invoiceItem.chargeDetails?.map((item, subIndex) => (
                <tr key={item.id}>
                  <td className="text-center">{subIndex + 1}</td>
                  <td className="text-center">{item.charges}</td>
                  <td className="text-center">{item.unit ?? "-"}</td>
                  <td className="text-center">{item.price}</td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" className="text-end">
                <b>Total </b>
              </td>
              <td colSpan="2" className="text-start">
                ₹ <b> {calculateTotals().total}</b>
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
      <div
        className="container mt-4 p-3 border rounded shadow-sm"
        style={{ background: "#e6e7e7ff" }}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="row mb-3 align-items-center">
            <div className="col-md-3 fw-bold">Discount Type</div>
            <div className="col-md-9 d-flex gap-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="discount_type"
                  id="flat"
                  value="flat"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.discount_type === "flat"}
                />
                <label className="form-check-label" htmlFor="flat">
                  Flat
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="discount_type"
                  id="percentage"
                  value="percentage"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.discount_type === "percentage"}
                />
                <label className="form-check-label" htmlFor="percentage">
                  Percentage
                </label>
              </div>
              {formik.values.discount_value &&
                formik.values.discount_percentage !== undefined &&
                formik.values.discount_percentage !== null && (
                  <div className="">
                    <Badge
                      value={`${formik.values.discount_percentage} %`}
                      severity={
                        Number(formik.values.discount_percentage) > 0
                          ? "success"
                          : "warning"
                      }
                    />
                  </div>
                )}
            </div>
            {formik.touched.discount_type && formik.errors.discount_type && (
              <div className="offset-md-3 col-md-9">
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.discount_type}
                </p>
              </div>
            )}
          </div>

          {/* Discount Value */}
          <div className="row mb-3 align-items-center">
            <div className="col-md-3 fw-bold">Discount Value</div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter amount"
                name="discount_value"
                value={formik.values.discount_value || " "}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!formik.values.discount_type}
              />
              {formik.errors.discount_value && formik.touched.discount_value ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.discount_value}
                </p>
              ) : null}
            </div>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                name="after_discount_amount"
                value={formik.values.after_discount_amount}
                readOnly
              />
            </div>
          </div>

          {/* Date Pickers */}
          <div className="row mb-3 align-items-center">
            <div className="col-md-3 fw-bold">From Date</div>
            <div className="col-md-4">
              <input
                type="date"
                className="form-control"
                name="from_date"
                value={formik.values.from_date || " "}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.from_date && formik.touched.from_date ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.from_date}
                </p>
              ) : null}
            </div>
            <div className="col-md-2 fw-bold text-start">To Date</div>
            <div className="col-md-3">
              <input
                type="date"
                className="form-control"
                name="to_date"
                value={formik.values.to_date || " "}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.to_date && formik.touched.to_date ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.to_date}
                </p>
              ) : null}
            </div>
          </div>

          {/* Days Auto Display and Toggle */}
          <div className="row mb-4 align-items-center">
            <div className="col-md-3 fw-bold">Days</div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                name="days"
                value={formik.values.days || " "}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly
              />
            </div>
            <div className="col-md-2 fw-bold text-end">Discount Status</div>
            <div className="col-md-3">
              <InputSwitch
                name="discount_status"
                checked={formik.values.discount_status}
                onChange={(e) =>
                  formik.setFieldValue("discount_status", e.value)
                }
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          {/* Button */}
          <div className="d-flex justify-content-end gap-3">
            <Button
              variant="contained"
              color="success"
              size="small"
              type="submit"
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => {
                setDiscountDialog(false);
                formik.resetForm();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiscountPage;
