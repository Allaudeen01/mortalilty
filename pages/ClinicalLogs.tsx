
import React, { useState } from 'react';
import { ClipboardList, Baby, Pill, Calendar, Search, ArrowRight } from 'lucide-react';
import { MOCK_DELIVERIES, MOCK_TREATMENTS } from '../constants';

const ClinicalLogs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deliveries' | 'treatments' | 'visits'>('deliveries');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Clinical Activity Logs</h2>
          <p className="text-slate-500">Chronological history of all clinical interactions</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('deliveries')}
            className={`flex-1 px-6 py-4 text-sm font-bold flex items-center justify-center space-x-2 transition-colors ${
              activeTab === 'deliveries' ? 'text-indigo-600 bg-indigo-50/50 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Baby size={18} />
            <span>Deliveries</span>
          </button>
          <button 
            onClick={() => setActiveTab('treatments')}
            className={`flex-1 px-6 py-4 text-sm font-bold flex items-center justify-center space-x-2 transition-colors ${
              activeTab === 'treatments' ? 'text-indigo-600 bg-indigo-50/50 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Pill size={18} />
            <span>Treatments</span>
          </button>
          <button 
            onClick={() => setActiveTab('visits')}
            className={`flex-1 px-6 py-4 text-sm font-bold flex items-center justify-center space-x-2 transition-colors ${
              activeTab === 'visits' ? 'text-indigo-600 bg-indigo-50/50 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Calendar size={18} />
            <span>Visits Log</span>
          </button>
        </div>

        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div className="relative w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter by ID or facility..." 
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="text-xs font-bold text-indigo-600 hover:underline flex items-center">
            Download CSV Export
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {activeTab === 'deliveries' && MOCK_DELIVERIES.map((d) => (
            <div key={d.delivery_id} className="p-4 hover:bg-slate-50/50 transition-colors flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  <Baby size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {d.outcome.toUpperCase()} - {d.delivery_mode.toUpperCase()}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center mt-1">
                    <Calendar size={12} className="mr-1" /> {d.delivery_date} · Preg ID: {d.pregnancy_id}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-900">{d.baby_weight}kg</div>
                  <div className="text-[10px] text-slate-400 uppercase font-medium">Birth Weight</div>
                </div>
                <div className="w-px h-8 bg-slate-100"></div>
                <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}

          {activeTab === 'treatments' && MOCK_TREATMENTS.map((t) => (
            <div key={t.treatment_id} className="p-4 hover:bg-slate-50/50 transition-colors flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Pill size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{t.treatment_type}</div>
                  <div className="text-xs text-slate-500 mt-1">{t.medication}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-xs text-slate-400 font-medium">{t.treatment_date}</div>
                <button className="text-xs font-bold text-indigo-600">Details</button>
              </div>
            </div>
          ))}

          {activeTab === 'visits' && (
            <div className="py-12 text-center">
              <ClipboardList size={40} className="mx-auto text-slate-200 mb-3" />
              <p className="text-slate-400 text-sm italic">Connect a facility database to stream live antenatal visits.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicalLogs;
