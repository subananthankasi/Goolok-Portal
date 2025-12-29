import {
  DEL_SUB_PROPERTY_TYPE,
  FETCH_SUB_PROPERTY_TYPE,
  SUB_PROPERTY_ERROR,
} from "../../Actions/MasterPage/SubPropertyAction";

const initialState = {
  SubPropertyTypeData: [],
  isLoading: false,
  addLoading: false,
  deleteLoading: false,
  updateLoading: false,
  error: null,
};

const SubPropertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUB_PROPERTY_TYPE_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "ADD_SUB_PROPERTY_TYPE_LOADING":
      return {
        ...state,
        addLoading: true,
      };
    case "DELETE_SUB_PROPERTY_TYPE_LOADING":
      return {
        ...state,
        deleteLoading: true,
      };
    case "UPDATE_SUB_PROPERTY_TYPE_LOADING":
      return {
        ...state,
        updateLoading: true,
      };
    case SUB_PROPERTY_ERROR:
      return {
        ...state,
        isLoading: false,
        addLoading: false,
        deleteLoading: false,
        updateLoading: false,
        error: action.payload,
      };

    case "CLEAR_SUB_PROPERTY_ERROR":
      return {
        ...state,
        error: null,
      };
    case FETCH_SUB_PROPERTY_TYPE:
      const dataWithSno = action.payload.map((item, index) => ({
        ...item,
        sno: (index + 1).toString(),
      }));
      return {
        ...state,
        isLoading: false,
        addLoading: false,
        deleteLoading: false,
        updateLoading: false,
        SubPropertyTypeData: dataWithSno,
      };
    case DEL_SUB_PROPERTY_TYPE:
      const updatedData = state.SubPropertyTypeData.filter(
        (propertyType) => propertyType.id !== action.payload
      );
      const updatedDataWithSno = updatedData.map((item, index) => ({
        ...item,
        sno: (index + 1).toString(),
      }));
      return {
        ...state,
        deleteLoading: false,
        error: null,
        SubPropertyTypeData: updatedDataWithSno,
      };

    default:
      return state;
  }
};

export default SubPropertyReducer;
