import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faSearch, 
  faFilter, 
  faStar, 
  faUserDoctor,
  faCalendar,
  faLocationDot,
  faArrowRight,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  location: string;
  availability: string;
  image: string;
  languages: string[];
  consultationFee: number;
  isExpanded?: boolean;
}

@Component({
  selector: 'app-find-doctors',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule,FormsModule ],
  templateUrl: './find-doctors.html',
  styleUrls: ['./find-doctors.css']
})
export class FindDoctorsComponent {
  icons = {
    search: faSearch,
    filter: faFilter,
    star: faStar,
    doctor: faUserDoctor,
    calendar: faCalendar,
    location: faLocationDot,
    arrow: faArrowRight,
    chevronDown: faChevronDown,
    chevronUp: faChevronUp
  };

  specialties = [
    'All Specialties',
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Gynecology',
    'General Medicine'
  ];

  doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      rating: 4.9,
      reviews: 128,
      experience: '12 years',
      location: 'Metro Heart Institute',
      availability: 'Mon, Wed, Fri (9AM-5PM)',
      image: 'assets/doctors/dr-johnson.jpg',
      languages: ['English', 'Spanish'],
      consultationFee: 250
    },
    {
      id: 2,
      name: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      rating: 4.7,
      reviews: 95,
      experience: '15 years',
      location: 'Advanced Ortho Center',
      availability: 'Tue, Thu, Sat (8AM-4PM)',
      image: 'assets/doctors/dr-wilson.jpg',
      languages: ['English', 'German'],
      consultationFee: 300
    },
    {
      id: 3,
      name: 'Dr. Priya Mehta',
      specialty: 'Pediatrics',
      rating: 4.8,
      reviews: 76,
      experience: '10 years',
      location: 'Bright Children Hospital',
      availability: 'Mon-Fri (10AM-6PM)',
      image: 'assets/doctors/dr-mehta.jpg',
      languages: ['English', 'Hindi', 'Tamil'],
      consultationFee: 200
    },
    {
      id: 4,
      name: 'Dr. David Kim',
      specialty: 'Dermatology',
      rating: 4.6,
      reviews: 64,
      experience: '8 years',
      location: 'SkinCare Experts',
      availability: 'Mon, Tue, Thu (9AM-3PM)',
      image: 'assets/doctors/dr-kim.jpg',
      languages: ['English', 'Korean'],
      consultationFee: 180
    }
  ];

  filteredDoctors = [...this.doctors];
  selectedSpecialty = 'All Specialties';
  searchQuery = '';

  filterDoctors(): void {
    this.filteredDoctors = this.doctors.filter(doctor => {
      const matchesSpecialty = this.selectedSpecialty === 'All Specialties' || 
                             doctor.specialty === this.selectedSpecialty;
      const matchesSearch = doctor.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                          doctor.specialty.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesSpecialty && matchesSearch;
    });
  }

  toggleDoctorDetails(doctor: Doctor): void {
    doctor.isExpanded = !doctor.isExpanded;
  }

  getStarRating(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  hasHalfStar(rating: number): boolean {
    return rating % 1 >= 0.5;
  }
}