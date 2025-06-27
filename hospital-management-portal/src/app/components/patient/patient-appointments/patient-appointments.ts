import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faCalendarCheck, 
  faClock, 
  faUserDoctor,
  faLocationDot,
  faEllipsisVertical,
  faCheckCircle,
  faTimesCircle,
  faHourglassHalf
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-patient-appointments',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './patient-appointments.html',
  styleUrls: ['./patient-appointments.css']
})
export class PatientAppointmentsComponent {
  icons = {
    calendar: faCalendarCheck,
    clock: faClock,
    doctor: faUserDoctor,
    location: faLocationDot,
    menu: faEllipsisVertical,
    confirmed: faCheckCircle,
    cancelled: faTimesCircle,
    pending: faHourglassHalf
  };

  appointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2023-06-15',
      time: '10:00 AM',
      location: 'Metro Heart Institute, Room 205',
      status: 'Confirmed',
      statusClass: 'confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      date: '2023-06-20',
      time: '02:30 PM',
      location: 'Advanced Ortho Center, Room 102',
      status: 'Pending',
      statusClass: 'pending'
    },
    {
      id: 3,
      doctor: 'Dr. Priya Mehta',
      specialty: 'Pediatrics',
      date: '2023-05-28',
      time: '11:15 AM',
      location: 'Bright Children Hospital, Room 304',
      status: 'Completed',
      statusClass: 'completed'
    },
    {
      id: 4,
      doctor: 'Dr. David Kim',
      specialty: 'Dermatology',
      date: '2023-05-15',
      time: '09:00 AM',
      location: 'SkinCare Experts, Room 101',
      status: 'Cancelled',
      statusClass: 'cancelled'
    }
  ];

  upcomingAppointments = this.appointments.filter(a => 
    a.status === 'Confirmed' || a.status === 'Pending'
  );

  pastAppointments = this.appointments.filter(a => 
    a.status === 'Completed' || a.status === 'Cancelled'
  );

  getStatusIcon(status: string) {
    switch(status) {
      case 'Confirmed': return this.icons.confirmed;
      case 'Pending': return this.icons.pending;
      case 'Cancelled': return this.icons.cancelled;
      default: return this.icons.confirmed;
    }
  }
}