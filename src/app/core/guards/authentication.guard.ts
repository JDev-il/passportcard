
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not allowed to view this page. You are redirected to Home Page');
      localStorage.setItem('token', environment.APIKey)
      return true;
    }
    return true;
  }
}
