import { createReducer,on } from '@ngrx/store'
import * as ProductActions from './productsngrx.action'
import { initialState, ProductState } from './productsngrx.state'

export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductActions.setCurrentProduct,(state,action):ProductState=>{
        return{
            ...state,
            currentProductId: action.currentProductId
        };
    }),

    on(ProductActions.clearCurrentProduct,(state):ProductState =>{
        return{
            ...state,
            currentProductId:null
        };
    }),

    on(ProductActions.initializeCurrentProduct,(state):ProductState=>{
        return {
            ...state,
            currentProductId:0
        };
    }),

    on(ProductActions.loadProductsSuccess,(state,action):ProductState =>{
        return {
            ...state,
            products:action.products,
            error:''
        };
    }),

    on(ProductActions.loadProductsFailure, (state, action): ProductState => {
        return {
          ...state,
          products: [],
          error: action.error
        };
      }),

      on(ProductActions.updateProductSuccess, (state, action): ProductState => {
        const updatedProducts = state.products.map(
          item => action.product.id === item.id ? action.product : item);
        return {
          ...state,
          products: updatedProducts,
          currentProductId: action.product.id,
          error: ''
        };
      
      }),
      on(ProductActions.updateProductFailure, (state, action): ProductState => {
        return {
          ...state,
          error: action.error
        };
      }),
      on(ProductActions.createProductSuccess, (state, action): ProductState => {
        return {
          ...state,
          products: [...state.products, action.product],
          currentProductId: action.product.id,
          error: ''
        };
      }),

      on(ProductActions.createProductFailure, (state, action): ProductState => {
        return {
          ...state,
          error: action.error
        };
      }),

      on(ProductActions.deleteProductSuccess, (state, action): ProductState => {
        return {
          ...state,
          products: state.products.filter(product => product.id !== action.productId),
          currentProductId: null,
          error: ''
        };
      }),
      
      on(ProductActions.deleteProductFailure, (state, action): ProductState => {
        return {
          ...state,
          error: action.error
        };
      })
);