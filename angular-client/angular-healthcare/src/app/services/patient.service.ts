import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient } from 'src/app/Patient';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'http://localhost:5000/patients';

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patient, httpOptions);
  }

  editPatient(patientId: number, patient: Patient): Observable<Patient> {
    const url = `${this.apiUrl}/${patientId}`;
    return this.http.put<Patient>(url, patient, httpOptions);
  }

  deletePatient(patientId: number): Observable<Patient> {
    const url = `${this.apiUrl}/${patientId}`;
    return this.http.delete<Patient>(url);
  }
}
