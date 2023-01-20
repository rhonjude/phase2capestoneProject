import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct } from '../products/product.model';
import { CartService } from '../shared/cart.service';
import { ProductService } from '../shared/product.service';
import { getCurrentProduct } from '../state/productsngrx/productsngrx.selectors';
import { State } from '../state/productsngrx/productsngrx.state';

@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.css']
})
export class ProductviewComponent implements OnInit {
  cartadd:number=0;
  href:string='';
  products$!:Observable<IProduct[]>;
  product!:IProduct | null | undefined;
  selectedProduct$!:Observable<IProduct|null|undefined>;
  

  
  constructor(private productservice:ProductService,private router:Router,private store:Store<State>,private cartservice:CartService){}
  ngOnInit(): void {

    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.selectedProduct$.subscribe(resp=>this.product=resp);
    console.log(this.product);


    
  }

  addToCart(p:IProduct){
    console.log("product going to cart"+JSON.stringify(p));
 this.cartservice.addtoCart(p);
   window.alert(`${p.name} added to cart`);
  }
}
