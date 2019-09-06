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

  foto: string;
  contrato: any = {
    descricao: '',
    nome: ''
  };
  contratos: any;

  constructor(
    private requestService: ApiRequestService,
    private geolocation: Geolocation
  ) { }

  ngOnInit() {

    this.carregarFoto();

    this.localizacaoAtual().then(
      data => {
        console.log(data.latitude + " " + data.longitude)
        this.requestService.getRequest(`${environment.apiUrl}/contrato/proximos?latitude=${data.latitude}&longitude=${data.longitude}&range=500`
      ).then(
        t => {
          this.contratos = t;
          this.passarContrato();
        }
      );
    });

  }

  passarContrato() {
    if(this.contratos.content.length > 0) {
      this.contrato.descricao = this.contratos.content[0].descricao;
      this.contrato.nome = this.contratos.content[0].usuarios[0].nome;
      this.contratos.content.shift();
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

  private carregarFoto(){
    const foto = localStorage.getItem('foto');
    if (foto) {
      this.foto = 'data:image/jpeg;base64,' + foto;
    }
    else {
      this.foto = '../../../assets/anon_img.png';
    }
  }

}
