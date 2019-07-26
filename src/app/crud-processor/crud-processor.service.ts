import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class CrudProcessorService {  
  constructor(private httpClient:HttpClient) { }

  public listAll(projectName:string,domainName:string):Observable<any>{   
    return this.httpClient.get(environment.api_url+"apigenerator/"+projectName+"/"+domainName);
  }

  public getColumnNames(id:string):Observable<any>{
    return this.httpClient.get(environment.api_url+"getSchemaData/"+id);
  }
}
