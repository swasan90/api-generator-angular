import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProjectDomain } from 'src/app/model/projectDomain';

@Injectable({
  providedIn: 'root'
})
export class ProjectGeneratorService {

  constructor(private httpClient:HttpClient) { }


  public createProject(projectObj:ProjectDomain):Observable<any>{
      return this.httpClient.post(environment.api_url+"createProject",projectObj);
  }
}
