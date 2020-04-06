import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioForm } from '../models/usuario-form.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { BaseComponent } from 'src/app/utils/base-component';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent extends BaseComponent implements OnInit {

  dadosOriginais = new UsuarioForm();
  dadosEmTela = new UsuarioForm();

  constructor(
    protected loadingController: LoadingController,
    protected router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private alertService: AlertService
  ) {
    super(loadingController, router);
  }

  ngOnInit() {
    const dadosOriginais = this.authService.obterDadosDeUsuarioLogado();
    const dadosEmTela = this.authService.obterDadosDeUsuarioLogado();
    this.dadosOriginais = dadosOriginais as UsuarioForm;
    this.dadosEmTela = dadosEmTela as UsuarioForm;
  }

  foiAlterado() {
    return JSON.stringify(this.dadosEmTela) !== JSON.stringify(this.dadosOriginais);
  }

  salvar() {
    const body = new Object();
    // tslint:disable-next-line: no-string-literal
    if (this.dadosEmTela.nome !== this.dadosOriginais.nome) { body['nome'] = this.dadosEmTela.nome; }
    // tslint:disable-next-line: no-string-literal
    if (this.dadosEmTela.email !== this.dadosOriginais.email) { body['email'] = this.dadosEmTela.email; }
    for (const prop in this.dadosEmTela.endereco) {
      if (this.dadosEmTela.endereco[prop] !== this.dadosOriginais.endereco[prop]) {
        body[prop] = this.dadosEmTela.endereco[prop];
      }
    }
    this.carregar(this.usuarioService.atualizarDadosDeUsuario(body))
      .then((result) => {
        this.alertService.toast(['Atualizado com sucesso!'], 'bottom', 'alert-success');
      })
      .catch(error => {
        this.alertService.toast([error.message], 'bottom', 'alert-danger');
      })
      .finally(() => {
        this.router.navigate(['/tabs/configuracao']);
      });
  }

}

