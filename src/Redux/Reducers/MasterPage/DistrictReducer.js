import {
  DEL_DISTRICT,
  DISTRICT_ERROR,
  FECTCH_DISCTRICT,
} from "../../Actions/MasterPage/DistrictAction";

const initialState = {
  districtData: [],
  isLoading: false,
  addLoading: false,
  deleteLoading: false,
  updateLoading: false,
  error: null,
};

const districtReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DISTRICT_FETCH_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "DISTRICT_ADD_LOADING":
      return {
        ...state,
        addLoading: true,
      };
    case "DISTRICT_DELETE_LOADING":
      return {
        ...state,
        deleteLoading: true,
      };
    case "DISTRICT_UPDATE_LOADING":
      return {
        ...state,
        updateLoading: true,
      };
    case DISTRICT_ERROR:
      return {
        ...state,
        isLoading: false,
        addLoading: false,
        deleteLoading: false,
        updateLoading: false,
        error: action.payload,
      };
    
      case FECTCH_DISCTRICT:
      const dataWithSno = action.payload.map((data, index) => ({
        ...data,
        sno: (index + 1).toString(),
      }));
      return {
        districtData: dataWithSno,
        isLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: null,
      };

    case DEL_DISTRICT:
      const updatedData = state.districtData.filter(
        (data) => data.id !== action.payload
      );
      const updatedDataWithSno = updatedData.map((item, index) => ({
        ...item,
        sno: (index + 1).toString(),
      }));
      return {
        ...state,
        districtData: updatedDataWithSno,
        deleteLoading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default districtReducer;
