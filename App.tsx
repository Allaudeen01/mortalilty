
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  Activity, 
  Skull, 
  Settings, 
  FileText, 
  PlusCircle,
  AlertCircle,
  Building2,
  ShieldCheck,
  ClipboardList,
  Cpu,
  Database
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import NewPatient from './pages/NewPatient';
import Pregnancies from './pages/Pregnancies';
import MaternalDeaths from './pages/MaternalDeaths';
import Facilities from './pages/Facilities';
import ClinicalLogs from './pages/ClinicalLogs';
import AuditLogs from './pages/AuditLogs';
import SettingsPage from './pages/Settings';
import SystemAnalytics from './pages/SystemAnalytics';

const SidebarItem: React.FC<{ to: string; icon: React.ReactNode; label: string; active: boolean }> = ({ to, icon, label, active }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
      active ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
    }`}
  >
    {icon}
    <span className="font-medium text-sm">{label}</span>
  </Link>
);

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <Activity className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">MaternalCare</h1>
          </div>
        </div>
        
        <div className="p-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Main</div>
          <nav className="space-y-1">
            <SidebarItem to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" active={location.pathname === '/'} />
            <SidebarItem to="/patients" icon={<Users size={18} />} label="Patient Registry" active={location.pathname.startsWith('/patients')} />
            <SidebarItem to="/pregnancies" icon={<Stethoscope size={18} />} label="Pregnancies" active={location.pathname === '/pregnancies'} />
          </nav>

          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2 mt-6">Clinical Operations</div>
          <nav className="space-y-1">
            <SidebarItem to="/surveillance" icon={<Skull size={18} />} label="Death Surveillance" active={location.pathname === '/surveillance'} />
            <SidebarItem to="/clinical-logs" icon={<ClipboardList size={18} />} label="Clinical Logs" active={location.pathname === '/clinical-logs'} />
            <SidebarItem to="/facilities" icon={<Building2 size={18} />} label="Facilities & Staff" active={location.pathname === '/facilities'} />
          </nav>

          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2 mt-6">Intelligence & Backend</div>
          <nav className="space-y-1">
            <SidebarItem to="/analytics" icon={<Cpu size={18} />} label="System Analytics" active={location.pathname === '/analytics'} />
            <SidebarItem to="/audits" icon={<ShieldCheck size={18} />} label="Security Audits" active={location.pathname === '/audits'} />
            <SidebarItem to="/settings" icon={<Settings size={18} />} label="Settings" active={location.pathname === '/settings'} />
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="md:hidden">
            <Activity className="text-indigo-600 w-8 h-8" />
          </div>
          <div className="flex-1 px-4 max-w-xl">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search patient, hospital, or doctor..." 
                className="w-full bg-slate-100 border-none rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-500 transition-all text-sm outline-none"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-xs font-bold text-slate-900 leading-none">Admin Control</span>
              <span className="text-[10px] text-slate-400">National Level</span>
            </div>
            <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200 cursor-pointer hover:bg-indigo-200 transition-colors">
              AC
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/new" element={<NewPatient />} />
          <Route path="/pregnancies" element={<Pregnancies />} />
          <Route path="/surveillance" element={<MaternalDeaths />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/clinical-logs" element={<ClinicalLogs />} />
          <Route path="/analytics" element={<SystemAnalytics />} />
          <Route path="/audits" element={<AuditLogs />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<div className="p-12 text-center text-slate-500">Page under construction</div>} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
