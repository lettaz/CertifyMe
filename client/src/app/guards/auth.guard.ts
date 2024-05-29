import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');

    if (token) {
      return true;
    } else {
      // Use userType from localStorage to decide redirection or default to institution login
      if (userType === 'student') {
        this.router.navigate(['/student/login']);
      } else {
        // Default to institution login if userType is 'institution' or not set
        this.router.navigate(['/institution/login']);
      }
      return false;
    }
  }
}
