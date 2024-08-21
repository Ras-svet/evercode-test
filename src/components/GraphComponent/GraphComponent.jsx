import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function GraphComponent({ data, isLoading }) {
  const svgRef = useRef(null);

  // Функция для добавления прямоугольника рамки
  const addBorder = (svg, width, height) => {
    svg
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'none')
      .attr('stroke', '#2B2B36')
      .attr('stroke-width', 1)
      .attr('rx', 4)
      .attr('ry', 4);
  };

  // Функция для добавления текста
  const addText = (svg, width, height, text) => {
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height / 2)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .attr('fill', 'black')
      .attr('font-size', '16px')
      .text(text);
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 680;
    const height = 449;

    if (isLoading) {
      addBorder(svg, width, height);
      addText(svg, width, height, 'Loading...');
      return;
    }

    // Проверка на отсутствие данных
    if (
      (Array.isArray(data) && data.length === 0) ||
      (typeof data === 'object' && Object.keys(data).length === 0)
    ) {
      addBorder(svg, width, height);
      addText(svg, width, height, 'No data');
      return;
    }

    const parsedData = data.map((d) => ({
      time: new Date(d.time * 1000),
      volume: d.volume,
    }));

    const x = d3
      .scaleTime()
      .domain(d3.extent(parsedData, (d) => d.time))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(parsedData, (d) => d.volume)])
      .nice()
      .range([height, 0]);

    const line = d3
      .line()
      .x((d) => x(d.time))
      .y((d) => y(d.volume))
      .curve(d3.curveLinear);

    svg
      .append('path')
      .datum(parsedData)
      .attr('fill', 'none')
      .attr('stroke', '#3D96FF')
      .attr('stroke-width', 1)
      .attr('d', line);

    addBorder(svg, width, height);
  }, [data, isLoading]);

  return (
    <svg
      ref={svgRef}
      width={680}
      height={449}
      xmlns="http://www.w3.org/2000/svg"
    />
  );
}

export default GraphComponent;
