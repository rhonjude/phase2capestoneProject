import { Component, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { User } from '../login/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoggedIn:boolean=false;
  isAdmin:boolean=false;
  user!:User|null;
  uname!:string|null|undefined

  constructor(private renderer:Renderer2 ,private router:Router,private authservice:AuthService,private viewref:ViewContainerRef){
    console.log('menu constructor')
  
  
  }

  get userName():string{
    if(this.authservice.currentUser)
    return this.authservice.currentUser?.userName;
    
    return '';
    
    }

    ngOnInit(): void {
      console.log('menu on init');
      this.isLoggedIn=this.authservice.isLoggedIn;
      this.isAdmin = this.authservice.isAdmin();
       if(sessionStorage.getItem('isLogged')==='true'){
        this.isLoggedIn=true;
      } console.log(this.isLoggedIn, 'from init of menu ')
      this.user=this.authservice.currentUser;
      this.uname=this.user?.userName;
    }

    logOut():void{

      //this should also use the authserviceto logout the current user
      //you can route to some url
  
      this.authservice.logOut();
      this.router.navigate(['login']);
    }

    ngOnChanges():void{

      console.log('menu component changes');
      if(sessionStorage.getItem('isLogged')=='true'){
        this.isLoggedIn=true;
      }
    }

}
