import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Institution } from '../models/institution.model';
import { Certificate } from '../models/certificate.model';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private baseUrl = `${environment.baseUrl}/institutions`;

  constructor(private http: HttpClient) {}

  updateInstitutionDetails(data: Institution): Observable<{ message: string; institution: Institution }> {
    return this.http.put<{ message: string; institution: Institution }>(`${this.baseUrl}/update`, data);
  }

  getAllCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(`${this.baseUrl}/certificates`);
  }

  getAllInstitutions(): Observable<Institution[]> {
    return this.http.get<Institution[]>(`${this.baseUrl}/all`);
  }
}
