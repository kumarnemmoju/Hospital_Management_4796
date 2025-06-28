import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  // Remove 'private' to make it accessible in template
  constructor(public auth: AuthService, public router: Router) {}

  logout() {
    this.auth.adminLogout();
    this.router.navigate(['/admin-header/login']);
  }
}