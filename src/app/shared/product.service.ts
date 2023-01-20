import { Injectable } from "@angular/core";
import { IProduct } from "../products/product.model";
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { deleteProduct } from "../state/productsngrx/productsngrx.action";
@Injectable({
    providedIn:'root'
})
export class ProductService{
    url:string='/api/products/';
    products:IProduct[]=[];

    private selectedProductSource = new BehaviorSubject<IProduct|null>(null);
    selectedProductChange$=this.selectedProductSource.asObservable();
    constructor(private http:HttpClient){}

    getProducts():Observable<IProduct[]>{
        console.log("inside get products");

        return this.http.get<IProduct[]>(this.url).pipe(
            tap(data=>{console.log(data);
                this.products=data;
            }),
            catchError(this.errorHandler)
        )

    }

    errorHandler=(err:any)=>{
        let errorMessage:string;
        if(err.error instanceof ErrorEvent)
        {
          errorMessage = `An error has occured ${err.error.message}`;
        }
        else{
          errorMessage =  `Backend error code ${err.status} ${err.body.error}`;
        }
        console.log(err);
       return throwError(errorMessage);
      }
  
      changeSelectedProduct(selectedProduct:IProduct|null):void{
        console.log("in changeSelected"+JSON.stringify(selectedProduct));
        this.selectedProductSource.next(selectedProduct);
      }

      newProduct():IProduct{
        return{
            id:0,
            name:'',
            code:'',
            description:'',
            price:0,
            imageUrl:'',
            quantity:0
        };
      }

      createProduct(product:IProduct):Observable<IProduct>{
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        const newProduct={...product,id:null,quantity:0};
        console.log("inside createProduct");
        return this.http.post<IProduct>(this.url,newProduct,{headers}).pipe(
            tap(data=>{
                this.products.push(data);
                console.log("New Obj:"+data);
            },
            catchError(this.errorHandler)
            )
        )
      }

      updateProduct(product:IProduct):Observable<IProduct>{
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        const url = `${this.url}/${product.id}`;
        return this.http.put<IProduct>(url,product,{headers}).pipe(
            tap(()=>{console.log('update product'+JSON.stringify(product));
            const foundIndex = this.products.findIndex(item=>item.id===product.id);
            if(foundIndex > -1){
                this.products[foundIndex]=product;
            }
        }),
        map(()=>product),
        catchError(this.errorHandler)
        );
      }

      deleteProduct(id:number):Observable<{}>{
        const headers= new HttpHeaders({'Content-Type':'application/json'});
        const url= `${this.url}/${id}`;
        return this.http.delete<IProduct>(url,{headers})
    .pipe(
      tap(data=>{
        console.log('deleted prd'+id);
       const foundIndex = this.products.findIndex(item=>item.id===id);
       //if product id is not found means index returned will be -1
       //if(foundIndex > -1)
       //this.products.splice(foundIndex,1);


      },
      catchError(this.errorHandler))


    );
      }

      
      
      }
