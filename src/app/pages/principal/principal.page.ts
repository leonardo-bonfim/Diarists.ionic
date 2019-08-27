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

  constructor(
    private geolocation: Geolocation,
    private modalController: ModalController
  ) {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
    });
  }

  ngOnInit() {
  }

  async abrirModal() {
    const modal = await this.modalController.create({
      component: CriacaoContratoModalComponent
    });

    modal.present();
  }

}
