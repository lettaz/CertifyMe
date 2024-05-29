import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent {
  hasCertificate: boolean = false;
  verificationLink: string = '';
  studentName: string = '';  // Added to use in the template

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkCertificateStatus();
    this.fetchStudentDetails();
  }

  fetchStudentDetails(): void {
    const studentData = JSON.parse(localStorage.getItem('student')!);
    this.studentName = studentData.name;  // Assuming 'name' is a property of the student object
    this.verificationLink = `${window.location.origin}/verify/${studentData.institutionID}/${studentData.studentID}`;
  }

  checkCertificateStatus(): void {
    this.studentService.checkCertificate().subscribe({
      next: (response) => this.hasCertificate = response.hasCertificate,
      error: (err) => console.error('Error checking certificate status:', err)
    });
  }

  copyLink(): void {
    navigator.clipboard.writeText(this.verificationLink).then(() => {
      alert(`Verification link copied to clipboard! Show it off, ${this.studentName}!`);
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/student/login']);
  }

  Settings():void{
    this.router.navigate(['/student/settings']);
  }
  
}
