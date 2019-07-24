import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Domain } from 'src/app/model/domain';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DomainFieldGeneratorService {

  constructor(private httpClient:HttpClient) { }

  public addDomainFields(domain:Domain):Observable<any>{
    return this.httpClient.post(environment.api_url+"buildSchema",domain);
  }
}
