import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Database, GitBranch, Layers, Sparkles, BarChart3, User, Clock, Tag as TagIcon, X, CheckCircle2 } from 'lucide-react';

// Small SVG lineage: Source -> Slice -> Consumers
const MiniLineage = ({ slice, color }) => {
  const source = slice.source || 'Unknown';
  const consumers = ['BI', 'AI Agents', 'Exec Dashboards'];

  return (
    <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-5">
      <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-3">Lineage</div>
      <div className="relative h-[140px]">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 140" preserveAspectRatio="none">
          {/* source -> slice */}
          <path d="M 60 70 C 130 70, 130 70, 200 70" stroke={color} strokeOpacity="0.6" strokeWidth="1.4" fill="none" />
          {/* slice -> consumers */}
          <path d="M 200 70 C 280 70, 280 25, 340 25" stroke={color} strokeOpacity="0.35" strokeWidth="1.4" fill="none" />
          <path d="M 200 70 C 280 70, 280 70, 340 70" stroke={color} strokeOpacity="0.35" strokeWidth="1.4" fill="none" />
          <path d="M 200 70 C 280 70, 280 115, 340 115" stroke={color} strokeOpacity="0.35" strokeWidth="1.4" fill="none" />
        </svg>

        {/* Source node */}
        <div className="absolute" style={{ left: 0, top: 52, width: 90 }}>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
              <Database size={14} className="text-slate-700" />
            </div>
            <span className="text-[10px] text-slate-600 mt-1">{source}</span>
          </div>
        </div>

        {/* Slice node (center, highlighted) */}
        <div className="absolute" style={{ left: 160, top: 48, width: 80 }}>
          <div className="flex flex-col items-center">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center border-2"
              style={{ background: '#fff', borderColor: color }}
            >
              <Layers size={16} style={{ color }} />
            </div>
            <span className="text-[10px] font-semibold text-slate-900 mt-1 truncate max-w-[80px]">{slice.name}</span>
          </div>
        </div>

        {/* Consumers */}
        {consumers.map((c, i) => (
          <div key={c} className="absolute" style={{ left: 310, top: [7, 52, 97][i], width: 90 }}>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                {i === 0 && <BarChart3 size={14} className="text-slate-700" />}
                {i === 1 && <Sparkles size={14} className="text-slate-700" />}
                {i === 2 && <GitBranch size={14} className="text-slate-700" />}
              </div>
              <span className="text-[10px] text-slate-600 mt-1">{c}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const statusColorMap = {
  Implemented: '#3b82f6',
  Approved: '#10b981',
  Proposed: '#8b5cf6',
};

const humanTime = (iso) => {
  try {
    const d = new Date(iso);
    const diff = (Date.now() - d.getTime()) / 1000;
    if (diff < 60) return `${Math.floor(diff)}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return d.toLocaleString();
  } catch {
    return iso;
  }
};

const historyLabel = (action) => {
  if (!action) return 'Change';
  if (action === 'created') return 'Created';
  if (action === 'imported') return 'Imported';
  if (action.startsWith('updated_')) {
    const field = action.replace('updated_', '');
    return `Updated ${field}`;
  }
  return action;
};

const MetricDetailDrawer = ({ slice, open, onOpenChange }) => {
  if (!slice) return null;
  const color = statusColorMap[slice.status] || '#64748b';
  const history = Array.isArray(slice.history) ? [...slice.history].reverse() : [];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-[520px] bg-white overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <span
              className="text-[11px] font-semibold uppercase tracking-widest px-2 py-1 rounded-full"
              style={{ background: `${color}18`, color }}
            >
              {slice.status}
            </span>
            <button onClick={() => onOpenChange(false)} className="p-1 rounded-full hover:bg-slate-100 text-slate-500">
              <X size={16} />
            </button>
          </div>
          <SheetTitle className="hero-headline text-[28px] text-slate-950 leading-tight mt-2">
            {slice.name}
          </SheetTitle>
          <SheetDescription className="text-slate-600 text-[13px]">
            Governed slice in the Duodata metric ontology.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 grid gap-6">
          <div className="grid grid-cols-2 gap-3">
            <InfoCell icon={User} label="Owner" value={slice.owner || 'Unassigned'} />
            <InfoCell icon={Database} label="Source" value={slice.source || '—'} />
            <InfoCell icon={TagIcon} label="Tag" value={slice.tag || '—'} />
            <InfoCell icon={Clock} label="Last updated" value={humanTime(slice.updated_at)} />
          </div>

          <MiniLineage slice={slice} color={color} />

          <div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-3">Edit history</div>
            {history.length === 0 ? (
              <div className="text-[13px] text-slate-500 rounded-xl border border-slate-100 bg-slate-50 p-4">
                No events recorded yet. Status changes, edits and bulk imports will appear here.
              </div>
            ) : (
              <ol className="relative border-l border-slate-200 ml-2 pl-5 space-y-4">
                {history.map((h, i) => (
                  <li key={i} className="relative">
                    <span
                      className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-white border-2"
                      style={{ borderColor: color }}
                    />
                    <div className="text-[13px] text-slate-900 font-medium">
                      {historyLabel(h.action)}
                    </div>
                    <div className="text-[12px] text-slate-500">{h.details || ''}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {h.by || 'system'} · {humanTime(h.at)}
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 flex items-start gap-3">
            <CheckCircle2 size={16} className="text-emerald-600 mt-0.5" />
            <div className="text-[12px] text-slate-600 leading-relaxed">
              This slice is projected into all downstream systems that read from the Duodata ontology.
              Governance changes propagate automatically.
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const InfoCell = ({ icon: Icon, label, value }) => (
  <div className="rounded-xl border border-slate-100 bg-white p-3">
    <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-slate-500">
      <Icon size={12} /> {label}
    </div>
    <div className="text-[13px] font-semibold text-slate-900 mt-1 truncate">{value}</div>
  </div>
);

export default MetricDetailDrawer;
