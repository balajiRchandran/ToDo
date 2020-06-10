import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalstorageService} from '../services/localstorage.service'
import {GlobalService} from '../shared/global.service'
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private location:Location,
    private global:GlobalService,
    private router:Router,
    private local:LocalstorageService) { 
      //this.location.replaceState('/a');
    }
  logout(){
    this.local.remove('token')
    this.router.navigate(['/Auth'], { replaceUrl: true })
  }
  ngOnInit(): void {
  }

}
