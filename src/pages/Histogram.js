import { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';

const MARGIN = { top: 30, right: 30, bottom: 40, left: 50 };
const BUCKET_NUMBER = 20;
const BUCKET_PADDING = 4;

const COLORS = ['#3181CC', '#DD0B17'];

function createData(name, value) {
  return {
    name,
    value,
  };
}

function getData() {
  let data = [];
  let pld = [];
  let lcd = [];

  const numberOfFiles = 15; // Adjust this number based on your actual number of files
  for (let i = 0; i <= numberOfFiles; i++) {
    const customData = require(`./../json_data/hMOF-${i}.json`);
    pld.push(customData.pld);
    lcd.push(customData.lcd);
  }

  data.push(createData('pld', pld));
  data.push(createData('lcd', lcd));

  return data;
}

const Histogram = () => {
  var width = 500;
  var height = 250;
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

  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll('*').remove();

    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append('g')
      .attr('transform', 'translate(0,' + boundsHeight + ')')
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append('g').call(yAxisGenerator);

    svgElement
      .append('g')
      .attr('transform', 'translate(0,' + boundsHeight + ')')
      .call(xAxisGenerator);

    svgElement
      .append('text')
      .attr('x', boundsWidth / 2)
      .attr('y', boundsHeight + MARGIN.bottom - 5)
      .style('text-anchor', 'middle')
      .text('Units');

    svgElement.append('g').call(yAxisGenerator);

    svgElement
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - MARGIN.left)
      .attr('x', 0 - boundsHeight / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Number Of Structures');
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
        <g transform={`translate(${(width, 50)})`}>
          {allGroupNames.map((name, i) => (
            <g key={name}>
              <rect fill={colorScale(name)} y={i * 20} width={20} height={20} />
              <text x={30} y={i * 20 + 15}>
                {name}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default Histogram;
