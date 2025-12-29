import axios from "axios"
import API_BASE_URL from "../../../../Api/api"

export const FETCH_LAND_NEW_PROPERTY = "FETCH_LAND_NEW_PROPERTY" 

const successFetchLandNewProperty = (data) =>{
    return{
        type:FETCH_LAND_NEW_PROPERTY,
        payload:data
    }
}
 

export const fetchLandNewProperty = () =>{
    return async (dispatch) => {
        try{
            const response = await axios.get(`${API_BASE_URL}/project`, {
              headers: { 
                'Gl-Status':'pending',    
              },
          }) 
            dispatch(successFetchLandNewProperty(response.data))
        }catch(error){
            console.error("Error fetching data" , error)
         }
    }
}

export const addLandNewProperty = (data) => {
    return async (dispatch) => {
      try { 
        const response = await axios.post(`${API_BASE_URL}/project`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }); 
        if (response.status === 201) { 
          dispatch(fetchLandNewProperty()); 
        } else { 
          alert(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {  
        alert(`Error adding data: ${error.message}`);
      }
    };
  };

  
export const  editLandNewProperty = (data) => {
    return async (dispatch) => {
      try { 
        const response = await axios.post(`${API_BASE_URL}/updater`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }); 
        if (response.status === 200) { 
          dispatch(fetchLandNewProperty()); 
        } else { 
          alert(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {  
        alert(`Error update data: ${error.message}`);
      }
    };
  };


  export const deleteLandNewProperty = (id) => {
    return async (dispatch) => {
        try{
           const response =  await axios.delete(`${API_BASE_URL}/project/${id}`);
            if (response.status === 200) { 
              window.location.reload()
            } else { 
              alert(`Unexpected response status: ${response.status}`);
            }  
        }catch(error){
            alert('Error deleting project:', error);
        }
    }
}





export const updateSurveyStatus= (data) => { 
  return async (dispatch) => {
    try { 
      const response = await axios.post(`${API_BASE_URL}/surveystatus`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }); 
      if (response.status === 200) {   
           window.location.reload()  
      } else { 
        alert(`Unexpected response status: ${response.status}`);
      }
    } catch (error){  
      alert(`Error adding data: ${error.message}`);
    }
  };
};
