import {
  ADD_STATE,
  DEL_STATE,
  FETCH_STATE,
  STATE_ERROR,
  UPDATE_STATE,
} from "../../Actions/MasterPage/StateAction";

const initialState = {
  StateNameData: [],
  isLoading: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
  error: null,
};

const StateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STATE_FETCH_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "STATE_ADD_LOADING":
      return {
        ...state,
        addLoading: true,
      };
    case "STATE_UPDATE_LOADING":
      return {
        ...state,
        updateLoading: true,
      };
    case "STATE_DELETE_LOADING":
      return {
        ...state,
        deleteLoading: true,
      };
    case STATE_ERROR:
      return {
        ...state,
        isLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: action.payload,
      };
    case FETCH_STATE:
      const dataWithSno = action.payload.map((data, index) => ({
        ...data,
        sno: (index + 1).toString(),
      }));
      return {
        StateNameData: dataWithSno,
        isLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: null,
      };
    case ADD_STATE:
      return {
        ...state,
        StateNameData: [...state.StateNameData, action.payload],
        addLoading: false,
        error: null,
      };
    case DEL_STATE:
      const updatedData = state.StateNameData.filter(
        (data) => data.id !== action.payload
      );
      const updatedDataWithSno = updatedData.map((item, index) => ({
        ...item,
        sno: (index + 1).toString(),
      }));
      return {
        ...state,
        StateNameData: updatedDataWithSno,
        deleteLoading: false,
        error: null,
      };
    case UPDATE_STATE:
      return {
        ...state,
        StateNameData: state.StateNameData.map((data) =>
          data.id === action.payload.id ? action.payload : data
        ),
        updateLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default StateReducer;
