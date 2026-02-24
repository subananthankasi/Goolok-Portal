import {
  FETCH_CATEGORY,
  DEL_CATEGORY,
  CATEGORY_ERROR,
} from "../../Actions/MasterPage/CategoryAction";


const initialState = {
  CategoryData: [],
  isLoading: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CATEGORY_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "CATEGORY_ADD_LOADING":
      return {
        ...state,
        addLoading: true,
      };
    case "CATEGORY_UPDATE_LOADING":
      return {
        ...state,
        updateLoading: true,
      };
    case "CATEGORY_DELETE_LOADING":
      return {
        ...state,
        deleteLoading: true,
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        isLoading: false,
        addLoading: false,
        deleteLoading: false,
        updateLoading: false,
        error: action.payload,
      };
    case FETCH_CATEGORY:
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
        CategoryData: dataWithSno,
      };

    case DEL_CATEGORY:
      const updatedData = state.CategoryData.filter(
        (Category) => Category.id !== action.payload
      );
      const updatedDataWithSno = updatedData.map((item, index) => ({
        ...item,
        sno: index + 1,
      }));
      return {
        ...state,
        deleteLoading: false,
        CategoryData: updatedDataWithSno,
      };

    default:
      return state;
  }
};

export default CategoryReducer;
