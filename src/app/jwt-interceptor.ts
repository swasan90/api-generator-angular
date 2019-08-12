import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth/auth.service';
/**
 * @author Swathy Santhoshkumar
 */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

/**
 * Class to implement interceptor to pass the jwt token on authorization header for every request.
 */
export class JwtTokenInterceptor implements HttpInterceptor { 
    constructor(private authService:AuthService,private jwtService:JwtHelperService){}   
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available   
        let token = this.authService.getToken();         
        if(token !=null && !this.jwtService.isTokenExpired()){
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }       

        return next.handle(request);        
    }
 
}