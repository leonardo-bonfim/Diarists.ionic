import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

export abstract class BaseComponent {

    constructor(
        protected loadingController: LoadingController,
        protected router: Router
    ) { }

    protected async carregar<T>(promise: Promise<T>): Promise<T> | null {
        return await new Promise<T>((resolve, reject) => {
            try {
                this.loadingController
                    .create({ message: 'Aguarde...', spinner: 'crescent' })
                    .then(async (loadingData: HTMLIonLoadingElement) => {
                        loadingData.present();
                        promise
                            .then(async (resultado: T) => {
                                resolve(resultado);
                            })
                            .finally(() => {
                                loadingData.dismiss();
                            });
                    });
            } catch (error) {
                console.log('passou aqui');
                if (error.status === 401 || error.status === '401') {
                    this.router.navigate(['/login']);
                }
                reject(null);
            }
        });
    }
}