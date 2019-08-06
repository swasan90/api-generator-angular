import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { JwtToken } from './model/jwtToken';
import { StartUpService } from './startup-service';
import { AuthService } from './auth/auth.service';
/// <reference types="crypto-js" />

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  constructor(){} 
  title = 'api-generator';
  ngOnInit() {
   
  }
}
