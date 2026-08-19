import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { CheckCircle2, Loader2 } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const emptyForm = {
  name: '',
  email: '',
  company: '',
  role: '',
  company_size: '',
  use_case: '',
  message: '',
};

const BookDemoModal = ({ open, onOpenChange }) => {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (k, v) => setForm({ ...form, [k]: v });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) {
      toast({ title: 'Missing fields', description: 'Please share name, work email and company.' });
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/demo-requests`, form);
      setSuccess(true);
      toast({ title: 'Demo request received', description: 'Andreas from Duodata will reach out within one business day.' });
    } catch (err) {
      toast({ title: 'Something went wrong', description: err?.response?.data?.detail?.[0]?.msg || 'Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (isOpen) => {
    if (!isOpen) {
      setTimeout(() => {
        setForm(emptyForm);
        setSuccess(false);
      }, 200);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[520px] bg-white">
        {success ? (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">You’re on the list</h3>
            <p className="text-slate-600 text-sm mt-2 max-w-sm">
              Andreas will send a Reclaim link within one business day so we can walk through the metric ontology on your stack.
            </p>
            <Button onClick={() => handleClose(false)} className="mt-6 bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-slate-900">Book a Duodata demo</DialogTitle>
              <DialogDescription>
                45 minutes with Andreas. We’ll map Duodata onto your metric chaos and show governed context in action.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submit} className="grid gap-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="name">Full name *</Label>
                  <Input id="name" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Ashish Kumar" />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="email">Work email *</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="ashish@company.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="company">Company *</Label>
                  <Input id="company" value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Acme Capital" />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" value={form.role} onChange={(e) => update('role', e.target.value)} placeholder="Head of Data Platform" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label>Company size</Label>
                  <Select value={form.company_size} onValueChange={(v) => update('company_size', v)}>
                    <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-100">1 – 100</SelectItem>
                      <SelectItem value="100-500">100 – 500</SelectItem>
                      <SelectItem value="500-1000">500 – 1,000</SelectItem>
                      <SelectItem value="1000-5000">1,000 – 5,000</SelectItem>
                      <SelectItem value="5000+">5,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label>Primary use case</Label>
                  <Select value={form.use_case} onValueChange={(v) => update('use_case', v)}>
                    <SelectTrigger><SelectValue placeholder="Select use case" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric_governance">Metric governance</SelectItem>
                      <SelectItem value="ai_context">AI / copilot context</SelectItem>
                      <SelectItem value="semantic_layer">Semantic layer alignment</SelectItem>
                      <SelectItem value="kpi_ontology">KPI ontology</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="message">Anything specific you want to see?</Label>
                <Textarea id="message" rows={3} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="e.g. how Duodata projects into Snowflake Semantic Views" />
              </div>
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => handleClose(false)} className="rounded-full">Cancel</Button>
                <Button type="submit" disabled={loading} className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5">
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {loading ? 'Submitting...' : 'Request demo'}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookDemoModal;
