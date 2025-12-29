import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import { Checkbox } from "primereact/checkbox";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import {
  paymentScheduleStageEnqGetThunk,
  paymentScheduleStageEnqPostThunk,
} from "../../../../Redux/Actions/Enquiry/PaymentScheduleEnqStageThunk";
import Toast from "../../../../Utils/Toast";

const PaymentSchedulePricingHouse = ({ eid, id, status, pagetype }) => {
  const [newDialog, setNewDialog] = useState(false);
  const [isCreateButtonVisible, setIsCreateButtonVisible] = useState(true);
  const staffid = JSON.parse(sessionStorage.getItem("token"));

  const [initialValues, setInitialValues] = useState({
    fullPayment: false,
    payInThree: false,
    payInFour: false,
    payInSix: false,
    bankLoan: false,
  });

  const dispatch = useDispatch();


  const onSubmit = (values) => {
    const selectedOptions = Object.keys(values).filter(
      (key) => values[key] === true
    );
    const payload = {
      data: selectedOptions,
      id: id,
    };
    try {
      dispatch(paymentScheduleStageEnqPostThunk(payload)).then(() => {
        dispatch(paymentScheduleStageEnqGetThunk(eid));
        Toast({ message: "Successfully submited", type: "success" });
      });
      
    } catch (error) {
      console.error(error);
      Toast({ message: "Eror ", type: "eror" });
    }

    setNewDialog(false);
  };

  useEffect(() => {
    dispatch(paymentScheduleStageEnqGetThunk(eid));
  }, []);

  const getData = useSelector(
    (state) => state.paymentStageEnqGet?.data?.schedule
  );

  const scheduleArray = getData ? JSON.parse(getData) : [];

  const formik = useFormik({
    initialValues: {
      fullPayment: false,
      payInThree: false,
      payInFour: false,
      payInSix: false,
      bankLoan: false,
    },
    // validationSchema: yup.object().shape({
    //     fullPayment: yup.boolean(),
    //     payInThree: yup.boolean(),
    //     payInFour: yup.boolean(),
    //     payInSix: yup.boolean(),
    //     bankLoan: yup.boolean(),
    //     paymentOptions: yup
    //         .array()
    //         .test('at-least-one', 'At least one payment option must be selected', (_, context) => {
    //             const { fullPayment, payInThree, payInFour, payInSix, bankLoan } = context.parent;
    //             return fullPayment || payInThree || payInFour || payInSix || bankLoan;
    //         }),
    // }),
    onSubmit,
  });

  const handleOpen = () => {
    setNewDialog(true);
  };
  const hideDialog = () => {
    setNewDialog(false);
  };
  const cancelNewDialog = () => {
    setNewDialog(false);
  };

  const isAnyOptionSelected = Object.values(formik.values).some(
    (value) => value === true
  );
  useEffect(() => {
    sessionStorage.setItem("isAnyOptionSelected", isAnyOptionSelected);
  }, []);

  const valueFalse = sessionStorage.getItem("isAnyOptionSelected");

  const handleAdd = async () => {
    setNewDialog(true);

    const selectedOptions = scheduleArray;

    const paymentFields = {
      fullPayment: false,
      payInThree: false,
      payInFour: false,
      payInSix: false,
      bankLoan: false,
    };

    selectedOptions.forEach((option) => {
      if (paymentFields.hasOwnProperty(option)) {
        paymentFields[option] = true;
      }
    });

    formik.setFieldValue("fullPayment", paymentFields.fullPayment);
    formik.setFieldValue("payInThree", paymentFields.payInThree);
    formik.setFieldValue("payInFour", paymentFields.payInFour);
    formik.setFieldValue("payInSix", paymentFields.payInSix);
    formik.setFieldValue("bankLoan", paymentFields.bankLoan);

    const paymentOptions = selectedOptions;
    await formik.setFieldValue("paymentOptions", paymentOptions);

    if (selectedOptions.length > 0) {
      formik.setFieldError("paymentOptions", "");
    }
    formik.validateForm();
  };


  return (
    <>
      <div className="card shadow border-0 mt-3">
        <div className="card shadow border-0 p-4">
          <div className="">
            {scheduleArray.length > 0 &&
            staffid.Login === "staff" &&
            (status === "pending" || status || "complete") &&
            pagetype !== "reminder" ? (
              <>
                <div className="d-flex justify-content-between">
                  <h6>Payment Schedule</h6>
                  <button className="btn btn-warning" onClick={handleAdd}>
                    <AddIcon />
                  </button>
                </div>
                <hr />
              </>
            ) : null}
          </div>

          {scheduleArray.length > 0 ? (
            <div className="">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>Schedule</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleArray.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <button className="btn1" onClick={handleOpen}>
                Create Payment Stage
              </button>
            </div>
          )}
        </div>
      </div>

      <Dialog
        visible={newDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Create Payment Stage"
        modal
        className="p-fluid"
        onHide={hideDialog}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div>
            <div className="d-flex align-items-center">
              <Checkbox
                name="fullPayment"
                checked={formik.values.fullPayment}
                onChange={formik.handleChange}
              />
              <label htmlFor="payment" className="ml-2 px-3">
                Full payment
              </label>
            </div>
            <div className="d-flex align-items-center mt-3">
              <Checkbox
                name="payInThree"
                checked={formik.values.payInThree}
                onChange={formik.handleChange}
              />
              <label htmlFor="installments" className="ml-2 px-3">
                Pay in 3 installments
              </label>
            </div>
            <div className="d-flex align-items-center mt-3">
              <Checkbox
                name="payInFour"
                checked={formik.values.payInFour}
                onChange={formik.handleChange}
              />
              <label htmlFor="4 installments" className="ml-2 px-3">
                Pay in 4 installments
              </label>
            </div>
            <div className="d-flex align-items-center mt-3">
              <Checkbox
                name="payInSix"
                checked={formik.values.payInSix}
                onChange={formik.handleChange}
              />
              <label htmlFor="6installments" className="ml-2 px-3">
                Pay in 6 installments
              </label>
            </div>

            <div className="d-flex align-items-center mt-3">
              <Checkbox
                name="bankLoan"
                checked={formik.values.bankLoan}
                onChange={formik.handleChange}
              />
              <label htmlFor="ingredient1" className="ml-2 px-3">
                Bank loan
              </label>
            </div>
            {formik.errors.paymentOptions && (
              <small className="p-error d-block mt-2">
                {formik.errors.paymentOptions}
              </small>
            )}

            <div className="mt-3 d-flex justify-content-end gap-3">
              <div>
                <Button variant="outlined" onClick={cancelNewDialog}>
                  {" "}
                  Cancel{" "}
                </Button>

                {/* <Button label="Cancel" icon="pi pi-time" type="button" outlined style={{ borderRadius: '7px' }} onClick={cancelNewDialog} /> */}
              </div>
              <div>
                {/* <Button label="Save" icon="pi pi-check" type="submit" style={{ borderRadius: '7px' }} /> */}
                <Button variant="contained" type="submit">
                  {" "}
                  Save{" "}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default PaymentSchedulePricingHouse;
