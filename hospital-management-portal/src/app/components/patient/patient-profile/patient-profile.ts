import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faUser, 
  faEnvelope,
  faPhone,
  faVenusMars,
  faCalendar,
  faMapMarkerAlt,
  faEdit,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './patient-profile.html',
  styleUrls: ['./patient-profile.css']
})
export class PatientProfileComponent {
  icons = {
    user: faUser,
    email: faEnvelope,
    phone: faPhone,
    gender: faVenusMars,
    calendar: faCalendar,
    location: faMapMarkerAlt,
    edit: faEdit,
    security: faShieldAlt
  };

  patient = {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    gender: 'Male',
    dob: '1985-05-15',
    address: '123 Main St, Anytown, USA',
    bloodGroup: 'A+',
    height: '5\'10"',
    weight: '180 lbs',
    insurance: 'Blue Cross (ID: BC12345678)',
    allergies: ['Penicillin', 'Pollen'],
    conditions: ['Hypertension', 'Seasonal Allergies']
  };

  emergencyContacts = [
    {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543',
      email: 'jane.smith@example.com'
    },
    {
      name: 'Michael Johnson',
      relationship: 'Brother',
      phone: '+1 (555) 456-7890',
      email: 'michael.j@example.com'
    }
  ];
}