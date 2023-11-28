import React, { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };
function createData(name, carbon,hydrogen,oxygen,nitrogen) {
  return {
    name,
    carbon,
    hydrogen,
    oxygen,
    nitrogen,
  };
}
const StackedBarplot = ({
  width,
  height,
  structuresData,
}) => {
  const axesRef = useRef(null);
  const data = Object.keys(structuresData).map((key) => {
    const { C, H, O , N} = structuresData[key];
  
    // Perform null checks for C, H, and O
    const carbonCount = C ? C.count : 0;
    const hydrogenCount = H ? H.count : 0;
    const oxygenCount = O ? O.count : 0;
    const nitrogenCount = N ? N.count : 0;
    debugger;
    if(!(carbonCount==0 && hydrogenCount==0 && oxygenCount==0 && nitrogenCount==0)){
      return createData(key, carbonCount, hydrogenCount, oxygenCount,nitrogenCount);
    }else{
      return null;
    }
  }).filter((entry) => entry !== null);;
  console.log(data);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;
  
  const allGroups = data.map((d) => String(d.name));
  const allSubgroups = ["carbon", "hydrogen", "oxygen", "nitrogen"]; 

  const stackSeries = d3.stack().keys(allSubgroups).order(d3.stackOrderNone);
  const series = stackSeries(data);

  const max = 200; // todo
  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, max || 0])
      .range([boundsHeight, 0]);
  }, [data, height]);

  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(allGroups)
      .range([0, boundsWidth])
      .padding(0.1);
  }, [data, width]);

  // var colorScale = d3
  //   .scaleOrdinal()
  //   .domain(allGroups)
  //   .range(["#4b4c4d", "#0fd408", "#0558e8", "#f70505", "#0562f7"]);

  const colorScale = d3.scaleOrdinal()
    .domain(["carbon", "hydrogen", "oxygen", "nitrogen"])
    .range(["#4b4c4d", "#cbcfca", "#f70505", "#0558e8"])

  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();
    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator)
      .selectAll("text")
      .attr("transform", "rotate(-45)") // Rotate the x-axis labels
      .style("text-anchor", "end");

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);
  }, [xScale, yScale, boundsHeight]);
  debugger;
  const rectangles = series.map((subgroup, i) => {
    return (
      <g key={i}>
        {subgroup.map((group, j) => {
          return (
            <rect
              key={j}
              x={xScale(group.data.name)}
              y={yScale(group[1])}
              height={yScale(group[0]) - yScale(group[1])}
              width={xScale.bandwidth()}
              fill={colorScale(subgroup.key)}
              opacity={0.9}
              title={`${group.data.name}\nCarbon: ${group.data.carbon}\nHydrogen: ${group.data.hydrogen}\nOxygen: ${group.data.oxygen}\nNitrogen: ${group.data.nitrogen}`}
            ></rect>
          );
        })}
      </g>
    );
  });
  const Legend = () => {
    return(
    <g 
      transform={`translate(${MARGIN.left  + 20}, ${MARGIN.top})`} 
    >
      {allSubgroups.map((subgroup, i) => (
        <g transform={`translate(0, ${i * 20})`} key={subgroup}>
          <rect width={10} height={10} fill={colorScale(subgroup)}/> 
          <text x={15} y={10} >{subgroup}</text>
        </g>
      ))}
    </g>);
};

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {rectangles}
        </g>
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        />
         {Legend()}
      </svg>
    </div>
  );
};

export default StackedBarplot;
