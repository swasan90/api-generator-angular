import { ApiGeneratorService } from './../api-generator.service';
import { Component, OnInit, forwardRef, ViewChild, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, Validators, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ProjectDomain } from 'src/app/model/projectDomain';
import { ProjectGeneratorService } from './project-generator.service';
import { Project } from 'src/app/model/project';
import { SnackbarService } from '../snackbar.service';
import { MatStepper } from '@angular/material';


@Component({
  selector: 'app-project-generator',
  templateUrl: './project-generator.component.html',
  styleUrls: ['../api-generator.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProjectGeneratorComponent),
      multi: true
    }
  ]
})
/**
 * Component class for project generator.
 */
export class ProjectGeneratorComponent implements OnInit, ControlValueAccessor {
  public projectGeneratorForm: FormGroup = new FormGroup({
    projectName: new FormControl("", [Validators.required]),
    domainName: new FormControl("", [Validators.required])
  });
  isEditable = false;
  projData: Project;
  @Input() stepper: MatStepper;
  constructor(private projectService: ProjectGeneratorService, private snackBar: SnackbarService, private apiGeneratorService: ApiGeneratorService) { }
  /**
   * Implementing Control Value Accessor.
   */
  public onTouched: () => void = () => { };

  //Overriding control value accessor methods
  writeValue(obj: any): void {
    obj && this.projectGeneratorForm.setValue(obj, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.projectGeneratorForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.projectGeneratorForm.disable() : this.projectGeneratorForm.enable();
  }

  /**
   * Function to save project.
   * @param index 
   */
  submitProject(index: number) {
    let projObj: ProjectDomain = this.projectGeneratorForm.value;
    this.projectService.createProject(projObj).subscribe(data => {
      this.projData = data["resObj"];
      localStorage.setItem("projectData", JSON.stringify(this.projData));
      this.snackBar.openSnackBar(data["message"], "Success", "custom-success-snackbar");
      this.apiGeneratorService.getCurrentProject(this.projData);
      this.stepper.selected.completed = true;
      this.stepper.selectedIndex = index;
    }, error => {
      if (error.error.errors != null) {
        let str: string = "";
        for (let obj of error.error.errors) {
          str += obj.defaultMessage + "\n";
        }
        this.snackBar.openSnackBar(str.trim(), "Error", "custom-eror-snackbar");
      } else {
        this.snackBar.openSnackBar(error.error["message"], "Error", "custom-eror-snackbar");
      }
      this.projectGeneratorForm.reset();
    })
  }

  /**
   * Function to get error message for project name field.
   */
  getProjectNameErrorMessage() {
    return this.projectGeneratorForm.get('projectName').hasError('required') ? "Project Name is required*" : '';
  }

  /**
   * Function to get error message for domain name field.
   */
  getDomainNameErrorMessage() {
    return this.projectGeneratorForm.get('domainName').hasError('required') ? "Domain Name is required*" : '';
  }

  /**
   * Function to format string on the input control.
   * @param fieldVal 
   * @param event 
   */
  formatString(fieldVal: string, event: any) {
    this.projectGeneratorForm.get(event.target.attributes.getNamedItem('formcontrolname').value)
      .setValue(
        this.apiGeneratorService.cleanString(fieldVal)
      );
  }
  ngOnInit() {
  }

}
