import React, { useEffect, useRef } from 'react';
import useSVGCanvas from './../useSVGCanvas.js';
import * as d3 from 'd3';

export default function ScatterPlot() {
  const d3Container = useRef(null);
  const [svg, height, width, tTip] = useSVGCanvas(d3Container);

  useEffect(() => {
    if (svg !== undefined) {
      var data = d3.csv('/Users/srikanthkyatham/class529/MofVis/src/pages/data.csv', function (data) {
        console.log(data);
      });
      //height = 300;
      const x = d3.scaleLinear().domain([0, 4000]).range([0, width]);
      svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));

      // Add Y axis
      const y = d3.scaleLinear().domain([0, 500000]).range([height, 0]);
      svg.append('g').call(d3.axisLeft(y));

      svg
        .append('g')
        .selectAll('dot')
        .data(data)
        .join('circle')
        .attr('cx', function (d) {
          return x(d.GrLivArea);
        })
        .attr('cy', function (d) {
          return y(d.SalePrice);
        })
        .attr('r', 1.5)
        .style('fill', '#69b3a2');
    }
  }, [svg]);

  return <div className={'d3-component'} style={{ height: '99%', width: '99%' }} ref={d3Container}></div>;
}
