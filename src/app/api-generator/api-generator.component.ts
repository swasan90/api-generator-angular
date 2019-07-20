import { Fields } from './../model/fields';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FieldType } from '../model/fieldType';
import { ApiEndPoints } from '../model/api-endpoints';

@Component({
  selector: 'app-api-generator',
  templateUrl: './api-generator.component.html',
  styleUrls: ['./api-generator.component.css']
})

 
export class ApiGeneratorComponent implements OnInit {
  domainFieldGenerator:FormGroup;
  projectDomainGenerator:FormGroup;
  isEditable = false;

  // public projectDomainGenerator:FormGroup = new FormGroup({
  //   projectInfo:new FormControl("")    
  // })

  // public DomainFieldGenerator:FormGroup = new FormGroup({
  //   domainFieldInfo:new FormArray([])
    
  // })
  constructor(private _fb:FormBuilder) { }

  ngOnInit() {
    this.projectDomainGenerator = this._fb.group({
        projectInfo:new FormControl("") 
    })
    this.domainFieldGenerator = this._fb.group({
      domainFieldInfo:new FormControl("") 
    });
  }

}
