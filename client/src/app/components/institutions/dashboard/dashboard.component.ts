import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CertificateService } from '../../../services/certificate.service';
import { InstitutionService } from '../../../services/institution.service';
import { AuthService } from '../../../services/auth.service';
import { Certificate } from '../../../models/certificate.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  issueCertificateForm!: FormGroup;
  certificates: Certificate[] = [];
  isLoading = false;

  constructor(private fb: FormBuilder, private certificateService: CertificateService, private institutionService: InstitutionService, private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.issueCertificateForm = this.fb.group({
      studentID: ['', Validators.required],
      course: ['', Validators.required]
    });
    this.loadCertificates();
  }

  onIssueCertificate(): void {
    if (this.issueCertificateForm.valid) {
      this.isLoading = true; // Start loading
      this.certificateService.issueCertificate(this.issueCertificateForm.value).subscribe({
        next: (cert) => {
          this.certificates.push(cert);
          this.issueCertificateForm.reset();
          this.loadCertificates();
          this.isLoading = false; // Stop loading
        },
        error: (err) => {
          console.error('Error issuing certificate:', err);
          this.isLoading = false; // Stop loading
        }
      });
    }
  }

  onRevokeCertificate(certID: string): void {
    this.isLoading = true; // Start loading
    this.certificateService.revokeCertificate(certID).subscribe({
      next: (response) => {
        this.certificates = this.certificates.filter(c => c.certID !== certID);
        alert(response.message);
        this.isLoading = false; // Stop loading
      },
      error: (err) => {
        console.error('Error revoking certificate:', err);
        this.isLoading = false; // Stop loading
      }
    });
  }

  loadCertificates(): void {
    this.institutionService.getAllCertificates().subscribe({
      next: (certs) => this.certificates = certs,
      error: (err) => console.error('Error loading certificates:', err)
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/institution/login']);
  }

  Settings(): void {
    this.router.navigate(['/institution/settings']);
  }

  Certificates(): void {
    this.router.navigate(['/institution/dashboard']);
  }
}
