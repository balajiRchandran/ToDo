import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {JwttokenService} from '../services/jwttoken.service'
@Injectable()
export class GlobalService {

  private message = new BehaviorSubject('');
  private todayCount= new BehaviorSubject(0)
  sharedMessage = this.message.asObservable();
  sharedCount = this.todayCount.asObservable();
  constructor(private jwt:JwttokenService) {
    var user=jwt.getUser()
    console.log(user)
    if(user != null)
      this.message=new BehaviorSubject(user)
      this.sharedMessage=this.message.asObservable()
   }

  nextMessage(message: string) {
    this.message.next(message)
  }
  nextCount(c:number){
    this.todayCount.next(c)
  }
}