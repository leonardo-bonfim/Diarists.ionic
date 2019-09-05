import { HttpClient } from '@angular/common/http';
import { ApiRequestService } from './../../../../services/api-request.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Contrato } from 'src/app/models/contrato';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Endereco } from 'src/app/models/endereco';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-criacao-contrato-modal',
  templateUrl: './criacao-contrato-modal.component.html',
  styleUrls: ['./criacao-contrato-modal.component.scss'],
})
export class CriacaoContratoModalComponent implements OnInit {

  isEnderecoCadastro = true;
  contratoForm: FormGroup;

  urlGoogleGeoCode = 'https://maps.googleapis.com/';

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private requestService: ApiRequestService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  fecharModal() {
    this.modalController.dismiss();
  }

  teste() { // TODO Mudar nome do método
    this.isEnderecoCadastro = !this.isEnderecoCadastro;
  }

  async contratoSubmit(contratoData) {
    this.httpClient.get(
      `${this.urlGoogleGeoCode}maps/api/geocode/json?address=${contratoData.cep}&key=${environment.googleApiKey}
    `).toPromise().then(
      a => {
        const contrato = new Contrato();
        contrato.descricao = contratoData.descricao;
        contrato.restricao = contratoData.restricao;
        contrato.latitude = (a as any).results[0].geometry.location.lat;
        contrato.longitude = (a as any).results[0].geometry.location.lng;
        contrato.endereco = this.objectToEndereco(contratoData);
    
        console.log(contrato.latitude);
        console.log(contrato.longitude);
    
        this.requestService.postRequest('http://192.168.0.10:8080/contrato', contrato).then(
          () => this.fecharModal()
        );
      }
    );
   
  }

  private createForm() {

    this.contratoForm = this.formBuilder.group({
      descricao: [null],
      restricao: [null],
      cep: [null, Validators.required],
      logradouro: [null, Validators.required],
      numero: [null, Validators.required],
      uf: [null, Validators.required],
      cidade: [null, Validators.required],
      bairro: [null, Validators.required]
    });
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
