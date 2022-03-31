import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { PatientsComponent } from './components/patients/patients.component';
import { PatientItemComponent } from './components/patient-item/patient-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { DeletePatientComponent } from './components/forms/delete-patient/delete-patient.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddEditPatientComponent } from './components/forms/add-edit-patient/add-edit-patient.component';

const appRoutes: Routes = [
  { path: '', component: PatientsComponent },
  { path: 'patients/delete/:id', component: DeletePatientComponent },
  { path: 'patients/edit/:id', component: AddEditPatientComponent },
  { path: 'patients/add', component: AddEditPatientComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    PatientsComponent,
    PatientItemComponent,
    FooterComponent,
    DeletePatientComponent,
    PageNotFoundComponent,
    AddEditPatientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
