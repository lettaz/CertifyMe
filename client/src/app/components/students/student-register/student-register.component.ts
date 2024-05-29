import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { InstitutionService } from '../../../services/institution.service';
import { Institution } from '../../../models/institution.model';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrl: './student-register.component.scss'
})
export class StudentRegisterComponent implements OnInit {

  registerForm!: FormGroup;
  institutions: Institution[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private institutionService: InstitutionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      studentID: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      course: ['', Validators.required],
      institutionID: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, Validators.requiredTrue]
    });

    this.loadInstitutions();
  }

  loadInstitutions(): void {
    this.institutionService.getAllInstitutions().subscribe({
      next: (institutions) => this.institutions = institutions,
      error: (err) => console.error('Error loading institutions:', err)
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.registerStudent(this.registerForm.value).subscribe(
      response => {
        console.log('Student registration successful', response);
        this.router.navigate(['/student/login']);
      },
      error => {
        console.error('Registration error', error);
      }
    );
  }


}
