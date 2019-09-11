import { LoadingController } from '@ionic/angular';
import { Contrato } from 'src/app/models/contrato';
import { Component, OnInit, Input } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { environment } from 'src/environments/environment';
import { ApiRequestService } from './../../services/api-request.service';

@Component({
  selector: 'app-procurar-contrato',
  templateUrl: './procurar-contrato.page.html',
  styleUrls: ['./procurar-contrato.page.scss'],
})
export class ProcurarContratoPage implements OnInit {

  contrato: any = {
    descricao: '',
    nome: ''
  };
  contratos: any;

  constructor(
    private requestService: ApiRequestService,
    private geolocation: Geolocation,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {

    const loading = this.loadingController.create({
      message: 'Aguarde...',
      spinner: 'crescent'
    })
    loading.then(
      loadingData => {
        loadingData.present();

        this.localizacaoAtual().then(
          data => {
            this.requestService.getRequest(`${environment.apiUrl}/contrato/proximos?latitude=${data.latitude}&longitude=${data.longitude}&range=500`
          ).then(
            t => {
              this.contratos = t;
              this.passarContrato();
            }
          );
        });

        loadingData.dismiss();
      }
    )


  }

  passarContrato() {
    if(this.contratos.data.content.length > 0) {
      this.contrato.descricao = this.contratos.data.content[0].descricao;
      this.contrato.nome = this.contratos.data.content[0].usuarios[0].nome;
      this.contratos.data.content.shift();
    }
    else {
      this.contrato.descricao = '';
      this.contrato.nome = '';
    }
  }

  private async localizacaoAtual() {
    return await this.geolocation.getCurrentPosition().then(
      data => {
         return {
          latitude: data.coords.latitude,
          longitude: data.coords.longitude
        }
      }
    );
  }

}
