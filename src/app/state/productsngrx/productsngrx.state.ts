import { IProduct } from "src/app/products/product.model";
import { AppState } from "../app.state";

export interface State extends AppState{
    products:ProductState;
}
export interface ProductState{
    currentProductId:number|null;
    products:IProduct[];
    error:string;
}

export const initialState:ProductState={
    currentProductId:null,
    products:[],
    error:''
}