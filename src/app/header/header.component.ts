import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AddtaskComponent} from '../addtask/addtask.component';
import {GlobalService} from '../shared/global.service'
import {TodayComponent} from '../today/today.component'
import {UpcomingComponent} from '../upcoming/upcoming.component'
import {TodayService} from '../services/today.service'
import {AddtaskService} from '../services/addtask.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  todayChild:any
  count:number
  screenWidth: number;
  onActivate(comp){
    //console.log(comp)
    this.todayChild=comp
  }
  labelForm: FormGroup;
  searchForm : FormGroup;
  currentUser:string
  constructor(
    private addtaskService:AddtaskService,
    private todayService:TodayService,
    private global:GlobalService,
    private fb:FormBuilder,
    public dialog:MatDialog) { 
    this.createForm();
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
    this.screenWidth = window.innerWidth;
  };
  }
  createForm(){
    this.searchForm = this.fb.group({
      text:''
    });
    this.labelForm=this.fb.group({label:""})
  }
  addLabel(){
    console.log(this.labelForm.value)
    if(this.labelForm.value.label != ""){
        this.addtaskService.addLabel(this.currentUser,this.labelForm.value.label).subscribe(()=>{
          this.labelForm.reset({
            label:''
          })
        })
    }
  }
  addTask(){
    let dialogRef=this.dialog.open(AddtaskComponent)
    dialogRef.afterClosed().subscribe(()=>{
      if(this.todayChild instanceof TodayComponent || this.todayChild instanceof UpcomingComponent)
        this.todayChild.getTask()
      this.updateCount()
    })
  }
  onSearch(){

  }
  updateCount(){
    this.todayService.todayTask(this.currentUser).subscribe(a => {
      //console.log(a.length)
      this.count=a.length
    })
  }
  ngOnInit(): void {
    this.global.sharedMessage.subscribe(message => {
      this.currentUser= message
      this.updateCount()
    })
    this.global.sharedCount.subscribe(c=>{
      this.count=c;
    })
  }

}
