
import React from 'react';
import { Skull, AlertTriangle, Clock, MapPin, Search, Filter } from 'lucide-react';
import { MOCK_DEATHS, MOCK_PATIENTS } from '../constants';

const MaternalDeaths: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Death Surveillance Registry</h2>
          <p className="text-slate-500">Clinical auditing and cause of death analysis</p>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-sm flex items-center space-x-2">
          <Skull size={18} />
          <span>Report Maternal Death</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Recent Fatalities Audit</h3>
            <div className="relative w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search records..." 
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {MOCK_DEATHS.map((death) => (
              <div key={death.death_id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full mb-2 inline-block">
                      {death.cause_of_death}
                    </span>
                    <h4 className="font-bold text-slate-900">Patient Case #{death.patient_id}</h4>
                    <div className="flex items-center text-xs text-slate-500 mt-1 space-x-4">
                      <span className="flex items-center"><Clock size={12} className="mr-1" /> {death.death_date} @ {death.death_time}</span>
                      <span className="flex items-center uppercase"><MapPin size={12} className="mr-1" /> {death.place_of_death}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-900 uppercase">{death.stage_of_death} Phase</div>
                    <div className="text-[10px] text-slate-400">Audit Status: Pending Review</div>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex space-x-4">
                    <div className="text-[10px]">
                      <div className="text-slate-400 uppercase font-bold">Delay Type</div>
                      <div className="text-slate-700 font-semibold">Delay in {death.delay_type}</div>
                    </div>
                    <div className="text-[10px]">
                      <div className="text-slate-400 uppercase font-bold">ICU Support</div>
                      <div className="text-slate-700 font-semibold">{death.icu_admission ? 'Admitted' : 'No Admission'}</div>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
                    View Full Audit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center">
              <AlertTriangle size={18} className="mr-2 text-amber-500" />
              Surveillance Alerts
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded text-sm text-amber-800">
                <p className="font-bold mb-1">Spike in PPH Deaths</p>
                <p className="text-xs">Pune district reports 3 deaths due to Hemorrhage in the last 14 days. Suggest audit of blood bank protocols.</p>
              </div>
              <div className="p-3 bg-indigo-50 border-l-4 border-indigo-500 rounded text-sm text-indigo-800">
                <p className="font-bold mb-1">Delay Type Warning</p>
                <p className="text-xs">"Delay in reaching facility" is the leading contributing factor in 60% of rural deaths this quarter.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
            <h3 className="font-bold mb-4">Maternal Death Audit Form</h3>
            <p className="text-slate-400 text-sm mb-6">Standardized WHO surveillance form for capturing social and clinical determinants of mortality.</p>
            <button className="w-full bg-indigo-600 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors">
              Open Audit Tool
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaternalDeaths;
