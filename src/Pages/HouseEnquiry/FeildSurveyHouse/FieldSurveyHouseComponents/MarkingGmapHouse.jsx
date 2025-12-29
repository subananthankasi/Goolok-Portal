import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    GoogleMap,
    useJsApiLoader,
    Autocomplete,
    Marker,
    Polyline,
    Polygon,
    InfoWindow,
} from "@react-google-maps/api";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import Spinner from "react-bootstrap/Spinner";
import { useFormik } from "formik";
import * as yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import { Dialog } from "primereact/dialog";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";
import { useSelector } from "react-redux";

const containerStyle = {
    width: "100%",
    height: "50vh",
};

const centers = {
    lat: 13.078187,
    lng: 79.972347,
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

const MarkingGmapHouse = ({ eid, id, status, pagetype }) => {
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
        }
    };

    const handleSearch = () => {
        if (mapMove) {
            setClickedLatLng(mapMove);
            setLocation(`${mapMove.lat}, ${mapMove.lng}`);
            if (map) {
                map.panTo(mapMove);
            }
        }
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!Location) {
            alert("Please fill all fields");
            return;
        }
        setIsLoading(true);

        const data = {
            id: survey_id,
            location: Location,
            // survey_id: survey_id
        };

        try {
            await axios.post(`${API_BASE_URL}/location`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            Toast({ message: "Successfully Updated", type: "success" });
            setIsLoading(false);
            setLocation("");
            setClickedLatLng("");
            setNewDialog(false);
            setEditDialog(false);
            fetchSurveyNo();
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        if (!Location) {
            alert("Please fill all fields");
            return;
        }
        setIsLoading(true);

        const data = {
            id: survey_id,
            location: Location,
        };

        try {
            await axios.post(`${API_BASE_URL}/location`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            Toast({ message: "Successfully Updated", type: "success" });
            setIsLoading(false);
            setLocation("");
            setClickedLatLng("");
            setEditDialog(false);
            fetchSurveyNo();
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [data, setData] = useState([]);

    // error alert
    const [modalOpen, setModalOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModals = () => setModalOpen(false);

    // confirm verification
    const [verifyConfirm, setIsVerifyConfirm] = useState(false);

    const navigate = useNavigate();
    const handleConfirm = async () => {
        try {
            await axios.get(`${API_BASE_URL}/location/${eid}/${id}`);
            Toast({ message: "Successfully Updated", type: "success" });
            navigate("/location_verification#Complete");
        } catch (error) {
            const errorMessage =
                error.response?.data?.messages?.error ||
                error.message ||
                "Failed to update";
            setErrorMsg(errorMessage);
            handleOpenModal();
        }
    };

    const [surveyData, setSurveyData] = useState([]);

    const fetchSurveyNo = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/lawyer/${eid}`);
            const data = response.data.map((data, index) => ({
                ...data,
                sno: index + 1,
            }));
            setSurveyData(data);
        } catch (error) { }
    };

    useEffect(() => {
        fetchSurveyNo();
    }, []);

    const [newDialog, setNewDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [editing, setEditing] = useState(false);

    const onSubmit = async () => { };

    const formik = useFormik({
        initialValues: {
            file: "",
            notes: "",
            enqid: eid,
        },
        validationSchema: yup.object().shape({
            // file: yup.string().required("file is required!!"),
            notes: yup.string().required("notes is required!!"),
        }),
        onSubmit,
    });
    const [survey_id, setSurvey_Id] = useState(null);

    const openDialog = (id) => {
        setSurvey_Id(id);
        setNewDialog(true);
    };
    const editModal = (edit) => {
        setEditDialog(true);
        setSurvey_Id(edit.id);

        if (edit.location) {
            const [lat, lng] = edit.location.split(",").map(parseFloat);
            setLocation(edit.location);
            setClickedLatLng({ lat, lng });
        } else {
            setLocation("");
            setClickedLatLng(null);
        }
    };

    const [handleMarker, setHandleMarker] = useState(null);
    const handleMarkerClick = (index) => {
        setHandleMarker(index);
    };
    const enquiryDoumentData = useSelector(
        (state) => state.Enquiry.enquiryDocument
    );
    return isLoaded ? (
        <>
            <ConfirmationModal
                isOpen={verifyConfirm}
                closeModal={() => setIsVerifyConfirm(false)}
                onConfirm={handleConfirm}
                message={"Are you sure this has been verified?"}
            />

            <AlertPop
                isOpen={modalOpen}
                onClose={handleCloseModals}
                message={errorMsg}
            />
            <div className="card shadow border-0 mt-3">
                <div className="card-body shadow border-0 p-4">
                    <div className="">
                        <h6>Property Mapping</h6>
                        <hr />
                        <table className="table table-hover table-bordered ">
                            <thead>
                                <tr>
                                    <th
                                        className="text-center"
                                        style={{
                                            backgroundColor: "rgb(47, 79, 79)",
                                            color: "#ffff",
                                            fontWeight: "400",
                                        }}
                                    >
                                        {" "}
                                        S.no
                                    </th>
                                    <th
                                        className="text-center"
                                        style={{
                                            backgroundColor: "rgb(47, 79, 79)",
                                            color: "#ffff",
                                            fontWeight: "400",
                                        }}
                                    >
                                        Survey No{" "}
                                    </th>
                                    <th
                                        className="text-center"
                                        style={{
                                            backgroundColor: "rgb(47, 79, 79)",
                                            color: "#ffff",
                                            fontWeight: "400",
                                        }}
                                    >
                                        {" "}
                                        Lat & Lng{" "}
                                    </th>
                                    {staffid.Login === "staff" &&
                                        (status === "pending" || status === "complete") &&
                                        pagetype !== "reminder" &&
                                        enquiryDoumentData?.status !== "booking" ? (
                                        <th
                                            className="text-center"
                                            style={{
                                                backgroundColor: "rgb(47, 79, 79)",
                                                color: "#ffff",
                                                fontWeight: "400",
                                            }}
                                        >
                                            {" "}
                                            Actions{" "}
                                        </th>
                                    ) : null}
                                </tr>
                            </thead>
                            <tbody>
                                {surveyData?.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className="text-center">{index + 1} </td>
                                        <td className="text-center">{item.survey_no} </td>
                                        <td className="text-center"> {item.location} </td>
                                        {staffid.Login === "staff" &&
                                            (status === "pending" || status === "complete") &&
                                            pagetype !== "reminder" &&
                                            enquiryDoumentData?.status !== "booking" ? (
                                            <td className="text-center">
                                                {item.location ? (
                                                    <button
                                                        className="btn1 me-2"
                                                        onClick={() => editModal(item)}
                                                    >
                                                        Edit
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn1 me-2"
                                                        onClick={() => openDialog(item.id)}
                                                    >
                                                        Add
                                                    </button>
                                                )}
                                            </td>
                                        ) : null}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-3">
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={10}
                            >
                                {/* Markers */}
                                {surveyData?.map((item, index) => {
                                    if (!item.location) return null;
                                    const [lat, lng] = item.location.split(",").map(parseFloat);
                                    return (
                                        <>
                                            <Marker
                                                key={index}
                                                position={{ lat, lng }}
                                                onClick={() => handleMarkerClick(index)}
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
                                                    <div
                                                        style={{
                                                            textAlign: "center",
                                                            height: "50px",
                                                            overflow: "hidden",
                                                        }}
                                                        className="p-0"
                                                    >
                                                        <h6 style={{ fontWeight: "400", fontSize: "15px" }}>
                                                            {" "}
                                                            Survey No : {item.survey_no}
                                                        </h6>
                                                        <p>
                                                            <LocationOnIcon
                                                                sx={{ color: "red", fontSize: 17 }}
                                                            />{" "}
                                                            {item.location}{" "}
                                                        </p>
                                                    </div>
                                                </InfoWindow>
                                            )}
                                        </>
                                    );
                                })}

                                {/* Polygon */}
                                <Polygon
                                    path={surveyData
                                        .filter((item) => item.location)
                                        .map((item) => {
                                            const [lat, lng] = item.location
                                                .split(",")
                                                .map(parseFloat);
                                            return { lat, lng };
                                        })}
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
                </div>
            </div>

            <Dialog
                visible={newDialog}
                style={{ width: "62rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Add Location"
                modal
                className="p-fluid"
                onHide={() => {
                    setNewDialog(false);
                    formik.resetForm();
                }}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
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
                                {(status === "pending" || status === "complete") &&
                                    pagetype !== "reminder" &&
                                    staffid.logintype === "staff" ? (
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
                                                        <span className="ms-2">wait...</span>
                                                    </>
                                                ) : (
                                                    "Add"
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ) : null}
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
                            // center={centers}
                            center={status === "complete" ? center : centers}
                            zoom={10}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                            onClick={handleMapClick}
                        >
                            {clickedLatLng && <Marker position={clickedLatLng} />}
                            {/* {Location && typeof Location === 'string' && (
                <Marker
                  position={{
                    lat: parseFloat(Location.split(',')[0]),
                    lng: parseFloat(Location.split(',')[1]),
                  }}
                />
              )} */}
                        </GoogleMap>
                    </div>
                </form>
            </Dialog>
            <Dialog
                visible={editDialog}
                style={{ width: "62rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Edit Location"
                modal
                className="p-fluid"
                onHide={() => {
                    setEditDialog(false);
                    formik.resetForm();
                }}
            >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
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
                                {(status === "pending" || status === "complete") &&
                                    pagetype !== "reminder" &&
                                    staffid.logintype === "staff" ? (
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
                                                        <span className="ms-2">wait...</span>
                                                    </>
                                                ) : (
                                                    "Update"
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ) : null}
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
                            // center={centers}
                            center={status === "complete" ? center : centers}
                            zoom={10}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                            onClick={handleMapClick}
                        >
                            {clickedLatLng && <Marker position={clickedLatLng} />}
                            {/* {Location && typeof Location === 'string' && (
                <Marker
                  position={{
                    lat: parseFloat(Location.split(',')[0]),
                    lng: parseFloat(Location.split(',')[1]),
                  }}
                />
              )} */}
                        </GoogleMap>
                    </div>
                </form>
            </Dialog>
        </>
    ) : null;
};

export default MarkingGmapHouse;
