// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/institutions/login/login.component';
import { RegisterComponent } from './components/institutions/register/register.component';
import { DashboardComponent } from './components/institutions/dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { SettingsComponent } from './components/institutions/dashboard/settings/settings.component';
import {  StudentLoginComponent } from './components/students/student-login/student-login.component';
import { StudentRegisterComponent } from './components/students/student-register/student-register.component';
import { StudentDashboardComponent } from './components/students/student-dashboard/student-dashboard.component';
import { StudentSettingsComponent } from './components/students/student-dashboard/student-settings/student-settings.component';
import { VerifyComponent } from './components/verify/verify.component';

import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    SettingsComponent,
    StudentDashboardComponent,
    StudentLoginComponent,
    StudentRegisterComponent,
    StudentSettingsComponent,
    VerifyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

