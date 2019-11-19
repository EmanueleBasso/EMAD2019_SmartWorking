import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (localStorage.getItem('uid') != null) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
