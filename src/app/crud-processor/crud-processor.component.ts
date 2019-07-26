import { DashboardData } from './../model/dashboard-data';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { ProjectDomain } from '../model/projectDomain';
import { CrudProcessorService } from './crud-processor.service';
import { SnackbarService } from '../api-generator/snackbar.service';

@Component({
  selector: 'app-crud-processor',
  templateUrl: './crud-processor.component.html',
  styleUrls: ['./crud-processor.component.css']
})
export class CrudProcessorComponent implements OnInit {
  
  currentDomain:ProjectDomain;
  dataSource:[]=[];
  constructor(private dashboardService: DashboardService,private crudService:CrudProcessorService,private snackbarService:SnackbarService) { }
  displayedColumns:string[]=[];

  loadData(){
    this.crudService.listAll(this.currentDomain.projectName,this.currentDomain.domainName).subscribe(res=>{       
      this.dataSource = res["data"];
    },error=>{
      console.log(error);
      this.snackbarService.openSnackBar(error.error["message"], "Error", "custom-eror-snackbar");
    })
  }

  getDisplayedColumns(id:string){     
    this.crudService.getColumnNames(id).subscribe(data=>{
      this.displayedColumns = data["dataSet"];      
    },error=>{
      console.log(error);
      this.snackbarService.openSnackBar(error.error["message"], "Error", "custom-eror-snackbar");
    });

  } 

  ngOnInit() {
    this.currentDomain =  this.dashboardService.getSelectedDomainForCrudOps();      
    this.getDisplayedColumns(this.currentDomain.id);   
    this.loadData(); 
  }

  


}
