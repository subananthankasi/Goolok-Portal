import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const FETCH_PROPERTY_DOC = "FETCH_PROPERTY_DOC";
export const DEL_PROPERTY_DOC = "DEL_PROPERTY_DOC";
export const PROPERTY_ERROR = "PROPERTY_ERROR";
const fetchPropertyDocumentSuccess = (PropertyDocumentData) => {
  return {
    type: FETCH_PROPERTY_DOC,
    payload: PropertyDocumentData,
  };
};

const deletePropertyDocumentSuccess = (id) => {
  return {
    type: DEL_PROPERTY_DOC,
    payload: id,
  };
};
const errorAction = (error) => ({
  type: PROPERTY_ERROR,
  payload:
    error?.response?.data?.message?.subproperty ||
    error?.response?.data?.message ||
    "Something went wrong",
});

export const fetchPropertyDocument = () => {
  return async (dispatch) => {
    dispatch({ type: "PROPERTY_DOC_FETCH_LOADING" });

    try {
      const response = await axios.get(`${API_BASE_URL}/propertydoc`);
      dispatch(fetchPropertyDocumentSuccess(response.data));
    } catch (error) {
      console.error("Error Fetching Property Document:", error);
    }
  };
};

export const addPropertyDocument = (insertData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "PROPERTY_DOC_ADD_LOADING" });
      await axios.post(`${API_BASE_URL}/propertydoc`, insertData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await dispatch(fetchPropertyDocument());
      return {
        success: true,
      };
    } catch (error) {
      console.error("Error Adding Property Document:", error);
      dispatch(errorAction(error));
      const errMessage =
        error?.response?.data?.messages || "Something went wrong";
      return {
        success: false,
        error: errMessage,
      };
    }
  };
};

export const deletePropertyDocument = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "PROPERTY_DOC_DELETE_LOADING" });
      await axios.delete(`${API_BASE_URL}/propertydoc/${id}`);
      await dispatch(deletePropertyDocumentSuccess(id));
    } catch (error) {
      console.error("Error deleting property Documents:", error);
    }
  };
};

export const updatePropertyDocument = (updateData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "PROPERTY_DOC_UPDATE_LOADING" });

      await axios.put(
        `${API_BASE_URL}/propertydoc/${updateData.id}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await dispatch(fetchPropertyDocument());
      return {
        success: true,
      };
    } catch (error) {
      console.error("Error Adding Property Document:", error);
      dispatch(errorAction(error));
      const errMessage =
        error?.response?.data?.messages || "Something went wrong";
      return {
        success: false,
        error: errMessage,
      };
    }
  };
};
