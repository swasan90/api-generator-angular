 
import { Component, OnInit, forwardRef } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType } from 'src/app/model/fieldType';
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
 

  constructor(private _fb:FormBuilder) { }  

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
    console.log(this.domainFieldsForm.value);
  }

  createAttributeGroups(){
    return this._fb.group({
        fieldNameCtrl :new FormControl("",[Validators.required]),
        fieldTypeCtrl :new FormControl("",[Validators.required])  
    });
  }

  add() {
    console.log("clicked add"); 
    (<FormArray>this.domainFieldsForm.get('attributes')).push(this.createAttributeGroups());  
   
  }

  get attributes():FormArray{
    return this.domainFieldsForm.get('attributes') as FormArray;     
  }
   

  ngOnInit() {
    console.log("in ngonit");    
    this.domainFieldsForm = this._fb.group({        
        attributes: this._fb.array([
          this.createAttributeGroups()
        ])
  });

  }

}
