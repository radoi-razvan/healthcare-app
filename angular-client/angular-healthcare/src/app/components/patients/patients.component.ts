import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/Patient';
import { PatientService } from 'src/app/services/patient.service';
import {
  faUser,
  faUserTie,
  faCalendar,
  faVenusMars,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  faUser = faUser;
  faUserTie = faUserTie;
  faCalendar = faCalendar;
  faVenusMars = faVenusMars;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService
      .getPatients()
      .subscribe((patients) => (this.patients = patients));
  }
}
