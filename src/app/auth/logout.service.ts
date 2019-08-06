import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectDomain } from '../model/projectDomain';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * Logout  service class.
 */
export class LogoutService {

   
  constructor(private httpClient: HttpClient) { }
 
  public deleteRedisToken(id:string): Observable<any> {
    return this.httpClient.delete(environment.redis_url + "deleteToken/"+id);
  }
 
}
