import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  constructor() { }

  public onTouched: () => void = () => {};

  //Overriding control value accessor methods
  writeValue(obj: any): void {
    obj && this.projectGeneratorForm.setValue(obj,{emitEvent:false});
  }
  registerOnChange(fn: any): void {
    console.log("on change");
    this.projectGeneratorForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    console.log("on blur");
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.projectGeneratorForm.disable():this.projectGeneratorForm.enable();
  }
 
  
  submitProject() {
    console.log(this.projectGeneratorForm.value);
  }

  ngOnInit() {
     console.log(this.projectGeneratorForm);
  }

}
