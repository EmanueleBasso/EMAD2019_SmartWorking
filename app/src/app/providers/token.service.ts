import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FCM } from '@ionic-native/fcm/ngx';

@Injectable()
export default class TokenService {
    constructor(private fcm: FCM, private http: HttpClient) {}

    saveToken(uid: string): any {
        return this.fcm.getToken().then(token => {
            const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/saveToken';

            return this.http.get(url + '?uid=' + uid + '&token=' + token).toPromise().then(response => {
                const hasError = response['hasError'];

                this.initialize();

                if (hasError) {
                    return false;
                } else {
                    localStorage.setItem('token', token);
                    return true;
                }
            });
        });
    }

    deleteToken(uid: string): any {
        const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/deleteToken';

        this.http.get(url + '?uid=' + uid).toPromise().then(response => {
            const hasError = response['hasError'];

            if (hasError) {
                return false;
            } else {
                return true;
            }
        });
    }

    initialize() {
        this.fcm.onTokenRefresh().subscribe(token => {
            const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/saveToken';

            const uid = localStorage.getItem('uid');

            this.http.get(url + '?uid=' + uid + '&token=' + token).subscribe(response => {
                const hasError = response['hasError'];

                if (hasError) {
                    return false;
                } else {
                    localStorage.setItem('token', token);
                    return true;
                }
            });
        });

        this.fcm.onNotification().subscribe(data => {
            cordova.plugins['notification'].local.schedule({
                title: 'Il team Smart Working',
                text: 'Ciao, volevamo ricordarti che domani lavorerai da casa.',
            });
        });
    }
}
