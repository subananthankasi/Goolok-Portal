import {
  FETCH_GROUP_TYPE,
  DEL_GROUP_TYPE,
  GROUP_ERROR,
} from "../../Actions/MasterPage/GroupTypeAction";

const initialState = {
  GroupTypeData: [],
  isLoading: false,
  updateLoading: false,
  deleteLoading: false,
  addLoading: false,
};

const GroupTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GROUP_TYPE_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "GROUP_TYPE_ADD_LOADING":
      return {
        ...state,
        addLoading: true,
      };
    case "GROUP_TYPE_UPDATE_LOADING":
      return {
        ...state,
        updateLoading: true,
      };
    case "GROUP_TYPE_DELETE_LOADING":
      return {
        ...state,
        deleteLoading: true,
      };
    case GROUP_ERROR:
      return {
        ...state,
        isLoading: false,
        addLoading: false,
        deleteLoading: false,
        updateLoading: false,
        error: action.payload,
      };
    case FETCH_GROUP_TYPE:
      const dataWithSno = action.payload.map((item, index) => ({
        ...item,
        sno: (index + 1).toString(),
      }));
      return {
        ...state,
        isLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
        GroupTypeData: dataWithSno,
      };

    case DEL_GROUP_TYPE:
      const updatedData = state.GroupTypeData.filter(
        (GroupType) => GroupType.id !== action.payload
      );
      const updatedDataWithSno = updatedData.map((item, index) => ({
        ...item,
        sno: (index + 1).toString(),
      }));
      return {
        ...state,
        deleteLoading: false,
        GroupTypeData: updatedDataWithSno,
      };

    default:
      return state;
  }
};

export default GroupTypeReducer;
