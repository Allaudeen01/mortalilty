
import React from 'react';
import { User, Shield, Bell, Hospital, Database } from 'lucide-react';

const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
    <div className="px-6 py-4 border-b border-slate-100">
      <h3 className="font-bold text-slate-900">{title}</h3>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const SettingsRow: React.FC<{ icon: React.ReactNode; label: string; description: string; action: React.ReactNode }> = ({ icon, label, description, action }) => (
  <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
    <div className="flex items-center space-x-4">
      <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
        {icon}
      </div>
      <div>
        <div className="text-sm font-bold text-slate-900">{label}</div>
        <div className="text-xs text-slate-500">{description}</div>
      </div>
    </div>
    <div>
      {action}
    </div>
  </div>
);

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-8">System Settings</h2>

      <SettingsSection title="Administrator Profile">
        <SettingsRow 
          icon={<User size={18} />}
          label="Personal Information"
          description="Manage your display name and email address"
          action={<button className="text-indigo-600 text-xs font-bold hover:underline">Edit</button>}
        />
        <div className="h-px bg-slate-100 my-4"></div>
        <SettingsRow 
          icon={<Hospital size={18} />}
          label="Hospital Affiliation"
          description="Currently assigned to Pune District Hospital"
          action={<span className="text-slate-400 text-xs font-medium">Verified</span>}
        />
      </SettingsSection>

      <SettingsSection title="Surveillance Configuration">
        <SettingsRow 
          icon={<Shield size={18} />}
          label="Risk Thresholds"
          description="Define parameters for High/Medium risk classification"
          action={<button className="px-3 py-1 bg-slate-100 rounded text-xs font-bold">Configure</button>}
        />
        <div className="h-px bg-slate-100 my-4"></div>
        <SettingsRow 
          icon={<Bell size={18} />}
          label="Automated Alerts"
          description="Push notifications for high-risk patient events"
          action={<input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded" />}
        />
      </SettingsSection>

      <SettingsSection title="Data & Security">
        <SettingsRow 
          icon={<Database size={18} />}
          label="Export Surveillance Data"
          description="Download system-wide records in CSV/PDF"
          action={<button className="bg-indigo-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-indigo-700">Export All</button>}
        />
        <div className="h-px bg-slate-100 my-4"></div>
        <SettingsRow 
          icon={<Shield size={18} />}
          label="Audit Logs"
          description="Review all system interactions for security compliance"
          action={<button className="text-indigo-600 text-xs font-bold hover:underline">View Logs</button>}
        />
      </SettingsSection>
    </div>
  );
};

export default Settings;
