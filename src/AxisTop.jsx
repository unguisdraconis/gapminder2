import React from "react";
import * as d3 from "d3";

const AxisBottom = ({ scale }) => {
  return (
    <g transform={`translate(0, ${scale.range()[1]})`} className="x-axis">
      {scale.ticks().map((tick) => (
        <text key={tick} x={scale(tick)} y={6} dy=".32em" textAnchor="middle">
          {tick}
        </text>
      ))}
    </g>
  );
};

export default AxisBottom;
