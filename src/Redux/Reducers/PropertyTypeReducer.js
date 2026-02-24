import { FETCH_PROPERTY_TYPE } from "../Action/PropertyTypeAction";

 
const initialState ={
    PropertyTypeData: []
}

const PropertyTypeReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_PROPERTY_TYPE:
            const dataWithSno = action.payload.map((item, index) => ({
                ...item,
                sno: (index + 1).toString()
            }));
            return {
                ...state,
                PropertyTypeData: dataWithSno
            }; 
            

           
        default:
            return state;
    }
}

export default PropertyTypeReducer;