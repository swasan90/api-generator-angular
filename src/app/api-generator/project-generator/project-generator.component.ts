import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ProjectDomain } from 'src/app/model/projectDomain';
import { ProjectGeneratorService } from './project-generator.service';
import {MatSnackBar} from '@angular/material';
import { Project } from 'src/app/model/project';

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
export class ProjectGeneratorComponent implements OnInit,ControlValueAccessor  {

  public projectGeneratorForm :FormGroup  = new FormGroup({
      projectName: new FormControl("",[Validators.required]),
      domainName: new FormControl("",[Validators.required])
  });

  isEditable = false;
  projData:Project;
  constructor(private projectService:ProjectGeneratorService,private snackBar: MatSnackBar) { }

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

  openSnackBar(message: string, action: string,className:string) {
    this.snackBar.open(message, action, {
      duration: 10000,
      verticalPosition :'top',
      horizontalPosition:'right',
      panelClass:[className]
    });
  }
 
  
  submitProject() {   
    let projObj:ProjectDomain = this.projectGeneratorForm.value;
    this.projectService.createProject(projObj).subscribe(data=>{      
      this.projData =  data["data"];
      console.log(this.projData);
      this.openSnackBar(data["message"],"Success","custom-snackbar");
    },error=>{
      console.log(error);
      this.openSnackBar(error.error["message"],"Error","custom-snackbar");
    })

  }

  ngOnInit() {  
  }

}
