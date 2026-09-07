import { useMemo } from "react";
import {
  scaleLog,
  scaleLinear,
  scaleSqrt,
  scaleOrdinal,
  extent,
  format,
} from "d3";
import { data } from "./gapminder";
import { AxisTop } from "./AxisTop";
import { AxisLeft } from "./AxisLeft";

// ---------- Dimensions (sized for side-by-side) ----------
const width = 520;
const height = 520;
const margin = { top: 60, right: 30, bottom: 40, left: 70 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// ---------- Continent color palette ----------
// Okabe-Ito pallete
const continentColors = {
  Africa: "#E69F00",
  Americas: "#009E73",
  Asia: "#D55E00",
  Europe: "#0072B2",
  Oceania: "#CC79A7",
};

const continents = Object.keys(continentColors);

// ---------- Formatters ----------
const xTickFormat = (d) => {
  if (d >= 1000) return `${format(",")(d / 1000)}k`;
  return format(",")(d);
};

const BubblePlot = ({ scaleType = "log" }) => {
  const isLog = scaleType === "log";
  const scaleLabel = isLog ? "logarithmic" : "linear";
  const titleId = `gapminder-${scaleLabel}-title`;
  const descriptionId = `gapminder-${scaleLabel}-description`;

  // Build scales using D3
  const xScale = useMemo(
    () =>
      isLog
        ? scaleLog()
            .domain(extent(data, (d) => d.gdpPercap))
            .range([0, innerWidth])
            .nice()
        : scaleLinear()
            .domain(extent(data, (d) => d.gdpPercap))
            .range([0, innerWidth])
            .nice(),
    [isLog],
  );

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain(extent(data, (d) => d.lifeExp))
        .range([innerHeight, 0])
        .nice(),
    [],
  );

  const rScale = useMemo(
    () =>
      scaleSqrt()
        .domain(extent(data, (d) => d.pop))
        .range([2, 30]),
    [],
  );

  const colorScale = useMemo(
    () =>
      scaleOrdinal()
        .domain(continents)
        .range(continents.map((c) => continentColors[c])),
    [],
  );

  // Sort so smaller bubbles render on top of larger ones
  const sortedData = useMemo(() => [...data].sort((a, b) => b.pop - a.pop), []);

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-labelledby={`${titleId} ${descriptionId}`}
      style={{ fontFamily: "sans-serif", background: "#fafafa" }}
    >
      <title id={titleId}>
        {`Gapminder bubble plot with a ${scaleLabel} GDP scale`}
      </title>
      <desc id={descriptionId}>
        {`Bubble plot of the same course-provided Gapminder dataset. GDP per capita is on a ${scaleLabel} x-axis, life expectancy is on the y-axis, population is represented by bubble size, and continent is represented by color.`}
      </desc>

      {/* Chart subtitle */}
      <text
        x={width / 2}
        y={500}
        textAnchor="middle"
        style={{ fontSize: "14px", fontWeight: 600, fill: "#333" }}
      >
        {isLog ? "Logarithmic Scale" : "Linear Scale"}
      </text>

      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* Axes */}
        <AxisTop
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xTickFormat}
          isLog={isLog}
        />
        <AxisLeft yScale={yScale} innerWidth={innerWidth} />

        {/* X-axis label (top) */}
        <text
          x={innerWidth / 2}
          y={-30}
          textAnchor="middle"
          style={{ fontSize: "11px", fill: "#333", fontWeight: 500 }}
        >
          {isLog
            ? "GDP per Capita (USD, log scale)"
            : "GDP per Capita (USD, linear scale)"}
        </text>

        {/* Y-axis label */}
        <text
          transform={`translate(${-50}, ${innerHeight / 2}) rotate(-90)`}
          textAnchor="middle"
          style={{ fontSize: "11px", fill: "#333", fontWeight: 500 }}
        >
          Life Expectancy (years)
        </text>

        {/* Bubbles */}
        {sortedData.map((d) => (
          <circle
            key={d.country}
            cx={xScale(d.gdpPercap)}
            cy={yScale(d.lifeExp)}
            r={rScale(d.pop)}
            fill={colorScale(d.continent)}
            fillOpacity={0.65}
            stroke={colorScale(d.continent)}
            strokeWidth={1}
            strokeOpacity={0.9}
          >
            <title>
              {`${d.country}\nContinent: ${d.continent}\nLife Exp: ${d.lifeExp.toFixed(1)} yrs\nGDP/cap: $${format(",.0f")(d.gdpPercap)}\nPop: ${format(",")(d.pop)}`}
            </title>
          </circle>
        ))}

        {/* ---------- Country labels (largest per continent) ---------- */}
        {(() => {
          const largestPerContinent = continents.map((continent) => {
            return data
              .filter((d) => d.continent === continent)
              .sort((a, b) => b.pop - a.pop)[0];
          });

          const labels = largestPerContinent.map((d) => {
            const cx = xScale(d.gdpPercap);
            const cy = yScale(d.lifeExp);
            const r = rScale(d.pop);
            const displayName =
              d.country === "United States" ? "USA" : d.country;

            return {
              ...d,
              cx,
              cy,
              r,
              labelX: cx,
              labelY: cy - r - 10,
              displayName,
              width: displayName.length * 6.5,
              height: 14,
            };
          });

          const iterations = 50;
          for (let iter = 0; iter < iterations; iter++) {
            for (let i = 0; i < labels.length; i++) {
              for (let j = i + 1; j < labels.length; j++) {
                const a = labels[i];
                const b = labels[j];

                const overlapX =
                  a.width / 2 + b.width / 2 + 6 - Math.abs(a.labelX - b.labelX);
                const overlapY =
                  a.height / 2 +
                  b.height / 2 +
                  2 -
                  Math.abs(a.labelY - b.labelY);

                if (overlapX > 0 && overlapY > 0) {
                  if (overlapX < overlapY) {
                    const pushX = overlapX / 2 + 1;
                    if (a.labelX < b.labelX) {
                      a.labelX -= pushX;
                      b.labelX += pushX;
                    } else {
                      a.labelX += pushX;
                      b.labelX -= pushX;
                    }
                  } else {
                    const pushY = overlapY / 2 + 1;
                    if (a.labelY < b.labelY) {
                      a.labelY -= pushY;
                      b.labelY += pushY;
                    } else {
                      a.labelY += pushY;
                      b.labelY -= pushY;
                    }
                  }
                }
              }
            }
          }

          return labels.map((d) => (
            <g key={d.country}>
              <line
                x1={d.cx}
                y1={d.cy - d.r}
                x2={d.labelX}
                y2={d.labelY + 4}
                stroke="#999"
                strokeWidth={0.75}
              />
              <text
                x={d.labelX}
                y={d.labelY}
                textAnchor="middle"
                style={{
                  fontSize: "9px",
                  fontFamily: "sans-serif",
                  fontWeight: 500,
                  stroke: "white",
                  strokeWidth: 3,
                  strokeLinejoin: "round",
                  fill: "white",
                  pointerEvents: "none",
                }}
              >
                {d.displayName}
              </text>
              <text
                x={d.labelX}
                y={d.labelY}
                textAnchor="middle"
                style={{
                  fontSize: "9px",
                  fontFamily: "sans-serif",
                  fill: "#333",
                  fontWeight: 500,
                  pointerEvents: "none",
                }}
              >
                {d.displayName}
              </text>
            </g>
          ));
        })()}

        {/* ---------- Legend ---------- */}
        <g transform={`translate(${innerWidth - 120}, ${innerHeight - 110})`}>
          <rect
            x={-12}
            y={-16}
            width={140}
            height={continents.length * 20 + 12}
            fill="white"
            fillOpacity={0.85}
            stroke="#ccc"
            rx={4}
          />
          {continents.map((continent, i) => (
            <g key={continent} transform={`translate(0, ${i * 20})`}>
              <circle
                cx={0}
                cy={0}
                r={5}
                fill={continentColors[continent]}
                fillOpacity={0.75}
              />
              <text
                x={12}
                dy="0.35em"
                style={{ fontSize: "10px", fill: "#333" }}
              >
                {continent}
              </text>
            </g>
          ))}
        </g>

        {/* ---------- Population size legend ---------- */}
        <g transform={`translate(${innerWidth - 120}, ${innerHeight - 210})`}>
          <text
            y={-40}
            style={{ fontSize: "10px", fill: "#636363", fontWeight: 500 }}
          >
            Population
          </text>
          {[10_000_000, 100_000_000, 500_000_000].map((popVal, i) => {
            const r = rScale(popVal);
            return (
              <g key={popVal} transform={`translate(${i * 42}, 0)`}>
                <circle
                  cx={0}
                  cy={-r / 2}
                  r={r}
                  fill="none"
                  stroke="#999"
                  strokeWidth={1}
                />
                <text
                  y={r / 2 + 12}
                  textAnchor="middle"
                  style={{ fontSize: "8px", fill: "#999" }}
                >
                  {popVal >= 1_000_000
                    ? `${popVal / 1_000_000}M`
                    : format(",")(popVal)}
                </text>
              </g>
            );
          })}
        </g>
      </g>
    </svg>
  );
};

export default BubblePlot;
