// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/institutions/login/login.component';
import { RegisterComponent } from './components/institutions/register/register.component';
import { DashboardComponent } from './components/institutions/dashboard/dashboard.component';


import {  StudentLoginComponent } from './components/students/student-login/student-login.component';
import { StudentRegisterComponent } from './components/students/student-register/student-register.component';
import { StudentDashboardComponent } from './components/students/student-dashboard/student-dashboard.component';
import { StudentSettingsComponent } from './components/students/student-dashboard/student-settings/student-settings.component';

import { VerifyComponent } from './components/verify/verify.component';

import { AuthGuard } from './guards/auth.guard';
import { SettingsComponent } from './components/institutions/dashboard/settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/institution/login', pathMatch: 'full' },
  {
    path: 'institution',
    children: [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
        { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'student',
    children: [
        { path: 'login', component: StudentLoginComponent },
        { path: 'register', component: StudentRegisterComponent },
        { path: 'dashboard', component: StudentDashboardComponent, canActivate: [AuthGuard] },
        { path: 'settings', component: StudentSettingsComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'verify/:institutionId/:studentId', component: VerifyComponent },

  // Add other routes for students and external institutions here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

