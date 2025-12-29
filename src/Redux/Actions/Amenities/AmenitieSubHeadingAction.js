import axios from "axios"
import API_BASE_URL from "../../../Api/api"

export const FETCH_AMENITIES_HEADING = "FETCH_AMENITIES_HEADING"
export const DELETE_AMENITIES_HEADING = "DELETE_AMENITIES_HEADING"

const fetchSuccess = (data)=>{
    return{
        type:FETCH_AMENITIES_HEADING,
        payload:data
    }
}

const deleteSuccess = (id) => {
    return {
        type: DELETE_AMENITIES_HEADING,
        payload: id
    }
}

export const fetchAmenitiesHeading = () =>{
    return async (dispatch) => {
        try{
            const response = await axios.get(`${API_BASE_URL}/subamenities`)
             dispatch(fetchSuccess(response.data)) 
        }catch(error){
            console.error("Error fetching amenities sub heading" , error)
        }
    }
}

export const addAmenitiesHeading = (insertData) =>{
    return async (dispatch) => {
        try{
              await axios.post(`${API_BASE_URL}/subamenities`,insertData,{
                headers: {
                    'Content-Type': 'application/json'
                  }
               });
               dispatch(fetchAmenitiesHeading())
        }catch(error){
             console.error('Error Adding amenities sub heading:',error)
        }
    }
}

export const deleteAmenitiesHeading = (id) => {
    return async (dispatch) => {
        try{
            await axios.delete(`${API_BASE_URL}/subamenities/${id}`); 
            dispatch(deleteSuccess(id));
        }catch(error){
            console.error('Error deleting subamenities:', error);
        }
    }
}
