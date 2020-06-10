import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginService} from '../services/login.service'
import {GlobalService} from '../shared/global.service'
import {Router} from '@angular/router';
import {LocalstorageService} from '../services/localstorage.service'
import {JwttokenService} from  '../services/jwttoken.service'
import { IfStmt } from '@angular/compiler';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  btnClicked=false
  loginForm : FormGroup;
  errMess:any;
  loginBool:boolean
  regBool:boolean
  registerForm : FormGroup;
  constructor(private jwt:JwttokenService,
    private localStorage:LocalstorageService,
    private router:Router,
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
    this.btnClicked=true
    this.loginService.checkUsers(this.loginForm.value.username,this.loginForm.value.password).subscribe(a => {
      this.btnClicked=false
      if(a.msg=="Success"){
        this.loginError=""
        this.global.nextMessage(this.loginForm.value.username)
        this.localStorage.set('token',a.token)
        this.router.navigateByUrl('/')
        this.loginForm.reset({
          username:'',
          password:''
        })
      }
      else{
        this.loginBool=false
        this.loginError=a.msg
      }
      },
      errmess => this.loginBool=false);
  }
  onRegister(){
    this.btnClicked=true
    this.loginService.addUser(this.registerForm.value.username,this.registerForm.value.name,this.registerForm.value.password).subscribe(a => {
      this.btnClicked=false
      if(a.msg=="Success"){
        this.registerError=""
        this.global.nextMessage(this.registerForm.value.username)
        this.localStorage.set('token',a.token)
        this.router.navigateByUrl('/')
        this.registerForm.reset({
          username:'',
          password:''
        })
      }
      else
        this.registerError=a.msg;
      },
      errmess => console.log(errmess));
  }

  ngOnInit(): void {
    if(this.localStorage.get('token') != null)
      this.router.navigateByUrl('/')
    //console.log(this.jwt.getUser())
  }

}
