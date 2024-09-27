import { TEST1 , TEST2 } from "../constants/testConstants";

export const setTestValue1 = (payload) => ({
    type: TEST1,
    payload,
});

export const setTestValue2 = (payload) => ({
    type: TEST2,
    payload,
});