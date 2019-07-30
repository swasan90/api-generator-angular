import { MatStepper } from '@angular/material';
import { ApiGeneratorService } from './../api-generator.service';
import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType } from 'src/app/model/fieldType';
import { Project } from 'src/app/model/project';
import { DomainFieldGeneratorService } from './domain-field-generator.service';
import { SnackbarService } from '../snackbar.service';
import { ApiListGeneratorService } from '../api-list-generator/api-list-generator.service';
@Component({
  selector: 'app-domain-field-generator',
  templateUrl: './domain-field-generator.component.html',
  styleUrls: ['../api-generator.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DomainFieldGeneratorComponent),
      multi: true
    }
  ]
})
/**
 * Component class for domain field generator.
 */
export class DomainFieldGeneratorComponent implements OnInit, ControlValueAccessor {
  isEditable = false;
  domainFieldsForm: FormGroup;
  fieldTypes: FieldType[] = [
    { value: "number", viewValue: "Number" },
    { value: "text", viewValue: "Text" },
    { value: "boolean", viewValue: "Boolean" }
  ];
  currentproject: Project;
  projectName: string;
  domainName: string;
  projectId: string;
  @Input() stepper:MatStepper; 
  constructor(private _fb: FormBuilder, private apiGeneratorService: ApiGeneratorService,
    private domainFieldService: DomainFieldGeneratorService, private snackBar: SnackbarService) { }

  /**
   * Implementing Control value accessor.
   */

  public onTouched: () => void = () => { };

  //Overriding control value accessor methods
  writeValue(obj: any): void {
    obj && this.domainFieldsForm.setValue(obj, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.domainFieldsForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.domainFieldsForm.disable() : this.domainFieldsForm.enable();
  }

  /**
   * Function to save domain fields.
   * @param index 
   */
  submitDomainFields(index:number) {
    let domainFieldObj: any = {};
    domainFieldObj = this.domainFieldsForm.value;
    domainFieldObj.projectId = this.currentproject.id;
    this.domainFieldService.addDomainFields(domainFieldObj).subscribe(data => {
      this.snackBar.openSnackBar(data["message"], "Success", "custom-success-snackbar");         
      this.stepper.selected.completed = true; 
      this.stepper.selectedIndex = index; 
    }, error => {
      console.log(error);
      this.snackBar.openSnackBar(error.error["message"], "Error", "custom-eror-snackbar");
      this.domainFieldsForm.reset;
    });
  }

  /**
   * Function to create form group.
   */
  createAttributeGroups() {
    return this._fb.group({
      fieldName: new FormControl("", [Validators.required]),
      fieldType: new FormControl("", [Validators.required])
    });
  }
  /**
   * Function to add new form control dynamically.
   */
  add() {
    (<FormArray>this.domainFieldsForm.get('fields')).push(this.createAttributeGroups());

  }

  /**
   * Function to get fields array.
   */
  get fields(): FormArray {
    return this.domainFieldsForm.get('fields') as FormArray;
  }

  /**
   * Function to format string on the input control.
   * @param fieldVal 
   * @param event 
   * @param index 
   */
  formatString(fieldVal: string, event: any, index: number) {
    const controlArray = <FormArray>this.domainFieldsForm.get('fields');
    controlArray.controls[index].get('fieldName').setValue(this.apiGeneratorService.cleanString(fieldVal));
  }

  /**
   * Function to remove the form control.
   * @param index 
   */
  remove(index:number){  
     (<FormArray>this.domainFieldsForm.get('fields')).removeAt(index);    
  }
 
  ngOnInit() {
    this.domainFieldsForm = this._fb.group({
      fields: this._fb.array([
        this.createAttributeGroups()
      ])
    });
    this.apiGeneratorService.currentProject.subscribe(project => {
      this.currentproject = JSON.parse(project);      
    });
  }
}
