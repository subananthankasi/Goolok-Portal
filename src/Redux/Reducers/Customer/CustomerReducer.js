import { CUSTOMER_ID, FETCH_CUSTOMER } from "../../Actions/Customer/CustomerAction";

const initialState = {
    customerData: [],
    customerID: null
};

const calculateCompletionPercentage = (record) => {
    const totalFields = Object.keys(record).length;
    let filledFields = 0;

    for (const key in record) {
        if (record[key] !== '' && record[key] !== null && record[key] !== undefined) {
            filledFields++;
        }
    } 
    return (filledFields / (totalFields)) * 100;
};

const CustomerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CUSTOMER:
            const withSnoAndCompletion = action.payload.map((data, index) => {
                const completion = calculateCompletionPercentage(data);
                return {
                    ...data,
                    sno: (index + 1).toString(),
                    completion: completion.toFixed(2)   
                };
            });
            return {
                ...state,
                customerData: withSnoAndCompletion
            };

        case CUSTOMER_ID:
            return {
                ...state,
                customerID: action.payload
            };

        default:
            return state;
    }
};

export default CustomerReducer;
