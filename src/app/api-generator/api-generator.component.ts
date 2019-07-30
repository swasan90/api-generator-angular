import { MatStepper } from '@angular/material';
import { Fields } from './../model/fields';
import { Component, OnInit, ViewChild, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FieldType } from '../model/fieldType';
import { ApiEndPoints } from '../model/api-endpoints';
import { ProjectGeneratorComponent } from './project-generator/project-generator.component';
import { CdkStep } from '@angular/cdk/stepper';

@Component({
  selector: 'app-api-generator',
  templateUrl: './api-generator.component.html',
  styleUrls: ['./api-generator.component.css']
})

/**
 * Component class for api generator.
 */
export class ApiGeneratorComponent implements OnInit {

  domainFieldGenerator: FormGroup;
  projectDomainGenerator: FormGroup;
  isEditable = false;
  isCompleted :boolean = false;
  @ViewChild('stepper') matStepper:MatStepper;  

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.projectDomainGenerator = this._fb.group({
      projectInfo: new FormControl("")     
    })
    this.domainFieldGenerator = this._fb.group({
      domainFieldInfo: new FormControl("")
    }); 
   
  }

}
