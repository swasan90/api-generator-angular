import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CrudProcessorService } from '../crud-processor.service';
import { ProjectDomain } from 'src/app/model/projectDomain'; 
import { SnackbarService } from 'src/app/api-generator/snackbar.service';
import { AddCrudService } from './add-crud.service';
import { MetaData } from 'src/app/model/metaData';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-card-header',
  templateUrl: './mat-card-header.component.html',
  providers: [CrudProcessorService],
  styleUrls: ['./add-crud.component.css'],
})

/**
 * Mat card header component class.
 */
export class MatCardHeaderComponent implements OnInit {

  @Input() childControl: MetaData<any>[];
  @Input() currentDomain: ProjectDomain;
  form: FormGroup;
  @Input() isEdit: boolean;

  @Output() formEvent = new EventEmitter<FormGroup>();
  constructor(private addCrudService: AddCrudService, private snackBarService: SnackbarService, private crudService: CrudProcessorService) {

  }
  ngOnInit() {
    this.form = this.addCrudService.toFormGroup(this.childControl);     
    this.formEvent.emit(this.form);
  }
}