import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import type { Project } from '@/app/clorga/page';

const ProjectGraph = ({ projects }: { projects: Project[] }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = 800;
    const height = 600;

    // Define the node and link data with type compatibility for D3
    const nodes: d3.SimulationNodeDatum[] = projects.map((project) => ({
      id: project.id,
      name: project.project_name,
      tags: project.project_tags,
    }));

    const links: { source: string; target: string }[] = [];

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

    // D3 force simulation setup
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink<{ source: string; target: string }>(links)
          .id((d: any) => d.id)
          .distance(100)
      )
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', ticked);

    // Clear existing SVG elements
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Render links
    const link = svg
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1.5);

    // Render nodes
    const node = svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 8)
      .attr('fill', 'steelblue');

    function ticked() {
      link
        .attr('x1', (d) => (d.source as any).x)
        .attr('y1', (d) => (d.source as any).y)
        .attr('x2', (d) => (d.target as any).x)
        .attr('y2', (d) => (d.target as any).y);

      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
    }

    function dragstarted(
      event: d3.D3DragEvent<SVGCircleElement, d3.SimulationNodeDatum, unknown>,
      d: d3.SimulationNodeDatum
    ) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(
      event: d3.D3DragEvent<SVGCircleElement, d3.SimulationNodeDatum, unknown>,
      d: d3.SimulationNodeDatum
    ) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(
      event: d3.D3DragEvent<SVGCircleElement, d3.SimulationNodeDatum, unknown>,
      d: d3.SimulationNodeDatum
    ) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Cleanup on component unmount
    return () => simulation.stop();
  }, [projects]);

  return (
    <svg
      ref={svgRef}
      width="800"
      height="600"
      style={{ border: '1px solid black' }}
    />
  );
};

export default ProjectGraph;
