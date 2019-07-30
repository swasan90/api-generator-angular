import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { MetaData } from 'src/app/model/metaData';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AddCrudService {

  constructor(private httpClient:HttpClient) { }  
   toFormGroup(formControls: MetaData<any>[]) {  
    let group: any = {};      
    formControls.forEach(formControl=>{      
      group[formControl.fieldName] = formControl.required ? new FormControl(formControl.value || '', Validators.required)
                                              : new FormControl(formControl.value || '');
    });   
    return new FormGroup(group);
  }

  public persistRecord(formObj:any,projectName:string,domainName:string):Observable<any>{
    return this.httpClient.post(environment.api_url+"apigenerator/"+projectName+"/"+domainName,formObj);
  }

  public updateRecord(formObj:any,projectName:string,domainName:string,domainId:string):Observable<any>{
    return this.httpClient.post(environment.api_url+"apigenerator/"+projectName+"/"+domainName+"/"+domainId,formObj);
  }

}
