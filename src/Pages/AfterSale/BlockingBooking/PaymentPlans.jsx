import { useMemo } from "react";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { Timeline } from "primereact/timeline";
import { Skeleton } from "primereact/skeleton";
import "./Booking.css";

const PaymentPlans = ({ bookingData, loading }) => {
  const payments = useMemo(() => {
    let parsed = [];
    try {
      parsed = JSON.parse(bookingData?.shedule[0]?.installment_details || "[]");
    } catch (err) {
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
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PaymentPlans;
