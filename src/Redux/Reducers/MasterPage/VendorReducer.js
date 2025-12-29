import { DELETE_VENDOR, FETCH_VENDOR, VENDOR_ERROR, VENDOR_ID } from "../../Actions/MasterPage/VendorAction";

const initialState = {
    vendorData: [],
    vendorID: null,
    isLoading: false,
    addLoading: false,
    updateLoading: false,
    deleteLoading: false,
}

const VendorReducer = (state = initialState, action) => {
    switch (action.type) {
        case "VENDOR_FETCH_LOADING":
            return {
                ...state,
                isLoading: true,
            };
        case "VENDOR_ADD_LOADING":
            return {
                ...state,
                addLoading: true,
            };
        case "VENDOR_UPDATE_LOADING":
            return {
                ...state,
                updateLoading: true,
            };
        case "VENDOR_DELETE_LOADING":
            return {
                ...state,
                deleteLoading: true,
            };
        case VENDOR_ERROR:
            return {
                ...state,
                isLoading: false,
                addLoading: false,
                updateLoading: false,
                deleteLoading: false,
                error: action.payload,
            };
        case FETCH_VENDOR:
            const withSno = action.payload.map((data, index) => ({
                ...data,
                sno: (index + 1).toString()
            }))
            return {
                vendorData: withSno,
                isLoading: false,
                addLoading: false,
                updateLoading: false,
                deleteLoading: false,
            }

        case VENDOR_ID:
            return {
                ...state,
                vendorID: action.payload
            };

        case DELETE_VENDOR:
            const updatedData = state.vendorData.filter(data => data.id !== action.payload);
            const updatedDataWithSno = updatedData.map((item, index) => ({
                ...item,
                sno: (index + 1).toString(),
                isLoading: false,
                addLoading: false,
                updateLoading: false,
                deleteLoading: false,
            }))
            return {
                vendorData: updatedDataWithSno
            }
        default:
            return state;
    }
}

export default VendorReducer;