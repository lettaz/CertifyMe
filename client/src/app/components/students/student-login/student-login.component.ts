import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Student } from '../../../models/student.model';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrl: './student-login.component.scss'
})
export class StudentLoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      studentID: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.loginStudent(this.loginForm.value).subscribe(
      data => {
        localStorage.setItem('token', data.token); // Save token to local storage
        localStorage.setItem('userType', 'student'); // Set user type to student
        localStorage.setItem('student', JSON.stringify(data.student)); // Store student details
        this.router.navigate(['/student/dashboard']); // Navigate to dashboard after login
      },
      error => {
        console.error('Login error', error);
      }
    );
  }
}
