import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { InstitutionService } from '../../../../services/institution.service';
import { Institution } from '../../../../models/institution.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm!: FormGroup;
  institution!: Institution; // Currently logged-in institution

  constructor(
    private fb: FormBuilder,
    private institutionService: InstitutionService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      name: [''],  // No initial Validators.required to allow empty submissions
      email: ['', Validators.email]  // Only validate email format if entered
    });

    // Fetch the current institution details stored after login
    this.institution = JSON.parse(localStorage.getItem('institution')!);  // Ensure institution details are stored as JSON string
    this.settingsForm.patchValue({
      name: this.institution.name,
      email: this.institution.email
    });
  }

  onUpdateSettings(): void {
    if (this.settingsForm.invalid) {
      alert('Please provide a valid email if you wish to update it.');
      return;
    }

    // Build the update object based on provided fields
    const updatedData = {
      institutionID: this.institution.institutionID,
      name: this.settingsForm.get('name')?.value || this.institution.name,
      email: this.settingsForm.get('email')?.value || this.institution.email
    };

    this.institutionService.updateInstitutionDetails(updatedData).subscribe({
      next: (response) => {
        alert('Settings updated successfully');
        // Optionally update local storage if institution details are stored there
        localStorage.setItem('institution', JSON.stringify(response.institution));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Update settings failed:', err);
      }
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
