import {DEL_PROPERTY_TYPE, FETCH_PROPERTY_TYPE } from "../../Actions/MasterPage/PropertyTypeAction";

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
            case DEL_PROPERTY_TYPE:
                const updatedData = state.PropertyTypeData.filter(propertyType => propertyType.id !== action.payload); 
                const updatedDataWithSno = updatedData.map((item, index) => ({
                     ...item,
                     sno: (index + 1).toString()
                 }));
                return {
                    ...state,
                    PropertyTypeData: updatedDataWithSno
                };

           
        default:
            return state;
    }
}

export default PropertyTypeReducer;