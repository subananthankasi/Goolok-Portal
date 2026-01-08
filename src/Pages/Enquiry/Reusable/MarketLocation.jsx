import React, { useCallback, useRef, useState } from "react";
import {
    GoogleMap,
    useJsApiLoader,
    Autocomplete,
    Marker,
} from "@react-google-maps/api";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { Dialog } from "primereact/dialog";

//.....................
const containerStyle = {
    width: "100%",
    height: "50vh",
};

const initialCenter = {
    lat: 13.078187,
    lng: 79.972347,
};

const loaderOptions = {
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places", "geometry"],
};

const MarketLocation = ({ mapVisible, setMapVisible, setLoc }) => {
    const { isLoaded } = useJsApiLoader(loaderOptions);
    const [map, setMap] = useState(null);
    const [clickedLatLng, setClickedLatLng] = useState({});
    const [center, setCenter] = useState(initialCenter);

    const autocompleteRef = useRef(null);
    const staffid = JSON.parse(sessionStorage.getItem("token"));

    const [mapMove, setMapMove] = useState(null);
    const [Location, setLocation] = useState();

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
        setCenter(latLng);
    };

    const handlePlaceChanged = () => {
        const place = autocompleteRef.current.getPlace();
        if (place.geometry) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            const latLng = { lat, lng };
            setMapMove(latLng);
            setClickedLatLng(latLng);
            setCenter(latLng);
            setLocation(`${lat}, ${lng}`);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault()
        const inputValue = document
            .querySelector("input[name='location']")
            .value.trim();

        //latlng
        const latLngRegex = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/;
        if (latLngRegex.test(inputValue)) {
            const [lat, lng] = inputValue.split(",").map(Number);
            if (!isNaN(lat) && !isNaN(lng)) {
                const latLng = { lat, lng };
                setMapMove(latLng);
                setClickedLatLng(latLng);
                setLocation(`${lat}, ${lng}`);

                if (map) {
                    map.panTo(latLng);
                }
                return;
            }
        }

        //placename
        if (mapMove) {
            setClickedLatLng(mapMove);
            setLocation(`${mapMove.lat}, ${mapMove.lng}`);
            if (map) {
                map.panTo(mapMove);
            }
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!Location) {
            alert("Please fill all fields");
            return;
        }
        setLoc(Location);
        setMapVisible(false)
    };

    return isLoaded ? (
        <>
            <Dialog
                visible={mapVisible}
                style={{ width: "55rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Select Location"
                modal
                className="p-fluid"
                onHide={() => {
                    setMapVisible(false);
                }}
            >
                <form autoComplete="off">
                    <div>
                        <div className="form-group mt-3">
                            <div className="row mb-3 align-items-center">
                                <div className="col-2">
                                    <label className="form-label">Location (lat & lng)</label>
                                </div>
                                <div className="col-5">
                                    <input
                                        type="text"
                                        className="form-control"
                                        disabled
                                        value={Location}
                                    />
                                </div>
                                <div className="col-1">
                                    <div className="text-end py-3">
                                        <button
                                            className="btn1 me-2"
                                            onClick={handleSubmit}
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="" style={{ width: "60%", margin: "auto" }}>
                                <div
                                    className="card mt-2"
                                    style={{ position: "absolute", zIndex: "1", width: "50%" }}
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
                    </div>
                </form>
            </Dialog>
        </>
    ) : null;
};

export default MarketLocation;
