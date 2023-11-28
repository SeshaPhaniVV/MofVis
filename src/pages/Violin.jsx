import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import VerticalViolinShape from "./VerticalViolinShape";
import  getDataViolin from "../loaders/jsonLoader2";
const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };

const Violin = ({ width, height }) => {
  const data = getDataViolin();
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const { min, max, groups } = useMemo(() => {
    const [min, max] = d3.extent(data.map((d) => d.values));
    const groups = data
      .map((d) => d.name)
      .filter((x, i, a) => a.indexOf(x) == i);
    return { min, max, groups };
  }, [data]);

  const yScale = d3
    .scaleLinear()
    .domain([min, max])
    .range([boundsHeight, 0])
    .nice();

  const xScale = d3
    .scaleBand()
    .range([0, boundsWidth])
    .domain(groups)
    .padding(0.25);

  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();
    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);
  }, [xScale, yScale, boundsHeight]);

  const allShapes = groups.map((group, i) => {
    const groupData = data.filter((d) => d.name === group).map((d) => d.values);
    return (
      <g key={i} transform={`translate(${xScale(group)},0)`}>
        <VerticalViolinShape
          data={groupData}
          yScale={yScale}
          width={xScale.bandwidth()}
          binNumber={20}
        />
      </g>
    );
  });

  return (
    <div>
      <svg width={width} height={height} style={{ display: "inline-block" }}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {allShapes}
        </g>
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        />
        <text
          x={-MARGIN.left + 80}
          y={height - 220}
          transform={`rotate(-90, ${MARGIN.left}, ${height / 2})`}
          textAnchor="middle"
        >
          Angstroms (Å)
        </text>
      </svg>
    </div>
  );
};

export default Violin;
