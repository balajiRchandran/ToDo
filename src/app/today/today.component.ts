import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {TodayService} from '../services/today.service'
import {Task} from '../shared/Task'
import {GlobalService} from '../shared/global.service'
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  todayTask=new Array<Task>()
  overdueTask=new Array<Task>()
  currentUser:string
  constructor(private global:GlobalService,private todayService:TodayService
    ,private snack:MatSnackBar) { }

  updateTask(id,status){
    this.todayService.updateTask(this.currentUser,id,parseInt(status)+1).subscribe(a=>{
        if(parseInt(status)==2){
          this.snack.open("Bravo! Task added to Archive!","",{duration:2000,panelClass: 'center',})
        }
        this.getTask()
    })
  }
  getTask(){
    //console.log("Success")
    this.todayTask=new Array()
    this.overdueTask=new Array()
    this.todayService.todayTask(this.currentUser).subscribe(a => {
      var cur=new Date()
      var hh=cur.getHours()
      var mm=cur.getMinutes()
      //console.log(a)
      for(var i in a)
      {
        var singleDate=new Date(a[i].due)
        if(singleDate.getHours() > hh || (singleDate.getHours()==hh && singleDate.getMinutes()>=mm))
          this.todayTask.push(a[i])
        else
          this.overdueTask.push(a[i])
      }
      this.global.nextCount(this.todayTask.length+this.overdueTask.length)
    })
  }
  ngOnInit(): void {
    this.global.sharedMessage.subscribe(message => {
      this.currentUser= message;
      this.getTask()
    })
  }
}
