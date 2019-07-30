import { Component, Input, OnInit } from '@angular/core';
import { MetaData } from 'src/app/model/metaData';
import { FormGroup } from '@angular/forms';
import { AddCrudService } from './add-crud.service';

@Component({
  selector: 'app-card-content',
  templateUrl: './mat-card-content.component.html',
  styleUrls: ['./add-crud.component.css'],
  providers: [AddCrudService]

})
export class MatCardContentComponent implements OnInit {
 
  @Input() control: MetaData<any>;
  @Input() formGroup: FormGroup;
  
  constructor(){}
  /**
   * Function to return if the form is valid
   */
  get isValid() { 
    return this.formGroup.controls[this.control.fieldName].valid 
    || this.formGroup.controls[this.control.fieldName].untouched ;
  }

  ngOnInit() {
  }
}
