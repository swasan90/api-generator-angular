/**
 * @author Swathy Santhoshkumar
 */
import { AuthService } from './../auth/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()

/**
 * Class to implement interceptor for handling error request on failure authentication.
 */
export class ErrorInterceptor implements HttpInterceptor {
  error: string;
  constructor(private authService: AuthService,private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      let error = "";
      if (err.status == 401) {        
        error = err.error.message;
      } else if (err.status == 403) {
        console.log("in 403");
        this.router.navigate(['auth/logout']);
      } else {
        if (err.error["errors"]) {          
          let errorObj = err.error["errors"];
          for (let obj of errorObj) {
            error += obj.defaultMessage + " \n";
          }
        } else {
          error = err.error.message;
        }
      }     
      return throwError(error);
    }));
  }


}
