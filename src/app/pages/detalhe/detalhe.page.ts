import { Component, OnInit } from '@angular/core';
import { ContratoService } from 'src/app/services/contrato.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratoProximo } from 'src/app/models/contratos-proximo';
import { BaseComponent } from 'src/app/utils/base-component';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.page.html',
  styleUrls: ['./detalhe.page.scss'],
})
export class DetalhePage extends BaseComponent implements OnInit {

  contrato?: ContratoProximo;

  constructor(
    protected loadingController: LoadingController,
    protected router: Router,
    private contratoService: ContratoService,
    private route: ActivatedRoute,
  ) {
    super(loadingController, router);
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carregar(this.contratoService.obterContratoProximoPeloId(id))
      .then(async (resultado) => {
        this.contrato = resultado.contrato;
        console.log(this.contrato);
      });
  }

  aceitarContrato() {
  }

}
