import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/Patient';

@Component({
  selector: 'app-add-edit-patient',
  templateUrl: './add-edit-patient.component.html',
  styleUrls: ['./add-edit-patient.component.css'],
})
export class AddEditPatientComponent implements OnInit {
  private routeSubscription!: Subscription;
  patientId!: number;

  id?: number;
  firstName!: string;
  lastName!: string;
  dateOfBirth!: string;
  sex!: string;
  personalIdentificationNumber!: string;
  phoneNumber!: string;
  orderNumber: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.validFormInput()) {
      const warningMessage = document.getElementById('warningMessage');
      warningMessage!.classList.remove('warning-message-display');
      return;
    }

    const newPatient = {
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      sex: this.sex,
      personalIdentificationNumber: this.personalIdentificationNumber,
      phoneNumber: this.phoneNumber,
      orderNumber: this.orderNumber,
    };

    if (this.router.url.includes('add')) {
      this.patientService.getPatients().subscribe((patients) => {
        if (patients.length > 0) {
          newPatient.orderNumber =
            patients.sort((a, b) =>
              a.orderNumber! > b.orderNumber! ? -1 : 1
            )[0].orderNumber + 1;

          this.patientService.addPatient(newPatient).subscribe(() => {
            this.clearFormInputs();
            this.router.navigate(['']);
          });
        }
      });
    } else {
      this.routeSubscription = this.activatedRoute.params.subscribe(
        (params) => {
          this.patientId = params['id'];

          newPatient.orderNumber = parseInt(params['id']);
          this.patientService
            .editPatient(this.patientId, newPatient)
            .subscribe(() => {
              this.clearFormInputs();
              this.router.navigate(['']);
            });
        }
      );
    }
  }

  clearFormInputs(): void {
    this.firstName = '';
    this.lastName = '';
    this.dateOfBirth = '';
    this.sex = 'M';
    this.personalIdentificationNumber = '';
    this.phoneNumber = '';
    this.orderNumber = 0;
  }

  validFormInput(): boolean {
    let validFirstNameCheck: boolean = false;
    let validLastNameCheck: boolean = false;
    let validDateOfBirthCheck: boolean = false;
    let validSexCheck: boolean = false;
    let validPersonalIdentificationNumberCheck: boolean = false;
    let validPhoneNumberCheck: boolean = false;

    const pinPattern = /[0-9]{13}/;
    const phoneNumberPattern = /[0-9]+/;

    const currentDate = new Date();
    const formInputDate = new Date(`${this.dateOfBirth}T03:24:00`);

    if (this.notEmptyFormInput()) {
      validFirstNameCheck = true;
      validLastNameCheck = true;
      validSexCheck = true;

      if (this.personalIdentificationNumber.match(pinPattern)) {
        validPersonalIdentificationNumberCheck = true;
      }
      if (this.phoneNumber.match(phoneNumberPattern)) {
        validPhoneNumberCheck = true;
      }
      if (currentDate.getFullYear() > formInputDate.getFullYear()) {
        validDateOfBirthCheck = true;
      } else if (
        currentDate.getFullYear() === formInputDate.getFullYear() &&
        currentDate.getMonth() + 1 > formInputDate.getMonth() + 1
      ) {
        validDateOfBirthCheck = true;
      } else if (
        currentDate.getFullYear() === formInputDate.getFullYear() &&
        currentDate.getMonth() + 1 === formInputDate.getMonth() + 1 &&
        currentDate.getDate() > formInputDate.getDate()
      ) {
        validDateOfBirthCheck = true;
      }
    }

    return (
      validFirstNameCheck &&
      validLastNameCheck &&
      validDateOfBirthCheck &&
      validSexCheck &&
      validPersonalIdentificationNumberCheck &&
      validPhoneNumberCheck
    );
  }

  notEmptyFormInput(): boolean {
    if (
      this.firstName &&
      this.lastName &&
      this.dateOfBirth &&
      this.sex &&
      this.personalIdentificationNumber &&
      this.phoneNumber
    ) {
      return true;
    }
    return false;
  }
}
