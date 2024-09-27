import { TEST1 , TEST2 } from "../constants/testConstants";
const initialState = {};

const testReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case TEST1 : 
      return {
        ...state,
        test1 : payload
      }

    case TEST2 : 
      return {
        ...state,
        test2 : payload
      }
    default:
      return state;
  }
};

export default testReducer;
