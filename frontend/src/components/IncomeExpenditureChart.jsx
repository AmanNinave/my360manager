import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const IncomeExpenditureChart = ({ transactionsData }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [totalValue, setTotalValue] = useState({
    totalIncome: 0,
    totalExpenditure: 0
});
  useEffect(() => {
    const totalIncome = d3.sum(transactionsData, d => d.credit);
    const totalExpenditure = d3.sum(transactionsData, d => d.debit);

    setTotalValue({ totalIncome, totalExpenditure });

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const groupedData = Array.from(d3.group(transactionsData, d => d.type), ([key, values]) => ({
      type: key,
      totalDebit: d3.sum(values, d => d.debit),
      totalCredit: d3.sum(values, d => d.credit)
    }));
  
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;
  
    d3.select(svgRef.current).selectAll("*").remove();
  
    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    const x = d3.scaleBand()
      .domain(groupedData.map(d => d.type))
      .range([0, width])
      .padding(0.1);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(groupedData, d => d.totalDebit + d.totalCredit)])
      .nice()
      .range([height, 0]);
  
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
  
    // Apply the short format to the y-axis
    const formatNumber = d3.format(".2s"); // For short format (e.g., '10k', '1M')
  
    svg.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y).tickFormat(formatNumber)); // Apply short form formatting here
  
    // Create tooltip div (hidden by default)
    const tooltip = d3.select(containerRef.current)
      .append("div")
      .style("position", "absolute")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("visibility", "hidden")
      .style("pointer-events", "none");
  
    svg.selectAll(".bar-debit")
      .data(groupedData)
      .enter().append("rect")
      .attr("class", "bar-debit")
      .attr("x", d => x(d.type))
      .attr("y", d => y(d.totalDebit))
      .attr("width", x.bandwidth() / 2)
      .attr("height", d => height - y(d.totalDebit))
      .attr("fill", "blue")
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible")
          .text(`Debit: ${d.totalDebit.toFixed(2)}`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", `${event.clientY - containerRect.y}px`)
          .style("left", `${event.clientX - containerRect.x}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });
  
    svg.selectAll(".bar-credit")
      .data(groupedData)
      .enter().append("rect")
      .attr("class", "bar-credit")
      .attr("x", d => x(d.type) + x.bandwidth() / 2)
      .attr("y", d => y(d.totalCredit))
      .attr("width", x.bandwidth() / 2)
      .attr("height", d => height - y(d.totalCredit))
      .attr("fill", "green")
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible")
          .text(`Credit: ${d.totalCredit.toFixed(2)}`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", `${event.clientY - containerRect.y}px`)
          .style("left", `${event.clientX - containerRect.x}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });
  
  }, [transactionsData]);
  

  return (
    <div style={{ width:'100%', height:'100%' , display: 'flex', justifyContent: 'space-evenly'  , alignItems : 'center'}}>
        <div ref={containerRef} style={{ width: '50%', height: '100%', position: 'relative' }}>
        <svg ref={svgRef}></svg>
        </div>
        <div  style={{ width: '35%', height: '100%', position: 'relative' , marginTop : '5%' }}>
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="flex flex-col items-center mb-4">
                <h2 className="text-lg font-semibold text-green-600">Total Income</h2>
                <p className="text-xl font-bold text-green-800">₹{totalValue.totalIncome.toFixed(2)}</p>
            </div>
            <div className="flex flex-col items-center">
                <h2 className="text-lg font-semibold text-blue-600">Total Expenditure</h2>
                <p className="text-xl font-bold text-blue-800">₹{totalValue.totalExpenditure.toFixed(2)}</p>
            </div>
        </div>

        </div>
    </div>
  );
};

export default IncomeExpenditureChart;
