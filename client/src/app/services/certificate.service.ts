import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Certificate } from '../models/certificate.model';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private baseUrl = `${environment.baseUrl}/certificates`;

  constructor(private http: HttpClient) {}

  issueCertificate(data: { studentID: string, course: string }): Observable<Certificate> {
    return this.http.post<Certificate>(`${this.baseUrl}/issue`, data);
  }

  revokeCertificate(certID: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/revoke`, { certID });
  }

  verifyCertificate(institutionId: string, studentId: string): Observable<{ isValid: boolean }> {
    return this.http.get<{ isValid: boolean }>(`${this.baseUrl}/verify/${institutionId}/${studentId}`);
  }
}
