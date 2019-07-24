import { ApiGeneratorService } from './../api-generator.service';
import { Component, OnInit, forwardRef, ViewChild, AfterViewInit, } from '@angular/core';
import {  FormGroup, Validators, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ProjectDomain } from 'src/app/model/projectDomain';
import { ProjectGeneratorService } from './project-generator.service';
import { Project } from 'src/app/model/project';
import { SnackbarService } from '../snackbar.service';
import { MatStepper } from '@angular/material';
 

@Component({
  selector: 'app-project-generator',
  templateUrl: './project-generator.component.html',
  styleUrls: ['../api-generator.component.css'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProjectGeneratorComponent),
      multi: true
    }
  ]
})

export class ProjectGeneratorComponent implements OnInit,ControlValueAccessor {

  public projectGeneratorForm :FormGroup  = new FormGroup({
      projectName: new FormControl("",[Validators.required]),
      domainName: new FormControl("",[Validators.required])
  });
  isCompleted:boolean=false;
   
   

  isEditable = false;
  projData:Project;
  constructor(private projectService:ProjectGeneratorService,private snackBar: SnackbarService,private apiGeneratorService:ApiGeneratorService) { }

  public onTouched: () => void = () => {};

  //Overriding control value accessor methods
  writeValue(obj: any): void {
    obj && this.projectGeneratorForm.setValue(obj,{emitEvent:false});
  }
  registerOnChange(fn: any): void {    
    this.projectGeneratorForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {   
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.projectGeneratorForm.disable():this.projectGeneratorForm.enable();
  } 
  
  submitProject(stepper:MatStepper) {    
    let projObj:ProjectDomain = this.projectGeneratorForm.value;
    this.projectService.createProject(projObj).subscribe(data=>{      
      this.projData =  data["resObj"];
      localStorage.setItem("projectData",JSON.stringify(this.projData));      
      this.snackBar.openSnackBar(data["message"],"Success","custom-success-snackbar");
      this.apiGeneratorService.getCurrentProject(this.projData);   
      this.isCompleted =true;    
    },error=>{           
      this.snackBar.openSnackBar(error.error["message"],"Error","custom-eror-snackbar");      
      this.projectGeneratorForm.reset();
    })
    
  }

  

  formatString(fieldVal:string,event:any){        
    this.projectGeneratorForm.get(event.target.attributes.getNamedItem('formcontrolname').value)
    .setValue(
        this.apiGeneratorService.cleanString(fieldVal)
    );
  }

  ngOnInit() {       
  }

}
