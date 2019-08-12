import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular Material modules
import { CdkStepperModule, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatTableModule,
  MatSnackBarModule,
  MatTreeModule,
  MatIconModule,
  MatCardModule,
  MatRadioModule

}
  from '@angular/material';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FullLayoutComponent } from './layout/full-layout/full-layout.component';
import { ApiGeneratorComponent } from './api-generator/api-generator.component';
import { ProjectGeneratorComponent } from './api-generator/project-generator/project-generator.component';
import { DomainFieldGeneratorComponent } from './api-generator/domain-field-generator/domain-field-generator.component';
import { ApiListGeneratorComponent } from './api-generator/api-list-generator/api-list-generator.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RemoveUnderscorePipe } from './remove-underscore-pipe';
import { CrudProcessorComponent } from './crud-processor/crud-processor.component';
import { AddCrudComponent } from './crud-processor/add-crud/add-crud.component';
import { MatCardContentComponent } from './crud-processor/add-crud/mat-card-content.component';
import { MatCardHeaderComponent } from './crud-processor/add-crud/mat-card-header.component';
import { StartUpService, startupServiceFactory } from './startup-service'; 
import { LogoutComponent } from './auth/logout.component';
import { JwtModule, JwtInterceptor } from '@auth0/angular-jwt';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorInterceptor } from './errorHandlers/error.interceptor';
 

export function tokenGetter() {
  return localStorage.getItem('jwtToken');
}


@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ApiGeneratorComponent,
    ProjectGeneratorComponent,
    DomainFieldGeneratorComponent,
    ApiListGeneratorComponent,
    DashboardComponent,
    RemoveUnderscorePipe,
    CrudProcessorComponent,
    AddCrudComponent,
    MatCardContentComponent,
    MatCardHeaderComponent,
    LogoutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,    
    AppRoutingModule,
    BrowserAnimationsModule,     
    CdkStepperModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    MatTreeModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["http://localhost:8080/","http://localhost:8081/"],
        skipWhenExpired:true,
        throwNoTokenError: true,         
      }
    }),
    HttpClientModule

  ],
  providers: [       
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,multi: true },
    StartUpService,
    {
      //provider for App Initializer
      provide: APP_INITIALIZER,
      useFactory:startupServiceFactory,
      deps:[StartUpService],
      multi:true,
    },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    },    
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
   ],
  bootstrap: [AppComponent]
})


export class AppModule { }
