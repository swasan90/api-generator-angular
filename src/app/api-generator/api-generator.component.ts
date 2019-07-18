import { Fields } from './../model/fields';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FieldType } from '../model/fieldType';
import { ApiEndPoints } from '../model/api-endpoints';

@Component({
  selector: 'app-api-generator',
  templateUrl: './api-generator.component.html',
  styleUrls: ['./api-generator.component.css']
})


export class ApiGeneratorComponent implements OnInit {
  projectFormGroup: FormGroup;
  domainFieldsFormGroup: FormGroup;
  isEditable = false;

  fieldTypes: FieldType[] = [
    { value: "number", viewValue: "Number" },
    { value: "text", viewValue: "Text" },
    { value: "boolean", viewValue: "Boolean" }
  ];
  
  fieldControls: FormArray;

  
  API_DATA:ApiEndPoints[]=[
    {endpoint_name:"employees.delete",endpoint_url:"apigenerator/Geoscience/employees/ec9164b0-a7ed-11e9-bf1f-d51928148523",method_type:"DELETE"},
    {endpoint_name:"employees.list",endpoint_url:"apigenerator/Geoscience/employees",method_type:"GET"}
  ]

  displayedColumns: string[] = ['endpoint_name', 'endpoint_url', 'method_type'];

  constructor(private _formBuilder: FormBuilder) { }

  submitProject() {

  }

  submitDomainFields() {
    console.log("submitted fields");

  }

  add() {
    console.log("clicked add");

    this.fieldControls = this.domainFieldsFormGroup.get('fieldControls') as FormArray;
    this.fieldControls.push(this.createFieldControls());
  }



  createFieldControls(): FormGroup {
    return this._formBuilder.group({
      fieldNameCtrl: ['', Validators.required],
      fieldTypeCtrl: ['', Validators.required],
    });
  }




  ngOnInit() {
    this.projectFormGroup = this._formBuilder.group({
      projectCtrl: ['', Validators.required],
      domainCtrl: ['', Validators.required]
    });

    this.domainFieldsFormGroup = this._formBuilder.group({
      fieldControls: this._formBuilder.array([this.createFieldControls()])
    });

  }

}
