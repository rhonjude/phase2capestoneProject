import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  
  state:string[]=['Andhra Pradesh','Arunachal Pradesh','Kerala','Tamil Nadu','Goa','Gujarat','Haryana','Maharashtra'];
  contactus!:FormGroup;
  constructor(private fb:FormBuilder,private router:Router){}
ngOnInit(){
  this.contactus = this.fb.group({
    email:[],
    address:['',Validators.required],
    city:['',Validators.required],
    state:['',Validators.required],
    zip:['',Validators.required]

  });
}

  onsubmit(){
    window.alert("Contact submitted successfuly");
    this.contactus.reset();


  }
}
