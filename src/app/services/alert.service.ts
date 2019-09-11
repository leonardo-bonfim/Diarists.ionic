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

  async toast(messages: Array<string>, position, cssClass: string) {
    return await this.toastCtrl.create({
      message: messages[0],
      position,
      cssClass,
      duration: 1500,
      animated: true
    }).then(resultado => {
      if(messages.length != 0) {
        resultado.present();
        resultado.onDidDismiss().then(
          () => {
            messages.shift();
            this.toast(messages, position, cssClass);
          }
        )
      }
    });
  }

  async alert_success() {
    const alert = await this.alertCtrl.create({
      buttons: ['OK'],
    });
    
    await alert.present();    
    let result = await alert.onDidDismiss();
  }

}
