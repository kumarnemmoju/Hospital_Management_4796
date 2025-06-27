import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faFileInvoiceDollar, 
  faMoneyBillWave,
  faCreditCard,
  faCircleCheck,
  faClock,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-patient-billing',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './patient-billing.html',
  styleUrls: ['./patient-billing.css']
})
export class PatientBillingComponent {
  icons = {
    invoice: faFileInvoiceDollar,
    payment: faMoneyBillWave,
    card: faCreditCard,
    paid: faCircleCheck,
    pending: faClock,
    cancelled: faTimesCircle
  };

  bills = [
    {
      id: 'INV-2023-015',
      date: '2023-06-10',
      description: 'Cardiology Consultation',
      amount: 250,
      status: 'Paid',
      statusClass: 'success',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'INV-2023-016',
      date: '2023-06-12',
      description: 'Lab Tests',
      amount: 180,
      status: 'Pending',
      statusClass: 'warning',
      paymentMethod: null
    },
    {
      id: 'INV-2023-014',
      date: '2023-05-28',
      description: 'Pediatric Consultation',
      amount: 200,
      status: 'Paid',
      statusClass: 'success',
      paymentMethod: 'Insurance'
    },
    {
      id: 'INV-2023-013',
      date: '2023-05-15',
      description: 'Dermatology Services',
      amount: 150,
      status: 'Cancelled',
      statusClass: 'danger',
      paymentMethod: null
    }
  ];

  paymentMethods = [
    { id: 1, type: 'Credit Card', last4: '4242', expiry: '12/25' },
    { id: 2, type: 'Bank Account', last4: '9856', bank: 'Chase' }
  ];

  getStatusIcon(status: string) {
    switch(status) {
      case 'Paid': return this.icons.paid;
      case 'Pending': return this.icons.pending;
      case 'Cancelled': return this.icons.cancelled;
      default: return this.icons.pending;
    }
  }
}