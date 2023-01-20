import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ProductRoutingModule } from "../products/product-routing.module";
import { ProductlistRoutingModule } from "../products/productlist-routing.module";
import { ProductEffects } from "../state/productsngrx/productsngrx.effects";
import { productReducer } from "../state/productsngrx/productsngrx.reducer";
import { ProductlistComponent } from "./productlist.component";

@NgModule({
    declarations: [
       ProductlistComponent
      ],
      imports: [
        CommonModule,
        ProductlistRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatFormFieldModule,
        StoreModule.forFeature('products',productReducer),
        EffectsModule.forFeature([ProductEffects])
    
      ]
})
export class ProductlistModule{}