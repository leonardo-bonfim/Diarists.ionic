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
    const foto = localStorage.getItem('foto');
    if (foto) {
      this.foto = 'data:image/jpeg;base64,' + foto;
    }
    else {
      this.foto = '../../../assets/anon_img.png';
    }
  }

  async abrirModal() {
    const modal = await this.modalController.create({
      component: CriacaoContratoModalComponent
    });

    modal.present();
  }

}
