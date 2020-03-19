import { Component, OnInit } from '@angular/core';
import { ContratoService } from 'src/app/services/contrato.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratoProximo } from 'src/app/models/contratos-proximo';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.page.html',
  styleUrls: ['./detalhe.page.scss'],
})
export class DetalhePage implements OnInit {

  contrato?: ContratoProximo;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contratoService: ContratoService,
  ) { }

  ngOnInit() {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.contratoService.contratos) {
      this.contrato = this.contratoService.contratos.find(c => c.id == id).contrato;
      console.log(this.contrato);
    } else {
      this.router.navigate(['/tabs/procurar-contrato']);
    }
  }

}
