import { DELETE_AMENITIES_HEADING, FETCH_AMENITIES_HEADING } from "../../Actions/Amenities/AmenitieSubHeadingAction";

 

 
const initialState = {
    AmenitiesHeading: [], 
};

const AmenitiesHeadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_AMENITIES_HEADING:
            const withSno = action.payload.map((data, index) => ({
                ...data,
                sno: (index + 1).toString()
            }));
            return {
                ...state,
                AmenitiesHeading: withSno
            };

        case DELETE_AMENITIES_HEADING:
            const updatedData = state.AmenitiesHeading.filter(data => data.id !== action.payload);
            const updatedDataWithSno = updatedData.map((item, index) => ({
                ...item,
                sno: (index + 1).toString()
            }));
            return {
                ...state,
                AmenitiesHeading: updatedDataWithSno
            };

        

        default:
            return state;
    }
};

export default AmenitiesHeadingReducer;
