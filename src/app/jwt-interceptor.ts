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
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available        
        let token =JSON.parse(localStorage.getItem("jwtToken"));
        console.log(token);
        console.log(request.url);
        request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });

        return next.handle(request);        
    }
 
}