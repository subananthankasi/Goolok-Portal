import axios from "axios";
import API_BASE_URL from "../../../Api/api";

export const fetchBranchID = () =>{
    return async (dispatch) =>{
        try{
            const response = await axios.get(`${API_BASE_URL}/branch/${3}`);
         }
        catch(error){
            console.error("Error fetching branch" , error)
        }
    }
}