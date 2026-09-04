import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import MetricLineageView from '@/components/MetricLineageView';
import MetricLineageModal from '@/components/MetricLineageModal';
import { MOIC_LINEAGE } from '@/data/metricLineage';

const MetricLineage = () => {
  const [open, setOpen] = useState(false);

  return (
    <section id="data-lineage" className="py-24 md:py-32 border-y border-black/5 bg-slate-50/80" data-testid="metric-lineage-section">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-3xl mb-10">
          <p className="page-eyebrow">Metric lineage</p>
          <h2 className="hero-headline text-[40px] md:text-[56px] text-slate-950 leading-[0.98]">
            Trace {MOIC_LINEAGE.metric} from source fields to the governed metric.
          </h2>
          <p className="page-description">
            Every node is implemented, versioned, and owned — from realized and unrealized value through to the metric your business reports.
          </p>
        </div>

        <div className="metric-lineage-preview">
          <div className="metric-lineage-preview-chrome">
            <span className="metric-lineage-preview-label">
              Metric Lineage — {MOIC_LINEAGE.metric} — {MOIC_LINEAGE.subtitle}
            </span>
            <button
              type="button"
              className="metric-lineage-expand"
              onClick={() => setOpen(true)}
              data-testid="metric-lineage-expand"
            >
              <Maximize2 size={14} />
              Expand
            </button>
          </div>
          <button
            type="button"
            className="metric-lineage-preview-body"
            onClick={() => setOpen(true)}
            aria-label="Open full MOIC lineage view"
          >
            <MetricLineageView />
          </button>
        </div>
      </div>

      <MetricLineageModal open={open} onOpenChange={setOpen} />
    </section>
  );
};

export default MetricLineage;
