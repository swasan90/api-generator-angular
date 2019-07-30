import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiEndPoints } from 'src/app/model/api-endpoints';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**
 * Service class to implement api list generator methods.
 */
export class ApiListGeneratorService {
  constructor(private httpClient: HttpClient) { }

  /**
   * Function to get api endpoints for project.
   * @param projectId 
   */
  public getApiEndpointsForProject(projectId: string): Observable<any> {
    return this.httpClient.get(environment.api_url + "getEndPoints/" + projectId);
  }
}
