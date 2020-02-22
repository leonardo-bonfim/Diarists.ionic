import { LoadingController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export abstract class BaseComponent {

    constructor(
        protected loadingController: LoadingController,
        protected router: Router
    ) { }

    protected carregar<T>(promise: Promise<T>) {
        return new Promise<T>((resolve, reject) => {
            let loading = this.loadingController
                .create({
                    message: 'Aguarde...',
                    spinner: 'crescent'
                });
            loading.then(loadingData => {
                loadingData.present();
                promise
                    .then(async (resultado: T) => {
                        resolve(resultado);
                    })
                    .catch(async (error: any) => {
                        if (typeof (error) == typeof (HttpErrorResponse)) {
                            this.router.navigate(['/login']);
                        }
                        reject(error);
                    })
                    .finally(() => {
                        loadingData.dismiss();
                    });
            });
        });
    }
}