import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";

import { User } from "./user";

@Injectable({
    providedIn:'root'
})
export class AuthService{
    url='/api/users';
    currentUser!:User |null;
    redirectToUrl!:string;
    users:User[]=[];
    foundIndex!:number;
    isValid:boolean=false;
    isLoggedIn:boolean=false;
    constructor(private http:HttpClient){}

    fetchAllUsers():Observable<User[]>{
        return this.http.get<User[]>(this.url).pipe(
            tap(data=>{
                this.users=data;
                console.log("inside fetch"+JSON.stringify(this.users))
            }),
            catchError(this.errorHandler)
        )
    }

    validateUser(user:any,users:User[]):boolean{

        console.log('validating theuser',user)
        user={...user};
        this.foundIndex=this.users.findIndex(u=>(u.userName==user.userName && u.password == user.password));
        /*{if(user.userName==u.userName)
          {
             if( user.password == u.password){
              console.log('user found',this.foundIndex);
            }
              else{
                console.log('password not correct')
              }
            }
              else
              {
             console.log('userName not found')
              }
              })
  */
        console.log('found index ',this.foundIndex)
        if(this.foundIndex > -1){
  
          this.currentUser=this.users[this.foundIndex];
          console.log('found the user ',this.users[this.foundIndex])
          sessionStorage.setItem('loggedInUser',JSON.stringify(this.currentUser));
         this.isValid=true;
         this.isLoggedIn=true;
         sessionStorage.setItem('isLogged','true');
  
          return true;
        }
      return false;
  
  
  
  
      }

      logOut():void{
        sessionStorage.removeItem('loggedInUser');
          this.currentUser=null;
          this.isLoggedIn=false;
          sessionStorage.removeItem('isLogged');
          console.log("logged out");
      }

      isAdmin():boolean{
        console.log(this.currentUser)
          if(this.currentUser){
          console.log("is Admin"+this.currentUser.isAdmin);
          return this.currentUser?.isAdmin;
          }
          return false;
      }
      isUser():boolean{
        if(this.currentUser){
          return true;
        }
        return false
      }

      errorHandler=(err:any)=>{

        let errorMessage:string;
        //a client side error or network error then ErrorEvent object will be thrown
    
        if(err.error instanceof ErrorEvent)
          {
    
            errorMessage = `An error has occured ${err.error.message}`
          }
          else{
    
           errorMessage =  `Backend error code ${err.status} ${err.body.error}`;
    
          }
          console.log(err);
          return throwError(errorMessage);
    
    
       }
}