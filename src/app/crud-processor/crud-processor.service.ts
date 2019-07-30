import { element } from 'protractor';
import { FieldType } from 'src/app/model/fieldType';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TextBoxControl } from './add-crud/control-type/textbox-control';
import { MetaData } from '../model/metaData';
import { RadioButtonControl } from './add-crud/control-type/radiobutton-control';


@Injectable({
  providedIn: 'root'
})
export class CrudProcessorService {
  formControls: MetaData<any>[] = [];
  constructor(private httpClient: HttpClient) { }

  public listAll(projectName: string, domainName: string): Observable<any> {
    return this.httpClient.get(environment.api_url + "apigenerator/" + projectName + "/" + domainName);
  }

  public getColumnNames(id: string): Observable<any> {
    return this.httpClient.get(environment.api_url + "getColumnData/" + id);
  }

  public getSchemaMap(id: string): Observable<any> {
    return this.httpClient.get(environment.api_url + "getSchemaMapping/" + id);
  }

  /**
   * Function to build schema array for creating controls dynamically when adding record.
   */
  public buildSchemaArray() {
    let domain = JSON.parse(localStorage.getItem("currentDomain"));
    this.formControls = new Array();
    this.httpClient.get(environment.api_url + "getSchemaMapping/" + domain.id).subscribe(data => {
      let schema = data["data"];
      for (let item of schema) {
        let controlObj = this.getControlType(item);   
        this.formControls.push(controlObj);
      }  
      localStorage.setItem("formControl",JSON.stringify(this.formControls));   
    }, error => {
      console.log(error);
    })
    return this.formControls;
  }

  private getControlType(item: any) {
    switch (item.fieldType) {
      case 'boolean':
        return this.createRadioButtonControl(item);
      case 'text' || 'email' || 'number':
        return this.createTextBoxControl(item);
      default:
        return this.createTextBoxControl(item);
    }
  }

  private createTextBoxControl(item: any) {
    return new TextBoxControl({
      fieldName: item.fieldName,
      fieldType: item.fieldType,
      //required:true
    });
  }

  private createRadioButtonControl(item: any) {
    return new RadioButtonControl({
      fieldName: item.fieldName,
      fieldType: item.fieldType,       
      options: [
        { key: 'True', value: true },
        { key: 'False', value: false }
      ],
      required:true    
    });
  }

  selectedElement:any={};
  public setSelectedElement(element:any){
    this.selectedElement = element;
    return this.selectedElement;
  }

}
