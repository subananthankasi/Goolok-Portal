import {
  DELETE_VILLAGE,
  FETCH_VILLAGE,
  VILLAGE_ERROR,
} from "../../Actions/MasterPage/VillageAction";

const initialState = {
  villageData: [],
  isLoading: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

const villageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_VILLAGE_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "ADD_VILLAGE_LOADING":
      return {
        ...state,
        addLoading: true,
      };
    case "UPDATE_VILLAGE_LOADING":
      return {
        ...state,
        updateLoading: true,
      };
    case "DELETE_VILLAGE_LOADING":
      return {
        ...state,
        deleteLoading: true,
      };
    case VILLAGE_ERROR:
      return {
        ...state,
        isLoading: false,
        addLoading: false,
        deleteLoading: false,
        updateLoading: false,
        error: action.payload,
      };
    case FETCH_VILLAGE:
      const withSno = action.payload.map((data, index) => ({
        ...data,
        sno: (index + 1).toString(),
      }));
      return {
        isLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
        villageData: withSno,
      };

    case DELETE_VILLAGE:
      const updatedData = state.villageData.filter(
        (data) => data.id !== action.payload
      );
      const updatedDataWithSno = updatedData.map((item, index) => ({
        ...item,
        sno: (index + 1).toString(),
      }));
      return {
        deleteLoading: false,
        villageData: updatedDataWithSno,
      };

    default:
      return state;
  }
};

export default villageReducer;
