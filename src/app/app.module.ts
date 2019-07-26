import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//Angular Material modules
import {CdkStepperModule, STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatStepperModule,
         MatFormFieldModule,
         MatInputModule,
         MatButtonModule,
         MatSelectModule,
         MatTableModule ,
         MatSnackBarModule ,
         MatTreeModule,
         MatIconModule,
         MatCardModule
          
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
    AddCrudComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
    FormsModule,
    CdkStepperModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule ,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    MatTreeModule,
    MatIconModule,
    MatCardModule
     
  ],
  providers: [
    {
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { showError: true }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
