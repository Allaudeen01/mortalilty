
import React from 'react';
import { ShieldCheck, History, User, Clock, HardDrive } from 'lucide-react';
import { MOCK_AUDITS } from '../constants';

const AuditLogs: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">System Audit Trail</h2>
          <p className="text-slate-500">Immutable record of all administrative and clinical actions</p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
          <ShieldCheck size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">Integrity Verified</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Timestamp</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">User ID</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Action Event</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Target Record</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_AUDITS.map((log) => (
              <tr key={log.log_id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center text-xs text-slate-500 font-medium">
                    <Clock size={12} className="mr-2 text-slate-300" />
                    {log.timestamp}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-xs text-slate-700 font-bold">
                    <User size={12} className="mr-2 text-slate-300" />
                    USER_{log.user_id}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                    log.action.includes('CREATE') ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 
                    log.action.includes('UPDATE') ? 'bg-amber-50 text-amber-700 border-amber-100' :
                    'bg-slate-50 text-slate-700 border-slate-100'
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-xs text-slate-500 font-mono">
                    <HardDrive size={12} className="mr-2 text-slate-300" />
                    {log.table_name.toUpperCase()}(#{log.record_id})
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-slate-600 max-w-xs truncate font-medium">
                    {log.details}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
          <span className="text-xs text-slate-400 font-medium">Showing {MOCK_AUDITS.length} system events</span>
          <div className="flex space-x-1">
            <button className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50">Previous</button>
            <button className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
