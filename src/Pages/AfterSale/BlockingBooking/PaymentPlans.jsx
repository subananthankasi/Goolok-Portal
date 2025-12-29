import React, { useMemo } from "react";
import { Card, CardContent, Typography, Divider, Box } from "@mui/material";
import { Timeline } from "primereact/timeline";
import { Panel } from "rsuite";
import { Skeleton } from "primereact/skeleton";

// import { Timeline } from "rsuite";
import CreditCardIcon from "@rsuite/icons/legacy/CreditCard";
import PlaneIcon from "@rsuite/icons/legacy/Plane";
import TruckIcon from "@rsuite/icons/legacy/Truck";
import UserIcon from "@rsuite/icons/legacy/User";
import CheckIcon from "@rsuite/icons/legacy/Check";
import "./Booking.css";

const PaymentPlans = ({ bookingData, loading }) => {
  const payments = useMemo(() => {
    let parsed = [];
    try {
      parsed = JSON.parse(bookingData?.shedule[0]?.installment_details || "[]");
    } catch (err) {
      console.error("Invalid JSON", err);
    }

    const installments = parsed.map((item, index) => {
      const totalAmount = bookingData.total
        ? Number(bookingData.total)
        : Number(bookingData.sub_total.replace(/,/g, ""));
      const [day, month, year] = bookingData.cleared_date.split("-");
      const bookingDate = new Date(`${year}-${month}-${day}`);

      const dueDate = new Date(bookingDate);
      dueDate.setDate(dueDate.getDate() + Number(item.days));

      const formattedDate = dueDate
        .toLocaleDateString("en-GB")
        .replace(/\//g, "-");

      return {
        status: item.installment,
        date: formattedDate,
        amount: `₹ ${(totalAmount * item.percentage_of_amount) / 100}`,
        icon: index === parsed.length - 1 ? "pi pi-hourglass" : "pi pi-clock",
        color: index === parsed.length - 1 ? "orange" : "blue",
      };
    });

    return [
      {
        status: "Advance Paid",
        date: bookingData?.booking_date,
        amount: `₹ ${bookingData?.advance}`,
        icon: "pi pi-check-circle",
        color: "green",
      },
      ...installments,
    ];
  }, [bookingData]);


  const customizedMarker = (item) => {
    return (
      <span
        className="d-flex p-2  align-items-center justify-content-center text-white rounded-circle"
        style={{ backgroundColor: item.color }}
      >
        <i className={item.icon}></i>
      </span>
    );
  };
  return (
    <div className="row mt-4 mb-4">
      {loading ? (
        <div className="col-12">
          <Skeleton height="27rem" width="100%" className="mb-1 " />
        </div>
      ) : (
        <div className="col-12 ">
          <Card className="shadow">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payment Plans
              </Typography>
              <Divider />
              <Timeline
                value={payments}
                align="alternate"
                marker={customizedMarker}
                content={(item) => (
                  <div className="p-2">
                    <h6>{item.status}</h6>
                    <h6 style={{ fontSize: "13px", color: "gray" }}>
                      Date: {item.date}
                    </h6>
                    <h6
                      style={{
                        fontSize: "13px",
                        color: "gray",
                        marginTop: "0px",
                      }}
                    >
                      Amount:{""}{" "}
                      <span style={{ color: "black" }}>{item.amount} </span>{" "}
                    </h6>
                  </div>
                )}
              />
              {/* <div className="d-flex justify-content-center">
                <Timeline className="custom-timeline">
                  {payments?.map((item) => (
                    <Timeline.Item
                      dot={
                        <CreditCardIcon
                          style={{ background: "#15b215", color: "#fff" }}
                        />
                      }
                    >
                      <h6>{item.status} </h6>
                      <p style={{ fontSize: "12px", color: "gray" }}>
                        Date:{item.date}{" "}
                      </p>
                      <p style={{ fontSize: "12px", color: "gray" }}>
                        Amount:{item.amount}{" "}
                      </p>
                    </Timeline.Item>
                  ))}
                  <Timeline.Item dot={<CreditCardIcon style={{ background: "#15b215", color: "#fff" }}/>}>
                  <p>March 1, 10:20</p>
                  <p>Your order starts processing</p>
                </Timeline.Item>
                <Timeline.Item>
                  <p>March 1, 11:34</p>
                  <p>
                    The package really waits for the company to pick up the
                    goods
                  </p>
                </Timeline.Item>
                <Timeline.Item>
                  <p>March 1, 16:20</p>
                  <p>[Packed]</p>
                  <p>Beijing company has received the shipment</p>
                </Timeline.Item>
                <Timeline.Item dot={<PlaneIcon style={{ background: "#15b215", color: "#fff" }}/>}>
                  <p>March 2, 06:12</p>
                  <p>[In transit]</p>
                  <p>Order has been shipped from Beijing to Shanghai</p>
                </Timeline.Item>
                <Timeline.Item dot={<TruckIcon style={{ background: "#15b215", color: "#fff" }}/>}>
                  <p>March 2, 09:20</p>
                  <p>[In transit]</p>
                  <p>
                    Sended from the Shanghai Container Center to the
                    distribution center
                  </p>
                </Timeline.Item>
                <Timeline.Item dot={<UserIcon style={{ background: "#15b215", color: "#fff" }}/>}>
                  <p>March 3, 14:20</p>
                  <p>[Delivery]</p>
                  <p>
                    Shanghai Hongkou District Company Deliverer: Mr. Li,
                    currently sending you a shipment
                  </p>
                </Timeline.Item>
                <Timeline.Item
                  dot={
                    <CheckIcon
                      style={{ background: "#15b215", color: "#fff" }}
                    />
                  }
                >
                  <p>March 3, 17:50</p>
                  <p>[Received]</p>
                  <p>
                    Your courier has arrived and the signer is the front desk
                  </p>
                </Timeline.Item> 
                </Timeline>
              </div> */}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PaymentPlans;
