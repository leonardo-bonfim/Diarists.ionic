import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ImagemService } from 'src/app/services/imagem.service';
import { Endereco } from 'src/app/models/endereco';
import { Usuario } from './../../models/usuario';
import { ApiRequestService } from './../../services/api-request.service';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  myPhoto: any;
  buttonImagemCor: string = 'primary';
  usuarioForm: FormGroup

  constructor(
    private imagemService: ImagemService,
    private formBuilder: FormBuilder,
    private requestService: ApiRequestService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  pegarFoto() {
    this.imagemService.takePhoto(0).then(
      data => {
        this.myPhoto = data;
        this.buttonImagemCor = 'success';
      }
    )
  }

  usuarioSubmit(usuarioData) {
    const usuario = new Usuario();
    usuario.nome = usuarioData.nome;
    usuario.sobrenome = usuarioData.sobrenome;
    usuario.cpf = usuarioData.cpf;
    usuario.email = usuarioData.email;
    usuario.foto = this.myPhoto;
    usuario.senha = usuarioData.senha;
    usuario.sexo = usuarioData.sexo;
    usuario.endereco = this.objectToEndereco(usuarioData);

    console.log(usuario)
    this.requestService.postRequest(`${environment.apiUrl}/usuario`, usuario)
      .catch(
        data => {
          data.forEach(element => {
            this.alertService.toast(element, 'top')
          });
        }
      );
  }

  private createForm() {

    this.usuarioForm = this.formBuilder.group({
      nome: [null],
      sobrenome: [null],
      sexo: [null],
      cpf: [null],
      endereco: [null],
      foto: [null],
      cep: [null],
      logradouro: [null],
      numero: [null],
      uf: [null],
      cidade: [null],
      bairro: [null],
      email: [null],
      senha: [null]
    })

  }

  private objectToEndereco(contratoData) {
    const endereco = new Endereco();

    endereco.cep = contratoData.cep;
    endereco.uf = contratoData.uf;
    endereco.bairro = contratoData.bairro;
    endereco.cidade = contratoData.cidade;
    endereco.logradouro = contratoData.logradouro;
    endereco.numero = contratoData.numero;

    return endereco;
  }

}
