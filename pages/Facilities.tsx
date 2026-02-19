
import React from 'react';
import { Building2, Stethoscope, Mail, Phone, ExternalLink, ShieldCheck } from 'lucide-react';
import { MOCK_HOSPITALS, MOCK_DOCTORS } from '../constants';

const Facilities: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Healthcare Facilities</h2>
          <p className="text-slate-500">Manage hospitals, clinics, and medical staff registries</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 shadow-sm flex items-center">
            <Building2 size={16} className="mr-2" /> Add Hospital
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 shadow-sm flex items-center">
            <Stethoscope size={16} className="mr-2" /> Onboard Doctor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {MOCK_HOSPITALS.map((hospital) => {
          const staff = MOCK_DOCTORS.filter(d => d.hospital_id === hospital.hospital_id);
          return (
            <div key={hospital.hospital_id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100 text-indigo-600">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{hospital.hospital_name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          hospital.hospital_type === 'government' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {hospital.hospital_type}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{hospital.registration_number}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-indigo-600">
                    <ExternalLink size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Phone size={14} className="text-slate-400" />
                    <span className="text-xs font-medium">{hospital.contact_number}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Mail size={14} className="text-slate-400" />
                    <span className="text-xs font-medium truncate">{hospital.email}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Registered Staff</h4>
                  <span className="text-xs font-bold text-slate-900">{staff.length} Active</span>
                </div>
                <div className="space-y-3">
                  {staff.length > 0 ? staff.map(doctor => (
                    <div key={doctor.doctor_id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-100">
                          {doctor.full_name.split(' ')[1].charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{doctor.full_name}</div>
                          <div className="text-[10px] text-slate-500 font-medium">{doctor.specialization}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ShieldCheck size={14} className="text-indigo-600" />
                        <span className="text-[10px] font-bold text-slate-400 font-mono">{doctor.license_number}</span>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-6 text-slate-400 text-xs italic">
                      No staff members onboarded yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Facilities;
