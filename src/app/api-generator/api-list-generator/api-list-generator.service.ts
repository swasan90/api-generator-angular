import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiEndPoints } from 'src/app/model/api-endpoints';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiListGeneratorService {
  
  
  constructor(private httpClient:HttpClient) { }

  public getApiEndpointsForProject(projectId:string):Observable<any>{    
    return this.httpClient.get(environment.api_url+"getEndPoints/"+projectId);
  }
  

}
