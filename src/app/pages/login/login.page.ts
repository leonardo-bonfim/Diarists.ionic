import { ApiRequestService } from './../../services/api-request.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { BaseComponent } from 'src/app/utils/base-component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BaseComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private requestService: ApiRequestService,
    protected router: Router,
    protected loadingController: LoadingController,
  ) {
    super(loadingController, router);
  }

  ngOnInit(): void {
    // console.clear();
  }

  logar(usuario: string, senha: string) {
    this.carregar(this.authService.login(usuario, senha))
      .then(async () => {
        this.requestService.getRequest(`${environment.apiUrl}/usuario/foto?email=${usuario}`, true)
          .then(async photoData => {
            localStorage.setItem('foto', photoData as string)
            this.router.navigate(['tabs/principal']);
          });
      })
      .catch(erro => {
        this.alertService.toast(erro, 'bottom', 'alert-danger');
      });
  }

}
