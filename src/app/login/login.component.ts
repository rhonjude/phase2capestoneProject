import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  users:User[]=[];

  constructor(private authService:AuthService,private router:Router) { }
  ngOnInit(): void {

    this.authService.fetchAllUsers().subscribe(data=>this.users=data);
    console.log("Users : "+JSON.stringify(this.users));
  }

  cancel():void{

    this.router.navigate(['welcome']);
  }

  onSubmit(loginForm:NgForm){
    if(loginForm && loginForm.valid){
      const userName = loginForm.form.value.username;
      const password=loginForm.form.value.password;
   //this user is logged in
      this.authService.validateUser({userName,password},this.users);
console.log('after login  ')
      if(this.authService.redirectToUrl){
        this.router.navigateByUrl(this.authService.redirectToUrl);
      }
      else{
        this.router.navigate(['']);
      }



    }

  }


}
