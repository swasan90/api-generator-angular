import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
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

  /**
   * Function to list all the records.
   * @param projectName 
   * @param domainName 
   */
  public listAll(projectName: string, domainName: string): Observable<any> {
    return this.httpClient.get(environment.api_url + "apigenerator/" + projectName + "/" + domainName);
  }

  /**
   * Function to get column names of the table.
   * @param id 
   */
  public getColumnNames(id: string): Observable<any> {
    return this.httpClient.get(environment.api_url + "getColumnData/" + id);
  }

  /**
   * Function to get schema map of the table.
   * @param id 
   */
  public getSchemaMap(id: string): Observable<any> {
    return this.httpClient.get(environment.api_url + "getSchemaMapping/" + id);
  }

  /**
   * Function to delete record on the given table.
   * @param projectName 
   * @param domainName 
   * @param domainId 
   */
  public deleteRecord(projectName: string, domainName: string, domainId: string): Observable<any> {
    return this.httpClient.delete(environment.api_url + "apigenerator/" + projectName + "/" + domainName + "/" + domainId);
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
      localStorage.setItem("formControl", JSON.stringify(this.formControls));
    }, error => {
      console.log(error);
    })
    return this.formControls;
  }

  /**
   * Function to get control type based on the fieldtype.
   * @param item 
   */
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

  /**
   * Function to create textbox control.
   * @param item 
   */
  private createTextBoxControl(item: any) {
    return new TextBoxControl({
      fieldName: item.fieldName,
      fieldType: item.fieldType,
      //required:true
    });
  }

  /**
   * Function to create radio button control.
   * @param item 
   */
  private createRadioButtonControl(item: any) {
    return new RadioButtonControl({
      fieldName: item.fieldName,
      fieldType: item.fieldType,
      options: [
        { key: 'True', value: true },
        { key: 'False', value: false }
      ],
      required: true
    });
  }

  /**
   * Function to set selected element.
   */
  selectedElement: any = {};
  public setSelectedElement(element: any) {
    this.selectedElement = element;
    return this.selectedElement;
  }
}
