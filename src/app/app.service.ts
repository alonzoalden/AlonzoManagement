import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    wasLoggedIn: boolean;
    userInfo: any;

    constructor(
        private oauthService: OAuthService,
    ) { }

    setWasLoggedIn() {
        this.wasLoggedIn = true;
    }

    getWasLoggedIn() {
        return this.wasLoggedIn;
    }
    get isLoggedin() {
        return (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken());
    }
    logout() {
        this.oauthService.logOut();
    }
}
