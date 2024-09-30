import React from "react";
import { useSelector } from "react-redux";

const TestComponent = () => {
  console.log("test component render");
  // const testValue = useSelector(state => state.test|| 'initial' )

  return <div>TestComponent</div>;
};

export default TestComponent;
