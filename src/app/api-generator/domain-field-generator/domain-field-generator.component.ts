import { ApiGeneratorService } from './../api-generator.service';
 
import { Component, OnInit, forwardRef, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType } from 'src/app/model/fieldType';
import { Project } from 'src/app/model/project';
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
export class DomainFieldGeneratorComponent implements OnInit,ControlValueAccessor {
  
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
  constructor(private _fb:FormBuilder,private apiGeneratorService:ApiGeneratorService) { }  

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
