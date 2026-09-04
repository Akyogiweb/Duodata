import React from 'react';
import { MOIC_LAYOUT, MOIC_LINEAGE, NODE_H, NODE_W } from '@/data/metricLineage';

const StatusBadge = ({ status }) => (
  <span className="metric-lineage-badge">{status}</span>
);

const LineageNode = ({ node }) => {
  const pos = MOIC_LAYOUT[node.id];
  if (!pos) return null;

  return (
    <div
      className={`metric-lineage-node metric-lineage-node-${node.kind}`}
      style={{ left: pos.x, top: pos.y, width: NODE_W, height: NODE_H }}
      data-testid={`lineage-node-${node.id}`}
    >
      <div className="metric-lineage-node-title">{node.label}</div>
      <div className="metric-lineage-node-code">{node.code}</div>
      <StatusBadge status={node.status} />
    </div>
  );
};

const edgePath = (fromId, toId) => {
  const from = MOIC_LAYOUT[fromId];
  const to = MOIC_LAYOUT[toId];
  const x0 = from.x + NODE_W;
  const y0 = from.y + NODE_H / 2;
  const x1 = to.x;
  const y1 = to.y + NODE_H / 2;
  const dx = Math.max(48, (x1 - x0) * 0.45);
  return `M ${x0} ${y0} C ${x0 + dx} ${y0}, ${x1 - dx} ${y1}, ${x1} ${y1}`;
};

const MetricLineageView = ({ className = '' }) => (
  <div className={`metric-lineage-canvas ${className}`.trim()} data-testid="metric-lineage-view">
    <svg className="metric-lineage-svg" viewBox="0 0 820 380" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {MOIC_LINEAGE.edges.map((edge) => (
        <path
          key={`${edge.from}-${edge.to}`}
          d={edgePath(edge.from, edge.to)}
          className={`metric-lineage-edge metric-lineage-edge-${edge.style}`}
          fill="none"
        />
      ))}
    </svg>
    <div className="metric-lineage-nodes">
      {MOIC_LINEAGE.nodes.map((node) => (
        <LineageNode key={node.id} node={node} />
      ))}
    </div>
  </div>
);

export default MetricLineageView;
