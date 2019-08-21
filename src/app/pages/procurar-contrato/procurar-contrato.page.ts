import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-procurar-contrato',
  templateUrl: './procurar-contrato.page.html',
  styleUrls: ['./procurar-contrato.page.scss'],
})
export class ProcurarContratoPage implements OnInit {

  @Input() nomePagina = 'Procurar Contrato';

  constructor() { }

  ngOnInit() {
  }

}
