import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { IProduct } from '../products/product.model';
import { getCurrentProduct } from '../state/productsngrx/productsngrx.selectors';
import { State } from '../state/productsngrx/productsngrx.state';
import * as ProductActions from '../state/productsngrx/productsngrx.action'
@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css']
})
export class ProductaddComponent implements OnInit {
  href:string='';
  addProduct!:FormGroup;
  title='Edit Product';
  product!:IProduct|null|undefined;
  product$!:Observable<IProduct |null | undefined>;

  constructor(private fb:FormBuilder,private router:Router,private store:Store<State>){}

  ngOnInit() {
    this.addProduct = this.fb.group({
      id:[],
      name:['',Validators.required],
      price:['',Validators.required],
      imageUrl:['',Validators.required],
      code:['',Validators.required],
      description:['',Validators.required],
      quantity:['',Validators.required]
    });

    this.product$ = this.store.select(getCurrentProduct).pipe(
      tap(currentProduct=>this.displayProduct(currentProduct))
    );
    this.product$.subscribe(resp=>this.product=resp);
    console.log('selected current product in ng onit add product ',this.product);
    this.addProduct.valueChanges.subscribe();
  }
  get id(){
    return this.addProduct.get("id");
  }

  get name(){
    return this.addProduct.get("name");
    }

  get price(){
    return this.addProduct.get("price");
      }
  get code(){
    return this.addProduct.get("code");
      }
      get imageUrl(){
        return this.addProduct.get("imageUrl");
          }
          get description(){
            return this.addProduct.get("description");
              }
    

  displayProduct(productParam:IProduct|null|undefined):void{
    this.product = productParam;
    if(this.product){
      this.addProduct.reset();
      if(this.product.id===0){
        this.title='Add Product';
  
      }
      else{
        this.title=`Edit Product: ${this.product.name}`;
      }
      this.addProduct.patchValue({
        id:this.product.id,
        name:this.product.name,
        imageUrl:this.product.imageUrl,
        price:this.product.price,
        code:this.product.code,
        description:this.product.description,
        quantity:this.product.quantity
      })

    }
  }

  saveProduct(originalProduct:IProduct):void{

    if(this.addProduct.valid){
      if(this.addProduct.dirty){
        const product={...originalProduct,...this.addProduct.value};
  
      if(product.id==0){
        // this.prodService.createProduct(product).subscribe(
        //   (resp)=>{
        //     this.prodService.changeSelectedProduct(resp);
        //     console.log(resp);},
  
        //   (err)=>this.errorMessage=err
        // );
        this.store.dispatch(ProductActions.createProduct({product}));
        window.alert("Product created");
        this.router.navigate([this.href,'product']);

  
     }
     else{

      console.log("new products"+JSON.stringify(product));
  
      this.store.dispatch(ProductActions.updateProduct({ product }));
      // this.prodService.updateProduct(product).subscribe(
      //  resp=>this.prodService.changeSelectedProduct(resp),
      //  err=>this.errorMessage=err      );
      window.alert("product updated");
      this.router.navigate([this.href,'product']);
  
     }
      }
  
      
    }
  
  }

}
