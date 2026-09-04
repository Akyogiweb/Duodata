/** MOIC metric lineage graph — technical experience only. */

export const MOIC_LINEAGE = {
  metric: 'MOIC',
  subtitle: 'Multiple on Invested Capital',
  nodes: [
    { id: 'realized', label: 'Realized Value', code: 'REALIZED_VALUE', status: 'Implemented', kind: 'source' },
    { id: 'unrealized', label: 'Unrealized Value', code: 'UNREALIZED_VALUE', status: 'Implemented', kind: 'source' },
    { id: 'total', label: 'Total Value', code: 'TOTAL_VALUE', status: 'Implemented', kind: 'intermediate' },
    { id: 'invested', label: 'Invested Capital', code: 'INVESTED_CAPITAL', status: 'Implemented', kind: 'intermediate' },
    { id: 'moic', label: 'MOIC - Multiple on Invested Capital', code: 'MOIC', status: 'Implemented', kind: 'metric' },
  ],
  edges: [
    { from: 'realized', to: 'total', style: 'dashed' },
    { from: 'unrealized', to: 'total', style: 'dashed' },
    { from: 'total', to: 'moic', style: 'solid' },
    { from: 'invested', to: 'moic', style: 'solid' },
  ],
};

/** Layout positions for the lineage canvas (viewBox coordinates). */
export const MOIC_LAYOUT = {
  realized: { x: 24, y: 72 },
  unrealized: { x: 24, y: 248 },
  total: { x: 300, y: 72 },
  invested: { x: 300, y: 248 },
  moic: { x: 576, y: 160 },
};

export const NODE_W = 220;
export const NODE_H = 108;
