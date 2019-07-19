import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-generator',
  templateUrl: './project-generator.component.html',
  styleUrls: ['../api-generator.component.css']
})
export class ProjectGeneratorComponent implements OnInit {
  projectFormGroup: FormGroup;
  isEditable = false;
  constructor(private _formBuilder: FormBuilder) { }

  @Input() projectForm:FormGroup;
  
  submitProject() {
    console.log(this.projectFormGroup);
  }

  ngOnInit() {
    this.projectFormGroup = this._formBuilder.group({
      projectCtrl: ['', Validators.required],
      domainCtrl: ['', Validators.required]
    });
  }

}
