import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../products/product.model';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent implements OnInit,OnChanges {
  pageTitle:string='Shopping cart';
  imageWidth:number=100;
  imageHeight:number=100;
  qty:number=0;
  public products:IProduct[]=[];
  public grandTotal!:number;
  isCartEmpty:boolean=false;
  selectedProduct!:IProduct | null;
  constructor(private cartService : CartService,private router:Router) { }

  ngOnInit(): void {

    this.cartService.getProds().subscribe(response=>{
     this.products = response;
     this.grandTotal = this.cartService.getTotalPrice();
     this.isCartEmpty=this.cartService.cartEmpty;

   })
  }
  ngOnChanges(){
 
  }

  
  
   
  emptyCart(){

    this.cartService.emptyCart();
    this.isCartEmpty=this.cartService.cartEmpty;

  }
  deleteItem(p:IProduct){
    this.cartService.removeCartItem(p);
    this.isCartEmpty=this.cartService.cartEmpty;

  }

  onPay(){
    this.router.navigate(['checkout']);
  }

}
