
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Heart, 
  Phone, 
  ShieldAlert, 
  Save, 
  Briefcase, 
  GraduationCap, 
  Info,
  ChevronRight
} from 'lucide-react';

const NewPatient: React.FC = () => {
  const navigate = useNavigate();
  const [patientCode, setPatientCode] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    full_name: '',
    date_of_birth: '',
    age: 0,
    phone: '',
    email: '',
    marital_status: 'Married',
    education_level: 'Graduate',
    occupation: '',
    socioeconomic_status: 'Middle',
    blood_group: 'O+',
    height_cm: '',
    weight_kg: '',
    country: 'India',
    state: 'Maharashtra',
    district: '',
    city: '',
    village: '',
    postal_code: '',
    emergency_name: '',
    emergency_phone: '',
    emergency_relationship: ''
  });

  // Auto-generate code on mount
  useEffect(() => {
    const randomCode = 'PAT-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setPatientCode(randomCode);
  }, []);

  // Age calculation
  useEffect(() => {
    if (formData.date_of_birth) {
      const birthDate = new Date(formData.date_of_birth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setFormData(prev => ({ ...prev, age }));
    }
  }, [formData.date_of_birth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demonstrate the backend query logic as requested
    console.log("Simulating PostgreSQL Insertion...");
    console.log(`
      INSERT INTO patients (
        unique_patient_code, full_name, date_of_birth, age, marital_status, 
        education_level, occupation, socioeconomic_status, blood_group, 
        height_cm, weight_kg, created_at, phone, 
        emergency_contact_name, emergency_contact_phone, emergency_contact_relationship
      ) VALUES (
        '${patientCode}', '${formData.full_name}', '${formData.date_of_birth}', ${formData.age}, 
        '${formData.marital_status}', '${formData.education_level}', '${formData.occupation}', 
        '${formData.socioeconomic_status}', '${formData.blood_group}', ${formData.height_cm}, 
        ${formData.weight_kg}, NOW(), '${formData.phone}', 
        '${formData.emergency_name}', '${formData.emergency_phone}', '${formData.emergency_relationship}'
      );
    `);

    // In a real app, we'd use axios.post here.
    alert(`Patient ${formData.full_name} registered successfully with code ${patientCode}!`);
    navigate('/patients');
  };

  const InputSection = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center space-x-3 bg-slate-50/50">
        <Icon size={18} className="text-indigo-600" />
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">{title}</h3>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/patients')}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Maternal Registration</h2>
            <p className="text-slate-500 text-sm">Create a new patient record in the surveillance system</p>
          </div>
        </div>
        <div className="hidden md:flex flex-col items-end">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Auto-Generated Code</div>
          <div className="text-lg font-mono font-black text-indigo-600 tracking-tighter">{patientCode}</div>
        </div>
      </div>

      <form onSubmit={handleSave}>
        {/* Section 1: Basic Information */}
        <InputSection title="Identity & Contact" icon={User}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
            <input 
              required
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter legal name"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Date of Birth</label>
            <div className="flex space-x-2">
              <input 
                required
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              />
              <div className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-lg border border-indigo-100 text-sm flex items-center">
                {formData.age} yrs
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
            <input 
              required
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>
        </InputSection>

        {/* Section 2: Demographics */}
        <InputSection title="Socio-Demographics" icon={Briefcase}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Marital Status</label>
            <select 
              name="marital_status"
              value={formData.marital_status}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            >
              <option>Married</option>
              <option>Unmarried</option>
              <option>Widowed</option>
              <option>Separated</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Education Level</label>
            <select 
              name="education_level"
              value={formData.education_level}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            >
              <option>No Formal Education</option>
              <option>Primary School</option>
              <option>Secondary School</option>
              <option>Graduate</option>
              <option>Post Graduate</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Occupation</label>
            <input 
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="e.g. Teacher, Homemaker"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Economic Status</label>
            <select 
              name="socioeconomic_status"
              value={formData.socioeconomic_status}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            >
              <option>Low</option>
              <option>Middle</option>
              <option>High</option>
            </select>
          </div>
        </InputSection>

        {/* Section 3: Clinical Information */}
        <InputSection title="Clinical Profile" icon={Heart}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Blood Group</label>
            <select 
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-red-600"
            >
              <option>O+</option><option>O-</option>
              <option>A+</option><option>A-</option>
              <option>B+</option><option>B-</option>
              <option>AB+</option><option>AB-</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Height (cm)</label>
            <input 
              required
              type="number"
              name="height_cm"
              value={formData.height_cm}
              onChange={handleChange}
              placeholder="165"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Weight (kg)</label>
            <input 
              required
              type="number"
              name="weight_kg"
              value={formData.weight_kg}
              onChange={handleChange}
              placeholder="60"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>
        </InputSection>

        {/* Section 4: Location */}
        <InputSection title="Geographic Tracking" icon={MapPin}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">District</label>
            <input 
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">City / Town</label>
            <input 
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Village (if applicable)</label>
            <input 
              name="village"
              value={formData.village}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Postal Code</label>
            <input 
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>
        </InputSection>

        {/* Section 5: Emergency Contact */}
        <InputSection title="Emergency Contact" icon={ShieldAlert}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Contact Name</label>
            <input 
              name="emergency_name"
              value={formData.emergency_name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Contact Phone</label>
            <input 
              name="emergency_phone"
              value={formData.emergency_phone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Relationship</label>
            <input 
              name="emergency_relationship"
              value={formData.emergency_relationship}
              onChange={handleChange}
              placeholder="e.g. Husband, Parent"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>
        </InputSection>

        <div className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-2 text-slate-400">
            <Info size={16} />
            <span className="text-xs">Submission will be logged in security audit trail.</span>
          </div>
          <div className="flex space-x-3">
            <button 
              type="button"
              onClick={() => navigate('/patients')}
              className="px-6 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="bg-indigo-600 text-white px-8 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 shadow-md flex items-center space-x-2 transition-all"
            >
              <Save size={18} />
              <span>Register Patient</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPatient;
