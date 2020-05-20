import { Component, OnInit } from '@angular/core';
import { ContratoService } from 'src/app/services/contrato.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratoProximo } from 'src/app/models/contratos-proximo';
import { BaseComponent } from 'src/app/utils/base-component';
import { LoadingController } from '@ionic/angular';
import { LocalizacaoService } from 'src/app/services/localizacao.service';
import { ApiResponse } from 'src/app/models/response';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.page.html',
  styleUrls: ['./detalhe.page.scss'],
})
export class DetalhePage extends BaseComponent implements OnInit {

  contrato?: ContratoProximo;
  latitude: number;
  longitude: number;
  endereco: string;
  zoom: number;
  carregado = false;
  jaAceito = false;

  constructor(
    protected loadingController: LoadingController,
    protected router: Router,
    private localizacaoService: LocalizacaoService,
    private contratoService: ContratoService,
    private alertService: AlertService,
    private route: ActivatedRoute,
  ) {
    super(loadingController, router);
  }

  ngOnInit() {
    console.clear();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carregar(this.contratoService.obterContratoProximoPeloId(id))
      .then(async (resultado: ApiResponse<ContratoProximo>) => {
        this.jaAceito = this.contratoService.seJaAceito(resultado.data);
        const endereco = resultado.data.usuarios[0].endereco;
        const cep = resultado.data.usuarios[0].endereco.cep;
        this.contrato = resultado.data;
        this.endereco = this.localizacaoService.obterEnderecoString(endereco);
        this.localizacaoService.obterLocalizacaoPorCep(cep)
          .then(async (location) => {
            this.latitude = location.latitude;
            this.longitude = location.longitude;
            this.zoom = 12;
            this.carregado = true;
            const animationZoom = (iteration: number, time: number) => {
              if (iteration < 13) {
                setTimeout(() => {
                  this.zoom = this.zoom + 0.2;
                  animationZoom(iteration + 1, time - 20);
                }, time);
              }
            };
            animationZoom(0, 200);
          });
      });
  }

  aceitarContrato() {
    this.carregar(this.contratoService.aceitarContrato(this.contrato))
      .then(async (aceito) => {
        if (aceito) {
          this.alertService.toast(['Contrato aceito!'], 'bottom', 'alert-success');
          this.jaAceito = true;
        } else {
          this.alertService.toast(['Ocorreu um erro.'], 'bottom', 'alert-danger');
        }
      });
  }

}
