import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const IncomeExpenditureBySourceChart = ({ transactionsData }) => {
  const incomeSvgRef = useRef();
  const expenditureSvgRef = useRef();
  const incomeContainerRef = useRef();
  const expenditureContainerRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    // Tooltip
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "rgba(0, 0, 0, 0.7)")
      .style("color", "white")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("visibility", "hidden")
      .style("pointer-events", "none");

    // Income Chart
    const incomeContainerWidth = incomeContainerRef.current.clientWidth;
    const incomeContainerHeight = incomeContainerRef.current.clientHeight;

    const incomeData = Array.from(d3.group(transactionsData, d => d.source), ([key, values]) => ({
      source: key,
      totalIncome: d3.sum(values, d => d.credit),
    })).filter(d => d.totalIncome > 0);  // Filter out zero values

    const incomeWidth = incomeContainerWidth - margin.left - margin.right;
    const incomeHeight = incomeContainerHeight - margin.top - margin.bottom;

    d3.select(incomeSvgRef.current).selectAll("*").remove();

    const incomeSvg = d3.select(incomeSvgRef.current)
      .attr("width", incomeWidth + margin.left + margin.right)
      .attr("height", incomeHeight + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const incomeX = d3.scaleBand()
      .domain(incomeData.map(d => d.source))
      .range([0, incomeWidth])
      .padding(0.1);

    const incomeY = d3.scaleLinear()
      .domain([0, d3.max(incomeData, d => d.totalIncome)])
      .nice()
      .range([incomeHeight, 0]);

    const formatNumber = d3.format(".2s");

    const xAxis = incomeSvg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${incomeHeight})`)
      .call(d3.axisBottom(incomeX));

    xAxis.selectAll("text")
      .style("opacity", 0); // Hide all labels initially

    // y ticks values
    const maxIncome = d3.max(incomeData, d => d.totalIncome);
    const incomeTicks = Array.from({ length: 10 }, (_, i) => (Math.ceil(maxIncome / 10000) * 1000 * (i + 1))).filter(val => val<= maxIncome);

    incomeSvg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(incomeY).tickValues(incomeTicks).tickFormat(formatNumber)); // Specify the tick values


    // Add bars with tooltip on hover
    incomeSvg.selectAll(".bar-income")
      .data(incomeData)
      .enter().append("rect")
      .attr("class", "bar-income")
      .attr("x", d => incomeX(d.source))
      .attr("y", d => incomeY(d.totalIncome))
      .attr("width", incomeX.bandwidth())
      .attr("height", d => incomeHeight - incomeY(d.totalIncome))
      .attr("fill", "green")
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible")
          .text(` ${d.totalIncome.toFixed(1)}`);

        // Show only the label for the hovered bar
        xAxis.selectAll("text")
          .style("opacity", 0); // Hide all labels

        xAxis.selectAll("text")
          .filter(source => source === d.source)
          .style("opacity", 1); // Show the hovered label
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", `${event.clientY - 20}px`)
          .style("left", `${event.clientX + 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
        xAxis.selectAll("text").style("opacity", 0); // Hide all labels when not hovering
      });

    // Expenditure Chart (similar process for expenditure chart)
    const expenditureContainerWidth = expenditureContainerRef.current.clientWidth;
    const expenditureContainerHeight = expenditureContainerRef.current.clientHeight;

    const expenditureData = Array.from(d3.group(transactionsData, d => d.source), ([key, values]) => ({
      source: key,
      totalExpenditure: d3.sum(values, d => d.debit),
    })).filter(d => d.totalExpenditure > 0);  // Filter out zero values

    const expenditureWidth = expenditureContainerWidth - margin.left - margin.right;
    const expenditureHeight = expenditureContainerHeight - margin.top - margin.bottom;

    d3.select(expenditureSvgRef.current).selectAll("*").remove();

    const expenditureSvg = d3.select(expenditureSvgRef.current)
      .attr("width", expenditureWidth + margin.left + margin.right)
      .attr("height", expenditureHeight + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const expenditureX = d3.scaleBand()
      .domain(expenditureData.map(d => d.source))
      .range([0, expenditureWidth])
      .padding(0.1);

    const expenditureY = d3.scaleLinear()
      .domain([0, d3.max(expenditureData, d => d.totalExpenditure)])
      .nice()
      .range([expenditureHeight, 0]);

    const expenditureXAxis = expenditureSvg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${expenditureHeight})`)
      .call(d3.axisBottom(expenditureX));

    expenditureXAxis.selectAll("text")
      .style("opacity", 0); // Hide all labels initially

    // expenditureSvg.append("g")
    //   .attr("class", "y-axis")
    //   .call(d3.axisLeft(expenditureY).tickFormat(formatNumber));
    
    const maxExpenditure = d3.max(expenditureData, d => d.totalExpenditure);
    const expenditureTicks = Array.from({ length: 10 }, (_, i) => (Math.ceil(maxExpenditure / 10000) * 1000 * (i + 1))).filter(val => val<= maxExpenditure);

    expenditureSvg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(expenditureY).tickValues(expenditureTicks).tickFormat(formatNumber)); // Specify the tick values
  
  

    // Add bars with tooltip on hover
    expenditureSvg.selectAll(".bar-expenditure")
      .data(expenditureData)
      .enter().append("rect")
      .attr("class", "bar-expenditure")
      .attr("x", d => expenditureX(d.source))
      .attr("y", d => expenditureY(d.totalExpenditure))
      .attr("width", expenditureX.bandwidth())
      .attr("height", d => expenditureHeight - expenditureY(d.totalExpenditure))
      .attr("fill", "blue")
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible")
          .text(` ${d.totalExpenditure.toFixed(1)}`);

        // Show only the label for the hovered bar
        expenditureXAxis.selectAll("text")
          .style("opacity", 0); // Hide all labels

        expenditureXAxis.selectAll("text")
          .filter(source => source === d.source)
          .style("opacity", 1); // Show the hovered label
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", `${event.clientY - 20}px`)
          .style("left", `${event.clientX + 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
        expenditureXAxis.selectAll("text").style("opacity", 0); // Hide all labels when not hovering
      });

  }, [transactionsData]);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
      {/* Income Chart */}
      <div ref={incomeContainerRef} style={{ width: '45%', height: '90%', position: 'relative' }}>
        <h3>Income by Source</h3>
        <svg ref={incomeSvgRef}></svg>
      </div>

      {/* Expenditure Chart */}
      <div ref={expenditureContainerRef} style={{ width: '45%', height: '90%', position: 'relative' }}>
        <h3>Expenditure by Source</h3>
        <svg ref={expenditureSvgRef}></svg>
      </div>
    </div>
  );
};

export default IncomeExpenditureBySourceChart;
