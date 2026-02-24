import {
  DEL_SRO_Details,
  FETCH_SRO_Details,
  SRO_DETAILS_ERROR,
} from "../../Actions/MasterPage/SRODetailsAction";

const initialState = {
  SRODetailsData: [],
  isLoading: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
  error: null,
};

const SRODetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SRO_DETAILS_FETCH_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "SRO_DETAILS_ADD_LOADING":
      return {
        ...state,
        addLoading: true,
      };
    case "SRO_DETAILS_UPDATE_LOADING":
      return {
        ...state,
        updateLoading: true,
      };
    case "SRO_DETAILS_DELETE_LOADING":
      return {
        ...state,
        deleteLoading: true,
      };
    case SRO_DETAILS_ERROR:
      return {
        ...state,
        isLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: action.payload,
      };

    case FETCH_SRO_Details:
      const dataWithSno = action.payload.map((item, index) => ({
        ...item,
        sno: (index + 1).toString(),
      }));
      return {
        ...state,
        SRODetailsData: dataWithSno,
        isLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: null,
      };

    case DEL_SRO_Details:
      const updatedData = state.SRODetailsData.filter(
        (data) => data.id !== action.payload
      );
      const updatedDataWithSno = updatedData.map((item, index) => ({
        ...item,
        sno: (index + 1).toString(),
      }));
      return {
        ...state,
        SRODetailsData: updatedDataWithSno,
        deleteLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default SRODetailsReducer;
