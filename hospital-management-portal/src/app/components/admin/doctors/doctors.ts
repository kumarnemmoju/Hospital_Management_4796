import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faUserDoctor,
  faSearch,
  faPlus,
  faChevronDown,
  faChevronUp,
  faStar,
  faPhone,
  faEnvelope,
  faCalendarCheck,
  faMoneyBillWave,
  faLanguage,
  faAward,
  faHospital,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';

interface Doctor {
  id: number;
  name: string;
  gender: string;
  age: number;
  specialty: string;
  qualifications: string;
  experience: string;
  currentHospital: string;
  previousHospitals: string[];
  biography: string;
  achievements: string[];
  languages: string[];
  certifications: string[];
  availability: string;
  consultationFee: string;
  onlineBookingAvailable: boolean;
  contactEmail: string;
  contactPhone: string;
  photo: string;
  rating: number;
  reviews: {
    reviewer: string;
    comment: string;
    stars: number;
  }[];
  social: {
    linkedin: string;
    twitter: string;
  };
}

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './doctors.html',
  styleUrls: ['./doctors.css'],
})
export class DoctorsComponent {
  // Font Awesome Icons
  icons = {
    userDoctor: faUserDoctor,
    search: faSearch,
    plus: faPlus,
    chevronDown: faChevronDown,
    chevronUp: faChevronUp,
    star: faStar,
    phone: faPhone,
    email: faEnvelope,
    calendar: faCalendarCheck,
    money: faMoneyBillWave,
    language: faLanguage,
    award: faAward,
    hospital: faHospital,
    graduation: faGraduationCap,
    linkedin: faLinkedin,
    twitter: faTwitter,
  };

  // Doctor Data
  doctors = signal<Doctor[]>([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      gender: 'Female',
      age: 38,
      specialty: 'Cardiologist',
      qualifications: 'MD, FACC, Board Certified in Cardiology',
      experience: '12 Years',
      currentHospital: 'Metro Heart Institute',
      previousHospitals: ['City General Hospital', 'University Medical Center'],
      biography:
        'Specializes in interventional cardiology with expertise in complex coronary interventions.',
      achievements: [
        'Top Cardiologist Award 2022',
        'Published 15+ research papers',
        'Keynote speaker at International Cardiology Conference',
      ],
      languages: ['English', 'Spanish', 'French'],
      certifications: ['FACC', 'SCAI Fellow'],
      availability: 'Mon-Wed-Fri, 9AM-5PM',
      consultationFee: '$250',
      onlineBookingAvailable: true,
      contactEmail: 's.johnson@metroheart.com',
      contactPhone: '+1 (555) 123-4567',
      photo: 'assets/doctors/dr-johnson.jpg',
      rating: 4.9,
      reviews: [
        {
          reviewer: 'Michael T.',
          comment:
            'Dr. Johnson saved my life with her quick diagnosis and treatment.',
          stars: 5,
        },
        {
          reviewer: 'Lisa R.',
          comment: 'Very thorough and explains everything clearly.',
          stars: 4.5,
        },
      ],
      social: {
        linkedin: 'https://linkedin.com/in/sarahjohnson-md',
        twitter: 'https://twitter.com/drsarahj',
      },
    },
    {
      id: 2,
      name: 'Dr. James Wilson',
      gender: 'Male',
      age: 45,
      specialty: 'Orthopedic Surgeon',
      qualifications: 'MD, FAAOS, Joint Replacement Specialist',
      experience: '18 Years',
      currentHospital: 'Advanced Ortho Center',
      previousHospitals: ['Regional Medical Center', 'Veterans Hospital'],
      biography:
        'Expert in minimally invasive joint replacements and sports medicine.',
      achievements: [
        'Performed 1000+ successful joint replacements',
        'Developed new surgical technique for knee replacements',
        'Team physician for State University Athletics',
      ],
      languages: ['English', 'German'],
      certifications: ['ABOS Certified', 'Sports Medicine Fellowship'],
      availability: 'Tue-Thu-Sat, 8AM-4PM',
      consultationFee: '$300',
      onlineBookingAvailable: true,
      contactEmail: 'j.wilson@advancedortho.com',
      contactPhone: '+1 (555) 987-6543',
      photo: 'assets/doctors/dr-wilson.jpg',
      rating: 4.7,
      reviews: [
        {
          reviewer: 'Robert K.',
          comment:
            'My hip replacement went perfectly. Back to golfing in 3 months!',
          stars: 5,
        },
        {
          reviewer: 'Susan M.',
          comment: 'Excellent surgeon but wait times can be long.',
          stars: 4,
        },
      ],
      social: {
        linkedin: 'https://linkedin.com/in/jameswilson-md',
        twitter: '',
      },
    },
    {
      id: 3,
      name: 'Dr. Priya Mehta',
      gender: 'Female',
      age: 42,
      specialty: 'Pediatrician',
      qualifications: 'MBBS, MD Pediatrics',
      experience: '15 Years',
      currentHospital: 'Bright Children Hospital',
      previousHospitals: ['Mother & Child Clinic'],
      biography:
        'Dedicated to the well-being and health of children and adolescents.',
      achievements: [
        'National Pediatric Care Award 2021',
        'Published 10 articles',
      ],
      languages: ['English', 'Hindi', 'Tamil'],
      certifications: ['Board Certified Pediatrician'],
      availability: 'Mon-Fri, 10AM-6PM',
      consultationFee: '$200',
      onlineBookingAvailable: true,
      contactEmail: 'priya.mehta@brightkids.com',
      contactPhone: '+1 (555) 234-5678',
      photo: 'assets/doctors/dr-mehta.jpg',
      rating: 4.8,
      reviews: [
        {
          reviewer: 'Aarav R.',
          comment: 'Excellent doctor, very kind with kids.',
          stars: 5,
        },
      ],
      social: {
        linkedin: 'https://linkedin.com/in/priyamehta-ped',
        twitter: '',
      },
    },
    {
      id: 4,
      name: 'Dr. David Kim',
      gender: 'Male',
      age: 50,
      specialty: 'Dermatologist',
      qualifications: 'MD, FAAD',
      experience: '20 Years',
      currentHospital: 'SkinCare Experts',
      previousHospitals: ['City Dermatology Clinic'],
      biography: 'Specialist in skin disorders and cosmetic dermatology.',
      achievements: ['Developed popular acne treatment formula'],
      languages: ['English', 'Korean'],
      certifications: ['Board Certified Dermatologist'],
      availability: 'Mon-Tue-Thu, 9AM-3PM',
      consultationFee: '$180',
      onlineBookingAvailable: false,
      contactEmail: 'd.kim@skincarex.com',
      contactPhone: '+1 (555) 876-5432',
      photo: 'assets/doctors/dr-kim.jpg',
      rating: 4.6,
      reviews: [
        {
          reviewer: 'Nina H.',
          comment: 'Great for skin care advice and treatments.',
          stars: 4.5,
        },
      ],
      social: {
        linkedin: '',
        twitter: '',
      },
    },
    {
      id: 5,
      name: 'Dr. Anjali Rao',
      gender: 'Female',
      age: 36,
      specialty: 'Gynecologist',
      qualifications: 'MBBS, MS Obstetrics & Gynecology',
      experience: '10 Years',
      currentHospital: 'Women’s Wellness Hospital',
      previousHospitals: ['City Women’s Center'],
      biography:
        'Expert in high-risk pregnancies and women’s health education.',
      achievements: ['Young Achiever Award in OBGYN'],
      languages: ['English', 'Kannada', 'Telugu'],
      certifications: ['Certified Gynecological Surgeon'],
      availability: 'Mon-Fri, 9AM-4PM',
      consultationFee: '$220',
      onlineBookingAvailable: true,
      contactEmail: 'a.rao@womenswellness.com',
      contactPhone: '+1 (555) 333-1122',
      photo: 'assets/doctors/dr-rao.jpg',
      rating: 4.8,
      reviews: [
        {
          reviewer: 'Sita K.',
          comment: 'Supportive and explains everything in detail.',
          stars: 5,
        },
      ],
      social: {
        linkedin: 'https://linkedin.com/in/anjalirao-obgyn',
        twitter: '',
      },
    },
    {
      id: 6,
      name: 'Dr. Alex Martinez',
      gender: 'Male',
      age: 39,
      specialty: 'Neurologist',
      qualifications: 'MD, PhD Neurology',
      experience: '14 Years',
      currentHospital: 'Brain & Spine Clinic',
      previousHospitals: ['NeuroCare Center'],
      biography:
        'Focused on treatment of epilepsy, Parkinson’s, and neurodegeneration.',
      achievements: ['Developed neuro-rehabilitation protocol'],
      languages: ['English', 'Spanish'],
      certifications: ['Board Certified Neurologist'],
      availability: 'Tue-Fri, 11AM-6PM',
      consultationFee: '$270',
      onlineBookingAvailable: false,
      contactEmail: 'a.martinez@neuroclinic.com',
      contactPhone: '+1 (555) 776-9823',
      photo: 'assets/doctors/dr-martinez.jpg',
      rating: 4.7,
      reviews: [
        {
          reviewer: 'Carlos D.',
          comment: 'Very knowledgeable and listens carefully.',
          stars: 4.5,
        },
      ],
      social: {
        linkedin: '',
        twitter: 'https://twitter.com/dralexmartinez',
      },
    },
    {
      id: 7,
      name: 'Dr. Emily Stone',
      gender: 'Female',
      age: 41,
      specialty: 'Endocrinologist',
      qualifications: 'MD, FACE',
      experience: '13 Years',
      currentHospital: 'Hormone Health Institute',
      previousHospitals: ['City Endocrine Center'],
      biography:
        'Helps patients manage diabetes, thyroid, and hormone disorders.',
      achievements: ['Recognized for Diabetes Awareness Campaign 2022'],
      languages: ['English'],
      certifications: ['Board Certified in Endocrinology'],
      availability: 'Mon-Wed-Fri, 10AM-5PM',
      consultationFee: '$240',
      onlineBookingAvailable: true,
      contactEmail: 'e.stone@hormonehealth.com',
      contactPhone: '+1 (555) 101-2222',
      photo: 'assets/doctors/dr-stone.jpg',
      rating: 4.9,
      reviews: [
        {
          reviewer: 'Daniel P.',
          comment: 'Helped me get my thyroid issues under control.',
          stars: 5,
        },
      ],
      social: {
        linkedin: 'https://linkedin.com/in/emilystone-md',
        twitter: '',
      },
    },
    {
      id: 8,
      name: 'Dr. Omar Hassan',
      gender: 'Male',
      age: 44,
      specialty: 'Pulmonologist',
      qualifications: 'MD, FCCP',
      experience: '17 Years',
      currentHospital: 'LungCare Hospital',
      previousHospitals: ['City Chest Hospital'],
      biography: 'Experienced in asthma, COPD, and critical care medicine.',
      achievements: ['Developed protocol for COVID-19 ICU care'],
      languages: ['English', 'Arabic'],
      certifications: ['FCCP', 'Critical Care Fellowship'],
      availability: 'Tue-Thu-Sat, 10AM-4PM',
      consultationFee: '$260',
      onlineBookingAvailable: true,
      contactEmail: 'o.hassan@lungcare.com',
      contactPhone: '+1 (555) 888-6644',
      photo: 'assets/doctors/dr-hassan.jpg',
      rating: 4.6,
      reviews: [
        {
          reviewer: 'Reema N.',
          comment: 'Kind doctor, very experienced in respiratory care.',
          stars: 4.5,
        },
      ],
      social: {
        linkedin: '',
        twitter: 'https://twitter.com/drhassanpulmo',
      },
    },
  ]);

  // Filter and Sort Controls
  searchQuery = signal('');
  genderFilter = signal('all');
  specialtyFilter = signal('all');
  sortBy = signal('name-asc');

  // Pagination Controls
  currentPage = signal(1);
  itemsPerPage = 5;

  // Track expanded state for each doctor
  expandedDoctorId = signal<number | null>(null);

  // Computed Properties
  filteredDoctors = computed(() => {
    let doctors = this.doctors();

    // Apply search filter
    if (this.searchQuery()) {
      const query = this.searchQuery().toLowerCase();
      doctors = doctors.filter(
        (d) =>
          d.name.toLowerCase().includes(query) ||
          d.specialty.toLowerCase().includes(query) ||
          d.currentHospital.toLowerCase().includes(query)
      );
    }

    // Apply gender filter
    if (this.genderFilter() !== 'all') {
      doctors = doctors.filter(
        (d) => d.gender.toLowerCase() === this.genderFilter().toLowerCase()
      );
    }

    // Apply specialty filter
    if (this.specialtyFilter() !== 'all') {
      doctors = doctors.filter(
        (d) =>
          d.specialty.toLowerCase() === this.specialtyFilter().toLowerCase()
      );
    }

    // Apply sorting
    switch (this.sortBy()) {
      case 'name-asc':
        return [...doctors].sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return [...doctors].sort((a, b) => b.name.localeCompare(a.name));
      case 'experience-asc':
        return [...doctors].sort(
          (a, b) => parseInt(a.experience) - parseInt(b.experience)
        );
      case 'experience-desc':
        return [...doctors].sort(
          (a, b) => parseInt(b.experience) - parseInt(a.experience)
        );
      case 'rating-asc':
        return [...doctors].sort((a, b) => a.rating - b.rating);
      case 'rating-desc':
        return [...doctors].sort((a, b) => b.rating - a.rating);
      default:
        return doctors;
    }
  });

  specialties = computed(() => {
    const specialties = new Set<string>();
    this.doctors().forEach((d) => specialties.add(d.specialty));
    return Array.from(specialties).sort();
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredDoctors().length / this.itemsPerPage))
  );

  paginatedDoctors = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.filteredDoctors().slice(start, start + this.itemsPerPage);
  });

  displayRange = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage + 1;
    const end = Math.min(
      this.currentPage() * this.itemsPerPage,
      this.filteredDoctors().length
    );
    return { start, end, total: this.filteredDoctors().length };
  });

  // Methods
  toggleDoctorDetails(doctorId: number): void {
    this.expandedDoctorId.set(
      this.expandedDoctorId() === doctorId ? null : doctorId
    );
  }

  updateSearch(query: string): void {
    this.searchQuery.set(query);
    this.resetToFirstPage();
  }

  changeGenderFilter(gender: string): void {
    this.genderFilter.set(gender);
    this.resetToFirstPage();
  }

  changeSpecialtyFilter(specialty: string): void {
    this.specialtyFilter.set(specialty);
    this.resetToFirstPage();
  }

  changeSort(sortBy: string): void {
    this.sortBy.set(sortBy);
    this.resetToFirstPage();
  }

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

  getStarRating(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push('full');
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push('half');
      } else {
        stars.push('empty');
      }
    }

    return stars;
  }
}
