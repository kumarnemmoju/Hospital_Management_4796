import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './patient-header.html',
  styleUrls: ['./patient-header.css']
})
export class PatientHeaderComponent {
  constructor(public auth: AuthService, public router: Router) {}

  logout() {
    this.auth.patientLogout();
    this.router.navigate(['/patient/login']);
  }

  navigateToAuth() {
    if (!this.auth.isPatientLoggedIn()) {
      this.router.navigate(['/patient/register']);
    }
  }
}