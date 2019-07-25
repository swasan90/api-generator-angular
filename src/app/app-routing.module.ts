import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

//Importing components

import { FullLayoutComponent } from './layout/full-layout/full-layout.component';
import { ApiGeneratorComponent } from './api-generator/api-generator.component';
import { DashboardComponent } from './dashboard/dashboard.component';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'api/dashboard',
    pathMatch: 'full'
  },
   
  {
    path: 'api',
    component: FullLayoutComponent,
    children: [
      {
        path: 'create_api',
        component: ApiGeneratorComponent
      } ,
      {
        path: 'dashboard',
        component: DashboardComponent
      }      
    ]

  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
