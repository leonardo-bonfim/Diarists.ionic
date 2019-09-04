import { ImagemService } from 'src/app/services/imagem.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CriacaoContratoModalComponent } from './components/criacao-contrato-modal/criacao-contrato-modal.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  foto: string;

  constructor(
    private modalController: ModalController,
    private imagemService: ImagemService
  ) { }

  ngOnInit() {
    this.foto = this.imagemService.bs4ToImage(localStorage.getItem('foto'));
  }

  async abrirModal() {
    const modal = await this.modalController.create({
      component: CriacaoContratoModalComponent
    });

    modal.present();
  }

}
