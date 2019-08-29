import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from './../../services/alert/alert.service';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  logar(usuario: string, senha: string) {
    this.auth.login(usuario, senha)
      .then(() => {
        this.router.navigate(['tabs/principal'])
      })
      .catch(erro => {
        this.alertService.toast(erro, 'bottom');
      });
  }
}
