import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { scaleLinear,scaleSequential } from "d3-scale";
import { extent } from "d3-array";
import AxisLeft from "./AxisLeft";
import AxisBottom from "./AxisBottom";
import * as d3 from 'd3';
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
  const customData0 = require('./../json_data/hMOF-0.json');
  const customData1 = require('./../json_data/hMOF-1.json');
  const customData2 = require('./../json_data/hMOF-2.json');
  const customData3 = require('./../json_data/hMOF-3.json');
  const customData4 = require('./../json_data/hMOF-4.json');
  const customData5 = require('./../json_data/hMOF-5.json');
  const customData6 = require('./../json_data/hMOF-6.json');
  const customData7 = require('./../json_data/hMOF-7.json');
  const customData8 = require('./../json_data/hMOF-8.json');
  const customData9 = require('./../json_data/hMOF-9.json');
  const customData10 = require('./../json_data/hMOF-10.json');
  const customData11 = require('./../json_data/hMOF-11.json');
  const customData12 = require('./../json_data/hMOF-12.json');
  const customData13 = require('./../json_data/hMOF-13.json');
  const customData14 = require('./../json_data/hMOF-15.json');
  const customData15 = require('./../json_data/hMOF-25.json');
  let data = [];
  data.push(
    createData(
      customData0.name,
      customData0.void_fraction,
      customData0.surface_area_m2cm3,
      customData0.surface_area_m2g,
      customData0.pld,
      customData0.lcd,
    ),
  );
  data.push(
    createData(
      customData1.name,
      customData1.void_fraction,
      customData1.surface_area_m2cm3,
      customData1.surface_area_m2g,
      customData1.pld,
      customData1.lcd,
    ),
  );
  data.push(
    createData(
      customData2.name,
      customData2.void_fraction,
      customData2.surface_area_m2cm3,
      customData2.surface_area_m2g,
      customData2.pld,
      customData2.lcd,
    ),
  );
  data.push(
    createData(
      customData3.name,
      customData3.void_fraction,
      customData3.surface_area_m2cm3,
      customData3.surface_area_m2g,
      customData3.pld,
      customData3.lcd,
    ),
  );
  data.push(
    createData(
      customData4.name,
      customData4.void_fraction,
      customData4.surface_area_m2cm3,
      customData4.surface_area_m2g,
      customData4.pld,
      customData4.lcd,
    ),
  );
  data.push(
    createData(
      customData5.name,
      customData5.void_fraction,
      customData5.surface_area_m2cm3,
      customData5.surface_area_m2g,
      customData5.pld,
      customData5.lcd,
    ),
  );
  data.push(
    createData(
      customData6.name,
      customData6.void_fraction,
      customData6.surface_area_m2cm3,
      customData6.surface_area_m2g,
      customData6.pld,
      customData6.lcd,
    ),
  );
  data.push(
    createData(
      customData7.name,
      customData7.void_fraction,
      customData7.surface_area_m2cm3,
      customData7.surface_area_m2g,
      customData7.pld,
      customData7.lcd,
    ),
  );
  data.push(
    createData(
      customData8.name,
      customData8.void_fraction,
      customData8.surface_area_m2cm3,
      customData8.surface_area_m2g,
      customData8.pld,
      customData8.lcd,
    ),
  );
  data.push(
    createData(
      customData9.name,
      customData9.void_fraction,
      customData9.surface_area_m2cm3,
      customData9.surface_area_m2g,
      customData9.pld,
      customData9.lcd,
    ),
  );
  data.push(
    createData(
      customData10.name,
      customData10.void_fraction,
      customData10.surface_area_m2cm3,
      customData10.surface_area_m2g,
      customData10.pld,
      customData10.lcd,
    ),
  );
  data.push(
    createData(
      customData11.name,
      customData11.void_fraction,
      customData11.surface_area_m2cm3,
      customData11.surface_area_m2g,
      customData11.pld,
      customData11.lcd,
    ),
  );
  data.push(
    createData(
      customData12.name,
      customData12.void_fraction,
      customData12.surface_area_m2cm3,
      customData12.surface_area_m2g,
      customData12.pld,
      customData12.lcd,
    ),
  );
  data.push(
    createData(
      customData13.name,
      customData13.void_fraction,
      customData13.surface_area_m2cm3,
      customData13.surface_area_m2g,
      customData13.pld,
      customData13.lcd,
    ),
  );
  data.push(
    createData(
      customData14.name,
      customData14.void_fraction,
      customData14.surface_area_m2cm3,
      customData14.surface_area_m2g,
      customData14.pld,
      customData14.lcd,
    ),
  );
  data.push(
    createData(
      customData15.name,
      customData15.void_fraction,
      customData15.surface_area_m2cm3,
      customData15.surface_area_m2g,
      customData15.pld,
      customData15.lcd,
    ),
  );

  return data;
}

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
  const [open, toggle] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const w = 800,
    h = 200,
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

    let colorScale = scaleLinear()
    .domain(lcdExtent)
    .range([0, 360]); 

    return (
      <g style={{zIndex: 10}} transform={`translate(${width + margin.left +12 },${margin.top})`}>
        <defs>
          <linearGradient id="legendGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            {colorScale.ticks(10).map((tick, i) => (
              <stop key={i} offset={`${(i / 9) * 100}%`} stopColor={getHslColor(colorScale(tick))} />
            ))}
          </linearGradient>
        </defs>
        <rect
          x={0}
          y={0}
          width={legendWidth}
          height={legendHeight-150}
          fill="url(#legendGradient)"
        />
        <text x={legendWidth} y={legendHeight-130} textAnchor="middle">
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
    <div  className="textAlign">
      <h6 > Scatter Plot </h6>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left+10},${margin.top-30})translate(0, ${margin.bottom+10})
  translate(${margin.right-50}, 0)`}>
          <AxisLeft yScale={yScale} width={width} />
          <AxisBottom xScale={xScale} height={height} />
          {circles}
          {hovered && <Tooltip x={tooltipPos.x} y={tooltipPos.y} name={hovered} />}
        </g>
        <text 
            x={-margin.left + 80}
            y={height-110}
            transform={`rotate(-90, ${margin.left}, ${height / 2})`}
            textAnchor="middle"
          >
            Surface Area
          </text>
          {ColorLegend()}
      </svg>
      <div>
        <text
          x={width / 2}
          y={height + margin.top + 50 }
          textAnchor="middle"
        >
          Void Fraction
      </text>
      </div>
    </div>
  );
}

export default Scatter;
