import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Domain } from 'src/app/model/domain';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * Service class for implementinf domain field generator methods.
 */
export class DomainFieldGeneratorService {
  constructor(private httpClient: HttpClient) { }
  /**
   * Function to add domain fields.
   * @param domain 
   */
  public addDomainFields(domain: Domain): Observable<any> {
    return this.httpClient.post(environment.api_url + "buildSchema", domain);
  }
}
