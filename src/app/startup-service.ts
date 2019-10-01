import { JwtToken } from './model/jwtToken';

import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth/auth.service';
/// <reference types="crypto-js" />

export function startupServiceFactory(startupService: StartUpService): Function {
    return () => startupService.load();
}

@Injectable()
export class StartUpService {

    private _startupData: any;
    public jwtTokenObj: JwtToken;
    private uuid: string;

    constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService, private authService: AuthService) { }
    get startupData(): any {
        return this._startupData;
    }


    async load() {
        this._startupData = null;
        this.getId();
        let uuid = localStorage.getItem("uuid");          
        const data = await this.httpClient.get(environment.redis_url + "getToken/" + uuid).pipe(map((res: any) => {
            if (!this.jwtHelper.isTokenExpired(JSON.stringify(res.tokenObj.jwtToken))) {
                this.jwtTokenObj= res["tokenObj"];
                localStorage.setItem("jwtToken", JSON.stringify(this.jwtTokenObj.jwtToken));
                localStorage.setItem("currentUser", JSON.stringify(this.jwtHelper.decodeToken(
                    JSON.stringify(res.tokenObj.jwtToken))));
                this.authService.currentUserSubject.next(this.authService.getUser());
            }
        }), catchError((err: any) => Promise.resolve()))
            .toPromise();
        return this._startupData = data;
    }

    getId() {
        const path = new URL(window.location.href).pathname;
        let parts = path.split('/');
        localStorage.setItem("encodeUri", (parts[parts.length - 1]));
        var encrypted_text = decodeURIComponent((parts[parts.length - 1]));
        let decryptedData = CryptoJS.AES.decrypt(encrypted_text, environment.secret_key_uuid).toString(CryptoJS.enc.Utf8);
        this.uuid = decryptedData;
        localStorage.setItem("uuid", this.uuid);
    }
}