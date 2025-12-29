import { DEL_UNIT, FETCH_UNIT, UNIT_ERROR } from "../../Actions/MasterPage/UnitAction";


const initialState = {
    Unit: [],
    isLoading: false,
    addLoading: false,
    updateLoading: false,
    deleteLoading: false,
}

const UnitReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UNIT_FETCH_LOADING":
            return {
                ...state,
                isLoading: true,
            };
        case "UNIT_ADD_LOADING":
            return {
                ...state,
                addLoading: true,
            };
        case "UNIT_UPDATE_LOADING":
            return {
                ...state,
                updateLoading: true,
            };
        case "UNIT_DELETE_LOADING":
            return {
                ...state,
                deleteLoading: true,
            };
        case UNIT_ERROR:
            return {
                ...state,
                isLoading: false,
                addLoading: false,
                deleteLoading: false,
                updateLoading: false,
                error: action.payload,
            };

        case FETCH_UNIT:
            const dataWithSno = action.payload.map((data, index) => ({
                ...data,
                sno: (index + 1).toString()
            }));
            return {
                Unit: dataWithSno,
                isLoading: false,
                addLoading: false,
                updateLoading: false,
                deleteLoading: false,
            };

        case DEL_UNIT:
            const updatedData = state.Unit.filter(data => data.id !== action.payload);
            const updatedDataWithSno = updatedData.map((item, index) => ({
                ...item,
                sno: (index + 1).toString()
            }))
            return {
                ...state,
                Unit: updatedDataWithSno,
                deleteLoading: false,
            }

        default:
            return state;
    }
}

export default UnitReducer;