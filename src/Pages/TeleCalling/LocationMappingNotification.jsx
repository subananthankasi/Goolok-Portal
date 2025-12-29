import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import Spinner from "react-bootstrap/Spinner";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

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

function LocationMappingNotification() {
  const navigate = useNavigate();
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

    // if (!formData.map_view || !formData.street_view || !formData.location) {
    //   alert("Please fill all fields");
    //   return;
    // }

    // setIsLoading(true);
    // try {
    //   await axios.put(`${API_BASE_URL}/media/${id}`, formData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   Toast({ message: "Successfully Updated", type: "success" });
    //   setIsLoading(false);
    // } catch (error) {
    //   alert("Error updating");
    // }
  };

  return isLoaded ? (
    <div className="section">
      <div className="container-fluid">
        <div className="col-12">
          <div className="d-flex justify-content-end">
            <div
              className="p-2 d-flex align-items-center mb-2 text-white"
              style={{
                cursor: "pointer",
                background: "#2f4f4f",
                clipPath: `polygon(20% 0, 100% 0, 100% 100%, 20% 100%, 0 50%)`,
                justifyContent: "center",
                width: "100px",
                fontSize: "13px",
              }}
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon /> back
            </div>
          </div>
        </div>

        <div className="col-12 mt-2">
          <div className="card shadow border-0">
            <div className="card shadow border-0 p-4">
              <h6>Google map location mapping notification</h6>
              <hr />

              <div className="form-group mt-3">
                <div className="row mb-3 align-items-center">
                  <div className="col-2">
                    <label className="form-label">Location (lat, lng)</label>
                  </div>
                  <div className="col-5">
                    <input
                      type="text"
                      className="form-control"
                      value={Location}
                      disabled
                    />
                  </div>

                  <div className="col-1">
                    <div className="text-end py-3">
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
                          "Add"
                        )}
                      </button>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default LocationMappingNotification;
