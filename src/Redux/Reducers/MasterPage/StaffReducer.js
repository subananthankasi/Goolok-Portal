import { FETCH_STAFF, STAFF_DEL, STAFF_ERROR, STAFF_ID } from "../../Actions/MasterPage/Staff";

const initialState = {
  staff: [],
  staffID: null,
  isLoading: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

const StaffReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STAFF_FETCH_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "STAFF_ADD_LOADING":
      return {
        ...state,
        addLoading: true,
      };
    case "STAFF_UPDATE_LOADING":
      return {
        ...state,
        updateLoading: true,
      };
    case "STAFF_DELETE_LOADING":
      return {
        ...state,
        deleteLoading: true,
      };
    case FETCH_STAFF:
      const withSno = action.payload.map((data, index) => ({
        ...data,
        sno: (index + 1).toString()
      }))
      return {
        staff: withSno,
        isLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
      };


    case STAFF_DEL:
      const updatedData = state.staff.filter(data => data.id !== action.payload);
      const updatedDataWithSno = updatedData.map((item, index) => ({
        ...item,
        sno: (index + 1).toString()
      }))
      return {
        ...state,
        staff: updatedDataWithSno,
                isLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
      };

    case STAFF_ID:
      return {
        ...state,
        staffID: action.payload,
      };
    case STAFF_ERROR:
      return {
        ...state,
        isLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default StaffReducer;
