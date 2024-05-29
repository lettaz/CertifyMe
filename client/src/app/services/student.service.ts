import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = `${environment.baseUrl}/students`;

  constructor(private http: HttpClient) {}

  updateStudentDetails(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, data);
  }

  // Function to check if a student has a certificate
  checkCertificate(): Observable<{ hasCertificate: boolean; studentID: string; certID: string }> {
    return this.http.get<{ hasCertificate: boolean; studentID: string; certID: string }>(`${this.baseUrl}/check-certificate`);
  }

}
