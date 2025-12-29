import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import Spinner from "react-bootstrap/Spinner";

const containerStyle = {
  width: "100%",
  height: "50vh",
};

const center = {
  lat: 13.078187,
  lng: 79.972347,
};

const loaderOptions = {
  id: "google-map-script",
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ["places", "geometry"],
};

const LocationSelect = ({ id, status, staffid }) => {
  const { isLoaded } = useJsApiLoader(loaderOptions);
  const [map, setMap] = useState(null);
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const autocompleteRef = useRef(null);
  const [mapMove, setMapMove] = useState(null);
  const [Location, setLocation] = useState(null);

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
    setLocation(latLngs);
  };

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const latLng = { lat, lng };
      setMapMove(latLng);
    }
  };

  const handleSearch = () => {
    if (mapMove) {
      setClickedLatLng(mapMove);
      if (map) {
        map.panTo(mapMove);
      }
    }
  };

  const [formData, setFormData] = useState({
    map_view: "",
    street_view: "",
  });

  useEffect(() => {
    if (Location) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        location: Location,
      }));
    }
  }, [Location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.map_view || !formData.street_view || !formData.location) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/media/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Toast({ message: "Successfully Updated", type: "success" });
      setIsLoading(false);
    } catch (error) {
      alert("Error updating");
    }
  };

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/mapdata/${id}`);
        setDataList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (dataList) {
      setLocation(dataList.location);
      setFormData({
        map_view: dataList.map_view,
        street_view: dataList.street_view,
        location: dataList.location,
      });
    }
  }, [dataList]);

  return isLoaded ? (
    <section>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-lg-12 ps-0 pe-0">
            {staffid.logintype === "admin" ||
            status === "pending" ||
            status === "complete" ? (
              <>
                <div class="col-md-12">
                  <div class="form-group mt-3">
                    <div class="row mb-3">
                      <div class="col-2">
                        <label class="form-label">Map View</label>
                      </div>
                      <div class="col-10">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: formData.map_view,
                          }}
                        />
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-2">
                        <label class="form-label">Street View</label>
                      </div>
                      <div className="col-10">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: formData.street_view,
                          }}
                        />
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-2">
                        <label class="form-label">Location(lat,lng)</label>
                      </div>
                      <div class="col-5">
                        <input
                          type="text"
                          disabled
                          class="form-control"
                          value={Location}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div class="col-md-12">
                  <div class="form-group mt-3">
                    <div class="row mb-3">
                      <div class="col-2">
                        <label class="form-label">Map View</label>
                      </div>
                      <div class="col-5">
                        <textarea
                          type="text"
                          class="form-control"
                          name="map_view"
                          onChange={handleChange}
                          value={formData.map_view}
                        ></textarea>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-2">
                        <label class="form-label">Street View</label>
                      </div>
                      <div class="col-5">
                        <textarea
                          type="text"
                          class="form-control"
                          name="street_view"
                          onChange={handleChange}
                          value={formData.street_view}
                        ></textarea>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-2">
                        <label class="form-label">Location(lat,lng)</label>
                      </div>
                      <div class="col-5">
                        <input
                          type="text"
                          class="form-control"
                          value={Location}
                        ></input>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-7">
                        <div className="text-end py-3 ">
                          <button
                            className="btn1 me-2"
                            onClick={handleSubmit}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <Spinner animation="border" size="sm" />
                                <span className="ms-2">Please wait...</span>
                              </>
                            ) : (
                              "Submit"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="filter_map mt-4">
                  <div className="" style={{ width: "60%", margin: "auto" }}>
                    <div className="filter_map card">
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
                                name="location"
                                autoComplete="off"
                                placeholder="Location"
                              />
                            </Autocomplete>
                          </div>

                          <div className="col-auto mb-1 mt-1">
                            <button
                              type="submit"
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

                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={10}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  onClick={handleMapClick}
                >
                  {clickedLatLng && <Marker position={clickedLatLng} />}
                </GoogleMap>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  ) : null;
};

export default LocationSelect;
