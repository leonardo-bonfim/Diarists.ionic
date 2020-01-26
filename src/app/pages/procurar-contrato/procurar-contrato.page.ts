import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ContratoService } from 'src/app/services/contrato.service';
import { LocalizacaoService } from 'src/app/services/localizacao.service';

@Component({
  selector: 'app-procurar-contrato',
  templateUrl: './procurar-contrato.page.html',
  styleUrls: ['./procurar-contrato.page.scss'],
})
export class ProcurarContratoPage implements OnInit {

  contrato: any = { descricao: '', nome: '' };
  contratos: any;

  constructor(
    private localizacao: LocalizacaoService,
    private loadingController: LoadingController,
    private contratoService: ContratoService
  ) { }

  ngOnInit() {
    const loading = this.loadingController.create({
      message: 'Aguarde...',
      spinner: 'crescent'
    })
    loading
      .then(loadingData => {
        loadingData.present();
        this.localizacao.obterLocalizacaoAtual()
          .then(location => {
            this.contratoService.obterContratos(location.latitude, location.longitude, 500)
              .then(contratos => {
                this.contratos = contratos;
                this.passarContrato();
              }
              );
          });
        loadingData.dismiss();
      }
      )
  }

  passarContrato() {
    if (this.contratos.data.content.length > 0) {
      this.contrato.descricao = this.contratos.data.content[0].descricao;
      this.contrato.nome = this.contratos.data.content[0].usuarios[0].nome;
      this.contratos.data.content.shift();
    }
    else {
      this.contrato.descricao = '';
      this.contrato.nome = '';
    }
  }
}