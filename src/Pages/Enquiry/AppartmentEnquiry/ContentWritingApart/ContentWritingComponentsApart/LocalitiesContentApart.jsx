import React, { useState, useCallback, useEffect, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "react-data-table-component";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  Polygon,
  Autocomplete,
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import API_BASE_URL from "../../../../../Api/api";
import { localitiesDeleteThunk, localitiesGetThunk, localitiesPostThunk, localitiesUpdateThunk } from "../../../../../Redux/Actions/Enquiry/ContentWritingThunk/LocalitiesThunk";
import customStyle from "../../../../../Utils/tableStyle";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";


const loaderOptions = {
  id: "google-map-script",
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ["places", "geometry"],
};

const containerStyle = {
  width: "100%",
  height: "50vh",
};

const center = {
  lat: 13.078187,
  lng: 79.972347,
};

const LocalitiesContentApart = ({ eid, id, status }) => {

  const [text, setText] = useState("");
  const [newDialog, setNewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { isLoaded } = useJsApiLoader(loaderOptions);
  const [map, setMap] = useState(null);
  const [clickedLatLng, setClickedLatLng] = useState({});
  const [mapRef, setMapRef] = useState(null);
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  const autocompleteRef = useRef(null);
  const dispatch = useDispatch();
  const staffid = JSON.parse(sessionStorage.getItem("token"));

  const [mapMove, setMapMove] = useState(null);
  const [Location, setLocation] = useState([]);
  const [division, setDivision] = useState({});
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [filter, setFilter] = useState("all");
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [redMark, setRedMark] = useState(null);





  const fetch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/location/${eid}/edit`);
      const fetchedLocation = response.data?.location;

      if (fetchedLocation) {
        const [lat, lng] = fetchedLocation.split(",").map(parseFloat);

        setRedMark({ lat, lng });
      }

      // setIsLoadingPage(false);
    }
    catch (error) {
      console.error(error);
      // setIsLoadingPage(false)
    }
  }
  useEffect(() => {
    fetch()
  }, [])


  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const handleMarkerHover = (index) => {
    setHoveredMarker(index);
  };

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  const handleMapClick = (event) => {
    const latLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    const latLngs = `${event.latLng.lat()}, ${event.latLng.lng()}`;
    setClickedLatLng(latLng);
    // setLocation(latLngs);
    formik.setFieldValue("location", `${latLng.lat}, ${latLng.lng}`);
  };


  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const latLng = { lat, lng };
      setMapMove(latLng);
      setClickedLatLng(latLng);
      formik.setFieldValue("location", `${lat}, ${lng}`);
      if (map) map.panTo(latLng);
    }
  };


  const handleSearch = () => {
    const inputValue = document
      .querySelector("input[name='locationSearch']")
      .value.trim();
    const latLngRegex = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/;
    if (latLngRegex.test(inputValue)) {
      const [lat, lng] = inputValue.split(",").map(Number);
      if (!isNaN(lat) && !isNaN(lng)) {
        const latLng = { lat, lng };

        setClickedLatLng(latLng);
        formik.setFieldValue("location", `${lat}, ${lng}`);
        if (map) map.panTo(latLng);
        return;
      }
    }


    if (mapMove) {
      setClickedLatLng(mapMove);
      formik.setFieldValue("location", `${mapMove.lat}, ${mapMove.lng}`);
      if (map) map.panTo(mapMove);
    }
  };
  const onSubmit = (values) => {
    if (editing) {
      dispatch(localitiesUpdateThunk(values)).then(() => {
        dispatch(localitiesGetThunk(eid));
      });
      setEditDialog(false);
      setClickedLatLng({})
      formik.resetForm();
    }
    else {
      dispatch(localitiesPostThunk(values)).then(() => {
        dispatch(localitiesGetThunk(eid));
      });
      setNewDialog(false);
      setClickedLatLng({})
      // setRedMark('')
      formik.resetForm();

    }
  };
  const openDelete = (row) => {
    setDeleteDialog(true);
    setDeleteId(row.id);
  };
  const handleDelete = async () => {
    try {
      const response = await dispatch(localitiesDeleteThunk(deleteId));

      if (localitiesDeleteThunk.fulfilled.match(response)) {
        const message = response.payload.data;
        setDeleteDialog(false);
        formik.resetForm();
        await dispatch(localitiesGetThunk(eid));
      } else if (localitiesDeleteThunk.rejected.match(response)) {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      division: "",
      title: "",
      description: "",
      location: "",
      enqid: eid,
      id: null,
      // images:''
    },
    validationSchema: yup.object().shape({
      division: yup.string().required(" required!!"),
      title: yup.string().required(" required!!"),
      // description: yup.string().required(" required!!"),
      location: yup.string().required(" required!!"),
    }),
    onSubmit,
  });

  useEffect(() => {
    dispatch(localitiesGetThunk(eid));
  }, []);

  const getData = useSelector((state) => state.localitiesData?.get?.data);


  useEffect(() => {
    if (Array.isArray(getData)) {
      const newLocations = getData?.map((item) => item.location);
      const division = getData?.map((item) => item.division);
      const title = getData?.map((item) => item.title);
      const description = getData?.map((item) => item.description);

      setLocation(newLocations);
      setDivision(division);
      setTitle(title);
      setDescription(description);
    }
  }, [getData]);


  const hideDialog = () => {
    setNewDialog(false);
    formik.resetForm();
  };
  const hideEditDialog = () => {
    setEditDialog(false);
    formik.resetForm();
  };
  const handleEdit = (row) => {
    setEditDialog(true);
    formik.setFieldValue("division", row.division);
    formik.setFieldValue("title", row.title);
    formik.setFieldValue("description", row.description);
    formik.setFieldValue("location", row.location);
    formik.setFieldValue("id", row.id);
  };

  const column1 = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Division",
      selector: (row) => row.division,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    // {
    //   name: "Description",
    //   selector: (row) => row.description,
    //   sortable: true,
    // },

    ...((status === "pending" || status === "complete") && staffid.Login == "staff" && enquiryDoumentData?.status !== "booking"
      ? [
        {
          name: "Actions",
          cell: (row) => (
            <>
              <div className="d-flex">
                <button
                  className="btn btn-outline-info me-1 edit"
                  data-tooltip-id="edit"
                  onClick={() => handleEdit(row)}
                >
                  <EditIcon />
                </button>
                <button
                  className="btn btn-outline-danger delete"
                  data-tooltip-id="delete"
                  onClick={() => openDelete(row)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </>
          ),
        },
      ]
      : []),
  ];
  const deleteUnitsDialogFooter = (
    <div className=" d-flex gap-3 justify-content-end">
      <Button
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
        onClick={handleDelete}
      />
    </div>
  );
  const hideDeleteProductsDialog = () => {
    setDeleteDialog(false);
  };
  const handleMarkerClick = (lat, lng) => {
    if (mapRef) {
      mapRef.panTo({ lat, lng });
      mapRef.setZoom(15);
    }
  };

  const calculateDistance = (lat, lng) => {
    const centerLatLng = new window.google.maps.LatLng(redMark?.lat, redMark?.lng);
    const markerLatLng = new window.google.maps.LatLng(lat, lng);
    const distanceInMeters = window.google.maps.geometry.spherical.computeDistanceBetween(
      centerLatLng,
      markerLatLng
    );
    return (distanceInMeters / 1000).toFixed(2);
  };
  const clearForm = () => {
    formik.resetForm()
  }



  const [surveyData, setSurveyData] = useState([])

  const fetchSurveyNo = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/lawyer/${eid}`
      );
      const data = response.data.map((data, index) => ({
        ...data,
        sno: index + 1,
      }));
      setSurveyData(data);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchSurveyNo();
  }, []);
  const [handleMarker, setHandleMarker] = useState(null);
  const handleMarking = (index) => {
    setHandleMarker(index);
  };

  return isLoaded ? (
    <>
      <div className="mt-2">
        <div className="d-flex justify-content-between mb-3">
          <h6>Localities</h6>

          {(status == "pending" || status == "complete") && staffid.Login == "staff" && enquiryDoumentData?.status !== "booking" && (
            <div className="ms-2">
              <a
                href="#"
                onClick={() => setNewDialog(true)}
                className="btn1 me-2"
              >
                + Add
              </a>
            </div>
          )}
        </div>
        <DataTable
          persistTableHead={true}
          columns={column1}
          data={getData}
          customStyles={customStyle}
          pagination
          // selectableRows
          fixedHeader
        />
      </div>
      {/*new modal */}

      <Dialog
        visible={newDialog}
        style={{ width: "42rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Add Localities"
        modal
        className="p-fluid"
        onHide={hideDialog}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div>
            <div>
              <label htmlFor="division">Sector :</label>
              <select
                id="division"
                name="division"
                className="form-select mt-2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.division}
              >

                <option value="">Select Sectors</option>
                <option value="school & colleges">School & Colleges</option>
                <option value="new developments">New Developments</option>
                <option value="majar">Major Land Mark</option>
                <option value="Bus Stand">Bus Stand</option>
              </select>
              {formik.errors.division && formik.touched.division && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {formik.errors.division}
                </p>
              )}
            </div>
            <div className="mt-2 col-md-12">
              <label className="form-label" htmlFor="interiorFeature">
                Title
              </label>
              <input
                name="title"
                id="title"
                placeholder="Enter Title"
                className="form-control"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.title && formik.touched.title ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {formik.errors.title}
                </p>
              ) : null}
            </div>
            <div>
              {/* {status == "pending" && ( */}
              <div className="form-group mt-3">
                <div className="row mb-3 align-items-center">
                  <div className="col-2">
                    <label className="form-label">Location (lat, lng)</label>
                  </div>
                  <div className="col-5">
                    <input
                      type="text"
                      className="form-control"
                      disabled
                      name="location"
                      value={formik.values.location}
                    // value={Location}
                    />
                  </div>
                </div>
              </div>
              {/* )} */}


              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={handleMapClick}
              >
                <div className="mt-4">
                  <div className="" style={{ width: "60%", margin: "auto" }}>
                    <div
                      className="card mt-2"
                      style={{
                        position: "absolute",
                        zIndex: "1",
                        width: "50%",
                      }}
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12 col-lg mb-1 mt-1">
                            <Autocomplete
                              onLoad={(autocomplete) =>
                                (autocompleteRef.current = autocomplete)
                              }
                              onPlaceChanged={handlePlaceChanged}
                            >
                              <input
                                type="text"
                                className="form-control"
                                name="locationSearch"
                                autoComplete="off"
                                placeholder="Location"
                              />
                            </Autocomplete>
                          </div>

                          <div className="col-auto mb-1 mt-1">
                            <button
                              type="button"
                              className="btn1"
                              onClick={handleSearch}
                            >
                              <LocationSearchingIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {clickedLatLng && <Marker position={clickedLatLng} />}
                {Location && typeof Location === "string" && (
                  <Marker
                    position={{
                      lat: parseFloat(Location.split(",")[0]),
                      lng: parseFloat(Location.split(",")[1]),
                    }}
                  />
                )}
                {/* Markers */}
                {surveyData?.map((item, index) => {
                  if (!item.location) return null;
                  const [lat, lng] = item.location.split(",").map(parseFloat);
                  return (
                    <>
                      <Marker
                        key={index}
                        position={{ lat, lng }}
                        onClick={() => handleMarking(index)}
                        tooltip="Confirm to proceed"

                      />
                      {handleMarker === index && (
                        <InfoWindow
                          position={{ lat, lng }}
                          options={{
                            pixelOffset: new window.google.maps.Size(0, -30),
                            maxWidth: 500,
                          }}
                          onCloseClick={() => setHandleMarker(null)}

                        >
                          <div style={{ textAlign: "center", height: "50px", overflow: "hidden" }} className="p-0">

                            <h6 style={{ fontWeight: "400", fontSize: '15px' }}> Survey No : {item.survey_no}</h6>
                            <p><LocationOnIcon sx={{ color: "red", fontSize: 17 }} /> {item.location} </p>
                          </div>
                        </InfoWindow>
                      )}
                    </>
                  )
                })}

                {/* Polygon */}
                <Polygon
                  path={
                    surveyData
                      .filter(item => item.location)
                      .map(item => {
                        const [lat, lng] = item.location.split(",").map(parseFloat);
                        return { lat, lng };
                      })
                  }
                  options={{
                    fillColor: "#99FFCC",
                    fillOpacity: 0.7,
                    strokeColor: "green",
                    strokeOpacity: 1,
                    strokeWeight: 2,
                  }}
                />
              </GoogleMap>

            </div>
          </div>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="outlined" color="error" onClick={clearForm} >Clear</Button>
            <Button variant="contained" type="submit" onClick={() => setEditing(false)}>Submit</Button>

          </div>
        </form>
      </Dialog>
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
            Are you sure you want to delete the General Features ?
          </span>
        </div>
      </Dialog>

      {/*Edit modal */}

      <Dialog
        visible={editDialog}
        style={{ width: "42rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit Localities"
        modal
        className="p-fluid"
        onHide={hideEditDialog}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div>
            <div>
              <label htmlFor="division">Sector :</label>
              <select
                id="division"
                name="division"
                className="form-select mt-2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.division}
              >
                <option value="">Select Sectors</option>
                <option value="school & colleges">School & Colleges</option>
                <option value="new developments">New Developments</option>
                <option value="majar">Major Land Mark</option>
                <option value="Bus Stand">Bus Stand</option>
              </select>
              {formik.errors.division && formik.touched.division && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {formik.errors.division}
                </p>
              )}
            </div>
            <div className="mt-2 col-md-12">
              <label className="form-label" htmlFor="title">
                Title
              </label>
              <input
                name="title"
                id="title"
                placeholder="Enter Title"
                className="form-control"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.title && formik.touched.title ? (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {formik.errors.title}
                </p>
              ) : null}
            </div>

            <div>
              {status == "pending" && (
                <div className="form-group mt-3">
                  <div className="row mb-3 align-items-center">
                    <div className="col-2">
                      <label className="form-label">Location (lat, lng)</label>
                    </div>
                    <div className="col-5">
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        name="location"
                        value={formik.values.location}
                      // value={Location}
                      />
                    </div>
                  </div>
                </div>
              )}


              {/* <GoogleMap
                mapContainerStyle={containerStyle}
                center={redMark}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={handleMapClick}
              >

                {clickedLatLng && <Marker position={clickedLatLng} />}
                {Location && typeof Location === "string" && (
                  <Marker
                    position={{
                      lat: parseFloat(Location.split(",")[0]),
                      lng: parseFloat(Location.split(",")[1]),
                    }}
                  />
                )}
                <Marker position={redMark} />
              </GoogleMap> */}

              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={handleMapClick}
              >
                {clickedLatLng && <Marker position={clickedLatLng} />}
                {Location && typeof Location === "string" && (
                  <Marker
                    position={{
                      lat: parseFloat(Location.split(",")[0]),
                      lng: parseFloat(Location.split(",")[1]),
                    }}
                  />
                )}
                {/* Markers */}
                {surveyData?.map((item, index) => {
                  if (!item.location) return null;
                  const [lat, lng] = item.location.split(",").map(parseFloat);
                  return (
                    <>
                      <Marker
                        key={index}
                        position={{ lat, lng }}
                        onClick={() => handleMarking(index)}
                        tooltip="Confirm to proceed"

                      />
                      {handleMarker === index && (
                        <InfoWindow
                          position={{ lat, lng }}
                          options={{
                            pixelOffset: new window.google.maps.Size(0, -30),
                            maxWidth: 500,
                          }}
                          onCloseClick={() => setHandleMarker(null)}

                        >
                          <div style={{ textAlign: "center", height: "50px", overflow: "hidden" }} className="p-0">

                            <h6 style={{ fontWeight: "400", fontSize: '15px' }}> Survey No : {item.survey_no}</h6>
                            <p><LocationOnIcon sx={{ color: "red", fontSize: 17 }} /> {item.location} </p>
                          </div>
                        </InfoWindow>
                      )}
                    </>
                  )
                })}

                {/* Polygon */}
                <Polygon
                  path={
                    surveyData
                      .filter(item => item.location)
                      .map(item => {
                        const [lat, lng] = item.location.split(",").map(parseFloat);
                        return { lat, lng };
                      })
                  }
                  options={{
                    fillColor: "#99FFCC",
                    fillOpacity: 0.7,
                    strokeColor: "green",
                    strokeOpacity: 1,
                    strokeWeight: 2,
                  }}
                />
              </GoogleMap>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2 mt-4">
            {/* <div>
              <Button
                label="Update"
                icon="pi pi-upload"
                type="submit"
                size="small"
                style={{ borderRadius: "7px" }}
                onClick={() => setEditing(true)}
              />
            </div> */}
            <Button variant="contained" type="submit" onClick={() => setEditing(true)}>Update</Button>
          </div>
        </form>
      </Dialog>
      {/**.................................................................................................................... */}
      <div>
        <div className="d-flex gap-5 mb-3">
          <h6> Localities additon in map</h6>
          <select
            className="form-select"
            style={{ width: "300px" }}
            value={filter}
            onChange={handleFilterChange}
          >

            <option value="all">All</option>
            <option value="school & colleges">School & Colleges</option>
            <option value="new developments">New Developments</option>
            <option value="majar">Major Land Mark</option>
            <option value="Bus Stand">Bus Stand</option>
          </select>
        </div>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={7}
          onLoad={(map) => setMapRef(map)}
        >


          {surveyData?.map((item, index) => {
            if (!item.location) return null;
            const [lat, lng] = item.location.split(",").map(parseFloat);
            return (
              <>
                <Marker
                  key={index}
                  position={{ lat, lng }}
                  onClick={() => handleMarking(index)}
                  tooltip="Confirm to proceed"

                />
                {handleMarker === index && (
                  <InfoWindow
                    position={{ lat, lng }}
                    options={{
                      pixelOffset: new window.google.maps.Size(0, -30),
                      maxWidth: 500,
                    }}
                    onCloseClick={() => setHandleMarker(null)}

                  >
                    <div style={{ textAlign: "center", height: "50px", overflow: "hidden" }} className="p-0">

                      <h6 style={{ fontWeight: "400", fontSize: '15px' }}> Survey No : {item.survey_no}</h6>
                      <p><LocationOnIcon sx={{ color: "red", fontSize: 17 }} /> {item.location} </p>
                    </div>
                  </InfoWindow>
                )}
              </>
            )
          })}

          {/* Polygon */}
          <Polygon
            path={
              surveyData
                .filter(item => item.location)
                .map(item => {
                  const [lat, lng] = item.location.split(",").map(parseFloat);
                  return { lat, lng };
                })
            }
            options={{
              fillColor: "#99FFCC",
              fillOpacity: 0.7,
              strokeColor: "green",
              strokeOpacity: 1,
              strokeWeight: 2,
            }} />



          {Location?.map((loc, index) => {
            if (typeof loc === "string") {
              const [lat, lng] = loc.split(",").map(parseFloat);
              const markerColor =
                division[index] === "school & colleges"
                  ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                  : division[index] === "Bus Stand"
                    ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                    : division[index] === "majar"
                      ? "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                      : division[index] === "new developments"
                        ? "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
                        : "http://maps.google.com/mapfiles/ms/icons/red-dot.png";

              if (filter === "all" || division[index] === filter) {
                const distance = calculateDistance(lat, lng);
                return (
                  <>
                    <Marker position={redMark} />
                    <Marker
                      key={index}
                      position={{ lat, lng }}
                      onMouseOver={() => handleMarkerHover(index)}
                      icon={markerColor}
                      onClick={() => handleMarkerClick(lat, lng)}
                    />
                    {hoveredMarker === index && (
                      <InfoWindow
                        position={{ lat, lng }}
                        options={{
                          pixelOffset: new window.google.maps.Size(0, -30),
                          maxWidth: 500,
                          height: 5
                        }}

                      >
                        <div className=" " style={{ textAlign: "center", height: "50px", overflow: "hidden" }}>
                          <h6 style={{ fontWeight: "400", fontSize: '15px' }}> <LocationOnOutlinedIcon /> {title[index]}</h6>
                          {distance && <h6 style={{ fontWeight: "400", fontSize: '15px' }} >distance from : {distance} km</h6>}
                        </div>
                      </InfoWindow>
                    )}
                  </>
                );
              }
            }
            return null;
          })}
        </GoogleMap>
      </div>

      <div className="d-flex mt-2 gap-4 p-0 m-1 text-center">
        <div className="d-flex gap-2 p-0 m-0 ">
          <p
            style={{
              backgroundColor: "red",
              height: "15px",
              width: "15px",
            }}
          ></p>
          <p className="p-0 m-0" style={{ fontSize: "13px" }}>Property Location</p>
        </div>
        <div className="d-flex gap-2 p-0 m-0">
          <p
            style={{
              backgroundColor: "rgb(110, 151, 255)",
              height: "15px",
              width: "15px",
            }}
          ></p>
          <p className="p-0 m-0" style={{ fontSize: "13px" }}>School &Colleges</p>
        </div>
        <div className="d-flex gap-3 p-0 m-0 ">
          <p
            style={{
              backgroundColor: "rgb(0, 230, 77)",
              height: "15px",
              width: "15px",
            }}
          ></p>
          <p className="p-0 m-0" style={{ fontSize: "13px" }}>Bus Stand</p>
        </div>

        <div className="d-flex gap-2 p-0 m-0">
          <p
            style={{
              backgroundColor: "rgb(252, 245, 106)",
              height: "15px",
              width: "15px",
            }}
          ></p>
          <p className="p-0 m-0" style={{ fontSize: "13px" }}>Major Land Mark</p>
        </div>
        <div className="d-flex gap-2 p-0 m-0 ">
          <p
            style={{
              backgroundColor: "rgb(255, 153, 0)",
              height: "15px",
              width: "15px",
            }}
          ></p>
          <p className="p-0 m-0" style={{ fontSize: "13px" }}>New Deveopments</p>
        </div>
      </div>

      {/**.................................... */}

      {/* <div>
        <NearbyDevelopments eid={eid} id={id} status={status} />
      </div> */}
    </>
  ) : null;
};

export default LocalitiesContentApart;
