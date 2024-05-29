import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Institution } from '../models/institution.model';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.baseUrl}/auth`;

  constructor(private http: HttpClient) {}

  loginInstitution(data: { email: string, password: string }): Observable<{ institution: Institution, token: string }> {
    return this.http.post<{ institution: Institution, token: string }>(`${this.baseUrl}/login`, data);
  }

  registerInstitution(data: { name: string, email: string, password: string }): Observable<Institution> {
    return this.http.post<Institution>(`${this.baseUrl}/register`, data);
  }

  loginStudent(data: { studentID: string, password: string }): Observable<{ student: Student, token: string }> {
    return this.http.post<{ student: Student, token: string }>(`${this.baseUrl}/student/login`, data);
  }

  registerStudent(data: { name: string, studentID: string, email: string, course: string, institutionID: string, password: string }): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/student/register`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  }

  
}
