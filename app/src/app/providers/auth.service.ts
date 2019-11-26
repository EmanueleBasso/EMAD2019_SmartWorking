import { Injectable } from '@angular/core';

import TokenService from '../providers/token.service';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable()
export default class AuthService {
  constructor(private tokenService: TokenService) {}

  login(email: string, password: string): any {
    return firebase.auth().signInWithEmailAndPassword(email, password).then( (userCredential: any) => {
      const uid = userCredential.user.uid;

      localStorage.setItem('uid', uid);

      return this.tokenService.saveToken(uid);
    }).catch( (error) => {
      return false;
    });
  }

  logout(): any {
    return firebase.auth().signOut().then( () => {
      const uid = localStorage.getItem('uid');
      localStorage.removeItem('uid');

      return this.tokenService.deleteToken(uid);
    });
  }
}
