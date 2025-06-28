import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Skip for auth requests or if no token exists
  if (req.url.includes('/auth/') || 
      (!authService.isAdminLoggedIn() && !authService.isPatientLoggedIn())) {
    return next(req);
  }

  // Get the auth token
  const authData = authService.isAdminLoggedIn()
    ? authService.getCurrentAdmin()
    : authService.getCurrentPatient();

  if (authData?.token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authData.token}`)
    });

    return next(authReq).pipe(
      catchError((error) => {
        if (error.status === 401) {
          authService.clearAllAuthData();
          router.navigate(['/']);
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};
