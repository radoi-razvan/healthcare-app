import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-delete-patient',
  templateUrl: './delete-patient.component.html',
  styleUrls: ['./delete-patient.component.css'],
})
export class DeletePatientComponent implements OnInit {
  private routeSubscription!: Subscription;
  patientId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe((params) => {
      this.patientId = params['id'];
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  deletePatient(): void {
    this.patientService
      .deletePatient(this.patientId)
      .subscribe(() => this.router.navigate(['']));
  }
}
