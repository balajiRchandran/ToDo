import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {TodayService} from '../services/today.service'
import {Task} from '../shared/Task'
import {GlobalService} from '../shared/global.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup,FormBuilder } from '@angular/forms';
import {ToastComponent} from '../toast/toast.component'
@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  public loading:boolean
  todayTask=new Array<Task>()
  filterForm:FormGroup
  overdueTask=new Array<Task>()
  currentUser:string
  constructor(private fb:FormBuilder,
    private global:GlobalService,private todayService:TodayService
    ,private snack:MatSnackBar) { 
      this.createForm()
    }
    createForm(){
      
    }
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
    //console.log("Success")
    this.todayTask=new Array()
    this.overdueTask=new Array()
    this.todayService.todayTask(this.currentUser).subscribe(a => {
      this.loading=false
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
    this.loading=true
    this.global.sharedMessage.subscribe(message => {
      this.currentUser= message;
      this.getTask()
    })
  }
}
