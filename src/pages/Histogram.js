import { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';

const MARGIN = { top: 30, right: 30, bottom: 40, left: 50 };
const BUCKET_NUMBER = 20;
const BUCKET_PADDING = 4;

const COLORS = ['#e0ac2b', '#e85252', '#6689c6', '#9a6fb0', '#a53253'];

function createData(name, values) {
  return {
    name,
    values,
  };
}

function getData() {
<<<<<<< Updated upstream
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
    return data;
  }
=======
  const customData0 = require('./../json_data/hMOF-0.json');
  const customData1 = require('./../json_data/hMOF-1.json');
  const customData2 = require('./../json_data/hMOF-2.json');
  const customData3 = require('./../json_data/hMOF-3.json');
  const customData4 = require('./../json_data/hMOF-4.json');
  const customData5 = require('./../json_data/hMOF-5.json');
  const customData6 = require('./../json_data/hMOF-6.json');
  const customData7 = require('./../json_data/hMOF-7.json');
  const customData8 = require('./../json_data/hMOF-8.json');
  let data = [];
  let pld = [];
  let lcd = [];
  pld.push(customData0.pld);
  pld.push(customData1.pld);
  pld.push(customData2.pld);
  pld.push(customData3.pld);
  pld.push(customData4.pld);
  pld.push(customData5.pld);
  pld.push(customData6.pld);
  pld.push(customData7.pld);
  pld.push(customData8.pld);
  lcd.push(customData0.lcd);
  lcd.push(customData1.lcd);
  lcd.push(customData2.lcd);
  lcd.push(customData3.lcd);
  lcd.push(customData4.lcd);
  lcd.push(customData5.lcd);
  lcd.push(customData6.lcd);
  lcd.push(customData7.lcd);
  lcd.push(customData8.lcd);
  data.push(createData('pld', pld));
  data.push(createData('lcd', lcd));
  return data;
}
>>>>>>> Stashed changes

const Histogram = () => {
  var width = 600;
  var height = 450;
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;
  var data = getData();
  const allGroupNames = data.map((group) => group.name);
  const colorScale = d3.scaleOrdinal().domain(allGroupNames).range(COLORS);

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
    const max = Math.max(...groupBuckets.map((group) => Math.max(...group.buckets.map((bucket) => bucket?.length))));
    return d3.scaleLinear().range([boundsHeight, 0]).domain([0, max]).nice();
  }, [data, height]);

  const xAxisGenerator = d3.axisBottom(xScale).tickFormat(d => d + ' units'); 

  const yAxisGenerator = d3.axisLeft(yScale).tickFormat(d => d + ' items');

  // Render the X axis using d3.js, not react
  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll('*').remove();

    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append('g')
      .attr('transform', 'translate(0,' + boundsHeight + ')')
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
<<<<<<< Updated upstream
    svgElement.append("g").call(yAxisGenerator);
      // X axis 
    svgElement
    .append("g")
    .attr("transform", "translate(0," + boundsHeight + ")") 
    .call(xAxisGenerator);

    svgElement.append("text")  
    .attr("x", boundsWidth/2)
    .attr("y", boundsHeight + MARGIN.bottom - 5)
    .style("text-anchor", "middle")
    .text("Units");

    // Y axis
    svgElement.append("g").call(yAxisGenerator); 

    svgElement.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - MARGIN.left) 
    .attr("x",0 - (boundsHeight / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Number Of Structures");
=======
    svgElement.append('g').call(yAxisGenerator);
>>>>>>> Stashed changes
  }, [xScale, yScale, boundsHeight]);
  
  var widthrect = 0;
  var rectWidth = 0;

  const allRects = groupBuckets.map((group, i) =>
    group.buckets.map((bucket, j) => {
      const { x0, x1 } = bucket;
      widthrect = xScale(x1) - xScale(x0) - BUCKET_PADDING;
      rectWidth = Math.max(0, widthrect);
      if (x0 == undefined || x1 == undefined) {
        return null;
      }

      return (
        <rect
          key={i + '_' + j}
          fill={colorScale(group.name)}
          opacity={0.7}
          x={xScale(x0) + BUCKET_PADDING / 2}
          width={rectWidth}
          y={yScale(bucket.length)}
          height={boundsHeight - yScale(bucket.length)}
        />
      );
    }),
  );


  return (
<<<<<<< Updated upstream
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
      <g transform={`translate(${width, 50})`}>
        {allGroupNames.map((name, i) => (
          <g key={name}>
            <rect fill={colorScale(name)} y={i * 20} width={20} height={20} />
            <text x={30} y={i * 20 + 15}>{name}</text>
    </g>
  ))}
</g>
    </svg>
    
  </div>
    
    
=======
    <div>
      <svg width={width} height={height}>
        <g width={boundsWidth} height={boundsHeight} transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}>
          {allRects}
        </g>
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
        />
      </svg>
    </div>
>>>>>>> Stashed changes
  );
};

export default Histogram;
