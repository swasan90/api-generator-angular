 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectDomain } from '../model/projectDomain';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public selectedDomain:ProjectDomain
  constructor(private httpClient:HttpClient) { }

  public listAllProjects():Observable<any>{
    return this.httpClient.get(environment.api_url+"getProjectList");
  }

  public setDomainForCrudOps(domain:ProjectDomain){
      localStorage.setItem("currentDomain",JSON.stringify(domain));
      this.selectedDomain = domain;
  }

  public getSelectedDomainForCrudOps(){
    return JSON.parse(localStorage.getItem("currentDomain"));
  }
}
