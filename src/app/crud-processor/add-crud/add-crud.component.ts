import { SchemaBuilder } from './../../model/schemaBuilder';
import { SnackbarService } from './../../api-generator/snackbar.service';
import { ProjectDomain } from 'src/app/model/projectDomain';
import { Component, OnInit, Input, SystemJsNgModuleLoader } from '@angular/core';
import { CrudProcessorService } from '../crud-processor.service';
import { CdkColumnDef } from '@angular/cdk/table';

@Component({
  selector: 'app-add-crud',
  templateUrl: './add-crud.component.html',
  styleUrls: ['./add-crud.component.css']
})
export class AddCrudComponent implements OnInit {

  columns:string[]=[];   
  currentDomain:ProjectDomain;
  formObj:SchemaBuilder={};
  ngModelValue:string;
  constructor(private crudService:CrudProcessorService,private snackBarService:SnackbarService) { }

  setColumns(displayedColumns){     
    for(let str of displayedColumns){
      let obj:any={};
      obj.name = str;
      this.columns.push(obj);
      this.formObj[str]="";
    }     
  }
 

  save(record:any){
    console.log(record);
  }

  ngOnInit() {
    this.currentDomain = JSON.parse(localStorage.getItem("currentDomain"));    
    this.crudService.getColumnNames(this.currentDomain.id).subscribe(data=>{
      let displayedColumns:string[] = data["dataSet"];
      this.setColumns(displayedColumns);
      console.log(this.formObj);
    },error=>{
      console.log(error);
      this.snackBarService.openSnackBar(error.error["message"], "Error", "custom-eror-snackbar");
    });    
  }

}
