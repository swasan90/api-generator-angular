import { Component, OnInit, Input } from '@angular/core';
import { ApiEndPoints } from 'src/app/model/api-endpoints';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-api-list-generator',
  templateUrl: './api-list-generator.component.html',
  styleUrls: ['../api-generator.component.css']
})
export class ApiListGeneratorComponent implements OnInit {

  API_DATA:ApiEndPoints[]=[
    {endpoint_name:"employees.delete",endpoint_url:"apigenerator/Geoscience/employees/ec9164b0-a7ed-11e9-bf1f-d51928148523",method_type:"DELETE"},
    {endpoint_name:"employees.list",endpoint_url:"apigenerator/Geoscience/employees",method_type:"GET"}
  ]
  displayedColumns: string[] = ['endpoint_name', 'endpoint_url', 'method_type'];
   
  constructor() { }

  
  
  ngOnInit() {
    
  }

}
