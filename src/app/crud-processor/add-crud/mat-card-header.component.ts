import { Component, OnInit, Output, EventEmitter, Input }       from '@angular/core';
import { CrudProcessorService } from '../crud-processor.service';
import { ProjectDomain } from 'src/app/model/projectDomain';
import { Fields } from 'src/app/model/fields';
import { TextBoxControl } from './control-type/textbox-control';
import { SnackbarService } from 'src/app/api-generator/snackbar.service';
import { AddCrudService } from './add-crud.service';
import { MetaData } from 'src/app/model/metaData';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-card-header',
  templateUrl: './mat-card-header.component.html',
  providers:  [CrudProcessorService],
  styleUrls: ['./add-crud.component.css'],
})
export class MatCardHeaderComponent implements OnInit{

  @Input() childControl:MetaData<any>[];
  @Input() currentDomain:ProjectDomain;   
  form:FormGroup;

  @Output() formEvent = new EventEmitter<FormGroup>();
  constructor(private addCrudService: AddCrudService, private snackBarService: SnackbarService,private crudService:CrudProcessorService) {
      
  }
  ngOnInit() {     
    this.form = this.addCrudService.toFormGroup(this.childControl);
    this.formEvent.emit(this.form);
 }
}