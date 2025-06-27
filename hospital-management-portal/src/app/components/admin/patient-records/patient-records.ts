import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUserInjured,
  faSearch,
  faPlus,
  faEdit,
  faFileMedical,
  faTrash,
  faInfoCircle,
  faAllergies,
  faHistory,
  faPills,
} from '@fortawesome/free-solid-svg-icons';

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

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './patient-records.html',
  styleUrls: ['./patient-records.css'],
})
export class PatientsComponent implements OnInit {
  // Font Awesome Icons
  icons = {
    userInjured: faUserInjured,
    search: faSearch,
    plus: faPlus,
    edit: faEdit,
    fileMedical: faFileMedical,
    trash: faTrash,
    infoCircle: faInfoCircle,
    allergies: faAllergies,
    history: faHistory,
    pills: faPills,
  };

  // Patient Data
  patients = signal<Patient[]>([
    {
      id: 1,
      name: 'John Smith',
      age: 45,
      gender: 'male',
      contact: '+1 (555) 111-2222',
      email: 'john.smith@email.com',
      address: '123 Main St, Anytown, USA',
      bloodGroup: 'A+',
      height: '5\'10"',
      weight: '180 lbs',
      allergies: ['Penicillin'],
      medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
      currentMedications: ['Lisinopril', 'Metformin'],
    },
    {
      id: 2,
      name: 'Jane Doe',
      age: 30,
      gender: 'female',
      contact: '+1 (555) 333-4444',
      email: 'jane.doe@email.com',
      address: '456 Oak St, Newtown, USA',
      bloodGroup: 'B-',
      height: '5\'5"',
      weight: '140 lbs',
      allergies: ['Dust', 'Pollen'],
      medicalHistory: ['Asthma', 'Seasonal Allergies'],
      currentMedications: ['Ventolin', 'Claritin'],
    },
    {
      id: 3,
      name: 'Alice Johnson',
      age: 27,
      gender: 'female',
      contact: '+1 (555) 555-6666',
      email: 'alice.j@email.com',
      address: '789 Pine St, Oldtown, USA',
      bloodGroup: 'O+',
      height: '5\'6"',
      weight: '135 lbs',
      allergies: ['Shellfish'],
      medicalHistory: ['Anemia'],
      currentMedications: ['Iron Supplement'],
    },
    {
      id: 4,
      name: 'Bob White',
      age: 52,
      gender: 'male',
      contact: '+1 (555) 222-3333',
      email: 'bob.white@email.com',
      address: '321 Elm St, Midtown, USA',
      bloodGroup: 'AB+',
      height: '6\'0"',
      weight: '190 lbs',
      allergies: [],
      medicalHistory: ['Diabetes', 'High Cholesterol'],
      currentMedications: ['Metformin', 'Atorvastatin'],
    },
    {
      id: 5,
      name: 'Maria Gonzalez',
      age: 35,
      gender: 'female',
      contact: '+1 (555) 111-7777',
      email: 'm.gonzalez@email.com',
      address: '678 Maple St, Uptown, USA',
      bloodGroup: 'B+',
      height: '5\'3"',
      weight: '120 lbs',
      allergies: ['Latex'],
      medicalHistory: ['Hypothyroidism'],
      currentMedications: ['Levothyroxine'],
    },
    {
      id: 6,
      name: 'Tom Clark',
      age: 40,
      gender: 'male',
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
      gender: 'female',
      contact: '+1 (555) 999-1111',
      email: 'n.drew@email.com',
      address: '135 Cherry St, Suburb, USA',
      bloodGroup: 'O-',
      height: '5\'7"',
      weight: '125 lbs',
      allergies: ['Bee stings'],
      medicalHistory: ['Anxiety'],
      currentMedications: ['Zoloft'],
    },
    {
      id: 8,
      name: 'George Hall',
      age: 60,
      gender: 'male',
      contact: '+1 (555) 666-0000',
      email: 'g.hall@email.com',
      address: '444 Cedar St, Bigcity, USA',
      bloodGroup: 'AB-',
      height: '6\'1"',
      weight: '200 lbs',
      allergies: ['Sulfa drugs'],
      medicalHistory: ['Arthritis', 'Hypertension'],
      currentMedications: ['Ibuprofen', 'Lisinopril'],
    },
    {
      id: 9,
      name: 'Emma Watson',
      age: 50,
      gender: 'female',
      contact: '+1 (555) 777-3333',
      email: 'emma.w@email.com',
      address: '999 Birch St, Lakeside, USA',
      bloodGroup: 'A+',
      height: '5\'4"',
      weight: '150 lbs',
      allergies: [],
      medicalHistory: ['Osteoporosis'],
      currentMedications: ['Calcium Supplement'],
    },
    {
      id: 10,
      name: 'Rick Martin',
      age: 38,
      gender: 'male',
      contact: '+1 (555) 888-5555',
      email: 'rick.m@email.com',
      address: '202 Willow St, Hillside, USA',
      bloodGroup: 'B-',
      height: '6\'0"',
      weight: '185 lbs',
      allergies: ['Dairy'],
      medicalHistory: ['Lactose Intolerance'],
      currentMedications: ['Lactase Enzyme'],
    },
  ]);

  // Filter and Sort Controls
  searchQuery = signal('');
  genderFilter = signal('all');
  bloodGroupFilter = signal('all');
  sortBy = signal('name-asc');

  // Pagination Controls
  currentPage = signal(1);
  itemsPerPage = 5;

  // Computed Properties
  filteredPatients = computed(() => {
    let patients = this.patients();

    // Apply search filter
    if (this.searchQuery()) {
      const query = this.searchQuery().toLowerCase();
      patients = patients.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.contact.toLowerCase().includes(query) ||
          p.email.toLowerCase().includes(query)
      );
    }

    // Apply gender filter
    if (this.genderFilter() !== 'all') {
      patients = patients.filter(
        (p) => p.gender.toLowerCase() === this.genderFilter().toLowerCase()
      );
    }

    // Apply blood group filter
    if (this.bloodGroupFilter() !== 'all') {
      patients = patients.filter(
        (p) => p.bloodGroup === this.bloodGroupFilter()
      );
    }

    // Apply sorting
    switch (this.sortBy()) {
      case 'name-asc':
        return [...patients].sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return [...patients].sort((a, b) => b.name.localeCompare(a.name));
      case 'age-asc':
        return [...patients].sort((a, b) => a.age - b.age);
      case 'age-desc':
        return [...patients].sort((a, b) => b.age - a.age);
      case 'recent':
        return [...patients].sort((a, b) => b.id - a.id);
      default:
        return patients;
    }
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredPatients().length / this.itemsPerPage))
  );

  paginatedPatients = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.filteredPatients().slice(start, start + this.itemsPerPage);
  });

  // Add this computed property
  displayRange = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage + 1;
    const end = Math.min(
      this.currentPage() * this.itemsPerPage,
      this.filteredPatients().length
    );
    return { start, end, total: this.filteredPatients().length };
  });

  ngOnInit(): void {
    // Initialization if needed
  }

  // Filter and Sort Methods
  updateSearch(query: string): void {
    this.searchQuery.set(query);
    this.resetToFirstPage();
  }

  changeGenderFilter(gender: string): void {
    this.genderFilter.set(gender);
    this.resetToFirstPage();
  }

  changeBloodGroupFilter(bloodGroup: string): void {
    this.bloodGroupFilter.set(bloodGroup);
    this.resetToFirstPage();
  }

  min(a: number, b: number): number {
    return Math.min(a, b);
  }

  changeSort(sortBy: string): void {
    this.sortBy.set(sortBy);
    this.resetToFirstPage();
  }

  // Pagination Methods
  resetToFirstPage(): void {
    this.currentPage.set(1);
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((p) => p + 1);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  getPages(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let start = Math.max(
      1,
      this.currentPage() - Math.floor(maxVisiblePages / 2)
    );
    let end = Math.min(start + maxVisiblePages - 1, this.totalPages());

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  // Patient Actions
  addNewPatient(): void {
    console.log('Add new patient');
    // Implement add functionality
  }

  editPatient(patient: Patient, event: Event): void {
    event.stopPropagation();
    console.log('Edit patient:', patient);
    // Implement edit functionality
  }

  viewMedicalHistory(patient: Patient, event: Event): void {
    event.stopPropagation();
    console.log('View medical history for:', patient);
    // Implement view history functionality
  }

  deletePatient(patient: Patient, event: Event): void {
    event.stopPropagation();
    if (confirm(`Are you sure you want to delete ${patient.name}'s record?`)) {
      this.patients.update((patients) =>
        patients.filter((p) => p.id !== patient.id)
      );
      console.log('Deleted patient:', patient);
    }
  }
}
