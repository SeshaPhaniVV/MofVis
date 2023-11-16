import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 40, left: 50 };
const BUCKET_NUMBER = 20;
const BUCKET_PADDING = 4;

const COLORS = ["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253"];

function createData(name, values) {
    return {
      name,
      values
    };
  }

function getData() {
    const customData0 = require("./../json_data/hMOF-0.json");
    const customData1 = require("./../json_data/hMOF-1.json");
    const customData2 = require("./../json_data/hMOF-2.json");
    const customData3 = require("./../json_data/hMOF-3.json");
    const customData4 = require("./../json_data/hMOF-4.json");
    const customData5 = require("./../json_data/hMOF-5.json");
    const customData6 = require("./../json_data/hMOF-6.json");
    const customData7 = require("./../json_data/hMOF-7.json");
    const customData8 = require("./../json_data/hMOF-8.json");
    let data = [];
    let pld = [];
    let lcd = [];
    pld.push( customData0.pld);
    pld.push( customData1.pld);
    pld.push( customData2.pld);
    pld.push( customData3.pld);
    pld.push( customData4.pld);
    pld.push( customData5.pld);
    pld.push( customData6.pld);
    pld.push( customData7.pld);
    pld.push( customData8.pld);
    lcd.push( customData0.lcd);
    lcd.push( customData1.lcd);
    lcd.push( customData2.lcd);
    lcd.push( customData3.lcd);
    lcd.push( customData4.lcd);
    lcd.push( customData5.lcd);
    lcd.push( customData6.lcd);
    lcd.push( customData7.lcd);
    lcd.push( customData8.lcd);
    data.push(createData('pld',pld));
    data.push(createData('lcd',lcd));
    debugger;
    return data;
  }

const Histogram =() => {
  var width = 600;
  var height = 400;
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;
  var data = getData();
  const allGroupNames = data.map((group) => group.name);
  const colorScale = d3
    .scaleOrdinal()
    .domain(allGroupNames)
    .range(COLORS);

  const xScale = useMemo(() => {
    const maxPerGroup = data.map((group) => Math.max(...group.values));
    const max = Math.max(...maxPerGroup);
    return d3.scaleLinear().domain([0, max]).range([10, boundsWidth]).nice();
  }, [data, width]);

  const bucketGenerator = useMemo(() => {
    return d3
      .bin()
      .value((d) => d)
      .domain(xScale.domain())
      .thresholds(xScale.ticks(BUCKET_NUMBER));
  }, [xScale]);

  const groupBuckets = useMemo(() => {
    return data.map((group) => {
      return { name: group.name, buckets: bucketGenerator(group.values) };
    });
  }, [data]);

  const yScale = useMemo(() => {
    const max = Math.max(
      ...groupBuckets.map((group) =>
        Math.max(...group.buckets.map((bucket) => bucket?.length))
      )
    );
    return d3.scaleLinear().range([boundsHeight, 0]).domain([0, max]).nice();
  }, [data, height]);

  // Render the X axis using d3.js, not react
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

  const allRects = groupBuckets.map((group, i) =>
    group.buckets.map((bucket, j) => {
      const { x0, x1 } = bucket;
      if (x0 == undefined || x1 == undefined) {
        return null;
      }
      return (
        <rect
          key={i + "_" + j}
          fill={colorScale(group.name)}
          opacity={0.7}
          x={xScale(x0) + BUCKET_PADDING / 2}
          width={xScale(x1) - xScale(x0) - BUCKET_PADDING}
          y={yScale(bucket.length)}
          height={boundsHeight - yScale(bucket.length)}
        />
      );
    })
  );

  // useEffect(() => {
  //   const legendElement = d3.select(legendRef.current);
  //   legendElement.selectAll("*").remove();

  //   const legend = legendElement
  //     .selectAll(".legend")
  //     .data(allGroupNames)
  //     .enter()
  //     .append("g")
  //     .attr("class", "legend")
  //     .attr("transform", (d, i) => `translate(0,${i * 20})`);

  //   legend
  //     .append("rect")
  //     .attr("x", width - 18)
  //     .attr("width", 18)
  //     .attr("height", 18)
  //     .style("fill", (d) => colorScale(d));

  //   legend
  //     .append("text")
  //     .attr("x", width - 24)
  //     .attr("y", 9)
  //     .attr("dy", ".35em")
  //     .style("text-anchor", "end")
  //     .text((d) => d);
  // }, [allGroupNames, width]);


  return (
    <div>
      <svg width={width} height={height}>
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      >
        {allRects}
      </g>
      <g
        width={boundsWidth}
        height={boundsHeight}
        ref={axesRef}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      />
    </svg>
    </div>
    
    
  );
};

export default Histogram;
