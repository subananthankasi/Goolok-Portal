import { FETCH_SUB_PROPERTY_TYPE } from "../Action/SubPropertyAction";

 
 

const initialState ={
    SubPropertyTypeData: []
}

const SubPropertyReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_SUB_PROPERTY_TYPE:
            const dataWithSno = action.payload.map((item, index) => ({
                ...item,
                sno: (index + 1).toString()
            }));
            return {
                ...state,
                SubPropertyTypeData: dataWithSno
            }; 
           
           
        default:
            return state;
    }
}

export default SubPropertyReducer;