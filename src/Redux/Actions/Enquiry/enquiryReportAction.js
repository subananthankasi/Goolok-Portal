import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import Toast from "../../../Utils/Toast";

export const FETCH_ENQUIRY_WEBSITE = "FETCH_ENQUIRY_WEBSITE";
export const FETCH_ENQUIRY_DOCUMENT = "FETCH_ENQUIRY_DOCUMENT";
export const TELECOM_FETCH = "TELECOM_FETCH";

const succesfetchData = (data) => ({
  type: FETCH_ENQUIRY_WEBSITE,
  payload: data,
});

const succesfetchDocument = (data) => ({
  type: FETCH_ENQUIRY_DOCUMENT,
  payload: data,
});

const successTelecom = (data) => ({
  type: TELECOM_FETCH,
  payload: data,
});

export const fetchEnquiryFromWebsite = (id, status) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/enquiryreport?id=${id}&status=${status}`
      );
      dispatch(succesfetchData(response.data));
    } catch (error) {}
  };
};

export const fetchEnquiryDocument = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/enquiryreport/${payload.id}`,
        {
          headers: {
            "Gl-Status": "staff",
          },
        }
      );
      dispatch(succesfetchDocument(response.data));
    } catch (error) {}
  };
};

export const enquiryStatusUpdate = (
  updateData,
  setErrorMsg,
  handleOpenModal
) => {
  return async (dispatch) => {
    try {
      await axios.put(
        `${API_BASE_URL}/enquiryreport/${updateData.id}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Toast({ message: "Successfully Updated", type: "success" });
    } catch (error) {
      const errorMessage =
        error.response?.data?.messages?.error ||
        error.message ||
        "Failed to update";
      setErrorMsg(errorMessage);
      handleOpenModal();
    }
  };
};

export const telecomDataFetch = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/telecall`);
      dispatch(successTelecom(response.data));
    } catch (error) {}
  };
};
// export const telecomDataFetchByID = (id) =>{
//     return async(dispatch)=>{
//         try{
//             const response = await axios.get(`${API_BASE_URL}/telecall/${id}`)
//             dispatch(successTelecom(response.data))
//         }catch(error){

//         }
//     }
// }
