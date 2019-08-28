import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  logar(usuario: string, senha: string) {
    this.auth.login(usuario, senha);
    // this.router.navigateByUrl('tabs/principal');
  }

}
