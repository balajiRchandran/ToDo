import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginService} from '../services/login.service'
import {GlobalService} from '../shared/global.service'
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  errMess:any;
  registerForm : FormGroup;
  constructor(private router:Router,
    private global:GlobalService,
    private fb:FormBuilder,
    private loginService:LoginService) { 
    this.createForm();
  }
  loginError=""
  registerError=""
  createForm(){
    this.loginForm = this.fb.group({
      username : '',
      password: '',
    });
    this.registerForm = this.fb.group({
      username:'',
      name:'',
      password:''
    })
  }
  onLogin(){
    this.loginService.checkUsers(this.loginForm.value.username,this.loginForm.value.password).subscribe(a => {
      if(a.msg=="Success"){
        this.loginError=""
        this.global.nextMessage(this.loginForm.value.username)
        this.loginForm.reset({
          username:'',
          password:''
        })
        this.router.navigateByUrl('/Today')
      }
      else
        this.loginError=a.msg;
      },
      errmess => console.log(errmess));
  }
  onRegister(){
    this.loginService.addUser(this.registerForm.value.username,this.registerForm.value.name,this.registerForm.value.password).subscribe(a => {
      if(a.msg=="Success"){
        this.registerError=""
        this.loginForm.reset({
          username:'',
          name:'',
          password:''
        })
      }
      else
        this.registerError=a.msg;
      },
      errmess => console.log(errmess));
  }

  ngOnInit(): void {
   
  }

}
