import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { GitBranch, X } from 'lucide-react';
import MetricLineageView from '@/components/MetricLineageView';
import { MOIC_LINEAGE } from '@/data/metricLineage';

const MetricLineageModal = ({ open, onOpenChange }) => (
  <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="metric-lineage-overlay" />
      <DialogPrimitive.Content
        className="metric-lineage-modal"
        data-testid="metric-lineage-modal"
        aria-describedby={undefined}
      >
        <header className="metric-lineage-modal-header">
          <div className="metric-lineage-modal-title-wrap">
            <GitBranch size={16} className="metric-lineage-modal-icon" aria-hidden />
            <DialogPrimitive.Title className="metric-lineage-modal-title">
              Metric Lineage — {MOIC_LINEAGE.metric} — {MOIC_LINEAGE.subtitle}
            </DialogPrimitive.Title>
          </div>
          <DialogPrimitive.Close className="metric-lineage-modal-close" aria-label="Close">
            <X size={18} />
          </DialogPrimitive.Close>
        </header>
        <div className="metric-lineage-modal-body">
          <MetricLineageView />
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
);

export default MetricLineageModal;
