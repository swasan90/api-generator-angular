import { SnackbarService } from './../api-generator/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { DashboardData } from '../model/dashboard-data';
import { ProjectDomain } from '../model/projectDomain';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {  
  treeControl = new NestedTreeControl<DashboardData>(node => node.children);
  dataSource = new MatTreeNestedDataSource<DashboardData>();
  constructor(private dashboardService: DashboardService,private snackbarService:SnackbarService) { }

  hasChild = (_: number, node: DashboardData) => !!node.children && node.children.length > 0;
 
  private _getChildren = (node: DashboardData) => node.children;

  getAllProjects() {
    this.dashboardService.listAllProjects().subscribe(res => {   
      this.dataSource.data = res["projects"];        
    },error=>{
      console.log(error);
      this.snackbarService.openSnackBar(error.error["message"], "Error", "custom-eror-snackbar");
    });
  }

  getNode(node:DashboardData){
    console.log(node);
  }
 

  ngOnInit() {
    this.getAllProjects();
  }

}
