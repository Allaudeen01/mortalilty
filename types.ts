
export interface Location {
  location_id: number;
  country: string;
  state: string;
  district?: string;
  city?: string;
  village?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
}

export interface Hospital {
  hospital_id: number;
  hospital_name: string;
  hospital_type: 'government' | 'private' | 'clinic';
  location_id: number;
  contact_number: string;
  email: string;
  registration_number: string;
}

export interface User {
  user_id: number;
  full_name: string;
  email: string;
  role: 'admin' | 'doctor' | 'hospital_staff';
  hospital_id: number;
  is_active: boolean;
}

export interface Doctor {
  doctor_id: number;
  user_id: number;
  hospital_id: number;
  full_name: string;
  specialization: string;
  license_number: string;
  contact_number: string;
}

export interface Patient {
  patient_id: number;
  unique_patient_code: string;
  full_name: string;
  date_of_birth: string;
  age: number;
  marital_status: string;
  education_level: string;
  occupation: string;
  socioeconomic_status: string;
  location_id: number;
  blood_group: string;
  height_cm: number;
  weight_kg: number;
  created_at: string;
  // Extended fields for registration form
  phone?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  emergency_contact_relationship?: string;
}

export interface Pregnancy {
  pregnancy_id: number;
  patient_id: number;
  gravida: number;
  para: number;
  living_children: number;
  previous_abortions: number;
  pregnancy_number: number;
  registration_date: string;
  gestational_age_weeks: number;
  expected_delivery_date: string;
  pregnancy_type: 'single' | 'twins' | 'multiples';
  risk_level: 'low' | 'medium' | 'high';
  hospital_id: number;
  status: 'active' | 'completed' | 'terminated' | 'deceased';
}

export interface AntenatalVisit {
  visit_id: number;
  pregnancy_id: number;
  visit_date: string;
  gestational_age_weeks: number;
  blood_pressure_systolic: number;
  blood_pressure_diastolic: number;
  hemoglobin: number;
  weight: number;
  fetal_heartbeat: boolean;
  complications?: string;
  doctor_id: number;
  hospital_id: number;
}

export interface Delivery {
  delivery_id: number;
  pregnancy_id: number;
  delivery_date: string;
  delivery_place: string;
  hospital_id: number;
  delivery_mode: 'vaginal' | 'c-section' | 'assisted';
  outcome: 'live birth' | 'stillbirth' | 'miscarriage';
  baby_weight: number;
  doctor_id: number;
  complications?: string;
}

export interface MaternalDeath {
  death_id: number;
  pregnancy_id: number;
  patient_id: number;
  death_date: string;
  death_time: string;
  place_of_death: string;
  hospital_id: number;
  stage_of_death: 'pregnancy' | 'delivery' | 'postpartum';
  cause_of_death: string;
  primary_complication_id: number;
  contributing_factors?: string;
  delay_type: 'seeking care' | 'reaching facility' | 'treatment';
  icu_admission: boolean;
  blood_transfusion: boolean;
  doctor_id: number;
}

export interface Treatment {
  treatment_id: number;
  pregnancy_id: number;
  treatment_date: string;
  treatment_type: string;
  medication: string;
  notes: string;
  doctor_id: number;
  hospital_id: number;
}

export interface AuditLog {
  log_id: number;
  user_id: number;
  action: string;
  table_name: string;
  record_id: number;
  timestamp: string;
  details?: string;
}

export interface Complication {
  complication_id: number;
  name: string;
  type: 'direct' | 'indirect';
  description: string;
}
