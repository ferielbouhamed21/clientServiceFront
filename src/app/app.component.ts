import { Component } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zoho-api';
  // username: String;
  // isLogged: boolean;
  // isAdmin: boolean;

  // constructor(
  //   private oauthService: OAuthService,
  // ) {
  //   this.configure();
  // }

  // authConfig: AuthConfig = {
  //   issuer: 'http://localhost:8180/auth/realms/advyProject',
  //   redirectUri: window.location.origin,
  //   clientId: 'frontEnd',
  //   responseType: 'code',
  //   scope: 'openid profile email offline_access',
  //   showDebugInformation: true,
  // };

  // configure(): void {
  //   this.oauthService.configure(this.authConfig);
  //   this.oauthService.tokenValidationHandler = new NullValidationHandler();
  //   this.oauthService.setupAutomaticSilentRefresh();
  //   this.oauthService.loadDiscoveryDocument()
  //     .then(() => this.oauthService.tryLogin())
  //     .then(() => {
  //       console.log(this.oauthService.getIdentityClaims());
  //       if (this.oauthService.getIdentityClaims()) {
  //         this.isLogged = this.getIsLogged();
  //         this.isAdmin = this.getIsAdmin();
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  //   // this.username = this.oauthService.getIdentityClaims[`preferred_username`];	
  //   //   this.messageService.sendMessage(this.loginService.getUsername());
  //   // }
  //   // });
  // }

  // login(): void {
  //   this.oauthService.initImplicitFlowInternal();
  // }

  // logout(): void {
  //   this.oauthService.logOut();
  // }

  // public getIsLogged(): boolean {
  //   return this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken();
  // }

  // public getIsAdmin(): boolean {
  //   const token = this.oauthService.getAccessToken();
  //   const payload = token.split('.')[1];
  //   const payloadDecodedJson = atob(payload);
  //   const payloadDecoded = JSON.parse(payloadDecodedJson);
  //   // console.log(payloadDecoded.realm_access.roles);
  //   return payloadDecoded.realm_access.roles.indexOf('realm-admin') !== -1;
  // }
  constructor(private keycloakService: KeycloakService) {}
  logout() {
    this.keycloakService.logout();
  }
}
