import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import Toast from "../../../Utils/Toast";

export const FETCH_CUSTOMER = "FETCH_CUSTOMER"
export const ADD_CUSTOMER = "ADD_CUSTOMER"
export const CUSTOMER_ID = "CUSTOMER_ID"


const fetchCustomerSuccess = (data) => ({
  type: FETCH_CUSTOMER,
  payload: data,
});

const successCustomerID = (id) =>({
    type :CUSTOMER_ID,
    payload : id
  })


export const fetchCustomer = () =>{
    return async (dispatch) =>{
        try{
            const response = await axios.get(`${API_BASE_URL}/customer`)
            dispatch(fetchCustomerSuccess(response.data)) 
        }catch(error){
             console.error("error fetching customer data:",error)
        }
    }
}

export const fetchCustomerID = () =>{
    return async (dispatch) =>{
        try{
            const response = await axios.get(`${API_BASE_URL}/customer/${3}`);
            dispatch(successCustomerID(response.data)) 
        }
        catch(error){
            console.error("Error fetching branch" , error)
        }
    }
  }
  

export const addCustomerData = (insertData) =>{
    return async (dispatch) =>{
        try{
            await axios.post(`${API_BASE_URL}/customer`, insertData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
              });
              dispatch(fetchCustomer())
              Toast({ message: "Added successfully", type: "success" });
            //   setTimeout(() => {
            //     window.location.reload();
            // }, 1000);
        }
        catch(error){
            alert("Error Adding customer" , error)
        }
    }
  
}

export const deleteCustomer = (id) =>{
    return async (dispatch) =>{
        try{
            await axios.delete(`${API_BASE_URL}/customer/${id}`); 
            dispatch(fetchCustomer())
        }catch(error){
            console.error('Error deleting customer:', error);
        }
    }
}

export const updateCustomerData = (updateData) => { 
    return async (dispatch) => {
        try{
               await axios.put(`${API_BASE_URL}/customer/${updateData.id}`,updateData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                  }
               });
                dispatch(fetchCustomer())

               Toast({ message: "Updated successfully", type: "success" });
            //    setTimeout(() => {
            //     window.location.reload();
            //    }, 2000);
        }catch(error){
             alert('Error Updating customer:',error)
        }
    }
}

 