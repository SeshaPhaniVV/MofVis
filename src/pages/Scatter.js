<<<<<<< Updated upstream
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import AxisLeft from './AxisLeft';
import AxisBottom from './AxisBottom';
import { debounce } from 'lodash';

function createData(name, void_fraction, surface_area_m2cm3, surface_area_m2g, pld, lcd) {
  return {
    name,
    void_fraction,
    surface_area_m2cm3,
    surface_area_m2g,
    pld,
    lcd,
  };
}

function getData() {
  const numberOfFiles = 16;

  return Array.from({ length: numberOfFiles }, (_, index) => {
    const customData = require(`./../json_data/hMOF-${index}.json`);
    return createData(
      customData.name,
      customData.void_fraction,
      customData.surface_area_m2cm3,
      customData.surface_area_m2g,
      customData.pld,
      customData.lcd,
    );
  });
}

=======
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { scaleLinear,scaleSequential } from "d3-scale";
import { extent } from "d3-array";
import AxisLeft from "./AxisLeft";
import AxisBottom from "./AxisBottom";
import getData from "../loaders/jsonLoader";
import * as d3 from 'd3';
import { debounce } from 'lodash';

>>>>>>> Stashed changes
const Tooltip = React.memo(({ x, y, name }) => (
  <g>
    <text x={x} y={y} textAnchor="middle">
      {name}
    </text>
  </g>
));
const getHslColor = (hue) => `hsl(${hue}, 100%, 50%)`;
function Scatter() {
  const [data, setData] = useState(getData());
  const [hovered, setHovered] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const w = 800,
    h = 350,
    margin = {
      top: 10,
      bottom: 20,
      left: 40,
      right: 40,
    };

  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;
  const lcdExtent = extent(data, (d) => d.lcd);
  const xScale = scaleLinear()
    .domain(extent(data, (d) => d.void_fraction))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(data, (d) => d.surface_area_m2cm3))
    .range([height, 0]);

  let colorScale = scaleLinear().domain(lcdExtent).range([0, 360]);
  const rScale = scaleLinear()
    .domain(extent(data, (d) => d.pld))
    .range([5, 10]);
  const props = useSpring({
    from: { fill: getHslColor(colorScale(3)) },
    to: { fill: getHslColor(colorScale(15)) },
  });

  const ColorLegend = () => {
    const legendWidth = 8;
    const legendHeight = 320;

    let colorScale = scaleLinear().domain(lcdExtent).range([0, 360]);

    return (
      <g style={{ zIndex: 10 }} transform={`translate(${width + margin.left + 12},${margin.top})`}>
        <defs>
          <linearGradient id="legendGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            {colorScale.ticks(10).map((tick, i) => (
              <stop key={i} offset={`${(i / 9) * 100}%`} stopColor={getHslColor(colorScale(tick))} />
            ))}
          </linearGradient>
        </defs>
        <rect x={0} y={0} width={legendWidth} height={legendHeight - 150} fill="url(#legendGradient)" />
        <text x={legendWidth} y={legendHeight - 130} textAnchor="middle">
          LCD
        </text>
      </g>
    );
  };

  const circles = data.map((d, i) => (
    <animated.circle
      key={i}
      r={rScale(d.pld)}
      cx={xScale(d.void_fraction)}
      cy={yScale(d.surface_area_m2cm3)}
      style={{ fill: getHslColor(colorScale(d.lcd)) }}
      onMouseEnter={() => {
        setHovered(d.name);
        setTooltipPos({
          x: xScale(d.void_fraction),
          y: yScale(d.surface_area_m2cm3),
        });
        const debouncedSetHovered = debounce(setHovered, 100);
        debouncedSetHovered(d.name);
      }}
      onMouseLeave={() => {
        setHovered(null);
      }}
    />
  ));

  return (
    <div className="textAlign">
      <h6> Scatter Plot </h6>
      <svg width={w} height={h}>
        <g
          transform={`translate(${margin.left + 10},${margin.top - 30})translate(0, ${margin.bottom + 10})
  translate(${margin.right - 50}, 0)`}
        >
          <AxisLeft yScale={yScale} width={width} />
          <AxisBottom xScale={xScale} height={height} />
          {circles}
          {hovered && <Tooltip x={tooltipPos.x} y={tooltipPos.y} name={hovered} />}
        </g>
        <text
          x={-margin.left + 80}
          y={height - 110}
          transform={`rotate(-90, ${margin.left}, ${height / 2})`}
          textAnchor="middle"
        >
          Surface Area
        </text>
        {ColorLegend()}
      </svg>
      <div>
        <text x={width / 2} y={height + margin.top + 50} textAnchor="middle">
          Void Fraction
        </text>
      </div>
    </div>
  );
}

export default Scatter;
