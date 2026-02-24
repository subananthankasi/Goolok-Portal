import {
  FETCH_SubCATEGORY,
  DEL_SubCATEGORY,
  SUB_CATEGORY_ERROR,
} from "../../Actions/MasterPage/SubCategoryAction";

const initialState = {
  SubCategoryData: [],
  isLoading: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

const SubCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUBCATEGORY_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "SUBCATEGORY_ADD_LOADING":
      return {
        ...state,
        addLoading: true,
      };
    case "SUBCATEGORY_UPDATE_LOADING":
      return {
        ...state,
        updateLoading: true,
      };
    case "SUBCATEGORY_DELETE_LOADING":
      return {
        ...state,
        deleteLoading: true,
      };
    case SUB_CATEGORY_ERROR:
      return {
        ...state,
        isLoading: false,
        addLoading: false,
        deleteLoading: false,
        updateLoading: false,
        error: action.payload,
      };
    case FETCH_SubCATEGORY:
      const dataWithSno = action.payload.map((item, index) => ({
        ...item,
        sno: index + 1,
      }));
      return {
        ...state,
        isLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
        SubCategoryData: dataWithSno,
      };

    case DEL_SubCATEGORY:
      const updatedData = state.SubCategoryData.filter(
        (SubCategory) => SubCategory.id !== action.payload
      );
      const updatedDataWithSno = updatedData.map((item, index) => ({
        ...item,
        sno: index + 1,
      }));
      return {
        ...state,
        deleteLoading: false,
        SubCategoryData: updatedDataWithSno,
      };

    default:
      return state;
  }
};

export default SubCategoryReducer;
