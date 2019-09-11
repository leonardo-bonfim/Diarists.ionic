import { ApiRequestService } from './../../services/api-request.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';

import { AlertService } from '../../services/alert.service';
import { AuthService } from './../../seguranca/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService,
    private alertService: AlertService,
    private requestService: ApiRequestService,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }

  logar(usuario: string, senha: string) {
    
    const loading = this.loadingController.create({
      message: 'Aguarde...',
      spinner: 'crescent'
    })
    loading.then(
      async dataLoading => {
        dataLoading.present()
        
        await this.auth.login(usuario, senha)
        .then(() => {
          this.requestService.getRequest(`${environment.apiUrl}/usuario/foto?email=${usuario}`, true).then(
            data => {
              localStorage.setItem('foto', data as string)
              this.router.navigate(['tabs/principal']);            
            }
          )
        })
        .catch(erro => {
          this.alertService.toast(erro, 'bottom', 'alert-danger');
        });

        dataLoading.dismiss();
      }
    )
  }

}
