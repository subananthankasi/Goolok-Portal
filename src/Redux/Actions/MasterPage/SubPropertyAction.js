import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import { message } from "antd";

export const FETCH_SUB_PROPERTY_TYPE = "FETCH_SUB_PROPERTY_TYPE";
export const DEL_SUB_PROPERTY_TYPE = "DEL_SUB_PROPERTY_TYPE";
export const SUB_PROPERTY_ERROR = "SUB_PROPERTY_ERROR";

const fetchSubPropertyTypeSuccess = (propertyTypeData) => ({
  type: FETCH_SUB_PROPERTY_TYPE,
  payload: propertyTypeData,
});

const deleteSubPropertySuccess = (id) => ({
  type: DEL_SUB_PROPERTY_TYPE,
  payload: id,
});
const errorAction = (error) => ({
  type: SUB_PROPERTY_ERROR,
  payload:
    error?.response?.data?.message?.subproperty ||
    error?.response?.data?.message ||
    "Something went wrong",
});

// Api
export const fetchSubPropertyType = () => {
  return async (dispatch) => {
    dispatch({ type: "SUB_PROPERTY_TYPE_LOADING" });
    try {
      const response = await axios.get(`${API_BASE_URL}/subproperty`);
      dispatch(fetchSubPropertyTypeSuccess(response.data));
    } catch (error) {
      dispatch(errorAction(error));
      console.error("Error fetching sub property types:", error);
    }
  };
};

export const addSubPropertyType = (insertData) => {
  return async (dispatch) => {
    dispatch({ type: "ADD_SUB_PROPERTY_TYPE_LOADING" });
    try {
      await axios.post(`${API_BASE_URL}/subproperty`, insertData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(fetchSubPropertyType());
      return { success: true };
    } catch (error) {
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

export const deleteSubPropertyType = (id) => {
  return async (dispatch) => {
    dispatch({ type: "DELETE_SUB_PROPERTY_TYPE_LOADING" });
    try {
      await axios.delete(`${API_BASE_URL}/subproperty/${id}`);
      dispatch(deleteSubPropertySuccess(id));
    } catch (error) {
      dispatch(errorAction(error));
      console.error("Error deleting sub property types:", error);
    }
  };
};

export const updateSubPropertyType = (updateData) => {
  return async (dispatch) => {
    dispatch({ type: "UPDATE_SUB_PROPERTY_TYPE_LOADING" });
    try {
      await axios.put(
        `${API_BASE_URL}/subproperty/${updateData.id}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(fetchSubPropertyType());
      return { success: true };
    } catch (error) {
      dispatch(errorAction(error));
      const errMessage =
        error?.response?.data?.messages || "Something went wrong";
      console.error("Error updating sub property types:", error);
      return {
        success: false,
        error: errMessage,
      };
    }
  };
};
