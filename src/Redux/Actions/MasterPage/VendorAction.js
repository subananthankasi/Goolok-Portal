import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const FETCH_VENDOR = "FETCH_VENDOR";
export const VENDOR_ID = "VENDOR_ID";
export const DELETE_VENDOR = "DELETE_VENDOR"
export const VENDOR_ERROR = "VENDOR_ERROR"

const fetchSuccess = (data) => ({
  type: FETCH_VENDOR,
  payload: data
})

const successVendorID = (id) => ({
  type: VENDOR_ID,
  payload: id
})

const deleteSuccess = (id) => ({
  type: DELETE_VENDOR,
  payload: id
})
const errorAction = (error) => ({
  type: VENDOR_ERROR,
  payload:
    error?.response?.data?.message?.subproperty ||
    error?.response?.data?.message ||
    "Something went wrong",
});

export const fetchVendor = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vendor`);
      dispatch(fetchSuccess(response.data));
    } catch (error) {
      console.error("Error fetching vendor : ", error)
    }

  }
}


export const fetchVendorID = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vendor/${3}`);
      dispatch(successVendorID(response.data))
    }
    catch (error) {
      console.error("Error fetching branch", error)
    }
  }
}

export const addVendor = (vendorData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "VENDOR_ADD_LOADING" });
      await axios.post(`${API_BASE_URL}/vendor`, vendorData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(fetchVendor());
      return {
        success: true,
      };
      // window.location.reload()
    } catch (error) {
      dispatch(errorAction(error));
      console.error("Error adding property types:", error);
      const errMessage =
        error?.response?.data?.messages || "Something went wrong";
      return {
        success: false,
        error: errMessage,
      };
    }
  };
};


export const deleteVendor = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "VENDOR_DELETE_LOADING" });
      await axios.delete(`${API_BASE_URL}/vendor/${id}`);
      dispatch(deleteSuccess(id));
    }
    catch (error) {
      console.error("Error deleting vendor", error)
    }
  }
}


export const updateVendor = (id, updateData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "VENDOR_UPDATE_LOADING" });
      await axios.put(`${API_BASE_URL}/vendor/${id}`, updateData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      dispatch(fetchVendor())
      return {
        success: true,
      };
    } catch (error) {
      dispatch(errorAction(error));
      console.error("Error adding property types:", error);
      const errMessage =
        error?.response?.data?.messages || "Something went wrong";
      return {
        success: false,
        error: errMessage,
      };
    }
  }
}
