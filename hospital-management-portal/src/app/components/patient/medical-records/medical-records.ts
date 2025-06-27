import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faFileWaveform, 
  faFileMedical,
  faFilePrescription,
  faFileInvoice,
  faFileDownload,
  faFileCirclePlus
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-medical-records',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './medical-records.html',
  styleUrls: ['./medical-records.css']
})
export class MedicalRecordsComponent {
  icons = {
    medical: faFileWaveform,
    report: faFileMedical,
    prescription: faFilePrescription,
    invoice: faFileInvoice,
    download: faFileDownload,
    add: faFileCirclePlus
  };

  records = [
    {
      id: 1,
      type: 'Medical Report',
      date: '2023-06-10',
      doctor: 'Dr. Sarah Johnson',
      description: 'Cardiology consultation and test results',
      file: 'report_06102023.pdf'
    },
    {
      id: 2,
      type: 'Prescription',
      date: '2023-06-10',
      doctor: 'Dr. Sarah Johnson',
      description: 'Medications for hypertension',
      file: 'prescription_06102023.pdf'
    },
    {
      id: 3,
      type: 'Lab Results',
      date: '2023-05-15',
      doctor: 'Dr. James Wilson',
      description: 'Blood test and X-ray results',
      file: 'labresults_05152023.pdf'
    },
    {
      id: 4,
      type: 'Medical Report',
      date: '2023-04-22',
      doctor: 'Dr. Priya Mehta',
      description: 'Annual physical examination',
      file: 'physical_04222023.pdf'
    }
  ];

  categories = [
    { name: 'All Records', count: 12 },
    { name: 'Medical Reports', count: 5 },
    { name: 'Prescriptions', count: 4 },
    { name: 'Lab Results', count: 3 }
  ];
}