import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  private currentOrgCode = '';

  constructor(private http: HttpClient) { }

  getCurrentOrgCode(): string {
    return this.currentOrgCode;
  }

  setCurrentOrgCode(schema: string): void {
    this.currentOrgCode = schema;
  }

  checkOrg(slug: string): Observable<{}> {
    const url = `/check-organization/${slug}`;

    return this.http.get(url);
  }
}
