
import React, { useState } from 'react';
import { Cpu, Database, FolderTree, Terminal, ShieldAlert, BarChart3, Binary, ChevronRight } from 'lucide-react';

const SystemAnalytics: React.FC = () => {
  const [testInput, setTestInput] = useState({ age: 38, hb: 7, bp: 'High' });
  const [prediction, setPrediction] = useState<null | 'HIGH' | 'MEDIUM' | 'LOW'>(null);

  const runMockModel = () => {
    if (testInput.age >= 35 || testInput.hb < 8 || testInput.bp === 'High') {
      setPrediction('HIGH');
    } else {
      setPrediction('LOW');
    }
  };

  const folderStructure = [
    { name: 'backend/', children: [
      { name: 'app/', children: [
        { name: 'main.py' },
        { name: 'api/', children: [
          { name: 'auth.py' }, { name: 'patients.py' }, { name: 'pregnancies.py' }
        ]},
        { name: 'services/', children: [
          { name: 'risk_prediction.py' }, { name: 'analytics_service.py' }
        ]},
        { name: 'database/', children: [
          { name: 'connection.py' }
        ]}
      ]}
    ]},
    { name: 'analytics/', children: [
      { name: 'data_processing.py' },
      { name: 'risk_model.py' },
      { name: 'mortality_analysis.py' },
      { name: 'prediction.py' }
    ]}
  ];

  const RenderTree = ({ items, depth = 0 }: { items: any[], depth?: number }) => (
    <div className="space-y-1">
      {items.map((item, i) => (
        <div key={i} style={{ paddingLeft: `${depth * 20}px` }}>
          <div className="flex items-center space-x-2 text-xs py-0.5">
            {item.children ? (
              <FolderTree size={14} className="text-indigo-400" />
            ) : (
              <Binary size={14} className="text-slate-400" />
            )}
            <span className={item.children ? "font-bold text-slate-300" : "text-slate-500"}>
              {item.name}
            </span>
          </div>
          {item.children && <RenderTree items={item.children} depth={depth + 1} />}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">System Architecture & Intelligence</h2>
          <p className="text-slate-500">Overview of backend services and AI risk models</p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
          <Cpu size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">AI Engine Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Architecture Tree */}
        <div className="lg:col-span-1 bg-slate-900 rounded-xl p-6 shadow-xl overflow-hidden border border-slate-800">
          <div className="flex items-center space-x-2 mb-6">
            <Terminal size={18} className="text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Backend Hierarchy</h3>
          </div>
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono overflow-x-auto">
            <RenderTree items={folderStructure} />
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>Stack: Python / FastAPI / PostgreSQL</span>
              <span className="text-emerald-500">● Live</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed italic">
              "The architecture follows a modular service-oriented pattern, separating clinical logic from AI processing."
            </p>
          </div>
        </div>

        {/* Model Playground */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Binary size={20} className="text-indigo-600" />
              <h3 className="font-bold text-slate-900">Risk Prediction Model Playground</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Maternal Age</label>
                <input 
                  type="number" 
                  value={testInput.age} 
                  onChange={(e) => setTestInput({...testInput, age: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Hemoglobin (g/dL)</label>
                <input 
                  type="number" 
                  value={testInput.hb} 
                  onChange={(e) => setTestInput({...testInput, hb: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Blood Pressure</label>
                <select 
                  value={testInput.bp} 
                  onChange={(e) => setTestInput({...testInput, bp: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High (Hypertensive)</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <button 
                  onClick={runMockModel}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-all flex items-center space-x-2 shadow-md"
                >
                  <Cpu size={18} />
                  <span>Execute Prediction Model</span>
                </button>
              </div>
              
              {prediction && (
                <div className={`flex items-center space-x-4 animate-in zoom-in duration-300`}>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Resulting Risk</div>
                    <div className={`text-2xl font-black ${prediction === 'HIGH' ? 'text-red-600' : 'text-green-600'}`}>
                      {prediction}
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${prediction === 'HIGH' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    <ShieldAlert size={24} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                <BarChart3 size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Mortality Analysis</h4>
                <p className="text-xs text-slate-500 mt-1">Python/Pandas service identifying high-risk regions based on demographic clusters.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                <Database size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Encryption Service</h4>
                <p className="text-xs text-slate-500 mt-1">AES-256 implementation for PHI (Protected Health Information) at rest.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;
