import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwttokenService} from './services/jwttoken.service';
import { LocalstorageService } from './services/localstorage.service';
import {LoginService} from './services/login.service'
import {Router} from '@angular/router';
import {GlobalService} from './shared/global.service'
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.jwtService.getUser()) {
        //console.log(this.jwtService.getUser())
        //localStorage.removeItem("token")
        console.log("1")
        if (this.jwtService.isTokenExpired()) {
            this.router.navigate(['/Auth'], { replaceUrl: true })
            return false
        } else {
          //this.global.nextMessage(this.jwtService.getUser())
          //this.router.navigateByUrl('/')
          return true;
        }
      }
      else if(this.authStorageService.get('token') != null)
        return true
      this.router.navigate(['/Auth'], { replaceUrl: true })
      return false
     
  }

  constructor(private global:GlobalService,
    private loginService: LoginService,
    private authStorageService: LocalstorageService,
    private jwtService: JwttokenService,
    private router:Router) {}
}