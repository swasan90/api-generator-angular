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

  getProject(){
    return localStorage.getItem("projectData");
  }

  getCurrentProject(project:Project){
    this.projectSource.next(JSON.stringify(project));
  }

  cleanString(field:string){         
    var str = field.trim().toLowerCase();     
    return str.replace(/\s+/g, "_");
  }
}
