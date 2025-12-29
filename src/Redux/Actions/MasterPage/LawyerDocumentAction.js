import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const FETCH_LAWYER_DOC = "FETCH_LAWYER_DOC";
export const DEL_LAWYER_DOC = "DEL_LAWYER_DOC";
export const LAWYER_DOC_LOADING = "LAWYER_DOC_LOADING";
export const LAWYER_DOC_ERROR = "LAWYER_DOC_ERROR";
export const fetchLawDocSuccess = (docData) => ({
  type: FETCH_LAWYER_DOC,
  payload: docData,
});

export const deletelawDocSuccess = (id) => ({
  type: DEL_LAWYER_DOC,
  payload: id,
});

const lawyerDocLoading = () => ({
  type: LAWYER_DOC_LOADING,
});
const lawyerDocError = () => ({
  type: LAWYER_DOC_ERROR,
});
// Api
export const fetchDoc = () => {
  return async (dispatch) => {
    dispatch({ type: "LAWYER_DOC_FETCH_LOADING" });
    try {
      const response = await axios.get(`${API_BASE_URL}/documentcat`);
      dispatch(fetchLawDocSuccess(response.data));
    } catch (error) {
      console.error("Error fetching lawyer document:", error);
      dispatch(lawyerDocError(error));
    }
  };
};

export const addlawDoc = (insertData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LAWYER_DOC_ADD_LOADING" });
      await axios.post(`${API_BASE_URL}/documentcat`, insertData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch(fetchDoc());
      return {
        success: true,
      };
    } catch (error) {
      console.error("Error adding property types:", error);
      dispatch(lawyerDocError(error));
      const errMessage =
        error?.response?.data?.messages || "Something went wrong";
      return {
        success: false,
        error: errMessage,
      };
    }
  };
};

export const deleteLawDoc = (id) => {
  return async (dispatch) => {
    dispatch({ type: "LAWYER_DOC_DELETE_LOADING" });
    try {
      await axios.delete(`${API_BASE_URL}/documentcat/${id}`);
      dispatch(deletelawDocSuccess(id));
    } catch (error) {
      console.error("Error deleting property types:", error);
      dispatch(lawyerDocError(error));
    }
  };
};

export const updateLawDoc = (updateData) => {
  return async (dispatch) => {
    dispatch({ type: "LAWYER_DOC_UPDATE_LOADING" });
    try {
      await axios.put(
        `${API_BASE_URL}/documentcat/${updateData.id}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(fetchDoc());
      return {
        success: true,
      };
    } catch (error) {
      console.error("Error updating property types:", error);
      dispatch(lawyerDocError(error));
      const errMessage =
        error?.response?.data?.messages || "Something went wrong";
      return {
        success: false,
        error: errMessage,
      };
    }
  };
};
