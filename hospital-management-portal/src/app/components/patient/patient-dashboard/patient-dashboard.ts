import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faCalendarCheck, 
  faUserDoctor, 
  faFileWaveform, 
  faPills,
  faChartLine,
  faBell
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './patient-dashboard.html',
  styleUrls: ['./patient-dashboard.css']
})
export class PatientDashboardComponent {
  icons = {
    appointments: faCalendarCheck,
    doctors: faUserDoctor,
    records: faFileWaveform,
    medications: faPills,
    health: faChartLine,
    notifications: faBell
  };

  upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2023-06-15',
      time: '10:00 AM',
      status: 'Confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      date: '2023-06-20',
      time: '02:30 PM',
      status: 'Confirmed'
    }
  ];

  healthMetrics = {
    bloodPressure: '120/80',
    heartRate: '72',
    glucose: '98',
    temperature: '98.6'
  };

  recentMedications = [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
    { name: 'Atorvastatin', dosage: '20mg', frequency: 'At bedtime' }
  ];
}