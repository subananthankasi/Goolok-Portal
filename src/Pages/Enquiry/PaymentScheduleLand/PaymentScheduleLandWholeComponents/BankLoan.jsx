import React, { useEffect } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import API_BASE_URL from '../../../../Api/api';
import axios from 'axios';
import Toast from '../../../../Utils/Toast';


const tableStyle = {
  width: '70%',
  margin: '20px auto',
  border: '1px solid #000'
};

const headerStyle = {
  backgroundColor: 'yellow',
  fontWeight: 'bold',
  textAlign: 'center'
};
const headerStyle1 = {
  backgroundColor: 'lightblue',
  fontWeight: 'bold',
  textAlign: 'center'
};

const highlightStyle = {
  backgroundColor: '#fce5cd',
  fontWeight: 'bold'
};

const cellStyle = {
  border: '1px solid #000',
  padding: '8px'
};

const BankLoan = ({ eid, id, status, bookingno, bookingid, paymentoption, readyCashData, fetchData, visible, setVisible }) => {

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      enqid: eid,
      bid: bookingid,
      paymentoption: paymentoption?.value,
    }
    try {
      await axios.post(`${API_BASE_URL}/transactions`, payload);
      formik.resetForm()
      fetchData();
      setVisible(false)
      Toast({ message: "Succefully Created", type: "success" });
    } catch (error) {
      console.error(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      booking_id: bookingno,
      total_extent: "",
      price_per_unit: "",
      total_cost: "",
      offer: "",
      peyable_amount: "",
      loan_status: "",
      loan_no: "",
      dd_no: "",
      dd_value: "",
      advance: "",
      balance: "",
      payment_mode: "",
      payment_date: "",
      remark: "",
      ten_payable: "",
      ten_paid: "",

    },
    validationSchema: yup.object().shape({
      booking_id: yup.string().required("booking id  is required!!"),
      total_extent: yup.string().required("total land extent is required!!"),
      price_per_unit: yup.string().required("price per unit is required!!"),
      total_cost: yup.string().required("total property cost is required!!"),
      offer: yup.string().required("offer & discount is required!!"),
      peyable_amount: yup.string().required("peyable amount is required!!"),
      loan_status: yup.string().required("loan_approval_status  is required!!"),
      loan_no: yup.string().required("loan_approval_no  is required!!"),
      dd_no: yup.string().required("dd_no  is required!!"),
      dd_value: yup.string().required("dd_value  is required!!"),
      advance: yup.string().required("advance amount is required!!"),
      balance: yup.string().required("balance payable is required!!"),
      payment_mode: yup.string().required("mode of payment is required!!"),
      payment_date: yup.string().required("date of payment is required!!"),
      remark: yup.string().required("remark is required!!"),
      ten_payable: yup.string().required("10 days - 20 % Payable is required!!"),
      ten_paid: yup.string().required("10 days - 20 % Paid is required!!"),

    }),
    onSubmit,
  });

  useEffect(() => {
    if (visible && readyCashData.length > 0) {
      formik.setFieldValue("booking_id", bookingno);
      formik.setFieldValue("total_extent", readyCashData[0]?.land_extent || "");
      formik.setFieldValue("price_per_unit", readyCashData[0]?.price_unit || "");
      formik.setFieldValue("total_cost", readyCashData[0]?.prop_cost || "");
      formik.setFieldValue("offer", readyCashData[0]?.discount || "");
      formik.setFieldValue("peyable_amount", readyCashData[0]?.amt_payable || "");
      formik.setFieldValue("advance", readyCashData[0]?.adv_paid || "");
      formik.setFieldValue("balance", readyCashData[0]?.bal_payable || "");
      formik.setFieldValue("paid_amount", readyCashData[0]?.amt_paid || "");
      formik.setFieldValue("payment_mode", readyCashData[0]?.pay_mode || "");
      formik.setFieldValue("payment_date", readyCashData[0]?.pay_date || "");
      formik.setFieldValue("remark", readyCashData[0]?.remarks || "");
      formik.setFieldValue("loan_status", readyCashData[0]?.loan_status || "");
      formik.setFieldValue("loan_no", readyCashData[0]?.loan_no || "");
      formik.setFieldValue("dd_no", readyCashData[0]?.dd_no || "");
      formik.setFieldValue("dd_value", readyCashData[0]?.dd_value || "");
      formik.setFieldValue("ten_paid", readyCashData[0]?.ten_days_paid || "");
      formik.setFieldValue("ten_payable", readyCashData[0]?.ten_days_payable || "");
      formik.setFieldValue("remark", readyCashData[0]?.remarks || "");
      formik.setFieldValue("id", readyCashData[0]?.id || "");
    }
  }, [visible,readyCashData]);

  return (
    <>
      <div className="container">

        {!visible && readyCashData[0]?.pay_option === "Bank Loan" && readyCashData.length > 0 ? (
          <div>
            <table className="table table-bordered" style={tableStyle}>
              <thead>
                <tr>
                  <th colSpan="2" style={{ ...cellStyle, ...headerStyle }}> &nbsp;&nbsp; Bank Loan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={cellStyle}>Booking ID</td>
                  <td style={cellStyle}>{readyCashData[0]?.book_id} </td>
                </tr>
                <tr>
                  <td style={cellStyle}>Total Land Extent</td>
                  <td style={cellStyle}>{readyCashData[0]?.land_extent} </td>
                </tr>
                <tr>
                  <td style={cellStyle}>Price per unit</td>
                  <td style={cellStyle}> {readyCashData[0]?.price_unit}</td>
                </tr>
                <tr>
                  <td style={cellStyle}>Total Property Cost</td>
                  <td style={cellStyle}> {readyCashData[0]?.prop_cost}</td>
                </tr>
                <tr>
                  <td style={{ ...cellStyle, ...highlightStyle }}>Offers & Discount</td>
                  <td style={cellStyle}> {readyCashData[0]?.discount}</td>
                </tr>
                <tr>
                  <td style={cellStyle}>Total Amount Payable (After discount)</td>
                  <td style={cellStyle}> {readyCashData[0]?.amt_payable}</td>
                </tr>


              </tbody>
            </table>
            <table className="table table-bordered" style={tableStyle}>
              <thead>
                <tr>
                  <th style={{ ...cellStyle, ...headerStyle1 }}> &nbsp;&nbsp; Advance Paid</th>
                  <th style={{ ...cellStyle, ...headerStyle1 }}> &nbsp;&nbsp; Balance Payable </th>
                  <th style={{ ...cellStyle, ...headerStyle1 }}> &nbsp;&nbsp; 10 days - 20 % Payable </th>
                  <th style={{ ...cellStyle, ...headerStyle1 }}> &nbsp;&nbsp; 10 days - 20 % Paid </th>
                  <th style={{ ...cellStyle, ...headerStyle1 }}> &nbsp;&nbsp; Mode of Payment </th>
                  <th style={{ ...cellStyle, ...headerStyle1 }}> &nbsp;&nbsp; Payment Date </th>
                  <th style={{ ...cellStyle, ...headerStyle1 }}> &nbsp;&nbsp; Remarks </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={cellStyle}>{readyCashData[0]?.adv_paid} </td>
                  <td style={cellStyle}>{readyCashData[0]?.bal_payable} </td>
                  <td style={cellStyle}>{readyCashData[0]?.ten_days_payable} </td>
                  <td style={cellStyle}>{readyCashData[0]?.ten_days_paid} </td>
                  <td style={cellStyle}>{readyCashData[0]?.pay_mode} </td>
                  <td style={cellStyle}>{readyCashData[0]?.pay_date} </td>
                  <td style={cellStyle}>{readyCashData[0]?.remarks} </td>
                </tr>
              </tbody>
            </table>

            <table className="table table-bordered" style={tableStyle}>
              <tbody>
                <tr>
                  <td style={cellStyle}>Bank loan approval status</td>
                  <td style={cellStyle}> {readyCashData[0]?.loan_status}</td>
                </tr>
                <tr>
                  <td style={cellStyle}>Bank loan approval No</td>
                  <td style={cellStyle}> {readyCashData[0]?.loan_no}</td>
                </tr>
                <tr>
                  <td style={cellStyle}>DD No</td>
                  <td style={cellStyle}> {readyCashData[0]?.dd_no}</td>
                </tr>
                <tr>
                  <td style={cellStyle}>DD Value</td>
                  <td style={cellStyle}> {readyCashData[0]?.dd_value}</td>
                </tr>

              </tbody>
            </table>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className='row'>
              <div className="col-6">
                <div className="row">
                  <div className="col-4">
                    <label className='form-label'>Booking Id</label>
                  </div>
                  <div className="col-8">
                    <input
                      type='text'
                      name="booking_id"
                      id="booking_id"
                      className="form-control"
                      placeholder='Enter booking Id ...'
                      value={formik.values.booking_id}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled

                    />
                    {formik.errors.booking_id && formik.touched.booking_id ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.booking_id}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className='form-label'>Total Land Extent</label>
                  </div>
                  <div className="col-8">
                    <input
                      type='text'
                      name="total_extent"
                      id="total_extent"
                      className="form-control"
                      placeholder='Enter total land extent ...'
                      value={formik.values.total_extent}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}

                    />
                    {formik.errors.total_extent && formik.touched.total_extent ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.total_extent}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className='form-label'>Price per unit</label>
                  </div>
                  <div className="col-8">
                    <input
                      type='text'
                      name="price_per_unit"
                      id="price_per_unit"
                      className="form-control"
                      placeholder='Enter price per unit ...'
                      value={formik.values.price_per_unit}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}

                    />
                    {formik.errors.price_per_unit && formik.touched.price_per_unit ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.price_per_unit}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className='form-label'>Total Property Cost</label>
                  </div>
                  <div className="col-8">
                    <input
                      type='text'
                      name="total_cost"
                      id="total_cost"
                      className="form-control"
                      placeholder='Enter total property Cost  ...'
                      value={formik.values.total_cost}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}

                    />
                    {formik.errors.total_cost && formik.touched.total_cost ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.total_cost}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className='form-label'>Offers & Discount</label>
                  </div>
                  <div className="col-8">
                    <input
                      type='text'
                      name="offer"
                      id="offer"
                      className="form-control"
                      placeholder='Enter offer & discount  ...'
                      value={formik.values.offer}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}

                    />
                    {formik.errors.offer && formik.touched.offer ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.offer}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className='form-label'>Total Amount Payable </label>
                  </div>
                  <div className="col-8">
                    <input
                      type='text'
                      name="peyable_amount"
                      id="peyable_amount"
                      className="form-control"
                      placeholder='Enter total amount payable  ...'
                      value={formik.values.peyable_amount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}

                    />
                    {formik.errors.peyable_amount && formik.touched.peyable_amount ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.peyable_amount}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className='form-label'>Mode of Payment</label>
                  </div>
                  <div className="col-8">
                    <input
                      type='text'
                      name="payment_mode"
                      id="payment_mode"
                      className="form-control"
                      placeholder='Enter mode of payment  ...'
                      value={formik.values.payment_mode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}

                    />
                    {formik.errors.payment_mode && formik.touched.payment_mode ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.payment_mode}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className='form-label'>10 days - 20 % Payable</label>
                  </div>
                  <div className="col-8">
                    <input
                      type='text'
                      name="ten_payable"
                      id="ten_payable"
                      placeholder='Enter 10 days - 20 % Payable  ...'
                      className="form-control"
                      value={formik.values.ten_payable}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}

                    />
                    {formik.errors.ten_payable && formik.touched.ten_payable ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.ten_payable}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-6 border-start" style={{ borderLeft: '1px solid #ccc' }}>
                <div className="row">
                  <div className="col-4">
                    <label className='form-label'>Bank loan approval status </label>
                  </div>
                  <div className="col-8">
                    <select
                      type='text'
                      name="loan_status"
                      id="loan_status"
                      className="form-select"
                      value={formik.values.loan_status}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select loan approval status</option>
                      <option value="Approved">Approved</option>
                      <option value="Not Approved">Not Approved</option>
                    </select>
                    {formik.errors.loan_status && formik.touched.loan_status ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.loan_status}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className='form-label'>Bank loan approval No. </label>
                  </div>
                  <div className="col-8">
                    <input
                      type='text'
                      name="loan_no"
                      id="loan_no"
                      className="form-control"
                      placeholder='Enter bank loan approval no ...'
                      value={formik.values.loan_no}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}

                    />
                    {formik.errors.loan_no && formik.touched.loan_no ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.loan_no}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className='form-label'> DD No</label>
                  </div>
                  <div className="col-8">
                    <input
                      type='text'
                      name="dd_no"
                      id="dd_no"
                      className="form-control"
                      placeholder='Enter DD no  ...'
                      value={formik.values.dd_no}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}

                    />
                    {formik.errors.dd_no && formik.touched.dd_no ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.dd_no}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-4">
                    <label className='form-label'>DD Value </label>
                  </div>
                  <div className="col-8">
                    <input
                      type='text'
                      name="dd_value"
                      id="dd_value"
                      placeholder='Enter DD value  ...'
                      className="form-control"
                      value={formik.values.dd_value}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}

                    />
                    {formik.errors.dd_value && formik.touched.dd_value ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.dd_value}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className='form-label'>Advance Paid</label>
                  </div>
                  <div className="col-8">
                    <input
                      type='text'
                      name="advance"
                      id="advance"
                      className="form-control"
                      placeholder='Enter advance paid  ...'
                      value={formik.values.advance}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}

                    />
                    {formik.errors.advance && formik.touched.advance ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.advance}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className='form-label'>Balance Payable</label>
                  </div>
                  <div className="col-8">
                    <input
                      type='text'
                      name="balance"
                      id="balance"
                      className="form-control"
                      placeholder='Enter balance payable amount  ...'
                      value={formik.values.balance}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}

                    />
                    {formik.errors.balance && formik.touched.balance ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.balance}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className='form-label'>Payment Date</label>
                  </div>
                  <div className="col-8">
                    <input
                      type='date'
                      name="payment_date"
                      id="payment_date"
                      className="form-control"
                      value={formik.values.payment_date}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}

                    />
                    {formik.errors.payment_date && formik.touched.payment_date ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.payment_date}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className='form-label'>10 days - 20 % Paid</label>
                  </div>
                  <div className="col-8">
                    <input
                      type='text'
                      name="ten_paid"
                      id="ten_paid"
                      placeholder='Enter 10 days - 20 % Paid  ...'
                      className="form-control"
                      value={formik.values.ten_paid}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}

                    />
                    {formik.errors.ten_paid && formik.touched.ten_paid ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.ten_paid}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <label className='form-label'>Remarks</label>
                  </div>
                  <div className="col-8">
                    <textarea
                      name="remark"
                      id="remark"
                      className="form-control"
                      placeholder='text here......'
                      value={formik.values.remark}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}

                    />
                    {formik.errors.remark && formik.touched.remark ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.remark}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

            </div>
            <div className='d-flex gap-3 justify-content-end mt-5'>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  // setBookingVisible(false);
                  formik.resetForm();
                }}
              >
                Clear
              </Button>
              <Button variant="contained" type="submit">
                {readyCashData.length > 0 ? "Update" : "Submit"}
              </Button>
            </div>
          </form>
        )}



      </div>

    </>
  )
}

export default BankLoan