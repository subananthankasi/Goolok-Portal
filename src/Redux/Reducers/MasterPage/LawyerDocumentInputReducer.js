import {
  DEL_LAWYER_DOC_INPUT,
  FETCH_LAWYER_DOC_INPUT,
  LAWYER_DOC_INPUT_ERROR,
} from "../../Actions/MasterPage/LawyerDocumentInputAction";

const initialState = {
  lawyerDocInput: [],
  isLoading: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
  error: null,
};

const LawyerDocumentInputReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LAWYER_DOC_INPUT_FETCH_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "LAWYER_DOC_INPUT_ADD_LOADING":
      return {
        ...state,
        addLoading: true,
      };
    case "LAWYER_DOC_INPUT_UPDATE_LOADING":
      return {
        ...state,
        updateLoading: true,
      };
    case "LAWYER_DOC_INPUT_DELETE_LOADING":
      return {
        ...state,
        deleteLoading: true,
      };
    case LAWYER_DOC_INPUT_ERROR:
      return {
        ...state,
        isLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: action.payload,
      };

    case FETCH_LAWYER_DOC_INPUT:
      const dataWithSno = action.payload.map((data, index) => ({
        ...data,
        sno: (index + 1).toString(),
      }));
      return {
        lawyerDocInput: dataWithSno,
        isLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: null,
      };

    case DEL_LAWYER_DOC_INPUT:
      const updatedData = state.lawyerDocInput.filter(
        (data) => data.id !== action.payload
      );
      const updatedDataWithSno = updatedData.map((item, index) => ({
        ...item,
        sno: (index + 1).toString(),
      }));
      return {
        ...state,
        lawyerDocInput: updatedDataWithSno,
        deleteLoading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default LawyerDocumentInputReducer;
