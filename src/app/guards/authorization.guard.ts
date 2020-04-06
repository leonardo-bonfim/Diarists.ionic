import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  jwtHelperService = new JwtHelperService();

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelperService.decodeToken(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    if (expirationDate < new Date()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
