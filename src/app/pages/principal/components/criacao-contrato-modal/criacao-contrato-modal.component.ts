import { Contrato } from 'src/app/models/contrato';
import { Endereco } from 'src/app/models/endereco';
import { AlertService } from './../../../../services/alert.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { Component, OnInit } from '@angular/core';
import { LocalizacaoService } from 'src/app/services/localizacao.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criacao-contrato-modal',
  templateUrl: './criacao-contrato-modal.component.html',
  styleUrls: ['./criacao-contrato-modal.component.scss'],
})
export class CriacaoContratoModalComponent implements OnInit {

  isEnderecoCadastro = true;
  contratoForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private loadingController: LoadingController,
    private position: LocalizacaoService,
    private contratoService: ContratoService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  fecharModal() {
    this.modalController.dismiss();
  }

  teste(): void { // TODO Mudar nome do método
    this.isEnderecoCadastro = !this.isEnderecoCadastro;
  }

  async contratoSubmit(contratoData: any): Promise<void> {
    let loading = this.loadingController.create({ message: 'Aguarde...', spinner: 'crescent' });
    loading.then(async dataLoading => {
      dataLoading.present();
      let promise = this.isEnderecoCadastro ? this.position.obterLocalizacaoAtual() : this.position.obterLocalizacaoPorCep(contratoData.cep);
      promise.then(localizacao => {
        let contrato = new Contrato();
        contrato.descricao = contratoData.descricao;
        contrato.restricao = contratoData.restricao;
        contrato.latitude = String(localizacao.latitude);
        contrato.longitude = String(localizacao.longitude);
        this.objectToEndereco(contratoData)
          .then(endereco => {
            contrato.endereco = endereco;
            this.contratoService.criarContrato(contrato)
              .then(() => {
                this.alertService.toast(['Contrato criado!'], 'bottom', 'alert-success');
                this.fecharModal();
              })
              .catch(data => {
                this.alertService.toast(data, 'bottom', 'alert-danger');
              });
            dataLoading.dismiss();
          }
          );
      });
    });


  }

  private createForm(): void {
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

  private async objectToEndereco(contratoData: any): Promise<Endereco> {
    if (this.isEnderecoCadastro) {
      return await this.position.obterEnderecoAtual()
    } else {
      return new Promise<Endereco>(resolve => {
        let endereco = new Endereco();
        endereco.cep = contratoData.cep;
        endereco.uf = contratoData.uf;
        endereco.bairro = contratoData.bairro;
        endereco.cidade = contratoData.cidade;
        endereco.logradouro = contratoData.logradouro;
        endereco.numero = contratoData.numero;
        resolve(endereco);
      });
    }
  }
}
