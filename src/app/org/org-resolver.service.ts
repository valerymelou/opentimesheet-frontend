import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap, take } from 'rxjs/operators';
import { OrgService } from './org.service';

@Injectable({
  providedIn: 'root'
})
export class OrgResolverService implements Resolve<string> {

  constructor(private router: Router, private orgService: OrgService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Observable<never> {
    const slug = route.paramMap.get('slug') || '';

    return this.orgService.checkOrg(slug).pipe(
      take(1),
      mergeMap(org => {
        if (org) {
          return of(slug);
        } else {
          this.router.navigate(['/start']);

          return EMPTY;
        }
      }),
      catchError(error => {
        this.router.navigate(['/start']);

        return EMPTY;
      })
    );
  }
}
