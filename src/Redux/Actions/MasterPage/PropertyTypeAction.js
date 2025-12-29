import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const FETCH_PROPERTY_TYPE = "FETCH_PROPERTY_TYPE"; 
export const DEL_PROPERTY_TYPE = "DEL_PROPERTY_TYPE";
 
 
  const fetchPropertyTypeSuccess = (propertyTypeData) => ({
    type: FETCH_PROPERTY_TYPE,
    payload: propertyTypeData,
});
 
  const deletePropertySuccess = (id)=>({
    type:DEL_PROPERTY_TYPE,
    payload:id,
})

 
 
// Api  
export const fetchPropertyType = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/property`);
            dispatch(fetchPropertyTypeSuccess(response.data));
        } catch (error) {
            console.error('Error fetching property types:', error);
        }
    };
};

export const addPropertyType =(insertData)=>{
    return async (dispatch)=>{
        try{
             await axios.post(`${API_BASE_URL}/property`,insertData,{
            headers: {
                'Content-Type': 'application/json'
              }
           });
          dispatch(fetchPropertyType())
        }catch(error){
            console.error('Error adding property types:', error);
        }
    }
}



export const deletePropertyType = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`${API_BASE_URL}/property/${id}`); 
            dispatch(deletePropertySuccess(id));
        } catch (error) {
            console.error('Error deleting property types:', error);
        }
    };
}


export const updatePropertyType =(updateData)=>{
    return async(dispatch)=>{
        try {
               await axios.put(`${API_BASE_URL}/property/${updateData.id}`, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }); 
            dispatch(fetchPropertyType());
        } catch(error){ 
            console.error('Error updating property types:', error);
        }
    }
}