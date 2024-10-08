'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import styles from './d3.module.css';

// type imports
import type { Project } from '../../page';

export default function D3Element({
  projects,
}: {
  projects: Project[] | null;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [isClicked, setIsClicked] = useState(false);

  // Toggle stroke width on button click
  useEffect(() => {
    setStrokeWidth(isClicked ? 1 : 0);
  }, [isClicked]);

  useEffect(() => {
    if (!projects) return;

    const nodes: any[] =
      projects.map((project) => ({
        id: project.id,
        name: project.project_name,
        tags: project.project_tags,
      })) ?? [];

    const links: { source: string | number; target: string | number }[] = [];
    projects.forEach((project, i) => {
      projects.slice(i + 1).forEach((otherProject) => {
        const sharedTags = project.project_tags?.filter((tag: string) =>
          otherProject.project_tags?.includes(tag)
        );
        if (sharedTags && sharedTags.length > 0) {
          links.push({
            source: project.id,
            target: otherProject.id,
          });
        }
      });
    });

    const width = window.innerWidth;
    const height = window.innerHeight;
    setDimensions({ width, height });

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(100)
      )
      .force('charge', d3.forceManyBody().strength(20))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', ticked)
      .stop();

    for (let i = 0; i < 100; i++) simulation.tick();

    // Remove forces after initial layout
    simulation.force('link', null).force('charge', null).alpha(0);

    const link = svg
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', 'black')
      .attr('stroke-opacity', 1)
      .attr('stroke-width', strokeWidth);

    const node = svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('rect')
      .data(nodes)
      .join('rect')
      .attr('class', styles.projectNode)
      .attr('width', 200)
      .attr('height', 40)
      .call(
        d3
          .drag<any, any>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      );

    const labels = svg
      .append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('class', styles.projectLabel)
      .attr('text-anchor', 'middle')
      .text((d: any) => d.name);

    const tags = svg
      .append('g')
      .attr('class', 'tags')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('class', styles.projectLabel)
      .attr('text-anchor', 'middle')
      .text((d: any) => d.tags.join(', '));

    function ticked() {
      link
        .attr('x1', (d) => (d.source as any).x)
        .attr('y1', (d) => (d.source as any).y)
        .attr('x2', (d) => (d.target as any).x)
        .attr('y2', (d) => (d.target as any).y);

      node.attr('x', (d: any) => d.x - 50).attr('y', (d: any) => d.y - 20);

      labels.attr('x', (d: any) => d.x).attr('y', (d: any) => d.y - 5);
      tags.attr('x', (d: any) => d.x).attr('y', (d: any) => d.y + 15);
    }

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [projects]);

  // Update stroke width on the link lines when it changes
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('.links line').attr('stroke-width', strokeWidth);
  }, [strokeWidth]);

  return (
    <>
      <svg
        ref={svgRef}
        width="100%"
        height="auto"
        viewBox={`0 0 ${dimensions.width + 40} ${dimensions.height + 40}`}
        preserveAspectRatio="xMidYMid meet"
      />
      <button
        onClick={() => setIsClicked(!isClicked)}
        style={{ position: 'absolute', left: 20, top: 20, zIndex: 1000 }}
      >
        Toggle Lines
      </button>
    </>
  );
}
