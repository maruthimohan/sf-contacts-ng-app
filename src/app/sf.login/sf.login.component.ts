import { Component, OnInit } from '@angular/core';
import { SfLoginService } from '../sf-login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { SFConfig } from '../models/sf.models';

@Component({
  selector: 'app-sf.login',
  templateUrl: './sf.login.component.html',
  styleUrls: ['./sf.login.component.css']
})
export class SfLoginComponent implements OnInit {
  private auth_code: string;
  private auth_response: any;
  private access_token: string;
  private refresh_token: string;
  private authTokenIssuedAt: number;

  constructor(
    private _sfService: SfLoginService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // this.authorizeUser();
    this.getAccessTokenFromSalesforce();
  }

  /**
   * Authorizes the user
   * Redirects the user to the Salesforce Login Page
   */
  authorizeUser() {
    this._sfService.authorizeUser();
  }

  getAccessTokenFromSalesforce() {
    this.route.queryParams.pipe(
      concatMap(
        params => {
          console.log(params);
          this.auth_code = params['code'];
          console.log(`Auth_Code Recieved: ${this.auth_code}`);
          if (this.auth_code !== undefined) {
            return of({
              response : this._sfService.getAccessTokenFromSalesforce(this.auth_code),
              isInitialLoad : false
            });
          } else {
            return of({
              message: 'Login page initial load.',
              isInitialLoad: true
            });
          }
        }
      )
    ).subscribe(
      response => {
        const isInitialLoad = response.isInitialLoad;
        if (isInitialLoad !== undefined && !isInitialLoad) {
          console.log(`Response received from the Access Token call: ${response}`);
          this.auth_response = response;
          console.log(response);
          this.fetchAccessTokenAndStore(response);
        } else {
          console.log('Initial Page Loaded.');
        }
      }
    );
  }

  private fetchAccessTokenAndStore(response: any) {
    const _response = response.response;
    _response.subscribe(_res => {
      // Read the important variables from the response
      this.access_token = _res.access_token;
      this.refresh_token = _res.id_token;
      this.authTokenIssuedAt = _res.issued_at;
      // Set the SF Configuration to the Service
      this.setAuthResponseToService();
      // alert(`The Access Token set is ${this._sfService.getAccessToken()}`);
      // Redirect to the Notes App Page
      this.router.navigate(['/notes']);
    });
  }

  private setAuthResponseToService() {
    // Set the Salesforce Configuration to the Service
    this._sfService.setSFConfig(
      new SFConfig(
        this.auth_response,
        this.access_token,
        this.refresh_token,
        this.authTokenIssuedAt
      )
    );
  }

}
