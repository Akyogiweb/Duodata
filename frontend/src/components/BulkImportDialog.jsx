import React, { useMemo, useRef, useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Upload, FileSpreadsheet, ChevronRight, Loader2 } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SAMPLE = `name,status,tag,owner,source
Customer Segment,Proposed,GTM,Bryan Mull,Snowflake
ARR Cohort,Approved,Finance,Sander V.,dbt
Retention Band,Implemented,,Floris J.,Databricks`;

// Simple, forgiving CSV parser (comma-separated; supports quoted fields).
function parseCSV(text) {
  const rows = [];
  let cur = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else { field += ch; }
    } else {
      if (ch === '"') { inQuotes = true; }
      else if (ch === ',') { cur.push(field); field = ''; }
      else if (ch === '\n') { cur.push(field); rows.push(cur); cur = []; field = ''; }
      else if (ch === '\r') { /* skip */ }
      else { field += ch; }
    }
  }
  if (field.length > 0 || cur.length > 0) {
    cur.push(field);
    rows.push(cur);
  }
  return rows.filter((r) => r.some((c) => (c || '').trim().length > 0));
}

function rowsToItems(rows) {
  if (rows.length === 0) return [];
  const headerCandidates = rows[0].map((h) => (h || '').trim().toLowerCase());
  const known = ['name', 'status', 'tag', 'owner', 'source'];
  const hasHeader = headerCandidates.some((h) => known.includes(h));
  const header = hasHeader ? headerCandidates : ['name', 'status', 'tag', 'owner', 'source'];
  const dataRows = hasHeader ? rows.slice(1) : rows;
  return dataRows.map((r) => {
    const item = { name: '', status: null, tag: null, owner: null, source: null };
    header.forEach((h, i) => {
      const val = (r[i] || '').trim();
      if (h === 'name') item.name = val;
      else if (h === 'status') item.status = val || null;
      else if (h === 'tag') item.tag = val || null;
      else if (h === 'owner') item.owner = val || null;
      else if (h === 'source') item.source = val || null;
    });
    return item;
  }).filter((i) => i.name);
}

const BulkImportDialog = ({ open, onOpenChange, onImported }) => {
  const [text, setText] = useState('');
  const [defaultStatus, setDefaultStatus] = useState('Proposed');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const parsedItems = useMemo(() => {
    if (!text.trim()) return [];
    const rows = parseCSV(text);
    return rowsToItems(rows);
  }, [text]);

  const validCount = parsedItems.length;

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setText(String(ev.target.result || ''));
    reader.readAsText(f);
  };

  const submit = async () => {
    if (parsedItems.length === 0) {
      toast({ title: 'Nothing to import', description: 'Paste CSV rows or upload a file first.' });
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/slices/bulk`, {
        items: parsedItems,
        default_status: defaultStatus,
      });
      toast({
        title: 'Import complete',
        description: `Created ${res.data.created}, skipped ${res.data.skipped}.`,
      });
      onImported?.();
      setText('');
      onOpenChange(false);
    } catch (e) {
      toast({ title: 'Import failed', description: 'Please check your CSV format.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px] bg-[#141416] border-white/10 text-slate-100">
        <DialogHeader>
          <DialogTitle className="text-white">Bulk import slices</DialogTitle>
          <DialogDescription className="text-slate-400">
            Paste CSV rows or upload a .csv file. Headers accepted: <code className="text-slate-200">name, status, tag, owner, source</code>.
            Missing statuses fall back to the default.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              onClick={() => fileRef.current?.click()}
              variant="outline"
              className="bg-white/5 border-white/10 text-slate-100 hover:bg-white/10 hover:text-white"
            >
              <Upload size={14} className="mr-2" /> Upload .csv
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="text-slate-300 hover:bg-white/10 hover:text-white"
              onClick={() => setText(SAMPLE)}
            >
              <FileSpreadsheet size={14} className="mr-2" /> Use sample rows
            </Button>
            <div className="flex items-center gap-2 ml-auto">
              <Label className="text-slate-400 text-[12px]">Default status</Label>
              <Select value={defaultStatus} onValueChange={setDefaultStatus}>
                <SelectTrigger className="w-[140px] bg-white/5 border-white/10 text-slate-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Proposed">Proposed</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Implemented">Implemented</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <input ref={fileRef} type="file" accept=".csv,text/csv" onChange={onFile} className="hidden" />
          </div>

          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Paste CSV here, e.g.\n${SAMPLE}`}
            rows={9}
            className="bg-white/5 border-white/10 text-slate-100 font-mono text-[12px]"
          />

          {validCount > 0 && (
            <div className="rounded-lg border border-white/10 bg-white/5 p-3 max-h-[180px] overflow-auto">
              <div className="text-[11px] uppercase tracking-widest text-slate-400 mb-2">
                Preview • {validCount} row{validCount === 1 ? '' : 's'}
              </div>
              <div className="grid gap-1">
                {parsedItems.slice(0, 8).map((it, i) => (
                  <div key={i} className="text-[12px] text-slate-200 flex items-center gap-2">
                    <ChevronRight size={12} className="text-slate-500" />
                    <span className="font-medium">{it.name}</span>
                    <span className="text-slate-400">· {it.status || defaultStatus}</span>
                    {it.source && <span className="text-slate-500">· {it.source}</span>}
                    {it.owner && <span className="text-slate-500">· {it.owner}</span>}
                  </div>
                ))}
                {parsedItems.length > 8 && (
                  <div className="text-[11px] text-slate-500 mt-1">
                    … and {parsedItems.length - 8} more
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-slate-300 hover:bg-white/10 hover:text-white">
            Cancel
          </Button>
          <Button
            onClick={submit}
            disabled={loading || validCount === 0}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {loading && <Loader2 size={14} className="mr-2 animate-spin" />}
            Import {validCount || ''} row{validCount === 1 ? '' : 's'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkImportDialog;
