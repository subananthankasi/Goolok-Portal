import React from "react";
import Topbar from "../../../Components/topbar/topbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Footerbar from "../../../Components/footer/footer";
import '../crm.css'

function CustomCalendar() {
  const localizer = momentLocalizer(moment);
  const myEventsList = [  
    {
      start: moment().toDate(),
      end: moment()
        .add(0, "days")
        .toDate(),
      title: "Hlo Everyone"
    }
  ];
  return (
    <div>
      <Topbar />
      <section className="section p-5">
        <div className="container-fluid">
          <div className="row">
            <Calendar
              localizer={localizer}
              startAccessor="start"
              endAccessor="end"
              events={myEventsList}
              style={{ height: 500 }}
            />
          </div>
        </div>
      </section>
      <Footerbar />
    </div>
  );
}

export default CustomCalendar;
