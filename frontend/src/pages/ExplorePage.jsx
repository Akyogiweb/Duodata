import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Search, Plus, Filter, ChevronDown, BookOpen, Layers, FileText, Database, Settings, Trash2, X, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import BulkImportDialog from '@/components/BulkImportDialog';
import MetricDetailDrawer from '@/components/MetricDetailDrawer';
import DuodataMark from '@/components/DuodataMark';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const STATUSES = ['Implemented', 'Approved', 'Proposed'];

const StatusPill = ({ status, onChange }) => {
  const cls =
    status === 'Implemented'
      ? 'status-implemented'
      : status === 'Approved'
      ? 'status-approved'
      : 'status-proposed';
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={`status-pill ${cls} hover:opacity-80 transition-opacity cursor-pointer`}>{status}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#141416] border-white/10 text-slate-200">
        <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-slate-500">Set status</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        {STATUSES.map((s) => (
          <DropdownMenuItem key={s} onClick={() => onChange(s)} className="cursor-pointer focus:bg-white/10">
            {s}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
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
    {count !== undefined && <span className="text-[11px] text-slate-500">{count}</span>}
  </div>
);

const FilterChip = ({ label, value, options, onChange, Icon }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-md px-2.5 py-2 text-[12px] text-slate-300 hover:bg-white/10">
        {Icon && <Icon size={12} />}
        <span>{value === 'all' ? label : value}</span>
        <ChevronDown size={12} className="text-slate-500" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="bg-[#141416] border-white/10 text-slate-200">
      <DropdownMenuItem onClick={() => onChange('all')} className="focus:bg-white/10">{label}</DropdownMenuItem>
      <DropdownMenuSeparator className="bg-white/10" />
      {options.map((o) => (
        <DropdownMenuItem key={o} onClick={() => onChange(o)} className="focus:bg-white/10">{o}</DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

const NewSliceDialog = ({ open, onOpenChange, onCreate }) => {
  const [form, setForm] = useState({ name: '', status: 'Proposed', tag: '', owner: '', source: '' });
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    await onCreate({ ...form, tag: form.tag || null, owner: form.owner || null, source: form.source || null });
    setSaving(false);
    setForm({ name: '', status: 'Proposed', tag: '', owner: '', source: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] bg-[#141416] border-white/10 text-slate-100">
        <DialogHeader>
          <DialogTitle className="text-white">New slice</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-3">
          <div className="grid gap-1.5">
            <Label className="text-slate-300">Name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Customer Segment" className="bg-white/5 border-white/10 text-white" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label className="text-slate-300">Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-slate-300">Source</Label>
              <Input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} placeholder="Snowflake" className="bg-white/5 border-white/10 text-white" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label className="text-slate-300">Tag</Label>
              <Input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} placeholder="e.g. Compliance" className="bg-white/5 border-white/10 text-white" />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-slate-300">Owner</Label>
              <Input value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} placeholder="Bryan Mull" className="bg-white/5 border-white/10 text-white" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="text-slate-300 hover:bg-white/10">Cancel</Button>
            <Button type="submit" disabled={saving || !form.name.trim()} className="bg-blue-500 hover:bg-blue-600 text-white">
              {saving ? 'Saving...' : 'Create slice'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const ExplorePage = () => {
  const [slices, setSlices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [newOpen, setNewOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [detailSlice, setDetailSlice] = useState(null);

  const fetchSlices = async () => {
    try {
      const res = await axios.get(`${API}/slices`);
      setSlices(res.data);
    } catch (e) {
      toast({ title: 'Failed to load slices' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSlices(); }, []);

  // Keep drawer in sync with latest slice data after edits
  useEffect(() => {
    if (!detailSlice) return;
    const fresh = slices.find((s) => s.id === detailSlice.id);
    if (fresh && fresh !== detailSlice) setDetailSlice(fresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slices]);

  const sources = useMemo(() => Array.from(new Set(slices.map((s) => s.source).filter(Boolean))), [slices]);

  const filtered = useMemo(() => {
    return slices.filter((s) => {
      if (query && !s.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (statusFilter !== 'all' && s.status !== statusFilter) return false;
      if (sourceFilter !== 'all' && s.source !== sourceFilter) return false;
      return true;
    });
  }, [slices, query, statusFilter, sourceFilter]);

  const updateStatus = async (id, status) => {
    const prev = slices;
    setSlices(slices.map((s) => (s.id === id ? { ...s, status } : s)));
    try {
      const res = await axios.patch(`${API}/slices/${id}`, { status });
      // Merge the fresh server slice back (includes history + updated_at)
      setSlices((cur) => cur.map((s) => (s.id === id ? { ...s, ...res.data } : s)));
      toast({ title: 'Status updated' });
    } catch (e) {
      setSlices(prev);
      toast({ title: 'Update failed' });
    }
  };

  const deleteSlice = async (id) => {
    const prev = slices;
    setSlices(slices.filter((s) => s.id !== id));
    try {
      await axios.delete(`${API}/slices/${id}`);
      toast({ title: 'Slice deleted' });
    } catch (e) {
      setSlices(prev);
    }
  };

  const createSlice = async (payload) => {
    try {
      const res = await axios.post(`${API}/slices`, payload);
      setSlices([...slices, res.data]);
      toast({ title: 'Slice created' });
    } catch (e) {
      toast({ title: 'Create failed' });
    }
  };

  const counts = useMemo(() => ({
    Implemented: slices.filter((s) => s.status === 'Implemented').length,
    Approved: slices.filter((s) => s.status === 'Approved').length,
    Proposed: slices.filter((s) => s.status === 'Proposed').length,
  }), [slices]);

  return (
    <div className="min-h-screen relative">
      <Nav />
      <div className="pt-32 pb-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Live demo — technical workspace</p>
          <h1 className="hero-headline text-[42px] md:text-[64px] text-slate-950 max-w-3xl">
            Define it. Govern it.<br /><span style={{ color: '#1E5FEE' }}>Implement it in real time.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-slate-600 text-[15px] leading-relaxed">
            This is the technical side of Duo Data: a live sandbox for slices, ownership, status, and sources. Every change persists.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-[13px]">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 border border-blue-100">Implemented · {counts.Implemented}</span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-100">Approved · {counts.Approved}</span>
            <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-700 border border-violet-100">Proposed · {counts.Proposed}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="browser-frame">
          <div className="flex items-center gap-2 px-4 py-3 bg-[#141416] border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="mx-auto text-[11px] text-slate-400">app.duodata.ai/slices</div>
          </div>

          <div className="flex bg-[#0f0f10] text-slate-200 min-h-[600px]">
            <aside className="w-[220px] shrink-0 border-r border-white/5 p-4">
              <div className="flex items-center gap-2 mb-6">
                <DuodataMark size={22} />
                <span className="font-semibold text-[14px] text-white">Duodata</span>
              </div>
              <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-2 px-1">Metrics Ontology</div>
              <nav className="flex flex-col gap-1 text-[13px]">
                <SidebarItem Icon={BookOpen} label="Metrics" count={85} />
                <SidebarItem Icon={Layers} label="Slices" count={slices.length} active />
                <SidebarItem Icon={FileText} label="Reports" count={9} />
                <SidebarItem Icon={Database} label="Sources" count={sources.length} />
              </nav>
              <div className="text-[10px] tracking-widest uppercase text-slate-500 mt-6 mb-2 px-1">Governance</div>
              <nav className="flex flex-col gap-1 text-[13px]">
                <SidebarItem Icon={Settings} label="Policies" />
              </nav>
            </aside>

            <main className="flex-1 p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-6 text-[13px]">
                  <span className="text-white font-medium border-b-2 border-blue-400 pb-1">Slices</span>
                  <span className="text-slate-500">List View</span>
                  <span className="text-slate-500">Hierarchy View</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setBulkOpen(true)}
                    variant="outline"
                    className="bg-white/5 border-white/10 text-slate-100 hover:bg-white/10 hover:text-white text-[13px] font-medium px-3 py-1.5 h-auto"
                  >
                    <Upload size={14} className="mr-1.5" /> Bulk import
                  </Button>
                  <Button onClick={() => setNewOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white text-[13px] font-medium px-3 py-1.5 rounded-md flex items-center gap-1.5 h-auto">
                    <Plus size={14} /> New Slice
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-md px-3 py-2 text-[13px]">
                  <Search size={14} className="text-slate-500" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search slices..."
                    className="bg-transparent flex-1 outline-none text-slate-200 placeholder:text-slate-500"
                  />
                  {query && (
                    <button onClick={() => setQuery('')} className="text-slate-500 hover:text-slate-200">
                      <X size={14} />
                    </button>
                  )}
                </div>
                <FilterChip label="All Statuses" value={statusFilter} options={STATUSES} onChange={setStatusFilter} />
                <FilterChip label="All Sources" value={sourceFilter} options={sources} onChange={setSourceFilter} />
                <button className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-md px-2.5 py-2 text-[12px] text-slate-400">
                  <Filter size={12} /> All Tags <ChevronDown size={12} />
                </button>
              </div>

              {loading ? (
                <div className="text-center text-slate-500 py-16 text-[13px]">Loading ontology...</div>
              ) : filtered.length === 0 ? (
                <div className="text-center text-slate-500 py-16 text-[13px]">No slices match your filters.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {filtered.map((s) => (
                    <div
                      key={s.id}
                      className="slice-card group cursor-pointer"
                      onClick={() => setDetailSlice(s)}
                    >
                      <div className="flex items-start justify-between" onClick={(e) => e.stopPropagation()}>
                        <span className="font-semibold text-white text-[14px]">{s.name}</span>
                        <StatusPill status={s.status} onChange={(v) => updateStatus(s.id, v)} />
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        {s.tag && (
                          <div className="text-[11px] text-slate-400 bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5">
                            {s.tag}
                          </div>
                        )}
                        {s.source && (
                          <div className="text-[11px] text-slate-500">{s.source}</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                        <span className="text-[11px] text-slate-500">{s.owner || 'Unowned'}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteSlice(s.id); }}
                          className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <NewSliceDialog open={newOpen} onOpenChange={setNewOpen} onCreate={createSlice} />
      <BulkImportDialog
        open={bulkOpen}
        onOpenChange={setBulkOpen}
        onImported={fetchSlices}
      />
      <MetricDetailDrawer
        slice={detailSlice}
        open={!!detailSlice}
        onOpenChange={(o) => { if (!o) setDetailSlice(null); }}
      />
      <Footer />
    </div>
  );
};

export default ExplorePage;
