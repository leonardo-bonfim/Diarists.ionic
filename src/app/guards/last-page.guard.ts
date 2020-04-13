import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LastPageGuard implements CanLoad {


  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean {

    if (this.authService.seEstaLogado()) {
      const url = localStorage.getItem('ultima_pagina');
      if (url != null) {
        this.router.navigate([url]);
      }
    }

    return true;
  }

}
