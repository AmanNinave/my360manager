import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import IncomeExpenditureChart from './IncomeExpenditureChart.jsx';
import IncomeExpenditureBySourceChart from './IncomeExpenditureBySourceChart.jsx';

const TransactionChart = ({ transactionsData }) => {
  return (
    <div style={{ width: '100%', height: '30vh' , display: 'flex', justifyContent: 'space-around' , alignItems : 'center' }} >
      <IncomeExpenditureChart transactionsData={transactionsData}/>
      <IncomeExpenditureBySourceChart transactionsData={transactionsData}/>
    </div>
  );
};

export default TransactionChart;
