import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  async toast(title: string, position) {
    return await this.toastCtrl.create({message: title,
    position, duration: 3000})
      .then(resultado => {
        resultado.present();
      });
  }

}
