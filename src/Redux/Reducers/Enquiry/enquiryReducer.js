import { FETCH_ENQUIRY_DOCUMENT, FETCH_ENQUIRY_WEBSITE, TELECOM_FETCH } from "../../Actions/Enquiry/enquiryReportAction";

 
const initialState = {
    enquiryDataFromWebsite: [],
    enquiryDocument: [],
    telecomData:[]
 };

 

const EnquiryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ENQUIRY_WEBSITE:
            const dataWithSno = action.payload.map((data,index)=>({ 
                ...data,
                sno: (index + 1).toString()
            }));
            return {
                ...state,
                enquiryDataFromWebsite: dataWithSno
            };

            case FETCH_ENQUIRY_DOCUMENT: 
                return {
                    ...state,
                    enquiryDocument: action.payload
                };

            case TELECOM_FETCH: 
            const dataWithSno1 = action.payload.map((data,index)=>({ 
                ...data,
                sno: (index + 1).toString()
            }));
                return {
                    ...state,
                    telecomData: dataWithSno1
                };
       

        default:
            return state;
    }
};

export default EnquiryReducer;
