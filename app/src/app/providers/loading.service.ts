import { Injectable } from '@angular/core';

import { LoadingController } from '@ionic/angular';

@Injectable()
export default class LoadingService {
    private loading: any;

    constructor(private loadingController: LoadingController) {}

    async presentLoading(mess) {
        this.loading = await this.loadingController.create({
            spinner: 'bubbles',
            message: mess,
            translucent: true,
            cssClass: 'secondary',
        });
        return await this.loading.present();
    }

    dismissLoading() {
        this.loading.dismiss();
    }
}
