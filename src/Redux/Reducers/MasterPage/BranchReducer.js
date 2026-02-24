// BranchReducer.js

import {
  BRANCH_ERROR,
  BRANCH_ID,
  DELETE_BRANCH,
  FETCH_BRANCH,
} from "../../Actions/MasterPage/BranchAction";

const initialState = {
  BranchData: [],
  selectedBranchID: null,
  isLoading: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

const BranchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BRANCH_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "ADD_BRANCH_LOADING":
      return {
        ...state,
        addLoading: true,
      };
    case "UPDATE_BRANCH_LOADING":
      return {
        ...state,
        updateLoading: true,
      };
    case "DELETE_BRANCH_LOADING":
      return {
        ...state,
        deleteLoading: true,
      };
    case BRANCH_ERROR:
      return {
        ...state,
        isLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: action.payload,
      };

    case FETCH_BRANCH:
      const withSno = action.payload.map((data, index) => ({
        ...data,
        sno: (index + 1).toString(),
      }));
      return {
        ...state,
        isLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
        BranchData: withSno,
      };

    case DELETE_BRANCH:
      const updatedData = state.BranchData.filter(
        (data) => data.id !== action.payload
      );
      const updatedDataWithSno = updatedData.map((item, index) => ({
        ...item,
        sno: (index + 1).toString(),
      }));
      return {
        ...state,
        deleteLoading: false,
        BranchData: updatedDataWithSno,
      };

    case BRANCH_ID:
      return {
        ...state,
        selectedBranchID: action.payload,
      };

    default:
      return state;
  }
};

export default BranchReducer;
