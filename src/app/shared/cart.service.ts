import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IProduct } from "../products/product.model";

@Injectable({

    providedIn: 'root'

})
export class CartService{
    cart: IProduct[]=[];
    cartEmpty:boolean=true;

    private prodList = new BehaviorSubject<IProduct[]>([]);
    
    constructor(private http:HttpClient){}

    getProds(){
        return this.prodList.asObservable();
    }

    setProds(prod:IProduct[]){
        this.cart.push(...prod);

        this.prodList.next(prod);
    }

   

    addtoCart(prod:IProduct){
        let added = false;

        for (let p of this.cart) {
            if(p.id==prod.id){
                let obj = {...p};
            obj.quantity=obj.quantity+1;
           let index= this.cart.indexOf(p);
           this.cart[index]=obj;
              added=true;

            }
            
            
            // if (p.id === prod.id) {
            //     let a = p.quantity+1
            //     this.cart.map(element=>element.id === prod.id ? {...element ,qty:a} : element); 
            //     console.log(p.quantity);
            //     added = true;
            //     break;
            // }
          }

          if (!added) {
            let obj2 = {...prod};
            obj2.quantity=1;
            this.cart.push(obj2);
            this.cartEmpty=false;
          }
       
            

        
        

        this.prodList.next(this.cart);
        console.log("Inside cart:"+JSON.stringify(this.cart));
      

    }
  


    removeCartItem(prod:IProduct){

        this.cart.map((a:IProduct, index:any)=>{
  
          if(prod.id===a.id){
  
            this.cart.splice(index,1);
  
          }
  
        })
  
        this.prodList.next(this.cart);
        if(!this.cart){
          this.cartEmpty=true
        }
  
      }

      emptyCart(){

        this.cart=[];
  
        this.prodList.next(this.cart);
        this.cartEmpty=true;
  
      }

      getTotalPrice():number{

        let grandTotal=0;
  
        this.cart.map((c:IProduct)=>{
  
          grandTotal+=c.price*c.quantity;
  
        })
  
        return grandTotal;
  
      }
}