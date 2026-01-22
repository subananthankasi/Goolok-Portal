
import React, { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import GenaralFeatures from "./GenaralFeatures";
import InteriorFeatures from "./InteriorFeatures";
import ExteriorFeatures from "./ExteriorFeatures";
import InvestmentStrategy from "./InvestmentStrategy";
import { CWDescAndFeatureGetThunk } from "../../../../Redux/Actions/Enquiry/ContentWritingThunk/CWDescriptionFeatureThunk";
import { iFeatureGetThunk } from "../../../../Redux/Actions/MasterPage/FeaturesThunk/InteriorFeatureThunk";
import { eFeatureGetThunk } from "../../../../Redux/Actions/MasterPage/FeaturesThunk/ExteriorFeatureThunk";
import { gFeatureGetThunk } from "../../../../Redux/Actions/MasterPage/FeaturesThunk/GeneralFeatureThunk";

const Description = ({ eid, id, status }) => {
  const dispatch = useDispatch();
  const [amenities, setAmenities] = useState([]);
  const staffid = JSON.parse(localStorage.getItem("token"));
   const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );
  // Redux data
  const cwData = useSelector(
    (state) => state.CWDescFeatureData?.get?.data?.[0]?.amenities
  );
  const descriptionValue = useSelector(
    (state) => state.CWDescFeatureData?.get?.data?.[0]?.description
  );
  const highlightsValue = useSelector(
    (state) => state.CWDescFeatureData?.get?.data?.[0]?.highlights
  );
  const titleValue = useSelector(
    (state) => state.CWDescFeatureData?.get?.data?.[0]?.title
  );
  const idvalue = useSelector(
    (state) => state.CWDescFeatureData?.get?.data?.[0]?.id
  );

  // Fetch initial data
  useEffect(() => {
    dispatch(iFeatureGetThunk());
    dispatch(eFeatureGetThunk());
    dispatch(gFeatureGetThunk());
    dispatch(CWDescAndFeatureGetThunk(eid));
  }, [dispatch, eid]);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/landamenities`);
        setAmenities(response.data?.[0]?.amenities || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAmenities();
  }, []);

 
  const formik = useFormik({
    enableReinitialize: true, 
    initialValues: {
      title: titleValue || "",
      highlights: highlightsValue || "",
      description: descriptionValue || "",
      amenities: cwData ? JSON.parse(cwData) : [],
      id: idvalue || null,
      enqid: eid,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      highlights: Yup.string().required("Highlights are required"),
      description: Yup.string().required("Description is required"),
      amenities: Yup.array().min(1, "Select at least one amenity"),
    }),
    onSubmit: async (values) => {
      try {
        const updateData = {
          ...values,
          amenities: values.amenities.map((id) => parseInt(id)),
        };

        await axios.post(`${API_BASE_URL}/contentdpt`, updateData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        dispatch(CWDescAndFeatureGetThunk(eid));
        Toast({ message: "Successfully Submitted", type: "success" });
      } catch (error) {
        alert(error.response?.data?.messages?.error || "Something went wrong");
      }
    },
  });

  // Amenity toggle handler
  const handleCheckboxChange = (amenityId) => {
    const { amenities } = formik.values;
    if (amenities?.includes(amenityId)) {
      formik.setFieldValue(
        "amenities",
        amenities.filter((id) => id !== amenityId)
      );
    } else {
      formik.setFieldValue("amenities", [...amenities, amenityId]);
    }
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {/* Title */}
        <div className="form-group">
          <label className="form-label">Title :</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control w-25"
            placeholder="Enter Title..."
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="validation_msg">{formik.errors.title}</div>
          )}
        </div>

        {/* Highlights */}
        <div className="form-group mt-3">
          <label className="form-label">Nearby Highlights :</label>
          {/* <Editor
            value={formik.values.highlights}
            onTextChange={(value) =>
              formik.setFieldValue(
                "highlights",
                value.htmlValue?.replace(/<[^>]*>/g, "") || ""
              )
            }
            style={{ height: "300px" }}
            className="mt-2"
            placeholder="Text here ..."
          /> */}
           <input
            type="text"
            id="highlights"
            name="highlights"
            className="form-control w-25"
            placeholder="Enter highlights..."
            value={formik.values.highlights}
            onChange={formik.handleChange}
          />
          {formik.touched.highlights && formik.errors.highlights && (
            <div className="validation_msg">{formik.errors.highlights}</div>
          )}
        </div>

        {/* Description */}
        <div className="form-group mt-3">
          <label className="form-label">Description :</label>
          <Editor
            value={formik.values.description}
            onTextChange={(value) =>
              formik.setFieldValue(
                "description",
                value.htmlValue?.replace(/<[^>]*>/g, "") || ""
              )
            }
            style={{ height: "300px" }}
            className="mt-2"
            placeholder="Text here ..."
          />
          {formik.touched.description && formik.errors.description && (
            <div className="validation_msg">{formik.errors.description}</div>
          )}
        </div>

        {/* Amenities */}
        <div className="mt-3 card" style={{ boxShadow: "none" }}>
          <div className="card-body">
            <label style={{ fontWeight: "600" }} className="form-label">
              Amenities :
            </label>
            <hr />
            <div className="row">
              {amenities.map((amenity) => (
                <div className="col-md-6 col-lg-3 mt-2" key={amenity.id}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formik.values?.amenities?.includes(amenity.id)}
                      onChange={() => handleCheckboxChange(amenity.id)}
                    />
                    <label
                      className="form-check-label amenitiesBox"
                      style={{ fontSize: "15px" }}
                    >
                      {amenity.amenities}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {formik.touched.amenities && formik.errors.amenities && (
              <div className="validation_msg">{formik.errors.amenities}</div>
            )}
          </div>
        </div>

        {/* Save button */}
        {(status === "pending" || status === "complete") &&
          staffid.Login === "staff" && enquiryDoumentData?.status !=="booking" && (
            <div className="d-flex justify-content-end mt-3">
              <Button variant="contained" type="submit">
                Save
              </Button>
            </div>
          )}
      </form>

      <hr />
      {/* Sub-components */}
      <GenaralFeatures eid={eid} id={id} status={status} />
      <InteriorFeatures eid={eid} id={id} status={status} />
      <ExteriorFeatures eid={eid} id={id} status={status} />
      <InvestmentStrategy eid={eid} id={id} status={status} />
    </div>
  );
};

export default Description;
