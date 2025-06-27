import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFileInvoiceDollar,
  faSearch,
  faPlus,
  faPrint,
  faDownload,
  faEye,
  faTrash,
  faUser,
  faUserDoctor,
  faCalendar,
  faPills,
  faFlask,
  faMoneyBillWave,
} from '@fortawesome/free-solid-svg-icons';

interface Patient {
  id: number;
  name: string;
  contact: string;
  insuranceProvider: string;
  insuranceId: string;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

interface Service {
  id: number;
  name: string;
  type: 'consultation' | 'procedure' | 'test' | 'medication';
  cost: number;
  quantity?: number;
}

interface Bill {
  id: number;
  patient: Patient;
  doctor: Doctor;
  date: Date;
  services: Service[];
  status: 'pending' | 'paid' | 'cancelled';
  paymentMethod?: string;
  paymentDate?: Date;
  discount?: number;
  tax: number;
  notes?: string;
}

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './billing.html',
  styleUrls: ['./billing.css'],
})
export class BillingComponent {
  // Font Awesome Icons
  icons = {
    invoice: faFileInvoiceDollar,
    search: faSearch,
    plus: faPlus,
    print: faPrint,
    download: faDownload,
    view: faEye,
    trash: faTrash,
    patient: faUser,
    doctor: faUserDoctor,
    calendar: faCalendar,
    medication: faPills,
    test: faFlask,
    payment: faMoneyBillWave,
  };

  // Sample Data
  patients = signal<Patient[]>([
    {
      id: 1,
      name: 'John Smith',
      contact: '+1 (555) 111-2222',
      insuranceProvider: 'Blue Cross',
      insuranceId: 'BC12345678',
    },
    {
      id: 2,
      name: 'Jane Doe',
      contact: '+1 (555) 333-4444',
      insuranceProvider: 'Aetna',
      insuranceId: 'AE87654321',
    },
  ]);

  doctors = signal<Doctor[]>([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
    },
    {
      id: 2,
      name: 'Dr. James Wilson',
      specialty: 'Orthopedics',
    },
  ]);

  services = signal<Service[]>([
    { id: 1, name: 'Consultation', type: 'consultation', cost: 150 },
    { id: 2, name: 'X-Ray', type: 'test', cost: 200 },
    { id: 3, name: 'Blood Test', type: 'test', cost: 80 },
    { id: 4, name: 'ECG', type: 'test', cost: 120 },
    { id: 5, name: 'Pain Medication', type: 'medication', cost: 25 },
  ]);

  bills = signal<Bill[]>([
    {
      id: 1,
      patient: this.patients()[0],
      doctor: this.doctors()[0],
      date: new Date('2023-05-15'),
      services: [
        { ...this.services()[0], quantity: 1 },
        { ...this.services()[2], quantity: 1 },
      ],
      status: 'paid',
      paymentMethod: 'Credit Card',
      paymentDate: new Date('2023-05-15'),
      tax: 18.5,
      notes: 'Follow-up in 2 weeks',
    },
    {
      id: 2,
      patient: this.patients()[1],
      doctor: this.doctors()[1],
      date: new Date('2023-05-16'),
      services: [
        { ...this.services()[0], quantity: 1 },
        { ...this.services()[1], quantity: 2 },
      ],
      status: 'pending',
      tax: 32.75,
      notes: 'Insurance claim pending',
    },
  ]);

  // Form Controls
  newBill = signal<Partial<Bill>>({
    date: new Date(),
    services: [],
    tax: 0,
    status: 'pending',
  });

  selectedPatientId = signal<number | null>(null);
  selectedDoctorId = signal<number | null>(null);
  selectedServiceId = signal<number | null>(null);
  serviceQuantity = signal(1);

  // Filter and Search
  searchQuery = signal('');
  statusFilter = signal('all');
  dateFilter = signal('all');

  // Computed Properties
  filteredBills = computed(() => {
    let bills = this.bills();

    // Apply search filter
    if (this.searchQuery()) {
      const query = this.searchQuery().toLowerCase();
      bills = bills.filter(
        (bill) =>
          bill.patient.name.toLowerCase().includes(query) ||
          bill.doctor.name.toLowerCase().includes(query) ||
          bill.id.toString().includes(query)
      );
    }

    // Apply status filter
    if (this.statusFilter() !== 'all') {
      bills = bills.filter((bill) => bill.status === this.statusFilter());
    }

    // Apply date filter
    if (this.dateFilter() === 'today') {
      const today = new Date().toDateString();
      bills = bills.filter((bill) => bill.date.toDateString() === today);
    } else if (this.dateFilter() === 'week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      bills = bills.filter((bill) => bill.date > oneWeekAgo);
    } else if (this.dateFilter() === 'month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      bills = bills.filter((bill) => bill.date > oneMonthAgo);
    }

    return bills;
  });

  selectedPatient = computed(() => {
    return (
      this.patients().find((p) => p.id === this.selectedPatientId()) || null
    );
  });

  selectedDoctor = computed(() => {
    return this.doctors().find((d) => d.id === this.selectedDoctorId()) || null;
  });

  selectedService = computed(() => {
    return (
      this.services().find((s) => s.id === this.selectedServiceId()) || null
    );
  });

  subTotal = computed(() => {
    return (
      this.newBill().services?.reduce(
        (sum, service) => sum + service.cost * (service.quantity || 1),
        0
      ) || 0
    );
  });

  totalAmount = computed(() => {
    const subTotal = this.subTotal();
    const discount = this.newBill().discount || 0;
    const tax = this.newBill().tax || 0;
    return subTotal - discount + tax;
  });

  // Methods
  addService(): void {
    if (!this.selectedService() || !this.serviceQuantity()) return;

    const newService = {
      ...this.selectedService()!,
      quantity: this.serviceQuantity(),
    };

    this.newBill.update((bill) => ({
      ...bill,
      services: [...(bill.services || []), newService],
    }));

    this.selectedServiceId.set(null);
    this.serviceQuantity.set(1);
  }

  removeService(index: number): void {
    this.newBill.update((bill) => {
      if (!bill.services) return bill;
      const services = [...bill.services];
      services.splice(index, 1);
      return { ...bill, services };
    });
  }

  createBill(): void {
    if (
      !this.selectedPatient() ||
      !this.selectedDoctor() ||
      !this.newBill().services?.length
    ) {
      alert('Please select patient, doctor and add at least one service');
      return;
    }

    const newBill: Bill = {
      id: Math.max(...this.bills().map((b) => b.id)) + 1,
      patient: this.selectedPatient()!,
      doctor: this.selectedDoctor()!,
      date: this.newBill().date || new Date(),
      services: this.newBill().services || [],
      status: 'pending',
      tax: this.newBill().tax || 0,
      discount: this.newBill().discount,
      notes: this.newBill().notes,
    };

    this.bills.update((bills) => [...bills, newBill]);
    this.resetBillForm();
  }

  updateDate(dateString: string): void {
    this.newBill.update((bill) => ({ ...bill, date: new Date(dateString) }));
  }

  updateDiscount(discount: string): void {
    this.newBill.update((bill) => ({ ...bill, discount: +discount }));
  }

  updateTax(tax: string): void {
    this.newBill.update((bill) => ({ ...bill, tax: +tax }));
  }

  updateNotes(notes: string): void {
    this.newBill.update((bill) => ({ ...bill, notes }));
  }

  calculateBillTotal(bill: Bill): number {
    const servicesTotal = bill.services.reduce(
      (sum, s) => sum + s.cost * (s.quantity || 1),
      0
    );
    return servicesTotal + bill.tax;
  }

  resetBillForm(): void {
    this.newBill.set({
      date: new Date(),
      services: [],
      tax: 0,
      status: 'pending',
    });
    this.selectedPatientId.set(null);
    this.selectedDoctorId.set(null);
  }

  printBill(bill: Bill): void {
    // In a real app, this would open a print dialog with formatted bill
    console.log('Printing bill:', bill);
    window.print();
  }

  downloadBill(bill: Bill): void {
    // In a real app, this would generate a PDF
    console.log('Downloading bill:', bill);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'paid':
        return 'bg-success';
      case 'pending':
        return 'bg-warning text-dark';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  formatCurrency(amount: number): string {
    return '$' + amount.toFixed(2);
  }
}
