import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ApiEndPoints } from 'src/app/model/api-endpoints';
import { FormGroup } from '@angular/forms';
import { ApiGeneratorService } from '../api-generator.service';
import { Project } from 'src/app/model/project';
import { ApiListGeneratorService } from './api-list-generator.service';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-api-list-generator',
  templateUrl: './api-list-generator.component.html',
  styleUrls: ['../api-generator.component.css']
})
export class ApiListGeneratorComponent implements OnInit  {
   

  // API_DATA: ApiEndPoints[] = [
  //   { endpoint_name: "employees.delete", endpoint_url: "apigenerator/Geoscience/employees/ec9164b0-a7ed-11e9-bf1f-d51928148523", method_type: "DELETE" },
  //   { endpoint_name: "employees.list", endpoint_url: "apigenerator/Geoscience/employees", method_type: "GET" }
  // ]

  endPointsData: ApiEndPoints[] = [];
  displayedColumns: string[] = ['Endpoint Name', 'Endpoint Url', 'Method Type'];

  currentProject: Project;
  constructor(private apiGeneratorService: ApiGeneratorService, private apiListService: ApiListGeneratorService,
    private snackBar: SnackbarService) { }


  getApiEndPoints() {     
    this.apiListService.getApiEndpointsForProject(this.currentProject.id).subscribe(data => {
      console.log(data["data"]);
      this.endPointsData = data["data"];
      this.snackBar.openSnackBar("Successfully created table:" + this.currentProject.domainName, "Success", "custom-success-snackbar");
    }, error => {
      console.log(error);
      this.snackBar.openSnackBar("Unable to create table :" + this.currentProject.domainName, "Error", "custom-error-snackbar");
    });
  }

  init() {
    this.apiGeneratorService.currentProject.subscribe(project => {
      this.currentProject = JSON.parse(project);
    });
  }


  ngOnInit() {
    this.init();
    this.getApiEndPoints();
  }

}
