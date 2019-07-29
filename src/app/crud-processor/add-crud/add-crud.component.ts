import { CrudProcessorService } from './../crud-processor.service';
import { FieldType } from './../../model/fieldType';
import { MetaData } from './../../model/metaData';
import { FormBuilder, FormGroup, FormControl, FormArray, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SnackbarService } from './../../api-generator/snackbar.service';
import { ProjectDomain } from 'src/app/model/projectDomain';
import { Component, OnInit, Input, SystemJsNgModuleLoader, forwardRef, ViewChild, AfterViewInit } from '@angular/core'; 
import { CdkColumnDef } from '@angular/cdk/table';
import { Fields } from 'src/app/model/fields';
import { AddCrudService } from './add-crud.service';
import { TextBoxControl } from './control-type/textbox-control';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-crud',
  templateUrl: './add-crud.component.html',
  styleUrls: ['./add-crud.component.css'],
  providers: [ AddCrudService ,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddCrudComponent),
      multi: true
    } ]
})
export class AddCrudComponent implements OnInit ,ControlValueAccessor{   
  addFormGroup:FormGroup;
  currentDomain: ProjectDomain;
  formControls: MetaData<any>[] = [];

  constructor(private addCrudService: AddCrudService, 
    private snackBarService: SnackbarService,private crudService:CrudProcessorService,private router:Router) { }
   
  
  receiveEvent(form:FormGroup){
    this.addFormGroup = form;
  }

  save(){
    let formObj = this.addFormGroup.value;
    this.addCrudService.persistRecord(formObj,this.currentDomain.projectName,this.currentDomain.domainName).subscribe(resp=>{
      this.snackBarService.openSnackBar(resp["message"],"Success","custom-success-snackbar");      
      this.router.navigate(["/api/crud_processor"]);
    },error=>{
      console.log(error);
      this.snackBarService.openSnackBar(error.error["message"], "Error", "custom-eror-snackbar");
    });
  }

  cancel(){
    this.router.navigate(['/api/crud_processor']);
  }

  public onTouched: () => void = () => { };

  //Overriding control value accessor methods
  writeValue(obj: any): void {
    obj && this.addFormGroup.setValue(obj, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.addFormGroup.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.addFormGroup.disable() : this.addFormGroup.enable();
  }
    
  ngOnInit() {
    this.currentDomain = JSON.parse(localStorage.getItem("currentDomain"));      
    this.formControls = JSON.parse(localStorage.getItem("formControls"));      
  }

}
