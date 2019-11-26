import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import TokenService from '../providers/token.service';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable()
export default class AuthService {
  constructor(private tokenService: TokenService, private http: HttpClient) {}

  login(email: string, password: string): any {
    return firebase.auth().signInWithEmailAndPassword(email, password).then( (userCredential: any) => {
      const uid = userCredential.user.uid;

      localStorage.setItem('uid', uid);

      return this.tokenService.saveToken(uid).then( () => {
        const url = 'https://europe-west1-smart-working-5f3ea.cloudfunctions.net/isManager';

        return this.http.get(url + '?uid=' + uid).toPromise().then(response => {
          const hasError = response['hasError'];

          if (hasError) {
              return false;
          } else {
              const isManager = response['isManager'];

              const nodeList = document.querySelectorAll('.onlyManager') as NodeListOf<HTMLElement>;

              if (isManager === false) {
                for (let i = 0; i < nodeList.length; i = i + 1) {
                  const node = nodeList.item(i);
                  node.style.display = 'none';
                }
              } else {
                for (let i = 0; i < nodeList.length; i = i + 1) {
                  const node = nodeList.item(i);
                  node.style.display = 'inline';
                }
              }

              localStorage.setItem('isManager', isManager);
              return true;
          }
        });
      });
    }).catch( (error) => {
      return false;
    });
  }

  logout(): any {
    return firebase.auth().signOut().then( () => {
      const uid = localStorage.getItem('uid');
      localStorage.removeItem('uid');
      localStorage.removeItem('isManager');

      return this.tokenService.deleteToken(uid);
    });
  }
}
