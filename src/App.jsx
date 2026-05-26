import React from "react";
import BubblePlot from "./BubblePlot";

function App() {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {/* Title */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "22px",
          fontWeight: 600,
          color: "#333",
          marginBottom: "8px",
        }}
      >
        Gapminder: GDP per Capita vs Life Expectancy
      </h1>

      {/* Description */}
      <p
        style={{
          fontSize: "13px",
          color: "#666",
          textAlign: "center",
          lineHeight: "1.5",
          maxWidth: "800px",
          margin: "0 auto 20px auto",
        }}
      >
        This visualization provides an exploration of global development
        indicators, such as life expectancy, GDP per capita, and population size
        across various countries and regions. The logarithmic scale (left)
        effectively manages the wide range of GDP values, allowing for clearer
        comparisons between nations with widely disparate GDPs. The linear scale
        (right) shows the same data without transformation, revealing the
        nations occupying the upper range.
      </p>

      {/* Side-by-side charts */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <BubblePlot scaleType="log" />
        <BubblePlot scaleType="linear" />
      </div>

      {/* Sources & Credits */}
      <p
        style={{
          textAlign: "center",
          fontSize: "10px",
          color: "#999",
          marginTop: "16px",
        }}
      >
        Source: World Bank material from GAPMINDER.ORG, CC-BY LICENSE |
        Scaffolding by Claude Opus 4.6 | Visualization by Jeremiah King as part
        of D3 Loves React course taught by Yan Holtz
      </p>
    </div>
  );
}

export default App;
