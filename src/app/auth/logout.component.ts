import { AuthService } from './auth.service';
import { LogoutService } from './logout.service';
import { HttpClient } from '@angular/common/http';
/**
 * @author Swathy Santhoshkumar
 */
import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../api-generator/snackbar.service';
 

@Component({
  template: '',
  providers:[LogoutService]
})

/**
 * Class to implement logout component methods.
 */
export class LogoutComponent implements OnInit {
  constructor(private httpClient:HttpClient,private logoutService:LogoutService,
    private snackbarService: SnackbarService,private authService:AuthService) { }
  /**
   * Function to implement logout method
   */
  logout() {
    let user_id = localStorage.getItem("uuid");
    this.logoutService.deleteRedisToken(user_id).subscribe(data=>{
        if(data){
            localStorage.setItem("uuid",null);
            localStorage.setItem("encodeUri",null);
            localStorage.setItem("jwtToken",null);
            this.authService.currentUserSubject.next(null);
            localStorage.setItem("currentUser",null);
            window.open("http://localhost:4200/home/auth/logout","_self");
        }
    },error=>{
        this.snackbarService.openSnackBar(error.error["message"], "Error", "custom-eror-snackbar");
    });
     
  }
  ngOnInit() {
    this.logout();
  }

}