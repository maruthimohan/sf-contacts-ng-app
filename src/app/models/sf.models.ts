export class Note {
  public Id: string;
  public Name: string;
  public Description__c: string;
  public Priority__c: string;
  public Email__c: string;
  public Remind_Later__c: boolean;
}

export class SFConfig {
  public auth_response: any;
  public access_token: string;
  public refresh_token: string;
  public authTokenIssuedAt: number;

  constructor(authRes?: any, accessTkn?: string, refreshTkn?: string, issuedAt?: number) {
    this.auth_response = authRes;
    this.access_token = accessTkn;
    this.refresh_token = refreshTkn;
    this.authTokenIssuedAt = issuedAt;
  }
}
