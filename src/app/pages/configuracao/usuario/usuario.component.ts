import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {

  form = {
    nome: '',
    email: ''
  };

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const dados = this.authService.obterDadosDeUsuarioLogado();
    this.form.nome = dados.nome;
    this.form.email = dados.email;
  }


  salvar() {
  }

}

