from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Patient(BaseModel):
    id: int
    name: str
    age: int
    email: str

patients = {}

@app.post("/register/")
def register_patient(patient: Patient):
    if patient.id in patients:
        raise HTTPException(status_code=400, detail="Patient already registered")
    patients[patient.id] = patient
    return patient

@app.get("/patients/{patient_id}")
def get_patient(patient_id: int):
    patient = patients.get(patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient
