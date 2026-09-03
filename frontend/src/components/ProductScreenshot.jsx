import React from 'react';
import { slicesMock } from '@/mock';
import { Search, Plus, Filter, ChevronDown, BookOpen, Layers, FileText, Database, Settings } from 'lucide-react';
import DuodataMark from '@/components/DuodataMark';

const StatusPill = ({ status }) => {
  const cls =
    status === 'Implemented'
      ? 'status-implemented'
      : status === 'Approved'
      ? 'status-approved'
      : 'status-proposed';
  return <span className={`status-pill ${cls}`}>{status}</span>;
};

const ProductScreenshot = () => {
  return (
    <section className="relative py-24 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">
            The technical experience
          </p>
          <h2 className="hero-headline text-[42px] md:text-[64px] text-slate-950">
            One workspace for<br />
            <span style={{ color: '#1E5FEE' }}>meaning that ships.</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-slate-600 text-[15px] leading-relaxed">
            Metrics, slices, reports, sources, formulas, lineage, versions, and platform mappings — the machinery behind every trusted business answer.
          </p>
        </div>

        <div className="browser-frame">
          {/* Browser bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#141416] border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="mx-auto text-[11px] text-slate-400">app.duodata.ai/slices</div>
          </div>

          {/* App shell */}
          <div className="flex bg-[#0f0f10] text-slate-200 min-h-[560px]">
            {/* Sidebar */}
            <aside className="w-[220px] shrink-0 border-r border-white/5 p-4">
              <div className="flex items-center gap-2 mb-6">
                <DuodataMark size={22} />
                <span className="font-semibold text-[14px] text-white">Duodata</span>
              </div>
              <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-2 px-1">Metrics Ontology</div>
              <nav className="flex flex-col gap-1 text-[13px]">
                <SidebarItem Icon={BookOpen} label="Metrics" count={85} />
                <SidebarItem Icon={Layers} label="Slices" count={16} active />
                <SidebarItem Icon={FileText} label="Reports" count={9} />
                <SidebarItem Icon={Database} label="Sources" count={7} />
              </nav>
              <div className="text-[10px] tracking-widest uppercase text-slate-500 mt-6 mb-2 px-1">Governance</div>
              <nav className="flex flex-col gap-1 text-[13px]">
                <SidebarItem Icon={Settings} label="Policies" />
              </nav>
            </aside>

            {/* Main */}
            <main className="flex-1 p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-6 text-[13px]">
                  <span className="text-white font-medium border-b-2 border-blue-400 pb-1">Slices</span>
                  <span className="text-slate-400">List View</span>
                  <span className="text-slate-400">Hierarchy View</span>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-[13px] font-medium px-3 py-1.5 rounded-md flex items-center gap-1.5">
                  <Plus size={14} /> New Slice
                </button>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-md px-3 py-2 text-[13px]">
                  <Search size={14} className="text-slate-500" />
                  <span className="text-slate-500">Search slices...</span>
                </div>
                <DropChip label="All Statuses" />
                <DropChip label="All Sources" />
                <DropChip Icon={Filter} label="All Tags" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {slicesMock.map((s, i) => (
                  <div key={i} className="slice-card">
                    <div className="flex items-start justify-between">
                      <span className="font-semibold text-white text-[14px]">{s.name}</span>
                      <StatusPill status={s.status} />
                    </div>
                    {s.tag && (
                      <div className="mt-3 inline-block text-[11px] text-slate-400 bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5">
                        {s.tag}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

const SidebarItem = ({ Icon, label, count, active }) => (
  <div
    className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
      active ? 'bg-blue-500/10 text-blue-300' : 'text-slate-300 hover:bg-white/5'
    }`}
  >
    <div className="flex items-center gap-2">
      <Icon size={14} />
      <span>{label}</span>
    </div>
    {count !== undefined && (
      <span className="text-[11px] text-slate-500">{count}</span>
    )}
  </div>
);

const DropChip = ({ label, Icon }) => (
  <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-md px-2.5 py-2 text-[12px] text-slate-300 cursor-pointer hover:bg-white/10">
    {Icon && <Icon size={12} />}
    <span>{label}</span>
    <ChevronDown size={12} className="text-slate-500" />
  </div>
);

export default ProductScreenshot;
