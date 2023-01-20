import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(private router:Router,private cartservice:CartService){}

  onPayment(){
    window.alert("Product Purchased successfuly");
    this.cartservice.emptyCart();
    this.router.navigate(['']);
  }

}
