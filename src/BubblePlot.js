import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { data } from "./gapminder";
import AxisBottom from "./AxisBottom";
import AxisLeft from "./AxisLeft";

const BubblePlot = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    // Scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => Math.log10(d.gdpPercap)))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.lifeExp)])
      .range([height, 0]);

    const rScale = d3
      .scaleSqrt()
      .domain(d3.extent(data, (d) => Math.sqrt(d.pop)))
      .range([5, 20]);

    // Clear previous render
    svg.selectAll("*").remove();

    // Draw bubbles
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(Math.log10(d.gdpPercap)))
      .attr("cy", (d) => yScale(d.lifeExp))
      .attr("r", (d) => rScale(Math.sqrt(d.pop)))
      .style("fill", "steelblue");

    // Add axes
    svg.append(AxisBottom({ scale: xScale }));
    svg.append(AxisLeft({ scale: yScale }));
  }, []);

  return <svg ref={svgRef} width="800" height="500"></svg>;
};

export default BubblePlot;
