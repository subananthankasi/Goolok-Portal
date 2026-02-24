import { DEL_TALUK, FETCH_TALUK, TALUK_ERROR } from "../../Actions/MasterPage/TalukAction";

const initialState = {
  TalukData: [],
  isLoading: false,
  addLoading: false,
  deleteLoading: false,
  updateLoading: false,
};

const talukReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Fetch_Taluk":
      return {
        ...state,
        isLoading: true,
      };
    case "Add_Taluk":
      return {
        ...state,
        addLoading: true,
      };
    case "Update_Taluk":
      return {
        ...state,
        updateLoading: true,
      };
    case "Del_Taluk":
      return {
        ...state,
        deleteLoading: true,
      };
    case TALUK_ERROR:
      return {
        ...state,
        isLoading: false,
        addLoading: false,
        deleteLoading: false,
        updateLoading: false,
        error: action.payload,
      };
    case FETCH_TALUK:
      const dataWithSno = action.payload.map((data, index) => ({
        ...data,
        sno: (index + 1).toString(),
      }));
      return {
        TalukData: dataWithSno,
        isLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
      };

    case DEL_TALUK:
      const updatedData = state.TalukData.filter(
        (data) => data.id !== action.payload
      );
      const updatedDataWithSno = updatedData.map((item, index) => ({
        ...item,
        sno: (index + 1).toString(),
      }));
      return {
        ...state,
        TalukData: updatedDataWithSno,
        deleteLoading: false,
      };

    default:
      return state;
  }
};

export default talukReducer;
