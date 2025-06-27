import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-patient-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink,RouterLinkActive],
  templateUrl: './patient-header.html',
  styleUrls: ['./patient-header.css']
})
export class PatientHeaderComponent {
  // Component logic can go here
}