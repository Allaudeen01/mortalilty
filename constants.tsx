
import { Complication, Hospital, Location, Patient, Pregnancy, MaternalDeath, Delivery, Doctor, Treatment, AuditLog } from './types';

export const COMPLICATIONS: Complication[] = [
  { complication_id: 1, name: 'Hemorrhage', type: 'direct', description: 'Severe bleeding' },
  { complication_id: 2, name: 'Sepsis', type: 'direct', description: 'Infection' },
  { complication_id: 3, name: 'Eclampsia', type: 'direct', description: 'Seizures' },
  { complication_id: 4, name: 'Anemia', type: 'indirect', description: 'Low hemoglobin' },
  { complication_id: 5, name: 'Obstructed Labor', type: 'direct', description: 'Mechanical blockage' },
];

export const MOCK_LOCATIONS: Location[] = [
  { location_id: 1, country: 'India', state: 'Maharashtra', district: 'Pune', city: 'Pune', postal_code: '411001' },
  { location_id: 2, country: 'India', state: 'Karnataka', district: 'Bangalore', city: 'Bangalore', postal_code: '560001' },
];

export const MOCK_HOSPITALS: Hospital[] = [
  { hospital_id: 1, hospital_name: 'City General Hospital', hospital_type: 'government', location_id: 1, contact_number: '1234567890', email: 'city@hosp.com', registration_number: 'REG001' },
  { hospital_id: 2, hospital_name: 'St. Mary Maternity', hospital_type: 'private', location_id: 2, contact_number: '9876543210', email: 'stmary@hosp.com', registration_number: 'REG002' },
];

export const MOCK_DOCTORS: Doctor[] = [
  { doctor_id: 1, user_id: 10, hospital_id: 1, full_name: 'Dr. Sarah Connor', specialization: 'Obstetrics', license_number: 'LIC-8822', contact_number: '555-0101' },
  { doctor_id: 2, user_id: 11, hospital_id: 2, full_name: 'Dr. James Wilson', specialization: 'Gynaecology', license_number: 'LIC-9933', contact_number: '555-0202' },
];

export const MOCK_PATIENTS: Patient[] = [
  { 
    patient_id: 1, 
    unique_patient_code: 'PAT-001', 
    full_name: 'Anita Sharma', 
    date_of_birth: '1995-05-12', 
    age: 29, 
    marital_status: 'Married', 
    education_level: 'Graduate', 
    occupation: 'Teacher', 
    socioeconomic_status: 'Middle', 
    location_id: 1, 
    blood_group: 'O+', 
    height_cm: 160, 
    weight_kg: 65, 
    created_at: '2023-01-01' 
  },
  { 
    patient_id: 2, 
    unique_patient_code: 'PAT-002', 
    full_name: 'Priya Verma', 
    date_of_birth: '1998-08-20', 
    age: 26, 
    marital_status: 'Married', 
    education_level: 'Secondary', 
    occupation: 'Homemaker', 
    socioeconomic_status: 'Low', 
    location_id: 2, 
    blood_group: 'A+', 
    height_cm: 155, 
    weight_kg: 58, 
    created_at: '2023-02-15' 
  },
];

export const MOCK_PREGNANCIES: Pregnancy[] = [
  { 
    pregnancy_id: 1, 
    patient_id: 1, 
    gravida: 2, 
    para: 1, 
    living_children: 1, 
    previous_abortions: 0, 
    pregnancy_number: 2, 
    registration_date: '2024-01-10', 
    gestational_age_weeks: 34, 
    expected_delivery_date: '2024-03-25', 
    pregnancy_type: 'single', 
    risk_level: 'low', 
    hospital_id: 1,
    status: 'active'
  },
  { 
    pregnancy_id: 2, 
    patient_id: 2, 
    gravida: 1, 
    para: 0, 
    living_children: 0, 
    previous_abortions: 0, 
    pregnancy_number: 1, 
    registration_date: '2024-02-05', 
    gestational_age_weeks: 28, 
    expected_delivery_date: '2024-05-15', 
    pregnancy_type: 'twins', 
    risk_level: 'high', 
    hospital_id: 2,
    status: 'active'
  },
];

export const MOCK_TREATMENTS: Treatment[] = [
  { treatment_id: 1, pregnancy_id: 1, treatment_date: '2024-02-15', treatment_type: 'Vitamin Supplementation', medication: 'Iron, Folic Acid', notes: 'Routine prenatal support', doctor_id: 1, hospital_id: 1 },
];

export const MOCK_AUDITS: AuditLog[] = [
  { log_id: 1, user_id: 1, action: 'CREATE_PATIENT', table_name: 'patients', record_id: 1, timestamp: '2024-03-15 10:30:00', details: 'Added patient Anita Sharma' },
  { log_id: 2, user_id: 1, action: 'UPDATE_PREGNANCY_RISK', table_name: 'pregnancies', record_id: 2, timestamp: '2024-03-15 11:45:00', details: 'Risk elevated to HIGH due to twin pregnancy' },
];

export const MOCK_DELIVERIES: Delivery[] = [
  { delivery_id: 1, pregnancy_id: 101, delivery_date: '2023-12-10', delivery_place: 'Hospital', hospital_id: 1, delivery_mode: 'vaginal', outcome: 'live birth', baby_weight: 3.2, doctor_id: 1 },
  { delivery_id: 2, pregnancy_id: 102, delivery_date: '2023-12-15', delivery_place: 'Hospital', hospital_id: 1, delivery_mode: 'c-section', outcome: 'live birth', baby_weight: 2.8, doctor_id: 2 },
  { delivery_id: 3, pregnancy_id: 103, delivery_date: '2024-01-05', delivery_place: 'Hospital', hospital_id: 2, delivery_mode: 'vaginal', outcome: 'live birth', baby_weight: 3.0, doctor_id: 1 },
];

export const MOCK_DEATHS: MaternalDeath[] = [
  {
    death_id: 1,
    pregnancy_id: 201,
    patient_id: 5,
    death_date: '2024-01-20',
    death_time: '14:30',
    place_of_death: 'City Hospital',
    hospital_id: 1,
    stage_of_death: 'delivery',
    cause_of_death: 'Postpartum Hemorrhage',
    primary_complication_id: 1,
    delay_type: 'treatment',
    icu_admission: true,
    blood_transfusion: true,
    doctor_id: 1
  }
];
