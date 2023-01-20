import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterState } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { IProduct } from '../products/product.model';
import { ProductService } from '../shared/product.service';
import { getCurrentProduct, getError, getProducts } from '../state/productsngrx/productsngrx.selectors';
import { State } from '../state/productsngrx/productsngrx.state';
import * as ProductActions from '../state/productsngrx/productsngrx.action';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit,OnDestroy {

  href:string='';
  products$!:Observable<IProduct[]>;
  selectedProduct$!:Observable<any>;
  errorMessage$!: Observable<string>;
  id:number=0;
  filteredProducts:IProduct[]=[];
 

  constructor(private router:Router,private store:Store<State>){}

  ngOnInit(): void {


    this.products$=this.store.select(getProducts);
    console.log(this.products$);
    this.products$.subscribe(resp=>this.filteredProducts=resp);
    this.store.dispatch(ProductActions.loadProducts());
    this.errorMessage$ = this.store.select(getError);
    this.selectedProduct$ = this.store.select(getCurrentProduct);

  
 
  }

  ngOnDestroy(): void {

  }

  prodDetails(product:IProduct){
    this.id=product.id
    this.store.dispatch(ProductActions.setCurrentProduct({currentProductId:this.id}));
    this.router.navigate([this.href,'prodview']);

  }
  
  }


