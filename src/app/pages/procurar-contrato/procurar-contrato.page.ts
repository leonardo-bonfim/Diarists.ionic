import { Component, OnInit } from '@angular/core';
import { ContratoService } from 'src/app/services/contrato.service';
import { BaseComponent } from 'src/app/utils/base-component';
import { LoadingController } from '@ionic/angular';
import { ContratosProximo, ContratoProximo } from 'src/app/models/contratos-proximo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-procurar-contrato',
  templateUrl: './procurar-contrato.page.html',
  styleUrls: ['./procurar-contrato.page.scss'],
})
export class ProcurarContratoPage extends BaseComponent implements OnInit {

  contratos?: Array<{ id: number, contrato: ContratoProximo }> = [];

  constructor(
    private contratoService: ContratoService,
    protected loadingController: LoadingController, 
    protected router: Router
  ) { 
    super(loadingController, router);
  }

  ngOnInit() {
    this.carregar(this.contratoService.obterContratosProximos(1000))
      .then(async (contratos: ContratosProximo) => {
        this.contratos = contratos.data.content
          .map((contrato: ContratoProximo, index: number) => { 
            return { id: index, contrato: contrato }; 
          });
        this.contratoService.contratos = this.contratos;
      });
  }
}