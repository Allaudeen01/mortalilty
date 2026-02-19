
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Cell, PieChart, Pie, Legend 
} from 'recharts';
import { TrendingUp, TrendingDown, Users, Baby, Skull, HeartPulse, MapPin } from 'lucide-react';
import { MOCK_DEATHS, MOCK_DELIVERIES, MOCK_PREGNANCIES } from '../constants';

const StatsCard: React.FC<{ label: string; value: string | number; change?: string; positive?: boolean; icon: React.ReactNode; color: string }> = ({ label, value, change, positive, icon, color }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${color}`}>
        {icon}
      </div>
      {change && (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center ${positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {positive ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
          {change}
        </span>
      )}
    </div>
    <div className="text-2xl font-bold text-slate-900">{value}</div>
    <div className="text-slate-500 text-sm font-medium">{label}</div>
  </div>
);

const Dashboard: React.FC = () => {
  // MMR Calculation = (Deaths / Deliveries) * 100,000
  const liveBirths = MOCK_DELIVERIES.filter(d => d.outcome === 'live birth').length;
  const mmr = liveBirths > 0 ? (MOCK_DEATHS.length * 100000 / liveBirths).toFixed(1) : 0;

  const dataMonthly = [
    { name: 'Jan', deliveries: 45, deaths: 1 },
    { name: 'Feb', deliveries: 52, deaths: 0 },
    { name: 'Mar', deliveries: 48, deaths: 0 },
    { name: 'Apr', deliveries: 61, deaths: 1 },
    { name: 'May', deliveries: 55, deaths: 0 },
    { name: 'Jun', deliveries: 67, deaths: 0 },
  ];

  const regionalData = [
    { district: 'Pune', highRisk: 42, moderate: 30 },
    { district: 'Bangalore', highRisk: 35, moderate: 45 },
    { district: 'Mumbai', highRisk: 58, moderate: 22 },
    { district: 'Nagpur', highRisk: 24, moderate: 60 },
  ];

  const causeData = [
    { name: 'Hemorrhage', value: 40 },
    { name: 'Sepsis', value: 25 },
    { name: 'Eclampsia', value: 20 },
    { name: 'Other', value: 15 },
  ];

  const COLORS = ['#4f46e5', '#ef4444', '#f59e0b', '#10b981'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">National Surveillance Dashboard</h2>
          <p className="text-slate-500">Maternal health tracking and outcome analysis</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
            <option>Last 30 Days</option>
            <option>Last Quarter</option>
            <option>Last Year</option>
          </select>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          label="Total MMR" 
          value={mmr} 
          change="5.2%" 
          positive={false} 
          color="bg-red-50 text-red-600"
          icon={<Skull size={20} />} 
        />
        <StatsCard 
          label="Active Pregnancies" 
          value={MOCK_PREGNANCIES.length + 152} 
          change="+12.5%" 
          positive={true} 
          color="bg-indigo-50 text-indigo-600"
          icon={<Users size={20} />} 
        />
        <StatsCard 
          label="Total Deliveries" 
          value={1245} 
          change="+2.1%" 
          positive={true} 
          color="bg-green-50 text-green-600"
          icon={<Baby size={20} />} 
        />
        <StatsCard 
          label="High Risk Rate" 
          value="14.2%" 
          change="-0.8%" 
          positive={true} 
          color="bg-amber-50 text-amber-600"
          icon={<HeartPulse size={20} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center">
            <TrendingUp size={18} className="mr-2 text-indigo-600" />
            Monthly Outcome Trends
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataMonthly}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Legend />
                <Line type="monotone" dataKey="deliveries" stroke="#4f46e5" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} name="Live Births" />
                <Line type="monotone" dataKey="deaths" stroke="#ef4444" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} name="Maternal Deaths" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center">
            <MapPin size={18} className="mr-2 text-indigo-600" />
            Regional Risk Clusters
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="district" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                <Tooltip />
                <Bar dataKey="highRisk" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} name="High Risk Cases" barSize={12} />
                <Bar dataKey="moderate" stackId="a" fill="#f59e0b" radius={[0, 4, 4, 0]} name="Moderate Risk Cases" barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-slate-50 rounded-lg text-[10px] text-slate-500 leading-relaxed italic border border-slate-100">
            Automated cluster detection identified Mumbai as a priority high-risk zone for postpartum hemorrhage.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
