import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FieldType } from 'src/app/model/fieldType';

@Component({
  selector: 'app-domain-field-generator',
  templateUrl: './domain-field-generator.component.html',
  styleUrls: ['../api-generator.component.css']
})
export class DomainFieldGeneratorComponent implements OnInit {

  domainFieldsFormGroup: FormGroup;
  isEditable = false;

 

  fieldTypes: FieldType[] = [
    { value: "number", viewValue: "Number" },
    { value: "text", viewValue: "Text" },
    { value: "boolean", viewValue: "Boolean" }
  ];
  constructor(private _formBuilder: FormBuilder) { }

  @Input() domainFieldsForm: FormGroup;

  @Output() notify:EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  createFieldControls(): FormGroup {
    return this._formBuilder.group({
      fieldNameCtrl: ['', Validators.required],
      fieldTypeCtrl: ['', Validators.required],
    });
  }

  add() {
    console.log("clicked add");         
    this.fieldControls.push(this.createFieldControls());

  }

  get fieldControls():FormArray{
    return this.domainFieldsFormGroup.get('fieldControls') as FormArray;
  }
  

  submitDomainFields() {
    console.log(this.fieldControls);
    console.log(this.domainFieldsFormGroup);
    this.notify.emit(this.domainFieldsFormGroup);
  }



  ngOnInit() {
    this.domainFieldsFormGroup = this._formBuilder.group({
      fieldControls: this._formBuilder.array([this.createFieldControls()])
    });   

  }

}
