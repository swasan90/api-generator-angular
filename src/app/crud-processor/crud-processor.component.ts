import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { ProjectDomain } from '../model/projectDomain';
import { CrudProcessorService } from './crud-processor.service';
import { SnackbarService } from '../api-generator/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-processor',
  templateUrl: './crud-processor.component.html',
  styleUrls: ['./crud-processor.component.css']
})
export class CrudProcessorComponent implements OnInit {
  
  currentDomain:ProjectDomain;
  dataSource:[]=[];
  constructor(private dashboardService: DashboardService,
    private crudService:CrudProcessorService,private snackbarService:SnackbarService,private router:Router) { }
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
      this.displayedColumns.push("Actions");
    },error=>{
      console.log(error);
      this.snackbarService.openSnackBar(error.error["message"], "Error", "custom-eror-snackbar");
    });
  } 

  addRecord(){    
    this.router.navigate(['/api/crud_processor/add']);
  }

  edit(element:any){  
    this.router.navigate(['/api/crud_processor/edit']);
    this.crudService.setSelectedElement(element);
  }

  ngOnInit() {
    this.currentDomain =  this.dashboardService.getSelectedDomainForCrudOps();      
    this.getDisplayedColumns(this.currentDomain.id);   
    this.loadData(); 
    this.crudService.buildSchemaArray(); 
  }
}
