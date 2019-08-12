import { CrudProcessorService } from './../crud-processor.service';
import { MetaData } from './../../model/metaData';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SnackbarService } from './../../api-generator/snackbar.service';
import { ProjectDomain } from 'src/app/model/projectDomain';
import { Component, OnInit,forwardRef } from '@angular/core';
 
import { AddCrudService } from './add-crud.service';
 
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-crud',
  templateUrl: './add-crud.component.html',
  styleUrls: ['./add-crud.component.css'],
  providers: [AddCrudService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddCrudComponent),
      multi: true
    }]
})
export class AddCrudComponent implements OnInit, ControlValueAccessor {
  addFormGroup: FormGroup;
  currentDomain: ProjectDomain;
  formControls: MetaData<any>[] = [];
  editFormObj: any = {};
  isEdit: boolean = false;
  recordId: any = {};

  constructor(private addCrudService: AddCrudService,
    private snackBarService: SnackbarService, private crudService: CrudProcessorService, private router: Router,
    private route: ActivatedRoute) { }

  /**
   * Function to receive form group from child component (mat card header component).
   * @param form 
   */
  receiveEvent(form: FormGroup) {
    this.addFormGroup = form;
  }

  /**
   * Function to save the entity.
   */
  save() {
    let formObj: any = {};
    formObj["attributes"] = this.addFormGroup.value;
    this.addCrudService.persistRecord(formObj, this.currentDomain.projectName, this.currentDomain.domainName).subscribe(resp => {
      this.snackBarService.openSnackBar(resp["message"], "Success", "custom-success-snackbar");
      this.router.navigate(["/api/crud_processor"]);
    }, error => {
      console.log(error);
      this.snackBarService.openSnackBar(error.error["message"], "Error", "custom-eror-snackbar");
    });
  }

  /**
   * Funciton to cancel the operation.
   */
  cancel() {
    this.router.navigate(['/api/crud_processor']);
  }

  /**
   * Implementing Control Value Accessor
   */
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

  /**
   * Function to implement edit functionality.
   */
  edit() {
    let formObj: any = {};
    formObj["attributes"] = this.addFormGroup.value;     
    this.addCrudService.updateRecord(formObj, this.currentDomain.projectName,
      this.currentDomain.domainName, this.recordId.id).subscribe(data => {
        this.snackBarService.openSnackBar(data["message"], "Success", "custom-success-snackbar");
        this.cancel();
      }, error => {
        console.log(error);
        this.snackBarService.openSnackBar(error.error["message"], "Error", "custom-eror-snackbar");
      });

  }

  ngOnInit() {
    this.currentDomain = JSON.parse(localStorage.getItem("currentDomain"));
    this.formControls = JSON.parse(localStorage.getItem("formControl"));
    if (this.route.snapshot.url[1].path == "edit") {
      this.isEdit = true;
      this.recordId.id = this.crudService.selectedElement.id;
      for (let formControl of this.formControls) {
        for (let key of Object.keys(this.crudService.selectedElement)) {
          if (formControl.fieldName == key) {
            formControl.value = this.crudService.selectedElement[key];            
          }
        }
      }
    }
  }

}
