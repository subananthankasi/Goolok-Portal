import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const FETCH_LAWYER_DOC_INPUT = "FETCH_LAWYER_DOC_INPUT";
export const DEL_LAWYER_DOC_INPUT = "DEL_LAWYER_DOC_INPUT";
export const LAWYER_DOC_INPUT_ERROR = "LAWYER_DOC_INPUT_ERROR";

export const fetchLawDocInputSuccess = (docData) => ({
  type: FETCH_LAWYER_DOC_INPUT,
  payload: docData,
});

export const deletelawDocInputSuccess = (id) => ({
  type: DEL_LAWYER_DOC_INPUT,
  payload: id,
});

const errorAction = (error) => ({
  type: LAWYER_DOC_INPUT_ERROR,
  payload:
    error?.response?.data?.message?.subproperty ||
    error?.response?.data?.message ||
    "Something went wrong",
});

// Api
export const fetchDocInput = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LAWYER_DOC_INPUT_FETCH_LOADING" });
      const response = await axios.get(`${API_BASE_URL}/documentsub`);
      dispatch(fetchLawDocInputSuccess(response.data));
    } catch (error) {
      dispatch(errorAction(error));
      console.error("Error fetching lawyer document:", error);
    }
  };
};

export const addlawDocInput = (insertData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LAWYER_DOC_INPUT_ADD_LOADING" });
      await axios.post(`${API_BASE_URL}/documentsub`, insertData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch(fetchDocInput());
      return {
        success: true,
      };
    } catch (error) {
      dispatch(errorAction(error));
      const errMessage =
        error?.response?.data?.messages || "Something went wrong";
      console.error("Error adding property types:", error);
      return {
        success: false,
        error: errMessage,
      };
    }
  };
};

export const deleteLawDocInput = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LAWYER_DOC_INPUT_DELETE_LOADING" });
      await axios.delete(`${API_BASE_URL}/documentsub/${id}`);
      dispatch(deletelawDocInputSuccess(id));
    } catch (error) {
      dispatch(errorAction(error));
      console.error("Error deleting property types:", error);
    }
  };
};

export const updateLawDocInput = (updateData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LAWYER_DOC_INPUT_UPDATE_LOADING" });
      await axios.put(
        `${API_BASE_URL}/documentsub/${updateData.id}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(fetchDocInput());
      return {
        success: true,
      };
    } catch (error) {
      dispatch(errorAction(error));
      const errMessage =
        error?.response?.data?.messages || "Something went wrong";
      console.error("Error updating property types:", error);
      return {
        success: false,
        error: errMessage,
      };
    }
  };
};
