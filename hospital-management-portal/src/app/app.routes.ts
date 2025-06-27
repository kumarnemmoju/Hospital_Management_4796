import { Routes } from '@angular/router';
import { Header } from './components/admin/header/header';
import { DoctorsComponent } from './components/admin/doctors/doctors';
import { AppointmentsComponent } from './components/admin/appointments/appointments';
import { PatientsComponent } from './components/admin/patient-records/patient-records';
import { BillingComponent } from './components/admin/billing/billing';
import { RegisterComponent } from './components/admin/register/register';
import { LoginComponent } from './components/admin/login/login';
import { PatientHeaderComponent } from './components/patient/patient-header/patient-header';
import { PatientDashboardComponent } from './components/patient/patient-dashboard/patient-dashboard';
import { FindDoctorsComponent } from './components/patient/find-doctors/find-doctors';
import { PatientAppointmentsComponent } from './components/patient/patient-appointments/patient-appointments';
import { MedicalRecordsComponent } from './components/patient/medical-records/medical-records';
import { PatientBillingComponent } from './components/patient/patient-billing/patient-billing';
import { PatientProfileComponent } from './components/patient/patient-profile/patient-profile';

export const routes: Routes = [
  { path: '', redirectTo: '/admin-header', pathMatch: 'full' },
  {
    path: 'admin-header',
    component: Header,
    children: [
      { path: '', redirectTo: 'patient-records', pathMatch: 'full' },
      { path: 'patient-records', component: PatientsComponent },
      { path: 'doctors', component: DoctorsComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'billing', component: BillingComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'patient',
    component: PatientHeaderComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: PatientDashboardComponent },
      { path: 'find-doctors', component: FindDoctorsComponent },
      { path: 'appointments', component: PatientAppointmentsComponent },
      { path: 'medical-records', component: MedicalRecordsComponent },
      { path: 'billing', component: PatientBillingComponent },
      { path: 'profile', component: PatientProfileComponent }
    ]
  }
];
