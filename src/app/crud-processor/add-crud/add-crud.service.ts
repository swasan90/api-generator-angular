import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { MetaData } from 'src/app/model/metaData';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
/**
 * Add crud service class.
 */
export class AddCrudService {

  constructor(private httpClient:HttpClient) { } 
  /**
   * Function to convert form control to form group.
   * @param formControls 
   */ 
   toFormGroup(formControls: MetaData<any>[]) {  
    let group: any = {};      
    formControls.forEach(formControl=>{      
      group[formControl.fieldName] = formControl.required ? new FormControl(formControl.value || '', Validators.required)
                                              : new FormControl(formControl.value || '');
    });   
    return new FormGroup(group);
  }

  /**
   * Function to call api end point for persisting record.
   * @param formObj 
   * @param projectName 
   * @param domainName 
   */
  public persistRecord(formObj:any,projectName:string,domainName:string):Observable<any>{
    return this.httpClient.post(environment.api_url+"apigenerator/"+projectName+"/"+domainName,formObj);
  }

  /**
   * Function to call api end point for updating record.
   * @param formObj 
   * @param projectName 
   * @param domainName 
   * @param domainId 
   */
  public updateRecord(formObj:any,projectName:string,domainName:string,domainId:string):Observable<any>{
    return this.httpClient.post(environment.api_url+"apigenerator/"+projectName+"/"+domainName+"/"+domainId,formObj);
  }

}
