import {
  DEL_LAWYER_DOC,
  FETCH_LAWYER_DOC,
} from "../../Actions/MasterPage/LawyerDocumentAction";

const initialState = {
  isLoading: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
  lawyerDoc: [],
  error: null,
};

const LawyerDocumentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LAWYER_DOC_FETCH_LOADING":
      return { ...state, isLoading: true };

    case "LAWYER_DOC_ADD_LOADING":
      return { ...state, addLoading: true };

    case "LAWYER_DOC_UPDATE_LOADING":
      return { ...state, updateLoading: true };

    case "LAWYER_DOC_DELETE_LOADING":
      return { ...state, deleteLoading: true };

    case "LAWYER_DOC_ERROR":
      return {
        ...state,
        isLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: action.payload,
      };

    case FETCH_LAWYER_DOC:
      const dataWithSno = action.payload.map((data, index) => ({
        ...data,
        sno: (index + 1).toString(),
      }));
      return {
        isLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
        lawyerDoc: dataWithSno,
        error: null,
      };

    case DEL_LAWYER_DOC:
      const updatedData = state.lawyerDoc.filter(
        (data) => data.id !== action.payload
      );
      const updatedDataWithSno = updatedData.map((item, index) => ({
        ...item,
        sno: (index + 1).toString(),
      }));
      return {
        ...state,
        lawyerDoc: updatedDataWithSno,
        deleteLoading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default LawyerDocumentReducer;
