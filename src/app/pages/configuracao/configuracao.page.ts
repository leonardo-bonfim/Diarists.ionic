import { Component, OnInit } from '@angular/core';
import { Formulario } from './formulario';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.page.html',
  styleUrls: ['./configuracao.page.scss'],
})
export class ConfiguracaoPage implements OnInit {

  model: Formulario;

  constructor() { }

  ngOnInit() {
    this.model = new Formulario();
  }

  salvar(){
    console.log(this.model);
  }

}

