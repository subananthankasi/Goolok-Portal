import axios from "axios";
import API_BASE_URL, { API_BASE_URL_FROM_ADMIN, LOGIN_BASE_URL } from "../../Api/api";
 
export const FETCH_SUB_PROPERTY_TYPE = "FETCH_SUB_PROPERTY_TYPE"; 
  
 
  const fetchSubPropertyTypeSuccess = (propertyTypeData) => ({
    type: FETCH_SUB_PROPERTY_TYPE,
    payload: propertyTypeData,
});
 
 

 
 
// Api  
export const fetchSubPropertyType = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/subproperty`);
            // const response = await axios.get(`${LOGIN_BASE_URL}/subproperty`);

            dispatch(fetchSubPropertyTypeSuccess(response.data));
        } catch (error) {
            console.error('Error fetching sub property types:', error);
        }
    };
};
 