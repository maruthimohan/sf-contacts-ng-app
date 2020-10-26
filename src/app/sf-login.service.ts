import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SFConfig } from './models/sf.models';

@Injectable({
  providedIn: 'root'
})
export class SfLoginService {
  private sfOauthloginURL = 'https://login.salesforce.com/services/oauth2/authorize';
  private consumerKey: string = '3MVG9ZL0ppGP5UrDOrHZEE_e5MGlbMqDgVdxIQWSFrtuZEp3Et93dOx64bT5MSRxeO.IsgFIo0m.PT3Sm1AOt';
  private consumerSecret: string = '8AEB44009FE059DA43A3F60604AD8C52039801659A93B6471D3B534144B37286';
  // Auth token from Salesforce
  private sfConfig: SFConfig;
  // Auth params
  private authParamMap: Map<string, string> = new Map([
      ['response_type', 'code'],
      ['client_id', this.consumerKey],
      ['redirect_uri', 'http://localhost:4200/login']
  ]);
  // POST Auth Endpoint
  private authTokenEndpoint = 'https://login.salesforce.com/services/oauth2/token';
  // PROXY Auth Endpoint
  private proxyAuthTokenEndpoint = 'https://angular-sf-proxy.herokuapp.com/services/oauth2/token';
  // CORS Proxy
  private corsProxyURL = 'https://cors-anywhere.herokuapp.com';

  constructor(
    private http: HttpClient
  ) { }

  public authorizeUser() {
    // construct the url and redirect the current page
    let authURL: string = `${this.sfOauthloginURL}?${this.generateAuthParams(this.authParamMap)}`;
    window.location.href = authURL; // redirect to the auth page
  }

  private generateAuthParams(authMap: Map<string, string>): string {
    let authString = '';
    let count = 1;
    authMap.forEach((value, key) => {
      console.log(`${key}==${value}`);
      authString += (`${key}=${value}`);
      if (count !== authMap.size) {
        authString += `&`;
      }
      count++;
    });
    return authString;
  }

  public getAccessTokenFromSalesforce(auth_code: string): Observable<any> {
    const httpOptions = {
      headers : new HttpHeaders({
        Authorization : 'Basic ' + window.btoa(this.consumerKey + ':' + this.consumerSecret)
      }),
      params : this.generatePOSTAuthParamsObject(auth_code)
    };
    return this.http.post<any>(`${this.proxyAuthTokenEndpoint}`, null, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public generatePOSTAuthParams(auth_code: string): HttpParams {
    const paramMap = new HttpParams();
    paramMap.set('grant_type', 'authorization_code');
    paramMap.set('redirect_uri', 'http://localhost:4200/home');
    paramMap.set('code', auth_code);
    return paramMap;
  }

  public generatePOSTAuthParamsObject(auth_code: string) {
    return {
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:4200/login',
      code: auth_code
    };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      console.log(error);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  public setSFConfig(sfConfig: SFConfig) {
    this.sfConfig = sfConfig;
    // set Access Token to local storage
    this.setAccessTokenToLocalStorage(sfConfig.access_token);
  }

  public getAccessToken(): string {
    if (this.sfConfig !== undefined) {
      return this.sfConfig.access_token;
    } else {
      return this.getAccessTokenFromLocalStorage();
    }
  }

  public setAccessToke(accessTkn: string) {
    if(accessTkn !== undefined) {
      if(this.sfConfig !== undefined) {
        this.sfConfig.access_token = accessTkn;
      } else {
        this.sfConfig = new SFConfig({}, accessTkn, '', 12345);
      }
    }
  }

  private setAccessTokenToLocalStorage(accessTkn: string) {
    let local_storage = window.localStorage;
    local_storage.setItem('Auth_Access_Token', accessTkn);
  }

  private getAccessTokenFromLocalStorage() {
    return localStorage.getItem('Auth_Access_Token');
  }
}
