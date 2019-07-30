import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ApiGeneratorService {

  constructor() { }

  public projectSource = new BehaviorSubject(this.getProject());
  currentProject = this.projectSource.asObservable();

  /**
   * Function to get project.
   */
  getProject() {
    return localStorage.getItem("projectData");
  }

  /**
   * Function to get current project.
   * @param project 
   */
  getCurrentProject(project: Project) {
    this.projectSource.next(JSON.stringify(project));
  }

  /**
   * Function to convert to lowercase and replace spaces with underscore.
   * @param field 
   */
  cleanString(field: string) {
    var str = field.trim().toLowerCase();
    return str.replace(/\s+/g, "_");
  }
}
