import React from 'react';
import { footerColumns } from '@/mock';

const Footer = () => (
  <footer className="bg-[#0a0a0b] text-slate-300 pt-20 pb-10">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-white/95 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-900" />
            </div>
            <span className="font-semibold text-white text-[17px]">Duodata</span>
          </div>
          <p className="text-[13px] leading-relaxed text-slate-400 max-w-xs">
            The business-approved metric context platform. Governed meaning for your data platform and AI.
          </p>
        </div>
        {footerColumns.map((col) => (
          <div key={col.title}>
            <div className="text-[12px] tracking-widest uppercase text-slate-500 mb-4">{col.title}</div>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-[13px] text-slate-300 hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="section-divider mt-14 mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)' }} />
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-slate-500">
        <div>© {new Date().getFullYear()} Duodata. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Security</a>
          <a href="#" className="hover:text-white">Status</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
