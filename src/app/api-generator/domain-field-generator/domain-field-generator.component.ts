import { MatStepper } from '@angular/material';
import { ApiGeneratorService } from './../api-generator.service';
 
import { Component, OnInit, forwardRef, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType } from 'src/app/model/fieldType';
import { Project } from 'src/app/model/project';
import { DomainFieldGeneratorService } from './domain-field-generator.service'; 
import { SnackbarService } from '../snackbar.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ApiListGeneratorService } from '../api-list-generator/api-list-generator.service';
import { ApiListGeneratorComponent } from '../api-list-generator/api-list-generator.component';
@Component({
  selector: 'app-domain-field-generator',
  templateUrl: './domain-field-generator.component.html',
  styleUrls: ['../api-generator.component.css'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DomainFieldGeneratorComponent),
      multi: true
    }
  ]
})
export class DomainFieldGeneratorComponent implements OnInit,ControlValueAccessor  {
  
  isEditable = false; 
  domainFieldsForm:FormGroup;

  fieldTypes: FieldType[] = [
    { value: "number", viewValue: "Number" },
    { value: "text", viewValue: "Text" },
    { value: "boolean", viewValue: "Boolean" }
  ];
 
  currentproject:Project;

  projectName:string;
  domainName:string;
  projectId:string;
 
  constructor(private _fb:FormBuilder,private apiGeneratorService:ApiGeneratorService,
    private domainFieldService:DomainFieldGeneratorService,private snackBar: SnackbarService,
    private apiListService:ApiListGeneratorService) { }  

  public onTouched: () => void = () => {};

  //Overriding control value accessor methods
  writeValue(obj: any): void {
    obj && this.domainFieldsForm.setValue(obj,{emitEvent:false});
  }
  registerOnChange(fn: any): void {     
    this.domainFieldsForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {    
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.domainFieldsForm.disable():this.domainFieldsForm.enable();
  }

  submitDomainFields() {     
    let domainFieldObj:any={};    
    domainFieldObj = this.domainFieldsForm.value;
    domainFieldObj.projectId = this.currentproject.id;   
    this.domainFieldService.addDomainFields(domainFieldObj).subscribe(data=>{       
      this.snackBar.openSnackBar(data["message"],"Success","custom-success-snackbar");       
    },error=>{
      console.log(error);
      this.snackBar.openSnackBar(error.error["message"],"Error","custom-eror-snackbar");
      this.domainFieldsForm.reset;
    }); 
  }

  createAttributeGroups(){
    return this._fb.group({
        fieldName :new FormControl("",[Validators.required]),
        fieldType :new FormControl("",[Validators.required])  
    });
  }

  add() {     
    (<FormArray>this.domainFieldsForm.get('fields')).push(this.createAttributeGroups());  
   
  }

  get fields():FormArray{
    return this.domainFieldsForm.get('fields') as FormArray;     
  }
 
  formatString(fieldVal:string,event:any,index:number){           
    const controlArray = <FormArray>this.domainFieldsForm.get('fields');
    controlArray.controls[index].get('fieldName').setValue(this.apiGeneratorService.cleanString(fieldVal));
  }

  ngOnInit() {     
    this.domainFieldsForm = this._fb.group({        
         fields: this._fb.array([
          this.createAttributeGroups()
        ])
  });   
  this.apiGeneratorService.currentProject.subscribe(project=>{
      this.currentproject = JSON.parse(project);
  });
  
  }
 
  

}
