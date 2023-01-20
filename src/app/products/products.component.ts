import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { ProductService } from '../shared/product.service';
import { getCurrentProduct, getError, getProducts } from '../state/productsngrx/productsngrx.selectors';
import { State } from '../state/productsngrx/productsngrx.state';
import { IProduct } from './product.model';
import * as ProductActions from '../state/productsngrx/productsngrx.action';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({providedIn:'root'})

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  href:string='';
  products$!:Observable<IProduct[]>;
  errorMessage$!:Observable<string>;
  selectedProduct$!:Observable<any>;
  elementData:IProduct[]=[];
  filteredProducts:IProduct[]=[];
  imageWidth:number=100;
  imageHeight:number=100;
  displayedColumns:string[]=['id','name','code','description',]

  // dataSource = new MatTableDataSource(this.products$);

  constructor(private store:Store<State>,private router:Router,private http:HttpClient){}
  ngOnInit(): void {
    this.href=this.router.url;
   this.products$ = this.store.select(getProducts);
   console.log(this.products$);
   this.products$.subscribe(resp=>this.filteredProducts=resp);
   this.store.dispatch(ProductActions.loadProducts());
   this.errorMessage$ = this.store.select(getError);
   this.selectedProduct$ = this.store.select(getCurrentProduct);

   
   
  }



  onEdit(prod:IProduct){
    this.store.dispatch(ProductActions.setCurrentProduct({currentProductId:prod.id}))
    this.router.navigate([this.href,'addprod']);
  }

  newProduct():void{
    console.log('in new product');
    // this.prodservice.changeSelectedProduct(this.prodservice.newProduct());
    // console.log('back to newProduct from service');
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  
    this.router.navigate([this.href,'addprod']);
  }

  deleteProd(prod:IProduct):void{
    if(prod && prod.id){

      if(confirm(`Are you sure you want to delete ${prod.name} details`)){


        this.store.dispatch(ProductActions.deleteProduct({ productId: prod.id }));

        // this.productService.deleteProduct(prod.id).subscribe(
        //   resp=>this.productService.changeSelectedProduct(null),
        //   err=>this.errorMessage=err
        // );
      }
      else{
// No need to delete, it was never saved
this.store.dispatch(ProductActions.clearCurrentProduct());

     // this.productService.changeSelectedProduct(null)
      }
    }

  }

}
