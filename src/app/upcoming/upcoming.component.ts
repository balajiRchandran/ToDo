import { Component, OnInit } from '@angular/core';
import {Task} from '../shared/Task'
import {GlobalService} from '../shared/global.service'
import {TodayService} from  '../services/today.service'
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {
  allTask:any
  currentUser:string
  constructor(private global:GlobalService,private todayService:TodayService
    ,private snack:MatSnackBar) { }

  updateTask(id,status){
      this.todayService.updateTask(this.currentUser,id,parseInt(status)+1).subscribe(a=>{
          if(parseInt(status)==2){
            this.snack.open("Bravo! Task added to Archive!","",{duration:2000,panelClass:'center'})
          }
          this.getTask()
      })
    }
  getTask(){
    this.allTask=new Array()
    this.todayService.upcomingTask(this.currentUser).subscribe(a=>{
      if(a.length > 0){
        var pre=new Date(a[0].due)
        this.allTask[0]=new Array()
        for(var i in a)
        {
            var cur=new Date(a[i].due)
            if(pre.getDate()===cur.getDate() && pre.getMonth()===cur.getMonth() &&
              pre.getFullYear() === cur.getFullYear()){
                  this.allTask[this.allTask.length-1].push(a[i])
            }
            else{
              this.allTask[this.allTask.length]=new Array()
              this.allTask[this.allTask.length-1].push(a[i])
            }
            pre=new Date(a[i].due)
        }
        console.log(this.allTask)
      }
      
    })
  }
  ngOnInit(): void {
    this.global.sharedMessage.subscribe(message => {
      this.currentUser= message;
      this.getTask()
    })
  }

}
