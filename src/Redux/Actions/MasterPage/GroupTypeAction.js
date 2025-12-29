import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const FETCH_GROUP_TYPE = "FETCH_GROUP_TYPE";
export const DEL_GROUP_TYPE = "DEL_GROUP_TYPE";
export const GROUP_ERROR = "GROUP_ERROR";

const fetchGroupTypeSuccess = (propertyTypeData) => ({
  type: FETCH_GROUP_TYPE,
  payload: propertyTypeData,
});

const deleteGroupTypeSuccess = (id) => ({
  type: DEL_GROUP_TYPE,
  payload: id,
});
const errorAction = (error) => ({
  type: GROUP_ERROR,
  payload:
    error?.response?.data?.message?.subproperty ||
    error?.response?.data?.message ||
    "Something went wrong",
});

// Api
export const fetchGroupType = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GROUP_TYPE_LOADING" });
      const response = await axios.get(`${API_BASE_URL}/group`);
      dispatch(fetchGroupTypeSuccess(response.data));
    } catch (error) {
      console.error("Error fetching Group types:", error);
    }
  };
};

export const addGroupType = (insertData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GROUP_TYPE_ADD_LOADING" });
      await axios.post(`${API_BASE_URL}/group`, insertData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(fetchGroupType());
      return {
        success: true,
      };
    } catch (error) {
      console.error("Error adding Group types:", error);
      dispatch(errorAction(error));
      console.error("Error :", error);
      const errMessage =
        error?.response?.data?.messages || "Something went wrong";
      return {
        success: false,
        error: errMessage,
      };
    }
  };
};

export const deleteGroupType = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GROUP_TYPE_DELETE_LOADING" });
      await axios.delete(`${API_BASE_URL}/group/${id}`);
      dispatch(deleteGroupTypeSuccess(id));
    } catch (error) {
      console.error("Error deleting Group types:", error);
    }
  };
};

export const updateGroupType = (updateData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GROUP_TYPE_UPDATE_LOADING" });
      await axios.put(`${API_BASE_URL}/group/${updateData.id}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(fetchGroupType());
      return {
        success: true,
      };
    } catch (error) {
      console.error("Error updating Group types:", error);
      console.error("Error adding Group types:", error);
      dispatch(errorAction(error));
      console.error("Error :", error);
      const errMessage =
        error?.response?.data?.messages || "Something went wrong";
      return {
        success: false,
        error: errMessage,
      };
    }
  };
};
