import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FilterComponent} from '../filter/filter.component'
import {GlobalService} from '../shared/global.service'
import {TodayService} from  '../services/today.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import {ToastComponent} from '../toast/toast.component'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public loading = false;
  lastDialog:MatDialogRef<FilterComponent>
  masterTask=new Array()
  allTask=new Array()
  currentUser:string
  homeFrom:Date
  homeTo:Date
  homeLabels:any
  todayDate:Date
  allLabel=true
  allPrior=true
  homePriority=[false,false,false]
  constructor(private dialog:MatDialog,
    private global:GlobalService,private todayService:TodayService
    ,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.loading=true
    this.global.sharedMessage.subscribe(message => {
      this.currentUser= message;
      this.getTask()
    })

  }
  updateTask(id,status){
    this.loading=true
    this.todayService.updateTask(this.currentUser,id,parseInt(status)+1).subscribe(a=>{
        if(parseInt(status)==2){
          this.snack.openFromComponent(ToastComponent,{
            data:'Added to Archive!',duration:2000,panelClass:'center'
          })
        }
        this.firstTime()
    })
  }
  isOverdue(obj){
    if(new Date(obj) > new Date())
      return false
    return true
  }
  firstTime(){
    this.todayService.allTasks(this.currentUser).subscribe(a=>{
      this.masterTask=a
      this.applyFilter(null)
      //console.log(a)
  })
  }
  getTask(){
    this.loading=true
    this.todayService.allTasks(this.currentUser).subscribe(a=>{
        //this.allTask=a
        this.allTask=a
        this.masterTask=a
        this.applyFilter(null)
        this.loading=false
        //console.log(a)
    })
  }
  applyFilter(diagRef){
    this.loading=false
    if(diagRef==null)
      diagRef=this.lastDialog
    if(diagRef == null){
      this.allTask=this.masterTask
      return
    }
    let temp=new Array()
    for(var i in this.masterTask)
    {
        if((this.homeFrom == null || new Date(this.masterTask[i].due) >= new Date(this.homeFrom)) &&
        (this.homeTo==null || new Date(this.masterTask[i].due) <= new Date(this.homeTo))){
          var flag=0
          for(var j in diagRef.componentInstance.labels)
          {
              if(diagRef.componentInstance.labels[j].lab == this.masterTask[i].label &&
                diagRef.componentInstance.labels[j].index== true)
              {
                flag=1;
                break;
              }
          }
          if(diagRef.componentInstance.allLabel == true)
            flag=1
          if(flag==0)
            continue
          
          if(this.masterTask[i].priority == 'Low' && diagRef.componentInstance.priority[0]==true){
            flag=0
          }
          if(this.masterTask[i].priority == 'Normal' && diagRef.componentInstance.priority[1]==true){
            flag=0
          }
          if(this.masterTask[i].priority == 'High' && diagRef.componentInstance.priority[2]==true){
            flag=0
          }
          //console.log(diagRef.componentInstance.allPrior)
          if(flag==0 || diagRef.componentInstance.allPrior == true)
            temp.push(this.masterTask[i])
        }
          
    }
    this.allTask=temp
  }
  openFilter(){
    let diagRef=this.dialog.open(FilterComponent, {
      data:{
        'from':this.homeFrom,
        'to':this.homeTo,
        'label':this.homeLabels,
        'priority':this.homePriority,
        'allLabel':this.allLabel,
        'allPrior':this.allPrior
    },
      //height: '500px',
      width: '500px',
      autoFocus: false
    })
    this.lastDialog=diagRef
    diagRef.afterClosed().subscribe(()=>{
        if(diagRef.componentInstance.applyFilter == false)
          return
        this.homeFrom=diagRef.componentInstance.selectedMoments[0]
        this.homeTo=diagRef.componentInstance.selectedMoments[1]
        this.homeLabels=diagRef.componentInstance.labels
        this.homePriority=diagRef.componentInstance.priority
        this.allLabel=diagRef.componentInstance.allLabel
        this.allPrior=diagRef.componentInstance.allPrior
        this.applyFilter(diagRef)
        // console.log(from)
        // console.log(to)
        // for(var i in diagRef.componentInstance.labels)
        // {
        //     diagRef.componentInstance.labels[i].index
        // }
        // console.log(diagRef.componentInstance.priority[0])
        // console.log(diagRef.componentInstance.priority[1])
        // console.log(diagRef.componentInstance.priority[2])
        
    })
  }

}
