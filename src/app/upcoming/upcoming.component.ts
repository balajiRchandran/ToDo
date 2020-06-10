import { Component, OnInit } from '@angular/core';
import {Task} from '../shared/Task'
import {GlobalService} from '../shared/global.service'
import {TodayService} from  '../services/today.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import {ToastComponent} from '../toast/toast.component'
@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {
  allTask:any
  loading:boolean
  currentUser:string
  constructor(private global:GlobalService,private todayService:TodayService
    ,private snack:MatSnackBar) { }

  updateTask(id,status){
    this.loading=true
      this.todayService.updateTask(this.currentUser,id,parseInt(status)+1).subscribe(a=>{
        this.loading=false
          if(parseInt(status)==2){
            this.snack.openFromComponent(ToastComponent,{
              data:'Added to Archive!',duration:2000,panelClass:'center'
            })
          }
          this.getTask()
      })
    }
  getTask(){
    this.loading=true
    this.allTask=new Array()
    this.todayService.upcomingTask(this.currentUser).subscribe(a=>{
      this.loading=false
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
        //console.log(this.allTask)
      }
      
    })
  }
  ngOnInit(): void {
    this.loading=true
    this.global.sharedMessage.subscribe(message => {
      this.currentUser= message;
      this.getTask()
    })
  }

}
