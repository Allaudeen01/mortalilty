
import React, { useState } from 'react';
import { ShieldAlert, AlertCircle, CheckCircle2, Search, BrainCircuit, Activity } from 'lucide-react';
import { MOCK_PREGNANCIES, MOCK_PATIENTS } from '../constants';
import { getRiskAssessment } from '../geminiService';

const Pregnancies: React.FC = () => {
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);
  const [aiResult, setAiResult] = useState<any>(null);

  const handleAiAnalyze = async (pregnancyId: number) => {
    setAnalyzingId(pregnancyId);
    const pregnancy = MOCK_PREGNANCIES.find(p => p.pregnancy_id === pregnancyId)!;
    const patient = MOCK_PATIENTS.find(p => p.patient_id === pregnancy.patient_id)!;
    
    // Simulate some visits data for context
    const mockVisits = [{
      visit_id: 1,
      pregnancy_id: pregnancyId,
      visit_date: '2024-03-01',
      gestational_age_weeks: pregnancy.gestational_age_weeks,
      blood_pressure_systolic: 145,
      blood_pressure_diastolic: 95,
      hemoglobin: 10.2,
      weight: 68.5,
      fetal_heartbeat: true,
      doctor_id: 1,
      hospital_id: 1
    }];

    const result = await getRiskAssessment(patient, pregnancy, mockVisits);
    setAiResult(result);
    setAnalyzingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Active Pregnancies</h2>
          <p className="text-slate-500">Tracking clinical progress and risk levels</p>
        </div>
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold border border-red-200 flex items-center">
            <ShieldAlert size={14} className="mr-1" /> {MOCK_PREGNANCIES.filter(p => p.risk_level === 'high').length} High Risk
          </span>
        </div>
      </div>

      {aiResult && (
        <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg border border-indigo-800 relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <BrainCircuit size={120} />
          </div>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2">
              <BrainCircuit className="text-indigo-300" />
              <h3 className="text-lg font-bold">AI Risk Assessment Insight</h3>
            </div>
            <button onClick={() => setAiResult(null)} className="text-indigo-300 hover:text-white">&times;</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-indigo-300 text-xs font-bold uppercase tracking-wider mb-1">Predicted Score</div>
              <div className="text-4xl font-bold">{aiResult.risk_score}%</div>
              <div className={`inline-block px-2 py-0.5 mt-2 rounded-full text-xs font-bold ${aiResult.risk_level === 'High' ? 'bg-red-500' : 'bg-green-500'}`}>
                {aiResult.risk_level} Priority
              </div>
            </div>
            <div>
              <div className="text-indigo-300 text-xs font-bold uppercase tracking-wider mb-1">Potential Complications</div>
              <ul className="text-sm space-y-1">
                {aiResult.predicted_complications.map((c: string, i: number) => (
                  <li key={i} className="flex items-center">
                    <AlertCircle size={14} className="mr-2 text-indigo-300" /> {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-indigo-300 text-xs font-bold uppercase tracking-wider mb-1">Recommendations</div>
              <ul className="text-sm space-y-1">
                {aiResult.recommendations.map((r: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 size={14} className="mr-2 mt-0.5 text-indigo-300 flex-shrink-0" /> {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_PREGNANCIES.map((preg) => {
          const patient = MOCK_PATIENTS.find(p => p.patient_id === preg.patient_id);
          return (
            <div key={preg.pregnancy_id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 mr-4">
                    <Activity size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{patient?.full_name}</h4>
                    <p className="text-xs text-slate-500">ID: {patient?.unique_patient_code}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  preg.risk_level === 'high' ? 'bg-red-50 text-red-600 border-red-100' : 
                  preg.risk_level === 'medium' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                  'bg-green-50 text-green-600 border-green-100'
                }`}>
                  {preg.risk_level.toUpperCase()} RISK
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-2 bg-slate-50 rounded-lg">
                  <div className="text-xs text-slate-500 mb-1">GA (Weeks)</div>
                  <div className="font-bold text-slate-900">{preg.gestational_age_weeks}</div>
                </div>
                <div className="text-center p-2 bg-slate-50 rounded-lg">
                  <div className="text-xs text-slate-500 mb-1">Gravida</div>
                  <div className="font-bold text-slate-900">{preg.gravida}</div>
                </div>
                <div className="text-center p-2 bg-slate-50 rounded-lg">
                  <div className="text-xs text-slate-500 mb-1">Para</div>
                  <div className="font-bold text-slate-900">{preg.para}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  EDD: <span className="font-bold text-slate-900">{preg.expected_delivery_date}</span>
                </div>
                <button 
                  onClick={() => handleAiAnalyze(preg.pregnancy_id)}
                  disabled={analyzingId === preg.pregnancy_id}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    analyzingId === preg.pregnancy_id 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                  }`}
                >
                  <BrainCircuit size={16} className={analyzingId === preg.pregnancy_id ? 'animate-pulse' : ''} />
                  <span>{analyzingId === preg.pregnancy_id ? 'Analyzing...' : 'AI Risk Audit'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pregnancies;
