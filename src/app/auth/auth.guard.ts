import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrgService } from '../org/org.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.auth.isFullyAuthenticated()) {
        // Authentication not required for login route
        return true;
      }

      // Navigate to the login page depending on the org
      const org = state.url.split('/')[1];
      const path = `/${org}/login`;
      this.router.navigate([path]);

      return false;
  }
}
