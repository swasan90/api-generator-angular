import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

//Importing components

import { FullLayoutComponent } from './layout/full-layout/full-layout.component';
import { ApiGeneratorComponent } from './api-generator/api-generator.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrudProcessorComponent } from './crud-processor/crud-processor.component';
import { AddCrudComponent } from './crud-processor/add-crud/add-crud.component';
import { LogoutComponent } from './auth/logout.component';
import { AuthGuard } from './auth/auth-guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
 
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'api/dashboard/:id',
    pathMatch: 'full'
  },

  {
    path: 'api',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create_api',
        component: ApiGeneratorComponent
      },
      {
        path: 'dashboard/:id',
        component: DashboardComponent
      },
      {
        path: 'crud_processor',
        component: CrudProcessorComponent
      },
      {
        path: 'crud_processor/add',
        component: AddCrudComponent
      },
      {
        path: 'crud_processor/edit',
        component: AddCrudComponent
      }       

    ]

  },
  {
    path:'auth',
    component:FullLayoutComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path:'logout',
        component:LogoutComponent
      }
    ]
  },{
    path:'user',
    component:FullLayoutComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path:'profile',
        component:UserProfileComponent
      }
    ]
  },
  {
    path:'NotFound',
    component:NotFoundComponent,   
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
