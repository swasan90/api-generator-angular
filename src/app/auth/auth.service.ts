/**
 * @author Swathy Santhoshkumar
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';  
import { JwtHelperService } from '@auth0/angular-jwt'; 
import { jwtTokenDetails } from '../model/jwtTokenDetails';

@Injectable({
  providedIn: 'root'
})

/**
 * Auth service class
 */
export class AuthService {

  public currentUserSubject: BehaviorSubject<jwtTokenDetails>;
  public currentUser: Observable<jwtTokenDetails>;


  constructor(private httpClient: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {
    this.currentUserSubject = new BehaviorSubject<jwtTokenDetails>(this.getUser());
    this.currentUser = this.currentUserSubject.asObservable();

  }

  /**
   * Function to return the user from localstorage.
   */
  getUser() {
    if (localStorage.getItem("currentUser")) {       
      return JSON.parse(localStorage.getItem("currentUser"));
    }
    return null;
  }

  public get currentUserValue(): jwtTokenDetails {            
    return this.currentUserSubject.value;
  }
 
  /**
   * Function to return if the user is logged in or not.
   */
  public get loggedIn(): boolean {    
    return localStorage.getItem('token') !=null;
  }

  public getToken():string{
    console.log(localStorage.getItem("token"));
    return localStorage.getItem("token");
  }



}
