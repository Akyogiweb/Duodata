import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useInView from '@/hooks/useInView';
import DarkBanner from './DarkBanner';

const PHI = (1 + Math.sqrt(5)) / 2;
const rawVertices = [
  [0, 1, PHI], [0, -1, PHI], [0, 1, -PHI], [0, -1, -PHI],
  [1, PHI, 0], [-1, PHI, 0], [1, -PHI, 0], [-1, -PHI, 0],
  [PHI, 0, 1], [-PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, -1],
];

const project = ([x, y, z]) => {
  const yaw = Math.PI / 5;
  const pitch = -Math.PI / 9;
  const x1 = x * Math.cos(yaw) + z * Math.sin(yaw);
  const z1 = -x * Math.sin(yaw) + z * Math.cos(yaw);
  const y1 = y * Math.cos(pitch) - z1 * Math.sin(pitch);
  return { x: 600 + x1 * 112, y: 315 - y1 * 112, z: y * Math.sin(pitch) + z1 * Math.cos(pitch) };
};

const IcosahedronBanner = () => {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const reduced = useReducedMotion();
  const { vertices, edges } = useMemo(() => {
    const projected = rawVertices.map(project);
    const connected = [];
    rawVertices.forEach((a, i) => rawVertices.slice(i + 1).forEach((b, offset) => {
      const distance = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
      if (Math.abs(distance - 2) < 0.001) connected.push([i, i + offset + 1]);
    }));
    return { vertices: projected, edges: connected.sort((a, b) => projected[a[0]].z - projected[b[0]].z) };
  }, []);

  return (
    <DarkBanner
      index="03"
      eyebrow="The metric ontology"
      title={<>One semantic model. <span className="text-cyan-400">Every decision connected.</span></>}
      subtitle="An exact network of governed relationships keeps every metric traceable as conditions, systems, and questions change."
      testId="icosahedron-banner"
    >
      <div ref={ref} className="absolute inset-0" data-testid="icosahedron-visualization">
        <svg
          viewBox="0 0 1200 640"
          className="h-full w-full"
          role="img"
          aria-labelledby="icosahedron-title icosahedron-description"
          data-testid="icosahedron-svg"
        >
          <title id="icosahedron-title">Exact metric ontology network</title>
          <desc id="icosahedron-description">An exact projected icosahedron draws thirty edges between twelve semantic vertices.</desc>
          <defs>
            <filter id="ico-glow" x="-300%" y="-300%" width="700%" height="700%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <circle cx="600" cy="315" r="250" fill="none" stroke="white" strokeOpacity="0.05" />
          <circle cx="600" cy="315" r="210" fill="none" stroke="white" strokeOpacity="0.035" />
          <line x1="600" y1="54" x2="600" y2="576" stroke="white" strokeOpacity="0.06" />
          <line x1="338" y1="315" x2="862" y2="315" stroke="white" strokeOpacity="0.06" />

          {edges.map(([a, b], index) => (
            <motion.line
              key={`${a}-${b}`}
              x1={vertices[a].x}
              y1={vertices[a].y}
              x2={vertices[b].x}
              y2={vertices[b].y}
              stroke={index % 5 === 0 ? '#06B6D4' : '#FFFFFF'}
              strokeOpacity={index % 5 === 0 ? 0.65 : 0.24}
              strokeWidth={index % 5 === 0 ? 1.6 : 1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : index * 0.035, ease: [0.16, 1, 0.3, 1] }}
              data-testid={`icosahedron-edge-${index + 1}`}
            />
          ))}

          {vertices.map((vertex, index) => (
            <motion.circle
              key={index}
              cx={vertex.x}
              cy={vertex.y}
              r={index % 3 === 0 ? 5 : 3.5}
              fill={index % 3 === 0 ? '#06B6D4' : '#FFFFFF'}
              filter={index % 3 === 0 ? 'url(#ico-glow)' : undefined}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: [0, 1, 0.65], scale: [0, 1.35, 1] } : { opacity: 0, scale: 0 }}
              transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.7 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${vertex.x}px ${vertex.y}px` }}
              data-testid={`icosahedron-vertex-${index + 1}`}
            />
          ))}

          <g data-testid="icosahedron-core-label">
            <circle cx="600" cy="315" r="70" fill="#090909" fillOpacity="0.92" stroke="white" strokeOpacity="0.12" />
            <text x="600" y="303" textAnchor="middle" fill="white" fontSize="12" letterSpacing="2">METRIC</text>
            <text x="600" y="335" textAnchor="middle" fill="#67E8F9" fontSize="22" fontWeight="700">Ontology</text>
          </g>

          <text x="102" y="104" fill="white" fillOpacity="0.42" fontSize="11" letterSpacing="1.5">12 SEMANTIC VERTICES</text>
          <text x="1098" y="104" textAnchor="end" fill="white" fillOpacity="0.42" fontSize="11" letterSpacing="1.5">30 GOVERNED EDGES</text>
          <text x="102" y="552" fill="white" fillOpacity="0.42" fontSize="11" letterSpacing="1.5">ONE SHARED MEANING</text>
          <text x="1098" y="552" textAnchor="end" fill="white" fillOpacity="0.42" fontSize="11" letterSpacing="1.5">CONTINUOUS LINEAGE</text>
        </svg>
      </div>
    </DarkBanner>
  );
};

export default IcosahedronBanner;