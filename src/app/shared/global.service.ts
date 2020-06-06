import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GlobalService {

  private message = new BehaviorSubject('');
  private todayCount= new BehaviorSubject(0)
  sharedMessage = this.message.asObservable();
  sharedCount = this.todayCount.asObservable();
  constructor() { }

  nextMessage(message: string) {
    this.message.next(message)
  }
  nextCount(c:number){
    this.todayCount.next(c)
  }
}