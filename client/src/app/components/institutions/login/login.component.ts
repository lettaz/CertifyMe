import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
  
    this.authService.loginInstitution(this.loginForm.value).subscribe(
      data => {
        localStorage.setItem('token', data.token); // Save token to local storage
        localStorage.setItem('userType', 'institution');
        localStorage.setItem('institution', JSON.stringify(data.institution)); // Store institution details
        this.router.navigate(['/institution/dashboard']); // Navigate to dashboard after login
      },
      error => {
        console.error('Login error', error);
      }
    );
  }
}
