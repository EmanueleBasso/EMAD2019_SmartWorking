import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable()
export default class AuthService {
  login(email: string, password: string): any {
    return firebase.auth().signInWithEmailAndPassword(email, password).then( (userCredential: any) => {
      let uid = userCredential.user.uid;

      localStorage.setItem('uid', uid);

      return true;
    }).catch( (error) => {
      return false;
    });
  }

  logout(): any {
    return firebase.auth().signOut().then( () => {
      localStorage.removeItem('uid');
    });
  }
}
