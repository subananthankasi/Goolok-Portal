import {
  DEL_PROPERTY_DOC,
  FETCH_PROPERTY_DOC,
  PROPERTY_ERROR,
} from "../../Actions/MasterPage/PropertyDocumentAction";

const initialState = {
  isLoding: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
  PropertyDocumentData: [],
  error: null,
};

const PropertyDocumentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PROPERTY_DOC_FETCH_LOADING":
      return { ...state, isLoading: true };

    case "PROPERTY_DOC_ADD_LOADING":
      return { ...state, addLoading: true };

    case "PROPERTY_DOC_UPDATE_LOADING":
      return { ...state, updateLoading: true };

    case "PROPERTY_DOC_DELETE_LOADING":
      return { ...state, deleteLoading: true };

    case PROPERTY_ERROR:
      return {
        ...state,
        isLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
        error: action.payload,
      };
    case FETCH_PROPERTY_DOC:
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
        PropertyDocumentData: dataWithSno,
      };

    case DEL_PROPERTY_DOC:
      const updatedData = state.PropertyDocumentData.filter(
        (data) => data.id !== action.payload
      );
      const updatedDataWithSno = updatedData.map((item, index) => ({
        ...item,
        sno: (index + 1).toString(),
      }));
      return {
        ...state,
        PropertyDocumentData: updatedDataWithSno,
        deleteLoading: false,
      };
    default:
      return state;
  }
};

export default PropertyDocumentReducer;
