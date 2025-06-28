import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
}

interface AuthResponse {
  token: string;
  role: string;
  userId: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
 private readonly API_URL = `${environment.apiUrl}/auth`;  
  private readonly ADMIN_KEY = 'admin_auth';
  private readonly PATIENT_KEY = 'patient_auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Admin auth methods
  adminLogin(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => {
        this.clearPatientSession();
        localStorage.setItem(this.ADMIN_KEY, JSON.stringify(response));
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  adminRegister(data: RegisterData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register/admin`, data).pipe(
      tap(response => {
        this.clearPatientSession();
        localStorage.setItem(this.ADMIN_KEY, JSON.stringify(response));
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  // Patient auth methods
  patientLogin(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => {
        this.clearAdminSession();
        localStorage.setItem(this.PATIENT_KEY, JSON.stringify(response));
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  patientRegister(data: RegisterData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register/patient`, {
      ...data,
      phone: data.phone || '',
      dateOfBirth: data.dateOfBirth || '',
      gender: data.gender || ''
    }).pipe(
      tap(response => {
        this.clearAdminSession();
        localStorage.setItem(this.PATIENT_KEY, JSON.stringify(response));
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  adminLogout(): void {
    this.clearAdminSession();
    this.router.navigate(['/admin-header/login']);
  }

  patientLogout(): void {
    this.clearPatientSession();
    this.router.navigate(['/patient/login']);
  }

  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem(this.ADMIN_KEY);
  }

  isPatientLoggedIn(): boolean {
    return !!localStorage.getItem(this.PATIENT_KEY);
  }

  getCurrentAdmin(): AuthResponse | null {
    const data = localStorage.getItem(this.ADMIN_KEY);
    return data ? JSON.parse(data) : null;
  }

  getCurrentPatient(): AuthResponse | null {
    const data = localStorage.getItem(this.PATIENT_KEY);
    return data ? JSON.parse(data) : null;
  }

  private clearAdminSession(): void {
    localStorage.removeItem(this.ADMIN_KEY);
  }

  private clearPatientSession(): void {
    localStorage.removeItem(this.PATIENT_KEY);
  }

  clearAllAuthData(): void {
    this.clearAdminSession();
    this.clearPatientSession();
  }
}