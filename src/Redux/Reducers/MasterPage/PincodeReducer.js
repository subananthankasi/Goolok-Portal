import {
  DELETE_PINCODE,
  FETCH_PINCODE,
} from "../../Actions/MasterPage/PincodeAction";

const initialState = {
  PincodeData: [],
  isLoading: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

const PincodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PINCODE_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "ADD_PINCODE_LOADING":
      return {
        ...state,
        addLoading: true,
      };

    case "UPDATE_PINCODE_LOADING":
      return {
        ...state,
        updateLoading: true,
      };

    case "DELETE_PINCODE_LOADING":
      return {
        ...state,
        deleteLoading: true,
      };
    case FETCH_PINCODE:
      const withSno = action.payload.map((data, index) => ({
        ...data,
        sno: (index + 1).toString(),
      }));
      return {
        PincodeData: withSno,
        isLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
      };

    case DELETE_PINCODE:
      const updatedData = state.PincodeData.filter(
        (data) => data.id !== action.payload
      );
      const updatedDataWithSno = updatedData.map((item, index) => ({
        ...item,
        sno: (index + 1).toString(),
      }));
      return {
        PincodeData: updatedDataWithSno,
        deleteLoading: false,
      };
    default:
      return state;
  }
};

export default PincodeReducer;
