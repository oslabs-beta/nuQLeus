import React, { Component } from 'react';
import * as d3 from 'd3';

class WaterfallChart extends Component {
 
    render() {
      return (
    this.HorizontalWaterfallChart(data)
      )
}


var data = [
  { name: 'Resolver', count: 100, end: 100 },
  { name: 'Resolver 2', count: 20, end: 120 },
  { name: 'Resolver 3', count: 5, end: 160 },
  { name: 'Resolver 4 ', count: 30, end: 170 },
  { name: 'Resolver 5 ', count: 10, end: 200 },
]; //start time, end time:

function HorizontalWaterfallChart(attachTo, data, maxData) {
  maxData += 10;
  var svgHeight = 500;
  var svgWidth = 500;
  var numTicks = 5;
  var recWidth = d3.min([50, svgHeight / data.length]); // Minimum width of the rect 50px;
  var barPadding = 10;
  var leftMargin = 60;

  var lineHeight = data.length * recWidth;
  // Append the chart and pad it a bit
  var chart = d3
    .select(attachTo)
    .append('svg')
    .attr('class', 'chart')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

  var colorScale = d3.scale.category10();

  // Set the x-axis scale
  var x = d3.scale.linear().domain([0, maxData]).range(['0px', '400px']);
  // X-axis Label
  chart
    .append('g')
    .attr('transform', 'translate(' + svgWidth * 0.6 + ',15)')
    .attr('class', 'gAxisLabel')
    .append('text')
    .text('Performance Data (milliseconds)');
  // The main graph area
  chart = chart
    .append('g')
    .attr('transform', 'translate(' + leftMargin + ',30)')
    .attr('class', 'gMainGraphArea');

  // Set the y-axis scale
  chart
    .append('g')
    .attr('transform', 'translate(' + leftMargin + ',15)')
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'rectWF')
    .attr('x', function (d, i) {
      return x(d.end - d.count);
    })
    .attr('y', function (d, i) {
      return i * recWidth;
    })
    .style('fill', function (d, i) {
      return colorScale(i);
    })
    .attr('height', recWidth)
    .attr('width', 0)
    .on('mouseover', function () {
      d3.selectAll('.rectWF').style('opacity', 0.2);
      d3.select(this).style('opacity', 1);
    })
    .on('mouseout', function () {
      d3.selectAll('.rectWF').style('opacity', 1);
    })
    .transition()
    .duration(1000)
    .attr('width', function (d, i) {
      return x(d.count);
    });

  // Set the values on the bars

  chart
    .append('g')
    .attr('transform', 'translate(' + leftMargin + ',15)')
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'bar')
    .attr('x', function (d, i) {
      return x(d.end - d.count / 2);
    })
    .attr('y', function (d, i) {
      return i * recWidth + recWidth * 0.5;
    })
    .attr('dx', -5) // padding-right
    .attr('dy', '0') // vertical-align: middle
    .attr('text-anchor', 'end'); // text-align: right
  /*.text(function (d, i) {
            return d.count; }
            );*/

  // Set the vertical lines for axis
  chart
    .append('g')
    .attr('transform', 'translate(' + leftMargin + ',15)')
    .selectAll('line')
    .data(x.ticks(numTicks))
    .enter()
    .append('line')
    .attr('x1', x)
    .attr('x2', x)
    .attr('y1', 0)
    .attr('y2', 0)
    .transition()
    .duration(1500)
    .attr('y2', lineHeight)
    .style('stroke', '#ccc');

  // Set the numbering on the lines for axis
  chart
    .append('g')
    .attr('transform', 'translate(' + leftMargin + ',15)')
    .selectAll('.rule')
    .data(x.ticks(numTicks))
    .enter()
    .append('text')
    .attr('class', 'rule')
    .attr('x', x)
    .attr('y', 0)
    .attr('dy', -3)
    .attr('text-anchor', 'middle')
    .text(String);

  var ll = chart.append('g').attr('class', 'gAxis');

  // Set the base line at the left-most corner
  ll.append('line')
    .attr('x1', leftMargin)
    .attr('x2', leftMargin)
    .attr('y1', 15)
    .attr('y2', 15 + lineHeight)
    .style('stroke', '#000');

  ll.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('x', leftMargin - 10)
    .attr('y', function (d, i) {
      return i * recWidth + recWidth * 0.8;
    })
    .attr('dx', -5) // padding-right
    .attr('dy', '0') // vertical-align: middle
    .attr('text-anchor', 'end') // text-align: right
    .text(function (d, i) {
      return d.name;
    });
}

export default WaterfallChart;

