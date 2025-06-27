import { Component, signal, inject, HostListener } from '@angular/core';
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDate,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  contact: string;
  email: string;
  address: string;
  bloodGroup: string;
  height: string;
  weight: string;
  allergies: string[];
  medicalHistory: string[];
  currentMedications: string[];
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  contact: string;
  email: string;
}

interface Test {
  id: number;
  name: string;
  description: string;
  status: 'pending' | 'completed' | 'cancelled';
  result?: string;
}

interface Appointment {
  id: number;
  patient: Patient;
  doctor: Doctor;
  date: Date;
  time: string;
  duration: number;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  tests: Test[];
  notes: string;
  followUpRequired: boolean;
  followUpDate?: Date;
}

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
  templateUrl: './appointments.html',
  styleUrls: ['./appointments.css'],
})
export class AppointmentsComponent {
  calendar = inject(NgbCalendar);
  selectedDate = signal<NgbDateStruct>(
    this.toDateStruct(this.calendar.getToday())
  );
  today = this.toDateStruct(this.calendar.getToday());
  currentView = signal<'day' | 'week'>('week');
  filterStatus = signal<string>('all');
  searchQuery = signal<string>('');

  showDatepicker = false;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const datepickerElement = document.querySelector('.datepicker-dropdown');
    const dateInputElement = document.querySelector('.date-input');

    if (
      this.showDatepicker &&
      !(event.target as Element).closest('.datepicker-dropdown') &&
      !(event.target as Element).closest('.date-input')
    ) {
      this.showDatepicker = false;
    }
  }

  toggleDatepicker(): void {
    this.showDatepicker = !this.showDatepicker;
  }

  onDateSelect(date: NgbDateStruct): void {
    this.selectedDate.set(date);
    this.showDatepicker = false;
  }

  formatDate(date: NgbDateStruct): string {
    if (!date) return '';
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return jsDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }
  // Helper method to convert NgbDate to NgbDateStruct
  private toDateStruct(date: NgbDate): NgbDateStruct {
    return { year: date.year, month: date.month, day: date.day };
  }

  // Helper method to convert NgbDateStruct to NgbDate
  private toNgbDate(date: NgbDateStruct): NgbDate {
    return new NgbDate(date.year, date.month, date.day);
  }

  // Updated methods to handle date navigation
  prevDay(): void {
    const current = this.toNgbDate(this.selectedDate());
    const prevDate = this.calendar.getPrev(current, 'd', 1);
    this.selectedDate.set(this.toDateStruct(prevDate));
  }

  nextDay(): void {
    const current = this.toNgbDate(this.selectedDate());
    const nextDate = this.calendar.getNext(current, 'd', 1);
    this.selectedDate.set(this.toDateStruct(nextDate));
  }

  setToday(): void {
    this.selectedDate.set(this.toDateStruct(this.calendar.getToday()));
  }

  // Static data
  doctors = signal<Doctor[]>([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      contact: '+1 (555) 123-4567',
      email: 's.johnson@hospital.com',
    },
    {
      id: 2,
      name: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      contact: '+1 (555) 987-6543',
      email: 'j.wilson@hospital.com',
    },
    {
      id: 3,
      name: 'Dr. Emily Carter',
      specialty: 'Pediatrics',
      contact: '+1 (555) 654-3210',
      email: 'e.carter@hospital.com',
    },
    {
      id: 4,
      name: 'Dr. Michael Lee',
      specialty: 'Neurology',
      contact: '+1 (555) 321-9876',
      email: 'm.lee@hospital.com',
    },
    {
      id: 5,
      name: 'Dr. Olivia Martinez',
      specialty: 'Dermatology',
      contact: '+1 (555) 444-1234',
      email: 'o.martinez@hospital.com',
    },
    {
      id: 6,
      name: 'Dr. David Kim',
      specialty: 'General Surgery',
      contact: '+1 (555) 333-5678',
      email: 'd.kim@hospital.com',
    },
    {
      id: 7,
      name: 'Dr. Anita Patel',
      specialty: 'Psychiatry',
      contact: '+1 (555) 777-2233',
      email: 'a.patel@hospital.com',
    },
    {
      id: 8,
      name: 'Dr. Robert Brown',
      specialty: 'Radiology',
      contact: '+1 (555) 888-6677',
      email: 'r.brown@hospital.com',
    },
    {
      id: 9,
      name: 'Dr. Linda Davis',
      specialty: 'Endocrinology',
      contact: '+1 (555) 222-4455',
      email: 'l.davis@hospital.com',
    },
    {
      id: 10,
      name: 'Dr. Steven White',
      specialty: 'Gastroenterology',
      contact: '+1 (555) 999-8899',
      email: 's.white@hospital.com',
    },
  ]);

  patients = signal<Patient[]>([
    {
      id: 1,
      name: 'John Smith',
      age: 45,
      gender: 'Male',
      contact: '+1 (555) 111-2222',
      email: 'john.smith@email.com',
      address: '123 Main St, Anytown, USA',
      bloodGroup: 'A+',
      height: '5\'10"',
      weight: '180 lbs',
      allergies: ['Penicillin'],
      medicalHistory: ['Hypertension'],
      currentMedications: ['Lisinopril'],
    },
    {
      id: 2,
      name: 'Jane Doe',
      age: 30,
      gender: 'Female',
      contact: '+1 (555) 333-4444',
      email: 'jane.doe@email.com',
      address: '456 Oak St, Newtown, USA',
      bloodGroup: 'B-',
      height: '5\'5"',
      weight: '140 lbs',
      allergies: ['Dust'],
      medicalHistory: ['Asthma'],
      currentMedications: ['Ventolin'],
    },
    {
      id: 3,
      name: 'Alice Johnson',
      age: 27,
      gender: 'Female',
      contact: '+1 (555) 555-6666',
      email: 'alice.j@email.com',
      address: '789 Pine St, Oldtown, USA',
      bloodGroup: 'O+',
      height: '5\'6"',
      weight: '135 lbs',
      allergies: ['Pollen'],
      medicalHistory: ['Allergies'],
      currentMedications: ['Claritin'],
    },
    {
      id: 4,
      name: 'Bob White',
      age: 52,
      gender: 'Male',
      contact: '+1 (555) 222-3333',
      email: 'bob.white@email.com',
      address: '321 Elm St, Midtown, USA',
      bloodGroup: 'AB+',
      height: '6\'0"',
      weight: '190 lbs',
      allergies: [],
      medicalHistory: ['Diabetes'],
      currentMedications: ['Metformin'],
    },
    {
      id: 5,
      name: 'Maria Gonzalez',
      age: 35,
      gender: 'Female',
      contact: '+1 (555) 111-7777',
      email: 'm.gonzalez@email.com',
      address: '678 Maple St, Uptown, USA',
      bloodGroup: 'B+',
      height: '5\'3"',
      weight: '120 lbs',
      allergies: ['Shellfish'],
      medicalHistory: ['High Cholesterol'],
      currentMedications: ['Atorvastatin'],
    },
    {
      id: 6,
      name: 'Tom Clark',
      age: 40,
      gender: 'Male',
      contact: '+1 (555) 444-8888',
      email: 't.clark@email.com',
      address: '876 Spruce St, Downtown, USA',
      bloodGroup: 'A-',
      height: '5\'9"',
      weight: '170 lbs',
      allergies: ['Peanuts'],
      medicalHistory: ['Migraines'],
      currentMedications: ['Sumatriptan'],
    },
    {
      id: 7,
      name: 'Nancy Drew',
      age: 29,
      gender: 'Female',
      contact: '+1 (555) 999-1111',
      email: 'n.drew@email.com',
      address: '135 Cherry St, Suburb, USA',
      bloodGroup: 'O-',
      height: '5\'7"',
      weight: '125 lbs',
      allergies: ['Latex'],
      medicalHistory: ['Anxiety'],
      currentMedications: ['Zoloft'],
    },
    {
      id: 8,
      name: 'George Hall',
      age: 60,
      gender: 'Male',
      contact: '+1 (555) 666-0000',
      email: 'g.hall@email.com',
      address: '444 Cedar St, Bigcity, USA',
      bloodGroup: 'AB-',
      height: '6\'1"',
      weight: '200 lbs',
      allergies: ['Gluten'],
      medicalHistory: ['Arthritis'],
      currentMedications: ['Ibuprofen'],
    },
    {
      id: 9,
      name: 'Emma Watson',
      age: 50,
      gender: 'Female',
      contact: '+1 (555) 777-3333',
      email: 'emma.w@email.com',
      address: '999 Birch St, Lakeside, USA',
      bloodGroup: 'A+',
      height: '5\'4"',
      weight: '150 lbs',
      allergies: [],
      medicalHistory: ['Back Pain'],
      currentMedications: ['Tylenol'],
    },
    {
      id: 10,
      name: 'Rick Martin',
      age: 38,
      gender: 'Male',
      contact: '+1 (555) 888-5555',
      email: 'rick.m@email.com',
      address: '202 Willow St, Hillside, USA',
      bloodGroup: 'B-',
      height: '6\'0"',
      weight: '185 lbs',
      allergies: ['Bee stings'],
      medicalHistory: ['Hypertension'],
      currentMedications: ['Lisinopril'],
    },
  ]);

  tests = signal<Test[]>([
    {
      id: 1,
      name: 'CBC',
      description: 'Complete Blood Count',
      status: 'completed',
      result: 'Normal',
    },
    {
      id: 2,
      name: 'X-Ray Chest',
      description: 'Chest imaging for lung check',
      status: 'pending',
    },
    {
      id: 3,
      name: 'MRI Brain',
      description: 'Detailed brain scan',
      status: 'completed',
      result: 'No Abnormalities',
    },
    {
      id: 4,
      name: 'Lipid Profile',
      description: 'Cholesterol and lipid levels',
      status: 'completed',
      result: 'Borderline',
    },
    {
      id: 5,
      name: 'Blood Sugar',
      description: 'Fasting glucose levels',
      status: 'cancelled',
    },
    {
      id: 6,
      name: 'Urine Test',
      description: 'Routine urine analysis',
      status: 'pending',
    },
    {
      id: 7,
      name: 'Thyroid Panel',
      description: 'Check thyroid hormone levels',
      status: 'completed',
      result: 'TSH Low',
    },
    {
      id: 8,
      name: 'CT Scan Abdomen',
      description: 'Abdominal organ imaging',
      status: 'pending',
    },
    {
      id: 9,
      name: 'ECG',
      description: 'Electrocardiogram heart test',
      status: 'completed',
      result: 'Mild Arrhythmia',
    },
    {
      id: 10,
      name: 'Allergy Test',
      description: 'Panel for common allergens',
      status: 'cancelled',
    },
  ]);

  appointments = signal<Appointment[]>([
    {
      id: 1,
      patient: this.patients()[0],
      doctor: this.doctors()[0],
      date: new Date(),
      time: '09:00 AM',
      duration: 30,
      reason: 'Hypertension follow-up',
      status: 'scheduled',
      tests: [this.tests()[0]],
      notes: 'Dizziness persists',
      followUpRequired: true,
      followUpDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    },
    {
      id: 2,
      patient: this.patients()[1],
      doctor: this.doctors()[1],
      date: new Date(),
      time: '10:00 AM',
      duration: 45,
      reason: 'Knee pain assessment',
      status: 'completed',
      tests: [this.tests()[1]],
      notes: 'MRI advised',
      followUpRequired: false,
    },
    {
      id: 3,
      patient: this.patients()[2],
      doctor: this.doctors()[2],
      date: new Date(),
      time: '11:15 AM',
      duration: 20,
      reason: 'Child vaccination',
      status: 'scheduled',
      tests: [],
      notes: 'Flu shot given',
      followUpRequired: false,
    },
    {
      id: 4,
      patient: this.patients()[3],
      doctor: this.doctors()[3],
      date: new Date(),
      time: '01:00 PM',
      duration: 60,
      reason: 'Migraine evaluation',
      status: 'cancelled',
      tests: [this.tests()[2]],
      notes: 'Appointment cancelled',
      followUpRequired: true,
      followUpDate: new Date(new Date().setDate(new Date().getDate() + 15)),
    },
    {
      id: 5,
      patient: this.patients()[4],
      doctor: this.doctors()[4],
      date: new Date(),
      time: '02:00 PM',
      duration: 25,
      reason: 'Skin rash',
      status: 'scheduled',
      tests: [this.tests()[9]],
      notes: 'Allergy suspected',
      followUpRequired: false,
    },
    {
      id: 6,
      patient: this.patients()[5],
      doctor: this.doctors()[5],
      date: new Date(),
      time: '03:15 PM',
      duration: 35,
      reason: 'Post-surgery check',
      status: 'completed',
      tests: [],
      notes: 'Healing well',
      followUpRequired: true,
      followUpDate: new Date(new Date().setDate(new Date().getDate() + 45)),
    },
    {
      id: 7,
      patient: this.patients()[6],
      doctor: this.doctors()[6],
      date: new Date(),
      time: '04:30 PM',
      duration: 50,
      reason: 'Mental health consultation',
      status: 'scheduled',
      tests: [],
      notes: 'New medication prescribed',
      followUpRequired: true,
      followUpDate: new Date(new Date().setDate(new Date().getDate() + 20)),
    },
    {
      id: 8,
      patient: this.patients()[7],
      doctor: this.doctors()[7],
      date: new Date(),
      time: '08:45 AM',
      duration: 40,
      reason: 'X-ray result discussion',
      status: 'completed',
      tests: [this.tests()[3]],
      notes: 'No fracture',
      followUpRequired: false,
    },
    {
      id: 9,
      patient: this.patients()[8],
      doctor: this.doctors()[8],
      date: new Date(),
      time: '12:00 PM',
      duration: 30,
      reason: 'Thyroid follow-up',
      status: 'scheduled',
      tests: [this.tests()[6]],
      notes: 'TSH borderline low',
      followUpRequired: true,
      followUpDate: new Date(new Date().setDate(new Date().getDate() + 90)),
    },
    {
      id: 10,
      patient: this.patients()[9],
      doctor: this.doctors()[9],
      date: new Date(),
      time: '05:00 PM',
      duration: 30,
      reason: 'Digestive issues',
      status: 'no-show',
      tests: [],
      notes: 'Patient did not arrive',
      followUpRequired: false,
    },
  ]);

  get filteredAppointments() {
    const selectedDateObj = this.toNgbDate(this.selectedDate());
    const selectedDate = new Date(
      selectedDateObj.year,
      selectedDateObj.month - 1,
      selectedDateObj.day
    );

    return this.appointments()
      .filter((appointment) => {
        const appointmentDate = new Date(appointment.date);

        // Date filtering based on current view (day/week)
        const matchesDate =
          this.currentView() === 'day'
            ? appointmentDate.toDateString() === selectedDate.toDateString()
            : this.isDateInWeek(appointmentDate, selectedDate);

        // Status filtering
        const matchesStatus =
          this.filterStatus() === 'all' ||
          appointment.status === this.filterStatus();

        // Search filtering
        const matchesSearch =
          this.searchQuery() === '' ||
          appointment.patient.name
            .toLowerCase()
            .includes(this.searchQuery().toLowerCase()) ||
          appointment.doctor.name
            .toLowerCase()
            .includes(this.searchQuery().toLowerCase()) ||
          appointment.reason
            .toLowerCase()
            .includes(this.searchQuery().toLowerCase());

        return matchesDate && matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        // Sort by date and time
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (dateA !== dateB) return dateA - dateB;

        // If same date, sort by time
        return this.timeToMinutes(a.time) - this.timeToMinutes(b.time);
      });
  }

  get lastWeekAppointments() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return this.appointments()
      .filter((appointment) => {
        const appointmentDate = new Date(appointment.date);
        return (
          appointmentDate >= oneWeekAgo &&
          appointmentDate < new Date() &&
          appointment.status === 'completed'
        );
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  private isDateInWeek(dateToCheck: Date, referenceDate: Date): boolean {
    const ref = new Date(referenceDate);
    const startOfWeek = new Date(ref.setDate(ref.getDate() - ref.getDay()));
    const endOfWeek = new Date(ref.setDate(ref.getDate() + 6));

    return dateToCheck >= startOfWeek && dateToCheck <= endOfWeek;
  }

  private timeToMinutes(time: string): number {
    const [timePart, period] = time.split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);
    let total = hours * 60 + minutes;
    if (period === 'PM' && hours !== 12) total += 12 * 60;
    if (period === 'AM' && hours === 12) total -= 12 * 60;
    return total;
  }

  generateInvoice(appointment: Appointment): void {
    // Calculate total amount
    const consultationFee = 150; // Base consultation fee
    const testFees = appointment.tests.reduce((total, test) => {
      return total + (test.status === 'completed' ? 100 : 0); // $100 per completed test
    }, 0);
    const totalAmount = consultationFee + testFees;

    // Create invoice object
    const invoice = {
      id: `INV-${Date.now()}`,
      date: new Date(),
      appointmentId: appointment.id,
      patient: appointment.patient.name,
      doctor: appointment.doctor.name,
      items: [
        {
          description: 'Consultation Fee',
          amount: consultationFee,
        },
        ...appointment.tests
          .filter((test) => test.status === 'completed')
          .map((test) => ({
            description: `Test: ${test.name}`,
            amount: 100,
          })),
      ],
      totalAmount: totalAmount,
      status: 'pending',
    };

    console.log('Generated Invoice:', invoice);

    // In a real app, you would:
    // 1. Save the invoice to database
    // 2. Open a print dialog or PDF generation
    // 3. Show success message

    alert(
      `Invoice generated for ${appointment.patient.name}\nTotal: $${totalAmount}`
    );
  }

  changeView(view: 'day' | 'week'): void {
    this.currentView.set(view);
  }

  changeStatus(status: string): void {
    this.filterStatus.set(status);
  }

  onSearchChange(query: string): void {
    this.searchQuery.set(query);
  }

  viewMedicalHistory(patient: Patient): void {
    console.log('Viewing medical history for:', patient.name);
    alert(`Would show medical history for ${patient.name}`);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'scheduled':
        return 'bg-primary';
      case 'completed':
        return 'bg-success';
      case 'cancelled':
        return 'bg-danger';
      case 'no-show':
        return 'bg-warning text-dark';
      default:
        return 'bg-secondary';
    }
  }
}
