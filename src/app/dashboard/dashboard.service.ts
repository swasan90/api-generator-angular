import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectDomain } from '../model/projectDomain';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * Dashboard service class.
 */
export class DashboardService {

  public selectedDomain: ProjectDomain
  constructor(private httpClient: HttpClient) { }

  /**
   * Function to list all projects.
   */
  public listAllProjects(): Observable<any> {
    return this.httpClient.get(environment.api_url + "getProjectList");
  }

  /**
   * Function to set domain for crud operations.
   * @param domain 
   */
  public setDomainForCrudOps(domain: ProjectDomain) {
    localStorage.setItem("currentDomain", JSON.stringify(domain));
    this.selectedDomain = domain;
  }

  /**
   * Function to get selected domain for crud operation.
   */
  public getSelectedDomainForCrudOps() {
    return JSON.parse(localStorage.getItem("currentDomain"));
  }
}
