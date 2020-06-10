import { Component, OnInit,Inject } from '@angular/core';
import {AddtaskService} from '../services/addtask.service'
import {GlobalService} from '../shared/global.service'
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private addTaskService:AddtaskService,
    private global:GlobalService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.selectedMoments=[data.from,data.to]
      this.priority=data.priority
      this.homeLabel=data.label
      this.applyFilter=false
      this.allLabel=data.allLabel
      this.allPrior=data.allPrior
     }
  allPrior=false
  allLabel=false
  applyFilter:boolean
  todayDate:Date
  homeLabel:any
  currentUser:string
  labels=new Array()
  priority=[false,false,false]
  selectedMoments = [null,null]
  changeVar(){
    this.applyFilter=true
  }
  ngOnInit(): void {
    //console.log(this.homeLabel != undefined)
    this.global.sharedMessage.subscribe(message => {
      this.currentUser= message
      this.addTaskService.getLabel(message).subscribe(a=>{
        var tempBool=false
        var soln=0
        for(var sin in a)
        {
            tempBool=false;
            if(this.homeLabel != undefined && this.homeLabel[soln].lab == a[sin]){
                tempBool=this.homeLabel[soln].index
                soln++
            }
            this.labels.push({
              lab:a[sin],
              index:tempBool
            })
        }
        //console.log(a)
      })
    })
  }

}
