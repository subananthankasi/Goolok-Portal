import { AMENITIES_ERROR, DELETE_AMENITIES, FETCH_AMENITIES } from "../../Actions/Amenities/AmenitiesAction";

const initialState = {
    Amenities: [],
    isLoading: false,
    addLoading: false,
    updateLoading: false,
    deleteLoading: false,
};

const AmenitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "AMENITIES_LOADING":
            return {
                ...state,
                isLoading: true,
            };
        case "AMENITIES_ADD_LOADING":
            return {
                ...state,
                addLoading: true,
            };
        case "AMENITIES_UPDATE_LOADING":
            return {
                ...state,
                updateLoading: true,
            };
        case "AMENITIES_DELETE_LOADING":
            return {
                ...state,
                deleteLoading: true,
            };
        case AMENITIES_ERROR:
            return {
                ...state,
                isLoading: false,
                addLoading: false,
                deleteLoading: false,
                updateLoading: false,
                error: action.payload,
            };
        case FETCH_AMENITIES:
            const withSno = action.payload.map((data, index) => ({
                ...data,
                sno: (index + 1).toString()
            }));
            return {
                ...state,
                Amenities: withSno,
                isLoading: false,
                addLoading: false,
                updateLoading: false,
                deleteLoading: false,
            };

        case DELETE_AMENITIES:
            const updatedData = state.Amenities.filter(data => data.id !== action.payload);
            const updatedDataWithSno = updatedData.map((item, index) => ({
                ...item,
                sno: (index + 1).toString()
            }));
            return {
                ...state,
                Amenities: updatedDataWithSno,
                deleteLoading: false,
            };



        default:
            return state;
    }
};

export default AmenitiesReducer;
