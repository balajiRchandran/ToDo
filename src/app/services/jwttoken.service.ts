import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {LocalstorageService} from './localstorage.service'
@Injectable({
  providedIn: 'root'
})
export class JwttokenService {

    jwtToken: string;
    decodedToken: { [key: string]: string };
 
    constructor(private localStorage:LocalstorageService) {
      if(localStorage.get("token"))
      {
        this.setToken(localStorage.get("token"))
      }
    }
 
    setToken(token: string) {
      if (token) {
        this.jwtToken = token;
      }
    }
 
    decodeToken() {
      if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
      }
    }
 
    getDecodeToken() {
      return jwt_decode(this.jwtToken);
    }
 
    getUser() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.username: null;
    }

    getExpiryTime() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.exp : null;
    }
 
    isTokenExpired(): boolean {
      const expiryTime: number = parseInt(this.getExpiryTime());
      if (expiryTime) {
        return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
      } else {
        return false;
      }
    }
}
