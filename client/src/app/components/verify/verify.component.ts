import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CertificateService } from '../../services/certificate.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent implements OnInit {

  isLoading: boolean = true;
  isValid: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private certificateService: CertificateService
  ) {}

  ngOnInit(): void {
    const institutionId = this.route.snapshot.paramMap.get('institutionId');
    const studentId = this.route.snapshot.paramMap.get('studentId');
    this.verifyCertificate(institutionId, studentId);
  }

  verifyCertificate(institutionId: string | null, studentId: string | null): void {
    if (institutionId && studentId) {
      this.certificateService.verifyCertificate(institutionId, studentId).subscribe({
        next: (response) => {
          this.isValid = response.isValid;
          this.isLoading = false;
        },
        error: () => {
          this.isValid = false;
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
      // Handle error or invalid URL params
    }
  }

}
