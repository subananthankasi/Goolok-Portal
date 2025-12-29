import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnquiryDocument } from "../../../Redux/Actions/Enquiry/enquiryReportAction";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Spinner from "react-bootstrap/Spinner";
import sold from "../../../Assets/images/sold.png";
import booking from "../../../Assets/images/booking.png";
import live from "../../../Assets/images/live.webp";

export const Header = ({ eid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [loadingPage, setLoadingPage] = useState(false);

  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  useEffect(() => {
    if (!eid || !staffid?.loginid) return;
    const payload = {
      id: eid,
      staffid: staffid.loginid,
    };

    const fetchData = async () => {
      setLoadingPage(true)
      try {
        await dispatch(fetchEnquiryDocument(payload));
        setLoadingPage(false)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch, eid, staffid.loginid]);


  return (
    <>
      {loadingPage ? (
        <div
          style={{
            height: "32vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Spinner className="mt-auto" />
        </div>
      ) : (
        <div className="mb-4">
          <div className="col-12">
            <div className="card shadow border-0">
              <div className="row p-3 align-items-center">
                <div
                  className="col-4 d-flex "
                  style={{ justifyContent: "space-between" }}
                >
                  <i
                    className="pi pi-arrow-circle-left"
                    onClick={() => navigate(-1)}
                    style={{ fontSize: "1.5rem", cursor: "pointer" }}
                  ></i>
                  <div style={{ width: 130, height: 130, margin: "auto" }}>
                    <CircularProgressbar
                      value={"100"}
                      text={enquiryDoumentData.age}
                      styles={buildStyles({
                        textSize: "20px",
                        pathColor: "#ffae42",
                        textColor: "black",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div className="">
                    <p className="mb-3" style={{ fontSize: "13px" }}>
                      <b>Name :</b>
                      {enquiryDoumentData.customer}
                    </p>
                    <p className="mb-3" style={{ fontSize: "13px" }}>
                      <b>Enquiry ID :</b> ENQID{enquiryDoumentData.id}
                    </p>
                    <p className="mb-3" style={{ fontSize: "13px" }}>
                      <b>Mobile :</b> {enquiryDoumentData.mobile}
                    </p>
                    <p className="mb-3" style={{ fontSize: "13px" }}>
                      <b>Email :</b> {enquiryDoumentData.email_id}
                    </p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="">
                    <p className="mb-3" style={{ fontSize: "13px" }}>
                      <b>Enquiry Date :</b> {enquiryDoumentData.created_at}
                    </p>
                    <p className="mb-3" style={{ fontSize: "13px" }}>
                      <b>Property Type :</b> {enquiryDoumentData.property_type}
                    </p>
                    <p className="mb-3" style={{ fontSize: "13px" }}>
                      <b>Subproperty Type :</b> {enquiryDoumentData.subpro_name}
                    </p>
                    {enquiryDoumentData.type === "sale" ? (
                      <p className="mb-3" style={{ fontSize: "13px" }}>
                        <b>Extent unit :</b>{" "}
                        {enquiryDoumentData.land_extent_display}
                      </p>
                    ) : (
                      <p className="mb-3" style={{ fontSize: "13px" }}>
                        <b>Service Category :</b>{" "}
                        {enquiryDoumentData.service_cat}
                      </p>
                    )}
                    {staffid.Login === "admin" && (
                      <p className="mb-3" style={{ fontSize: "13px" }}>
                        <b>Taken by :</b> {enquiryDoumentData.taken_by}
                      </p>
                    )}
                    {enquiryDoumentData?.status === "booking" ? (
                      <img
                        src={booking}
                        alt="booking"
                        style={{
                          width: "150px",
                          height: "100px",
                          position: "absolute",
                          top: "-5px",
                          right: "-10px",
                        }}
                      />
                    ) : enquiryDoumentData?.status === "register" ? (
                      <img
                        src={sold}
                        alt="booking"
                        style={{
                          width: "150px",
                          height: "100px",
                          position: "absolute",
                          top: "-5px",
                          right: "-10px",
                        }}
                      />
                    )  : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
