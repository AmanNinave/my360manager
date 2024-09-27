import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  console.log('render');
  const val = useRef(20);

  useEffect(()=>{
    console.log('useEffect')
  }, [val.current])

  const handleClick = () => {
    console.log("click function")
    console.log(val.current)
    val.current = Math.floor( Math.random()*10 ) ;
    console.log(val.current)
  }

  return (
    <>
      <button onClick={handleClick}>click Me</button>
      <h1>hi</h1>
    </>
  )
}

export default Dashboard