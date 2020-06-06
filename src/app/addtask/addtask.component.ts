import { Component, OnInit ,ViewChild, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {AddtaskService} from '../services/addtask.service'
import {GlobalService} from '../shared/global.service'
import {MatStepper} from '@angular/material/stepper'
import {MatDialogRef} from '@angular/material/dialog'
import { EventEmitter } from 'events';
@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css'],
  
})
export class AddtaskComponent implements OnInit {
  refreshNeeded=new EventEmitter()
  @ViewChild('stepper') private myStepper:MatStepper;
  taskForm:FormGroup
  dueForm:FormGroup
  thirdForm:FormGroup
  currentUser:string
  process:boolean=false
  selected:String
  labels:string[]
  priority=["Low","Normal","High"]
  startDate = new Date();
  constructor(private fb:FormBuilder,
    private global:GlobalService,
    private addTaskService:AddtaskService,
    private dialogRef:MatDialogRef<AddtaskComponent>) {
    this.createForm();
    dialogRef.disableClose = true;
   }
   createForm(){
     this.taskForm=this.fb.group({
       task:''
     })
     this.dueForm=this.fb.group({
       due:''
     })
     this.thirdForm=this.fb.group({
      label:'',
      priority:''
     })
   }
   addTask(){
      this.process=true
      console.log(this.taskForm.value.task)
      console.log(this.dueForm.value.due)
      console.log(this.thirdForm.value.label)
      console.log(this.thirdForm.value.priority)
      if(this.thirdForm.value.label=="")
        this.thirdForm.value.label="General"
      if(this.thirdForm.value.priority=="")
        this.thirdForm.value.priority="Normal"
      this.addTaskService.addTask(this.currentUser,this.taskForm.value.task,this.dueForm.value.due,
        this.thirdForm.value.label,this.thirdForm.value.priority).subscribe(a => {
          this.refreshNeeded.emit(null);
          this.process=false
          this.myStepper.next();
          this.taskForm.reset({
            task:''
          })
          this.dueForm.reset({due:''})
          this.thirdForm.reset({label:'',priority:''})
          setTimeout(() => {this.dialogRef.close()},2000)
          
        })
   }
  ngOnInit(): void {
    this.global.sharedMessage.subscribe(message => {
      this.currentUser= message
      this.addTaskService.getLabel(message).subscribe(a=>{
        this.labels=a
      })
    })
  }

}
