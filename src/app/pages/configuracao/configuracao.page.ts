import { Component, OnInit } from '@angular/core';
import { Formulario } from './formulario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.page.html',
  styleUrls: ['./configuracao.page.scss'],
})
export class ConfiguracaoPage implements OnInit {

  model: Formulario = new Formulario();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const dados = this.authService.obterDadosDeUsuarioLogado();
    this.model.nome = dados.nome;
    this.model.email = dados.email;
  }

  salvar(): void {
    console.log(this.model);
  }

}

