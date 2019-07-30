import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ApiEndPoints } from 'src/app/model/api-endpoints';
import { FormGroup } from '@angular/forms';
import { ApiGeneratorService } from '../api-generator.service';
import { Project } from 'src/app/model/project';
import { ApiListGeneratorService } from './api-list-generator.service';
import { SnackbarService } from '../snackbar.service';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-api-list-generator',
  templateUrl: './api-list-generator.component.html',
  styleUrls: ['../api-generator.component.css']
})
/**
 * Component class for api list generator.
 */
export class ApiListGeneratorComponent implements OnInit {

  @Input() stepper: MatStepper;
  @Input() projectFormGroup: FormGroup;
  endPointsData: ApiEndPoints[] = [];
  displayedColumns: string[] = ['endpoint_name', 'endpoint_url', 'method_type'];
  currentProject: Project;
  constructor(private apiGeneratorService: ApiGeneratorService, private apiListService: ApiListGeneratorService,
    private snackBar: SnackbarService) { }

  /**
   * Function to get api endpoints.
   */
  getApiEndPoints() {
    this.apiListService.getApiEndpointsForProject(this.currentProject.id).subscribe(data => {
      this.endPointsData = data["data"];
      this.snackBar.openSnackBar("Successfully created table:" + this.currentProject.domainName, "Success", "custom-success-snackbar");
    }, error => {
      this.snackBar.openSnackBar("Unable to create table :" + this.currentProject.domainName, "Error", "custom-error-snackbar");
    });
  }

  /**
   * Function to get current project
   */
  getCurrentProject() {
    this.apiGeneratorService.currentProject.subscribe(project => {
      this.currentProject = JSON.parse(project);
    });
  }

  /**
   * Function to reset mat stepper.
   */
  reset() {
    this.stepper.reset();
    this.projectFormGroup.reset();
  }

  ngOnInit() {
    this.getCurrentProject();
    this.getApiEndPoints();
  }

}
