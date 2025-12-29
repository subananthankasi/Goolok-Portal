import { FETCH_LAND_NEW_PROPERTY } from "../../Actions/PropertyManagement/Land/LandNewPropertyActions"

const initialState = {
    LandData :[]
}


const LandReducer = (state = initialState,action)=>{
    switch(action.type){
        case FETCH_LAND_NEW_PROPERTY:
            const withSno = action.payload.map((data, index) => ({
                ...data,
                sno: (index + 1).toString()
            })); 
            return {
                ...state,
                LandData: withSno
            };

            default:
                return state;    
    }
}

export default LandReducer;
