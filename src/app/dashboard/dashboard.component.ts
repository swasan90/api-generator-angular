import { SnackbarService } from './../api-generator/snackbar.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { DashboardData } from '../model/dashboard-data';
import { ProjectDomain } from '../model/projectDomain';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  treeControl = new NestedTreeControl<DashboardData>(node => node.children);
  dataSource = new MatTreeNestedDataSource<DashboardData>();
  constructor(private dashboardService: DashboardService, private snackbarService: SnackbarService, private route: Router,
    private router:ActivatedRoute) { }

  hasChild = (_: number, node: DashboardData) => !!node.children && node.children.length > 0;

  /**
   * Function to get all projects.
   */
  getAllProjects() {
    this.dashboardService.listAllProjects().subscribe(res => {
      this.dataSource.data = res["dataSet"];
    }, error => {
      console.log(error);
      this.snackbarService.openSnackBar(error.error["message"], "Error", "custom-eror-snackbar");
    });
  }

  /**
   * Function to get node.
   * @param node 
   */
  getNode(node: ProjectDomain) {
    this.dashboardService.setDomainForCrudOps(node);
    this.route.navigate(["/api/crud_processor"]);
  }

  ngOnInit() {
    this.getAllProjects();
  }

}
