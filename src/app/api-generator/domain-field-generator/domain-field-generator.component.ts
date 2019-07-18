import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FieldType } from 'src/app/model/fieldType';

@Component({
  selector: 'app-domain-field-generator',
  templateUrl: './domain-field-generator.component.html',
  styleUrls: ['./domain-field-generator.component.css']
})
export class DomainFieldGeneratorComponent implements OnInit {
  
  domainFieldsFormGroup: FormGroup;
  isEditable = false;

  fieldControls: FormArray;
  
  fieldTypes: FieldType[] = [
    { value: "number", viewValue: "Number" },
    { value: "text", viewValue: "Text" },
    { value: "boolean", viewValue: "Boolean" }
  ];
  constructor(private _formBuilder: FormBuilder) { }

  createFieldControls(): FormGroup {
    return this._formBuilder.group({
      fieldNameCtrl: ['', Validators.required],
      fieldTypeCtrl: ['', Validators.required],
    });
  }

  add() {
    console.log("clicked add");

    this.fieldControls = this.domainFieldsFormGroup.get('fieldControls') as FormArray;
    this.fieldControls.push(this.createFieldControls());
  }

  submitDomainFields() {
    console.log("submitted fields");

  }



  ngOnInit() {    
    this.domainFieldsFormGroup = this._formBuilder.group({
      fieldControls: this._formBuilder.array([this.createFieldControls()])
    });

  }

}