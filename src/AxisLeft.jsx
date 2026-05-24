import React from "react";
import * as d3 from "d3";

const AxisLeft = ({ scale }) => {
  return (
    <g className="y-axis">
      {scale.ticks().map((tick) => (
        <text key={tick} x={-6} y={scale(tick)} dy=".32em" textAnchor="end">
          {tick}
        </text>
      ))}
    </g>
  );
};

export default AxisLeft;
