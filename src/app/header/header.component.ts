import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AddtaskComponent} from '../addtask/addtask.component';
import {GlobalService} from '../shared/global.service'
import {TodayComponent} from '../today/today.component'
import {UpcomingComponent} from '../upcoming/upcoming.component'
import {TodayService} from '../services/today.service'
import {AddtaskService} from '../services/addtask.service'
import {LogoutComponent} from '../logout/logout.component'
import {JwttokenService} from '../services/jwttoken.service'
import {HomeComponent} from '../home/home.component'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  todayChild:any
  checkLabel:boolean
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
    private jwt:JwttokenService,
    private addtaskService:AddtaskService,
    private todayService:TodayService,
    private global:GlobalService,
    private fb:FormBuilder,
    public dialog:MatDialog) { 
    this.createForm();
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      //this.location.replaceState('/a');
    this.screenWidth = window.innerWidth;
  };
  }
  createForm(){
    this.searchForm = this.fb.group({
      text:''
    });
    this.labelForm=this.fb.group({label:""})
  }
  confirmLogout(){
    this.dialog.open(LogoutComponent)
  }
  addLabel(){
    this.checkLabel=true
    console.log(this.labelForm.value)
    if(this.labelForm.value.label != ""){
        this.addtaskService.addLabel(this.currentUser,this.labelForm.value.label).subscribe(()=>{
          this.checkLabel=false
          this.labelForm.reset({
            label:''
          })
        })
    }
  }
  addTask(){
    let dialogRef=this.dialog.open(AddtaskComponent,{height:'500px'})
    dialogRef.afterClosed().subscribe(()=>{
      if(this.todayChild instanceof TodayComponent || this.todayChild instanceof UpcomingComponent
        || this.todayChild instanceof HomeComponent)
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
    console.log(this.jwt.getUser())
    this.global.sharedMessage.subscribe(message => {
      this.currentUser= message
      //console.log("msg"+message)
      this.updateCount()
    })
    this.global.sharedCount.subscribe(c=>{
      this.count=c;
    })
  }

}
