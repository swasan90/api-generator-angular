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

  constructor(private _formBuilder: FormBuilder) { }

  createFieldControls(): FormGroup {
    return this._formBuilder.group({
      fieldNameCtrl: ['', Validators.required],
      fieldTypeCtrl: ['', Validators.required],
    });
  }
  
  onNotify(formGroup: FormGroup){
    this.projectFormGroup= formGroup;
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
