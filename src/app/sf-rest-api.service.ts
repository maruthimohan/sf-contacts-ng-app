import { Injectable } from '@angular/core';
import { SfLoginService } from './sf-login.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SfRestApiService {
  // Salesforce REST API related variables
  private sfServicesBaseURL = 'https://ap7.salesforce.com/services/data';
  // Proxy Salesforce Base Service URL
  private sfServiceProxyBaseURL = 'https://angular-sf-proxy.herokuapp.com/services/data';
  private sfAPIVersion = 'v46.0';
  private sfResource = 'sobjects';
  private sfSobjectAPIName = '';
  private sfNoteAPIName = 'Note__c';
  private sfQueryResourceName = 'query';

  constructor(
    private sfLoginService: SfLoginService,
    private http: HttpClient
  ) { }

  public queryRecords(queryString: string): Observable<any> {
    const sfEndpoint = `${this.sfServiceProxyBaseURL}/${this.sfAPIVersion}/${this.sfQueryResourceName}?q=${queryString}`;
    return this.http.get(
      sfEndpoint,
      {
        headers: {
          Authorization: `Bearer ${this.sfLoginService.getAccessToken()}`
        }
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  public createRecord(sObjectAPIName: string, sfRecord: any): Observable<any> {
    const sfEndpoint = `${this.sfServiceProxyBaseURL}/${this.sfAPIVersion}/${this.sfResource}/${sObjectAPIName}/`;
    return this.http.post(
      sfEndpoint,
      sfRecord,
      {
        headers: {
          Authorization: `Bearer ${this.sfLoginService.getAccessToken()}`
        }
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  public updateRecord(sObjectAPIName: string, sfRecord: any, recordID: string): Observable<any> {
    const sfEndpoint = `${this.sfServiceProxyBaseURL}/${this.sfAPIVersion}/${this.sfResource}/${sObjectAPIName}/${recordID}`;
    return this.http.patch(
      sfEndpoint,
      sfRecord,
      {
        headers: {
          Authorization: `Bearer ${this.sfLoginService.getAccessToken()}`
        }
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  public getNotesQueryString(): string {
    return `SELECT Id, Name, Description__c, Email__c, Priority__c, Remind_Later__C FROM ${this.sfNoteAPIName}`;
  }

  public showSessionId() {
    return this.sfLoginService.getAccessToken();
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
}
